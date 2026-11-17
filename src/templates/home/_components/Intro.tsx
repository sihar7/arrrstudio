"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Mark, Wordmark } from "@/components/brand/Logo";
import { introStorageKey } from "@/utils/theme";

// Garis cetak biru yang "merakit" huruf A (koordinat mengikuti mark di tengah viewBox 1000×600).
const guides: Array<[number, number, number, number]> = [
  [80, 452, 920, 452], // garis dasar
  [120, 148, 880, 148], // puncak
  [160, 330, 840, 330], // palang orbit
  [500, 40, 500, 560], // sumbu
  [330, 520, 530, 100], // kaki kiri
  [470, 100, 690, 520], // kaki kanan
  [262, 420, 760, 230], // lintasan orbit
  [700, 60, 700, 300], // bintang vertikal
  [620, 170, 790, 170], // bintang horizontal
  [380, 60, 380, 540],
  [640, 60, 640, 540],
];

// Intro sekali per sesi (ditandai di sessionStorage; skrip tema menyembunyikannya sebelum render bila sudah tampil).
export default function Intro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(introStorageKey, "1");
    } catch {}
    const id = window.setTimeout(() => setDone(true), 3100);
    return () => window.clearTimeout(id);
  }, []);

  if (done) return null;

  return (
    <div className="intro cinema" aria-hidden>
      <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="intro-guides absolute inset-0 m-auto h-[min(80vh,600px)] w-[min(96vw,1000px)]">
        {guides.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1} style={{ "--d": i } as CSSProperties} />
        ))}
      </svg>
      <div className="relative flex flex-col items-center gap-7">
        <span className="intro-mark block">
          <Mark height={150} shine={false} />
        </span>
        <span className="intro-word block">
          <Wordmark height={14} />
        </span>
      </div>
    </div>
  );
}
