# ArrrStudio — narasi suara film (by ArrrStudio · https://arrrstudio.com · Discord https://discord.gg/mtn3YmwjV)
# Pemakaian: python -I scripts/film/voice.py <musik.wav> <folder-output>
# Membuat narasi perempuan (edge-tts: id-ID-GadisNeural / en-US-AvaNeural) per adegan, lalu mencampurnya dengan
# musik: musik di-"duck" (dikecilkan halus) selama narasi bicara. Hasil: film-voice-id.wav & film-voice-en.wav.
# Waktu mulai tiap kalimat mengikuti CUTS di stage.html; kalimat yang terlalu panjang dipercepat otomatis.
import asyncio
import subprocess
import sys
import wave
from pathlib import Path

import edge_tts
import numpy as np

SR = 48000

LINES = {
    # Suara Multilingual generasi baru (intonasi paling natural); satu suara yang sama untuk kedua bahasa.
    "id": {
        "voice": "en-US-AvaMultilingualNeural",
        "lines": [
            (0.4, 3.4, "Setiap sistem dimulai dari satu garis."),
            (3.8, 6.9, "Ini ArrrStudio, studio kecil dari Bandung."),
            (7.3, 13.2, "Kami membuat kit game Roblox, dan alat untuk para kreator."),
            (13.6, 17.3, "Juga web dan data, yang siap dipakai sejak hari pertama."),
            (17.6, 20.8, "Dikerjakan satu developer, dengan satu standar."),
            (21.2, 23.8, "ArrrStudio. Siap rilis."),
        ],
    },
    "en": {
        "voice": "en-US-AvaMultilingualNeural",
        "lines": [
            (0.4, 3.4, "Every system starts with a single line."),
            (3.8, 6.9, "This is ArrrStudio, a small studio from Bandung."),
            (7.3, 13.9, "We build Roblox game kits, and tools for creators."),
            (14.3, 17.4, "Web and data too, ready from day one."),
            (17.8, 20.4, "One developer, one standard."),
            (20.9, 23.6, "ArrrStudio. Built to ship."),
        ],
    },
}


def read_wav(path):
    with wave.open(str(path)) as w:
        ch = w.getnchannels()
        data = np.frombuffer(w.readframes(w.getnframes()), dtype="<i2").astype(np.float64) / 32768
    return data.reshape(-1, ch)


def write_wav(path, data):
    pcm = (np.clip(data, -1, 1) * 32767).astype("<i2")
    with wave.open(str(path), "wb") as w:
        w.setnchannels(data.shape[1])
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


async def tts(text, voice, rate, mp3):
    # Pitch asli (tanpa digeser) — geser pitch membuat suara terdengar "kaleng".
    await edge_tts.Communicate(text, voice, rate=rate).save(str(mp3))


def to_wav(mp3, wav):
    # Proses seminimal mungkin agar tetap natural: buang dengung bawah + samakan kerasnya saja.
    af = "highpass=f=75,loudnorm=I=-16:TP=-1.5"
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(mp3), "-af", af, "-ar", str(SR), "-ac", "1", str(wav)], check=True)


def main():
    music = read_wav(sys.argv[1])
    out = Path(sys.argv[2])
    tmp = out / "voice-tmp"
    tmp.mkdir(parents=True, exist_ok=True)
    n = len(music)

    for lang, cfg in LINES.items():
        voice = np.zeros(n)
        for i, (start, end, text) in enumerate(cfg["lines"]):
            slot = end - start
            rate = 0
            while True:
                mp3, wav = tmp / f"{lang}-{i}.mp3", tmp / f"{lang}-{i}.wav"
                asyncio.run(tts(text, cfg["voice"], f"{rate:+d}%", mp3))
                to_wav(mp3, wav)
                clip = read_wav(wav)[:, 0]
                # potong hening di awal & akhir agar kalimat tepat jatuh di potongan adegan
                nz = np.flatnonzero(np.abs(clip) > 0.01)
                if len(nz):
                    clip = clip[max(0, nz[0] - int(0.02 * SR)) : nz[-1] + int(0.08 * SR)]
                dur = len(clip) / SR
                # boleh melewati slot sedikit (masuk jeda transisi); percepatan maks +8% supaya tetap natural
                if dur <= slot + 0.35 or rate >= 8:
                    break
                rate += 4
            print(f"{lang} #{i} {dur:.2f}s / slot {slot:.2f}s rate {rate:+d}%  {text}")
            a = int(start * SR)
            m = min(len(clip), n - a)
            voice[a : a + m] += clip[:m]

        # Ducking halus: amplop suara dihaluskan panjang (tidak naik-turun per kata) → musik turun ±6 dB saja,
        # supaya musik tidak terasa "berhenti" saat narasi bicara.
        envl = np.abs(voice)
        k = int(0.6 * SR)
        envl = np.convolve(envl, np.ones(k) / k, mode="same")
        envl = np.clip(envl / (envl.max() + 1e-9) * 3, 0, 1)
        duck = 1 - 0.5 * envl
        mix = music * duck[:, None] * 0.9
        mix[:, 0] += voice * 0.92
        mix[:, 1] += voice * 0.92
        mix /= max(1.0, np.max(np.abs(mix)) / 0.95)
        write_wav(out / f"film-voice-{lang}.wav", mix)
        print("ok", lang)


if __name__ == "__main__":
    main()
