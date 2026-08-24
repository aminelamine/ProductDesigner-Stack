---
name: pds-conductor
description: >
  Conducteur adaptatif du track code PDS (RAY → BOB → ANALYZER). Point d'entrée unique qui déroule
  tout le cycle d'une feature — idée → spec → build → review — sans que l'utilisateur ait à
  connaître la séquence de slash-commands ni le rituel VALIDÉE TALENT. S'adapte au niveau de
  l'utilisateur (junior : pédagogique + jugement proposé ; expert : terse). Bootstrappe les 3
  fichiers de contexte s'ils sont vides. Utilise ce skill quand l'utilisateur veut « lancer une
  feature », « démarrer », « construire quelque chose », dit « /pds », « je veux faire X », ou
  ne sait pas par quelle commande commencer sur le track code (pas Figma — ça, c'est design-workflow).
---

# PDS Conductor — le flux unique adaptatif

> L'orchestrateur qui manque au track code. Le track Figma a déjà `design-workflow` ;
> celui-ci fait la même chose pour le pipeline **RAY → BOB → ANALYZER**.
> **Toute sortie dans la langue de l'utilisateur** (défaut : suit `language_agents` de `STACK.md`).

---

## Philosophie

1. **Un seul point d'entrée** — l'utilisateur lance `/pds <idée>` et le conducteur s'occupe des handoffs.
2. **Un seul dial** — `user_level` (`junior | expert`) dans `STACK.md` pilote tout le comportement adaptatif.
3. **Appeler, ne pas réécrire** — le conducteur invoque `/ray`, `/bob`, `/analyzer` tels quels. Il n'altère
   jamais les gates, le scoring, ni les system-prompts.
4. **Aucun gate franchi sans confirmation** — le conducteur propose, l'humain décide. Toujours.
5. **Le contexte d'abord** — pas de spec sur des fichiers de contexte vides.

---

## Le dial `user_level`

Lu depuis `STACK.md` (clé `user_level`). Défaut : `expert` (zéro régression).

| Comportement | `junior` | `expert` |
|---|---|---|
| Narration | explique chaque étape + *pourquoi* ce gate | terse, préfixes agents seuls |
| Jugement | **propose** 2-3 options avec rationale | **attend** la décision du Talent |
| Vocabulaire | glossé inline via `agent-system/resources/glossary.md` (1ère apparition) | supposé connu |
| Gates | explique *pourquoi* le gate existe (voir glossary.md) avant de demander la décision | applique sans commenter |

Si `user_level` est absent de `STACK.md` → STEP 0 le demande une fois et l'écrit.

---

## Le flux (steps bloquants)

**Lis `references/flow.md` AVANT toute action.** Il définit le détail de chaque step, les
block-messages et la skip policy — sur le modèle de `design-workflow/references/onboarding.md`.

```
STEP 0  Niveau + setup check
   ↓
STEP 1  Bootstrap contexte   (si client_vision / roadmap / design_guide contiennent [À COMPLÉTER])
   ↓
STEP 2  Idée → Spec          (invoque /ray · gère le rituel VALIDÉE TALENT)
   ↓
STEP 3  Spec → Build         (invoque /bob · Brief Esthétique)
   ↓
STEP 4  Build → Review       (invoque /analyzer · gate de score /20)
```

---

## Règles non négociables

- NE JAMAIS sauter STEP 1 si un fichier de contexte contient encore `[À COMPLÉTER]` / `[Fill…]`.
- NE JAMAIS franchir un gate (`VALIDÉE TALENT`, Quality Brief, commit ANALYZER) sans confirmation explicite.
- NE JAMAIS modifier les gates, le scoring, ou les system-prompts des agents — le conducteur les *appelle*.
- TOUJOURS relire `references/flow.md` avant d'exécuter un step.
- Ce skill couvre le **track code** uniquement. Pour designer dans Figma → `design-workflow`.

---

## Références

| Référence | Path |
|---|---|
| Flux détaillé (steps, block-messages, skip policy) | `references/flow.md` |
| Table de propagation contexte (bootstrap STEP 1) | `../../../agent-system/PROJECT_BRIEF_TEMPLATE.md` (section « Propager ce brief ») |
| Agent architecte | `.claude/commands/ray.md` |
| Agent builder | `.claude/commands/bob.md` |
| Agent QA/CX | `.claude/commands/analyzer.md` |
| Quality Brief (Brief Esthétique) | `.claude/skills/frontend-design/SKILL.md` |
| Directions esthétiques pré-argumentées (junior) | `../../../agent-system/resources/aesthetic_directions.md` |
| Glossaire + pourquoi des gates (junior) | `../../../agent-system/resources/glossary.md` |
