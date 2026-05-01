import PORTFOLIO_DATA from "../../data";
import { useScrollY } from "../../shared/hooks";
import { HERO_FADE_DISTANCE, PARALLAX_MAX } from "../../constants";
import "./Hero.css";
import type { HeroProps } from "./Hero.types";
import useHeroBackground from "./hooks/useHeroBackground";
import useHeroNameReveal from "./hooks/useHeroNameReveal";

export default function Hero({ startReveal = true }: Readonly<HeroProps>) {
  const y = useScrollY();
  const D = PORTFOLIO_DATA;
  const parallax = Math.min(y, PARALLAX_MAX);
  const nameRef = useHeroNameReveal(startReveal);
  const bgUrl = useHeroBackground();

  return (
    <section id="hero" className="hero">
      <a
        className="hero-badge"
        href="https://github.com/paraskcd1315"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="KCD"
      >
        <img src="/kcd-logo.png" alt="KCD" />
      </a>
      <div
        className={`hero-photo${bgUrl ? " ready" : ""}`}
        style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}
      />
      <div
        className="hero-bg"
        style={{
          transform: `translateY(${parallax * 0.25}px) scale(${1 + parallax * 0.0004})`,
        }}
      />
      <div
        className="hero-inner"
        style={{
          transform: `translateY(${-parallax * 0.18}px)`,
          opacity: Math.max(0, 1 - parallax / HERO_FADE_DISTANCE),
        }}
      >
        <div className="hero-eyebrow">
          <span className="dot"></span>
          <span>{new Date().getFullYear()} · CASTELLDEFELS, ES</span>
        </div>
        <h1 className="hero-name" ref={nameRef}>
          <span className="row">
            <span className="word">
              <span>Hi,</span>
            </span>
            <span className="word">
              <span>I'm</span>
            </span>
            <em>{"// Fullstack developer"}</em>
          </span>
          <span className="row">
            <span className="word">
              <span>{D.name[0]}</span>
            </span>
          </span>
          <span className="row">
            <span className="word">
              <span>
                {D.name[1]}
                {D.name[2]}
              </span>
            </span>
          </span>
        </h1>
        <div className="hero-meta">
          <div>
            <span className="label">Discipline</span>
            <span className="value">Full-stack engineering · UX/UI</span>
          </div>
          <div>
            <span className="label">Currently</span>
            <span className="value" style={{ color: "var(--accent)" }}>
              @ Unimedia Technology
            </span>
          </div>
          <div className="roles">
            <span className="label">Stacks</span>
            {D.rolesShort.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
