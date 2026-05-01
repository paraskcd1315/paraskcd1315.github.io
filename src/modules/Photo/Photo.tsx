import PORTFOLIO_CONTENT from "../../content";
import { useHorizontalPin, useReveal } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import "./Photo.css";

const meta = getSectionMeta("photo");

export default function Photo() {
  const ref = useReveal<HTMLElement>();
  const { pinRef, trackRef } = useHorizontalPin();
  const { photos } = PORTFOLIO_CONTENT;

  return (
    <section id="photo" className="photo" ref={ref}>
      <div className="photo-head">
        <div>
          <div className="section-label reveal">{meta.label}</div>
          <h2 className="reveal">{photos.heading}</h2>
        </div>
        <p className="reveal">{photos.body}</p>
      </div>
      <div className="photo-pin" ref={pinRef}>
        <div className="photo-stage">
          <div className="photo-strip" ref={trackRef}>
            {photos.items.map((p) => (
              <a
                className="photo-card"
                key={p.src}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="photo-ph"
                  style={{ backgroundImage: `url(${p.src})` }}
                >
                  <span className="tag">{p.cap}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
