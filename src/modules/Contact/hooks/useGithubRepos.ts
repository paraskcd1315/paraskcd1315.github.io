import { useCallback, useEffect, useState } from "react";

export interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

export type RepoScope = "user" | "org";

export interface UseGithubReposState {
  repos: GithubRepo[] | null;
  loading: boolean;
  error: string | null;
  retryAt: number | null;
  refresh: () => void;
}

interface CacheEntry {
  fetchedAt: number;
  repos: GithubRepo[];
}

const CACHE_TTL_MS = 60 * 60 * 1000;
const CACHE_PREFIX = "gh-repos:";

function cacheKey(scope: RepoScope, account: string) {
  return `${CACHE_PREFIX}${scope}:${account}`;
}

function readCache(key: string): CacheEntry | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (typeof parsed?.fetchedAt !== "number" || !Array.isArray(parsed.repos)) {
      return null;
    }
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(key: string, repos: GithubRepo[]) {
  try {
    const entry: CacheEntry = { fetchedAt: Date.now(), repos };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    /* quota or privacy mode — silent */
  }
}

function clearCache(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* silent */
  }
}

export default function useGithubRepos(
  scope: RepoScope,
  account: string,
  enabled: boolean,
): UseGithubReposState {
  const [repos, setRepos] = useState<GithubRepo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [retryAt, setRetryAt] = useState<number | null>(null);
  const [nonce, setNonce] = useState<number>(0);

  const refresh = useCallback(() => {
    clearCache(cacheKey(scope, account));
    setNonce((n) => n + 1);
  }, [scope, account]);

  useEffect(() => {
    if (!enabled) return;
    const key = cacheKey(scope, account);
    const cached = readCache(key);
    if (cached) {
      setRepos(cached.repos);
      setLoading(false);
      setError(null);
      setRetryAt(null);
      return;
    }

    let cancelled = false;
    setRepos(null);
    setLoading(true);
    setError(null);
    setRetryAt(null);

    const url =
      scope === "user"
        ? `https://api.github.com/users/${encodeURIComponent(account)}/repos?per_page=100&sort=pushed`
        : `https://api.github.com/orgs/${encodeURIComponent(account)}/repos?per_page=100&sort=pushed`;

    fetch(url, { headers: { Accept: "application/vnd.github+json" } })
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 403 || res.status === 429) {
          const reset = res.headers.get("x-ratelimit-reset");
          const ts = reset ? Number(reset) * 1000 : Date.now() + 15 * 60 * 1000;
          setRepos(null);
          setLoading(false);
          setError("rate-limit");
          setRetryAt(ts);
          return;
        }
        if (!res.ok) {
          setRepos(null);
          setLoading(false);
          setError(`HTTP ${res.status}`);
          setRetryAt(null);
          return;
        }
        const data = (await res.json()) as GithubRepo[];
        const sorted = [...data].sort(
          (a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at),
        );
        writeCache(key, sorted);
        setRepos(sorted);
        setLoading(false);
        setError(null);
        setRetryAt(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : "fetch failed";
        setRepos(null);
        setLoading(false);
        setError(msg);
        setRetryAt(null);
      });

    return () => {
      cancelled = true;
    };
  }, [scope, account, enabled, nonce]);

  return { repos, loading, error, retryAt, refresh };
}
