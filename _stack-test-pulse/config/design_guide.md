# design_guide.md — Pulse
> Fully configured for the stack test — no `[TO COMPLETE]` placeholders, so BOB has zero ambiguity.

---

## 🎨 Design Philosophy
### Guiding principle
"A calm, editorial inbox — the status of every item is legible at a glance, and an empty list feels like an accomplishment, not a void."

### The 3 words
`Calm` · `Legible` · `Glanceable`

### What it means for BOB
- Light, restful surface (Zinc theme). Hierarchy carried by type weight and one functional status color per state — never decorative color.
- Status is always visible without interaction (badge + weight), honoring the Glanceability value.

---

## 🏗️ UI Stack
| Tool | Role | Version |
|---|---|---|
| Next.js | App Router | 15.x |
| Tailwind CSS | Styling | 4.x |
| Shadcn/ui | Components | latest |
| Lucide React | Icons (sparingly) | latest |
| Geist Sans | Primary font (Next 15 built-in) | latest |
| motion | L1–L2 animations (installed, unused at L0) | latest |

> BOB must not introduce a UI library not listed here.

---

## 🎭 Motion
Default **L0** (CSS/Tailwind only). This feature is L0 — functional transitions only (`transition-colors duration-150`). No `motion` usage. `prefers-reduced-motion` rule still applies to any transition.

---

## 🎛️ Design Tokens
### Shadcn theme selected
`Zinc` — CSS variables, New York style. Light mode only for MVP (no dark mode).

Use semantic tokens only: `bg-background`, `text-foreground`, `text-muted-foreground`, `border`, `bg-card`. **No raw Tailwind color literals** (`bg-zinc-800`) outside the status color map below.

### Status color map (the only functional colors allowed)
| Status | Token/class | Meaning |
|---|---|---|
| `new` | `amber` (badge variant) | Untriaged, needs attention |
| `triaged` | `sky` | Seen, in progress |
| `archived` | `muted` | Closed / done |

---

## 🔤 Typography
Geist Sans (built into Next 15). Scale:
| Usage | Classes |
|---|---|
| Page title | `text-2xl font-semibold tracking-tight` |
| Card title | `text-base font-medium` |
| Body | `text-sm leading-relaxed` |
| Meta | `text-xs text-muted-foreground` |

---

## 📐 Spacing & Layout
- 8px base grid.
- Content max-width: `max-w-2xl` (single-column reading list).
- Layout padding: `px-6 md:px-8`, section `py-10`.
- Breakpoints: `md (768px)`, mobile-first.

---

## 🧱 Validated Shadcn components (BOB installs ONLY these)
```bash
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add button
npx shadcn@latest add skeleton   # loading
npx shadcn@latest add separator
```
Rules: never modify `/components/ui/`; extend via `className`; custom variants via `cva`.

---

## 🖥️ Mandatory states (any data component)
- Loading — `<Skeleton />` matching final dimensions
- Empty — contextual positive message + it means "done" (Honest emptiness value)
- Error — actionable message, not "An error occurred", with a retry affordance
- Success — status change confirmed visually (out of scope for F-001, read-only)

---

## ♿ Accessibility
WCAG AA contrast; visible focus rings; keyboard reachable; Radix ARIA preserved; content images get descriptive `alt`.

---

## 🚫 Anti-patterns (BOB never does)
- ❌ Inline `style={{}}` — Tailwind only
- ❌ Animation without a `motion_level` (fallback L0)
- ❌ Raw color literals outside the status map
- ❌ Hardcoded data inside components — always via props / `lib/feedback/queries.ts`
- ❌ More than one `Button variant="default"` per section
- ❌ Images without explicit dimensions
