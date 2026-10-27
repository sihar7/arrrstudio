import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import SectionHead from "@/components/shared/SectionHead";
import type { Dictionary } from "@/utils/i18n";
import { sectionIndex } from "../_constants/sections";
import CodeWindow from "./CodeWindow";

export default function About({ t }: { t: Dictionary["about"] }) {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <SectionHead id="about-title" index={sectionIndex("about")} label={t.label} title={t.title} />
          <Reveal delay={0.1} className="mt-6 space-y-4 text-ink-3">
            {t.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>

        <Reveal className="md:col-span-7 md:mt-10 md:self-start">
          <TiltCard max={4}>
            <CodeWindow principles={t.principles} fileLabel={t.fileLabel} />
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
