import type { IconCircleProps } from "./IconCircle.types";
import styles from "./IconCircle.module.scss";

export default function IconCircle({
  children,
  size = 36,
  accent = false,
}: Readonly<IconCircleProps>) {
  return (
    <div
      className={`${styles.root} ${accent ? styles.accent : ""}`.trim()}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
}
