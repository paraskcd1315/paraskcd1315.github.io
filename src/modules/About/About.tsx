import { type CSSProperties } from "react";
import PORTFOLIO_CONTENT from "../../content";
import { useReveal } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import "./About.css";
import useAboutCardStack from "./hooks/useAboutCardStack";

const meta = getSectionMeta("about");

export default function About() {
  const ref = useReveal<HTMLElement>();
  const { profile, branding, about } = PORTFOLIO_CONTENT;
  const stories = about.stories;
  const { pinRef, active, progress } = useAboutCardStack(stories.length);

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <div className="section-label reveal">{meta.label}</div>
        <div className="about-grid">
          <div className="about-sticky reveal">
            <div className="about-avatar">
              <img src={branding.avatarPath} alt={branding.avatarAlt} />
            </div>
            <h2>
              {about.heading} <em>{about.headingTagline}</em>
            </h2>
            <div className="about-loc">
              <div>
                <span className="pin">●</span> {about.labels.currently} ·{" "}
                {profile.location.city}
              </div>
              <div>
                <span style={{ color: "var(--fg-faint)" }}>●</span>{" "}
                {about.labels.from} · {profile.location.origin}
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
