"use client";

import { useEffect } from "react";

// Judul tab ikut section yang sedang dibaca, dan menyapa saat pengguna pindah tab.
export default function TabTitle({ base, away, sections }: { base: string; away: string; sections: Record<string, string> }) {
  useEffect(() => {
    let current = base;
    const apply = () => {
      document.title = document.hidden ? away : current;
    };

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        const [id, ratio] = [...visible.entries()].sort((a, b) => b[1] - a[1])[0] ?? ["", 0];
        current = ratio > 0 && sections[id] ? `${sections[id]} ✦ ArrrStudio` : base;
        apply();
      },
      { threshold: [0, 0.25, 0.5, 0.75] },
    );
    Object.keys(sections).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    document.addEventListener("visibilitychange", apply);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", apply);
      document.title = base;
    };
  }, [base, away, sections]);

  return null;
}
