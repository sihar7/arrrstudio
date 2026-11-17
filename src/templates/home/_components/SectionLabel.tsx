import type { SectionId } from "../_constants/sections";
import { sectionIndex } from "../_constants/sections";

// Label kecil kapital + nomor section + bintang logo, dengan garis yang tumbuh saat terlihat.
export default function SectionLabel({ id, children }: { id: SectionId; children: string }) {
  return (
    <div className="mb-10 flex items-center gap-4 lg:mb-14">
      <span className="label flex shrink-0 items-center gap-2 text-ink">
        <span className="star text-signal" />
        {children}
      </span>
      <span aria-hidden data-reveal="line" className="h-px flex-1 bg-line-strong" />
      <span className="label shrink-0 text-ink-3">{sectionIndex(id)}</span>
    </div>
  );
}
