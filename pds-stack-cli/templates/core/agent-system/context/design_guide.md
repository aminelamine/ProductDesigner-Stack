# Design Guide
## Design Tokens
[TO FILL] Colors, spacing, typography — reference your Figma tokens here

## Component Usage
[TO FILL] Which Shadcn/ui components are used + conventions

## Registries autorisés
Third-party shadcn registries — ADR-001 amendment. Installed with the shadcn CLI, into `/components/`
(never `/components/ui/`). A registry not listed here is an ADR-001 violation.

| Registry | Install | Conditions |
|---|---|---|
| [useLayouts](https://uselayouts.com) — MIT, Motion-based micro-interactions | `npx shadcn@latest add https://uselayouts.com/r/<name>.json` — the `.json` is required (the README omits it, 404 without) | spec `motion_level` ≥ L1 (ADR-007) · `prefers-reduced-motion` checked on each component · forbidden in L0 |

**As inspiration** — useLayouts is a designer-supplied reference for micro-interactions: BOB may point
to a component by name in a brief or a prototype. In `--proto` (plain HTML, no React) BOB reproduces
the chosen interaction only — the registry is never installed there.

## Action Hierarchy
[TO FILL] Primary / secondary / destructive — rules for button placement

## Anti-Patterns
[TO FILL] What this design system explicitly forbids

## Motion System
[TO FILL] Current level: L0 by default — see STACK.md
