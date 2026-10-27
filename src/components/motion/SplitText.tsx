"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { easeOut } from "./ease";

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: easeOut } },
};

// Judul yang muncul per kata dari balik mask. Teks utuh tetap dibaca pembaca layar lewat aria-label.
export default function SplitText({
  text,
  as = "h2",
  id,
  className,
  delay = 0,
  onMount = false,
}: {
  text: string;
  as?: "h1" | "h2" | "p";
  id?: string;
  className?: string;
  delay?: number;
  onMount?: boolean;
}) {
  const Component = motion[as] as typeof motion.h2;
  const words = text.split(" ");
  const trigger = onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.5 } };

  return (
    <Component
      id={id}
      aria-label={text}
      className={className}
      initial="hidden"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}
      {...trigger}
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span aria-hidden className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
            <motion.span className="inline-block" variants={word}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Component>
  );
}
