"use client";

import { ArrowUp } from "iconoir-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Muncul setelah menggulir ±1 layar; cincin chrome menunjukkan progres scroll (CSS scroll-driven).
export default function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setVisible(window.scrollY > window.innerHeight * 0.9));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={label}
      title={label}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-50 grid size-12 cursor-pointer place-items-center rounded-full bg-[#0f1011] text-[var(--mist)] shadow-[0_12px_32px_-8px_rgb(0_0_0/0.5)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:scale-90 md:right-8",
        visible ? "opacity-100" : "pointer-events-none translate-y-4 scale-75 opacity-0",
      )}
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
        <circle className="btt-progress" cx="24" cy="24" r="22.5" fill="none" stroke="url(#btt-chrome)" strokeWidth="1.5" strokeLinecap="round" pathLength={1} />
      </svg>
      <ArrowUp aria-hidden width={18} height={18} strokeWidth={1.7} className="relative transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
