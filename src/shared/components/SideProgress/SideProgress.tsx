import SECTIONS from "../../../sections";
import { useSectionObserver } from "../../hooks";
import "./SideProgress.css";

export default function SideProgress() {
  const active = useSectionObserver();

  return (
    <nav className="progress">
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          className={`progress-item${active === s.id ? " active" : ""}`}
          onClick={() =>
            document
              .getElementById(s.id)
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          <span>{String(i + 1).padStart(2, "0")}</span>
          <span className="bar"></span>
          <span>{s.navLabel}</span>
        </button>
      ))}
    </nav>
  );
}
