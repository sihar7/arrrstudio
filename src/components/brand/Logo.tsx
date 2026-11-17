import type { CSSProperties } from "react";
import { Studio } from "@/config/studio";
import { cn } from "@/lib/utils";

type Asset = { src: string; width: number; height: number };

// Logo resmi tampil apa adanya (silver) di area navy; di tema terang di atas kertas, bentuk yang sama diisi warna tinta
// lewat mask supaya tetap kontras. Pemilihan lewat CSS (.logo-auto) — markup server & klien identik.
function LogoAsset({ asset, height, className, shine }: { asset: Asset; height: number; className?: string; shine?: boolean }) {
  const width = Math.round((height * asset.width) / asset.height);
  const mask = { maskImage: `url(${asset.src})`, WebkitMaskImage: `url(${asset.src})` } as CSSProperties;
  return (
    <span className={cn("logo-auto relative block shrink-0", className)} style={{ width, height }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- aset kecil tetap, tanpa optimasi agar mask & img memakai file yang sama */}
      <img src={asset.src} alt="" width={width} height={height} className="logo-raw size-full select-none" draggable={false} decoding="async" />
      <span aria-hidden className="logo-ink absolute inset-0 bg-current" style={mask} />
      {shine && <span aria-hidden className="mark-shine absolute inset-0" style={mask} />}
    </span>
  );
}

export function Mark({ height = 30, className, shine = true }: { height?: number; className?: string; shine?: boolean }) {
  return <LogoAsset asset={Studio.mark} height={height} className={className} shine={shine} />;
}

export function Wordmark({ height = 11, className }: { height?: number; className?: string }) {
  return <LogoAsset asset={Studio.wordmark} height={height} className={className} />;
}

export function Lockup({ height = 120, className }: { height?: number; className?: string }) {
  return <LogoAsset asset={Studio.lockup} height={height} className={className} shine />;
}
