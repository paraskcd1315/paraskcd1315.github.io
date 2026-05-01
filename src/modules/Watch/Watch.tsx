import PORTFOLIO_DATA from "../../data";
import { VideoFrame } from "../../shared/components";
import { useReveal } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import "./Watch.css";

const meta = getSectionMeta("watch");

export default function Watch() {
  const ref = useReveal<HTMLElement>();
  const { featured, others } = PORTFOLIO_DATA.videos;
  return (
    <section id="watch" className="watch" ref={ref}>
      <div className="container">
        <div className="section-label reveal">{meta.label}</div>
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
