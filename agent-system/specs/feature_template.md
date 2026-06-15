# Feature Template — PDS Stack V3
> RAY declares the tier FIRST before generating the spec.
> Use only the section matching the declared tier. Do not mix sections.
> `## OUT OF SCOPE` block is mandatory in every tier.

---

## Tier selection guide

| Tier | Expected scope | Criteria |
|---|---|---|
| **T1** | < 100 LOC | Micro-feature, isolated UI change, config update, copy tweak, < 5 files, no API, no new dependency |
| **T2** | 100–300 LOC | Standard feature, new component, simple UI flow |
| **T3** | > 300 LOC or major new UI | Complex feature, new route, API, structural dependency, cross-feature impact |

> ⚠️ Retier rule: if scope during implementation exceeds the declared tier, RAY retiers before the next spec. Do not over-document a T1 after the fact.

---

---
# TIER 1 — Quick Spec
> < 30 lines · ~15 min · No Gherkin · No BOB/ANALYZER notes · OUT OF SCOPE mandatory
> Delete this section if Tier 2 or 3.
---

```markdown
---
feature_id: F-[NNN]
feature_name: [name]
tier: T1
status: DRAFT | VALIDATED
date: [YYYY-MM-DD]
---

## What it does
[1–2 sentences. Problem-first, not solution-first.]

## Acceptance criteria
- [ ] CA-1: [Binary — true/false. No "should" or "generally".]
- [ ] CA-2: [Binary — true/false.]
- [ ] CA-3: [Binary — if needed.]

## OUT OF SCOPE
- [What this explicitly does NOT do]

## Dependencies
- [None] OR [F-NNN — what it depends on]
```

---

---
# TIER 2 — Standard Spec
> 100–150 lines · ~45 min · 2 Gherkin stories max · Brief BOB notes · OUT OF SCOPE mandatory
> Delete this section if Tier 1 or 3.
---

```markdown
---
feature_id: F-[NNN]
feature_name: [name]
tier: T2
status: DRAFT | VALIDATED
date: [YYYY-MM-DD]
motion_level: L0
---

## Context
[1–2 sentences linking to a JTBD in client_vision.md. Why now.]

## User stories

**Story 1:**
```gherkin
Given [initial context]
When [user action]
Then [observable outcome]
  And [secondary outcome if applicable]
```

**Story 2 (if needed):**
```gherkin
Given [context or error case]
When [user action]
Then [observable outcome]
```

## Acceptance criteria

| ID | Criterion | Notes |
|---|---|---|
| CA-1 | [Binary — true/false] | |
| CA-2 | [Binary — true/false] | |
| CA-3 | Loading state: [describe] | |
| CA-4 | Empty state: [describe] | |
| CA-5 | Error state: [describe + recovery] | |

## OUT OF SCOPE
- [What this feature explicitly does NOT do]
- [Adjacent behavior explicitly excluded]

## Dependencies
- [None] OR [F-NNN — relationship and status]

## Notes BOB
- [Shadcn component to use]
- [Layout or composition constraint]
- [motion_level: L0 — no animation / or specify level and intent]
```

---

---
# TIER 3 — Complex Spec
> Full template · ~90 min · Full Gherkin · BOB + ANALYZER notes · ADR check mandatory · Epic parent required
> Delete this section if Tier 1 or 2.
---

```markdown
---
feature_id: F-[NNN]
feature_name: [name]
tier: T3
epic: epic_[NNN]_[name].md
status: DRAFT | VALIDATED
date: [YYYY-MM-DD]
motion_level: L0
motion_note: [Required if L3 — describe the motion intent. RAY must write this.]
---

## Context & JTBD
[2–3 sentences. Links to client_vision.md. States which JTBD this addresses and why now.]

## User stories

**Story 1 — [Name]:**
```gherkin
Given [initial context]
  And [additional precondition]
When [user action]
Then [observable outcome]
  And [secondary observable outcome]
```

**Story 2 — [Name]:**
```gherkin
Given [initial context]
When [user action]
Then [observable outcome]
```

**Story N — Edge Case: [Name]:**
```gherkin
Given [error condition or limit case]
When [user action]
Then [error handling behavior]
```

## Acceptance criteria

| ID | Criterion | Story ref | Notes |
|---|---|---|---|
| CA-1 | [Binary — true/false] | Story 1 | |
| CA-2 | [Binary — true/false] | Story 1 | |
| CA-3 | Loading state: [describe] | All | |
| CA-4 | Empty state: [describe + CTA if any] | Story 2 | |
| CA-5 | Error state: [describe + recovery path] | Story N | |
| CA-6 | Success state: [describe feedback] | Story 1 | |

## Quantitative success criteria (measurable post-delivery)

| Metric | Baseline | Target | Measurement method |
|---|---|---|---|
| [KPI from roadmap] | [current] | [target] | [how to measure] |

## OUT OF SCOPE
- [What this feature explicitly does NOT do]
- [Adjacent behavior explicitly excluded]
- [Future iteration explicitly deferred to next cycle]

## Dependencies
- [None] OR [F-NNN — what it depends on and why]

## ADR check
- [ ] ADR_INDEX.md reviewed — no conflicts
- [ ] New ADR needed: [yes / no — title if yes]

## Notes BOB
- Shadcn components required: [list]
- Layout / composition: [from design_guide.md]
- motion_level: [L0-L3] — [what this means for this feature]
- Data fetching strategy: [SSR / CSR / ISR / SWR — and why]
- Performance constraint: [if applicable]

## Notes ANALYZER
- Evaluation focus: [what to look at closely for this feature]
- Known edge cases to verify: [list]
- CX signals to watch: [from recent learnings if applicable]

## Spec history

| Date | Version | Change | By |
|---|---|---|---|
| [YYYY-MM-DD] | v0.1 | Initial creation | RAY |
```
