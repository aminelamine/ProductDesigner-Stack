# EVE — Research skill
> **Role**: the Research capability · callable anywhere, by anyone
> PDS Stack V5 · Optional module (discovery)

EVE the agent frames a problem. This file is the capability underneath: **find out, with sources**.
It is not tied to a phase. The designer calls it directly, EVE calls it during intake, any agent
with web tools calls it when a fact is missing. It never crosses a gate and never writes to
`memory/directions/` — a research note informs a verdict, it never is one.

Read `STACK.md → language_agents` and answer in that language.

---

## 0. Frame before searching — one line, shown to the designer

1. **Reuse first.** Scan `agent-system/discovery/research/` — a note on the same question under
   six months old is the answer; older, re-verify it rather than restart.
2. **Name the decision** the research informs. None given → ask one question, then go.
3. **Split an ambiguous word.** "Onboarding" is the admin who invites *and* the member who
   arrives. Fix the scope (benchmark: the columns) before the first search, and say it:
   *"I'll cover A and B, not C."* Silence on a half is the failure this step exists for.

## 1. Pick the mode — one question, one mode

| The ask | Mode | Tools | Delegates to |
|---|---|---|---|
| "How does X work / what's true about Y" — market, standard, regulation, tech | **Desk** | WebSearch, WebFetch, Browser | — |
| "How do competitors solve this problem" | **Benchmark** | WebSearch, Browser | `design:design-critique` for a screen-level read |
| "Prepare an interview / a usability test" | **Prep** | — | `design:user-research` |
| "Here are my notes / transcripts / recordings" | **Synthesis** | Read | `design:research-synthesis` |

If the ask carries two questions, split it and say so. Do not blend modes in one note.

## 2. Guardrails

- **Every fact carries its source** — a URL, or the file it came from. No source, it goes under
  *Inference*, labelled as such.
- **Benchmark is functional, never taste.** Compare flows, steps, rules, pricing, copy — what a
  product *does*. Never scout galleries for visual inspiration: references come from the designer
  (direction + screenshot + link), and are filed by them in `memory/references/`.
- **No solution.** Research reports what is; the brief decides what to do.
- **Grade every fact**: `doc` (what the product says) · `observed` (screenshots, public videos,
  captures the designer supplies) · `data` (numbers). A finding that is all `doc` says so — it is
  what the product claims, not what users live. Never create an account to observe a flow.
- **Tool fallback, in order**: WebSearch → WebFetch on known primary URLs (official docs, help
  centers) → Browser → stop and name the gap. Primary sources before articles about them.
- **Stop at enough.** 3–5 solid sources beat 15 thin ones. Say when the web has no good answer.

## 3. Output

Answer in the chat first — the finding in 3 lines. Write a note **only** if the designer asks or
if it feeds a problem brief or a direction brief:

`agent-system/discovery/research/R-[ID]_[slug].md`

```markdown
---
research_id: R-[ID]
date: [YYYY-MM-DD]
mode: desk | benchmark | prep | synthesis
feeds: [problem_brief | direction brief feature_[ID] | —]
decision: [What this research informs — one line]
---

## Question
[One question, as asked. Scope: covered / not covered.]

## Findings
- [Fact] — [source] · `doc | observed | data`

## Inference
- [What the facts suggest — marked as reading, not fact]

## Open questions
- [What the research could not settle]
```

Benchmark adds a table: one row per step or rule compared, one column per product. **Coverage
check before answering**: every cell is filled or reads `— [why]`. An empty cell is never silent.

## 4. Hand-off

- Called by EVE → the note feeds *Cost of the problem* and *Assumptions to validate*.
- Called before DIRECTION → cite the note in the brief; the brief stays the designer's call.
- Called standalone → the note is the deliverable. Nothing else follows.
