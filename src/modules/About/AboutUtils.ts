import styles from "./About.module.scss";

export type AboutCardState = "active" | "past" | "upcoming";

const STATE_CLASS: Record<AboutCardState, string> = {
  active: "isActive",
  past: "isPast",
  upcoming: "isUpcoming",
};

const LEAVE_START = 0.55;
const LEAVE_RANGE = 0.45;

const clamp01 = (n: number): number => Math.max(0, Math.min(1, n));

export function aboutCardState(index: number, active: number): AboutCardState {
  if (index === active) return "active";
  return index < active ? "past" : "upcoming";
}

export function aboutCardClass(state: AboutCardState): string {
  return styles[STATE_CLASS[state]] ?? "";
}

export function aboutLeaveProgress(
  progress: number,
  storyCount: number,
  active: number,
): number {
  const local = clamp01(progress * storyCount - active);
  return clamp01((local - LEAVE_START) / LEAVE_RANGE);
}
