---
feature_id: F-001a
feature_name: Agents isolés — 4 fichiers `.claude/agents/` + `tools:` + spawn
tier: T2
status: VALIDATED
date: 2026-08-29
motion_level: L0
---

## Context

JTBD P1 : *« quand une feature est finie, je veux un jugement qui ne soit pas le mien, pour attraper
ce que j'ai auto-validé sans le voir. »* Aujourd'hui ANALYZER lit le raisonnement de BOB dans la même
conversation — il juge son propre travail avec un autre chapeau. C'est le dernier gate de la stack
qui tient par convention et non par architecture (ADR-008, ACCEPTED, Option A).

F-001a rend l'isolation **architecturale** sur Claude Code : contexte séparé, outils restreints.
Elle ne touche ni les prompts canoniques (D3) ni les 4 autres surfaces (D4).

## User stories

**Story 1 — ANALYZER juge un travail extérieur :**
```gherkin
Given une feature vient d'être implémentée par bob-build
When Le Talent lance /analyzer sur cette feature
Then ANALYZER s'exécute dans un contexte qui ne contient pas le raisonnement de bob-build
  And son verdict est produit à partir de la spec et du code livré uniquement
```

**Story 2 — le brief ne peut pas coder :**
```gherkin
Given une spec porte status: VALIDATED
When Le Talent lance /bob sur cette spec
Then bob-brief produit le Quality Brief sans disposer d'Edit ni de Bash
  And la main revient à la conversation principale, bob-build n'étant pas encore spawné
```

## Acceptance criteria

| ID | Criterion | Notes |
|---|---|---|
| CA-1 | `.claude/agents/` contient exactement 4 fichiers : `ray.md`, `bob-brief.md`, `bob-build.md`, `analyzer.md` | pas de `pds.md` — D1 |
| CA-2 | Chaque fichier fait ≤ 15 lignes hors frontmatter et cite le chemin de son prompt canonique dans `agent-system/agents/` | D3 — loader, pas copie |
| CA-3 | Les 6 fichiers `agent-system/agents/*.md` ont un sha256 identique avant et après la feature | D3 — les prompts ne bougent pas |
| CA-4 | Le `tools:` de chaque agent est explicite et conforme au tableau ci-dessous — jamais `*`, jamais absent | le gate est le `tools:` |
| CA-5 | `bob-build.md` énonce que le Quality Brief lui est fourni **en entrée** : il ne le produit ni ne l'approuve | sinon bob-build rejoue §2 et s'auto-valide |
| CA-6 | `/bob <spec>` spawn `bob-brief` puis rend la main ; `/bob --build <spec>` spawn `bob-build` | câblage minimal — le protocole est F-001b |
| CA-7 | `/ray` et `/analyzer` spawnent leur agent au lieu de charger le prompt dans la conversation | D4 |
| CA-8 | Les 4 fichiers sont packagés dans `templates/core/tools/claude/.claude/agents/`, byte-identiques au repo | sinon l'install ne les livre pas |
| CA-9 | `MIRRORED` de `check-parity.js` contient la paire `templates/core/tools/claude/.claude/agents` ↔ `.claude/agents` | corrige D3, factuellement faux aujourd'hui |
| CA-10 | `gateFiles()` de `check-parity.js` inclut `.claude/agents/` | `tools:` définit un gate → il doit périmer la baseline pulse |
| CA-11 | `node pds-stack-cli/bin/check-parity.js` sort avec le code 0 | |
| CA-12 | `.cursor/`, `.gemini/`, `.github/prompts/`, `.agents/` ont un sha256 identique avant et après | D4 — aucune régression sur les 4 autres surfaces |

### Tableau `tools:` (référence de CA-4)

| Agent | `tools:` | Pourquoi |
|---|---|---|
| `ray` | Read, Glob, Grep, Write | écrit specs et ADRs, jamais de code |
| `bob-brief` | Read, Glob, Grep, Write | produit un document ; sans Edit ni Bash il ne **peut** pas coder — D2 |
| `bob-build` | Read, Glob, Grep, Write, Edit, Bash | implémente, prouve, commite |
| `analyzer` | Read, Glob, Grep, Write, Bash | rejoue les assertions, écrit le learning, ne modifie pas le code |

## OUT OF SCOPE

- Le protocole de checkpoint agent↔humain — formulation du gate, reprise, itérations, cas d'échec → **F-001b**
- `quality_brief_type` découpé en skills (`aesthetic` extrait, `architecture` implémenté) → **F-001c**
- `hooks: PostToolUse` pour restreindre des **chemins** et non des types d'outils → LATER roadmap
- Porter l'isolation sur Cursor / Gemini CLI / Copilot / Codex — aucun équivalent natif, OUT OF SCOPE roadmap
- Ajouter `.claude/skills/` à `MIRRORED` — même classe de trou, mais hors périmètre : à traiter séparément
- Modifier le Ralph Loop, les conventions de commit, ou les prompts canoniques

## Dependencies

- **ADR-008** — ACCEPTED le 2026-08-29, Option A. Fixe D1→D5 et le découpage.
- **Bloque F-001b et F-001c** — les deux partent des fichiers créés ici.
- `modules.epic` reste `false` dans `STACK.md`.

## Notes BOB

- Aucune surface visuelle : `quality_brief_type` effectif = `architecture`, pas `aesthetic`.
  Le type `architecture` n'a pas encore de protocole (c'est précisément F-001c) — le brief porte donc
  sur la découpe des 4 loaders et la frontière `tools:`, pas sur une direction esthétique.
- `motion_level: L0` — pas de code UI dans cette feature.
- **Preuve (§3b)** : CA-1 à CA-4 et CA-8 à CA-12 sont décidables par machine. Les assertions vont dans
  `check-parity.js`, pas dans un nouveau script — les runs 1→5 ont montré que les pires défauts
  naissent de règles éparpillées entre fichiers. CA-5 à CA-7 sont décidables par lecture : une
  assertion de présence sur la phrase-clé du loader, pas sur son intention.
- CA-3 et CA-12 se prouvent par un snapshot sha256 pris avant la première modification.
- Après la feature : `node bin/check-parity.js --accept-pulse` **ne doit pas** être lancé par BOB.
  La baseline se rafraîchit après un run pulse, pas après un build (c'est F-003).
