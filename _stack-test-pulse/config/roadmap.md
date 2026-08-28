# roadmap.md — Pulse

**Project:** Pulse
**Last updated:** 2026-08-20
**Current horizon:** MVP — < 1 sprint

---

## 🗺️ Phases
```
Phase 0 — Foundations (setup + design system)   ██████████  [Done]
Phase 1 — MVP Core (triage inbox)               ███░░░░░░░  [In progress]
Phase 2 — Ingestion connectors                  ░░░░░░░░░░  [Post-MVP]
```

---

## 🔴 NOW — MVP Core
| # | Feature | Spec | Status | Done criterion |
|---|---|---|---|---|
| F-001 | Feedback Inbox List | `specs/active/feature_001_feedback_inbox.md` | `[x] Spec'd → in build` | User sees all feedback items with status, newest untriaged on top |
| F-002 | Inline status change | `—` | `[ ] To spec` | Status changes in one click, list re-sorts |
| F-003 | Empty-at-zero celebration state | `—` | `[ ] To spec` | When no open items, positive done-state shown |

---

## 🟡 NEXT — Post-MVP
| # | Feature | Expected value | Effort | Dependencies |
|---|---|---|---|---|
| F-010 | Email ingestion connector | Auto-fills the inbox | L | F-001 |

---

## 🔵 LATER
- Tagging / grouping by theme
- Weekly digest export

---

## ❌ OUT OF SCOPE (decided)
| Dropped feature | Reason | Date |
|---|---|---|
| Assignment / ownership | Not a ticketing tool — see client_vision | 2026-08-20 |
| Public voting board | Different product | 2026-08-20 |

---

## 📊 KPIs
| KPI | Baseline | Target | Method |
|---|---|---|---|
| Weekly triage time | Not measured | < 10 min | Self-report |
| Open items > 7 days | Not measured | < 10% | Query on status age |
