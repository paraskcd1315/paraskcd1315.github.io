import { useState } from "react";
import PORTFOLIO_CONTENT from "../../content";
import type { Project } from "../../content";
import {
  LinkArrow,
  ProjectMock,
  ScrollIndicator,
  type ProjectMockKind,
} from "../../shared/components";
import { useHorizontalPin } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import styles from "./Projects.module.scss";
import useProjectFocus from "./hooks/useProjectFocus";

const meta = getSectionMeta("projects");

function ProjectCard({ project }: Readonly<{ project: Project }>) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      className={`${styles.projectCard} project-card`}
      href={project.link || "#"}
      target={project.link && project.link !== "#" ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.projectShot}>
        <ProjectMock kind={project.kind as ProjectMockKind} />
      </div>
      <div className={styles.projectMeta}>
        <span className={styles.num}>{project.num}</span>
        <div>
          <div className={styles.title}>{project.title}</div>
          <div className={styles.stack}>{project.stack}</div>
        </div>
        <LinkArrow active={hovered} className={styles.arrow} />
      </div>
    </a>
  );
}

export default function Projects() {
  const { projects } = PORTFOLIO_CONTENT;
  const { pinRef, trackRef, progress } = useHorizontalPin();
  useProjectFocus(trackRef);
  const items = projects.items;
  const current = Math.min(
    items.length,
    Math.floor(progress * items.length) + 1,
  );

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.projectsHead}>
        <div>
          <div className={styles.sectionLabel}>{meta.label}</div>
          <h2>{projects.heading}</h2>
        </div>
        <div className={styles.meta}>
          <div>
            <strong>{items.length}</strong> {projects.countSuffix}
          </div>
          <div>{projects.hint}</div>
        </div>
      </div>
      <div className={styles.projectsPin} ref={pinRef}>
        <div className={styles.projectsStage}>
          <div className={styles.projectsTrack} ref={trackRef}>
            {items.map((p) => (
              <ProjectCard key={p.num} project={p} />
            ))}
          </div>
          <div className={styles.scrollIndicator}>
            <ScrollIndicator
              current={current}
              total={items.length}
              progress={progress}
              trackWidth={120}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
