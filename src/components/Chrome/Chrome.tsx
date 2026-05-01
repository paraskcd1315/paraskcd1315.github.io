import "./Chrome.css";
import type { ChromeProps } from "./Chrome.types";
import useCursorLerp from "./useCursorLerp";
import useKonami from "./useKonami";

export default function Chrome({ onKonami }: Readonly<ChromeProps>) {
  const { dotRef, ringRef } = useCursorLerp();
  useKonami(onKonami);

  return (
    <>
      <div className="grain" />
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor" ref={dotRef} />
    </>
  );
}
