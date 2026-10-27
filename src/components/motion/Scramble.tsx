"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const glyphs = "ARR#/<>_01*+";

// Teks "di-decode" seperti nama pemain yang muncul di layar game, sekali saat terlihat.
// Lapisan tak terlihat menjaga lebar supaya tidak ada lompatan layout.
export default function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!inView || reduce) return;
    const steps = 24;
    let step = 0;
    let last = 0;
    let raf = 0;
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
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, text]);

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
