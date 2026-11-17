import type { CSSProperties } from "react";
import type { Dictionary } from "@/utils/i18n";
import FilmPlayer from "./FilmPlayer";
import HeroVideo from "./HeroVideo";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

// Hero sinema ala McLaren: film memenuhi layar dan jadi tokoh utama; judul kapital dua baris yang tenang di kiri bawah,
// satu tombol kotak + "Tonton film"; kontrol suara/jeda di kanan bawah, dasarnya sejajar dengan tombol.
export default function Hero({ t, lang }: { t: Dictionary["hero"]; lang: string }) {
  return (
    <section aria-labelledby="hero-title" className="cinema relative isolate h-[100svh] min-h-[560px] overflow-hidden">
      <HeroVideo t={t} lang={lang} />

      {/* HP: ruang bawah untuk kontrol video supaya tidak menempel di baris tombol. */}
      <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-28 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12">
        <h1 id="hero-title" className="display max-w-[16ch] text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.08] text-white">
          {t.title.map((line, i) => (
            <span key={line} className="hero-line" style={delay(i)}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <div className="hero-fade mt-7 flex flex-wrap items-center gap-x-7 gap-y-2" style={delay(1)}>
          <a href="#work" className="btn btn-solid">
            {t.primary}
          </a>
          <FilmPlayer t={t} lang={lang} />
        </div>
      </div>
    </section>
  );
}
