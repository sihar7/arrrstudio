import type { CSSProperties } from "react";
import type { Dictionary } from "@/utils/i18n";
import SectionLabel from "./SectionLabel";

// Paragraf editorial besar (acuan McLaren) yang menyala kata demi kata mengikuti scroll (--p dari ScrollVars).
export default function StudioStatement({ t }: { t: Dictionary["studio"] }) {
  const words = t.text.split(" ");
  return (
    <section id="studio" aria-label={t.label} className="px-4 py-28 sm:px-8 lg:px-12 lg:py-40">
      <SectionLabel id="studio">{t.label}</SectionLabel>
      <p data-scroll="read" style={{ "--n": words.length } as CSSProperties} className="max-w-[62rem] text-[clamp(1.5rem,3.2vw,2.75rem)] font-light leading-[1.28] tracking-[-0.01em] text-ink">
        {words.map((w, i) => (
          <span key={i} className="scrub-word" style={{ "--i": i } as CSSProperties}>
            {w}{" "}
          </span>
        ))}
      </p>
      <dl className="mt-20 grid grid-cols-2 border-t border-line lg:grid-cols-4">
        {t.facts.map((f, i) => (
          <div key={f.k} data-reveal style={{ "--i": i } as CSSProperties} className="border-b border-line py-6 pr-4 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
            <dt className="label text-ink-3">{f.k}</dt>
            <dd className="mt-3 text-lg font-normal text-ink">{f.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
