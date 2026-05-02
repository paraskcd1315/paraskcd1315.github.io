import { useState } from "react";
import PORTFOLIO_CONTENT from "../../content";
import { SectionLabel } from "../../shared/components";
import { useReveal } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import GithubModal from "./components/GithubModal";
import styles from "./Contact.module.scss";

const meta = getSectionMeta("contact");

export default function Contact() {
  const ref = useReveal<HTMLElement>();
  const { profile, branding, socials, contact } = PORTFOLIO_CONTENT;
  const tagline =
    contact.taglines[Math.floor(Math.random() * contact.taglines.length)] ??
    contact.taglines[0]!;
  const [githubOpen, setGithubOpen] = useState(false);

  return (
    <section id="contact" className={styles.contact} ref={ref}>
      <div className={styles.contactBg}></div>
      <div className={styles.contactInner}>
        <SectionLabel align="center" className="reveal">
          {meta.label}
        </SectionLabel>
        <h2 className="reveal">
          <em>{tagline.verb}</em>
          <br />
          {tagline.rest}
        </h2>
        <a
          className={`${styles.email} reveal`}
          href={`mailto:${profile.email}`}
        >
          {profile.email}
        </a>
        <div className={`${styles.socials} reveal`}>
          {socials.map((s) => {
            if (s.label === "GitHub") {
              return (
                <button
                  key={s.label}
                  type="button"
                  className={styles.socialBtn}
                  onClick={() => setGithubOpen(true)}
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
                </button>
              );
            }
            return (
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
            );
          })}
        </div>
      </div>
      <footer className={styles.footer} style={{ marginTop: 120 }}>
        <span className={styles.footerSig}>
          <img src={branding.logoPath} alt="" className={styles.footerMark} />
          {profile.copyright}
        </span>
        <span>{profile.signature}</span>
      </footer>
      <GithubModal open={githubOpen} onClose={() => setGithubOpen(false)} />
    </section>
  );
}
