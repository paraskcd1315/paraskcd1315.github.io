import type { TimelineEvent } from "../../content";
import { parseTimelineDate } from "../Timeline/TimelineUtils";

// Maps a skills.json `name` to one or more timeline tag aliases. Skills
// not listed here match the timeline tag of the same name verbatim.
const SKILL_ALIASES: Record<string, readonly string[]> = {
  ".NET Core": [".NET", ".NET 10"],
  "C#": [".NET", ".NET 10"],
  Blazor: [".NET", ".NET 10"],
  AngularJS: ["Angular"],
  "React / Next": ["React", "React 19"],
  Redux: ["React"],
  ElectronJS: ["Electron"],
  ExpressJS: ["Express"],
  MongoDB: ["Mongoose"],
  "Final Cut Pro": ["After Effects"],
};

// Explicit date overrides for skills with no clean tag mapping.
const SKILL_SINCE_OVERRIDE: Record<string, string> = {
  Figma: "2023-11",
  AWS: "2021-09",
  "Azure DevOps": "2023-11",
};

export function skillSearchTerms(skillName: string): readonly string[] {
  return SKILL_ALIASES[skillName] ?? [skillName];
}

export function findEarliestSkillDate(
  skillName: string,
  items: readonly TimelineEvent[],
): string | null {
  const override = SKILL_SINCE_OVERRIDE[skillName];
  if (override) return override;
  const terms = skillSearchTerms(skillName);
  let earliest: string | null = null;
  let earliestT = Infinity;
  for (const event of items) {
    if (!event.tags) continue;
    if (event.tags.some((tag) => terms.includes(tag))) {
      const t = parseTimelineDate(event.date);
      if (t < earliestT) {
        earliestT = t;
        earliest = event.date;
      }
    }
  }
  return earliest;
}

export function yearsExperience(date: string, now: Date = new Date()): number {
  const past = parseTimelineDate(date);
  const present = now.getFullYear() + now.getMonth() / 12;
  return Math.max(0, Math.floor(present - past));
}
