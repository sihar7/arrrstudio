import Image from "next/image";
import Parallax from "@/components/motion/Parallax";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import ActionLink from "@/components/shared/ActionLink";
import { Studio } from "@/config/studio";
import { Url } from "@/Url/Url";
import type { Dictionary } from "@/utils/i18n";
import { sectionIndex } from "../_constants/sections";

export default function Founder({ t }: { t: Dictionary["founder"] }) {
  const { founder } = Studio;

  return (
    <section id="founder" aria-labelledby="founder-title">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 md:grid-cols-12 md:items-end md:px-8 md:py-24">
        <Reveal className="md:col-span-5">
          <figure className="frame spotlight overflow-hidden">
            <Parallax className="aspect-[4/5] bg-sunken">
              <Image
                src={founder.photo.src}
                alt={founder.name}
                width={founder.photo.width}
                height={founder.photo.height}
                sizes="(min-width: 768px) 440px, 92vw"
                className="size-full object-cover"
              />
            </Parallax>
            <figcaption className="flex h-11 items-center justify-between border-t-[0.5px] border-line px-4 font-mono text-xs text-ink-3">
              <span>ARR-FOUNDER · {founder.initials}</span>
              <span>{Studio.city}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal y={12}>
            <p className="mb-4 font-mono text-xs text-ink-3">
              {sectionIndex("founder")} · {t.label}
            </p>
          </Reveal>
          <SplitText id="founder-title" text={founder.name} className="text-[clamp(2rem,4vw,3rem)] font-[510] leading-none tracking-[-0.022em]" />
          <Reveal delay={0.1}>
            <p className="mt-3 text-[15px] text-ink-3">
              {t.role} · {Studio.city}
            </p>
            <p className="mt-6 max-w-[56ch] text-ink-2">{t.bio}</p>
            <p className="mt-8 font-mono text-xs text-ink-3">{t.stack}</p>
          </Reveal>
          <Stagger as="ul" gap={0.04} delay={0.2} className="mt-3 flex flex-wrap gap-2">
            {founder.stack.map((s) => (
              <StaggerItem as="li" variant="pop" key={s} className="rounded-full bg-tint px-3 py-1 text-[13px] text-ink-2">
                {s}
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
            <ActionLink href={Url.founderPortfolio} variant="secondary">
              {t.portfolio}
            </ActionLink>
            <ActionLink href={Url.founderGithub} variant="secondary">
              {t.github}
            </ActionLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
