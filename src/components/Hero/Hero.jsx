import { useEffect, useRef, useState } from "react";
import useScrollY from "../../hooks/useScrollY";
import PORTFOLIO_DATA from "../../data";
import {
  APOD_LOOKBACK_DAYS,
  APOD_RETRY_COUNT,
  HERO_FADE_DISTANCE,
  HERO_NAME_REVEAL_DELAY_MS,
  PARALLAX_MAX,
  SEASONS_BY_MONTH,
} from "../../constants";
import "./Hero.css";

const NASA_KEY = "DEMO_KEY";

function randomApodDate() {
  const daysAgo = Math.floor(Math.random() * APOD_LOOKBACK_DAYS);
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

function picsumFallback() {
  const season = SEASONS_BY_MONTH[new Date().getMonth()];
  return `https://picsum.photos/1920/1080?${season}-${Date.now()}`;
}

function preload(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error("image failed to load"));
    img.src = src;
  });
}

export default function Hero() {
  const y = useScrollY();
  const D = PORTFOLIO_DATA;
  const parallax = Math.min(y, PARALLAX_MAX);
  const nameRef = useRef(null);
  const [bgUrl, setBgUrl] = useState(null);

  useEffect(() => {
    const t = setTimeout(
      () => nameRef.current?.classList.add("go"),
      HERO_NAME_REVEAL_DELAY_MS,
    );
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadApod() {
      for (let i = 0; i < APOD_RETRY_COUNT; i++) {
        try {
          const date = randomApodDate();
          const res = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${date}`,
          );
          if (!res.ok) continue;
          const data = await res.json();
          if (data.media_type !== "image" || !data.url) continue;
          await preload(data.url);
          if (!cancelled) setBgUrl(data.url);
          return;
        } catch {
          // try next
        }
      }
      try {
        const url = picsumFallback();
        await preload(url);
        if (!cancelled) setBgUrl(url);
      } catch {
        // give up silently, gradient backdrop stays
      }
    }
    loadApod();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="hero" className="hero" data-screen-label="01 Hero">
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
            <em>{"// engineer"}</em>
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
