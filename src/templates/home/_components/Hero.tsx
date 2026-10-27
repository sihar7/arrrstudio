import { ArrowRight } from "iconoir-react";
import ActionLink from "@/components/shared/ActionLink";
import { Studio } from "@/config/studio";
import { Url } from "@/Url/Url";
import type { Dictionary } from "@/utils/i18n";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import TiltOnScroll from "@/components/motion/TiltOnScroll";
import HeroScene from "./HeroScene";

export default function Hero({ t }: { t: Dictionary }) {
  const spec = [
    { k: t.spec.founded, v: String(Studio.foundedYear) },
    { k: t.spec.founder, v: t.spec.founderValue },
    { k: t.spec.base, v: `${Studio.city}, Indonesia` },
    { k: t.spec.team, v: t.spec.teamValue },
    { k: t.spec.focus, v: t.spec.focusValue },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden className="hero-floor absolute inset-x-0 bottom-0 -z-10 h-[46%]" />

      <div className="mx-auto max-w-[1200px] px-5 pt-14 md:px-8 md:pt-24">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal y={10}>
              <p className="font-mono text-xs text-ink-3">{t.hero.eyebrow}</p>
            </Reveal>
            <SplitText as="h1" id="hero-title" onMount delay={0.1} text={t.hero.title} className="mt-5 text-[clamp(2.5rem,6vw,4.5rem)] font-[510] leading-none tracking-[-0.022em]" />
          </div>
          <Reveal delay={0.45} className="md:col-span-4">
            <p className="text-ink-3">{t.hero.lead}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <ActionLink href={Url.store}>{t.hero.primary}</ActionLink>
              <a
                href={Url.license}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-1.5 text-[15px] text-ink-2 transition-colors hover:text-ink"
              >
                {t.hero.secondary}
                <ArrowRight aria-hidden width={16} height={16} strokeWidth={1.6} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        <TiltOnScroll className="mt-14 md:-mx-6 md:mt-20">
        <figure className="frame relative overflow-hidden">
          <figcaption className="relative z-10 flex h-11 items-center justify-between gap-4 border-b-[0.5px] border-line px-4 font-mono text-xs text-ink-3">
            <span className="truncate">ARR-0001 · arrr-mark</span>
            <span className="flex shrink-0 items-center gap-2">
              {t.hero.badges.map((b) => (
                <span key={b} className="rounded-[4px] bg-tint px-1.5 font-sans text-xs leading-5 text-ink-3">
                  {b}
                </span>
              ))}
            </span>
          </figcaption>

          <div className="relative aspect-[4/3] bg-[radial-gradient(80%_70%_at_50%_45%,#1a1b1e,#0b0c0d)] sm:aspect-[16/8]">
            <HeroScene label={t.hero.sceneLabel} />

            <dl className="pointer-events-none absolute bottom-4 left-4 flex gap-6 font-mono text-xs text-[var(--fog)] sm:bottom-6 sm:left-6">
              <div>
                <dt>Est.</dt>
                <dd className="mt-1 text-[var(--mist)]">{Studio.foundedYear}</dd>
              </div>
              <div>
                <dt>City</dt>
                <dd className="mt-1 text-[var(--mist)]">{Studio.city}</dd>
              </div>
              <div>
                <dt>By</dt>
                <dd className="mt-1 text-[var(--mist)]">{Studio.founder.initials}</dd>
              </div>
            </dl>
            <p className="pointer-events-none absolute bottom-4 right-4 hidden font-mono text-xs text-[var(--fog)] sm:bottom-6 sm:right-6 [@media(pointer:fine)]:sm:block">
              {t.hero.sceneHint}
            </p>
          </div>
        </figure>
        </TiltOnScroll>

        <Stagger as="dl" gap={0.08} className="grid grid-cols-2 py-10 md:grid-cols-5 md:py-14">
          {spec.map((row) => (
            <StaggerItem key={row.k} className="py-3 pr-4">
              <dt className="font-mono text-xs text-ink-3">{row.k}</dt>
              <dd className="mt-1.5 text-[15px] text-ink-2">{row.v}</dd>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
