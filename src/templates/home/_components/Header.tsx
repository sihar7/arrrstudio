"use client";

import { ArrowUpRight } from "iconoir-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Mark, Wordmark } from "@/components/brand/Logo";
import LangSwitch from "@/components/shared/LangSwitch";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Url } from "@/Url/Url";
import type { Dictionary, Locale } from "@/utils/i18n";
import { sectionIndex, sections } from "../_constants/sections";

const external = [
  { key: "store", label: "Arrveil.store", href: Url.store },
  { key: "converter", label: "ARRR Studio Bypass", href: Url.converter },
  { key: "databridge", label: "ARRR DataBridge", href: Url.databridge },
  { key: "discord", label: "Discord", href: Url.discord },
] as const;

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

// Header ala McLaren: menu kiri · logo tengah · tautan kanan. Transparan di atas hero, padat setelah lewat hero,
// sembunyi saat menggulir turun & muncul saat naik. Menu layar penuh dipasang sekali — buka/tutup hanya atribut.
export default function Header({ lang, t }: { lang: Locale; t: Dictionary["nav"] }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setSolid(y > window.innerHeight * 0.82);
        if (Math.abs(y - last) > 4) {
          setHidden(y > 240 && y > last);
          last = y;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) button.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("menu-open");
    panel.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [open, close]);

  return (
    <div data-menu={open ? "open" : "closed"}>
      <a href="#main" className="sr-only z-[90] bg-cta px-4 py-3 text-cta-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        {t.skip}
      </a>

      <header
        data-solid={solid && !open ? "true" : "false"}
        data-hidden={hidden && !open ? "true" : "false"}
        className="site-header fixed inset-x-0 top-0 z-[60] border-b border-transparent"
      >
        <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8 lg:px-12">
          <button
            ref={button}
            type="button"
            onClick={() => (open ? close() : setOpen(true))}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? t.close : t.menu}
            className="burger -ml-2 flex h-11 w-fit cursor-pointer items-center gap-4 px-2 text-ink"
          >
            <span aria-hidden className="burger-lines block">
              <span />
              <span />
            </span>
            <span aria-hidden className="label hidden sm:block">
              {open ? t.close : t.menu}
            </span>
          </button>

          <a href={`/${lang}`} aria-label={t.home} className="flex items-center gap-3 text-ink">
            <Mark height={26} />
            <Wordmark height={16} className="hidden sm:block" />
          </a>

          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <LangSwitch lang={lang} label={t.language} />
            <ThemeToggle label={t.theme} />
            {/* Dibungkus: .link-arrow (CSS tanpa layer) mengalahkan utilitas display Tailwind. */}
            <span className="ml-3 hidden lg:block">
              <a href={Url.store} target="_blank" rel="noopener" className="link-arrow text-ink">
                {t.store}
                <ArrowUpRight aria-hidden width={14} height={14} strokeWidth={1.6} />
              </a>
            </span>
          </div>
        </div>
      </header>

      <div id="site-menu" ref={panel} inert={!open} className="menu-panel cinema fixed inset-0 z-50 overflow-y-auto">
        <div className="grid min-h-full gap-12 px-4 pb-12 pt-28 sm:px-8 lg:grid-cols-[1.6fr_1fr] lg:px-12 lg:pt-36">
          <nav aria-label={t.menu}>
            <ol>
              {sections.map((id, i) => (
                <li key={id} className="menu-item border-b border-line" style={delay(i)}>
                  <a href={`#${id}`} onClick={() => close(false)} className="menu-link flex items-baseline gap-5 py-4 sm:py-5">
                    <span className="menu-num label w-8 text-ink-3">{sectionIndex(id)}</span>
                    <span className="menu-text display block text-[clamp(1.5rem,4.4vw,3.4rem)]">{t[id]}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="flex flex-col justify-end gap-6">
            <p className="menu-item label flex items-center gap-2 text-ink-3" style={delay(sections.length)}>
              <span className="star text-signal" /> {t.elsewhere}
            </p>
            <ul className="border-t border-line">
              {external.map((x, i) => (
                <li key={x.key} className="menu-item border-b border-line" style={delay(sections.length + 1 + i)}>
                  <a href={x.href} target="_blank" rel="noopener" className="group flex min-h-14 items-center justify-between gap-4 text-lg text-ink-2 transition-colors hover:text-ink">
                    {x.label}
                    <ArrowUpRight aria-hidden width={18} height={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
