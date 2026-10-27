import Image from "next/image";
import type { CSSProperties } from "react";
import { Studio } from "@/config/studio";
import { cn } from "@/lib/utils";

// Lockup kecil: mark "A" chrome + teks ArrrStudio. Kilau cahaya menyapu chrome (di-mask bentuk mark)
// dan bintang maroon berkedip — logo terasa hidup tapi teks tetap jelas di ukuran header.
export function LogoLockup({ className, height = 26, priority = false }: { className?: string; height?: number; priority?: boolean }) {
  const { src, width: w, height: h } = Studio.mark;
  const width = Math.round((height * w) / h);
  const mask = { maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` } as CSSProperties;

  return (
    <span className={cn("logo-lockup group inline-flex items-center gap-2.5", className)}>
      <span className="relative block shrink-0" style={{ width, height }}>
        <Image src={src} alt="" width={width * 2} height={height * 2} priority={priority} className="size-full select-none" draggable={false} />
        <span aria-hidden className="logo-shine absolute inset-0" style={mask} />
        <span aria-hidden className="logo-star absolute left-[63%] top-[57%] size-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </span>
      <span className="text-[16px] font-[510] leading-none tracking-[-0.012em] text-ink">
        Arrr<span className="text-ink-3 transition-colors duration-300 group-hover:text-ink">Studio</span>
      </span>
    </span>
  );
}

// Wordmark penuh (chrome + "STUDIO") untuk tempat yang lega.
export default function Logo({ className, height = 32, priority = false }: { className?: string; height?: number; priority?: boolean }) {
  const { src, width: w, height: h } = Studio.logo;
  const width = Math.round((height * w) / h);

  return (
    <Image
      src={src}
      alt={Studio.name}
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className={cn("select-none", className)}
      style={{ width, height }}
      draggable={false}
    />
  );
}
