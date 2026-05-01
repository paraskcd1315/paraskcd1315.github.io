import { useEffect } from "react";
import { KONAMI_SEQUENCE } from "../../../../constants";

export default function useKonami(onComplete?: () => void) {
  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === KONAMI_SEQUENCE[idx]) {
        idx++;
        if (idx === KONAMI_SEQUENCE.length) {
          idx = 0;
          onComplete?.();
        }
      } else {
        // If the wrong key is itself the first sequence key, count it as a restart.
        idx = k === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onComplete]);
}
