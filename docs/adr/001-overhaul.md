# ADR 001 — Architectural Overhaul (Epic 1)

**Status**: Accepted
**Date**: 2026-05-01
**Scope**: Stories PORT-7 (TS), PORT-8 (JSON content), PORT-9 (SCSS), PORT-10 (tokens), PORT-11 (Design System), PORT-12 (modularity), PORT-13 (this doc).

## Context

The portfolio (`paraskcd1315.github.io`) shipped as a CRA + plain JSX + plain CSS + JS-literal data file in 2026 Q1. The rebuild proved the visual concept but left a stack that:

- couldn't catch shape drift between `data.js` content and consumers (PropTypes nags only)
- duplicated style values (colors, spacing, motion) across 12+ CSS files
- had no DS — every section reimplemented eyebrow dots, meta rows, role pills, scroll indicators inline
- mixed section-level content with reusable primitives in one flat `src/components/` folder
- conflated WHAT (UI copy) with HOW (component layout) — heading text lived in JSX

Epic 1 (PORT-1) was the consolidated refactor that addressed all of the above in a single linked sweep, landed in one session on 2026-05-01.

## Decisions

### 1. TypeScript strict, not Flow

TypeScript with `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `allowJs: true`. Flow rejected — Facebook is moving away from it; TS has won the React ecosystem; types here also need to interop with JSON imports (`resolveJsonModule: true`), which TS does first-class.

`allowJs: true` was kept so the legacy `data.js` could coexist during PORT-8 migration. Once PORT-40 deleted `data.js`, the flag is technically removable but stays on for zero-cost optionality with the Worker (still `.js`).

### 2. SCSS Modules (`.module.scss`), not plain SCSS or styled-components

Component styles became `Component.module.scss` (CSS Modules + SCSS combined). Three options were considered:

| Option | Why rejected/accepted |
|---|---|
| Plain SCSS files (no modules) | Would re-introduce the global-class pollution we have today (`.about-stories`, `.skills-grid` colliding) |
| styled-components / Emotion | Runtime cost; harder to do design tokens cleanly; doesn't pair with SCSS tooling |
| **CSS Modules + SCSS** ✅ | Build-time hashed locals; SCSS gives nesting + mixins + tokens; hook-toggled classes (e.g., `hover`, `go`, `settled`, `dim`) bypass scoping via `:global(.X)` |

The `:global(.X)` escape hatch matters because hooks like `useCursorLerp` add literal class strings via `classList.toggle('hover', ...)` — those have to match a known selector, which only works if either the hook knows the hashed name (ugly coupling) or the class stays global. The latter is right.

### 3. JSON content files, not MDX or literal JS

11 JSON files in `src/content/` plus a typed `src/content/index.ts` aggregate. Considered MDX (lets content embed components inline) and literal JS (zero-friction edits) — both rejected:

- **MDX**: overkill for a portfolio that has no inline-component content. Pulls in a markdown compiler. Worse type safety than JSON+TS.
- **Literal JS** (the original `data.js`): can't be edited by non-engineers without breaking syntax (trailing commas, quote styles); TypeScript can't validate the literal shape against an interface as cleanly as it can for typed JSON imports.

JSON wins: human-readable diffs, type-safe via `src/content/types.ts`, zero runtime cost (CRA + tsconfig `resolveJsonModule: true` handles import natively).

The 11-file split (vs. the spec'd 7) absorbs UI copy that was originally hardcoded in JSX — `hero.json` carries the greeting words, meta entries, and stacks label; `branding.json` carries logo paths + the konami flash text; `contact.json` carries the 5 random taglines; etc. Editing visible portfolio text is now exclusively a JSON edit.

### 4. Centralized SCSS tokens with CSS-custom-property bridge

`src/styles/tokens/{colors, typography, spacing, radii, motion, breakpoints}.scss` define `$accent`, `$ink`, `$sp-5`, etc. Token files are forwarded by `tokens/index.scss` and `@use`d by every module SCSS via `@use "../../styles/tokens" as *`.

Most tokens also surface as CSS custom properties on `:root` (set in `globals.scss`) so runtime theming works without recompiling SCSS. This is what makes the light-theme override block (`:root[data-theme="light"]`) trivial — flip a few CSS vars, no SCSS changes.

The combined approach gives compile-time validation (you can't `$accent-typo` without a SCSS error) and runtime flexibility (theming).

### 5. `src/{modules, shared, content, styles}` folder split

The original `src/components/` flat folder mixed sections (Hero, About) with reusables (PhoneTrio, ProjectMock) and chrome (Chrome, SideProgress). Three semantic folders separate them:

- **`src/modules/`** — section-level scroll-driven content (8 modules: Hero, About, Skills, Projects, Photo, Watch, Contact, Intro)
- **`src/shared/components/`** — reusables (Chrome, SideProgress, PhoneTrio, ProjectMock, VideoFrame) plus the `ds/` Design System (8 atoms + 5 molecules)
- **`src/shared/hooks/`** — cross-module hooks (useReveal, useScrollY, useHorizontalPin, useSectionObserver)
- **`src/shared/utils/`** — empty for now; reserved for cross-module pure functions

A `src/layouts/` folder was originally proposed (per PORT-12 spec) for Chrome + SideProgress. Deleted mid-session because "layouts" should mean wrappers shared by multiple modules — we have none. Chrome and SideProgress are shared *components*, not layouts. PORT-107 corrected the spec.

### 6. Per-component hooks live with the component

Each module that has imperative side-effects (Hero, About, Projects, Intro, Chrome) has a `hooks/` subfolder for module-private hooks (`useHeroBackground`, `useAboutCardStack`, etc.). Cross-module hooks live in `src/shared/hooks/`.

This makes modules render-only: Hero shrunk from 152 lines to 90, Chrome from 71 to 17, Intro from 96 to 53. Easier to read, easier to refactor (you can move a module without breaking other consumers, since its hooks travel with it).

### 7. Barrel-only cross-folder imports, ESLint-enforced

`no-restricted-imports` ESLint rule (in `package.json` `eslintConfig.rules`) blocks any import specifier matching `*/modules/*/*` or `*/shared/components/*/*` or `*/shared/hooks/*` or `*/shared/utils/*`. Consumers go through barrels:

```ts
import { Hero, About } from "../modules";              // ✅
import { SectionLabel } from "../../shared/components"; // ✅
import Hero from "../modules/Hero/Hero";                // ❌
```

Internal moves (e.g., extracting a hook from a module body to `Module/hooks/`) don't break consumers. Adding a new component is one new entry in one barrel. The rule fires on a synthetic violation file — verified live.

## Pitfalls discovered during the migration

These bit during the work and are documented in `TechnicalGuide.md` Common Pitfalls — listing here for the historical record:

- **`useRef<T>(null)` generic stripped by IDE formatter.** The formatter (likely Sonarlint auto-fix) treats the explicit generic as redundant because `null` infers `null` for T. Result: `current` is `null`, not `T | null`, so `current.foo` errors with "property foo does not exist on never". Workaround: explicit `useRef<T | null>(null)` or `useState<string>("")` with non-null sentinel.
- **CRA babel-loader silently strips TS errors.** `npm start` and `npm run build` succeed even when `tsc --noEmit` reports 30 errors. Only fork-ts-checker overlay catches them in dev. Run `tsc --noEmit` explicitly before declaring done.
- **`as const satisfies` not parsed by CRA 5's bundled `@typescript-eslint/parser`.** TS 4.9+ syntax; CRA 5 ships an older parser. Use `as const` only.
- **CSS custom property `style={{ "--p": ... }}` errors.** React's `CSSProperties` doesn't include CSS vars. Cast: `style={{ "--p": x } as CSSProperties}` (with `import type { CSSProperties } from "react"`).
- **`homepage: "."` breaks SCSS `url()` resolution.** The CSS file ends up at `build/static/css/main.<hash>.css` and `url(./foo.png)` resolves relative to that, not the page root. Use absolute `/foo.png` in SCSS, or set the URL via inline JSX `style` (the Intro pattern).
- **`react-scripts@5.0.1` peer-dep conflict with `typescript@5`.** react-scripts spec'd `typescript@^4` only. `npm install --legacy-peer-deps` for all installs.

## Consequences

**Positive:**
- Type safety end-to-end (content → component props → DS atoms)
- Theming-ready (light-mode toggle is now a UI control + state hookup; no SCSS touch needed)
- Editorial workflow: portfolio copy edits don't touch code
- Internals can be reorganized without breaking consumers (barrel discipline)
- 13 DS atoms+molecules ready for new sections (PORT-6 cinematic Timeline, etc.) without bespoke style work
- `tsc --noEmit` and `eslint src` clean — CI gate is straightforward when added

**Negative:**
- More boilerplate per component (4 files instead of 2)
- Indirection: tracing a class name from JSX → `styles.X` → `Component.module.scss` → `:global` (if hook-toggled) → `globals.scss` (if utility)
- Sonarlint warnings about "unused" type-only imports used in casts (`as CSSProperties`) — false positives but visible noise in IDE
- `--legacy-peer-deps` needed for installs as long as we stay on CRA 5

The negatives are accepted. The component-folder boilerplate is mechanical (a new-component snippet would erase it); the indirection is intentional decoupling; the Sonar nits are tooling-side, not code-side.

## Migration sequencing (followed)

1. PORT-7 (1.1 TS) — foundation
2. PORT-12 (1.6 modularity, including PORT-107 mid-session refinement) — folder shape
3. PORT-8 (1.2 JSON + UI text audit)
4. PORT-9 + PORT-10 (1.3 SCSS modules + 1.4 tokens)
5. PORT-11 (1.5 DS — atoms + molecules + module refactor)
6. PORT-13 (this doc — 1.7 update guide + ADR)

Each story landed as a series of per-step commits on `PORT-7/typescript-migration` branch (~30 commits total). `tsc --noEmit` + `eslint src` clean at every commit. Branch is ready to merge to main.
