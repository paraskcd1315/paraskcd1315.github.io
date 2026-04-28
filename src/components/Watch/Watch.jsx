import useReveal from "../../hooks/useReveal";
import PORTFOLIO_DATA from "../../data";
import "./Watch.css";

const EMBED_BASE = "https://www.youtube-nocookie.com/embed";

function VideoFrame({ id, title }) {
  return (
    <div className="watch-frame">
      <iframe
        src={`${EMBED_BASE}/${id}?rel=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export default function Watch() {
  const ref = useReveal();
  const { featured, others } = PORTFOLIO_DATA.videos;
  return (
    <section
      id="watch"
      className="watch"
      data-screen-label="07 Watch"
      ref={ref}
    >
      <div className="container">
        <div className="section-label reveal">07 / Watch</div>
        <div className="watch-head">
          <h2 className="reveal">My showreel and projects.</h2>
          <p className="reveal">
            My showreel plus a couple of older UI projects I uploaded to
            YouTube.
          </p>
        </div>
        <article className="watch-featured reveal">
          <VideoFrame id={featured.id} title={featured.title} />
          <div className="watch-meta">
            <span className="tag">{featured.tag}</span>
            <span className="title">{featured.title}</span>
          </div>
        </article>
        <div className="watch-grid">
          {others.map((v) => (
            <article className="watch-card reveal" key={v.id}>
              <VideoFrame id={v.id} title={v.title} />
              <div className="watch-meta">
                <span className="tag">{v.tag}</span>
                <span className="title">{v.title}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
