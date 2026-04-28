import { useEffect, useRef } from "react";
import { CURSOR_LERP_FACTOR, KONAMI_SEQUENCE } from "../../constants";
import "./Chrome.css";

const INTERACTIVE_SELECTOR =
  "a, button, .skill, .project-card, .photo-card, .progress-item";

export default function Chrome({ onKonami }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      const t = e.target;
      const isInteractive = !!(t.closest && t.closest(INTERACTIVE_SELECTOR));
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

  useEffect(() => {
    let idx = 0;
    const onKey = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === KONAMI_SEQUENCE[idx]) {
        idx++;
        if (idx === KONAMI_SEQUENCE.length) {
          idx = 0;
          onKonami?.();
        }
      } else {
        idx = k === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKonami]);

  return (
    <>
      <div className="grain" />
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor" ref={dotRef} />
    </>
  );
}
