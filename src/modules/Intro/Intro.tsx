import { type CSSProperties } from "react";
import "./Intro.css";
import type { IntroProps } from "./Intro.types";
import useIntroStages from "./hooks/useIntroStages";

export default function Intro({ onReveal, onDone }: Readonly<IntroProps>) {
  const stage = useIntroStages(onReveal, onDone);

  return (
    <div
      className={`intro intro-${stage}`}
      aria-hidden="true"
      style={
        {
          // homepage="." in package.json makes process.env.PUBLIC_URL expand
          // to ".", which breaks CSS url() resolution from build/static/css/.
          // Hardcode the absolute root path here.
          "--logo-url": "url(/kcd-logo-transparent.png)",
        } as CSSProperties
      }
    >
      <div className="intro-cutout-overlay" />
      <img src="/kcd-logo-transparent.png" alt="" className="intro-logo" />
    </div>
  );
}
