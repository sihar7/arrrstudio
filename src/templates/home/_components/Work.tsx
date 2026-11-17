import { NavArrowRight } from "iconoir-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Mark } from "@/components/brand/Logo";
import { Works } from "@/config/studio";
import { Url } from "@/Url/Url";
import type { Dictionary } from "@/utils/i18n";
import SectionLabel from "./SectionLabel";
import WorkRail from "./WorkRail";

// Ekosistem: kartu gambar besar (tangkapan layar produk asli) dalam carousel. Gambar duotone navy, warna aslinya
// terungkap saat hover/fokus — produk "menyala" ketika dipilih.
export default function Work({ t }: { t: Dictionary["work"] }) {
  return (
    <section id="work" aria-labelledby="work-title" className="overflow-hidden px-4 py-24 sm:px-8 lg:px-12 lg:py-32">
      <SectionLabel id="work">{t.label}</SectionLabel>
      <h2 id="work-title" data-reveal className="display mb-14 max-w-[18ch] text-[clamp(1.8rem,4.2vw,3.6rem)]">
        {t.title}
      </h2>

      <WorkRail prev={t.prev} next={t.next}>
        {Works.map((w, i) => {
          const item = t.items[w.id];
          return (
            <a
              key={w.id}
              href={Url[w.href]}
              target="_blank"
              rel="noopener"
              draggable={false}
              data-reveal
              style={{ "--i": i } as CSSProperties}
              className="rail-card group block w-[84vw] shrink-0 sm:w-[30rem] lg:w-[36rem]"
            >
              <div className="media-duo aspect-[16/10]">
                {w.image ? (
                  <Image src={w.image} alt="" fill sizes="(max-width: 640px) 84vw, 576px" className="object-cover object-top" draggable={false} />
                ) : (
                  <div className="cinema absolute inset-0 grid place-items-center">
                    <svg aria-hidden viewBox="0 0 400 250" className="orbit-spin absolute h-[150%] w-[150%] opacity-40">
                      <ellipse cx="200" cy="125" rx="180" ry="56" fill="none" stroke="currentColor" strokeWidth="0.6" transform="rotate(-18 200 125)" />
                      <ellipse cx="200" cy="125" rx="120" ry="34" fill="none" stroke="currentColor" strokeWidth="0.6" transform="rotate(-18 200 125)" />
                    </svg>
                    <Mark height={110} />
                  </div>
                )}
                {w.isNew && <span className="label absolute left-4 top-4 z-10 bg-cta px-3 py-1.5 text-cta-ink">{t.new}</span>}
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-normal text-ink">{item.name}</h3>
                <span className="label shrink-0 text-ink-3">{item.date}</span>
              </div>
              <p className="label mt-2 text-signal">{item.kind}</p>
              <p className="mt-3 max-w-[34rem] text-[15px] leading-relaxed text-ink-2">{item.text}</p>
              <span className="link-arrow mt-3 text-ink">
                {t.visit}
                <NavArrowRight aria-hidden width={14} height={14} strokeWidth={1.8} />
              </span>
            </a>
          );
        })}
      </WorkRail>
    </section>
  );
}
