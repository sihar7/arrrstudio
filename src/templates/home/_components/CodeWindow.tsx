import type { CSSProperties } from "react";

type Principle = { title: string; text: string };

// "Siap rilis" → "SiapRilis", "Built to last" → "BuiltToLast"
const toKey = (title: string) =>
  title
    .normalize("NFD")
    .replace(/[^\w\s-]/g, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("");

type Line = { kind: "comment" | "code" | "blank"; content: string; key?: string };

// Prinsip studio ditulis sebagai ModuleScript Luau — bahasa yang dipakai semua kit ArrrStudio.
export default function CodeWindow({ principles, fileLabel }: { principles: Principle[]; fileLabel: string }) {
  const lines: Line[] = [
    { kind: "comment", content: "-- ArrrStudio · Studio.lua" },
    { kind: "code", content: "local Studio = {}" },
    { kind: "blank", content: "" },
    ...principles.flatMap<Line>((p) => [
      { kind: "comment", content: `-- ${p.title}: ${p.text}` },
      { kind: "code", content: "", key: toKey(p.title) },
      { kind: "blank", content: "" },
    ]),
    { kind: "code", content: "return Studio" },
  ];

  return (
    <div className="frame-code overflow-hidden">
      <div className="flex h-11 items-center justify-between border-b-[0.5px] border-[var(--code-bar)] px-4">
        <div className="flex h-full items-center gap-5 font-mono text-xs">
          <span className="relative flex h-full items-center text-[var(--code-strong)]">
            Studio.lua
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-[var(--maroon-500)]" />
          </span>
          <span className="hidden text-[var(--code-gutter)] sm:inline">Config.lua</span>
        </div>
        <span className="rounded-[4px] bg-[var(--code-chip)] px-1.5 text-xs leading-5 text-[var(--code-muted)]">{fileLabel}</span>
      </div>

      <ol data-reveal className="stagger py-4 font-mono text-[13px] leading-[1.7]" style={{ "--stagger": "70ms" } as CSSProperties}>
        {lines.map((l, i) => (
          <li key={i} className="a-line grid grid-cols-[3rem_1fr] pr-5">
            <span aria-hidden className="select-none pr-4 text-right text-[var(--code-gutter)]">
              {i + 1}
            </span>
            {l.kind === "comment" && <span className="whitespace-pre-wrap text-[var(--code-muted)]">{l.content}</span>}
            {l.kind === "blank" && <span aria-hidden>&nbsp;</span>}
            {l.kind === "code" && l.key && (
              <span className="text-[var(--code-text)]">
                Studio.<span className="text-[var(--code-strong)]">{l.key}</span> = <span className="text-[var(--code-keyword)]">true</span>
              </span>
            )}
            {l.kind === "code" && !l.key && (
              <span className="text-[var(--code-text)]">
                {l.content.split(" ").map((tok, j) => (
                  <span key={j} className={tok === "local" || tok === "return" ? "text-[var(--code-keyword)]" : undefined}>
                    {j > 0 && " "}
                    {tok}
                  </span>
                ))}
              </span>
            )}
          </li>
        ))}
        <li aria-hidden className="grid grid-cols-[3rem_1fr]">
          <span />
          <span className="h-[1.1em] w-[0.55em] translate-y-[0.25em] animate-pulse bg-[var(--code-strong)]" />
        </li>
      </ol>
    </div>
  );
}
