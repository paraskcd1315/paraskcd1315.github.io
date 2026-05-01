import { useEffect, useState } from "react";
import SECTIONS from "../../sections";

export default function useSectionObserver(): string {
  const [active, setActive] = useState<string>(SECTIONS[0]?.id ?? "hero");

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

  return active;
}
