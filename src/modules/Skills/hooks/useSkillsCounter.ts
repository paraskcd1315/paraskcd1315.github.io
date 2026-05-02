import { useEffect, useState, type RefObject } from "react";

const DEFAULT_DURATION_MS = 1400;

// Returns 0..1 progress that ramps up (ease-out cubic) the first time the
// referenced element enters the viewport. One-shot — never resets.
export default function useSkillsCounter(
  ref: RefObject<HTMLElement | null>,
  durationMs: number = DEFAULT_DURATION_MS,
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let started = false;

    const start = () => {
      const startTime = performance.now();
      const tick = () => {
        const elapsed = performance.now() - startTime;
        const t = Math.min(1, elapsed / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);
        setProgress(eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (started) return;
        if (entries[0]?.isIntersecting) {
          started = true;
          io.disconnect();
          start();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, durationMs]);

  return progress;
}
