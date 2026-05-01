import PORTFOLIO_CONTENT from "../../content";
import { VideoFrame } from "../../shared/components";
import { useReveal } from "../../shared/hooks";
import { getSectionMeta } from "../../sections";
import "./Watch.css";

const meta = getSectionMeta("watch");

export default function Watch() {
  const ref = useReveal<HTMLElement>();
  const { videos } = PORTFOLIO_CONTENT;
  const { featured, others } = videos;
  return (
    <section id="watch" className="watch" ref={ref}>
      <div className="container">
        <div className="section-label reveal">{meta.label}</div>
        <div className="watch-head">
          <h2 className="reveal">{videos.heading}</h2>
          <p className="reveal">{videos.body}</p>
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
