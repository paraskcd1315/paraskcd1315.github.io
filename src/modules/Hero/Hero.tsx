import PORTFOLIO_CONTENT from "../../content";
import { useScrollY } from "../../shared/hooks";
import { HERO_FADE_DISTANCE, PARALLAX_MAX } from "../../constants";
import styles from "./Hero.module.scss";
import type { HeroProps } from "./Hero.types";
import useHeroBackground from "./hooks/useHeroBackground";
import useHeroNameReveal from "./hooks/useHeroNameReveal";

export default function Hero({ startReveal = true }: Readonly<HeroProps>) {
  const y = useScrollY();
  const { profile, branding, hero } = PORTFOLIO_CONTENT;
  const parallax = Math.min(y, PARALLAX_MAX);
  const nameRef = useHeroNameReveal(startReveal);
  const bgUrl = useHeroBackground();

  return (
    <section id="hero" className={styles.hero}>
      <a
        className={styles.heroBadge}
        href={branding.badgeHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={branding.badgeAriaLabel}
      >
        <img src={branding.logoPath} alt={branding.badgeAriaLabel} />
      </a>
      <div
        className={`${styles.heroPhoto} ${bgUrl ? styles.ready : ""}`}
        style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}
      />
      <div
        className={styles.heroBg}
        style={{
          transform: `translateY(${parallax * 0.25}px) scale(${1 + parallax * 0.0004})`,
        }}
      />
      <div
        className={styles.heroInner}
        style={{
          transform: `translateY(${-parallax * 0.18}px)`,
          opacity: Math.max(0, 1 - parallax / HERO_FADE_DISTANCE),
        }}
      >
        <div className={styles.heroEyebrow}>
          <span className={styles.dot}></span>
          <span>
            {new Date().getFullYear()} · {profile.location.eyebrow}
          </span>
        </div>
        <h1 className={styles.heroName} ref={nameRef}>
          <span className={styles.row}>
            {hero.greeting.map((word) => (
              <span className={styles.word} key={word}>
                <span>{word}</span>
              </span>
            ))}
            <em>{hero.taglineLabel}</em>
          </span>
          <span className={styles.row}>
            <span className={styles.word}>
              <span>{profile.name[0]}</span>
            </span>
          </span>
          <span className={styles.row}>
            <span className={styles.word}>
              <span>
                {profile.name[1]}
                {profile.name[2]}
              </span>
            </span>
          </span>
        </h1>
        <div className={styles.heroMeta}>
          {hero.meta.map((m) => (
            <div key={m.label}>
              <span className={styles.label}>{m.label}</span>
              <span
                className={styles.value}
                style={m.accent ? { color: "var(--accent)" } : undefined}
              >
                {m.value}
              </span>
            </div>
          ))}
          <div className={styles.roles}>
            <span className={styles.label}>{hero.stacksLabel}</span>
            {profile.rolesShort.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
