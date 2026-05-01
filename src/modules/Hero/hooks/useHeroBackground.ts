import { useEffect, useState } from "react";
import {
  APOD_LOOKBACK_DAYS,
  APOD_RETRY_COUNT,
  SEASONS_BY_MONTH,
} from "../../../constants";

const APOD_PROXY_URL = "https://apod-proxy.paraskhanchandani1315.workers.dev";

function randomApodDate() {
  const daysAgo = Math.floor(Math.random() * APOD_LOOKBACK_DAYS);
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

function picsumFallback() {
  const season = SEASONS_BY_MONTH[new Date().getMonth()] ?? "winter";
  return `https://picsum.photos/1920/1080?${season}-${Date.now()}`;
}

function preload(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error("image failed to load"));
    img.src = src;
  });
}

/**
 * Fetches a random NASA APOD image (via Cloudflare Worker proxy that holds
 * the API key). Retries up to APOD_RETRY_COUNT times — each retry picks a
 * fresh random date, since some dates are videos/missing/etc. After all
 * retries fail, falls back to a season-tinted Picsum image. Pre-loads via
 * `new Image()` then swaps to avoid the progressive top-to-bottom decode
 * that otherwise looks bad on a hero photo.
 *
 * Returns the resolved URL (empty string until ready). Set as a CSS
 * background-image once non-empty.
 */
export default function useHeroBackground(): string {
  const [bgUrl, setBgUrl] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    async function loadApod() {
      for (let i = 0; i < APOD_RETRY_COUNT; i++) {
        try {
          const date = randomApodDate();
          const res = await fetch(`${APOD_PROXY_URL}?date=${date}`);
          if (!res.ok) continue;
          const data = await res.json();
          if (data.media_type !== "image" || !data.url) continue;
          await preload(data.url);
          if (!cancelled) setBgUrl(data.url);
          return;
        } catch {
          // try next
        }
      }
      try {
        const url = picsumFallback();
        await preload(url);
        if (!cancelled) setBgUrl(url);
      } catch {
        // give up silently, gradient backdrop stays
      }
    }
    loadApod();
    return () => {
      cancelled = true;
    };
  }, []);

  return bgUrl;
}
