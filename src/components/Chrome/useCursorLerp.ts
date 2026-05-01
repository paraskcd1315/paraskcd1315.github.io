import { useEffect, useRef } from "react";
import { CURSOR_LERP_FACTOR } from "../../constants";

const INTERACTIVE_SELECTOR =
  "a, button, .skill, .project-card, .photo-card, .progress-item";

/**
 * Custom-cursor pair: a snap-to-pointer dot and a smoothly-lerped ring.
 * Returns refs to attach to the two elements. The ring eases toward the
 * pointer at CURSOR_LERP_FACTOR per frame; both elements gain `.hover`
 * when the pointer is over an interactive selector.
 */
export default function useCursorLerp() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      const t = e.target as Element | null;
      const isInteractive = !!t?.closest?.(INTERACTIVE_SELECTOR);
      dotRef.current?.classList.toggle("hover", !!isInteractive);
      ringRef.current?.classList.toggle("hover", !!isInteractive);
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      const t = targetRef.current;
      const r = ringPosRef.current;
      r.x += (t.x - r.x) * CURSOR_LERP_FACTOR;
      r.y += (t.y - r.y) * CURSOR_LERP_FACTOR;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${r.x}px, ${r.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { dotRef, ringRef };
}
