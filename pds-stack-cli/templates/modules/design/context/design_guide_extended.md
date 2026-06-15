# Design Guide — Extended (design module)
> Supplement to the core design_guide.md. Install alongside the design module.

---

## Motion System

| Level | Library | Rules |
|---|---|---|
| L0 | CSS / Tailwind | Default. No motion library. |
| L1 | motion | Max 3 `motion.div` per page. |
| L2 | motion + AnimatePresence | Layout transitions allowed. |
| L3 | motion + GSAP | RAY validation required before use. |

**Universal rule:** `useReducedMotion()` in every animated component.

---

## Figma Bridge
When the design module is installed, RAY specs can include a `/design-workflow` step
that generates a Figma frame from the spec before BOB implements it.

Trigger: `/design-workflow` after RAY delivers spec, before /bob.

---

## Component Patterns

### Cards
- Use `Card` from Shadcn/ui as base
- Max 3 levels of information hierarchy per card
- No decorative shadows — borders only

### Forms
- `Label` + `Input` from Shadcn/ui — never raw `<input>`
- Inline validation — error state immediate on blur
- Disabled state must be visually distinct (not just `opacity: 0.5`)

### Empty States
- Every list/table must have an empty state
- Empty state = illustration (optional) + headline + CTA
- Never just blank space

---

## Anti-Patterns (design module)
- No raw color values outside tokens
- No absolute positioning for layout (use flexbox/grid)
- No font sizes outside the type scale
- No icons without accessible labels
