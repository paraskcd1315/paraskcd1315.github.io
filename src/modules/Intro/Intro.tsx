import { type CSSProperties } from "react";
import PORTFOLIO_CONTENT from "../../content";
import "./Intro.css";
import type { IntroProps } from "./Intro.types";
import useIntroStages from "./hooks/useIntroStages";

export default function Intro({ onReveal, onDone }: Readonly<IntroProps>) {
  const stage = useIntroStages(onReveal, onDone);
  const { branding, intro } = PORTFOLIO_CONTENT;

  return (
    <div
      className={`intro intro-${stage}`}
      aria-hidden="true"
      style={
        {
          "--logo-url": `url(${branding.logoTransparentPath})`,
        } as CSSProperties
      }
    >
      <div className="intro-cutout-overlay" />
      <img
        src={branding.logoTransparentPath}
        alt={intro.logoAlt}
        className="intro-logo"
      />
    </div>
  );
}
