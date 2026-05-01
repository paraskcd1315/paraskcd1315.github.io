import PORTFOLIO_CONTENT from "../../content";
import {
  LinkArrow,
  ProjectMock,
  type ProjectMockKind,
  ScrollIndicator,
} from "../../shared/components";
import { useHorizontalPin } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import styles from "./Projects.module.scss";
import useProjectFocus from "./hooks/useProjectFocus";

const meta = getSectionMeta("projects");

export default function Projects() {
  const { projects } = PORTFOLIO_CONTENT;
  const { pinRef, trackRef, progress } = useHorizontalPin();
  useProjectFocus(trackRef);

  const currentIdx = Math.min(
    projects.items.length,
    Math.floor(progress * projects.items.length) + 1,
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
            <strong>{projects.items.length}</strong> {projects.countSuffix}
          </div>
          <div>{projects.hint}</div>
        </div>
      </div>
      <div className={styles.projectsPin} ref={pinRef}>
        <div className={styles.projectsStage}>
          <div className={styles.projectsTrack} ref={trackRef}>
            {projects.items.map((p) => (
              <a
                className={`${styles.projectCard} project-card`}
                key={p.num}
                href={p.link || "#"}
                target={p.link && p.link !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                <div className={styles.projectShot}>
                  <ProjectMock kind={p.kind as ProjectMockKind} />
                </div>
                <div className={styles.projectMeta}>
                  <span className={styles.num}>{p.num}</span>
                  <div>
                    <div className={styles.title}>{p.title}</div>
                    <div className={styles.stack}>{p.stack}</div>
                  </div>
                  <LinkArrow />
                </div>
              </a>
            ))}
          </div>
          <div className={styles.scrollIndicatorWrap}>
            <ScrollIndicator
              current={currentIdx}
              total={projects.items.length}
              progress={progress}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
