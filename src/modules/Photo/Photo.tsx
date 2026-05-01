import PORTFOLIO_DATA from "../../data";
import { useHorizontalPin, useReveal } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import "./Photo.css";

const meta = getSectionMeta("photo");

export default function Photo() {
  const ref = useReveal<HTMLElement>();
  const { pinRef, trackRef } = useHorizontalPin();
  const D = PORTFOLIO_DATA;

  return (
    <section id="photo" className="photo" ref={ref}>
      <div className="photo-head">
        <div>
          <div className="section-label reveal">{meta.label}</div>
          <h2 className="reveal">Through the lens.</h2>
        </div>
        <p className="reveal">
          Some 3D renders I made in my free time. More on Artstation. Drag or
          scroll →
        </p>
      </div>
      <div className="photo-pin" ref={pinRef}>
        <div className="photo-stage">
          <div className="photo-strip" ref={trackRef}>
            {D.photos.map((p) => (
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
