"use client";

import { useEffect } from "react";

// Satu IntersectionObserver untuk semua [data-reveal]: memasang kelas .in sekali saat elemen terlihat.
export default function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
