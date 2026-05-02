import { useEffect, type RefObject } from "react";

const VISIBLE_CLASS = "isVisible";

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

    const stage = track.parentElement;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(VISIBLE_CLASS);
          }
        });
      },
      { root: stage ?? null, threshold: 0.15 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [trackRef]);
}
