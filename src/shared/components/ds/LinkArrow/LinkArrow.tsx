import type { LinkArrowProps } from "./LinkArrow.types";
import styles from "./LinkArrow.module.scss";

export default function LinkArrow({ size = 36 }: Readonly<LinkArrowProps>) {
  return (
    <span
      className={styles.root}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      ↗
    </span>
  );
}
