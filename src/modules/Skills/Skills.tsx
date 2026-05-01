import type { MouseEvent } from "react";
import useReveal from "../../hooks/useReveal";
import PORTFOLIO_DATA from "../../data";
import { getSectionMeta } from "../../sections";
import "./Skills.css";

const meta = getSectionMeta("skills");

export default function Skills() {
  const ref = useReveal();
  const D = PORTFOLIO_DATA;
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <div className="section-label reveal">{meta.label}</div>
        <div className="skills-head">
          <h2 className="reveal">Tools and tech.</h2>
          <p className="reveal">
            Languages, frameworks and platforms I work with. Some I lead with,
            some are supporting tech, all are in active use.
          </p>
        </div>
        <div className="skills-grid reveal">
          {D.skills.map((s) => (
            <div className="skill" key={s.name} onMouseMove={onMove}>
              <div className="glyph">
                <img src={s.icon} alt={s.name} loading="lazy" />
              </div>
              <div>
                <div className="name">{s.name}</div>
                <div className="cat">{s.cat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
