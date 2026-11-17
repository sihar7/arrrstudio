"use client";

import { ArrowUp } from "iconoir-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Tombol kotak di pojok kanan bawah: muncul setelah hero terlewati, bingkainya terisi sesuai progres scroll.
// Satu listener scroll (rAF), dilepas saat unmount.
export default function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);
  const ring = useRef<SVGRectElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setVisible(y > window.innerHeight * 0.9);
      ring.current?.style.setProperty("stroke-dashoffset", String(1 - (max > 0 ? y / max : 0)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
        "to-top group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 grid size-12 cursor-pointer place-items-center bg-surface text-ink shadow-[0_14px_30px_-12px_rgb(3_6_26/0.55)] transition-[opacity,transform,background-color,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-cta hover:text-cta-ink active:scale-90 sm:right-8 lg:right-12",
        visible ? "opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 size-full">
        <rect x="0.5" y="0.5" width="47" height="47" fill="none" stroke="var(--line-strong)" strokeWidth="1" />
        <rect ref={ring} x="0.5" y="0.5" width="47" height="47" fill="none" stroke="var(--signal)" strokeWidth="1.5" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
      </svg>
      <ArrowUp aria-hidden width={18} height={18} strokeWidth={1.6} className="relative transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
