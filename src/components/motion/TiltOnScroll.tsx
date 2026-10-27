"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { easeOut } from "./ease";

// Showcase miring ke belakang lalu tegak mengikuti scroll (gaya kartu produk Linear), plus intro saat halaman dibuka.
export default function TiltOnScroll({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 1.1", "start 0.15"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [34, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <div className={className} style={{ perspective: 1400 }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: easeOut, delay: 0.35 }}
        style={{ rotateX, scale, transformOrigin: "50% 0%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
