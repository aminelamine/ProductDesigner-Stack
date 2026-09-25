---
name: frontend-design
description: >
  Produces the aesthetic direction brief (gate ①) — 5 dimensions, read from the memory. Fires
  ONLY when a direction brief is being written (bob-brief, /bob --brief, DIRECTION phase) and none
  is approved yet. Never during a build or a prototype: the approved brief already carries the
  direction — re-loading this protocol there costs ~3k tokens for nothing.
---

> **Single source**: this file is a loader. The full protocol lives in
> `agent-system/agents/BOB_aesthetic_gate.md` (shared with the other tools — Cursor, VS Code,
> Gemini CLI, Codex CLI).

Load and apply, **in full**, `agent-system/agents/BOB_aesthetic_gate.md`.
