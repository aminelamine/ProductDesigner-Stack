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

> **Source unique** : ce fichier est un loader. Le flux complet vit dans
> `agent-system/orchestration/pds_conductor.md` (partagé avec les autres outils — Cursor,
> VS Code, Gemini CLI, Codex CLI).

Charge et applique **intégralement** `agent-system/orchestration/pds_conductor.md`, qui renvoie
lui-même à `agent-system/orchestration/flow.md` pour le détail des steps.
