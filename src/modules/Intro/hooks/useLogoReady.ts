import { useEffect, useState } from "react";

const LOGO_WAIT_MS = 3000;

export default function useLogoReady(src: string): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      setReady(true);
    };
    const img = new Image();
    img.src = src;
    const decoded = img.decode ? img.decode() : Promise.resolve();
    decoded.then(settle, settle);
    const timer = setTimeout(settle, LOGO_WAIT_MS);
    return () => {
      settled = true;
      clearTimeout(timer);
    };
  }, [src]);

  return ready;
}
