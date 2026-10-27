import type { ReactNode } from "react";

// Showcase miring ke belakang lalu tegak mengikuti scroll (CSS scroll-driven animation, tanpa JS).
export default function TiltOnScroll({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className} style={{ perspective: 1400 }}>
      <div className="tilt-scroll">{children}</div>
    </div>
  );
}
