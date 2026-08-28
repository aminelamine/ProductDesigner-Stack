# PDS Stack V3 — Performance Analysis
> Method: one full feature (Pulse F-001, T2) driven end-to-end through every active gate in an isolated sandbox.
> Question answered: **does the stack function as designed, and where does it create value vs. friction?**
> Date: 2026-08-20 · Modules active: core (RAY·BOB·ANALYZER) + design · off: discovery·delivery

---

## 1 · What was actually exercised

| Stack element | Fired? | Evidence |
|---|---|---|
| RAY pre-flight check (vision completeness) | ✅ | 4/4 checklist, PASS logged before any spec |
| RAY challenge routing (>80% → declare, don't ask) | ✅ | Correctly skipped questions, declared T2 reco |
| RAY tier declaration + `## OUT OF SCOPE` mandatory | ✅ | T2 declared first; OUT OF SCOPE block present |
| RAY ADR gate (consult before speccing) | ✅ | ADR-001/004/006 matched, no spurious ADR created |
| BOB Quality Brief gate (no code before approval) | ✅ | Aesthetic brief emitted + explicit approval before step 1 |
| BOB Ralph Loop (6 steps + checkpoint) | ✅ | All 6 steps + session_feature_001.md checkpoint written |
| BOB commit conventions (type(scope) + Ref spec) | ✅ | 4 conventional messages, each references a CA |
| Constraint enforcement (TS strict / line cap / L0 / Shadcn-only) | ✅ | tsc exit 0; all files < 150 lines; no motion import; only listed components |
| ANALYZER 4-dimension /20 scoring | ✅ | 4/5·4/5·5/5·4/5 = 17/20 |
| ANALYZER defect detection (real bug, not rubber-stamp) | ✅ | Caught CA-5 all-archived gap that BOB self-passed |
| ANALYZER learnings write (5 sections) | ✅ | feature_001_learnings.md, every section populated |
| ANALYZER release gate | ✅ | 5/5 checklist run |
| ANALYZER delivery gate (delivery:false → WARN not block) | ✅ | Correct asymmetry honored |
| Feedback loop closure (defect → BOB + spec-note → RAY) | ✅ | MAJOR routed to BOB, wording note routed to RAY |

**14/14 mechanisms fired correctly.** No gate was skippable, mis-ordered, or silently no-op.

---

## 2 · Stack performance scorecard

| Axis | Score | Rationale |
|---|---|---|
| **A. Gate integrity** — mandatory gates actually block | 19/20 | Every gate fired in order; none bypassable. −1: gates are prompt-enforced, not tooling-enforced (a careless operator *could* skip the Quality Brief; nothing mechanically stops it). |
| **B. Role fidelity** — agents stay in lane | 20/20 | RAY produced no code; BOB wrote no code before brief approval; ANALYZER judged only against spec/design_guide/ADR and invented no criteria. |
| **C. Traceability** — spec ↔ code ↔ verdict ↔ learning chain | 20/20 | CA IDs flow spec → commit `Ref:` → ANALYZER checklist → learnings. Any criterion is traceable end-to-end. |
| **D. Constraint enforcement** — quality bars hold | 18/20 | TS-strict / line-cap / motion-L0 / Shadcn-only all held and were verifiable. −2: verification is partly manual — only the pure-TS layer was compiler-proven; the `.tsx` layer relied on agent inspection. |
| **E. Defect-catching power** — QA has teeth | 17/20 | ANALYZER caught a genuine Story-2 conformance gap the builder missed. −3: it was caught by spec re-reading, not by an executable test — a subtler runtime bug could slip since there is no test-run gate. |
| **F. Loop learning** — system improves itself | 18/20 | Learnings are specific and actionable (pure-lib split to reuse; exact CA-5 fix; spec-wording rule for RAY). −2: value only compounds across many features; single-run can't prove the 3×-pattern→ADR escalation. |
| **G. Efficiency / friction** — overhead vs. value | 16/20 | For a T2 the ceremony paid off (the brief forced token discipline; the spec caught scope). −4: for anything truly T1 the same ritual would out-weigh the work — the tier system mitigates this but relies on RAY tiering honestly. |
| **Overall** | **~89 / 100** | Coherent, self-consistent, gates real. Ceiling set by manual (vs. automated) enforcement + no executable-test gate. |

---

## 3 · Where the stack created value (observed, not asserted)

1. **The Quality Brief prevented drift before it started.** Forcing "3 words + constraints" up front is why BOB never reached for motion or decorative color — the L0 + status-only-color rules were pre-committed, not policed after.
2. **The spec's OUT OF SCOPE block did work.** Status-change, celebration animation, and connectors were explicitly parked → BOB built a clean read-only view instead of gold-plating.
3. **ANALYZER earned its seat.** It found a real defect (all-archived → wrong state) that the builder self-passed. A stack whose QA only rubber-stamps is theater; this one isn't.
4. **Traceability is genuinely end-to-end.** `spec:CA-2` → commit → verdict row → learning is followable by a stranger. That is the stack's strongest property.

## 4 · Where the stack showed friction / limits

1. **Enforcement is prompt-based, not mechanical.** Nothing in tooling blocks a skipped Quality Brief or an un-run ADR check — integrity depends on the operator honoring the prompts. A pre-commit hook checking `Ref: feature_` and a spec-status gate would harden this.
2. **No executable-test gate.** ANALYZER reasons about conformance; it doesn't *run* anything. The CA-5 bug was caught by careful reading — a less obvious logic bug could pass. A minimal "BOB writes 1 assertion per binary CA" rule would convert QA from inspection to proof (this run proved the value: the logic layer that *was* tested came back green and correct).
3. **Ritual cost is real at low tiers.** The full brief+spec+verdict+learnings loop is ~right for T2/T3 and overkill for a copy tweak. The T1 compact path exists but depends entirely on RAY tiering honestly; there's no guard against a T2 ceremony on a T1 change.
4. **Single-pass can't stress the reject loop.** Score landed 17 (≥14), so the BOB↔ANALYZER REJECT→correct→re-eval cycle and the "2 cycles then escalate" rule were not exercised. Worth a second deliberately-broken feature to test.

## 5 · Observations on the LIVE install (outside the sandbox)

Real finding while reading the actual repo (not the test project):
- `agent-system/context/client_vision.md` is **half-populated for "Critique"** — personas + JTBD are real, but Vision statement, measurable objectives, "what it feels like", constraints, "what it is NOT", and Product Values are still `[À COMPLÉTER]` placeholders. → RAY's pre-flight would fire **⚠ partial (1 item unchecked: values/anti-patterns)** and proceed with an assumption note, *not* a clean pass.
- `agent-system/context/roadmap.md` is **entirely template** (F-001/002/003 are placeholders). RAY reads this for priority routing — on the live install it has nothing to route against.
- `design_guide.md` is **mid-configuration for Critique** (philosophy filled, but theme/tokens/font/max-width still `[À COMPLÉTER]`) → BOB would hit placeholder ambiguity and, per its rules, should STOP and ask.
- `learnings/` is empty (first run) — expected; RAY handles this ("note and continue").

**Implication:** the *machinery* is sound (this test proves it), but the *live inputs are not yet gate-ready*. The next real `/ray` on Critique would correctly refuse-or-warn at pre-flight — which is the stack working as designed, but means Critique isn't buildable until those three files are completed.

---

## 6 · Verdict on the stack

**The stack functions as specified. Every gate fired, in order, and did real work — including catching a real defect.** Its strongest properties are traceability and role separation; its ceiling is that enforcement and QA are reasoning-based rather than tooling-based. Two cheap upgrades would move it from ~89 to mid-90s:

1. **One executable assertion per binary CA** (turns ANALYZER from inspector to prover).
2. **A pre-commit / spec-status guard** (turns the gates from honor-system to mechanical).

Neither changes the philosophy — they just make the existing gates load-bearing under a careless operator.

---

---

## Run 2 · REJECT → correction → re-eval loop (F-002)

The one mechanism run 1 left untested. F-002 (inline status change) was built with a deliberate, realistic corner-cutting v1, then corrected.

| Mechanism | Fired? | Evidence |
|---|---|---|
| ANALYZER REJECTED verdict (band 10–13 → BOB, not RAY) | ✅ | 11/20, routed to BOB |
| ADR-004 auto-deduction (`any`) | ✅ | −2 applied, grep-confirmed |
| Security auto-deduction (`console.log`) | ✅ | −1 applied, grep-confirmed |
| Structured **correction criteria** (binary, not a bug list) | ✅ | 3 criteria, each independently re-checkable |
| BOB re-entry from reject criteria + correction | ✅ | v2 closed all 3, grep + tsc verified |
| ANALYZER re-evaluation → SHIPPED | ✅ | 19/20 |
| "Max 2 cycles then escalate" budget | ✅ | resolved in cycle 2; escalation correctly NOT triggered |
| Feedback routed to correct owner | ✅ | quality/state → BOB; spec self-contradiction → RAY |

**Two findings from run 2:**
1. **The auto-deduction rules are real and mechanical-ish.** `any` and `console.log` produced exactly the specified point loss — this part of QA *is* rule-based, not judgment. Good.
2. **ANALYZER caught a RAY-side defect, not just a BOB one.** The spec self-contradicted (CA-1 "single click" vs. Notes BOB "dropdown-menu"). The stack correctly routed it back to RAY. This is the loop working in the *other* direction — QA improving the spec author, not only the builder.

**Revised axis scores after run 2:**
- **E. Defect-catching power: 17 → 19/20.** Run 2 proved the reject loop and the auto-deductions fire precisely; the −1 that remains is still the absence of an executable-test gate (both bugs here were also greppable, so the point about subtle runtime bugs stands).
- **New axis — H. Reject-loop robustness: 19/20.** Clean reject, clean recovery, correct owner-routing, budget respected. −1: the "1 learnings file per feature" convention slightly bends the prompt's literal "write learnings after *every* verdict" — harmless, but an ambiguity worth resolving in the ANALYZER prompt.

**Revised overall: ~91 / 100.** Run 2 raised confidence: the loop is not decorative — it rejects, it routes, it recovers, and it improves both BOB *and* RAY.

---

### Artifacts produced by this test
```
_stack-test-pulse/
├── config/            STACK.md · client_vision.md · roadmap.md · design_guide.md   (inputs)
├── agent-system/
│   ├── specs/active/feature_001_feedback_inbox.md    (RAY output — VALIDATED)
│   ├── sessions/session_feature_001.md               (BOB checkpoint — 6/6)
│   └── learnings/feature_001_learnings.md            (ANALYZER output — 5 sections)
├── src/               lib/feedback · components/feedback · app/inbox   (BOB code — tsc-clean logic)
├── RUN_LOG.md         F-001 transcript (every gate signal)
├── RUN_LOG_F002.md    F-002 transcript (reject → correction → re-eval)
└── SCORING.md         this file
```


---

## Run 3 · the mechanisms that had never been measured (2026-08-28)

> Stack v3.1.1 · target: `/pds`, the shipped aesthetic gate, the git guardrails, the §3b proof
> rule. None existed at the 2026-08-20 run. Full transcript: `RUN_LOG_F003.md`. Findings:
> `RUN_003_FINDINGS.md`.

**Five findings, two of them defeating a headline claim.**

| # | Finding | Severity |
|---|---|---|
| F1 | The conductor's STEP 1 bootstrap detects `[À COMPLÉTER]` / `[Fill…]`; the shipped English templates use neither in `roadmap.md` or `design_guide.md`. Two of three empty context files pass as complete. | **blocker** |
| F2 | `BOB_aesthetic_gate.md`, `flow.md` and `pds_conductor.md` ship French-only regardless of `language_agents`. | minor |
| F3 | The §3b proof rule ("do not install a runner, run it with whatever the project can already execute") has no such path in a `moduleResolution: bundler` project. Three attempts failed before one worked. | **major** |
| F4 | tsc diagnostics inside `components/ui/` are reported as "pre-existing errors elsewhere" when the commit introduced them. | minor |
| F5 | `*.check.ts` — the §3b file whose job is printing its results — trips the `console.log` warning on every commit. | minor |

### Axis scores

| Axis | Run 2 | Run 3 | Movement |
|---|---|---|---|
| A. Gate integrity | 19/20 | **20/20** | The spec gate is no longer honour-system. It refused a commit against a DRAFT spec on its first real use — the −1 that stood since run 1 is closed. |
| B. Role fidelity | 20/20 | 20/20 | Unchanged. RAY produced no code, BOB waited for brief approval, ANALYZER judged only against spec and guides. |
| C. Traceability | 20/20 | 20/20 | Unchanged, and now enforced: `Ref:` is mandatory rather than conventional. |
| D. Constraint enforcement | 18/20 | **19/20** | tsc, `any`, `@ts-ignore` and the line cap are checked mechanically. −1: F4 — the `components/ui/` exclusion makes a true statement into a false message. |
| E. Defect-catching power | 19/20 | **20/20** | ANALYZER caught a MAJOR conformance defect and *proved it by running code*. The −1 that stood for "no executable-test gate" is closed. |
| F. Loop learning | 18/20 | 18/20 | Unchanged. Learnings written and specific; still needs many features to prove the 3×-pattern→ADR escalation. |
| G. Efficiency / friction | 16/20 | **14/20** | −2: F3. BOB spent three failed attempts satisfying a rule that does not describe a real project. A rule that costs more than it proves is friction, not rigour. |
| H. Reject-loop robustness | 19/20 | 19/20 | Not re-exercised — the score landed at 16 (SHIPPED WITH NOTES). Carried over from run 2. |
| **New — I. Onboarding path** | — | **8/20** | The headline claim is "nothing to fill in by hand — the conductor interviews you". On a fresh install it does not fire. Install and entry points are sound; the first step after them is not. |

**Overall: ~86/100** (was ~91). The drop is the point of running it.

Three axes went up, because the guardrails and the proof rule did exactly what they were built to
do. The total fell anyway, because two things shipped that had never been executed: a detection
rule that does not match its target, and a workflow rule with no working path. Both were written
carefully, reviewed, documented on a public page — and neither had ever been run once.

### What run 3 changes about how to read this file

Runs 1 and 2 measured a system that had been used. Run 3 measured a system that had been
*written*. The gap between the two is where every finding above sits.

---

## Run 4 · confirmation (2026-08-28)

> A **focused** run, not a full cycle. Run 3 changed three gate files; this verifies they behave as
> intended on a fresh install. It does not re-drive a feature through all four agents — the
> mechanics were measured in run 3 and nothing about them changed.

| Check | Target | Result |
|---|---|---|
| A · STEP 1 detection | F1 fix | 4 / 4 / 5 `[TO FILL]` markers across the 3 context files — the bootstrap now blocks |
| B · Gate files in English | F2 fix | 0 French constructs left in `flow.md`, `pds_conductor.md`, `BOB_aesthetic_gate.md`, or any of the 24 loaders |
| C · §3b documented path | F3 fix | the command in the prompt, run verbatim: compiles and passes, zero dependency added |
| D · Guardrails on a proof file | F4 / F5 fix | commit passes clean — no `console.log` warning on `*.check.ts` |
| E · `.proof/` not committed | §3b hygiene | 0 files versioned; only the source and the check file |
| F · Spec gate | regression | still refuses a commit against a DRAFT spec |

### Axis movement

| Axis | Run 3 | Run 4 | Note |
|---|---|---|---|
| G. Efficiency / friction | 14/20 | **18/20** | The −2 for F3 is cleared: the documented path runs verbatim with nothing installed. −2 remains for the ritual cost at low tiers, unchanged since run 1. |
| I. Onboarding path | 8/20 | **17/20** | STEP 1 now fires on all three context files. −3: still measured by marker presence, not by driving a real junior interview end to end. |

Other axes unchanged — untouched by these fixes and not re-exercised.

**Overall: ~92/100** (was ~86). F2 and F6 are closed on top of the run-3 fixes.

### What run 4 does not establish

It confirms that three files behave; it does not re-prove the cycle. The next full run should
drive a junior-mode feature from an empty context through to a verdict, because the one thing
still measured indirectly is the interview itself — the headline onboarding claim.

### Post-run-4 addendum · F7

While committing the run-4 fixes, the pre-commit guard blocked the commit itself: `install.js`
contains the string `` `@ts-ignore` `` inside the CLAUDE.md text it generates. Third false positive
of the same class (after the CLI `console.log` and `*.check.ts`). The `@ts-ignore` check is now
scoped to `.ts`/`.tsx`, as the `any` check already was.

Axis D (constraint enforcement) holds at 19/20 — the −1 is now this class of false positive rather
than F4's wording. Three instances in three sessions says the rule to write down is: a textual
guard is only as good as its scope, and the scope is the set of files the rule can actually apply to.

---

## Run 5 · the junior interview, driven for real (2026-08-28)

> Stack v3.3.0 · `user_level: junior` · full cycle from an empty context to a verdict.
> The claim run 4 could only measure indirectly: "nothing to fill in by hand — the conductor
> interviews you". Transcript: `RUN_LOG_F005.md`. Findings: `RUN_005_FINDINGS.md`.

**Six findings. The interview works; the bootstrap around it does not complete, and two approved
gates produced a spec violation between them.**

| # | Finding | Severity |
|---|---|---|
| F8 | STEP 1's write phase cites a propagation table that exists in none of the three brief templates — and forbids inventing a structure | **blocker** |
| F8b | The brief template still teaches "fill §1–§4 before running /ray", the pre-conductor path | minor |
| F9 | 1c (never invent a token, leave `[TO FILL]`) and 1d (zero `[TO FILL]` before STEP 2) cannot both hold on a greenfield project — the nominal path deadlocks | **blocker** |
| F10 | The v3.3 translation stopped one directory short: `resources/` — the three files junior mode depends on — was still French | major |
| F11 | The approved Quality Brief authorised what a frozen acceptance criterion forbids. BOB obeyed the brief and breached the spec, with **both gates behaving correctly** | **major, structural** |
| F12 | A commit message listing CA-1..CA-5 carried CA-6/CA-7 work; `commit-msg` checks that a reference exists, never that it is accurate | minor |

### Axis movement

| Axis | Run 4 | Run 5 | Note |
|---|---|---|---|
| A. Gate integrity | 20/20 | **17/20** | Every gate fired, and the system still shipped a violation of its own frozen contract (F11). A gate that cannot be bypassed but can be contradicted by the next gate is not integrity. |
| B. Role fidelity | 20/20 | 20/20 | RAY produced no code. BOB waited for the brief. ANALYZER routed the defect to RAY, not BOB, because the cause was upstream — the correct call. |
| C. Traceability | 20/20 | **19/20** | −1: F12. The chain holds structurally; one link described less than it carried. |
| D. Constraint enforcement | 19/20 | 19/20 | tsc, `any`, line cap, console.log all clean. F4's fix confirmed under a real failure: a genuine type error was correctly reported as "in this commit". |
| E. Defect-catching power | 20/20 | 20/20 | Assertions re-run 5/5, and the CA-7 breach caught by reading the spec against the code. |
| F. Loop learning | 18/20 | 18/20 | Learnings written. "Measurable but never measured" criteria slipped for the second run running — now recorded as a pattern for RAY. |
| G. Efficiency / friction | 18/20 | 18/20 | Unchanged. The interview cost five questions and produced usable context — cheap for what it returns. |
| H. Reject-loop robustness | 19/20 | 19/20 | Not re-exercised; 17/20 routed back to BOB as specified. |
| I. Onboarding path | 17/20 | **12/20** | The interview itself is good — five beginner answers produced a real client_vision and roadmap. But the bootstrap does not finish: F8 leaves the write phase without a mapping, F9 deadlocks the exit. Measured by running it, the claim does not hold end to end. |

**Overall: ~89/100** (was ~92).

### What run 5 changes

Runs 3 and 4 found rules pointing at nothing, and guards with the wrong scope. Run 5 found
something different in kind: **two gates that each work, disagreeing with each other**. F11 is not
a typo or a missing file — it is a structural gap in the order of the gates. The spec freezes, and
then a later gate is allowed to contradict the freeze with nobody comparing them.

That is the first finding in five runs that required actually building a feature to surface. No
amount of reading the prompts would have produced it.

### Fixes applied

F8, F8b, F9, F10, F11, F12 all closed. A fifth release check was added — **a cited section must
exist in the file that carries it** — because the reference pass and the marker pass both went
green on F8: the file shipped, only the section was missing.
