import { useEffect, useRef, useState } from "react";
import { MOBILE_BREAKPOINT_PX } from "../../../constants";

export default function useAboutCardStack(storyCount: number) {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const pin = pinRef.current;
      if (pin && window.innerWidth > MOBILE_BREAKPOINT_PX) {
        const r = pin.getBoundingClientRect();
        const total = pin.offsetHeight - window.innerHeight;
        const p = total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0;
        const idx = Math.min(
          storyCount - 1,
          Math.max(0, Math.floor(p * storyCount)),
        );
        setActive((prev) => (prev !== idx ? idx : prev));
        setProgress((prev) => (prev !== p ? p : prev));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [storyCount]);

  return { pinRef, active, progress };
}
