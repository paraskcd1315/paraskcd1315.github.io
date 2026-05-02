import type { RepoSkeletonProps } from "./GithubModal.types";
import styles from "./RepoSkeleton.module.scss";

export default function RepoSkeleton({
  count = 6,
}: Readonly<RepoSkeletonProps>) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={styles.card} aria-hidden="true">
          <div className={`${styles.line} ${styles.lineName}`} />
          <div className={`${styles.line} ${styles.lineDesc}`} />
          <div className={`${styles.line} ${styles.lineDescShort}`} />
          <div className={styles.metaRow}>
            <div className={`${styles.line} ${styles.lineMeta}`} />
            <div className={`${styles.line} ${styles.lineMeta}`} />
            <div className={`${styles.line} ${styles.lineMeta}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
