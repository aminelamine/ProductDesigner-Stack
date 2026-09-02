---
feature_id: F-001a
feature_name: Agents isolés — 4 fichiers `.claude/agents/` + `tools:` + spawn
date: 2026-08-29
---

## Ralph Loop Status

> Feature sans surface visuelle. Les steps 4 et 5 sont remappés — `UI` → `Packaging`,
> `States` → `Assertions`. Le remapping est annoncé, pas masqué.

| Step | Status | Notes |
|---|---|---|
| 1 — Structure  | ✅ | `.claude/agents/` + les 4 loaders |
| 2 — Scaffold   | ✅ | `tools:` conformes au tableau de la spec — replié dans le step 1 |
| 3 — Core logic | ⏳ | câblage des slash-commands (spawn) |
| 4 — Packaging  | ⏳ | `templates/core/tools/claude/.claude/agents/` |
| 5 — Assertions | ⏳ | `checkAgents()` dans `check-parity.js` |
| 6 — Polish     | ⏳ | run complet, re-vérification snapshots CA-3 / CA-12 |

## Last completed step
Step 2/6 — Scaffold — les 4 loaders sont complets (12 à 15 lignes hors frontmatter, cap 15)

## Notable implementation choices
- Steps 1 et 2 commités ensemble : le frontmatter `tools:` **est** le fichier. Les séparer
  aurait produit deux commits dont le premier ne compile aucune intention.
- Aucun `skills:` dans les frontmatter — c'est F-001c, pas F-001a. Le champ n'est pas déclaré
  tant qu'il n'a rien à porter.
- `analyzer` reçoit `Bash` (rejouer les assertions + le commit qu'un verdict ≥ 18 autorise) mais
  pas `Edit` : il juge, il ne répare pas.

## Snapshot pré-modification (CA-3 / CA-12)
```
agent-system/agents/  ANALYZER a47e577d… · BOB_aesthetic 71821ce7… · BOB 214deadd…
                      EVE afc1de24… · RAY 5c492eeb… · SHIP 7663cba6…
.cursor 263156d86a2e5200 · .gemini 254811a42fe17f37
.github/prompts 03f71cc0daa80a65 · .agents 80c0bcda1d652aed
```

## Active blockers
- Aucun
