# ⬡ PDS STACK V3 — ProductDesignerStack

Stack   →  Next.js · TypeScript strict · Tailwind · Shadcn/ui · Lucide React
Agents  →  RAY · BOB · ANALYZER · (EVE · SHIP if modules installed)
Design  →  Figma Desktop + figma-console-mcp · Bridge DS `/design-workflow`

> Stack constraints are defined in STACK.md — agents read it before every session.

---

## HARD CONSTRAINTS

→  No code without `statut: VALIDATED` in spec
→  No code without Quality Brief approval — BOB gate is non-negotiable
→  Scope frozen at VALIDATED — additions require new RAY cycle
→  `/components/ui/` is read-only. Shadcn owns it.
→  No UI lib outside `agent-system/context/design_guide.md` without Talent sign-off
→  TypeScript strict — zero `any`, zero `@ts-ignore`
→  Components cap at 150 lines — split if exceeded
→  Consult `agent-system/adr/ADR_INDEX.md` before any architecture or dependency decision

---

## AGENTS

/ray       →  RAY      challenges idea · writes spec (T1/T2/T3) · creates ADRs
                       reads: STACK.md · client_vision · roadmap · ADR_INDEX · last 3 learnings
                       spec: numbered tasks · `## OUT OF SCOPE` block · `statut: VALIDATED`
                       scope frozen at VALIDATED — additions require new RAY cycle

/bob       →  BOB      Quality Brief (gate) · implements · commits
                       reads: spec · STACK.md · design_guide · ADR_INDEX
                       one feature per session — reset context before starting next
                       commit after each task — `feat(N): task-title`
                       no code before Quality Brief explicit approval

/analyzer  →  ANALYZER scores /20 · verdict · writes learnings
                       18–20: SHIPPED · 14–17: SHIPPED WITH NOTES · 10–13: REWORK → BOB · <10: RE-SPEC → RAY

/eve       →  EVE      discovery · problem validation · pre-fills PROJECT_BRIEF §1–§2
                       use when: problem unclear before briefing · optional · not a gate

/ship      →  SHIP     delivery · release notes · KPI reminders
                       requires: ANALYZER verdict ≥ 14 · optional module

/design-workflow → Bridge DS · generates Figma frame from RAY spec *(optional)*
