import { useEffect, useState } from "react";
import "./Intro.css";

/**
 * Stage timing (ms). The user sees:
 *   1. logo-in   — solid black backdrop, rose-tinted KCD logo fades in
 *                  (the cutout hole behind it is already sized to the logo,
 *                  but is fully covered by the logo image so invisible)
 *   2. logo-hold — logo holds at full glow
 *   3. morph     — logo image opacity fades 1→0; the hole behind it stays
 *                  exactly at logo-size, so the user sees the logo cleanly
 *                  fade through to reveal the hero showing through the
 *                  logo-shaped hole. No size change anywhere — pure opacity
 *                  cross-fade for seamlessness.
 *   4. zoom      — the now-visible hole expands to fill the viewport
 *   5. (unmount) — onDone() fires, the Hero takes over and starts its own reveal
 *
 * The cutout uses `mask-composite: subtract`: the overlay is a full black
 * <div>; its mask is two layers, the second being the transparent KCD logo
 * PNG. Subtracting layer 2 from layer 1 punches a logo-shaped hole.
 *
 * The rose tint on the logo image uses an inline SVG feColorMatrix filter
 * (defined below). Every opaque pixel of the PNG is replaced with the
 * rose accent color while preserving alpha, so the original sunflowers /
 * green stripes / KCD letters all collapse to one solid rose silhouette.
 */
const STAGE_MS = {
  logoIn: 800,
  hold: 500,
  morph: 350,
  zoom: 1100,
};

const TOTAL_MS =
  STAGE_MS.logoIn + STAGE_MS.hold + STAGE_MS.morph + STAGE_MS.zoom;

export default function Intro({ onReveal, onDone }) {
  const [stage, setStage] = useState("logo-in");

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      onReveal?.();
      onDone();
      return;
    }

    const timers = [];
    timers.push(setTimeout(() => setStage("logo-hold"), STAGE_MS.logoIn));
    timers.push(
      setTimeout(() => setStage("morph"), STAGE_MS.logoIn + STAGE_MS.hold),
    );
    timers.push(
      setTimeout(
        () => {
          setStage("zoom");
          // Fire onReveal at the start of the zoom so the hero's name rise
          // can begin overlapping the cutout expansion — by the time the
          // cutout is gone, the name is most of the way into view, no pause.
          onReveal?.();
        },
        STAGE_MS.logoIn + STAGE_MS.hold + STAGE_MS.morph,
      ),
    );
    timers.push(setTimeout(() => onDone(), TOTAL_MS));
    return () => timers.forEach(clearTimeout);
  }, [onReveal, onDone]);

  return (
    <div
      className={`intro intro-${stage}`}
      aria-hidden="true"
      style={{
        // Absolute root path. Don't use process.env.PUBLIC_URL here:
        // with homepage="." in package.json, it expands to "." and
        // url(./...) inside CSS resolves relative to the CSS file's
        // location (build/static/css/), not the page root → 404.
        // <img src> handles "./..." correctly because src is resolved
        // relative to the document, but CSS url() is not.
        "--logo-url": "url(/kcd-logo-transparent.png)",
      }}
    >
      <div className="intro-cutout-overlay" />
      <img src="/kcd-logo-transparent.png" alt="" className="intro-logo" />
    </div>
  );
}
