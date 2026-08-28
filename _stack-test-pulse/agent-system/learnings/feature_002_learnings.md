---
feature_id: F-002
feature_name: Inline status change
date: 2026-08-20
verdict: SHIPPED (after 1 reject cycle)
score: 19/20
cycles: 2
---

## Patterns that worked well
> What BOB did remarkably — to reuse in future features.
- Optimistic update with a `snapshot` closure for rollback: instant UI, correct on failure, no re-fetch. Reuse this exact shape for every one-click mutation.
- Re-sorting through the existing `sortForInbox` instead of reimplementing kept F-001 and F-002 ordering guaranteed-identical. The "pure lib, thin component" split from F-001 paid off a second time (→ approaching the 3× threshold for a global pattern).

## Detected anti-patterns
> What caused the REJECT — to systematically avoid.
- Fire-and-forget mutation (`updateFeedbackStatus(...)` un-awaited) → no way to roll back or report failure, and an unconditional `toast.success` that lies when the write fails. Any mutation must be `await`ed inside try/catch with success-on-resolve / rollback+error-on-reject.
- `any` used to silence a `.map` return type, and a debug `console.log` shipped. Both are hard-gated (ADR-004, security −1). Rule: never reach for `any` to move faster — it costs a full reject cycle.

## Spec ambiguities to anticipate
> What RAY should clarify from the spec to avoid BOB's free interpretation.
- **Internal contradiction**: CA-1 said "a single click sets a new status" while Notes BOB mandated `dropdown-menu` (inherently open + select = 2 clicks). RAY must make control-affordance and click-count consistent — either "one action to open the status menu" or a direct toggle. Flagged to RAY for F-002 spec v0.2.

## CX signals to watch
> User frictions identified in simulation — to integrate into future user stories.
- The dropdown adds one interaction vs. Maya's "zero-friction triage" value. For the highest-frequency transition (new → triaged) consider a direct one-tap affordance in a future iteration; keep the dropdown only for the rarer archive.

## Emerging architecture decision
> If BOB's code reveals an uncovered ADR need, flag it here for RAY.
- Optimistic-update-with-rollback is now the 2nd mutation pattern in the codebase (after none). If a 3rd interactive feature needs it, promote "optimistic + snapshot rollback + toast pair" to an ADR so every mutation handles failure identically. → Not yet (2 occurrences).
