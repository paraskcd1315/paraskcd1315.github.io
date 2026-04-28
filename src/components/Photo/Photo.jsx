import useReveal from "../../hooks/useReveal";
import PORTFOLIO_DATA from "../../data";
import "./Photo.css";

export default function Photo() {
  const ref = useReveal();
  const D = PORTFOLIO_DATA;
  return (
    <section id="photo" className="photo" data-screen-label="06 Lens" ref={ref}>
      <div className="photo-head">
        <div>
          <div className="section-label reveal">06 / Lens</div>
          <h2 className="reveal">Through the lens.</h2>
        </div>
        <p className="reveal">
          Some 3D renders I made in my free time. More on Artstation. Drag or
          scroll →
        </p>
      </div>
      <div className="photo-strip">
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
    </section>
  );
}
