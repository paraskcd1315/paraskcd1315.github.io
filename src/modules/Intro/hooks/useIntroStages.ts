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

export default function useIntroStages(
  onReveal?: () => void,
  onDone?: () => void,
): IntroStage {
  const [stage, setStage] = useState<IntroStage>("logo-in");

  useEffect(() => {
    const reduceMotion = !!globalThis.window?.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      onReveal?.();
      onDone?.();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [
      setTimeout(() => setStage("logo-hold"), STAGE_MS.logoIn),
      setTimeout(() => setStage("morph"), STAGE_MS.logoIn + STAGE_MS.hold),
      setTimeout(
        () => {
          setStage("zoom");
          onReveal?.();
        },
        STAGE_MS.logoIn + STAGE_MS.hold + STAGE_MS.morph,
      ),
      setTimeout(() => onDone?.(), TOTAL_MS),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onReveal, onDone]);

  return stage;
}
