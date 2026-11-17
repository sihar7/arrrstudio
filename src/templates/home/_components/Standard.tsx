import type { CSSProperties } from "react";
import type { Dictionary } from "@/utils/i18n";
import SectionLabel from "./SectionLabel";

// Tiga janji sebagai panel lebar yang saling menumpuk saat digulir (sticky), angka besar sebagai jangkar.
export default function Standard({ t }: { t: Dictionary["standard"] }) {
  return (
    <section id="standard" aria-labelledby="standard-title" className="px-4 py-24 sm:px-8 lg:px-12 lg:py-36">
      <SectionLabel id="standard">{t.label}</SectionLabel>
      <h2 id="standard-title" data-reveal className="display mb-14 max-w-[20ch] text-[clamp(1.8rem,4.2vw,3.6rem)]">
        {t.title}
      </h2>
      <ol>
        {t.items.map((item, i) => (
          <li
            key={item.title}
            style={{ "--i": i } as CSSProperties}
            className="stack-panel sticky mb-6 grid min-h-[22rem] gap-8 border border-line bg-surface p-6 shadow-[0_-24px_48px_-32px_rgb(3_6_26/0.5)] sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-end lg:gap-16 lg:p-14"
          >
            <span aria-hidden className="display text-[clamp(4.5rem,11vw,9.5rem)] leading-[0.8] text-line-strong">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="max-w-[40rem]">
              <h3 className="display text-[clamp(1.25rem,2.4vw,2rem)] text-ink">{item.title}</h3>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-2">{item.text}</p>
            </div>
            <span className="label flex items-center gap-2 text-signal">
              <span className="star" />
              {item.meta}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
