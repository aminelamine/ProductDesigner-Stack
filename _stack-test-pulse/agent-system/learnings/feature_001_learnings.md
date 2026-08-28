---
feature_id: F-001
feature_name: Feedback Inbox List
date: 2026-08-20
verdict: SHIPPED WITH NOTES
score: 17/20
---

## Patterns that worked well
> What BOB did remarkably — to reuse in future features.
- Pure logic (sort / mask / excerpt) extracted to `lib/feedback/queries.ts` → each acceptance criterion (CA-2, CA-7) became unit-verifiable without rendering, and components stayed well under the 150-line cap. Reuse this "pure lib + thin component" split for every data feature.
- Server Component page + `loading.tsx` + `error.tsx` triad implemented exactly per ADR-006; only `error.tsx` is `"use client"` (justified by `reset`). Clean App Router discipline.

## Detected anti-patterns
> What caused deductions — to systematically avoid.
- Empty-state guard used `items.length === 0` instead of "no OPEN items". An all-archived list (a valid Story-2 precondition) renders archived cards instead of the "caught up" state → CA-5 only half-met. Expected correction: derive `openItems = items.filter(i => i.status !== 'archived')` and branch the empty state on that.

## Spec ambiguities to anticipate
> What RAY should clarify from the spec to avoid BOB's free interpretation.
- CA-5 said "empty state" and Story 2 said "empty or all archived" in two places — the criterion table should restate the full precondition inline (`empty OR all items archived`) so BOB can't read only the table row. Next spec: put the whole condition in the CA cell, never split it between story and table.

## CX signals to watch
> User frictions identified in simulation — to integrate into future user stories.
- Théo's JTBD is "answer what's new, ignore what Maya closed." When everything is archived he still sees a wall of cards → the done-state doesn't feel done. This friction is exactly what F-003 (celebration state) should own; flag the dependency early.

## Emerging architecture decision
> If BOB's code reveals an uncovered ADR need, flag it here for RAY.
- Status→color mapping is currently inline literal classes in `FeedbackCard`. If a 2nd feature needs the same badge colors, promote it to a shared `cva` badge variant to avoid divergence. → Convert to an ADR only if a 3rd feature reuses status badges (not yet — 1 occurrence).
