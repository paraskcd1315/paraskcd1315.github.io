import type { MonoLabelProps } from "./MonoLabel.types";
import styles from "./MonoLabel.module.scss";

export default function MonoLabel({
  children,
  size = 10,
  uppercase = true,
}: Readonly<MonoLabelProps>) {
  return (
    <span
      className={`${styles.root} ${uppercase ? styles.uppercase : ""}`.trim()}
      style={{ fontSize: `${size}px` }}
    >
      {children}
    </span>
  );
}
