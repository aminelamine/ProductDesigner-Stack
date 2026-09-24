---
name: pds-conductor
description: >
  Adaptive conductor for the PDS cycle (direction -> scope -> production -> judgment). The single
  entry point that runs a feature end to end, asking the lane first (Sketch by default) and never
  crossing a gate for the user. Adapts to the user's level (junior: pedagogical with proposed
  judgment; expert: terse). Bootstraps the memory stores when they are empty. Use this skill when
  the user wants to "start a feature", "design something", "build something", says "/pds" or "I
  want to do X". Direction from a brief or a reference, then an interactive HTML prototype, then
  Figma + components + accessibility/interaction specs; code runs only with modules.code: true.
---

> **Single source**: this file is a loader. The full flow lives in
> `agent-system/orchestration/pds_conductor.md` (partagé avec les autres outils — Cursor,
> VS Code, Gemini CLI, Codex CLI).

Load and apply, **in full**, `agent-system/orchestration/pds_conductor.md`, qui renvoie
lui-même à `agent-system/orchestration/flow.md` pour le détail des steps.
