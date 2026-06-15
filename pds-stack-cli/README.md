# PDS Stack

**The design-first AI workflow for Product Designers who ship.**

Every other AI development framework treats design as a downstream artifact.
You write code. Then you check if it looks right.

PDS Stack inverts this.

**The designer's creative judgment is the system's quality gate — not one input among many.**

---

## Quick start

```bash
npx pds-stack install
```

Answer 7 questions. Get a complete agent system in under 5 minutes.

---

## What you get

- **RAY** — challenges your idea, tiers the spec (T1/T2/T3), creates ADRs
- **BOB** — generates a Quality Brief before writing any code, implements via Ralph Loop, commits atomically
- **ANALYZER** — scores /20 across 4 dimensions, writes cumulative learnings, enforces the release gate
- **STACK.md** — your stack config, read by all agents
- **CLAUDE.md** — agent registry, auto-generated from your answers
- **PROJECT_BRIEF_TEMPLATE** — tiered (15/45/90 min) to fit your project depth

Optional modules:
- **EVE** — discovery agent for validating problems before writing a brief
- **SHIP** — delivery agent for release notes and KPI tracking
- **design** — extended motion system (L0→L3) and Figma bridge
- **epic** — epic template for T3 multi-story specs

---

## The Quality Brief — what makes this different

Before BOB writes a single line of code, it generates a Quality Brief:

```
[BOB] ⏸ Quality Brief — Feature F-001

Type: aesthetic
Direction: Minimal editorial card that communicates hierarchy through spacing, not decoration.
The 3 words: Quiet · Deliberate · Grounded
Typography: IBM Plex Mono for data, 14px base, no decorative fonts
Palette: Background only + accent-foreground for actions, no surface color
Constraints: No gradients. No rounded corners beyond 4px. No animation on data fields.
Reference: Linear issue card (density without noise) · Vercel dashboard (precision spacing)

Awaiting validation. No code before explicit approval.
```

This is not a formality. It is an architectural constraint the entire system enforces.

---

## The /20 scoring system

ANALYZER scores every feature across 4 dimensions:

| Dimension | Score |
|---|---|
| Spec Conformance | /5 |
| UX & Design System | /5 |
| Technical Quality & Security | /5 |
| CX / User Perspective | /5 |

- **18–20** → SHIPPED
- **14–17** → SHIPPED WITH NOTES
- **10–13** → REJECTED → BOB reworks
- **< 10** → CRITICAL REJECTION → RAY re-specs

ANALYZER writes a learnings file after every verdict. RAY reads them before every spec.
The system improves with use.

---

## The four-phase cycle

```
DISCOVERY (optional)   PLAN            BUILD              REVIEW
────────────────────   ─────────────   ────────────────   ──────────────
/eve                   /ray            /bob               /analyzer
Problem Brief →        Spec (T1/T2/T3) Quality Brief →    Score /20 →
Problem valid?         VALIDATED?      Ralph Loop (6)     SHIPPED or REWORK
                       ADRs if needed  Commit after each
```

---

## Framework support

PDS Stack works with any framework. At install, you specify your stack. Agents adapt.

| Framework | Language | UI lib |
|---|---|---|
| Next.js, Nuxt, SvelteKit, Astro, Remix | TypeScript, JavaScript, Python | Shadcn/ui, Radix, Tailwind only, None |

The Quality Brief gate is identical regardless of stack.

---

## Comparison

| Framework | Design role | Gate mechanism | Learning loop |
|---|---|---|---|
| GStack | None | None | `/retro` (velocity) |
| GSD | Implicit | None | None |
| BMAD | UX spec writer | None | None |
| **PDS Stack** | **Quality Brief is the gate** | **Mandatory before all code** | **Score /20 + cumulative learnings** |

---

## Installation

```bash
# Requires Node.js 18+
npx pds-stack install
```

Or install globally:

```bash
npm install -g pds-stack
pds-stack install
```

---

## License

MIT · [github.com/aminelamine/ProductDesigner-Stack](https://github.com/aminelamine/ProductDesigner-Stack)
