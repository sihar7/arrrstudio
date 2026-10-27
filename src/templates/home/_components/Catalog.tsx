import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import ActionLink from "@/components/shared/ActionLink";
import SectionHead from "@/components/shared/SectionHead";
import { Catalog as catalog } from "@/config/studio";
import { Url } from "@/Url/Url";
import type { Dictionary } from "@/utils/i18n";
import { sectionIndex } from "../_constants/sections";

export default function Catalog({ t }: { t: Dictionary["catalog"] }) {
  const groups = [...catalog.map((g) => ({ title: t.groups[g.key], items: g.items })), { title: t.groups.services, items: t.services }];

  return (
    <section id="catalog" aria-labelledby="catalog-title" className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <SectionHead id="catalog-title" index={sectionIndex("catalog")} label={t.label} title={t.title} lead={t.lead} />
          <Reveal delay={0.25} className="mt-8">
            <ActionLink href={Url.store}>{t.cta}</ActionLink>
          </Reveal>
        </div>

        <Reveal className="md:col-span-7">
          <div className="frame spotlight divide-y-[0.5px] divide-line">
            {groups.map((group) => (
              <div key={group.title} className="p-6">
                <h3 className="flex items-baseline justify-between text-[15px] font-[510]">
                  {group.title}
                  <span className="font-mono text-xs font-normal tabular-nums text-ink-3">{String(group.items.length).padStart(2, "0")}</span>
                </h3>
                <Stagger as="ul" gap={0.035} delay={0.15} className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((name) => (
                    <StaggerItem as="li" variant="pop" key={name} className="rounded-full bg-tint px-3 py-1 text-[13px] text-ink-2 transition-colors hover:text-ink">
                      {name}
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
