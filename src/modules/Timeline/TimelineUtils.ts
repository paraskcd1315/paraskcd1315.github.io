const YEARS_TO_PX = 20;
const MAX_GAP_PX = 240;

export function parseTimelineDate(date: string): number {
	const [year, month, day] = date.split('-');
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

export function deriveTimelineEras(items: readonly { date: string }[], count = 5): { year: string; x: number }[] {
	const first = items[0];
	const last = items[items.length - 1];
	if (!first || !last || count < 2) return [];
	const minY = Math.floor(parseTimelineDate(first.date));
	const maxY = Math.floor(parseTimelineDate(last.date));
	const span = maxY - minY;
	if (span <= 0) return [];
	return Array.from({ length: count }, (_, i) => {
		const frac = i / (count - 1);
		return { year: String(Math.round(minY + frac * span)), x: frac * 100 };
	});
}
