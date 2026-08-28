---
feature_id: F-001
feature_name: Feedback Inbox List
tier: T2
status: VALIDATED
date: 2026-08-20
motion_level: L0
---

## Context
Addresses Maya's JTBD ("see every piece of feedback and its current state in one list") and Théo's ("newest untriaged feedback on top"). It is the MVP core: the single read-only list that proves the inbox model before any ingestion connector (F-010) is built.

## User stories

**Story 1 — Scan the backlog:**
```gherkin
Given feedback items exist with statuses new | triaged | archived
When Maya opens /inbox
Then she sees every item as a card showing source, excerpt, status badge, and relative time
  And untriaged (new) items are sorted above triaged, which sort above archived
  And within a status group items are ordered newest-first
```

**Story 2 — Nothing to do:**
```gherkin
Given no feedback items are open (list is empty or all archived)
When Théo opens /inbox
Then he sees a positive "inbox at zero" empty state, not a blank screen
```

## Acceptance criteria

| ID | Criterion | Notes |
|---|---|---|
| CA-1 | Each item renders source, excerpt (truncated ≤ 140 chars), a status badge, and relative time | Story 1 |
| CA-2 | Sort order is: status priority (new > triaged > archived), then createdAt desc within group | Story 1 — binary, testable |
| CA-3 | Status badge color follows design_guide map: new→amber, triaged→sky, archived→muted | Glanceability value |
| CA-4 | Loading state renders `<Skeleton />` cards matching final card dimensions | design_guide mandatory state |
| CA-5 | Empty state renders a positive "you're all caught up" message, not a blank area | Story 2, Honest-emptiness value |
| CA-6 | Error state renders an actionable message + a retry affordance (not "An error occurred") | design_guide mandatory state |
| CA-7 | Raw user email in a feedback item is never rendered in full — masked to `m•••@domain` | client_vision PII constraint |

## OUT OF SCOPE
- Changing an item's status (that is F-002 — this view is read-only).
- The zero-open celebration animation (F-003 — empty state here is static text only).
- Any ingestion / connector logic (F-010). Data comes from a typed query module.
- Auth, multi-user, assignment, filtering, search, pagination.

## Dependencies
- None. F-002 and F-010 depend on this; this depends on nothing.

## Notes BOB
- Shadcn components: `card`, `badge`, `skeleton`, `separator`. Button only if error-retry needs it.
- Data via `lib/feedback/queries.ts` returning typed `FeedbackItem[]` — no hardcoded data in components.
- Sort + email-mask logic lives in `lib/feedback` (pure functions), not in the component body.
- Server Component for the page (App Router, ADR-006); no `useEffect` fetching. Provide `loading.tsx` + `error.tsx`.
- motion_level: L0 — CSS transitions only (`transition-colors`). No `motion` import.
- Keep each component < 150 lines (STACK line_cap); split card out of list.

## ADR check
- [x] ADR_INDEX reviewed — ADR-001 (Shadcn-only), ADR-004 (TS strict), ADR-006 (App Router) all cover this. No new ADR needed.
