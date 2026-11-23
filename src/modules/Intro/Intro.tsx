import { type CSSProperties, useEffect } from "react";
import PORTFOLIO_CONTENT from "../../content";
import styles from "./Intro.module.scss";
import type { IntroProps } from "./Intro.types";
import useIntroStages, { type IntroStage } from "./hooks/useIntroStages";
import useLogoReady from "./hooks/useLogoReady";

const STAGE_CLASS: Record<IntroStage, string> = {
  "logo-in": "logoIn",
  "logo-hold": "logoHold",
  morph: "morph",
  zoom: "zoom",
};

const SPLASH_FADE_MS = 800;

function removeSplash() {
  document.getElementById("splash")?.remove();
}

export default function Intro({ onReveal, onDone }: Readonly<IntroProps>) {
  const { branding, intro } = PORTFOLIO_CONTENT;
  const ready = useLogoReady(branding.logoTransparentPath);
  const stage = useIntroStages(onReveal, onDone, ready);
  const covered = stage === "logo-in" || stage === "logo-hold";

  useEffect(() => {
    if (!ready) return;
    const wait = Math.max(0, SPLASH_FADE_MS - performance.now());
    const timer = setTimeout(
      () => requestAnimationFrame(() => requestAnimationFrame(removeSplash)),
      wait,
    );
    return () => {
      clearTimeout(timer);
      removeSplash();
    };
  }, [ready]);

  return (
    <div
      className={`${styles.intro} ${ready ? styles[STAGE_CLASS[stage]] : ""} ${ready ? styles.shown : ""}`}
      aria-hidden="true"
      style={
        {
          "--logo-url": `url(${branding.logoTransparentPath})`,
        } as CSSProperties
      }
    >
      {covered && <div className={styles.solid} />}
      <div className={styles.cutoutOverlay} />
      <img
        src={branding.logoTransparentPath}
        alt={intro.logoAlt}
        className={styles.logo}
      />
    </div>
  );
}
