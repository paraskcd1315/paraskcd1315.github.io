import PORTFOLIO_CONTENT from "../../content";
import { SectionLabel, Tag } from "../../shared/components";
import { useHorizontalPin, useReveal } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import styles from "./Photo.module.scss";

const meta = getSectionMeta("photo");

export default function Photo() {
  const ref = useReveal<HTMLElement>();
  const { pinRef, trackRef } = useHorizontalPin();
  const { photos } = PORTFOLIO_CONTENT;

  return (
    <section id="photo" className={styles.photo} ref={ref}>
      <div className={styles.photoHead}>
        <div>
          <SectionLabel className="reveal">{meta.label}</SectionLabel>
          <h2 className="reveal">{photos.heading}</h2>
        </div>
        <p className="reveal">{photos.body}</p>
      </div>
      <div className={styles.photoPin} ref={pinRef}>
        <div className={styles.photoStage}>
          <div className={styles.photoStrip} ref={trackRef}>
            {photos.items.map((p) => (
              <a
                className={styles.photoCard}
                key={p.src}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={styles.photoPh}
                  style={{ backgroundImage: `url(${p.src})` }}
                >
                  <Tag>{p.cap}</Tag>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
