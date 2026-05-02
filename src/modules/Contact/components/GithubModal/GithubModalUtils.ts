export const INITIAL_VISIBLE = 12;

export const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Kotlin: "#a97bff",
  Swift: "#f05138",
  "Objective-C": "#438eff",
  "C#": "#178600",
  Java: "#b07219",
  Python: "#3572a5",
  Go: "#00add8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Shell: "#89e051",
  Dart: "#00b4ab",
  PHP: "#4f5d95",
  Ruby: "#701516",
  C: "#555555",
  "C++": "#f34b7d",
};

export function relativeTime(iso: string): string {
  const ts = Date.parse(iso);
  const diffSec = (Date.now() - ts) / 1000;
  if (diffSec < 60) return "just now";
  const m = Math.floor(diffSec / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo ago`;
  const y = Math.floor(mo / 12);
  return `${y}y ago`;
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return "now";
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  if (m > 0) return `${m}m ${s.toString().padStart(2, "0")}s`;
  return `${s}s`;
}
