import { useRef, type MouseEvent } from "react";
import PORTFOLIO_CONTENT from "../../content";
import { IconCircle, SectionLabel } from "../../shared/components";
import { getSectionMeta } from "../../sections";
import styles from "./Skills.module.scss";
import { findEarliestSkillDate, yearsExperience } from "./SkillsUtils";
import useSkillsCounter from "./hooks/useSkillsCounter";

const meta = getSectionMeta("skills");

export default function Skills() {
  const ref = useRef<HTMLElement | null>(null);
  const { skills, timeline } = PORTFOLIO_CONTENT;
  const progress = useSkillsCounter(ref);

  const skillsWithYears = skills.items.map((s) => {
    const date = findEarliestSkillDate(s.name, timeline.items);
    const years = date ? yearsExperience(date) : null;
    return { ...s, years };
  });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="skills" className={styles.skills} ref={ref}>
      <div>
        <SectionLabel>{meta.label}</SectionLabel>
        <div className={styles.skillsHead}>
          <h2>{skills.heading}</h2>
          <p>{skills.body}</p>
        </div>
        <div className={styles.skillsGrid}>
          {skillsWithYears.map((s) => (
            <div className={styles.skill} key={s.name} onMouseMove={onMove}>
              <IconCircle size={44} borderRadius={8} className={styles.glyph}>
                <img src={s.icon} alt={s.name} loading="lazy" />
              </IconCircle>
              <div>
                <div className={styles.name}>{s.name}</div>
                <div className={styles.cat}>{s.cat}</div>
              </div>
              {s.years !== null && s.years > 0 && (
                <div
                  className={styles.years}
                  aria-label={`${s.years}+ years experience`}
                >
                  {Math.round(s.years * progress)}+
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
