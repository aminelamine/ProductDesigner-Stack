# PDS Stack — V3 Specification
> **Product Design System Stack**
> The design-first AI workflow for Product Designers who ship.
> Version: 3.0.0 · Status: DRAFT · Author: Le Talent

---

## 01 · Positioning

### The thesis

Every AI development framework treats design as a downstream artifact.
You write code. Then you check if it looks right.

PDS Stack inverts this.

**The designer's creative judgment IS the system's quality gate — not one input among many.**

Before a single line of code runs, a Quality Brief must exist and be validated.
This is not a formality. It is an architectural constraint that the entire system enforces.

### Who it's for

Product Designers who code — or direct code with AI.
Not junior devs who design. Not PMs who write specs.
Designers who understand that implementation is a creative act, and that creative acts require direction.

### What makes it different from every other framework

| Framework | Design role | Gate mechanism | Learning loop |
|---|---|---|---|
| **GStack** | None | None | `/retro` (velocity) |
| **GSD** | Implicit | None | None |
| **BMAD** | Sally writes UX specs | None | None |
| **PDS Stack** | **Quality Brief is the gate** | **Mandatory before all code** | **Score /20 + cumulative learnings** |

---

## 02 · Core Philosophy

### Three principles that cannot be negotiated

**1. Direction before execution**
No implementation without a validated quality brief. This applies to every feature, every tier, every project.

**2. Scope is sacred**
Once a spec reaches `VALIDATED`, its scope is frozen. Additions require a new cycle. Scope creep is a system failure, not a conversation.

**3. The system remembers**
Every feature generates learnings. RAY reads them before every spec. The system improves with use.

---

## 03 · Architecture — The Four-Phase Cycle

```
DISCOVERY (optional)          PLAN                BUILD               REVIEW
──────────────────────    ──────────────────   ──────────────────  ──────────────────
/eve                     RAY                  BOB                 ANALYZER
Problem Brief →          Spec (T1/T2/T3) →    Quality Brief →     Score /20 →
Problem validated?       VALIDATED?           Brief validated?    SHIPPED or REWORK
                         ↓                    ↓ Ralph Loop (6)
                         ADRs if needed       Commit after each step
```

### Phase 0 — Discovery `/eve` *(optional, not gated)*
Use when the problem is unclear. Skip when the brief already exists.
Output: `discovery/problem_brief.md` → pre-fills PROJECT_BRIEF §1–§2.

### Phase 1 — Plan `/ray`
RAY challenges the idea, tiers the spec (T1/T2/T3), writes `specs/active/feature_[ID].md`.
Gate: `statut: VALIDATED` by Le Talent. Scope frozen. `## OUT OF SCOPE` block mandatory.

### Phase 2 — Build `/bob`
BOB reads the spec + STACK.md + design_guide.md.
Gate: Quality Brief validated before the first line of code. No exceptions.
Implementation: Ralph Loop 6 steps. Commit after each step.
Context reset per feature — one feature per session.

### Phase 3 — Review `/analyzer`
ANALYZER scores /20 across 4 dimensions. Writes learnings. Release gate if ≥ 14.
18–20: SHIPPED · 14–17: SHIPPED WITH NOTES · 10–13: REWORK → BOB · <10: RE-SPEC → RAY

### Phase 4 — Delivery `/ship` *(new in V3)*
Triggered after ANALYZER verdict ≥ 14.
Generates `delivery/release_[ID].md`, deployment checklist, KPI measurement reminders.

---

## 04 · Agents

### RAY — Architect & Strategist
**Trigger:** `/ray` or `@RAY`
**Reads:** `STACK.md`, `context/client_vision.md`, `context/roadmap.md`, `adr/ADR_INDEX.md`, last 3 learnings files
**Outputs:** `specs/active/feature_[ID].md` (tiered T1/T2/T3) + ADRs if needed
**Cannot:** write code, validate its own ADRs, spec OUT OF SCOPE features

### BOB — Builder & Quality Director
**Trigger:** `/bob` or `@BOB`
**Reads:** spec file, `STACK.md`, `context/design_guide.md`, `adr/ADR_INDEX.md`
**Gate:** Quality Brief → Talent approval → Ralph Loop begins
**Outputs:** working code + session checkpoint + atomic commits
**Cannot:** start without validated spec, start without validated brief, exceed STACK.md constraints

### ANALYZER — Product QA & CX
**Trigger:** `/analyzer` or `@ANALYZER`
**Reads:** spec, code, design_guide, client_vision, ADR_INDEX
**Scores:** Spec Conformance (5) + UX & DS (5) + Technical Quality (5) + CX (5) = /20
**Outputs:** verdict + learnings file + release gate checklist
**Cannot:** invent criteria beyond spec/design_guide/ADRs, validate ADR violations

### EVE — Discovery Agent *(new in V3)*
**Trigger:** `/eve` or `@EVE`
**Use when:** problem is unclear, idea is vague, need to validate before briefing
**Outputs:** `discovery/problem_brief.md` → pre-fills PROJECT_BRIEF §1, §2, §1.3
**Cannot:** replace the PROJECT_BRIEF, spec features, make architecture decisions

### SHIP — Delivery Agent *(new in V3)*
**Trigger:** `/ship` or `@SHIP`
**Requires:** ANALYZER verdict ≥ 14
**Outputs:** `delivery/release_[ID].md` (deployment checklist, changelog entry, KPI reminders)
**Cannot:** trigger without ANALYZER approval, bypass the release gate

---

## 05 · The Quality Brief — Core Concept

The Quality Brief is what makes PDS Stack different from every other framework.

It is not a design spec. It is a **creative contract** between Le Talent and BOB, established before implementation begins. It defines the quality standard that the feature must meet — not what to build, but *how it must feel*.

### Brief types (configured in STACK.md)

| Type | Use when | What it defines |
|---|---|---|
| `aesthetic` | UI-heavy features | Visual direction, typography, palette, spatial composition |
| `performance` | Data-heavy features | Load budget, interaction latency, rendering strategy |
| `content` | Copy-heavy features | Tone, density, hierarchy, voice |
| `architecture` | Structural changes | Patterns, boundaries, data flow |

### Brief format (BOB generates, Talent approves)

```
[BOB] ⏸ Quality Brief — Feature [ID]

Type: [aesthetic | performance | content | architecture]
Direction: [1 sentence — the creative intent]
The 3 words: [Word 1] · [Word 2] · [Word 3]
Constraints: [What must never appear]
Reference: [1–2 references and what to retain from each]

Awaiting validation. No code before explicit approval.
```

---

## 06 · STACK.md — Stack Configuration

New in V3. Externalizes all technical constraints from CLAUDE.md.
Generated at install. Read by all agents.

```yaml
# STACK.md — PDS Stack configuration
# Edit to match your project.

framework: nextjs          # nextjs | nuxt | sveltekit | astro | remix | vite
language: typescript       # typescript | javascript | python | ruby | other
ui_lib: shadcn             # shadcn | radix | mantine | tailwind-only | none
strict_mode: true          # enforces zero `any`, zero @ts-ignore
line_cap: 150              # max component lines before mandatory split
motion_default: L0         # L0 | L1 | L2 | L3 (see design_guide.md)
quality_brief_type: aesthetic  # aesthetic | performance | content | architecture
```

Agents read `STACK.md` and adapt their constraints accordingly.
A Django project gets Python-specific rules. A Nuxt project gets Vue conventions.
The quality gate is identical regardless of stack.

---

## 07 · Spec Tiers — T1 / T2 / T3

### T1 — Quick (< 30 lines, ~15 min)
Micro-features, isolated UI changes, config updates.
- Binary acceptance criteria, flat list
- No Gherkin, no BOB/ANALYZER notes
- OUT OF SCOPE block still mandatory

### T2 — Standard (100–150 lines, ~45 min)
Standard features with user flows.
- 2 Gherkin stories max
- Dependencies identified
- Brief notes for BOB

### T3 — Complex (full template, ~90 min)
Multi-story features, architectural changes, new patterns.
- Full Gherkin
- Epic parent required (`epics/epic_[ID].md`)
- BOB notes + ANALYZER notes
- ADR review mandatory

---

## 08 · Project Brief Tiers

### Quick Start (T1 brief — 15 min)
5 mandatory fields. Enough to start.

```markdown
## Product summary (2–3 sentences)
## Primary persona + JTBD
## 3 MVP features (P0/P1/P2)
## Visual direction (1 sentence)
## The 3 aesthetic words
```

### Standard (T2 brief — 45 min)
T1 + personas, KPIs, out-of-scope, color tokens.

### Full (T3 brief — 90 min)
Current PROJECT_BRIEF_TEMPLATE.md — all 10 sections.

---

## 09 · File Architecture

```
[project-root]/
├── STACK.md                          ← Stack config (generated at install)
├── CLAUDE.md                         ← Agent instructions (generated at install)
│
├── agent-system/
│   ├── agents/
│   │   ├── RAY_system_prompt.md
│   │   ├── BOB_system_prompt.md
│   │   ├── ANALYZER_system_prompt.md
│   │   ├── EVE_system_prompt.md      ← NEW V3
│   │   └── SHIP_system_prompt.md     ← NEW V3
│   │
│   ├── context/
│   │   ├── client_vision.md
│   │   ├── roadmap.md
│   │   └── design_guide.md
│   │
│   ├── discovery/                    ← NEW V3
│   │   ├── PROBLEM_BRIEF_TEMPLATE.md
│   │   └── active/
│   │
│   ├── specs/
│   │   ├── active/
│   │   ├── shipped/
│   │   ├── dropped/
│   │   ├── epics/                    ← NEW V3 (T3 only)
│   │   └── feature_template.md      ← tiered T1/T2/T3
│   │
│   ├── delivery/                     ← NEW V3
│   │   ├── RELEASE_TEMPLATE.md
│   │   └── history.log
│   │
│   ├── adr/
│   │   ├── ADR_INDEX.md
│   │   └── ADR_TEMPLATE.md
│   │
│   ├── learnings/
│   │   ├── LEARNINGS_INDEX.md
│   │   └── LEARNING_TEMPLATE.md
│   │
│   ├── sessions/
│   └── PROJECT_BRIEF_TEMPLATE.md    ← tiered T1/T2/T3
```

---

## 10 · Module System

### Core (always installed)
RAY + BOB + ANALYZER + CLAUDE.md + STACK.md + all templates.
The quality gate is always present. Non-negotiable.

### Module: discovery
EVE agent + PROBLEM_BRIEF_TEMPLATE.
Install when: projects often start with vague problems.

### Module: delivery
SHIP agent + RELEASE_TEMPLATE.
Install when: you want to close the loop between build and KPI measurement.

### Module: design
Extended design_guide.md, motion level system L0–L3, Figma bridge workflow.
Install when: UI-intensive project with Figma integration.

### Module: epic
Epic template + T3 spec parent structure.
Install when: multi-story projects that need story breakdown before speccing.

---

## 11 · Install — manual

Copy three things into your project and edit one file:

```bash
git clone https://github.com/aminelamine/ProductDesigner-Stack.git
cp -r ProductDesigner-Stack/agent-system \
      ProductDesigner-Stack/CLAUDE.md \
      ProductDesigner-Stack/STACK.md \
      your-project/
```

Then:
1. Edit `STACK.md` — framework, language, ui_lib, modules, `language_agents`.
2. Fill `agent-system/PROJECT_BRIEF_TEMPLATE.md`.
3. Run `/ray`.

### What you get
- `STACK.md` — stack config (all agents read it before every session)
- `CLAUDE.md` — agent registry + hard constraints
- `agent-system/` — agents, templates, context files

---

## 12 · CLAUDE.md V3 Structure

```markdown
# ⬡ PDS STACK — [Project Name]

Stack → [from STACK.md]
Agents → RAY · BOB · ANALYZER [+ EVE · SHIP if modules installed]

## HARD CONSTRAINTS
→ No code without `statut: VALIDATED` in spec
→ No code without Quality Brief approval — BOB gate is non-negotiable
→ Scope frozen at VALIDATED — additions require new RAY cycle
→ [Stack-specific constraints from STACK.md]
→ Consult agent-system/adr/ADR_INDEX.md before any architecture decision

## AGENTS
/ray       → RAY      challenges idea · writes spec · creates ADRs
/bob       → BOB      quality brief (gate) · implements · commits
/analyzer  → ANALYZER scores /20 · verdict · writes learnings
/eve       → EVE      discovery · problem validation · pre-fills brief [if installed]
/ship      → SHIP     delivery · release notes · KPI reminders [if installed]
```

---

## 13 · Design Principles for the Framework Itself

PDS Stack is a product for designers. It must be designed.

**CLI output** — readable, typographically intentional. Agent prefixes are visual signals, not noise.
**Templates** — have a voice. Not corporate documentation. Opinionated and direct.
**Error states** — specific and actionable. Never "an error occurred."
**Documentation** — reads like a product page, not a README. Has a visual direction.
**Naming** — every file name, every command, every label is a micro-decision.

The framework enforces design quality in the products it builds.
It must hold itself to the same standard.

---

## 14 · V3 Delta — What changes from V2

| Area | V2 | V3 |
|---|---|---|
| Stack constraints | Hardcoded in CLAUDE.md | Externalized in STACK.md |
| Brief | Monolithic 10-section doc | Tiered T1/T2/T3 (15/45/90 min) |
| Discovery | ❌ | ✅ /eve module |
| Delivery | ❌ | ✅ /ship module |
| Epic layer | ❌ | ✅ T3 epics/ |
| Language | FR only | EN default, FR configurable |
| Quality Brief | aesthetic only | 4 types (aesthetic/perf/content/arch) |
| Modules | None | core + 4 optional modules |

**What does NOT change:**
- The quality gate (non-negotiable in every version)
- The /20 scoring + learnings loop
- Scope lock at VALIDATED
- Context reset per session (BOB)
- ADR system

---

## 15 · Open Questions (for Le Talent)

| Question | Status | Decision |
|---|---|---|
| npm package name: `pds-stack` or `@pds/stack`? | ✅ RESOLVED | `pds-stack` |
| Agent language: EN prompts or bilingual? | ✅ RESOLVED | EN+FR — configurable via `language_agents` in STACK.md |
| Docs site: GitHub Pages or dedicated domain? | Open | GitHub Pages initially |
| Community: Discord or GitHub Discussions? | Open | GitHub Discussions first |
| License: MIT? | Open | MIT |
