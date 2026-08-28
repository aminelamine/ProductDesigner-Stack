# ⬡ PDS STACK V3 — ProductDesignerStack

> Gemini CLI charge ce fichier par défaut (pas `CLAUDE.md`). Il reprend le registre d'agents et
> les hard constraints de [CLAUDE.md](CLAUDE.md) — lis aussi `AGENTS.md` pour les contraintes de
> sprint en cours (versions d'outils, limites d'autonomie par agent, conventions de commit).

Stack   →  Next.js · TypeScript strict · Tailwind · Shadcn/ui · Lucide React
Agents  →  RAY · BOB · ANALYZER

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

/pds       →  CONDUCTEUR  point d'entrée adaptatif · orchestre `/ray` → `/bob` → `/analyzer`
                       lit `STACK.md` (`user_level`) · bootstrappe les 3 fichiers de contexte

/ray       →  RAY      challenge l'idée · écrit la spec (T1/T2/T3) · crée des ADRs
                       lit : `STACK.md` · `client_vision` · `roadmap` · `ADR_INDEX` · 3 derniers learnings
                       spec : tâches numérotées · bloc `## OUT OF SCOPE` · `statut: VALIDATED`
                       scope gelé à VALIDATED — tout ajout = nouveau cycle RAY

/bob       →  BOB      Quality Brief (gate) · implémente · commit
                       lit : spec · `STACK.md` · `design_guide` · `ADR_INDEX`
                       une feature par session — reset du contexte avant la suivante
                       commit après chaque tâche — `feat(N): task-title`
                       aucun code avant approbation explicite du Quality Brief

/analyzer  →  ANALYZER score /20 · verdict · écrit les learnings
                       18–20 : SHIPPED · 14–17 : SHIPPED WITH NOTES · 10–13 : REWORK → BOB · <10 : RE-SPEC → RAY

Détails complets de chaque agent : `agent-system/agents/*_system_prompt.md`.
Flux du conducteur : `agent-system/orchestration/pds_conductor.md` + `flow.md`.
