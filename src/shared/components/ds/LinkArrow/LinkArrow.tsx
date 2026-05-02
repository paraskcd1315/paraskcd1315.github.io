import type { LinkArrowProps } from "./LinkArrow.types";
import styles from "./LinkArrow.module.scss";

export default function LinkArrow({
  size = 36,
  active = false,
  className = "",
}: Readonly<LinkArrowProps>) {
  const cls = [styles.root, active ? "is-active" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <span
      className={cls}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      ↗
    </span>
  );
}
