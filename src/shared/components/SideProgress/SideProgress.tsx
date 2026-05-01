import SECTIONS from "../../../sections";
import { useSectionObserver } from "../../hooks";
import styles from "./SideProgress.module.scss";

export default function SideProgress() {
  const active = useSectionObserver();

  return (
    <nav className={styles.progress}>
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          className={`${styles.progressItem} ${active === s.id ? styles.active : ""}`}
          onClick={() =>
            document
              .getElementById(s.id)
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          <span>{String(i + 1).padStart(2, "0")}</span>
          <span className={styles.bar}></span>
          <span>{s.navLabel}</span>
        </button>
      ))}
    </nav>
  );
}
