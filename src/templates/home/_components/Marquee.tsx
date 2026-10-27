import { Catalog } from "@/config/studio";

// Strip nama produk berjalan pelan (peran "logo bar" pada acuan), berhenti saat di-hover.
export default function Marquee({ caption }: { caption: string }) {
  const names = Catalog.flatMap((g) => g.items);

  return (
    <section aria-label={caption} className="border-y-[0.5px] border-line py-8">
      <p className="mx-auto max-w-[1200px] px-5 font-mono text-xs text-ink-3 md:px-8">{caption}</p>
      <div className="marquee relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="marquee-track flex w-max">
          {[0, 1].map((copy) =>
            names.map((name) => (
              <li key={`${copy}-${name}`} aria-hidden={copy === 1 || undefined} className="flex items-center whitespace-nowrap px-6 text-lg font-[510] tracking-[-0.012em] text-ink-3 transition-colors hover:text-ink">
                {name}
                <span aria-hidden className="ml-12 size-1 rounded-full bg-line-strong" />
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
