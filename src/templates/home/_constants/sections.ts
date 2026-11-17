// Urutan bagian halaman = urutan nomor di menu.
export const sections = ["studio", "work", "origin", "standard", "catalog", "timeline"] as const;
export type SectionId = (typeof sections)[number];

export const sectionIndex = (id: SectionId) => String(sections.indexOf(id) + 1).padStart(2, "0");
