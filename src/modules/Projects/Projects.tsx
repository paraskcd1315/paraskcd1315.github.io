import { type CSSProperties } from "react";
import PORTFOLIO_CONTENT from "../../content";
import { ProjectMock, type ProjectMockKind } from "../../shared/components";
import { useHorizontalPin } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import "./Projects.css";
import useProjectFocus from "./hooks/useProjectFocus";

const meta = getSectionMeta("projects");

export default function Projects() {
  const { projects } = PORTFOLIO_CONTENT;
  const { pinRef, trackRef, progress } = useHorizontalPin();
  useProjectFocus(trackRef);

  return (
    <section id="projects" className="projects">
      <div className="projects-head">
        <div>
          <div className="section-label">{meta.label}</div>
          <h2>{projects.heading}</h2>
        </div>
        <div className="meta">
          <div>
            <strong>{projects.items.length}</strong> {projects.countSuffix}
          </div>
          <div>{projects.hint}</div>
        </div>
      </div>
      <div className="projects-pin" ref={pinRef}>
        <div className="projects-stage">
          <div className="projects-track" ref={trackRef}>
            {projects.items.map((p) => (
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
                  projects.items.length,
                  Math.floor(progress * projects.items.length) + 1,
                ),
              ).padStart(2, "0")}
            </span>
            <span
              className="track"
              style={{ "--p": `${progress * 100}%` } as CSSProperties}
            ></span>
            <span>{String(projects.items.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
