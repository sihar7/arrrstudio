// Urutan bagian halaman = urutan nomor di navigasi.
export const sections = ["about", "philosophy", "founder", "ecosystem", "catalog", "timeline"] as const;
export type SectionId = (typeof sections)[number];

export const sectionIndex = (id: SectionId) => String(sections.indexOf(id) + 1).padStart(2, "0");
