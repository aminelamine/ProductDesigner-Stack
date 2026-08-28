# Pulse run 5 — findings

## F8 · STEP 1 writes against a propagation table that does not exist — BLOCKER

`flow.md` 1d:
> Write the 3 files using the **propagation table** at the end of
> `agent-system/PROJECT_BRIEF_TEMPLATE.md` ("Propagate this brief into the 3 context files") —
> **do not invent a structure**.

None of the three shipped brief templates contains that section:

| Template | "propagat" mentions |
|---|---|
| `PROJECT_BRIEF_T1.md` | 0 |
| `PROJECT_BRIEF_T2.md` | 0 |
| `PROJECT_BRIEF_T3.md` | 0 |

So the conductor is told to use a mapping that is not shipped, and forbidden from inventing one.
Either it stops at the last step of the bootstrap, or it disobeys the rule it was just given.

Same class as F1 — a rule pointing at something that is not there — but one level finer: the
*file* exists and is packaged, so both the reference pass and the marker pass go green. Only the
*section* is missing.

## F8b · The brief template still teaches the pre-conductor path — MINOR

`PROJECT_BRIEF_TEMPLATE.md` ends with:

> *Fill §1–§4 before running /ray. RAY will challenge §5 and §6.*

That is the manual homework flow `/pds` replaced. A junior who opens the file is told to fill it
by hand before calling an agent the conductor never asks them to call. Same contradiction the CLI
exit message carried before 3.1.

## F9 · STEP 1 contradicts itself on every greenfield project — BLOCKER

Two rules, four lines apart in `flow.md`:

- **1c, cardinal rule:** "**never invent** a token, font or theme value. If the repo does not
  contain it, ask (junior) or leave an explicit `[TO FILL]` flagged to the Talent."
- **1d:** "Verify: **zero `[TO FILL]` left** in the 3 files before STEP 2."

On a fresh project there is no `components.json`, no font loaded, no theme beyond a bare
`:root`. Obeying 1c leaves markers in `design_guide.md`; 1d then refuses to advance to STEP 2.
The nominal path deadlocks, and the only ways out are inventing tokens (banned by 1c) or
skipping the gate (banned by the skip policy).

Junior mode's "ask" is not an escape either: asking a beginner which Shadcn theme they want,
before any design conversation has happened, asks them the one question the **Quality Brief in
STEP 3 exists to answer**.

The intent is clearly that visual tokens are settled at the aesthetic gate, not at bootstrap.
The rule does not say so. Measured here: `client_vision` 0 markers, `roadmap` 0,
`design_guide` 2 — and STEP 2 blocked.

Fix: scope 1d's zero-marker gate to what RAY actually needs (`client_vision`, `roadmap`), and
state that unresolved `design_guide` tokens are expected and are resolved by BOB's Quality Brief.

## F10 · F2 was fixed one directory short — MAJOR

`agent-system/resources/` is still French-only: `aesthetic_directions.md`, `visual_reference.md`
and `glossary.md`. These are exactly the three files junior mode depends on — the pre-argued
directions BOB proposes, the palette and pairing catalogue, and the glossary used to gloss terms
as they come up.

So the v3.3 translation fixed the gate protocols and the 24 loaders, and stopped at the directory
where the beginner-facing content lives. An English project running junior mode gets English
narration wrapped around French source material ("Quand ça colle", "Compromis", "Éviter").

The resources themselves are well built — D2 "Éditorial Chaleureux" is the right pick for this
product on the first read, and the "when it fits / when to avoid / trade-off" framing is exactly
what a junior needs. The content is not the problem; the reach of the fix was.

## F11 · The Quality Brief can authorise a violation of the frozen spec — MAJOR, structural

The spec, validated and therefore frozen:

> **CA-7** — A book row shows title, author and state; the state label draws from a single
> state→token map **with no colour literal elsewhere in the feature**.

The Quality Brief, approved four steps later:

> 🎨 Palette — Stone on warm paper. accent `#DC2626`, **spent only on the unread count**.

These cannot both hold. BOB followed the brief, and shipped `text-red-700` in `Shelf.tsx:11` —
outside `STATE_TOKENS`, in direct breach of a criterion whose scope was frozen.

Nothing in the flow reconciles them. The gate order is spec → **VALIDATED, scope frozen** →
Quality Brief → code. The brief sits *downstream* of the freeze and can still contradict it, and
no step compares the two. Both gates fired correctly and the result still violates the contract.

This is the most structural finding of the five runs: the previous defects were rules pointing at
nothing, or guards with the wrong scope. This is two gates that each work, disagreeing.

Fix: BOB's Step 1 already reads the spec before writing the brief. It must also **check the brief
against the spec's visual criteria and refuse to emit a brief that contradicts one** — routing the
conflict back to RAY as a spec question, which is the existing mechanism for changing frozen scope.

## F12 · Commit-per-step slipped without anything noticing — MINOR

BOB's convention is one commit per Ralph Loop step. In this run the logic layer and the UI layer
landed in a single commit whose message references CA-1..CA-5 only, while the diff also contains
the CA-6/CA-7 work. The `Ref:` trailer was present and the spec was VALIDATED, so `commit-msg`
passed — it verifies that a reference exists, never that the reference describes the diff.

Not worth a guard: a hook cannot judge whether a message describes a change. Worth stating in
BOB's commit section that a message listing criteria must not carry work for criteria it omits.
