import PORTFOLIO_CONTENT from "../../content";
import { MonoLabel, Pill, SectionLabel } from "../../shared/components";
import { useReveal } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import styles from "./Timeline.module.scss";

const meta = getSectionMeta("timeline");

export default function Timeline() {
  const ref = useReveal<HTMLElement>();
  const { timeline } = PORTFOLIO_CONTENT;

  return (
    <section id="timeline" className={styles.timeline} ref={ref}>
      <div>
        <SectionLabel className="reveal">{meta.label}</SectionLabel>
        <div className={styles.head}>
          <h2 className="reveal">{timeline.heading}</h2>
          <p className="reveal">{timeline.body}</p>
        </div>
        <ol className={styles.track}>
          {timeline.items.map((event, i) => (
            <li className={`${styles.event} reveal`} key={`${event.date}-${i}`}>
              <div className={styles.marker} aria-hidden="true" />
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
