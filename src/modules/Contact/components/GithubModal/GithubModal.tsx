import { useEffect, useMemo, useState } from "react";
import PORTFOLIO_CONTENT from "../../../../content";
import { Modal } from "../../../../shared/components";
import { useGithubRepos } from "../../hooks";
import RepoCard from "./RepoCard";
import RepoSkeleton from "./RepoSkeleton";
import { INITIAL_VISIBLE, formatCountdown } from "./GithubModalUtils";
import type { GithubModalProps, Tab } from "./GithubModal.types";
import styles from "./GithubModal.module.scss";

export default function GithubModal({
  open,
  onClose,
}: Readonly<GithubModalProps>) {
  const { github } = PORTFOLIO_CONTENT;
  const personalTab = useMemo<Tab>(
    () => ({
      key: "personal",
      label: "Personal",
      scope: "user",
      account: github.personal,
    }),
    [github.personal],
  );
  const tabs = useMemo<Tab[]>(
    () => [
      personalTab,
      ...github.orgs.map<Tab>((org) => ({
        key: `org-${org}`,
        label: org,
        scope: "org",
        account: org,
      })),
    ],
    [personalTab, github.orgs],
  );
  const [activeKey, setActiveKey] = useState<string>(personalTab.key);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE);
  const [now, setNow] = useState<number>(() => Date.now());
  const active = tabs.find((t) => t.key === activeKey) ?? personalTab;
  const { repos, loading, error, retryAt, refresh } = useGithubRepos(
    active.scope,
    active.account,
    open,
  );

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [activeKey]);

  useEffect(() => {
    if (error !== "rate-limit" || !retryAt) return;
    const id = globalThis.setInterval(() => setNow(Date.now()), 1000);
    return () => globalThis.clearInterval(id);
  }, [error, retryAt]);

  const visibleRepos = repos ? repos.slice(0, visibleCount) : null;
  const hasMore = repos ? repos.length > visibleCount : false;
  const retryReady = !retryAt || now >= retryAt;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="GitHub"
      subtitle={`Public repositories — ${active.scope === "user" ? "@" : ""}${active.account}`}
    >
      <div className={styles.tabsBar} role="tablist" aria-label="Account tabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={t.key === activeKey}
            className={`${styles.tab} ${t.key === activeKey ? styles.tabActive : ""}`}
            onClick={() => setActiveKey(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className={styles.tabBody} role="tabpanel">
        {loading && <RepoSkeleton count={6} />}
        {error === "rate-limit" && (
          <div className={styles.errorBox} role="alert">
            <p className={styles.errorTitle}>GitHub rate limit hit</p>
            <p className={styles.errorBody}>
              {retryReady
                ? "Cooldown ended. Retry now."
                : `Retry available in ${formatCountdown((retryAt ?? 0) - now)}.`}
            </p>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={refresh}
              disabled={!retryReady}
            >
              Retry
            </button>
          </div>
        )}
        {error && error !== "rate-limit" && (
          <div className={styles.errorBox} role="alert">
            <p className={styles.errorTitle}>Couldn't reach GitHub</p>
            <p className={styles.errorBody}>{error}</p>
            <button type="button" className={styles.retryBtn} onClick={refresh}>
              Retry
            </button>
          </div>
        )}
        {!loading && !error && visibleRepos?.length === 0 && (
          <p className={styles.placeholder}>No public repos here.</p>
        )}
        {!loading && !error && visibleRepos && visibleRepos.length > 0 && (
          <>
            <div className={styles.grid}>
              {visibleRepos.map((r) => (
                <RepoCard key={r.id} repo={r} />
              ))}
            </div>
            {hasMore && (
              <div className={styles.showMoreWrap}>
                <button
                  type="button"
                  className={styles.showMore}
                  onClick={() => setVisibleCount((n) => n + INITIAL_VISIBLE)}
                >
                  Show more ({(repos?.length ?? 0) - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}
