import { useEffect, useRef, useState, type CSSProperties } from "react";
import PORTFOLIO_DATA from "../../data";
import ProjectMock from "../ProjectMock";
import type { ProjectMockKind } from "../ProjectMock/ProjectMock.types";
import {
  MOBILE_BREAKPOINT_PX,
  PROJECT_INTERSECTION_THRESHOLDS,
} from "../../constants";
import { getSectionMeta } from "../../sections";
import "./Projects.css";

const meta = getSectionMeta("projects");

export default function Projects() {
  const D = PORTFOLIO_DATA;
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const pin = pinRef.current;
      const track = trackRef.current;
      if (pin && track && window.innerWidth > MOBILE_BREAKPOINT_PX) {
        const r = pin.getBoundingClientRect();
        const total = pin.offsetHeight - window.innerHeight;
        const p = Math.max(0, Math.min(1, -r.top / total));
        setProgress(p);
        const trackW = track.scrollWidth - window.innerWidth;
        track.style.transform = `translate3d(${-p * trackW}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll(".project-card"));
    if (!cards.length) return;
    const ratios = new Map(cards.map((c) => [c, 0]));
    const update = () => {
      let best = cards[0];
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
  }, []);

  return (
    <section id="projects" className="projects">
      <div className="projects-head">
        <div>
          <div className="section-label">{meta.label}</div>
          <h2>Things I've shipped.</h2>
        </div>
        <div className="meta">
          <div>
            <strong>{D.projects.length}</strong> selected · 2023 → 2026
          </div>
          <div>Swipe → to navigate</div>
        </div>
      </div>
      <div className="projects-pin" ref={pinRef}>
        <div className="projects-stage">
          <div className="projects-track" ref={trackRef}>
            {D.projects.map((p) => (
              <a
                className="project-card"
                key={p.num}
                href={p.link || "#"}
                target={p.link && p.link !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                <div className="project-shot">
                  <ProjectMock kind={p.kind as ProjectMockKind} />
                </div>
                <div className="project-meta">
                  <span className="num">{p.num}</span>
                  <div>
                    <div className="title">{p.title}</div>
                    <div className="stack">{p.stack}</div>
                  </div>
                  <div className="arrow">↗</div>
                </div>
              </a>
            ))}
          </div>
          <div className="scroll-indicator">
            <span>
              {String(
                Math.min(
                  D.projects.length,
                  Math.floor(progress * D.projects.length) + 1,
                ),
              ).padStart(2, "0")}
            </span>
            <span
              className="track"
              style={{ "--p": `${progress * 100}%` } as CSSProperties}
            ></span>
            <span>{String(D.projects.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
