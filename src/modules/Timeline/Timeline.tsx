import { type CSSProperties } from "react";
import PORTFOLIO_CONTENT from "../../content";
import {
  MonoLabel,
  Pill,
  ScrollIndicator,
  SectionLabel,
} from "../../shared/components";
import { useHorizontalPin } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import styles from "./Timeline.module.scss";

const meta = getSectionMeta("timeline");

export default function Timeline() {
  const { timeline } = PORTFOLIO_CONTENT;
  const { pinRef, trackRef, progress } = useHorizontalPin();
  const items = timeline.items;
  const current = Math.min(
    items.length,
    Math.floor(progress * items.length) + 1,
  );

  return (
    <section id="timeline" className={styles.timeline}>
      <div className={styles.head}>
        <div>
          <SectionLabel>{meta.label}</SectionLabel>
          <h2>{timeline.heading}</h2>
        </div>
        <div className={styles.headMeta}>
          <div>
            <strong>{items.length}</strong> milestones
          </div>
          <div>{timeline.body}</div>
        </div>
      </div>
      <div
        className={styles.pin}
        ref={pinRef}
        style={{ "--event-count": items.length } as CSSProperties}
      >
        <div className={styles.stage}>
          <div className={styles.track} ref={trackRef}>
            <div className={styles.spine} aria-hidden="true" />
            {items.map((event, i) => (
              <article
                className={`${styles.event} timeline-event`}
                key={`${event.date}-${i}`}
                style={{ "--i": i } as CSSProperties}
              >
                <div className={styles.marker} aria-hidden="true" />
                <div className={styles.connector} aria-hidden="true" />
                <div className={styles.card}>
                  <MonoLabel size={11}>{event.date}</MonoLabel>
                  <h3 className={styles.title}>{event.title}</h3>
                  <p className={styles.body}>{event.body}</p>
                  {event.tags && event.tags.length > 0 && (
                    <div className={styles.tags}>
                      {event.tags.map((t) => (
                        <Pill key={t}>{t}</Pill>
                      ))}
                    </div>
                  )}
                  {event.links && event.links.length > 0 && (
                    <div className={styles.links}>
                      {event.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className={styles.scrollIndicator}>
            <ScrollIndicator
              current={current}
              total={items.length}
              progress={progress}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
