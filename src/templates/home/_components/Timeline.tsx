import ScrollLine from "@/components/motion/ScrollLine";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SectionHead from "@/components/shared/SectionHead";
import type { Dictionary } from "@/utils/i18n";
import { sectionIndex } from "../_constants/sections";

export default function Timeline({ t }: { t: Dictionary["timeline"] }) {
  const last = t.items.length - 1;

  return (
    <section id="timeline" aria-labelledby="timeline-title" className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
      <SectionHead id="timeline-title" index={sectionIndex("timeline")} label={t.label} title={t.title} />

      <ScrollLine className="mt-12">
        <Stagger as="ol" gap={0.15} className="grid md:grid-cols-4">
          {t.items.map((item, i) => (
            <StaggerItem as="li" key={item.title} className="relative pb-10 pl-6 md:pb-0 md:pl-0 md:pr-6 md:pt-8">
              <span
                aria-hidden
                className={`absolute -left-[4px] top-1 size-[9px] rounded-full ring-4 ring-canvas md:-top-[4px] md:left-0 ${i === last ? "bg-accent" : "bg-ink-3"}`}
              />
              <p className="font-mono text-xs text-ink-3">{item.when}</p>
              <h3 className="mt-2 text-[17px] font-[510] tracking-[-0.012em]">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-3">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </ScrollLine>
    </section>
  );
}
