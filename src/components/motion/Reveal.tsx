"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { duration, easeOut } from "./ease";

// Muncul sekali saat masuk viewport: naik + blur → tajam.
export default function Reveal({ children, className, delay = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: duration.slow, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}
