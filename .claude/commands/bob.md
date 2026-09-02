# /bob — BOB, Builder & UI/UX Engineer

> Canonical command.
> **Single source**: this file is a trigger. The roles live in the two agents, and both load
> `agent-system/agents/BOB_system_prompt.md`.

BOB is split across two agents, and the cut runs exactly along the Quality Brief gate (ADR-008 D2).
Agents are cut **on** gates, never through them.

**`/bob <spec-path>`** → spawn the **`bob-brief`** agent (`.claude/agents/bob-brief.md`).
It holds neither `Edit` nor `Bash`, so it *cannot* write code. It writes the Quality Brief to
`agent-system/sessions/brief_feature_<ID>.md` and returns that path. Relay the brief here and wait
for Le Talent's explicit approval. Never approve it yourself.

**`/bob --build <spec-path>`** → spawn the **`bob-build`** agent (`.claude/agents/bob-build.md`),
passing it the path of the approved brief. Do not spawn it while no approved brief exists — that
gate is the entire reason the split exists.

$ARGUMENTS
