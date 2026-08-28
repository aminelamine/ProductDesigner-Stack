# RUN LOG — Pulse run 5 · the junior interview, driven for real
> 2026-08-28 · stack v3.3.0 · modules core + design · `user_level: junior` · guardrails on
> Target: the one claim still measured indirectly — "nothing to fill in by hand, the conductor
> interviews you". Full cycle from an empty context to a verdict.
> Sandbox: "Shelfie", a private bookshelf. Fresh TypeScript project, install from local templates.

---

## 0 · Install → clean

8 install steps green. Then, before a single question:

**F8** — `flow.md` 1d sends the conductor to a "propagation table" at the end of
`PROJECT_BRIEF_TEMPLATE.md` and forbids inventing a structure. None of the three shipped brief
templates contains that section. The write phase of the bootstrap has no defined mapping.

## 1 · STEP 1 — the interview

Five questions, one at a time, each explained. The user answered like a beginner: partial,
concrete, no jargon ("I buy books and forget I own them"). The answers were enough to produce a
real `client_vision.md` — two JTBDs, three values, three anti-patterns — and a real `roadmap.md`.

1c auto-detection read the repo honestly: no framework beyond typescript, a bare `:root`, no
`components.json`, no fonts. It did not invent a theme.

**F9** — and that is where the flow deadlocks. 1c says never invent a token and leave `[TO FILL]`;
1d says zero `[TO FILL]` before STEP 2. On any greenfield project both cannot hold. Measured:
client_vision 0 markers, roadmap 0, design_guide 2 — STEP 2 blocked by the stack's own rule.

Proceeded past it deliberately, logged as a deviation, because the tokens are what STEP 3 exists
to decide.

## 2 · STEP 2 — RAY

Pre-flight 4/4 on the context the interview had just produced. T2 declared, 7 criteria,
`## OUT OF SCOPE` with four entries, ADR check clean. The validation ritual was put to the user in
plain language — scope freezes, additions cost a new cycle — and answered.

## 3 · STEP 3 — the junior brief

The mechanism works: two complete directions, each with fits / avoid if / trade-off, and a
recommendation argued from the user's own three words. The user picked one and BOB emitted the
five-dimension brief.

**F10** — the resources it draws from (`aesthetic_directions.md`, `visual_reference.md`,
`glossary.md`) are still French-only. The v3.3 translation fixed the gate protocols and the 24
loaders and stopped one directory short of the beginner-facing content.

## 4 · BOB — proof

```
[BOB] 🔬 Proof — feature_001
  CA-1 three groups, always, in reading/unread/finished order  ✓ passed
  CA-2 within a group, most recently added first               ✓ passed
  CA-3 countUnread reads the shelf, not a view                 ✓ passed
  CA-4 isOwned ignores case and surrounding whitespace         ✓ passed
  CA-5 no book is dropped                                      ✓ passed
```

The documented tsc path ran verbatim. `tsc --noEmit` exit 0, max component 35 lines.

A harness slip proved F4's fix: a missing `jsx` option produced type errors, and the hook reported
them as **"failed on files in this commit"** — the correct message. In run 3 the same shape of
error was wrongly called pre-existing.

## 5 · STEP 4 — ANALYZER · 17/20 · SHIPPED WITH NOTES → back to BOB

Assertions re-run rather than trusted: 5/5. Then the finding that matters.

**F11** — CA-7 forbids any colour literal outside the state→token map. The approved Quality Brief
authorised "accent #DC2626, spent only on the unread count". BOB obeyed the brief and breached the
spec. **Both gates fired correctly and the result still violates the frozen contract.** The brief
sits downstream of the freeze and nothing compares the two.

Routed to RAY, not to BOB: changing a frozen criterion is a new RAY cycle by the stack's own rule.

**F12** — the logic and UI layers landed in one commit whose message lists CA-1..CA-5 only.
`commit-msg` passed: it verifies a reference exists, never that it describes the diff.

---

## What this run establishes

| Claim | Verdict |
|---|---|
| The conductor interviews instead of asking for homework | **holds** — five questions produced usable context |
| Junior mode proposes argued directions rather than a catalogue | **holds** — content is French (F10) |
| The bootstrap completes | **fails — F8, F9** |
| The proof rule runs as documented | holds |
| Guardrails scope their messages correctly | holds — F4's fix confirmed under a real failure |
| Gates cannot produce a spec violation between them | **fails — F11** |
