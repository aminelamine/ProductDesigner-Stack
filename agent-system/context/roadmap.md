# roadmap.md

## 📌 Méta

**Projet :** `PDS Stack`
**Version courante :** `3.4.0` (npm · repo · landing alignés)
**Dernière mise à jour :** `2026-08-28`

---

## 🗺️ Vue d'ensemble — Phases

| Phase | État | Contenu |
|---|---|---|
| Distribution | ✅ livrée | 3.1 → 3.4 : parité repo/paquet, 5 passes de release, garde-fous git |
| Auto-test | ✅ livrée | `_stack-test-pulse/` — 5 runs, findings publiés, benchmark versionné |
| Architecture agents | 🔴 NOW | agents isolés, skills, checkpoints humains |

---

## 🔴 NOW — MVP Core

| # | Feature | Spec | Statut | Critère de done |
|---|---|---|---|---|
| F-001 | Agents isolés + skills + checkpoints | `specs/active/feature_001_agents_isoles.md` | `[ ] À spécer` | RAY/BOB/ANALYZER sont des `.claude/agents/`, coupés sur les gates, sans régression sur les 4 autres surfaces |

---

## 🟡 NEXT — Post-MVP

| # | Feature | Pourquoi | Déclencheur |
|---|---|---|---|
| F-002 | `quality_brief_type` : les 3 types manquants | `STACK.md` en déclare 4, un seul a un protocole | après F-001 — les types deviennent des skills |
| F-003 | Run pulse 6 | valider F-001 sous un vrai conflit spec/brief avec Step 2b actif | après F-001 |

---

## 🔵 LATER — Idées non priorisées

- `ui-ux-pro-max` branché comme skill appelée par BOB, plutôt que catalogue statique
- Protocole redesign (audit d'un site existant) — nouveau mode d'entrée, à re-challenger
- Enforcement par `hooks: PostToolUse` dans le frontmatter agent (chemins, pas types d'outils)

---

## ❌ OUT OF SCOPE (décisions actées)

- Installer `taste-skill` — deux gates concurrents, scope incompatible, contredit ADR-007
- Réécrire les prompts canoniques pour l'architecture agents — ils ne bougent pas
- Éclater le Ralph Loop ou les conventions de commit en skills
- Porter l'isolation sur Cursor / Gemini / Copilot / Codex — pas d'équivalent natif

---

## 📊 KPIs Produit

| KPI | Baseline | Cible |
|---|---|---|
| Passes de parité vertes à la publication | 5/5 | 5/5, sans exception |
| Score pulse | ~89/100 (run 5) | mesuré à chaque changement de gate, pas maximisé |
| Références mortes sur une install npm | 0 / 72 | 0 |

---

## 🗓️ Changelog Roadmap

- `2026-08-28` — phase Distribution et phase Auto-test closes ; ouverture de la phase Architecture agents
