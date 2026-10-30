import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import ActionLink from "@/components/shared/ActionLink";
import Logo from "@/components/brand/Logo";
import { Studio } from "@/config/studio";
import { host, Url } from "@/Url/Url";
import type { Dictionary } from "@/utils/i18n";

export default function Closing({ t }: { t: Dictionary }) {
  const links = [Url.store, Url.license, Url.converter, Url.databridge, Url.discord];

  return (
    <footer>
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 md:grid-cols-12">
          <SplitText text={t.closing.title} className="text-[clamp(2.2rem,5vw,4.5rem)] font-[510] leading-none tracking-[-0.022em] md:col-span-8" />
          <Reveal delay={0.25} className="md:col-span-4 md:self-end">
            <p className="text-ink-3">{t.closing.text}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ActionLink href={Url.store}>{t.closing.store}</ActionLink>
              <ActionLink href={Url.discord} variant="secondary">
                {t.closing.discord}
              </ActionLink>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-8 border-t-[0.5px] border-line pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo height={52} />
            <p className="mt-4 text-sm text-ink-3">
              © {Studio.foundedYear} {Studio.name}. {t.footer.rights} {t.footer.by}{" "}
              <a href={Url.founderPortfolio} target="_blank" rel="noopener noreferrer" className="text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink">
                {Studio.founder.name}
              </a>
              .
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-ink-3">
            {links.map((href) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center hover:text-ink">
                  {host(href)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
