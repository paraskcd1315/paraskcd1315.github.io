import { LANG_COLORS, relativeTime } from "./GithubModalUtils";
import type { RepoCardProps } from "./GithubModal.types";
import styles from "./RepoCard.module.scss";

export default function RepoCard({ repo }: Readonly<RepoCardProps>) {
  const langColor = repo.language ? LANG_COLORS[repo.language] : null;

  return (
    <a
      className={styles.card}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h3 className={styles.name}>{repo.name}</h3>
      {repo.description && <p className={styles.desc}>{repo.description}</p>}
      <div className={styles.meta}>
        {repo.language && (
          <span className={styles.metaItem}>
            <span
              className={styles.langDot}
              style={langColor ? { background: langColor } : undefined}
            />
            {repo.language}
          </span>
        )}
        <span className={styles.metaItem} aria-label="stars">
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 .25l2.05 4.74 5.15.46-3.9 3.4 1.18 5.04L8 11.27 3.52 13.9l1.18-5.05L.8 5.45l5.15-.46z" />
          </svg>
          {repo.stargazers_count}
        </span>
        <span className={styles.metaItem} aria-label="forks">
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0zM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0z" />
          </svg>
          {repo.forks_count}
        </span>
        <span className={styles.metaItem} aria-label="pushed">
          <time dateTime={repo.pushed_at}>{relativeTime(repo.pushed_at)}</time>
        </span>
      </div>
    </a>
  );
}
