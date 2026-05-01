import type { MouseEvent } from "react";
import PORTFOLIO_CONTENT from "../../content";
import { SectionLabel } from "../../shared/components";
import { useReveal } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import styles from "./Skills.module.scss";

const meta = getSectionMeta("skills");

export default function Skills() {
  const ref = useReveal<HTMLElement>();
  const { skills } = PORTFOLIO_CONTENT;
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <section id="skills" className={styles.skills} ref={ref}>
      <div>
        <SectionLabel className="reveal">{meta.label}</SectionLabel>
        <div className={styles.skillsHead}>
          <h2 className="reveal">{skills.heading}</h2>
          <p className="reveal">{skills.body}</p>
        </div>
        <div className={`${styles.skillsGrid} reveal`}>
          {skills.items.map((s) => (
            <div className={styles.skill} key={s.name} onMouseMove={onMove}>
              <div className={styles.glyph}>
                <img src={s.icon} alt={s.name} loading="lazy" />
              </div>
              <div>
                <div className={styles.name}>{s.name}</div>
                <div className={styles.cat}>{s.cat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
