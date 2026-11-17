"use client";

import { ArrowLeft, ArrowRight } from "iconoir-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Carousel horizontal ala "Explore our pursuit of perfection": scroll-snap native (swipe di HP), seret dengan mouse,
// panah kotak, dan bilah progres. Satu set listener dipasang sekali.
export default function WorkRail({ children, prev, next }: { children: ReactNode; prev: string; next: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      bar.current?.style.setProperty("--p", p.toFixed(4));
      bar.current?.style.setProperty("--w", String(Math.min(1, el.clientWidth / el.scrollWidth)));
      setEdge((s) => {
        const start = el.scrollLeft < 8;
        const end = el.scrollLeft > max - 8;
        return s.start === start && s.end === end ? s : { start, end };
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    // Seret dengan mouse (sentuh memakai scroll native).
    let down = false;
    let moved = false;
    let x0 = 0;
    let s0 = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = false;
      x0 = e.clientX;
      s0 = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - x0;
      if (!moved && Math.abs(dx) > 6) {
        moved = true;
        el.dataset.dragging = "true";
        el.setPointerCapture(e.pointerId);
      }
      if (moved) el.scrollLeft = s0 - dx;
    };
    const onUp = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      if (moved) {
        // Lepas snap sesudah seret supaya kartu mendarat rapi.
        requestAnimationFrame(() => delete el.dataset.dragging);
      }
    };
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    measure();
    el.addEventListener("scroll", schedule, { passive: true });
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClickCapture, true);
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("scroll", schedule);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = rail.current;
    const card = el?.querySelector<HTMLElement>(".rail-card");
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <div ref={rail} className="rail -mx-4 flex cursor-grab gap-6 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-12 lg:scroll-px-12 lg:px-12">
        {children}
      </div>
      <div className="mt-10 flex items-center gap-6">
        <div aria-hidden className="relative h-px flex-1 overflow-hidden bg-line-strong">
          <div ref={bar} className="rail-progress absolute inset-y-0 left-0 bg-ink" />
        </div>
        <div className="flex gap-2">
          <button type="button" className="icon-btn" onClick={() => step(-1)} disabled={edge.start} aria-label={prev}>
            <ArrowLeft aria-hidden width={18} height={18} strokeWidth={1.5} />
          </button>
          <button type="button" className="icon-btn" onClick={() => step(1)} disabled={edge.end} aria-label={next}>
            <ArrowRight aria-hidden width={18} height={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </>
  );
}
