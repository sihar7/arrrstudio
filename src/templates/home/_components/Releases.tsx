import { ArrowUpRight } from "iconoir-react";
import { Releases as list } from "@/config/studio";
import { Url } from "@/Url/Url";
import type { Dictionary, Locale } from "@/utils/i18n";

// Ledger rilis terbaru tepat di bawah hero: statis, terbaca sekilas, rilis paling baru diberi tanda.
export default function Releases({ lang, t }: { lang: Locale; t: Dictionary["hero"]["releases"] }) {
  const month = new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-US", { month: "short", year: "numeric", timeZone: "UTC" });

  return (
    <section aria-labelledby="releases-title" className="border-y-[0.5px] border-line">
      <div className="mx-auto grid max-w-[1200px] md:grid-cols-[9rem_1fr] md:px-8">
        <div className="flex items-center justify-between gap-4 px-5 pb-1 pt-6 md:flex-col md:items-start md:justify-center md:border-r-[0.5px] md:border-line md:px-0 md:py-6 md:pr-6">
          <h2 id="releases-title" className="font-mono text-xs text-ink-3">
            {t.label}
          </h2>
          <a href="#catalog" className="inline-flex min-h-11 items-center text-sm text-ink-2 underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink md:min-h-0">
            {t.all}
          </a>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
          {list.map((r) => (
            <li key={r.id} className="border-line max-sm:[&:not(:last-child)]:border-b-[0.5px] sm:max-lg:[&:nth-child(-n+2)]:border-b-[0.5px] sm:[&:nth-child(odd)]:border-r-[0.5px] lg:[&:not(:last-child)]:border-r-[0.5px]">
              <a href={Url[r.href]} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col gap-1.5 px-5 py-5 transition-colors hover:bg-tint">
                <span className="flex h-5 items-center gap-2 font-mono text-xs text-ink-3">
                  <time dateTime={r.date}>{month.format(new Date(r.date))}</time>
                  {r.isNew && <span className="rounded-full bg-accent px-2 font-sans text-[11px] font-[590] leading-5 text-accent-ink">{t.new}</span>}
                  <ArrowUpRight
                    aria-hidden
                    width={14}
                    height={14}
                    strokeWidth={1.6}
                    className="ml-auto opacity-0 transition-[opacity,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </span>
                <span className="text-[17px] font-[510] tracking-[-0.012em] text-ink">{r.name}</span>
                <span className="text-sm text-ink-3">{t.kinds[r.id]}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
