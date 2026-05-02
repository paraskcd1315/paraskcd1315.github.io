import { useEffect, useState } from "react";

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

export default function useGithubRepos(
  scope: RepoScope,
  account: string,
  enabled: boolean,
): UseGithubReposState {
  const [state, setState] = useState<UseGithubReposState>({
    repos: null,
    loading: false,
    error: null,
    retryAt: null,
  });

  useEffect(() => {
    if (!enabled) return;
    const key = cacheKey(scope, account);
    const cached = readCache(key);
    if (cached) {
      setState({
        repos: cached.repos,
        loading: false,
        error: null,
        retryAt: null,
      });
      return;
    }

    let cancelled = false;
    setState({ repos: null, loading: true, error: null, retryAt: null });

    const url =
      scope === "user"
        ? `https://api.github.com/users/${encodeURIComponent(account)}/repos?per_page=100&sort=pushed`
        : `https://api.github.com/orgs/${encodeURIComponent(account)}/repos?per_page=100&sort=pushed`;

    fetch(url, { headers: { Accept: "application/vnd.github+json" } })
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 403 || res.status === 429) {
          const reset = res.headers.get("x-ratelimit-reset");
          const retryAt = reset
            ? Number(reset) * 1000
            : Date.now() + 15 * 60 * 1000;
          setState({
            repos: null,
            loading: false,
            error: "rate-limit",
            retryAt,
          });
          return;
        }
        if (!res.ok) {
          setState({
            repos: null,
            loading: false,
            error: `HTTP ${res.status}`,
            retryAt: null,
          });
          return;
        }
        const data = (await res.json()) as GithubRepo[];
        const sorted = [...data].sort(
          (a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at),
        );
        writeCache(key, sorted);
        setState({
          repos: sorted,
          loading: false,
          error: null,
          retryAt: null,
        });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : "fetch failed";
        setState({ repos: null, loading: false, error: msg, retryAt: null });
      });

    return () => {
      cancelled = true;
    };
  }, [scope, account, enabled]);

  return state;
}
