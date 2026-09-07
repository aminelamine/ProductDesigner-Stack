# roadmap.md

## 📌 Méta

**Projet :** `PDS Stack`
**Version courante :** `3.4.0` (npm · repo · landing alignés)
**Dernière mise à jour :** `2026-09-07`

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
| F-001a | Les 4 agents isolés + `tools:` + slash-commands qui les spawnent (câblage minimal inclus) | `specs/active/feature_001a_agents_isoles.md` | `✅ DELIVERED 18/20` | RAY/BOB-brief/BOB-build/ANALYZER sont des `.claude/agents/`, coupés sur les gates, sans régression sur les 4 autres surfaces |
| F-001b | Protocole des checkpoints agent↔humain dans le flow du conducteur | `specs/active/feature_001b_checkpoints.md` | `[ ] débloquée — prioritaire` | aucun gate n'est franchi par un sous-agent — le checkpoint remonte toujours à `/pds` |
| F-001c | `quality_brief_type` en skills (`aesthetic` extrait, `architecture` implémenté) | `specs/active/feature_001c_brief_skills.md` | `[ ] débloquée` | 2 des 4 types déclarés dans `STACK.md` ont un protocole exécutable |

---

## 🟡 NEXT — Post-MVP

| # | Feature | Pourquoi | Déclencheur |
|---|---|---|---|
| F-002 | `quality_brief_type` : les 3 types manquants | `STACK.md` en déclare 4, un seul a un protocole | après F-001c — `aesthetic` et `architecture` livrés, les 2 restants suivent le même mécanisme |
| F-003 | Run pulse 6 | valider F-001 sous un vrai conflit spec/brief avec Step 2b actif | après F-001c |

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
- `2026-08-29` — ADR-008 ACCEPTED (Option A) : F-001 découpé en 3 T2 successifs — F-001a / F-001b / F-001c ; `modules.epic` reste `false`
- `2026-09-07` — F-001a livrée 18/20 (ANALYZER) : les 4 agents isolés portent leur `tools:`, les slash-commands les spawnent. F-001b devient prioritaire — `flow.md` STEP 3 ne nomme pas encore `/bob --build`
