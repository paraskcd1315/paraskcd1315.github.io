# Design System (DS)

Reusable atoms + molecules consumed by `src/modules/` and other shared components.

## Layout

```
src/shared/components/ds/
  <Atom>/
    <Atom>.tsx           public component
    <Atom>.module.scss   local styles (uses tokens + mixins)
    <Atom>.types.ts      prop interface
    index.ts             default re-export
  index.ts               barrel — named exports for every atom + molecule
  DS-README.md           this file
```

Consume via the parent barrel:

```tsx
import { SectionLabel, MetaRow, Tag } from "../../shared/components/ds";
// or via the higher-level barrel:
import { SectionLabel, MetaRow, Tag } from "../../shared/components";
```

## Contract

| Category   | Member          | Purpose                                                      |
|------------|-----------------|--------------------------------------------------------------|
| Atom       | `Avatar`        | Circular image with optional accent glow                     |
| Atom       | `Button`        | `primary` / `ghost` / `outline` × `sm` / `md`                |
| Atom       | `IconCircle`    | Bordered circular slot for an icon child                     |
| Atom       | `LiveDot`       | Pulsing accent dot (eyebrow indicator)                       |
| Atom       | `MonoLabel`     | Small mono uppercase label                                   |
| Atom       | `Pill`          | Bordered oval container, `sm`/`md`                           |
| Atom       | `SectionLabel`  | The accent-prefixed section header (`align: start \| center`)|
| Atom       | `Tag`           | Mono uppercase tag with bg, optional `accent` mode           |
| Molecule   | `LinkArrow`     | Circle-bound arrow that highlights on parent hover           |
| Molecule   | `MetaRow`       | Stacked label + value with optional accent value             |
| Molecule   | `RoleBadge`     | Pill specifically for hero role chips                        |
| Molecule   | `ScrollIndicator` | `01 / track / 04` row driven by 0..1 progress              |
| Molecule   | `StackChip`     | Mono uppercase label for a tech category chip                |

## Styling rules

1. Every component uses tokens from `src/styles/tokens` — no hardcoded colors,
   fonts, radii, or spacing values.
2. Module-scoped class names; multi-state via boolean props that map to a
   secondary class (e.g. `accent`, `glow`).
3. Hover/focus state lives in the SCSS, not in JS — except where it must
   coordinate with a hook (e.g. `useCursorLerp` toggles `:global(.hover)`).
4. Sizes/measurements that must vary per use (Avatar size, ScrollIndicator
   trackWidth) come in via inline `style`, not props that bleed into the SCSS.

## Adding a new component

1. `mkdir src/shared/components/ds/<Name>`
2. Create `<Name>.types.ts`, `<Name>.module.scss`, `<Name>.tsx`, `index.ts`
3. Add named export + type export to `src/shared/components/ds/index.ts`
4. Bump category table above

## Refactor backlog

PORT-108 (1.5.5) — three atoms need adjustments so Skills + Projects can
re-consume them (initial PORT-53 swap failed visual-parity audit and was
reverted). Specifically:
- **IconCircle** needs a `borderRadius` prop (Skills wants 8px square, not
  pill) + `overflow: hidden` + inner-img sizing (76% × 76% for child `<img>`)
- **ScrollIndicator** is currently layout-agnostic but Projects expected a
  positioning wrapper. Document that fact here; consumer wraps in an
  absolutely-positioned div.
- **LinkArrow** hover via `*:hover > &` only matches direct parent; needs
  an `active` prop the consumer drives from its own hover state (project-card
  hover is two levels above the atom).
