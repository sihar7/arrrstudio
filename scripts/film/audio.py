# ArrrStudio — skor audio film hero (by ArrrStudio · https://arrrstudio.com · Discord https://discord.gg/mtn3YmwjV)
# Pemakaian: python -I scripts/film/audio.py <output.wav>
# Disintesis penuh dari nol (tanpa sampel pihak ketiga): drone sub, pad akor, riser, impact, kilau bintang,
# whoosh di tiap transisi, denyut + arpeggio, reverb konvolusi. Waktu adegan = CUTS di stage.html.
import sys
import wave

import numpy as np

SR = 48000
DUR = 24.0
N = int(SR * DUR)
CUTS = {"mark": 3.6, "star": 4.6, "word": 5.4, "kits": 7.0, "tools": 10.5, "data": 14.0, "founder": 17.5, "final": 20.5}
rng = np.random.default_rng(7)
t = np.arange(N) / SR
L = np.zeros(N)
R = np.zeros(N)


def env(a, b, c, d):
    """Amplop trapesium: naik a→b, tahan b→c, turun c→d (detik)."""
    e = np.zeros(N)
    e += np.clip((t - a) / max(b - a, 1e-6), 0, 1) * (t < c)
    e += np.clip(1 - (t - c) / max(d - c, 1e-6), 0, 1) * (t >= c)
    return e


def lowpass(x, cutoff):
    """One-pole lowpass; cutoff boleh array (Hz) untuk sapuan filter."""
    cutoff = np.broadcast_to(np.asarray(cutoff, dtype=float), x.shape)
    a = 1 - np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc += a[i] * (x[i] - acc)
        y[i] = acc
    return y


def lowpass_fast(x, cutoff):
    # Versi blok (cutoff konstan) — cepat via filter rekursif sederhana dengan numpy (pendekatan IIR orde 1).
    a = 1 - np.exp(-2 * np.pi * cutoff / SR)
    from itertools import accumulate

    return np.fromiter(accumulate(x, lambda acc, v: acc + a * (v - acc), initial=0.0), float, len(x) + 1)[1:]


def place(sig, at, gain=1.0, pan=0.0):
    i = int(at * SR)
    if i >= N:
        return
    n = min(len(sig), N - i)
    lg = np.cos((pan + 1) * np.pi / 4) * gain
    rg = np.sin((pan + 1) * np.pi / 4) * gain
    L[i : i + n] += sig[:n] * lg
    R[i : i + n] += sig[:n] * rg


def note(m):
    return 440.0 * 2 ** ((m - 69) / 12)


# ── 1. Drone sub D1/A1, membengkak pelan ──
drone_env = env(0.0, 3.0, 22.4, 24.0)
lfo = 1 + 0.15 * np.sin(2 * np.pi * 0.11 * t)
drone = (np.sin(2 * np.pi * note(26) * t) * 0.55 + np.sin(2 * np.pi * note(33) * t) * 0.35) * drone_env * lfo
rumble = lowpass_fast(rng.standard_normal(N), 90) * 6
L += (drone + rumble * drone_env) * 0.32
R += (drone + rumble[::-1] * drone_env) * 0.32

# ── 2. Pad akor (saw detune, filter terbuka mengikuti adegan) ──
chords = [
    (3.4, CUTS["tools"], [50, 53, 57, 60, 64]),  # Dm9
    (CUTS["tools"], CUTS["data"], [46, 50, 53, 57, 62]),  # Bbmaj7
    (CUTS["data"], CUTS["final"], [43, 50, 53, 57, 62]),  # Gm9
    (CUTS["final"], 24.0, [38, 50, 52, 57, 62, 69]),  # Dsus2 — resolusi
]


def saw(f, phase=0.0):
    x = (t * f + phase) % 1.0
    return 2 * x - 1


pad_l = np.zeros(N)
pad_r = np.zeros(N)
for a, b, notes in chords:
    e = env(a - 0.3, a + 1.2, b - 0.2, b + 0.8 if b < 24 else 24.0)
    for k, m in enumerate(notes):
        f = note(m)
        pad_l += (saw(f * 0.997, 0.1 * k) + saw(f * 1.003, 0.37 * k)) * e * 0.5
        pad_r += (saw(f * 1.002, 0.21 * k) + saw(f * 0.998, 0.53 * k)) * e * 0.5
cut = 300 + 1400 * np.clip((t - 3.4) / 18, 0, 1) + 900 * env(CUTS["final"], CUTS["final"] + 1, 23, 24)
for _ in range(2):
    pad_l = lowpass(pad_l, cut)
    pad_r = lowpass(pad_r, cut)
L += pad_l * 0.05
R += pad_r * 0.05

# ── 3. Detak goresan cetak biru (11 garis) ──
for i in range(11):
    at = 0.25 + i * 0.16
    n = int(0.035 * SR)
    click = rng.standard_normal(n) * np.exp(-np.arange(n) / (0.004 * SR))
    click = click - lowpass_fast(click, 2500)
    place(click, at, 0.22, pan=-0.6 + i * 0.12)
    scribe_n = int(0.85 * SR)
    sc = rng.standard_normal(scribe_n)
    sc = lowpass_fast(sc - lowpass_fast(sc, 3000), 9000) * np.sin(np.linspace(0, np.pi, scribe_n)) ** 2
    place(sc, at, 0.035, pan=-0.6 + i * 0.12)


def riser(start, end, gain=0.4):
    n = int((end - start) * SR)
    x = np.linspace(0, 1, n)
    noise = rng.standard_normal(n)
    sweep = lowpass(noise, 200 + 7000 * x**2) * x**2.2
    tone = np.sin(2 * np.pi * np.cumsum(110 + 330 * x**2) / SR) * x**3 * 0.4
    place(sweep * 1.4 + tone, start, gain)


def boom(at, gain=1.0, f0=70, f1=30, decay=1.8):
    n = int((decay + 0.5) * SR)
    x = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-x * 5)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-x / (decay * 0.45))
    hit = lowpass_fast(rng.standard_normal(n), 1800) * np.exp(-x / 0.06) * 2.5
    place(np.tanh((s + hit) * 1.4), at, gain)


def shimmer(at, gain=0.25, length=3.5, base=2200):
    n = int(length * SR)
    x = np.arange(n) / SR
    s = np.zeros(n)
    for k in range(9):
        f = base * (1 + k * 0.5) * (1 + rng.uniform(-0.01, 0.01))
        s += np.sin(2 * np.pi * f * x + rng.uniform(0, 6)) * np.exp(-x / (0.5 + rng.uniform(0, 1.2))) * (1 + 0.6 * np.sin(2 * np.pi * (5 + k) * x))
    s = s / 9 * np.minimum(1, x / 0.01)
    place(s, at, gain, pan=0.25)
    place(s, at + 0.03, gain * 0.7, pan=-0.25)  # salinan tertunda = lebar stereo


def whoosh(peak, gain=0.35, length=0.9):
    n = int(length * SR)
    x = np.linspace(0, 1, n)
    shape = np.exp(-((x - 0.62) ** 2) / 0.025)
    s = lowpass(rng.standard_normal(n), 400 + 5200 * shape) * shape
    place(s, peak - length * 0.62, gain, pan=-0.3)
    place(lowpass(rng.standard_normal(n), 400 + 5200 * shape) * shape, peak - length * 0.62, gain, pan=0.3)


# ── 4. Bangkitnya logo: riser → impact + kilau bintang ──
riser(1.9, CUTS["star"], 0.42)
boom(CUTS["star"], 0.95)
shimmer(CUTS["star"], 0.22)
shimmer(CUTS["word"], 0.08, 2.5, 3200)

# ── 5. Transisi adegan ──
for k in ("kits", "tools", "data", "founder"):
    whoosh(CUTS[k], 0.42)
    boom(CUTS[k], 0.45, 90, 40, 0.9)

# ── 6. Denyut + arpeggio (energi adegan produk) ──
bpm = 120
beat = 60 / bpm
arp_notes = {
    "kits": [62, 65, 69, 72, 69, 65],
    "tools": [58, 62, 65, 69, 65, 62],
    "data": [55, 62, 65, 69, 74, 69],
}
for scene, nxt in (("kits", "tools"), ("tools", "data"), ("data", "founder")):
    a, b = CUTS[scene], CUTS[nxt]
    k = 0
    tt = a + 0.05
    while tt < b - 0.2:
        if k % 2 == 0:
            n = int(0.35 * SR)
            x = np.arange(n) / SR
            kick = np.sin(2 * np.pi * np.cumsum(45 + 80 * np.exp(-x * 30)) / SR) * np.exp(-x / 0.12)
            place(kick, tt, 0.42)
        n = int(0.4 * SR)
        x = np.arange(n) / SR
        m = arp_notes[scene][k % 6] + (12 if scene == "data" and k % 4 == 3 else 0)
        f = note(m)
        pluck = (np.sin(2 * np.pi * f * x) + 0.3 * np.sin(2 * np.pi * 2 * f * x)) * np.exp(-x / 0.11)
        place(pluck, tt, 0.07, pan=-0.5 if k % 2 else 0.5)
        hn = int(0.05 * SR)
        hat = rng.standard_normal(hn)
        hat = (hat - lowpass_fast(hat, 7000)) * np.exp(-np.arange(hn) / (0.008 * SR))
        place(hat, tt + beat / 4, 0.05, pan=0.4)
        k += 1
        tt += beat / 2

# ── 7. Penutup: riser → boom besar + kilau, lalu memudar ──
riser(CUTS["final"] - 1.6, CUTS["final"], 0.38)
boom(CUTS["final"], 1.0, 65, 28, 2.6)
shimmer(CUTS["final"] + 0.2, 0.2, 3.8, 1900)

# ── Reverb konvolusi (IR derau meluruh, stereo terdekorelasi) ──
ir_n = int(2.6 * SR)
ir_t = np.arange(ir_n) / SR
irL = rng.standard_normal(ir_n) * np.exp(-ir_t / 0.55)
irR = rng.standard_normal(ir_n) * np.exp(-ir_t / 0.55)
irL = lowpass_fast(irL, 5000)
irR = lowpass_fast(irR, 5000)
size = 1 << int(np.ceil(np.log2(N + ir_n)))


def conv(x, ir):
    y = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(ir, size), size)[:N]
    return y / np.max(np.abs(ir)) / 60


wetL, wetR = conv(L, irL), conv(R, irR)
L = L + wetL * 0.9
R = R + wetR * 0.9

# fade masuk/keluar (loop mulus) + master
fade = np.clip(t / 0.4, 0, 1) * np.clip((DUR - t) / 0.9, 0, 1)
L *= fade
R *= fade
peak = max(np.max(np.abs(L)), np.max(np.abs(R)))
L = np.tanh(L / peak * 1.25) * 0.89
R = np.tanh(R / peak * 1.25) * 0.89

out = sys.argv[1] if len(sys.argv) > 1 else "film.wav"
pcm = (np.stack([L, R], axis=1) * 32767).astype("<i2")
with wave.open(out, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("audio ok", out)
