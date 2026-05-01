import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.scss";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...rest
}: Readonly<ButtonProps>) {
  return (
    <button
      type={type}
      className={`${styles.root} ${styles[variant]} ${styles[size]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
