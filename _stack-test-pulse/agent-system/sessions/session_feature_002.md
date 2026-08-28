---
feature_id: F-002
feature_name: Inline status change
date: 2026-08-20
---

## Ralph Loop Status (final — after correction)

| Step | Status | Notes |
|---|---|---|
| 1 — Structure  | ✅ | InboxClient + StatusControl in components/feedback |
| 2 — Scaffold   | ✅ | InboxClientProps / StatusControlProps typed, no any |
| 3 — Core logic | ✅ | optimistic update + rollback; reuse sortForInbox; updateFeedbackStatus lib |
| 4 — UI         | ✅ | dropdown-menu control, Button, Sonner toasts |
| 5 — States     | ✅ | pending (disabled + "Saving…"), success toast, error toast + rollback |
| 6 — Polish     | ✅ | transition-colors (L0), justify-end control, < 150 lines each |

## Cycle history (REJECT → correction → re-eval)

### Cycle 1 — v1 → ❌ REJECTED (11/20)
Delivered a working happy path but cut corners:
- ADR-004: `const next: any` in changeStatus (−2)
- Security: `console.log("changeStatus", …)` left in (−1)
- CA-3 not met: fire-and-forget `updateFeedbackStatus` — no rollback on failure
- CA-4 not met: `toast.success` fired unconditionally (even when persist would fail) — no error toast
- CA-5 not met: no pending/disabled state on the control

### Cycle 2 — v2 → ✅ SHIPPED (19/20)
- Removed `any` (typed `.map` return), removed `console.log`
- `await` inside try/catch: success toast on resolve; on reject → `setItems(snapshot)` rollback + actionable error toast
- Added `pendingId` state → control shows "Saving…" and is disabled while in flight
- Extracted `StatusControl` subcomponent (line-cap hygiene)

## Notable implementation choices
- Rollback uses a pre-mutation `snapshot` closure rather than re-fetching — instant and offline-safe.
- Optimistic re-sort via existing `sortForInbox` (no logic duplication).

## Active blockers
- None. 1 spec-contradiction flagged to RAY (CA-1 "single click" vs dropdown control) — non-blocking.

## Commits staged (cycle 2)
- fix(feature_002): remove any + console.log from status handler   Ref: feature_002 | spec:CA-6
- feat(feature_002): add optimistic status change with rollback + toasts   Ref: feature_002 | spec:CA-3,CA-4
- feat(feature_002): add StatusControl with pending state   Ref: feature_002 | spec:CA-1,CA-5
