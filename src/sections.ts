/**
 * Single source of truth for sections in display order.
 * Add / remove / reorder entries here — every consumer (SideProgress,
 * the section-label rendered inside each section, etc.) reads from this
 * registry, so numbering stays in sync automatically.
 */

export interface Section {
  /** DOM id used for in-page anchors (must match the component's <section id=...>) */
  id: string;
  /** Short label rendered in the side progress nav */
  navLabel: string;
  /** Visible title rendered after the number in each section's section-label */
  sectionTitle: string;
}

export interface SectionMeta extends Section {
  /** Zero-padded position number ("01", "02", …) derived from index */
  num: string;
  /** Pre-formatted "{num} / {sectionTitle}" string ready for rendering */
  label: string;
}

const SECTIONS = [
  { id: "hero", navLabel: "Intro", sectionTitle: "Hero" },
  { id: "about", navLabel: "About", sectionTitle: "About" },
  { id: "skills", navLabel: "Skills", sectionTitle: "Skills" },
  { id: "projects", navLabel: "Work", sectionTitle: "Selected work" },
  { id: "photo", navLabel: "Lens", sectionTitle: "Lens" },
  { id: "watch", navLabel: "Watch", sectionTitle: "Watch" },
  { id: "contact", navLabel: "Contact", sectionTitle: "End of file" },
] as const;

/** Literal union of all registered section ids. */
export type SectionId = (typeof SECTIONS)[number]["id"];

export default SECTIONS;

/**
 * Look up section metadata for a known section id. Param is restricted
 * to the literal union `SectionId`, so the lookup is guaranteed to
 * succeed and the return type is non-null.
 */
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
