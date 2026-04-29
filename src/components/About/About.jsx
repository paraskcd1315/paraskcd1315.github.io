import { useEffect, useRef } from "react";
import useReveal from "../../hooks/useReveal";
import PORTFOLIO_DATA from "../../data";
import { MOBILE_BREAKPOINT_PX } from "../../constants";
import { getSectionMeta } from "../../sections";
import "./About.css";

const meta = getSectionMeta("about");

export default function About() {
  const ref = useReveal();
  const pinRef = useRef(null);
  const cardsRef = useRef(null);
  const D = PORTFOLIO_DATA;
  const total = D.about.length;

  useEffect(() => {
    let raf = 0;
    const clear = (cards) => {
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.opacity = "";
        cards[i].style.transform = "";
      }
    };
    const tick = () => {
      const pin = pinRef.current;
      const cardsEl = cardsRef.current;
      if (pin && cardsEl) {
        const cards = cardsEl.children;
        if (window.innerWidth > MOBILE_BREAKPOINT_PX) {
          const r = pin.getBoundingClientRect();
          const totalScroll = pin.offsetHeight - window.innerHeight;
          const p = Math.max(0, Math.min(1, -r.top / totalScroll));
          const idxF = p * (total - 1);
          for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const lp = idxF - i;
            let opacity;
            let x;
            let scale;
            let ty;
            if (lp <= -1) {
              opacity = 0;
              x = 100;
              scale = 1;
              ty = 0;
            } else if (lp <= 0) {
              const t = lp + 1;
              opacity = t;
              x = (1 - t) * 100;
              scale = 1;
              ty = 0;
            } else if (lp <= 1) {
              const t = lp;
              opacity = 1 - t;
              x = 0;
              scale = 1 - 0.18 * t;
              ty = 24 * t;
            } else {
              opacity = 0;
              x = 0;
              scale = 0.82;
              ty = 24;
            }
            card.style.opacity = String(opacity);
            card.style.transform = `translate3d(${x}%, ${ty}px, 0) scale(${scale})`;
          }
        } else {
          clear(cards);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [total]);

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-pin" ref={pinRef}>
        <div className="about-stage">
          <div className="container">
            <div className="section-label reveal">{meta.label}</div>
            <div className="about-grid">
              <div className="about-sticky reveal">
                <div className="about-avatar">
                  <img src="/dp.jpeg" alt="Paras Khanchandani" />
                </div>
                <h2>
                  I make Web and
                  <br />
                  Mobile Apps. <em>{"// full stack"}</em>
                </h2>
                <div className="about-loc">
                  <div>
                    <span className="pin">●</span> Currently · {D.location.city}
                  </div>
                  <div>
                    <span style={{ color: "var(--fg-faint)" }}>●</span> From ·{" "}
                    {D.location.origin}
                  </div>
                </div>
              </div>
              <div className="about-stories" ref={cardsRef}>
                {D.about.map((s) => (
                  <div className="about-story reveal" key={s.n}>
                    <div className="num">{s.n}</div>
                    <h3>{s.h}</h3>
                    <p dangerouslySetInnerHTML={{ __html: s.p }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
