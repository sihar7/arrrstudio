"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

// Kartu yang miring halus mengikuti kursor (maks ±max derajat); transisi & kembali tegak lewat CSS.
export default function TiltCard({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const inner = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      inner.current?.style.setProperty("--ry", `${px * max * 2}deg`);
      inner.current?.style.setProperty("--rx", `${-py * max * 2}deg`);
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    inner.current?.style.setProperty("--ry", "0deg");
    inner.current?.style.setProperty("--rx", "0deg");
  };

  return (
    <div style={{ perspective: 1200 }} className={className} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={inner} className="tilt-card h-full">
        {children}
      </div>
    </div>
  );
}
