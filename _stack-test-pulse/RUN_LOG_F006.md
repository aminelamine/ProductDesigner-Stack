# RUN LOG — Pulse run 6 · the V5 stack, one phase per session
> 2026-09-26 → 27 · pds-stack **4.0.0 (V5)** · modules core + code · `user_level: expert` · `output: short` · guardrails on
> Target: the 9 axes, plus what V5 changed — model / effort / `maxTurns` per agent, a fresh `bob-build`
> per round, the hook that blocks image reads, impeccable, Playwright CLI verification, `npm run tokens`.
> Sandbox: `~/pds-pulse-run6`, outside the repo. Empty TS project + git, install from the local
> templates (answers injected into `install.js`), `config/` context files laid over it.

---

## 0 · Harness

Each phase ran as its own headless session: `claude -p … --model opus --effort medium
--setting-sources project,local --strict-mcp-config`, resumed with `-r` only to answer the gate the
session had stopped on. No MCP server was loaded, so no Figma. The Talent (the operator) answered the
gates in one line each and never told an agent how to pass one.

Deviations from the protocol, all on the harness side:
- `config/STACK.md` is a V3 file (`design: true`, no `modules.code`, no `output`). The installer's
  V5 STACK.md was kept, with the same values; the V3-only keys are gone.
- `npm run tokens` is not shipped (F13). The sandbox's `package.json` points `tokens` at the repo's
  `scripts/token-report.mjs` to measure anyway. `memory:index` was deliberately **not** added.
- The first headless session failed on an expired OAuth; the Talent re-logged in. A spend limit cut
  the run between F-002's build and its judgment (session 9 ran the next morning).
- The corner cut for F-002 was injected by the operator after BOB delivered, as a hurried
  "polish" commit — the way run 2 did it.

## 1 · Install

8 steps green. Then, before any session:

**F13** — the installed product has no `memory/` (`identity.md`, `directions/INDEX.md`, `SETUP.md`),
no `LEARNING_TEMPLATE.md`, no `scripts/` and no `memory:index` / `tokens` npm scripts. The generated
CLAUDE.md says to read `memory/identity.md` first and to run `npm run memory:index` after every
delivery. `check-parity` stays green: its reference regex only matches `agent-system/`, `.claude/`
and the other tool folders — `memory/` and `scripts/` are invisible to it.

## 2 · F-001 · Feedback inbox list (Standard)

**Session 1 — DIRECTION** · 11 turns · 0.5M cache · ctx max 44k
```
Context loaded. `memory/` doesn't exist yet … That doesn't block anything: the direction will run in
direction libre and propose its own tokens, marked as proposals.
Two questions before DIRECTION: 1. Lane? – Sketch (default) … 2. Where does the direction start?
```
Talent: `Standard. Brief.` → `bob-brief` (opus, 6 turns) → "morning ledger", 5 dimensions, two open
questions. Talent: `Approved. 1: yes … 2: Geist only.` → state file written, then
`→ nouvelle session · /pds reprendre 001`. The gate message ran ~20 lines against `output: short`'s 5.

**Session 2 — PROTOTYPE + 2 iteration rounds** · 17 turns · 3.0M · ctx max 46k
`bob-build --proto` (sonnet, 25 turns) → `prototypes/001-feedback-inbox.html`. Playwright CLI as
written: `http.server` + `find` / `click` / `eval getComputedStyle`, one `screenshot` handed over,
never read. impeccable: `overused-font` waived in the header against gate ① ("Geist only") — the
waiver rule applied exactly. The file loads Geist from Google Fonts (the "zero dependency" rule).

Two Talent changes (archived disclosure; split header count) → **two fresh `bob-build` runs**
(22 and 26 turns, ctx ≤ 42k), no `SendMessage`. Round 2 found a real bug on its own: the static
"7 open" in the markup never matched the data (5). Round 1 ran `rm -rf .playwright-cli` and deleted
the screenshot path handed to the Talent in round 0.

**Session 3 — CADRE** · 13 turns · 0.7M · ctx max 52k
`ray` (opus, 8 turns): 10 tasks / 38 assertions, `## HORS SCOPE`, 3 open questions with
recommendations, one deliberate divergence from the prototype named as such. Talent:
`Freeze it. Q1–Q3: go with RAY.` → `statut: VALIDATED`, state file, new session.

**Session 4 — PRODUIRE** · 17 turns · **12.7M** · ctx max 49k (main) / 102k (bob-build)
```
Figma (design-workflow) ⚠️ Figma isn't connected in this session
(a) Connect Figma … (b) Skip the Figma step and run bob-build now
```
Talent: `b.` → 3 `bob-build` runs: **80 turns (cap), 80 turns (cap), 31**. The conductor relaunched
fresh runs each time rather than resuming. 10 commits `feat(N): …` + `Ref: feature_001`.
BOB wrote `components/ui/{badge,button,card,separator,skeleton}.tsx` **by hand** instead of
`shadcn add` (F16). The pre-commit guard excludes `components/ui/`, so none of it was checked.

**Session 5 — JUGER** · 11 turns · 1.6M · analyzer 30 turns, ctx 68k
```
Conformance: 18/20, the minimum pass line. It is a separate question from the verdict.
… BOB made some choices you should confirm: He wrote components/ui/ by hand …
Decision: is the direction retenue or refusée?
```
ANALYZER re-ran the 38 assertions itself and measured in a browser (left-hugging column,
hydration drift on ages, disclosure affordance). It listed the hand-written `ui/` as a choice to
confirm, not as a breach of "Shadcn owns it". Talent: `retenue` → `memory/identity.md`,
`memory/directions/001-morning-ledger.md`, learning — then:
```
npm run memory:index failed because this project has no such script
```
It offered to copy the script from "your ProductDesignerStack source" (it had followed the harness's
`tokens` path into the repo). Talent: `no — leave the project as installed`.

## 3 · F-002 · Inline triage (Standard) — the reject loop

**Session 6 — DIRECTION** · 7 turns · 0.4M
Read `memory/directions/001` (retenue) as a constraint, flagged the missing `INDEX.md`, asked lane +
start. `bob-brief` → "posting to the ledger", 4 open questions. Talent answered all four → state
file, new session.

**Session 7 — PROTOTYPE, then CADRE in the same conversation** · 13 turns · 1.7M
`bob-build --proto` 17 turns. Then:
```
Your call: reply "go" to hand over to RAY … or ask for a prototype change
```
Talent: `go` → `ray` ran **in the same session** (F17). For F-001 the conductor had cut after the
prototype. RAY dropped the prototype's receipt-placement rule as buggy and said why, proposed
ADR-008, and — from F-001's cap hits — split the build into three batches. Talent: `validé`.

**Session 8 — PRODUIRE** · 23 turns · **19.4M** · bob-build ctx max 118k
Figma absent → said, asked. 6 `bob-build` runs: 45, **80 (cap)**, 45, **80 (cap)**, 27, 26.
In the second run:
```
Read /Users/amine.lamine/pds-pulse-run6/.playwright-cli/page-2026-09-26T19-47-29-271Z.png
→ [image, 1280×720]
```
**The image hook did not fire** (F14). Reproduced in isolation: a `bob-build` spawned as a subagent
reads a PNG freely; a hook that only `touch`es a file and exits 2 never runs from the frontmatter;
the same hook in `.claude/settings.json` blocks the Read inside the same subagent
(`PreToolUse:Read hook error: … BLOCKED-BY-SETTINGS-HOOK`). Claude Code 2.1.233.

The main conversation caught a hidden dependency itself: `npm run check` calls `npx tsx`, not in
`devDependencies`. `lib/feedback/ledger.ts` was committed at 186 lines and only split at task 10 —
the line cap guard applies to components.

**Corner cut** — operator commit `052fb4d fix(5): make the row action easier to spot`:
double-click guard removed from the verb, `text-[#2563EB]` on it, a `console.log` in `handlePost`.
```
⚠ console.log left in code — ANALYZER deducts 1 pt for this
✓ constraints hold          ✓ feature_002 — spec VALIDATED
```
BOB's 47 checks still pass: they prove `isRepeatedClick`, not that the button calls it.

**Session 9 — JUGER, three rounds** · 17 turns · 0.8M main · ctx max 62k (main)
Round 1 — analyzer 33 turns:
```
CONFORMANCE — 8/20 · NON CONFORME
Gherkin 1 / A4.1 ❌ A real mouse click at the centre of Triage leaves the header at 3 new · 2 triaged.
  elementFromPoint at the verb centre returns the <time>.
A9.4 / D4 ❌ … two items are archived (Archived 2 → 4).
A5.4 / A10.2 ❌ text-[#2563EB] · console.log (−1) · 'use client' in hooks/use-settle.ts
The A9.4 assertion passes but no longer proves anything …
Routing: the mechanical rule (< 10) sends this to RAY. However, the spec contains no ambiguity …
  The Talent confirms whether this goes through RAY or straight back to BOB.
```
All three injected cuts caught, **plus a real bug BOB shipped and "proved"**: the invisible `<time>`
sat over the verb since `feat(5)`. Talent: `BOB directly.`

Round 2 — a **fresh** `bob-build` (72 turns, ctx 106k), 6 fix commits, re-eval 29 turns:
```
CONFORMANCE — 11/20. All 6 round-one breaches fixed.
Blocker (older bug, missed in round one): about 150 ms after a click, the change undoes itself …
Major (new in fix 6): line-clamp-2 … Minor (new in fix 6): p-2 …
Both new breaches come from BOB fixing the impeccable warnings. Where impeccable's rules contradict
the brief, the flow says to waive them in the file header, not fix the code.
Your decision: send a fresh BOB run on those 3 points?
```
Two cycles, then the Talent — the escalation rule held. Talent: one more round.

Round 3 — a **fresh** `bob-build` (38 turns), re-eval 25 turns → **18/20**, rounds 8 → 11 → 18.
Talent: `retenue`, waivers into the prototype header, the remaining CX issue logged as a known limit.
The conductor made that waiver move itself — a comment removal in two component files (on the
Talent's instruction, but the conductor "calls, never rewrites"). Committed `a29915a`.

## 4 · Measure — `npm run tokens -- --last 12`

```
Total lecture de cache : 51.5M  (12 sessions)
  conversations principales  5.1M  10 %
  bob-build                  40.4M  78 % · 15 runs · max 80 tours ⚠ · ctx max 118k
  analyzer                   5.2M  10 % · 5 runs · max 33 tours · ctx max 69k
  ray                        0.6M   1 % · 2 runs · max 11 tours · ctx max 65k
  bob-brief                  0.3M   1 % · 2 runs · max 8 tours · ctx max 41k
```
Main conversation: max 62k of context over 9 phase sessions. Cost reported by the CLI: **$25.06**
for two Standard features (the isolated hook tests not included).

## What this run establishes

| V5 claim | Verdict |
|---|---|
| The lane is asked first, Sketch by default | **holds** — both features |
| Nothing is produced before gate ① | **holds** — both features |
| Direction before scope removes the F11 class | **holds** — RAY wrote against the brief and named its one divergence |
| One phase = one session, state file + `/pds reprendre` | **holds, unevenly** — F-002 carried PROTOTYPE into CADRE (F17) |
| Main conversation stays small | **holds** — 10 % of the spend, 62k max (portfolio cycles: 75 %, 669k) |
| model / effort per agent | **holds** — sonnet for bob-build, opus elsewhere, every run |
| `maxTurns` / "~60 calls" for bob-build | **fails** — 4 runs stopped at 80; the prompt's ~60 is never the brake |
| A fresh `bob-build` per round | **holds** — 3 proto rounds, 2 correction rounds, never resumed |
| The hook blocks image reads | **fails — F14**: it never runs for a subagent |
| impeccable is a floor, waived against the brief | **holds for the first build, fails in correction** — BOB "fixed" two rules against the brief |
| Playwright CLI, text first | **holds** — `find` / `eval`, one screenshot, never re-read (except F14) |
| `output: short` | **fails** — gate messages run 15–25 lines |
| The installed product has what the prompts cite | **fails — F13** |
| The reject loop rejects, routes, escalates | **holds** — 8 → 11 → 18, Talent asked after cycle 2 |
