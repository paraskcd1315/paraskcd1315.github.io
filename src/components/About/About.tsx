import { useEffect, useRef, useState } from "react";
import useReveal from "../../hooks/useReveal";
import PORTFOLIO_DATA from "../../data";
import { MOBILE_BREAKPOINT_PX } from "../../constants";
import { getSectionMeta } from "../../sections";
import "./About.css";

const meta = getSectionMeta("about");

export default function About() {
  const ref = useReveal();
  const pinRef = useRef(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const D = PORTFOLIO_DATA;
  const stories = D.about;

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const pin = pinRef.current;
      if (pin && window.innerWidth > MOBILE_BREAKPOINT_PX) {
        const r = pin.getBoundingClientRect();
        const total = pin.offsetHeight - window.innerHeight;
        const p = total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0;
        const N = stories.length;
        const idx = Math.min(N - 1, Math.max(0, Math.floor(p * N)));
        setActive((prev) => (prev !== idx ? idx : prev));
        setProgress((prev) => (prev !== p ? p : prev));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stories.length]);

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
            style={{ "--story-count": stories.length }}
          >
            <div
              className="about-stories-stage"
              style={{
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
              }}
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
                  style={{ "--p": `${progress * 100}%` }}
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
