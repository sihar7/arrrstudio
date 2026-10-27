"use client";

import { useEffect, useRef, useState } from "react";

const glyphs = "ARR#/<>_01*+";

// Teks "di-decode" seperti nama pemain yang muncul di layar game, sekali saat terlihat.
// Lapisan tak terlihat menjaga lebar supaya tidak ada lompatan layout.
export default function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [output, setOutput] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const run = () => {
      const steps = 24;
      let step = 0;
      let last = 0;
      const tick = (now: number) => {
        if (now - last > 40) {
          last = now;
          step++;
          const settled = Math.floor((step / steps) * text.length);
          setOutput(
            text
              .split("")
              .map((ch, i) => (i < settled ? ch : glyphs[Math.floor(Math.random() * glyphs.length)]))
              .join(""),
          );
        }
        if (step < steps) raf = requestAnimationFrame(tick);
        else setOutput(text);
      };
      raf = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <span ref={ref} aria-label={text} className={`inline-grid ${className ?? ""}`}>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {text}
      </span>
      <span aria-hidden className="col-start-1 row-start-1">
        {output}
      </span>
    </span>
  );
}
