import type { TagProps } from "./Tag.types";
import styles from "./Tag.module.scss";

export default function Tag({ children, accent = false }: Readonly<TagProps>) {
  return (
    <span className={`${styles.root} ${accent ? styles.accent : ""}`.trim()}>
      {children}
    </span>
  );
}
