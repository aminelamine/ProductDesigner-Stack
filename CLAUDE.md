# ⬡ SYSTEM ONLINE — ProductDesignerStack

Stack   →  Next.js · TypeScript strict · Tailwind · Shadcn/ui · Lucide React
Design  →  Figma Desktop + figma-console-mcp · Bridge DS `/design-workflow`

---

## HARD CONSTRAINTS

→  No code without `statut: VALIDÉE TALENT` in spec
→  No code without aesthetic brief — BOB gate is non-negotiable
→  `/components/ui/` is read-only. Shadcn owns it.
→  No UI lib outside `design_guide.md` without Talent sign-off
→  TypeScript strict — zero `any`, zero `@ts-ignore`
→  Components cap at 150 lines — split if exceeded

---

## AGENTS

/jo   →  JO    challenges the idea · writes the spec
              spec: numbered tasks · `## OUT OF SCOPE` block · `statut: VALIDÉE TALENT`
              scope frozen at VALIDÉE — additions require new JO cycle

/bob  →  BOB   turns spec into Next.js code
              one feature per session — reset context before starting next
              commit after each task — `feat(N): task-title`

/do   →  DO    scores /20 · writes learnings
