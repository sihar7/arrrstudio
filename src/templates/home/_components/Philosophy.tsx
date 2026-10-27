import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import TiltCard from "@/components/motion/TiltCard";
import SectionHead from "@/components/shared/SectionHead";
import type { Dictionary } from "@/utils/i18n";
import { sectionIndex } from "../_constants/sections";
import PlayerCard from "./PlayerCard";

export default function Philosophy({ t }: { t: Dictionary["philosophy"] }) {
  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6">
          <SectionHead id="philosophy-title" index={sectionIndex("philosophy")} label={t.label} title={t.title} />
          <Stagger gap={0.12} className="mt-6 space-y-4 text-ink-3">
            {t.story.map((p) => (
              <StaggerItem key={p.slice(0, 24)}>
                <p>{p}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2}>
            <blockquote className="mt-10 border-l-[0.5px] border-accent pl-5 text-xl font-[590] leading-snug tracking-[-0.012em] text-ink">{t.quote}</blockquote>
          </Reveal>
        </div>

        <Reveal className="md:col-span-6 md:col-start-7 md:mt-10 md:self-start">
          <TiltCard max={5}>
            <PlayerCard card={t.card} name={t.name} />
          </TiltCard>
        </Reveal>
      </div>

      <Stagger as="ol" gap={0.1} className="mt-16 grid gap-8 md:grid-cols-3">
        {t.values.map((value, i) => (
          <StaggerItem as="li" key={value.title} className="border-t-[0.5px] border-line-strong pt-6">
            <span className="font-mono text-xs text-ink-3">0{i + 1}</span>
            <h3 className="mt-3 text-[17px] font-[510] tracking-[-0.012em]">{value.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink-3">{value.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
