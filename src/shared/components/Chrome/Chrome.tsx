import styles from "./Chrome.module.scss";
import type { ChromeProps } from "./Chrome.types";
import useCursorLerp from "./hooks/useCursorLerp";
import useKonami from "./hooks/useKonami";

export default function Chrome({ onKonami }: Readonly<ChromeProps>) {
  const { dotRef, ringRef } = useCursorLerp();
  useKonami(onKonami);

  return (
    <>
      <div className={styles.grain} />
      <div className={styles.cursorRing} ref={ringRef} />
      <div className={styles.cursor} ref={dotRef} />
    </>
  );
}
