---
feature_id: F-002
feature_name: Inline status change
tier: T2
status: VALIDATED
date: 2026-08-20
motion_level: L0
---

## Context
Directly serves Maya's "zero-friction triage" value: from the inbox (F-001), change any item's status in one click and see the list re-order immediately, without leaving the page. This is the interactive layer on top of the read-only F-001 view.

## User stories

**Story 1 — One-click triage:**
```gherkin
Given the inbox shows an item with status "new"
When Maya clicks its status control and picks "triaged"
Then the item's badge updates to triaged
  And the list re-sorts (new > triaged > archived) without a page reload
  And a success toast confirms the change
```

**Story 2 — Persistence fails:**
```gherkin
Given a status change is in flight
When the update request fails
Then the item's status rolls back to its previous value
  And an actionable error toast is shown (not "An error occurred")
```

## Acceptance criteria

| ID | Criterion | Notes |
|---|---|---|
| CA-1 | Each card exposes a control that sets a new status in a single click | Story 1 |
| CA-2 | On change, the list re-sorts immediately client-side per F-001 order | Story 1 — reuse `sortForInbox` |
| CA-3 | Update is optimistic; on failure the item rolls back to its prior status | Story 2 — binary |
| CA-4 | Success confirmed via Sonner toast; failure shows an actionable error toast | design_guide Success/Error states |
| CA-5 | While an update is in flight, the control shows a pending/disabled state | design_guide loading state |
| CA-6 | No full-page reload; state is client-side | ADR-006 — client component justified by interactivity |

## OUT OF SCOPE
- Bulk / multi-select status changes.
- Undo history or an activity log.
- Keyboard shortcuts.
- Real persistence backend (mock async update; swappable later).

## Dependencies
- F-001 (SHIPPED WITH NOTES). ⚠ RAY note: F-001's open MAJOR (all-archived empty state) is independent of this feature; F-002 must not regress it — the client list still renders the F-001 empty state when there are no open items.

## Notes BOB
- New client component `InboxClient` holds item state (initial items from the F-001 server page as props). Reuse `FeedbackCard`; add a `StatusControl` subcomponent.
- Re-sort MUST reuse `sortForInbox` from `lib/feedback/queries.ts` — do not reimplement.
- Persist via a typed `updateFeedbackStatus(id, status)` in `lib/feedback/queries.ts` (mock; can reject).
- Shadcn: add `sonner` (toasts) + `dropdown-menu` for the status control. No other new components.
- motion_level: L0 — CSS transitions only. TS strict: no `any`. No `console.log` in delivered code.
