import { useEffect, useRef } from "react";
import { HERO_NAME_REVEAL_DELAY_MS } from "../../../constants";

const NAME_ANIM_DURATION_MS = 1100;
const NAME_STAGGER_MAX_MS = 460;
const SETTLE_BUFFER_MS = 100;

export default function useHeroNameReveal(startReveal: boolean) {
  const nameRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!startReveal) return undefined;
    const el = nameRef.current;
    if (!el) return undefined;
    const t = setTimeout(
      () => el.classList.add("go"),
      HERO_NAME_REVEAL_DELAY_MS,
    );
    const settle = setTimeout(
      () => el.classList.add("settled"),
      HERO_NAME_REVEAL_DELAY_MS +
        NAME_ANIM_DURATION_MS +
        NAME_STAGGER_MAX_MS +
        SETTLE_BUFFER_MS,
    );
    return () => {
      clearTimeout(t);
      clearTimeout(settle);
    };
  }, [startReveal]);

  return nameRef;
}
