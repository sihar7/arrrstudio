import { ArrowUpRight } from "iconoir-react";
import type { CSSProperties } from "react";
import { Catalog as groups } from "@/config/studio";
import { Url } from "@/Url/Url";
import type { Dictionary } from "@/utils/i18n";
import SectionLabel from "./SectionLabel";

// Katalog sebagai indeks bernomor (bukan grid kartu): baris dengan garis yang menyapu saat hover.
export default function Catalog({ t }: { t: Dictionary["catalog"] }) {
  const columns = [
    ...groups.map((g) => ({ key: g.key, title: t.groups[g.key], items: g.items as readonly string[] })),
    { key: "services", title: t.groups.services, items: t.services },
  ];

  return (
    <section id="catalog" aria-labelledby="catalog-title" className="bg-surface">
      <div className="px-4 py-24 sm:px-8 lg:px-12 lg:py-36">
        <SectionLabel id="catalog">{t.label}</SectionLabel>
        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="catalog-title" data-reveal className="display text-[clamp(1.8rem,4.2vw,3.6rem)]">
            {t.title}
          </h2>
          <p data-reveal className="max-w-[26rem] text-[15px] leading-relaxed text-ink-2">
            {t.lead}
          </p>
        </div>

        <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
          {columns.map((col) => (
            <div key={col.key}>
              <p className="label flex items-baseline justify-between border-b border-line-strong pb-4 text-ink">
                {col.title}
                <span className="text-ink-3">{String(col.items.length).padStart(2, "0")}</span>
              </p>
              <ul>
                {col.items.map((name, i) => (
                  <li key={name} data-reveal style={{ "--i": i } as CSSProperties} className="index-row flex items-baseline gap-4 border-b border-line py-3.5">
                    <span className="label w-6 shrink-0 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    <span className="index-name text-[16px] text-ink">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <a href={Url.store} target="_blank" rel="noopener" className="btn btn-solid mt-14">
          {t.cta}
          <ArrowUpRight aria-hidden width={15} height={15} strokeWidth={1.6} className="btn-arrow" />
        </a>
      </div>
    </section>
  );
}
