import type { StackChipProps } from "./StackChip.types";
import styles from "./StackChip.module.scss";

export default function StackChip({ label }: Readonly<StackChipProps>) {
  return <span className={styles.root}>{label}</span>;
}
