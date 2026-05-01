import type { RoleBadgeProps } from "./RoleBadge.types";
import styles from "./RoleBadge.module.scss";

export default function RoleBadge({ role }: Readonly<RoleBadgeProps>) {
  return <span className={styles.root}>{role}</span>;
}
