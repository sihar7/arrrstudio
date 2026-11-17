import type { CSSProperties } from "react";
import type { Dictionary } from "@/utils/i18n";
import SectionLabel from "./SectionLabel";

// Linimasa: di desktop ditempel & digeser horizontal oleh scroll (bintang logo berjalan di garis progres);
// di HP / gerak dikurangi tampil sebagai daftar vertikal biasa (data-pin="off").
export default function Timeline({ t }: { t: Dictionary["timeline"] }) {
  return (
    <section id="timeline" aria-labelledby="timeline-title" data-scroll="pin" className="tl" style={{ "--count": t.items.length } as CSSProperties}>
      <div className="tl-sticky">
        <div className="w-full px-4 pt-24 sm:px-8 lg:px-12">
          <SectionLabel id="timeline">{t.label}</SectionLabel>
          <h2 id="timeline-title" data-reveal className="display max-w-[18ch] text-[clamp(1.8rem,4.2vw,3.6rem)]">
            {t.title}
          </h2>
        </div>

        <div className="tl-viewport">
          <div className="tl-rule" aria-hidden>
            <span className="track-fill absolute inset-0 bg-ink" />
            <span className="track-star star absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] text-signal" />
          </div>
          <ol data-track className="track tl-track">
            {t.items.map((item, i) => (
              <li key={item.title} data-reveal style={{ "--i": i } as CSSProperties} className="tl-item">
                <span className="label text-signal">{item.when}</span>
                <h3 className="display mt-5 text-[clamp(1.2rem,2vw,1.7rem)] text-ink">{item.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{item.text}</p>
                <span aria-hidden className="tl-num display text-line">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
