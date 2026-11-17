"use client";

import { Play, Xmark } from "iconoir-react";
import { useEffect, useRef } from "react";
import { Studio } from "@/config/studio";
import type { Dictionary } from "@/utils/i18n";

// Tombol "Tonton film" + pemutar layar penuh (<dialog> native: fokus terkunci & Esc bawaan).
// Dialog dipasang sekali; video baru dimuat saat pertama dibuka, dijeda & diulang dari awal saat ditutup.
export default function FilmPlayer({ t, lang }: { t: Dictionary["hero"]; lang: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      const v = video.current;
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
      document.body.classList.remove("menu-open");
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  const open = () => {
    const d = dialog.current;
    const v = video.current;
    if (!d || !v) return;
    const src = Studio.film.full(lang);
    if (v.getAttribute("src") !== src) v.src = src;
    d.showModal();
    document.body.classList.add("menu-open");
    v.muted = false;
    v.play().catch(() => {});
  };

  return (
    <>
      <button type="button" onClick={open} className="link-arrow cursor-pointer text-white">
        <Play aria-hidden width={14} height={14} strokeWidth={1.8} />
        {t.watch}
      </button>

      <dialog
        ref={dialog}
        aria-label={t.watch}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        className="cinema m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-[rgb(3_6_26/0.94)]"
      >
        <div className="flex h-full flex-col items-center justify-center gap-5 px-4 py-16 sm:px-8">
          <div className="flex w-full max-w-[1280px] items-center justify-between">
            <span className="label flex items-center gap-2 text-ink-2">
              <span className="star text-signal" />
              {t.filmTitle}
            </span>
            <button type="button" onClick={() => dialog.current?.close()} className="icon-btn" aria-label={t.closeFilm} title={t.closeFilm}>
              <Xmark aria-hidden width={18} height={18} strokeWidth={1.5} />
            </button>
          </div>
          <video ref={video} poster={Studio.film.fullPoster} controls playsInline preload="none" className="aspect-video w-full max-w-[1280px] bg-black" aria-label={t.video} />
        </div>
      </dialog>
    </>
  );
}
