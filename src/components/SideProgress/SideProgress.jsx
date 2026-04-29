import { useEffect, useState } from "react";
import SECTIONS from "../../sections";
import "./SideProgress.css";

export default function SideProgress() {
  const [active, setActive] = useState(SECTIONS[0]?.id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
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
