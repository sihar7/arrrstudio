import { ArrowUpRight } from "iconoir-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Studio } from "@/config/studio";
import { Url } from "@/Url/Url";
import type { Dictionary } from "@/utils/i18n";
import SectionLabel from "./SectionLabel";

// Asal-usul + pendiri: foto potret dengan parallax (--p dari ScrollVars) dan tirai yang terbuka saat terlihat,
// cerita di kolom kanan, kutipan besar sebagai titik berat.
export default function Origin({ t }: { t: Dictionary["origin"] }) {
  const { founder } = Studio;
  return (
    <section id="origin" aria-labelledby="origin-title" className="bg-surface">
      <div className="px-4 py-24 sm:px-8 lg:px-12 lg:py-36">
        <SectionLabel id="origin">{t.label}</SectionLabel>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          <figure className="lg:sticky lg:top-28 lg:self-start">
            <div data-reveal="mask" data-scroll="view" className="relative aspect-[4/5] overflow-hidden bg-sunken">
              <Image
                src={founder.photo.src}
                alt={t.photoAlt}
                fill
                sizes="(max-width: 1024px) 92vw, 600px"
                className="parallax-img object-cover"
              />
            </div>
            <figcaption className="mt-5 flex items-baseline justify-between gap-4">
              <span className="text-lg font-normal text-ink">{founder.name}</span>
              <span className="label text-ink-3">{t.role}</span>
            </figcaption>
          </figure>

          <div>
            <h2 id="origin-title" data-reveal className="display text-[clamp(1.8rem,4vw,3.4rem)]">
              {t.title}
            </h2>
            <div className="mt-10 space-y-6 text-[17px] leading-[1.75] text-ink-2">
              {t.story.map((p, i) => (
                <p key={i} data-reveal style={{ "--i": i } as CSSProperties}>
                  {p}
                </p>
              ))}
            </div>

            <blockquote data-reveal className="my-14 border-l border-signal pl-6 text-[clamp(1.35rem,2.4vw,2rem)] font-light leading-snug text-ink">
              “{t.quote}”
            </blockquote>

            <p data-reveal className="text-[15px] leading-relaxed text-ink-2">
              {t.bio}
            </p>
            <p data-reveal className="label mt-10 text-ink-3">
              {t.stack}
            </p>
            <ul className="mt-4 flex flex-wrap border-l border-t border-line">
              {founder.stack.map((s, i) => (
                <li key={s} data-reveal style={{ "--i": i } as CSSProperties} className="border-b border-r border-line px-4 py-3 text-sm text-ink">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={Url.founderPortfolio} target="_blank" rel="noopener" className="btn btn-solid">
                {t.portfolio}
                <ArrowUpRight aria-hidden width={15} height={15} strokeWidth={1.6} className="btn-arrow" />
              </a>
              <a href={Url.founderGithub} target="_blank" rel="noopener" className="btn btn-line">
                {t.github}
                <ArrowUpRight aria-hidden width={15} height={15} strokeWidth={1.6} className="btn-arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
