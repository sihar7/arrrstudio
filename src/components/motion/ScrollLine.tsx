"use client";

import { motion, useScroll } from "motion/react";
import { useRef, type ReactNode } from "react";

// Garis linimasa yang terisi mengikuti scroll: horizontal di desktop, vertikal di HP.
export default function ScrollLine({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <span aria-hidden className="absolute left-0 top-0 hidden h-[0.5px] w-full bg-line-strong md:block" />
      <motion.span aria-hidden className="absolute left-0 top-0 hidden h-px w-full origin-left bg-ink md:block" style={{ scaleX: scrollYProgress }} />
      <span aria-hidden className="absolute left-0 top-0 h-full w-[0.5px] bg-line-strong md:hidden" />
      <motion.span aria-hidden className="absolute left-0 top-0 h-full w-px origin-top bg-ink md:hidden" style={{ scaleY: scrollYProgress }} />
      {children}
    </div>
  );
}
