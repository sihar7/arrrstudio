"use client";

import { ArrowUp } from "iconoir-react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useState } from "react";
import { easeOut } from "@/components/motion/ease";

// Muncul setelah menggulir ±1 layar; cincin chrome menunjukkan progres scroll halaman.
export default function BackToTop({ label }: { label: string }) {
  const { scrollY, scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > window.innerHeight * 0.9));

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label={label}
          title={label}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16, transition: { duration: 0.2 } }}
          transition={{ duration: 0.35, ease: easeOut }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-50 grid size-12 cursor-pointer place-items-center rounded-full bg-[#0f1011]/90 text-[var(--mist)] shadow-[0_12px_32px_-8px_rgb(0_0_0/0.5)] backdrop-blur-md md:right-8"
        >
          <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
            <defs>
              <linearGradient id="btt-chrome" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e5e5e6" />
                <stop offset="55%" stopColor="#8a8f98" />
                <stop offset="100%" stopColor="#a3243b" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22.5" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="1" />
            <motion.circle cx="24" cy="24" r="22.5" fill="none" stroke="url(#btt-chrome)" strokeWidth="1.5" strokeLinecap="round" style={{ pathLength: scrollYProgress }} />
          </svg>
          <ArrowUp aria-hidden width={18} height={18} strokeWidth={1.7} className="relative transition-transform duration-200 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
