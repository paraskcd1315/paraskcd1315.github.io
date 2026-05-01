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
          continue;
        }
      }
      try {
        const url = picsumFallback();
        await preload(url);
        if (!cancelled) setBgUrl(url);
      } catch {
        return;
      }
    }
    loadApod();
    return () => {
      cancelled = true;
    };
  }, []);

  return bgUrl;
}
