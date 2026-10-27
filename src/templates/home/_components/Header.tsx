"use client";

import { useEffect, useState } from "react";
import { Menu, Xmark } from "iconoir-react";
import { LogoLockup } from "@/components/brand/Logo";
import LangSwitch from "@/components/shared/LangSwitch";
import ThemeToggle from "@/components/shared/ThemeToggle";
import type { Dictionary, Locale } from "@/utils/i18n";
import { cn } from "@/lib/utils";
import { Url } from "@/Url/Url";
import { sections } from "../_constants/sections";

export default function Header({ lang, t }: { lang: Locale; t: Dictionary["nav"] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-canvas/85 backdrop-blur-md transition-shadow duration-200",
        (scrolled || open) && "shadow-[0_0.5px_0_var(--line-strong)]",
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2">
        {t.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
        <a href={`/${lang}`} aria-label="ArrrStudio" className="rounded-md">
          <LogoLockup priority />
        </a>

        <div className="flex items-center gap-1.5">
          <nav aria-label="Utama" className="mr-2 hidden lg:block">
            <ul className="flex items-center text-[13px] text-ink-2">
              {sections.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="px-3 py-2 underline-offset-4 transition-colors duration-150 hover:text-ink hover:underline">
                    {t[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={Url.store}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-1 hidden h-9 items-center rounded-full bg-neutral-cta px-4 text-[13px] font-[510] text-neutral-cta-ink transition-opacity hover:opacity-90 active:scale-[0.97] sm:inline-flex"
          >
            Arrveil.store
          </a>
          <LangSwitch lang={lang} label={t.language} />
          <ThemeToggle label={t.theme} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.close : t.menu}
            className="grid size-11 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:bg-sunken active:scale-95 lg:hidden"
          >
            {open ? <Xmark aria-hidden width={20} height={20} strokeWidth={1.6} /> : <Menu aria-hidden width={20} height={20} strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Utama" hidden={!open} className="border-t-[0.5px] border-line lg:hidden">
        <ul className="mx-auto flex max-w-[1200px] flex-col px-5 py-3">
          {sections.map((id, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="flex h-14 items-center justify-between border-b-[0.5px] border-line text-lg font-medium last:border-0"
              >
                {t[id]}
                <span className="font-mono text-xs text-ink-3">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
