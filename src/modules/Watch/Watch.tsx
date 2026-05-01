import PORTFOLIO_CONTENT from "../../content";
import { VideoFrame } from "../../shared/components";
import { useReveal } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import styles from "./Watch.module.scss";

const meta = getSectionMeta("watch");

export default function Watch() {
  const ref = useReveal<HTMLElement>();
  const { videos } = PORTFOLIO_CONTENT;
  const { featured, others } = videos;
  return (
    <section id="watch" className={styles.watch} ref={ref}>
      <div>
        <div className={`${styles.sectionLabel} reveal`}>{meta.label}</div>
        <div className={styles.watchHead}>
          <h2 className="reveal">{videos.heading}</h2>
          <p className="reveal">{videos.body}</p>
        </div>
        <article className={`${styles.watchFeatured} reveal`}>
          <VideoFrame id={featured.id} title={featured.title} />
          <div className={styles.watchMeta}>
            <span className={styles.tag}>{featured.tag}</span>
            <span className={styles.title}>{featured.title}</span>
          </div>
        </article>
        <div className={styles.watchGrid}>
          {others.map((v) => (
            <article className={`${styles.watchCard} reveal`} key={v.id}>
              <VideoFrame id={v.id} title={v.title} />
              <div className={styles.watchMeta}>
                <span className={styles.tag}>{v.tag}</span>
                <span className={styles.title}>{v.title}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
