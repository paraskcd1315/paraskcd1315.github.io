import { useEffect, type RefObject } from "react";

const VISIBLE_CLASS = "isVisible";
const ENTER_FRACTION = 0.85;
const EXIT_FRACTION = 0.05;

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
        const wh = window.innerHeight;
        pending = pending.filter((card) => {
          const r = card.getBoundingClientRect();
          const inX =
            r.left < ww * ENTER_FRACTION && r.right > ww * EXIT_FRACTION;
          const inY = r.top < wh * 0.9 && r.bottom > wh * 0.05;
          if (inX && inY) {
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
