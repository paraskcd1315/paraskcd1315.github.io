import type { GithubRepo, RepoScope } from "../../hooks";

export interface GithubModalProps {
  open: boolean;
  onClose: () => void;
}

export interface Tab {
  key: string;
  label: string;
  scope: RepoScope;
  account: string;
}

export interface RepoCardProps {
  repo: GithubRepo;
}

export interface RepoSkeletonProps {
  count?: number;
}
