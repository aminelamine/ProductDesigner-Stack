# Pulse — the stack's own regression suite

This is not a feature. It is **PDS Stack tested on itself**: one throwaway product ("Pulse", a
feedback inbox) driven end-to-end through every active gate, in an isolated sandbox, with every
agent signal transcribed verbatim.

It exists because the gates are reasoning-based. A prompt change that quietly weakens a gate
produces no compile error and no failing test — the only way to notice is to run the whole cycle
again and compare. This directory is that comparison point.

| | |
|---|---|
| Last run | **2026-08-28** (run 4) · stack v3.3.0 · focused confirmation |
| Result | **~92/100** across 9 axes · run 3's six findings closed except one, by design |
| Runs | 1 · nominal · 2 · reject loop · 3 · the mechanisms never measured · 4 · confirmation |

Run 3 is the one to read first. It targeted `/pds`, the aesthetic gate as a *shipped* file, the
git guardrails and the §3b proof rule — none of which existed when runs 1 and 2 scored ~91.
Three axes went up; the total fell, because two rules had shipped without ever being executed.
See `RUN_LOG_F003.md` and `RUN_003_FINDINGS.md`.

## What's in here

```
config/          the sandbox's STACK.md + the 3 context files (inputs)
agent-system/    what the agents produced — specs, checkpoints, learnings
src/             the code BOB wrote
RUN_LOG.md       F-001 transcript — every gate signal, in its real format
RUN_LOG_F002.md  F-002 transcript — the reject loop
SCORING.md       the analysis: what fired, what created value, where the friction is
baseline.json    hashes of the files whose behavior this run validated
```

`SCORING.md` is the document that matters. It is also where the stack's known limits are recorded
honestly — including the two that produced the guardrails and the proof rule.

## When to re-run it

**Whenever you change what a gate does.** Concretely: any edit to an agent system prompt, to the
Quality Brief gate, to the conductor flow, or to the git hooks. `baseline.json` records the hashes
of exactly those files, and `npm run check:parity` in `pds-stack-cli/` warns when they have moved:

```
⚠ 2 gate file(s) changed since the last pulse run (2026-08-20) — benchmark is stale
```

It warns rather than fails: a pulse run needs an agent driving a full feature cycle, which no CI
job can do for you. The warning tells you the benchmark no longer describes the current stack.

## How to re-run it

1. Create an empty sandbox outside this repo. Copy `config/` into it as `STACK.md` +
   `agent-system/context/`, and install the stack: `npx pds-stack install`.
2. Drive one T2 feature end to end — `/pds "a feedback inbox that…"` — and let every gate fire.
   Do not help the agents past a gate; the point is to see whether the gate holds on its own.
3. Then drive a second feature with a **deliberate, realistic** corner cut, so ANALYZER has
   something to reject. That exercises the REJECT → correction → re-eval loop, which a clean run
   never touches.
4. Transcribe both runs the way `RUN_LOG.md` does — the agent's real signals, not a summary.
5. Score the axes in `SCORING.md`, and write down what got *worse* as plainly as what got better.
   A run that only confirms the stack is fine has told you nothing.
6. Refresh the baseline: `node pds-stack-cli/bin/check-parity.js --accept-pulse`

## Reading the scores honestly

The axes are self-assessed. They are useful as a **delta** between runs, not as an absolute grade —
"E. Defect-catching power went 17 → 19 after run 2" is a real signal; "the stack is 91/100" is a
number about a sample of two features. Treat a drop on any axis as the finding, and the total as
a headline.
