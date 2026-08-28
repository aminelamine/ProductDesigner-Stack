---
name: pds-conductor
description: >
  Adaptive conductor for the PDS code track (RAY -> BOB -> ANALYZER). The single entry point that
  runs a feature's full cycle — idea, spec, build, review — without the user needing to know the
  slash-command sequence or the validation ritual. Adapts to the user's level (junior: pedagogical
  with proposed judgment; expert: terse). Bootstraps the 3 context files when they are empty. Use
  this skill when the user wants to "start a feature", "build something", says "/pds" or "I want to
  do X", or does not know which command starts the code track (not Figma — that is design-workflow).
---

> **Single source**: this file is a loader. The full flow lives in
> `agent-system/orchestration/pds_conductor.md` (partagé avec les autres outils — Claude Code,
> Cursor, VS Code, Gemini CLI).

Load and apply, **in full**, `agent-system/orchestration/pds_conductor.md`, qui renvoie
lui-même à `agent-system/orchestration/flow.md` pour le détail des steps. Lis aussi `CLAUDE.md`
pour le agent registry and the hard constraints — Codex natively reads only `AGENTS.md`, not
`CLAUDE.md`.
