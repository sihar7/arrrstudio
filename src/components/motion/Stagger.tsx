"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { duration, easeOut } from "./ease";

type Tag = "div" | "ul" | "ol" | "li" | "dl" | "span";

const item: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: duration.base, ease: easeOut } },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  show: { opacity: 1, scale: 1, transition: { duration: duration.fast, ease: easeOut } },
};

// Kontainer yang memunculkan anak-anaknya bergiliran saat masuk viewport.
export function Stagger({ children, className, as = "div", gap = 0.07, delay = 0 }: { children: ReactNode; className?: string; as?: Tag; gap?: number; delay?: number }) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className, as = "div", variant = "rise" }: { children: ReactNode; className?: string; as?: Tag; variant?: "rise" | "pop" }) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component className={className} variants={variant === "pop" ? pop : item}>
      {children}
    </Component>
  );
}
