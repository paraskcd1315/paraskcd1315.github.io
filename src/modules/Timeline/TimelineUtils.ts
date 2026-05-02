// Per-event horizontal gap is proportional to the time elapsed since the
// previous event. Capped so even a 16-year jump (1996-09 → 2012) reads as
// a teaser pause rather than dead space.
const YEARS_TO_PX = 10;
const MAX_GAP_PX = 160;

// Accepts "YYYY", "YYYY-MM", or "YYYY-MM-DD". Returns fractional years.
export function parseTimelineDate(date: string): number {
  const [year, month, day] = date.split("-");
  const y = Number(year);
  const m = month ? Number(month) : 1;
  const d = day ? Number(day) : 1;
  return y + (m - 1) / 12 + (d - 1) / 365;
}

export function eventGapPx(prevDate: string | null, currDate: string): number {
  if (prevDate === null) return 0;
  const years = parseTimelineDate(currDate) - parseTimelineDate(prevDate);
  if (years <= 0) return 0;
  return Math.min(MAX_GAP_PX, Math.round(years * YEARS_TO_PX));
}
