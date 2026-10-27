import type { CSSProperties, ReactNode } from "react";

// Isi (biasanya foto) bergeser pelan mengikuti scroll di dalam bingkai ber-overflow-hidden (CSS scroll-driven).
export default function Parallax({ children, className, strength = 8 }: { children: ReactNode; className?: string; strength?: number }) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div className="parallax size-full" style={{ "--px": `${strength}%`, scale: `${1 + strength / 50}` } as CSSProperties}>
        {children}
      </div>
    </div>
  );
}
