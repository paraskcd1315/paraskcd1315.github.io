import PORTFOLIO_CONTENT from "../../content";
import { useReveal } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import "./Contact.css";

const meta = getSectionMeta("contact");

export default function Contact() {
  const ref = useReveal<HTMLElement>();
  const { profile, branding, socials, contact } = PORTFOLIO_CONTENT;
  const tagline =
    contact.taglines[Math.floor(Math.random() * contact.taglines.length)] ??
    contact.taglines[0]!;
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
        <a className="email reveal" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="socials reveal">
          {socials.map((s) => (
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
          <img src={branding.logoPath} alt="" className="footer-mark" />
          {profile.copyright}
        </span>
        <span>{profile.signature}</span>
      </footer>
    </section>
  );
}
