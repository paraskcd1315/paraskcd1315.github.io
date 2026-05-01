import useReveal from "../../hooks/useReveal";
import PORTFOLIO_DATA from "../../data";
import { getSectionMeta } from "../../sections";
import "./Contact.css";

const meta = getSectionMeta("contact");

const TAGLINES = [
  { verb: "Building", rest: "the universe." },
  { verb: "Building", rest: "galaxies." },
  { verb: "Building", rest: "worlds." },
  { verb: "Rendering", rest: "reality." },
  { verb: "Compiling", rest: "the cosmos." },
];
const tagline =
  TAGLINES[Math.floor(Math.random() * TAGLINES.length)] ?? TAGLINES[0]!;

export default function Contact() {
  const ref = useReveal();
  const D = PORTFOLIO_DATA;
  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="contact-bg"></div>
      <div className="contact-inner">
        <div
          className="section-label reveal"
          style={{ justifyContent: "center" }}
        >
          {meta.label}
        </div>
        <h2 className="reveal">
          <em>{tagline.verb}</em>
          <br />
          {tagline.rest}
        </h2>
        <a className="email reveal" href={`mailto:${D.email}`}>
          {D.email}
        </a>
        <div className="socials reveal">
          {D.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 99,
                  background: "var(--accent)",
                }}
              ></span>
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <footer style={{ marginTop: 120 }}>
        <span className="footer-sig">
          <img src="/kcd-logo.png" alt="" className="footer-mark" />© Paras
          Khanchandani · 2026
        </span>
        <span>Hand-built → ∞</span>
      </footer>
    </section>
  );
}
