import { useEffect } from "react";
import { KONAMI_SEQUENCE } from "../../../../constants";

/**
 * Listens for the konami sequence (↑↑↓↓←→←→BA). Calls `onComplete` when the
 * full sequence is typed. Resets on any wrong key (with a smart re-start
 * if the wrong key is itself the first sequence key).
 */
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
        idx = k === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onComplete]);
}
