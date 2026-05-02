export interface Section {
  id: string;
  navLabel: string;
  sectionTitle: string;
}

export interface SectionMeta extends Section {
  num: string;
  label: string;
}

const SECTIONS = [
  { id: "hero", navLabel: "Intro", sectionTitle: "Hero" },
  { id: "about", navLabel: "About", sectionTitle: "About" },
  { id: "timeline", navLabel: "Timeline", sectionTitle: "The path so far" },
  { id: "projects", navLabel: "Work", sectionTitle: "Selected work" },
  { id: "photo", navLabel: "Lens", sectionTitle: "Lens" },
  { id: "watch", navLabel: "Watch", sectionTitle: "Watch" },
  { id: "contact", navLabel: "Contact", sectionTitle: "End of file" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export default SECTIONS;

export function getSectionMeta(id: SectionId): SectionMeta {
  const idx = SECTIONS.findIndex((s) => s.id === id);
  const s = SECTIONS[idx];
  if (!s) throw new Error(`Unknown section id: ${id}`);
  const num = String(idx + 1).padStart(2, "0");
  return {
    id: s.id,
    num,
    navLabel: s.navLabel,
    sectionTitle: s.sectionTitle,
    label: `${num} / ${s.sectionTitle}`,
  };
}
