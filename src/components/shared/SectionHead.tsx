import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";

// Kepala bagian: label mono kecil (metadata) lalu judul 48px berbobot 510 yang muncul per kata.
export default function SectionHead({ id, index, label, title, lead }: { id: string; index: string; label: string; title: string; lead?: string }) {
  return (
    <header>
      <Reveal y={12}>
        <p className="font-mono text-xs text-ink-3">
          {index} · {label}
        </p>
      </Reveal>
      <SplitText id={id} text={title} className="mt-4 max-w-[20ch] text-[clamp(2rem,4vw,3rem)] font-[510] leading-none tracking-[-0.022em]" />
      {lead && (
        <Reveal delay={0.15}>
          <p className="mt-4 max-w-[52ch] text-ink-3">{lead}</p>
        </Reveal>
      )}
    </header>
  );
}
