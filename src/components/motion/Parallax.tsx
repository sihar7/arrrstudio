"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

// Isi (biasanya foto) bergeser pelan berlawanan arah scroll di dalam bingkai ber-overflow-hidden.
export default function Parallax({ children, className, strength = 8 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div className="size-full" style={{ y, scale: 1 + strength / 50 }}>
        {children}
      </motion.div>
    </div>
  );
}
