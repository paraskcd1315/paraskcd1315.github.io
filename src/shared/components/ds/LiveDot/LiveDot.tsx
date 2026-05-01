import type { LiveDotProps } from "./LiveDot.types";
import styles from "./LiveDot.module.scss";

export default function LiveDot({ size = 6 }: Readonly<LiveDotProps>) {
  return (
    <span
      className={styles.root}
      style={{ width: size, height: size, display: "inline-block" }}
    />
  );
}
