import useReveal from "../../hooks/useReveal";
import PORTFOLIO_DATA from "../../data";
import "./About.css";

export default function About() {
  const ref = useReveal();
  const D = PORTFOLIO_DATA;
  return (
    <section
      id="about"
      className="about"
      data-screen-label="02 About"
      ref={ref}
    >
      <div className="container">
        <div className="section-label reveal">02 / About</div>
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
          <div className="about-stories">
            {D.about.map((s) => (
              <div className="about-story reveal" key={s.n}>
                <div className="num">{s.n}</div>
                <h3>{s.h}</h3>
                <p dangerouslySetInnerHTML={{ __html: s.p }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
