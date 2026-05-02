import { useEffect } from "react";
import PORTFOLIO_CONTENT from "../../../../content";
import { Modal } from "../../../../shared/components";
import type { LinkedinModalProps } from "./LinkedinModal.types";
import styles from "./LinkedinModal.module.scss";

const BADGE_SCRIPT_ID = "linkedin-badge-script";
const BADGE_SCRIPT_SRC = "https://platform.linkedin.com/badges/js/profile.js";

function ensureBadgeScript(): Promise<void> {
  return new Promise((resolve) => {
    const existing = document.getElementById(
      BADGE_SCRIPT_ID,
    ) as HTMLScriptElement | null;
    if (existing) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.id = BADGE_SCRIPT_ID;
    s.src = BADGE_SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    document.body.appendChild(s);
  });
}

function deriveVanity(profileUrl: string): string {
  const m = profileUrl.match(/linkedin\.com\/in\/([^/?#]+)/i);
  return m?.[1] ?? "";
}

export default function LinkedinModal({
  open,
  onClose,
}: Readonly<LinkedinModalProps>) {
  const { linkedin } = PORTFOLIO_CONTENT;
  const { header, about, experience, education, skills, recommendations } =
    linkedin;
  const vanity = deriveVanity(header.profileUrl);

  useEffect(() => {
    if (!open || !vanity) return;
    let cancelled = false;
    ensureBadgeScript().then(() => {
      if (cancelled) return;
      window.LIRenderAll?.();
    });
    return () => {
      cancelled = true;
    };
  }, [open, vanity]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="LinkedIn"
      subtitle={header.headline}
      maxWidth={720}
    >
      <div className={styles.body}>
        <header className={styles.header}>
          {vanity ? (
            <div
              className={`${styles.badge} LI-profile-badge`}
              data-locale="en_US"
              data-size="large"
              data-theme="dark"
              data-type="VERTICAL"
              data-vanity={vanity}
              data-version="v1"
            />
          ) : (
            <div className={styles.headerText}>
              <h3 className={styles.name}>{header.name}</h3>
              <p className={styles.headline}>{header.headline}</p>
              <p className={styles.location}>{header.location}</p>
            </div>
          )}
          <a
            className={styles.profileLink}
            href={header.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View full profile on LinkedIn ↗
          </a>
        </header>

        {about && (
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>About</h4>
            <p className={styles.about}>{about}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>Experience</h4>
            <ul className={styles.list}>
              {experience.map((exp) => (
                <li key={`${exp.company}-${exp.title}`} className={styles.item}>
                  <div className={styles.itemHead}>
                    <strong className={styles.itemTitle}>{exp.title}</strong>
                    <span className={styles.itemCompany}>{exp.company}</span>
                  </div>
                  <div className={styles.itemMeta}>
                    <span>{exp.dateRange}</span>
                    {exp.location && <span>· {exp.location}</span>}
                  </div>
                  {exp.description && (
                    <p className={styles.itemBody}>{exp.description}</p>
                  )}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className={styles.bullets}>
                      {exp.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {education.length > 0 && (
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>Education</h4>
            <ul className={styles.list}>
              {education.map((ed) => (
                <li
                  key={`${ed.school}-${ed.dateRange}`}
                  className={styles.item}
                >
                  <div className={styles.itemHead}>
                    <strong className={styles.itemTitle}>{ed.school}</strong>
                  </div>
                  <div className={styles.itemMeta}>
                    {ed.degree && <span>{ed.degree}</span>}
                    {ed.field && <span>· {ed.field}</span>}
                    <span>· {ed.dateRange}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {skills.length > 0 && (
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>Skills</h4>
            <div className={styles.skills}>
              {skills.map((s) => (
                <span key={s} className={styles.skillChip}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {recommendations.length > 0 && (
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>Recommendations</h4>
            <ul className={styles.list}>
              {recommendations.map((r) => (
                <li key={`${r.author}-${r.date}`} className={styles.item}>
                  <p className={styles.recBody}>"{r.body}"</p>
                  <div className={styles.itemMeta}>
                    <strong>{r.author}</strong>
                    <span>· {r.authorRole}</span>
                    <span>· {r.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Modal>
  );
}
