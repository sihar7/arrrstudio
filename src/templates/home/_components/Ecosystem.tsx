import { AppWindow, ArrowUpRight, Discord, Key, Shop } from "iconoir-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import SectionHead from "@/components/shared/SectionHead";
import { host, Url } from "@/Url/Url";
import type { Dictionary } from "@/utils/i18n";
import { sectionIndex } from "../_constants/sections";

const doors = [
  { key: "store", id: "ARR-101", href: Url.store, Icon: Shop },
  { key: "license", id: "ARR-102", href: Url.license, Icon: Key },
  { key: "converter", id: "ARR-103", href: Url.converter, Icon: AppWindow },
  { key: "discord", id: "ARR-104", href: Url.discord, Icon: Discord },
] as const;

export default function Ecosystem({ t }: { t: Dictionary["ecosystem"] }) {
  return (
    <section id="ecosystem" aria-labelledby="ecosystem-title" className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
      <SectionHead id="ecosystem-title" index={sectionIndex("ecosystem")} label={t.label} title={t.title} lead={t.lead} />

      <Stagger as="ul" gap={0.09} className="frame mt-12 divide-y-[0.5px] divide-line overflow-hidden">
        {doors.map(({ key, id, href, Icon }) => {
          const item = t.items[key];
          return (
            <StaggerItem as="li" key={key}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="spotlight group grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 p-5 md:grid-cols-[5.5rem_15rem_1fr_auto_auto] md:items-center md:gap-x-6 md:px-6"
              >
                <span className="hidden font-mono text-xs text-ink-3 md:block">{id}</span>
                <span className="flex items-center gap-3">
                  <Icon aria-hidden width={18} height={18} strokeWidth={1.5} className="shrink-0 text-ink-3 transition-colors group-hover:text-ink" />
                  <span className="text-[17px] font-[510] tracking-[-0.012em] transition-transform duration-300 group-hover:translate-x-1">{item.name}</span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  width={18}
                  height={18}
                  strokeWidth={1.5}
                  className="text-ink-3 transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink md:order-last"
                />
                <p className="col-span-2 text-[15px] leading-relaxed text-ink-3 md:col-span-1">{item.text}</p>
                <span className="col-span-2 justify-self-start rounded-[4px] bg-tint px-1.5 font-mono text-xs leading-5 text-ink-3 md:col-span-1">{host(href)}</span>
              </a>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
