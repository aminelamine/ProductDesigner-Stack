# ⬡ PDS Stack

**The design-first AI workflow for Product Designers who ship.**

Every AI development framework treats design as a downstream artifact.  
You write code. Then you check if it looks right.

PDS Stack inverts this.

**The designer's creative judgment is the system's quality gate — not one input among many.**  
Before a single line of code runs, a Quality Brief must exist and be validated.  
This is not a formality. It is an architectural constraint the entire system enforces.

---

## Install

```bash
npx pds-stack install
```

Answer 7 questions. Get a complete agent system configured for your project in under 5 minutes.

> Requires Node.js 18+ and [Claude Code](https://docs.anthropic.com/claude-code).

---

## Why PDS Stack

Every other framework has the same architecture: AI writes code, human reviews output.  
Design is a recommendation. Quality is a hope. The system has no memory.

PDS Stack is built on three different constraints:

**Direction before execution.**  
BOB generates a Quality Brief — visual direction, the 3 defining words, constraints, references — and waits for Talent's explicit approval. No brief, no code. Every time.

**Scope is sacred.**  
RAY writes every spec with a mandatory `## OUT OF SCOPE` block. Once the spec reaches `VALIDATED`, its scope is frozen. Additions require a new RAY cycle. Scope creep is a system failure, not a conversation.

**The system remembers.**  
ANALYZER writes a learnings file after every feature — patterns, anti-patterns, spec ambiguities, CX signals. RAY reads the 3 most recent before every new spec. The system compounds with use.

---

## The four-phase cycle

```
DISCOVERY (optional)     PLAN              BUILD              REVIEW
────────────────────     ────────────────  ─────────────────  ──────────────────
/eve                     /ray              /bob               /analyzer
                                                              
Problem Brief →          T1/T2/T3 spec →  Quality Brief →    Score /20 →
Is problem valid?        VALIDATED?       Ralph Loop (6) →   SHIPPED or REWORK
                         ADRs if needed   Commit per step    Learnings written
                         ↓
                         Scope frozen
```

---

## The agents

### RAY — Architect & Strategist
Challenges every idea before speccing it. Tiers specs by complexity (T1/T2/T3). Creates Architecture Decision Records for structural choices. Reads the 3 most recent learnings files before every spec.

**Trigger:** `/ray`  
**Output:** `specs/active/feature_[ID].md` · ADRs if needed

---

### BOB — Builder & Quality Director
Generates a Quality Brief before writing any code. Implements via the 6-step Ralph Loop. Commits atomically after each step. One feature per session — context reset between features.

**Trigger:** `/bob`  
**Gate:** Quality Brief → Talent approval → implementation begins  
**Output:** Working code · session checkpoint · atomic commits

---

### ANALYZER — Product QA & CX
Scores every feature /20 across 4 dimensions. Enforces a release gate. Writes a learnings file after every verdict — fed back into RAY before the next spec.

**Trigger:** `/analyzer`  
**Scores:** Spec Conformance (5) · UX & DS (5) · Technical Quality (5) · CX (5) = /20  
**Verdicts:** 18–20 SHIPPED · 14–17 SHIPPED WITH NOTES · 10–13 REWORK → BOB · <10 RE-SPEC → RAY

---

### EVE — Discovery Agent *(module: discovery)*
Validates the problem before the brief is written. 5 questions max, then outputs a `problem_brief.md` that pre-fills the PROJECT_BRIEF §1–§2. Use when the problem is unclear. Skip when the brief already exists.

**Trigger:** `/eve`

---

### SHIP — Delivery Agent *(module: delivery)*
Closes the loop between ANALYZER's verdict and production. Generates the deployment checklist, CHANGELOG entry, KPI measurement plan, and rollback trigger. Requires ANALYZER verdict ≥ 14.

**Trigger:** `/ship`

---

## The Quality Brief

The single most important concept in PDS Stack.

Before BOB writes a single line of code, it generates a creative contract:

```
[BOB] ⏸ Quality Brief — Feature F-001

Type: aesthetic
Direction: Minimal editorial card — hierarchy through spacing, not decoration.
The 3 words: Quiet · Deliberate · Grounded
Typography: IBM Plex Mono for data, 14px base, no decorative fonts
Palette: Background + accent-foreground only, no surface color
Constraints: No gradients. No rounded corners beyond 4px. No animation on data fields.
Reference: Linear issue card (density without noise) · Vercel dashboard (precision spacing)

Awaiting validation. No code before explicit approval.
```

This is not a formality. It is an architectural constraint the entire system enforces.

**Brief types** (set in `STACK.md`):
- `aesthetic` — visual direction, typography, palette, spatial composition
- `performance` — load budget, interaction latency, rendering strategy
- `content` — tone, density, copy hierarchy, voice
- `architecture` — patterns, component boundaries, data flow

---

## Spec tiers

RAY declares the tier first. The tier determines documentation depth, not rigor.

| Tier | When to use | Time | Format |
|---|---|---|---|
| **T1** | Micro-feature, isolated UI change, config update | ~15 min | < 30 lines, flat AC, no Gherkin |
| **T2** | Standard feature with user flows | ~45 min | 100–150 lines, 2 Gherkin stories |
| **T3** | Complex feature, architecture change, multi-story | ~90 min | Full Gherkin, BOB + ANALYZER notes, ADR review |

Every tier — `## OUT OF SCOPE` block is mandatory.

---

## How it compares

| Framework | Design role | Gate mechanism | Learning loop |
|---|---|---|---|
| [GStack](https://github.com/btahir/gstack) | None | None | `/retro` (velocity) |
| [GSD](https://nervegna.substack.com/p/claude-code-for-designers-a-practical) | Implicit | None | None |
| [BMAD](https://github.com/bmad-code-org/bmad-method) | UX spec writer (Sally) | None | None |
| **PDS Stack** | **Quality Brief is the gate** | **Mandatory before all code** | **Score /20 + cumulative learnings** |

---

## STACK.md — your stack config

PDS Stack works with any framework. At install, you configure your stack. Agents adapt.

```yaml
# STACK.md — generated by npx pds-stack install

framework: nextjs         # nextjs | nuxt | sveltekit | astro | remix | other
language: typescript      # typescript | javascript | python | other
ui_lib: shadcn            # shadcn | radix | mantine | tailwind-only | none
strict_mode: true
line_cap: 150
motion_default: L0        # L0 (CSS only) | L1 | L2 | L3 (GSAP, RAY validation required)
quality_brief_type: aesthetic

modules:
  core: true              # always required
  discovery: false        # EVE agent
  delivery: false         # SHIP agent
  design: true            # extended motion system, Figma bridge
  epic: false             # T3 epic parent structure

language_agents: en       # en | fr
```

The quality gate is identical regardless of stack.

---

## File structure

```
[project-root]/
├── STACK.md                              ← Stack config — read by all agents
├── CLAUDE.md                             ← Agent registry — generated at install
│
├── agent-system/
│   ├── agents/
│   │   ├── RAY_system_prompt.md
│   │   ├── BOB_system_prompt.md
│   │   ├── ANALYZER_system_prompt.md
│   │   ├── EVE_system_prompt.md          ← discovery module
│   │   └── SHIP_system_prompt.md         ← delivery module
│   │
│   ├── context/
│   │   ├── client_vision.md              ← [fill before /ray] — personas, JTBDs
│   │   ├── roadmap.md                    ← [fill before /ray] — priorities, KPIs
│   │   └── design_guide.md              ← [fill before /bob] — tokens, components
│   │
│   ├── discovery/                        ← EVE outputs
│   ├── specs/
│   │   ├── active/                       ← current feature (0–1 at a time)
│   │   ├── shipped/
│   │   ├── dropped/
│   │   ├── epics/                        ← T3 epic parents
│   │   └── feature_template.md          ← T1/T2/T3 template
│   │
│   ├── delivery/                         ← SHIP outputs + history.log
│   ├── adr/                              ← Architecture Decision Records
│   ├── learnings/                        ← ANALYZER writes here, RAY reads here
│   └── sessions/                         ← BOB checkpoints (ephemeral)
│
└── PROJECT_BRIEF_TEMPLATE.md             ← T1 (15 min) / T2 (45 min) / T3 (90 min)
```

---

## Motion system (design module)

| Level | Library | Constraint |
|---|---|---|
| L0 | CSS / Tailwind only | Default — no motion library |
| L1 | motion | Max 3 `motion.div` per page |
| L2 | motion + AnimatePresence | Layout transitions allowed |
| L3 | motion + GSAP | RAY validation required before use |

Universal rule: `useReducedMotion()` in every animated component.

---

## What does NOT change between versions

Some things are invariants. They don't negotiate.

- The Quality Brief gate — mandatory before all code, every feature, every project
- The /20 scoring + learnings loop — compounds with every feature shipped
- Scope lock at VALIDATED — additions require a new RAY cycle
- Context reset per BOB session — one feature per session, no exceptions
- The ADR system — every structural decision is recorded and enforced

---

## Quick start (after install)

```bash
# 1. Fill the three context files
#    agent-system/context/client_vision.md
#    agent-system/context/roadmap.md
#    agent-system/context/design_guide.md

# 2. Run RAY with your first idea
/ray "I want to build [feature description]"

# 3. Validate the spec
# RAY outputs specs/active/feature_[ID].md
# Add statut: VALIDATED when you're satisfied

# 4. Run BOB
/bob "implement feature_[ID]"
# BOB generates a Quality Brief and waits for your approval
# "go" or adjustments → implementation begins

# 5. Run ANALYZER
/analyzer "evaluate feature_[ID]"
# Verdict + learnings written automatically

# 6. If delivery module installed
/ship "feature_[ID]"
# Release doc + history.log entry
```

---

## Contributors

| | Role |
|---|---|
| [@aminelamine](https://linkedin.com/in/lamine-amine) | Product Designer · Architecture · Creative direction |
| [Claude](https://anthropic.com/claude) (Anthropic) | AI pair — spec generation, implementation, QA |

---

*Built and validated by [@aminelamine](https://linkedin.com/in/lamine-amine) — Product Designer, AI workflows.*  
*PDS Stack V3 · MIT License*
