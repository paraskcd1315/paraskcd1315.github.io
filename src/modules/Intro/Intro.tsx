import { type CSSProperties } from "react";
import PORTFOLIO_CONTENT from "../../content";
import styles from "./Intro.module.scss";
import type { IntroProps } from "./Intro.types";
import useIntroStages, { type IntroStage } from "./hooks/useIntroStages";

const STAGE_CLASS: Record<IntroStage, string> = {
  "logo-in": "logoIn",
  "logo-hold": "logoHold",
  morph: "morph",
  zoom: "zoom",
};

export default function Intro({ onReveal, onDone }: Readonly<IntroProps>) {
  const stage = useIntroStages(onReveal, onDone);
  const { branding, intro } = PORTFOLIO_CONTENT;

  return (
    <div
      className={`${styles.intro} ${styles[STAGE_CLASS[stage]]}`}
      aria-hidden="true"
      style={
        {
          "--logo-url": `url(${branding.logoTransparentPath})`,
        } as CSSProperties
      }
    >
      <div className={styles.cutoutOverlay} />
      <img
        src={branding.logoTransparentPath}
        alt={intro.logoAlt}
        className={styles.logo}
      />
    </div>
  );
}
