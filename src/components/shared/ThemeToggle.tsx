"use client";

import { HalfMoon, SunLight } from "iconoir-react";
import { themeStorageKey, type Theme } from "@/utils/theme";

export default function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(themeStorageKey, next);
    } catch {}
  };

  // Ikon dipilih lewat CSS (data-theme) supaya markup server & klien identik — tanpa mismatch hidrasi.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-11 cursor-pointer place-items-center rounded-full text-ink-2 transition-colors duration-150 hover:bg-sunken hover:text-ink active:scale-95"
    >
      <HalfMoon aria-hidden width={18} height={18} strokeWidth={1.6} className="dark:hidden" />
      <SunLight aria-hidden width={18} height={18} strokeWidth={1.6} className="hidden dark:block" />
    </button>
  );
}
