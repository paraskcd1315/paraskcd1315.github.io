import { useEffect, type RefObject } from "react";

const VISIBLE_CLASS = "isVisible";
const ENTER_FRACTION = 0.85; // card.left must cross past 85% of viewport width
const EXIT_FRACTION = 0.05; // card.right must still be past 5% of viewport

// Marks each `.timeline-event` with `isVisible` once it crosses into the
// viewport during the horizontal camera pan. One-way (never removes the
// class) so the drop-in animation plays exactly once per card.
//
// IO with a transformed root is unreliable on transform-only translate
// changes — we use a rAF loop reading getBoundingClientRect instead.
export default function useTimelineReveal(
  trackRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(
      track.querySelectorAll<HTMLElement>(".timeline-event"),
    );
    if (cards.length === 0) return;

    let raf = 0;
    let pending = cards.slice();
    const tick = () => {
      if (pending.length > 0) {
        const ww = window.innerWidth;
        pending = pending.filter((card) => {
          const r = card.getBoundingClientRect();
          if (r.left < ww * ENTER_FRACTION && r.right > ww * EXIT_FRACTION) {
            card.classList.add(VISIBLE_CLASS);
            return false;
          }
          return true;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trackRef]);
}
