import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Muncul sekali saat masuk viewport (fade + naik). Murni CSS; kelas .in dipasang oleh RevealObserver.
export default function Reveal({ children, className, delay = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <div data-reveal className={cn("a-rise", className)} style={{ "--delay": `${delay * 1000}ms`, "--y": `${y}px` } as CSSProperties}>
      {children}
    </div>
  );
}
