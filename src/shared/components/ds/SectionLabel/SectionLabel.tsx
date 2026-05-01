import type { SectionLabelProps } from "./SectionLabel.types";
import styles from "./SectionLabel.module.scss";

export default function SectionLabel({
  children,
  align = "start",
  className = "",
}: Readonly<SectionLabelProps>) {
  const alignClass = align === "center" ? styles.center : "";
  return (
    <div className={`${styles.root} ${alignClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
