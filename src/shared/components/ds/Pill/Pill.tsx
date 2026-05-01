import type { PillProps } from "./Pill.types";
import styles from "./Pill.module.scss";

export default function Pill({ children, size = "sm" }: Readonly<PillProps>) {
  return <span className={`${styles.root} ${styles[size]}`}>{children}</span>;
}
