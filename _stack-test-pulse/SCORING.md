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
