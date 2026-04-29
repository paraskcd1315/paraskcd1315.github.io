import { useEffect, useRef } from "react";
import useReveal from "../../hooks/useReveal";
import PORTFOLIO_DATA from "../../data";
import { MOBILE_BREAKPOINT_PX } from "../../constants";
import { getSectionMeta } from "../../sections";
import "./Photo.css";

const meta = getSectionMeta("photo");

export default function Photo() {
  const ref = useReveal();
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const D = PORTFOLIO_DATA;

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const pin = pinRef.current;
      const track = trackRef.current;
      if (pin && track && window.innerWidth > MOBILE_BREAKPOINT_PX) {
        const r = pin.getBoundingClientRect();
        const total = pin.offsetHeight - window.innerHeight;
        const p = Math.max(0, Math.min(1, -r.top / total));
        const trackW = track.scrollWidth - window.innerWidth;
        track.style.transform = `translate3d(${-p * trackW}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

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
