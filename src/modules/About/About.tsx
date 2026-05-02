import { type CSSProperties } from "react";
import PORTFOLIO_CONTENT from "../../content";
import { Avatar, ScrollIndicator, SectionLabel } from "../../shared/components";
import { useReveal } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import styles from "./About.module.scss";
import useAboutCardStack from "./hooks/useAboutCardStack";
import {
  aboutCardClass,
  aboutCardState,
  aboutLeaveProgress,
} from "./AboutUtils";

const meta = getSectionMeta("about");

export default function About() {
  const ref = useReveal<HTMLElement>();
  const { profile, branding, about } = PORTFOLIO_CONTENT;
  const stories = about.stories;
  const { pinRef, active, progress } = useAboutCardStack(stories.length);
  const leave = aboutLeaveProgress(progress, stories.length, active);

  return (
    <section id="about" className={styles.about} ref={ref}>
      <div>
        <SectionLabel className="reveal">{meta.label}</SectionLabel>
        <div className={styles.aboutGrid}>
          <div className={`${styles.aboutSticky} reveal`}>
            <Avatar src={branding.avatarPath} alt={branding.avatarAlt} />
            <h2>
              {about.heading} <em>{about.headingTagline}</em>
            </h2>
            <div className={styles.aboutLoc}>
              <div>
                <span className={styles.pin}>●</span> {about.labels.currently} ·{" "}
                {profile.location.city}
              </div>
              <div>
                <span style={{ color: "var(--fg-faint)" }}>●</span>{" "}
                {about.labels.from} · {profile.location.origin}
              </div>
            </div>
          </div>
          <div
            className={styles.aboutStories}
            ref={pinRef}
            style={{ "--story-count": stories.length } as CSSProperties}
          >
            <div
              className={styles.aboutStoriesStage}
              style={{ "--leave": leave } as CSSProperties}
            >
              {stories.map((s, i) => {
                const state = aboutCardState(i, active);
                return (
                  <div
                    className={`${styles.aboutStory} ${aboutCardClass(state)} reveal`}
                    data-index={i}
                    key={s.n}
                  >
                    <div className={styles.num}>{s.n}</div>
                    <h3>{s.h}</h3>
                    <p dangerouslySetInnerHTML={{ __html: s.p }} />
                  </div>
                );
              })}
              <div className={styles.scrollIndicator}>
                <ScrollIndicator
                  current={active + 1}
                  total={stories.length}
                  progress={progress}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
