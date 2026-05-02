import { useMemo, useState } from "react";
import PORTFOLIO_CONTENT from "../../../../content";
import { Modal } from "../../../../shared/components";
import type { GithubModalProps } from "./GithubModal.types";
import styles from "./GithubModal.module.scss";

interface Tab {
  key: string;
  label: string;
  scope: "user" | "org";
  account: string;
}

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
  const active = tabs.find((t) => t.key === activeKey) ?? personalTab;

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
        <p className={styles.placeholder}>
          Repos for <code>{active.account}</code> land in PORT-121 (fetch +
          cache) → PORT-122 (card layout).
        </p>
      </div>
    </Modal>
  );
}
