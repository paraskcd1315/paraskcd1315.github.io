import { useEffect, type RefObject } from "react";
import { PROJECT_INTERSECTION_THRESHOLDS } from "../../constants";

/**
 * Within the horizontally-scrolling project track, finds the most-visible
 * card (highest intersection ratio) and adds `.dim` to every other card so
 * the focused one pops. Re-runs whenever any card's visibility changes.
 *
 * Bound to the same `trackRef` already wired up by useHorizontalPin so the
 * intersection root is the scroll viewport.
 */
export default function useProjectFocus(
  trackRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll(".project-card"));
    if (!cards.length) return;
    const ratios = new Map<Element, number>(cards.map((c) => [c, 0]));
    const update = () => {
      let best: Element | undefined = cards[0];
      let bestRatio = -1;
      ratios.forEach((r, c) => {
        if (r > bestRatio) {
          bestRatio = r;
          best = c;
        }
      });
      cards.forEach((c) => c.classList.toggle("dim", c !== best));
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target, e.intersectionRatio));
        update();
      },
      { root: track, threshold: [...PROJECT_INTERSECTION_THRESHOLDS] },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [trackRef]);
}
