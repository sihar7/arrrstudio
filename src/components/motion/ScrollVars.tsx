"use client";

import { useEffect } from "react";

// Satu listener scroll untuk semua efek yang digerakkan scroll. Setiap [data-scroll] mendapat --p (0→1):
//   view    → dari tepi atas elemen masuk layar bawah sampai tepi bawahnya keluar layar atas (parallax)
//   read    → dari elemen di 85% tinggi layar sampai di 35% (kata menyala saat dibaca)
//   pin     → selama elemen tinggi "ditempel" (atas = 0 sampai bawah = bawah layar); juga --shift untuk [data-track]
// Hanya elemen yang sedang terlihat yang dihitung; semua dilepas saat unmount.
type Mode = "view" | "read" | "pin";

export default function ScrollVars() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
    if (!els.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const active = new Set<HTMLElement>();
    let raf = 0;
    let vh = window.innerHeight;

    const measureShift = () => {
      vh = window.innerHeight;
      for (const el of els) {
        if (el.dataset.scroll !== "pin") continue;
        const pin = wide.matches && !reduce.matches;
        el.dataset.pin = pin ? "on" : "off";
        const track = el.querySelector<HTMLElement>("[data-track]");
        if (track) el.style.setProperty("--shift", pin ? `${Math.max(0, track.scrollWidth - window.innerWidth)}px` : "0px");
      }
    };

    const update = () => {
      raf = 0;
      for (const el of active) {
        const r = el.getBoundingClientRect();
        const mode = el.dataset.scroll as Mode;
        let p = 0;
        if (mode === "view") p = (vh - r.top) / (vh + r.height);
        else if (mode === "read") p = (vh * 0.85 - r.top) / (vh * 0.5 + r.height * 0.6);
        else p = -r.top / Math.max(1, r.height - vh);
        el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) active.add(el);
        else active.delete(el);
      }
      schedule();
    });
    els.forEach((el) => io.observe(el));

    const onResize = () => {
      measureShift();
      schedule();
    };
    const ro = new ResizeObserver(onResize);
    els.forEach((el) => ro.observe(el));
    measureShift();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    reduce.addEventListener("change", onResize);
    wide.addEventListener("change", onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      reduce.removeEventListener("change", onResize);
      wide.removeEventListener("change", onResize);
    };
  }, []);

  return null;
}
