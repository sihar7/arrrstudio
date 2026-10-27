import type { ReactNode } from "react";

// Garis linimasa yang terisi mengikuti scroll: horizontal di desktop, vertikal di HP (CSS scroll-driven).
export default function ScrollLine({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`scroll-line relative ${className ?? ""}`}>
      <span aria-hidden className="absolute left-0 top-0 hidden h-[0.5px] w-full bg-line-strong md:block" />
      <span aria-hidden className="line-fill-x absolute left-0 top-0 hidden h-px w-full origin-left bg-ink md:block" />
      <span aria-hidden className="absolute left-0 top-0 h-full w-[0.5px] bg-line-strong md:hidden" />
      <span aria-hidden className="line-fill-y absolute left-0 top-0 h-full w-px origin-top bg-ink md:hidden" />
      {children}
    </div>
  );
}
