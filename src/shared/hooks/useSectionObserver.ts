import { useEffect, useState } from "react";
import SECTIONS from "../../sections";

/**
 * Tracks which registered section is currently in view via IntersectionObserver.
 * Initial value is the first registered section id.
 *
 * The rootMargin window of -40%/-55% means a section becomes "active" when
 * its top crosses ~40% from viewport top and stays active until its bottom
 * crosses ~55% from viewport bottom — gives a stable mid-screen activation
 * band rather than a flickery edge trigger.
 */
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
