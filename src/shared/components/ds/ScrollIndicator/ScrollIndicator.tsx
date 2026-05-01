import { type CSSProperties } from "react";
import type { ScrollIndicatorProps } from "./ScrollIndicator.types";
import styles from "./ScrollIndicator.module.scss";

export default function ScrollIndicator({
  current,
  total,
  progress,
  trackWidth = 120,
}: Readonly<ScrollIndicatorProps>) {
  return (
    <div className={styles.root}>
      <span>{String(current).padStart(2, "0")}</span>
      <span
        className={styles.track}
        style={
          {
            width: trackWidth,
            "--p": `${progress * 100}%`,
          } as CSSProperties
        }
      />
      <span>{String(total).padStart(2, "0")}</span>
    </div>
  );
}
