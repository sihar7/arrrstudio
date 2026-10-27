import type { ReactNode } from "react";
import { ArrowUpRight } from "iconoir-react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-accent text-accent-ink hover:bg-accent-hover",
  secondary: "border-[0.5px] border-line-strong text-ink hover:bg-sunken",
};

// Tautan keluar berbentuk tombol. Maroon (primary) hanya dipakai untuk satu aksi utama per bagian.
export default function ActionLink({ href, children, variant = "primary", className }: { href: string; children: ReactNode; variant?: keyof typeof variants; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-[15px] font-[510] transition-[background-color,transform] duration-150 active:scale-[0.97]",
        variants[variant],
        className,
      )}
    >
      {children}
      <ArrowUpRight aria-hidden width={16} height={16} strokeWidth={1.8} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}
