"use client";

import { Pause, Play, SoundHigh, SoundOff } from "iconoir-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Studio } from "@/config/studio";
import type { Dictionary } from "@/utils/i18n";

// Film hero: autoplay tanpa suara (aturan browser), tombol suara & jeda kotak di kanan bawah (acuan McLaren),
// garis progres di dasar hero. Dijeda otomatis saat hero tidak terlihat / tab disembunyikan; gerak dikurangi = tidak autoplay.
export default function HeroVideo({ t, lang }: { t: Dictionary["hero"]; lang: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  // Mulai "jeda" sampai event play pertama — ikon selalu sesuai keadaan video sebenarnya.
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(true);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;

    const sync = () => {
      const want = visible && !document.hidden && !userPaused.current;
      if (want && v.paused) v.play().catch(() => setPaused(true));
      else if (!want && !v.paused) v.pause();
    };
    if (reduce) userPaused.current = true;

    let raf = 0;
    const tick = () => {
      if (bar.current && v.duration) bar.current.style.setProperty("--p", String(v.currentTime / v.duration));
      raf = requestAnimationFrame(tick);
    };
    const onPlay = () => {
      setPaused(false);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const onPause = () => {
      cancelAnimationFrame(raf);
      setPaused(true);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(v);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const togglePlay = () => {
    const v = video.current;
    if (!v) return;
    userPaused.current = !v.paused;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
    setPaused(userPaused.current);
  };

  const toggleSound = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    }
  };

  return (
    <>
      <video
        ref={video}
        className="absolute inset-0 size-full object-cover object-[68%_center] lg:object-center"
        poster={Studio.film.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={t.video}
      >
        <source src={Studio.film.mobile(lang)} type="video/mp4" media="(max-width: 767px)" />
        <source src={Studio.film.src(lang)} type="video/mp4" />
      </video>
      <div aria-hidden className="hero-scrim absolute inset-0" />

      <div className="hero-fade absolute bottom-10 right-4 z-20 flex gap-2 sm:right-8 lg:bottom-12 lg:right-12" style={{ "--i": 2 } as CSSProperties}>
        <button type="button" onClick={toggleSound} className="icon-btn" aria-pressed={!muted} aria-label={muted ? t.soundOn : t.soundOff} title={muted ? t.soundOn : t.soundOff}>
          {muted ? <SoundOff aria-hidden width={18} height={18} strokeWidth={1.5} /> : <SoundHigh aria-hidden width={18} height={18} strokeWidth={1.5} />}
        </button>
        <button type="button" onClick={togglePlay} className="icon-btn" aria-label={paused ? t.play : t.pause} title={paused ? t.play : t.pause}>
          {paused ? <Play aria-hidden width={18} height={18} strokeWidth={1.5} /> : <Pause aria-hidden width={18} height={18} strokeWidth={1.5} />}
        </button>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 z-10 h-[2px] bg-white/10">
        <div ref={bar} className="video-progress h-full bg-white/80" />
      </div>
    </>
  );
}
