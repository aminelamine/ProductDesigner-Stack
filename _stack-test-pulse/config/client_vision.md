# client_vision.md — Pulse
> Source of truth on client context and product objectives.
> Fully populated for the stack test so RAY's pre-flight passes cleanly.

---

## 🗺️ Project Context

**Project name:** `Pulse — Async feedback inbox for indie SaaS founders`
**Last updated:** `2026-08-20`
**Status:** `[x] Build`

---

## 👤 Users / Personas

### Persona 1 — Maya, solo SaaS founder
| Field | Value |
|---|---|
| Profile | Solo technical founder, ~800 users, ships weekly, no support team |
| Behaviour | Feedback arrives scattered across email, Twitter DMs, a Canny board; she loses track |
| Mental model | Wants a single inbox: "what came in, what did I already deal with, what's still open" |
| Risk | If triaging one item takes more than 2 clicks, she reverts to a messy Notion page |

### Persona 2 — Théo, part-time support contractor
| Field | Value |
|---|---|
| Profile | Helps Maya 5h/week, needs to know what's already handled to avoid double replies |
| Behaviour | Opens the tool once per session, scans for anything still "new" |
| Mental model | Wants the list sorted so the freshest untriaged item is on top |
| Risk | If he can't tell triaged from untriaged at a glance, he stops trusting the list |

---

## 🎯 Jobs-to-be-done

**JTBD Persona 1:**
*"When I sit down for my weekly triage, I want to see every piece of feedback and its current state in one list, so I can process the backlog without hunting across five apps."*

**JTBD Persona 2:**
*"When I start a support session, I want the newest untriaged feedback on top, so I answer what matters first without re-reading what Maya already closed."*

---

## 🏆 Product Objectives

### Vision (value proposition in 1 sentence)
On arrival, the user immediately understands that **Pulse is the single inbox where every piece of user feedback lands and gets a clear status — nothing slips through.**

### Measurable objectives
| Objective | Target persona | Success metric |
|---|---|---|
| Cut triage time | Maya | Full backlog triaged in < 10 min/week |
| Zero double-replies | Théo | 0 items answered twice per week |
| Trust the list | Both | 90% of items reach a terminal status within 7 days |

---

## 🎨 What the user should feel
**On arrival (0–5s):** "This is calm and under control — I can see everything."
**While using (5–60s):** "One glance tells me what's new vs. handled."
**On leaving:** "Inbox is at zero open items — nothing forgotten."

---

## 🚫 Constraints & Limits
### Technical
- Solo builder, no backend team — data layer is a typed query module (mock/local for MVP), no auth in MVP.
- Ship within 1 sprint.

### Content / legal
- Feedback may contain user emails → never expose raw PII in shared/URL contexts.

---

## ❌ What this product is NOT
- ❌ Not a helpdesk / ticketing suite (no SLAs, no assignment workflows).
- ❌ Not a public roadmap or voting board.
- ❌ Not a live chat widget.

---

## 📐 Product Values (RAY & BOB arbitration)
| Value | Operational definition |
|---|---|
| Glanceability | Status must be readable in < 1 second — weight/color, never a click. |
| Zero-friction triage | Changing a status is one action; nothing blocks the scan. |
| Honest emptiness | Empty state means "you're done", framed positively, not a blank void. |

---

## 📝 Historical decisions
| Date | Decision | Reason | Impact |
|---|---|---|---|
| 2026-08-20 | MVP = read + triage only, no ingestion integrations | Prove the inbox model before building connectors | Scope frozen to one list view |
