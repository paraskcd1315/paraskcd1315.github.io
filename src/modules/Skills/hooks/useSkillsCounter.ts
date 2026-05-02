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

    // Fire only when the section overlaps the middle 20% of the viewport
    // (rootMargin shrinks the IO root to a center band) — keeps the
    // count-up tied to the user actually being on Skills, not just
    // peeking at it from below.
    const io = new IntersectionObserver(
      (entries) => {
        if (started) return;
        if (entries[0]?.isIntersecting) {
          started = true;
          io.disconnect();
          start();
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, durationMs]);

  return progress;
}
