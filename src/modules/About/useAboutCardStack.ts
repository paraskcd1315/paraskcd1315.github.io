import { useEffect, useRef, useState } from "react";
import { MOBILE_BREAKPOINT_PX } from "../../constants";

/**
 * Drives the About section's vertically-pinned card stack. As the user
 * scrolls past the pinned container, a 0..1 progress drives which story
 * card is currently active. Mobile (≤ MOBILE_BREAKPOINT_PX) opts out:
 * progress stays 0, active stays 0, the markup falls back to a normal
 * stacked column via CSS.
 */
export default function useAboutCardStack(storyCount: number) {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const pin = pinRef.current;
      if (pin && window.innerWidth > MOBILE_BREAKPOINT_PX) {
        const r = pin.getBoundingClientRect();
        const total = pin.offsetHeight - window.innerHeight;
        const p = total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0;
        const idx = Math.min(
          storyCount - 1,
          Math.max(0, Math.floor(p * storyCount)),
        );
        setActive((prev) => (prev !== idx ? idx : prev));
        setProgress((prev) => (prev !== p ? p : prev));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [storyCount]);

  return { pinRef, active, progress };
}
