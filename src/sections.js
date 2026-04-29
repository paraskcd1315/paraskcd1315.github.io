/**
 * Single source of truth for sections in display order.
 * Add / remove / reorder entries here — every consumer (SideProgress,
 * the section-label rendered inside each section, etc.) reads from this
 * registry, so numbering stays in sync automatically.
 *
 * Fields:
 * - id            DOM id used for in-page anchors (must match the
 *                 component's <section id=...>).
 * - navLabel      Short label rendered in the side progress nav.
 * - sectionTitle  Visible title rendered after the number in each
 *                 section's `<div class="section-label">{num} / {title}</div>`.
 */
const SECTIONS = [
  { id: "hero", navLabel: "Intro", sectionTitle: "Hero" },
  { id: "about", navLabel: "About", sectionTitle: "About" },
  { id: "skills", navLabel: "Skills", sectionTitle: "Skills" },
  { id: "projects", navLabel: "Work", sectionTitle: "Selected work" },
  { id: "photo", navLabel: "Lens", sectionTitle: "Lens" },
  { id: "watch", navLabel: "Watch", sectionTitle: "Watch" },
  { id: "contact", navLabel: "Contact", sectionTitle: "End of file" },
];

export default SECTIONS;

/**
 * Look up section metadata for a given id, including its zero-padded
 * position number derived from its index in SECTIONS. Returns null if
 * the id isn't registered.
 *
 * @returns {{ id, num, navLabel, sectionTitle, label } | null}
 *   `num`   — "01", "02", ...
 *   `label` — pre-formatted "{num} / {sectionTitle}" string ready for
 *             rendering as the section's section-label.
 */
export function getSectionMeta(id) {
  const idx = SECTIONS.findIndex((s) => s.id === id);
  if (idx < 0) return null;
  const s = SECTIONS[idx];
  const num = String(idx + 1).padStart(2, "0");
  return {
    id: s.id,
    num,
    navLabel: s.navLabel,
    sectionTitle: s.sectionTitle,
    label: `${num} / ${s.sectionTitle}`,
  };
}
