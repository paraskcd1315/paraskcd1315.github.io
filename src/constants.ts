export const PARALLAX_MAX = 800;
export const HERO_FADE_DISTANCE = 600;
export const HERO_NAME_REVEAL_DELAY_MS = 60;

export const KONAMI_FLASH_DURATION_MS = 1600;
export const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

export const APOD_LOOKBACK_DAYS = 90;
export const APOD_RETRY_COUNT = 4;

export type Season = "winter" | "spring" | "summer" | "autumn";

export const SEASONS_BY_MONTH: readonly Season[] = [
  "winter",
  "winter",
  "spring",
  "spring",
  "spring",
  "summer",
  "summer",
  "summer",
  "autumn",
  "autumn",
  "autumn",
  "winter",
];

export const PROJECT_INTERSECTION_THRESHOLDS = [0, 0.25, 0.5, 0.75, 1] as const;
export const MOBILE_BREAKPOINT_PX = 900;

export const CURSOR_LERP_FACTOR = 0.18;
