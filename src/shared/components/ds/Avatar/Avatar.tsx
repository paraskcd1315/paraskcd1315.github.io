import type { AvatarProps } from "./Avatar.types";
import styles from "./Avatar.module.scss";

export default function Avatar({
  src,
  alt,
  size = 96,
  glow = true,
}: Readonly<AvatarProps>) {
  return (
    <div
      className={`${styles.root} ${glow ? styles.glow : ""}`.trim()}
      style={{ width: size, height: size }}
    >
      <img src={src} alt={alt} />
    </div>
  );
}
