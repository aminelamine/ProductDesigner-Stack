# ⬡ PDS STACK V5 — ProductDesignerStack

> Gemini CLI loads this file by default (not `CLAUDE.md`). Same agent registry and hard
> constraints — source of truth: [CLAUDE.md](CLAUDE.md).

Stack   →  Next.js · TypeScript strict · Tailwind · Shadcn/ui · Lucide React
Cycle   →  DIRECTION → CADRE → PRODUIRE → JUGER + MÉMORISER
Agents  →  BOB (direction) · RAY (cadre) · ANALYZER (verdicts) · BOB (build)

> **Start a feature with `/pds`** — it asks the lane, then drives the whole cycle.

---

## HARD CONSTRAINTS

→  Nothing is produced before a direction is approved — gate ①, never crossed by an agent
→  `memory/identity.md` is read first — anything touching the foundation is refused in advance
→  A direction marked `refusée` in `memory/directions/` is a constraint, not a suggestion
→  The scope is written **after** the direction and against it — `## HORS SCOPE` block required
→  Conformance (/20) and direction (binary) are never averaged — the designer alone renders the second
→  Every delivery writes its direction to `memory/`, retained **or** refused, then `npm run memory:index`
→  Hard budget: 3 human gates, ~12 steps in Standard — a rule that does not fit is cut, not documented

### Code module

→  `/components/ui/` is read-only. Shadcn owns it.
→  No UI lib outside `agent-system/context/design_guide.md` without Talent sign-off
→  TypeScript strict — zero `any`, zero `@ts-ignore`
→  Components cap at 150 lines — split if exceeded
→  Consult `agent-system/adr/ADR_INDEX.md` before any architecture or dependency decision
→  No code without `statut: VALIDATED` in the spec — scope frozen at gate ②
→  Git guardrails: a commit touching product code needs `Ref: feature_<id>` and a VALIDATED spec


---

## AGENTS

/pds       →  CONDUCTOR  the entry point — asks the lane first (Sketch by default), then drives
                       DIRECTION → CADRE → PRODUIRE → JUGER + MÉMORISER
                       reads: STACK.md (lane · modules · user_level) · `memory/identity.md`
                       never crosses a gate for you · never guesses the lane
                       flow: `agent-system/orchestration/flow.md` + `pds_conductor.md`

/bob --brief → BOB     the direction brief — from a brief or a reference, 5 dimensions, **gate ①**
                       reads: identity · directions/INDEX · design-system/registries · references
                       registries filled → conforms · registries empty → proposes, and says so
                       nothing is produced before this brief is explicitly approved

/ray       →  RAY      the scope, written against the direction — **gate ②** *(Standard · System)*
                       spec: numbered tasks · `## HORS SCOPE` block · `statut: VALIDATED`
                       does not exist in Sketch — no spec file, no score, no written decision

/bob --proto → BOB     first output, every lane — an interactive HTML prototype of the approved
                       direction · one file, no spec, no build · Sketch stops here

/design-workflow → BRIDGE DS  Standard · System — the Figma frame, built from the prototype
                       repeated patterns become components · then HANDOFF: a11y + interaction specs

/bob --build → BOB     optional output — implements the frozen spec, runs the assertions
                       commit after each task — `feat(N): task-title`

/analyzer  →  ANALYZER **gate ③** — two verdicts, never averaged
                       conformance: /20, computed by the system, mechanical
                       direction: binary — `retenue` / `refusée`, the designer alone
                       writes `memory/directions/NNN` + the learning (DESIGN half first)
                       short conformance → back to PRODUIRE · refused direction → back to DIRECTION

Full agent definitions: `agent-system/agents/*_system_prompt.md`.
