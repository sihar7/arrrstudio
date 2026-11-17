import { ArrowRight, ArrowUp } from "iconoir-react";
import { Mark, Wordmark } from "@/components/brand/Logo";
import { Studio } from "@/config/studio";
import { Url, host } from "@/Url/Url";
import type { Dictionary } from "@/utils/i18n";
import { sections } from "../_constants/sections";

// Footer kolom (acuan McLaren): judul kapital kecil, tautan ringan, baris "gabung" bergaris bawah, lalu baris legal.
export default function Footer({ t, nav }: { t: Dictionary["footer"]; nav: Dictionary["nav"] }) {
  const products = [
    { label: "Arrveil.store", href: Url.store },
    { label: "ARRR Studio Bypass", href: Url.converter },
    { label: "ARRR DataBridge", href: Url.databridge },
    { label: "ArrStudio License", href: Url.license },
  ];
  const community = [
    { label: "Discord", href: Url.discord },
    { label: "GitHub", href: Url.founderGithub },
    { label: host(Url.founderPortfolio), href: Url.founderPortfolio },
  ];

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="px-4 pb-10 pt-20 sm:px-8 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.6fr]">
          <FooterCol title={t.studio} links={sections.map((id) => ({ label: nav[id], href: `#${id}` }))} />
          <FooterCol title={t.products} links={products} external />
          <FooterCol title={t.community} links={community} external />
          <div>
            <p className="label text-ink">Discord</p>
            <a href={Url.discord} target="_blank" rel="noopener" className="group mt-5 flex min-h-12 items-center justify-between gap-4 border-b border-line-strong pb-3 text-ink-2 transition-colors hover:border-ink hover:text-ink">
              {t.join}
              <ArrowRight aria-hidden width={18} height={18} strokeWidth={1.5} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 text-ink">
            <Mark height={26} shine={false} />
            <Wordmark height={9} />
          </div>
          <p className="text-[13px] text-ink-3">
            © {Studio.foundedYear} {Studio.name} · {Studio.city}, ID · {t.rights} {t.by} {Studio.founder.name}
          </p>
          <a href="#main" className="label flex min-h-11 items-center gap-2 text-ink transition-opacity hover:opacity-70">
            {nav.backToTop}
            <ArrowUp aria-hidden width={14} height={14} strokeWidth={1.6} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, external }: { title: string; links: Array<{ label: string; href: string }>; external?: boolean }) {
  return (
    <div>
      <p className="label text-ink">{title}</p>
      <ul className="mt-5 space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              {...(external ? { target: "_blank", rel: "noopener" } : {})}
              className="inline-flex min-h-10 items-center text-[15px] text-ink-2 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
