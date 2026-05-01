import { useEffect, useState } from "react";

const STAGE_MS = {
  logoIn: 800,
  hold: 500,
  morph: 350,
  zoom: 1100,
} as const;

const TOTAL_MS =
  STAGE_MS.logoIn + STAGE_MS.hold + STAGE_MS.morph + STAGE_MS.zoom;

export type IntroStage = "logo-in" | "logo-hold" | "morph" | "zoom";

/**
 * Sequences the intro overlay through 4 stages: logo-in → logo-hold →
 * morph → zoom. Fires `onReveal` at the start of zoom so the hero name
 * animation can overlap the cutout expansion (no perceptible pause).
 * Fires `onDone` after the whole sequence so the overlay can unmount.
 *
 * Honors `prefers-reduced-motion`: skips all timers and fires both
 * callbacks synchronously.
 */
export default function useIntroStages(
  onReveal?: () => void,
  onDone?: () => void,
): IntroStage {
  const [stage, setStage] = useState<IntroStage>("logo-in");

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      onReveal?.();
      onDone?.();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStage("logo-hold"), STAGE_MS.logoIn));
    timers.push(
      setTimeout(() => setStage("morph"), STAGE_MS.logoIn + STAGE_MS.hold),
    );
    timers.push(
      setTimeout(
        () => {
          setStage("zoom");
          onReveal?.();
        },
        STAGE_MS.logoIn + STAGE_MS.hold + STAGE_MS.morph,
      ),
    );
    timers.push(setTimeout(() => onDone?.(), TOTAL_MS));
    return () => timers.forEach(clearTimeout);
  }, [onReveal, onDone]);

  return stage;
}
