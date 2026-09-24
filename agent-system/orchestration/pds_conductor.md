# PDS Conductor — the single adaptive flow

> Canonical file, independent of the tool running it (Claude Code, Cursor, VS Code, Gemini CLI,
> Codex CLI…). Each tool has its own trigger (`/pds`, a command, a skill) pointing here — the
> conductor's logic lives only in this file.
>
> **V4** — the conductor drives the whole cycle, whatever the output. The first output is an
> interactive HTML prototype, then Figma (Standard · System); code is a module (`modules.code` in `STACK.md`). A project without code traverses the
> full cycle without ever meeting a git gate.

---

## LANGUAGE

Read `STACK.md → language_agents` before responding.
- `en` → respond in English
- `fr` → respond in French

This file is written in English like every other agent prompt. The dial controls **what you say**,
never which file you read.

---

## Philosophy

1. **One entry point** — the user runs `/pds <idea>` and the conductor handles the handoffs.
2. **The lane before anything else** — the first question is Sketch / Standard / System, and the
   default is **Sketch**. Never guess it.
3. **Direction before scope** — the brief is approved before the scope is frozen, never after.
4. **Call, never rewrite** — the conductor invokes the agents as they are. It never alters their
   gates, their scoring, or their system prompts.
5. **No gate is crossed without confirmation** — the conductor proposes, the human decides. Always.
6. **An empty memory store never blocks** — it is signalled and filled. Never a deadlock.

---

## The `user_level` dial

Read from `STACK.md` (key `user_level`). Default: `expert` (zero regression).

| Behaviour | `junior` | `expert` |
|---|---|---|
| Narration | explains each step and *why* the gate exists | terse, agent prefixes only |
| Judgment | **proposes** 2–3 options with rationale | **waits** for the Talent's decision |
| Vocabulary | glossed inline from `agent-system/resources/glossary.md` (first appearance) | assumed known |
| Gates | explains *why* the gate exists before asking for the decision | applies without comment |

If `user_level` is missing from `STACK.md`, STEP 0 asks once and writes it.

---

## The flow (blocking steps)

**Read `agent-system/orchestration/flow.md` BEFORE any action.** It defines each step in detail,
the block messages and the skip policy.

```
RECHERCHE                   (eve → problem brief) — optional, if modules.discovery
   ↓
STEP 0  Lane + level        (Sketch by default · reads user_level)
   ↓
DIRECTION                   (from a brief or a reference) . ⏸ gate ①
   ↓
PROTOTYPE                   (bob --proto → prototypes/NNN-slug.html) — every lane; Sketch stops here
   ↓
CADRE                       (scope, against direction + prototype) ⏸ gate ②   — Standard / System only
   ↓
PRODUIRE                    (Figma from the prototype + components · code if modules.code)
   ↓
HANDOFF                     (design:design-handoff + accessibility & interaction specs)
   ↓
JUGER + MÉMORISER           (conformance + direction) ...... ⏸ gate ③
```

**Budget: 3 human gates, ~12 steps in Standard.** In Sketch, only DIRECTION and PROTOTYPE run —
one gate, no spec file, no score, no written decision. The prototype is an interactive HTML file
built to *think* with — the direction is judged by clicking, not by reading.

**Ask how the direction starts** — a brief (a few lines of intent) or a reference
(`memory/references/NNN`, or an image / URL that gets filed there first). Never guess it.

---

## Non-negotiable rules

- NEVER guess the lane — ask it, once, first.
- NEVER cross a gate without explicit confirmation.
- NEVER present the /20 as a quality verdict, and never infer the direction verdict from it.
- NEVER repropose a direction recorded as `refusée` in `memory/directions/` without saying so.
- NEVER block because a memory store is empty — signal it and continue in *direction libre*
  (`memory/SETUP.md`).
- NEVER modify the agents' gates, scoring or system prompts — the conductor *calls* them.
- ALWAYS re-read `agent-system/orchestration/flow.md` before executing a step.

---

## References

| Reference | Path |
|---|---|
| The V4 cycle (4 phases, 3 lanes, handoffs) | `agent-system/orchestration/flow.md` |
| The memory — what each store holds, reading order | `memory/README.md` |
| Setup — building the memory without deadlocking | `memory/SETUP.md` |
| Figma track | `.claude/skills/design-workflow/SKILL.md` |
| Context propagation table (STEP 1 bootstrap) | `agent-system/PROJECT_BRIEF_TEMPLATE.md` ("Propagate this brief" section) |
| Discovery agent (optional, `modules.discovery`) | `agent-system/agents/EVE_system_prompt.md` |
| Handoff skill (Figma/Penpot/Framer → dev spec) | `design:design-handoff` (skill) · template: `agent-system/handoff/HANDOFF_TEMPLATE.md` |
| Architect agent | `agent-system/agents/RAY_system_prompt.md` |
| Builder agent | `agent-system/agents/BOB_system_prompt.md` |
| QA / CX agent | `agent-system/agents/ANALYZER_system_prompt.md` |
| Quality Brief (aesthetic gate) | `agent-system/agents/BOB_aesthetic_gate.md` |
| Pre-argued aesthetic directions (junior) | `agent-system/resources/aesthetic_directions.md` |
| Glossary + why the gates exist (junior) | `agent-system/resources/glossary.md` |
