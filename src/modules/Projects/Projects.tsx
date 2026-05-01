import { type CSSProperties } from "react";
import PORTFOLIO_DATA from "../../data";
import ProjectMock from "../../components/ProjectMock";
import type { ProjectMockKind } from "../../components/ProjectMock/ProjectMock.types";
import useHorizontalPin from "../../hooks/useHorizontalPin";
import { getSectionMeta } from "../../sections";
import "./Projects.css";
import useProjectFocus from "./useProjectFocus";

const meta = getSectionMeta("projects");

export default function Projects() {
  const D = PORTFOLIO_DATA;
  const { pinRef, trackRef, progress } = useHorizontalPin();
  useProjectFocus(trackRef);

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
