# ⬡ PDS Stack

**The design-first AI workflow for Product Designers who ship.**

[![npm version](https://img.shields.io/npm/v/pds-stack.svg)](https://www.npmjs.com/package/pds-stack)
[![license](https://img.shields.io/npm/l/pds-stack.svg)](https://github.com/aminelamine/ProductDesigner-Stack/blob/main/LICENSE)

---

## Install

```bash
npx pds-stack install
```

Answer 7 questions. Get a complete AI agent system configured for your project in under 5 minutes.

> Requires Node.js 18+ and [Claude Code](https://docs.anthropic.com/claude-code).

---

## What is PDS Stack?

Every AI development framework treats design as a downstream artifact. You write code. Then you check if it looks right.

**PDS Stack inverts this.**

The designer's creative judgment is the system's quality gate — not one input among many. Before a single line of code runs, a **Quality Brief** must exist and be validated. This is not a formality. It is an architectural constraint the entire system enforces.

---

## The agents

| Agent | Role | Trigger |
|---|---|---|
| **RAY** | Architect & Strategist — challenges ideas, writes tiered specs T1/T2/T3, creates ADRs | `/ray` |
| **BOB** | Builder & Quality Director — generates Quality Brief (gate), implements via 6-step Ralph Loop | `/bob` |
| **ANALYZER** | Product QA & CX — scores /20, enforces release gate, writes cumulative learnings | `/analyzer` |
| **EVE** *(discovery module)* | Validates the problem before the brief — 5 questions max | `/eve` |
| **SHIP** *(delivery module)* | Closes the loop post-verdict — release doc + KPI tracking | `/ship` |

---

## What gets generated

```
your-project/
├── STACK.md                    ← Your stack config — read by all agents
├── CLAUDE.md                   ← Agent registry + hard constraints
│
└── agent-system/
    ├── agents/                 ← RAY, BOB, ANALYZER (+ EVE, SHIP if installed)
    ├── context/                ← client_vision.md, roadmap.md, design_guide.md
    ├── adr/                    ← Architecture Decision Records
    ├── specs/                  ← active/, shipped/, dropped/, epics/
    ├── learnings/              ← ANALYZER writes here, RAY reads here
    └── PROJECT_BRIEF_TEMPLATE.md
```

---

## The Quality Brief

Before BOB writes a single line of code, it generates a creative contract:

```
[BOB] ⏸ Quality Brief — Feature F-001

Type: aesthetic
Direction: Minimal editorial card — hierarchy through spacing, not decoration.
The 3 words: Quiet · Deliberate · Grounded
Constraints: No gradients. No rounded corners beyond 4px.
Reference: Linear issue card · Vercel dashboard

Awaiting validation. No code before explicit approval.
```

**Brief types** (set in `STACK.md`): `aesthetic` · `performance` · `content` · `architecture`

---

## STACK.md — your config

```yaml
framework: nextjs
language: typescript
ui_lib: shadcn
strict_mode: true
line_cap: 150
motion_default: L0
quality_brief_type: aesthetic

modules:
  core: true
  discovery: false
  delivery: false
  design: true
  epic: false

language_agents: en    # en | fr
```

---

## Quick start

```bash
# 1. Install
npx pds-stack install

# 2. Fill context files
#    agent-system/context/client_vision.md
#    agent-system/context/roadmap.md

# 3. Run RAY
/ray "I want to build [feature]"

# 4. Validate the spec, then run BOB
/bob "implement feature_[ID]"
# BOB generates a Quality Brief — approve it, then implementation begins

# 5. Run ANALYZER
/analyzer "evaluate feature_[ID]"
# Score /20 + learnings written automatically
```

---

## Links

- **Repo**: [github.com/aminelamine/ProductDesigner-Stack](https://github.com/aminelamine/ProductDesigner-Stack)
- **Requires**: [Claude Code](https://docs.anthropic.com/claude-code)

---

*PDS Stack V3 · MIT License · Built by [@aminelamine](https://linkedin.com/in/lamine-amine)*
