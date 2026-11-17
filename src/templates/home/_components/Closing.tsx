import { ArrowUpRight } from "iconoir-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Studio } from "@/config/studio";
import { Url } from "@/Url/Url";
import type { Dictionary } from "@/utils/i18n";

// Band sinema penutup (acuan: band gambar penuh sebelum footer McLaren): frame terakhir film, parallax pelan.
export default function Closing({ t }: { t: Dictionary["closing"] }) {
  return (
    <section aria-labelledby="closing-title" data-scroll="view" className="cinema relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src={Studio.film.closing} alt="" fill sizes="100vw" className="parallax-img object-cover opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(3_6_26/0.92)_0%,rgb(3_6_26/0.55)_55%,rgb(3_6_26/0.2)_100%)]" />
      </div>
      <div className="flex min-h-[80svh] flex-col justify-center px-4 py-28 sm:px-8 lg:px-12">
        <p data-reveal className="label mb-8 flex items-center gap-2 text-ink-2">
          <span className="star text-signal" />
          {t.eyebrow}
        </p>
        <h2 id="closing-title" className="display text-[clamp(1.9rem,5.2vw,4.6rem)] text-white">
          {t.title.map((line, i) => (
            <span key={line} data-reveal="mask" style={{ "--i": i } as CSSProperties} className="block">
              <span className="block pb-[0.06em]">{line}</span>
            </span>
          ))}
        </h2>
        <p data-reveal className="mt-8 max-w-[32rem] text-[17px] leading-relaxed text-ink-2">
          {t.text}
        </p>
        <div data-reveal className="mt-10 flex flex-wrap gap-3">
          <a href={Url.store} target="_blank" rel="noopener" className="btn btn-solid">
            {t.store}
            <ArrowUpRight aria-hidden width={15} height={15} strokeWidth={1.6} className="btn-arrow" />
          </a>
          <a href={Url.discord} target="_blank" rel="noopener" className="btn btn-line">
            {t.discord}
            <ArrowUpRight aria-hidden width={15} height={15} strokeWidth={1.6} className="btn-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
