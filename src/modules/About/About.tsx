import { type CSSProperties } from "react";
import useReveal from "../../hooks/useReveal";
import PORTFOLIO_DATA from "../../data";
import { getSectionMeta } from "../../sections";
import "./About.css";
import useAboutCardStack from "./useAboutCardStack";

const meta = getSectionMeta("about");

export default function About() {
  const ref = useReveal<HTMLElement>();
  const D = PORTFOLIO_DATA;
  const stories = D.about;
  const { pinRef, active, progress } = useAboutCardStack(stories.length);

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <div className="section-label reveal">{meta.label}</div>
        <div className="about-grid">
          <div className="about-sticky reveal">
            <div className="about-avatar">
              <img src="/dp.jpeg" alt="Paras Khanchandani" />
            </div>
            <h2>
              I make Web and
              <br />
              Mobile Apps. <em>{"// full stack"}</em>
            </h2>
            <div className="about-loc">
              <div>
                <span className="pin">●</span> Currently · {D.location.city}
              </div>
              <div>
                <span style={{ color: "var(--fg-faint)" }}>●</span> From ·{" "}
                {D.location.origin}
              </div>
            </div>
          </div>
          <div
            className="about-stories"
            ref={pinRef}
            style={{ "--story-count": stories.length } as CSSProperties}
          >
            <div
              className="about-stories-stage"
              style={
                {
                  "--leave": Math.max(
                    0,
                    Math.min(
                      1,
                      (Math.max(
                        0,
                        Math.min(1, progress * stories.length - active),
                      ) -
                        0.55) /
                        0.45,
                    ),
                  ),
                } as CSSProperties
              }
            >
              {stories.map((s, i) => {
                const state =
                  i === active ? "active" : i < active ? "past" : "upcoming";
                return (
                  <div
                    className={`about-story is-${state} reveal`}
                    data-index={i}
                    key={s.n}
                  >
                    <div className="num">{s.n}</div>
                    <h3>{s.h}</h3>
                    <p dangerouslySetInnerHTML={{ __html: s.p }} />
                  </div>
                );
              })}
              <div className="scroll-indicator about-scroll-indicator">
                <span>{String(active + 1).padStart(2, "0")}</span>
                <span
                  className="track"
                  style={{ "--p": `${progress * 100}%` } as CSSProperties}
                ></span>
                <span>{String(stories.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
