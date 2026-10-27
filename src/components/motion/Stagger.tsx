import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "ul" | "ol" | "li" | "dl" | "span";

// Kontainer yang memunculkan anak-anaknya bergiliran (jeda per anak lewat :nth-child di CSS).
export function Stagger({ children, className, as: Component = "div", gap = 0.07, delay = 0 }: { children: ReactNode; className?: string; as?: Tag; gap?: number; delay?: number }) {
  return (
    <Component data-reveal className={cn("stagger", className)} style={{ "--stagger": `${gap * 1000}ms`, "--delay": `${delay * 1000}ms` } as CSSProperties}>
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className, as: Component = "div", variant = "rise" }: { children: ReactNode; className?: string; as?: Tag; variant?: "rise" | "pop" }) {
  return <Component className={cn(variant === "pop" ? "a-pop" : "a-rise", className)}>{children}</Component>;
}
