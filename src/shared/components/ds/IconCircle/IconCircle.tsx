import { type CSSProperties } from "react";
import type { IconCircleProps } from "./IconCircle.types";
import styles from "./IconCircle.module.scss";

export default function IconCircle({
  children,
  size = 36,
  borderRadius,
  accent = false,
  className = "",
}: Readonly<IconCircleProps>) {
  const style: CSSProperties = { width: size, height: size };
  if (borderRadius !== undefined) {
    style.borderRadius =
      typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;
  }
  return (
    <div
      className={`${styles.root} ${accent ? styles.accent : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
