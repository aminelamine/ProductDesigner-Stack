# /analyzer — ANALYZER, Product QA & CX

> Canonical command.
> **Single source**: this file is a trigger. The role lives in the agent, and the agent loads
> `agent-system/agents/ANALYZER_system_prompt.md`.

Spawn the **`analyzer`** agent (`.claude/agents/analyzer.md`) with the request below. Do **not**
load the system prompt into this conversation.

Its isolated context is the point: ANALYZER must see the delivered spec, brief and code — never
BOB's reasoning. Pass it paths and the feature ID, not a summary of how the work went.

Relay its `[ANALYZER]` verdict as is. The score gate is unchanged: only 18/20 and above is
committed.

$ARGUMENTS
