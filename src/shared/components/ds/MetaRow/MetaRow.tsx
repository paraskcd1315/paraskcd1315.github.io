import type { MetaRowProps } from "./MetaRow.types";
import styles from "./MetaRow.module.scss";

export default function MetaRow({
  label,
  children,
  accent = false,
}: Readonly<MetaRowProps>) {
  return (
    <div className={styles.root}>
      <span className={styles.label}>{label}</span>
      <span className={`${styles.value} ${accent ? styles.accent : ""}`.trim()}>
        {children}
      </span>
    </div>
  );
}
