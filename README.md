# ⬡ PDS Stack

**The design-first AI workflow for Product Designers who ship.**

Every AI development framework treats design as a downstream artifact.  
You write code. Then you check if it looks right.

PDS Stack inverts this.

**The designer's creative judgment is the system's quality gate — not one input among many.**  
Before a single line of code runs, a Quality Brief must exist and be validated.  
This is not a formality. It is an architectural constraint the entire system enforces.

**Live:** [pds-stack.netlify.app](https://pds-stack.netlify.app) · **Release notes:** [what's in / what's next](https://pds-stack.netlify.app/release-notes.html)

---

## Install

```bash
npx pds-stack install
```

Answer ten questions (eleven in a git repo). Get a complete agent system configured for your project in under 5 minutes.

> Requires Node.js 18+ and at least one AI coding tool — [Claude Code](https://docs.anthropic.com/claude-code),
> Cursor, Gemini CLI, VS Code / Copilot or Codex CLI.

**What gets generated:**
- `STACK.md` — your stack config (framework, UI lib, modules, `user_level`, agent language)
- `CLAUDE.md` — agent registry and hard constraints (plus `GEMINI.md` / Cursor rule if selected)
- `agent-system/` — RAY + BOB + ANALYZER, the conductor flow, the Quality Brief gate, design
  resources, ADRs, spec templates, context stubs
- **Entry points for every tool you selected** — `/pds` `/ray` `/bob` `/analyzer` as real commands
- Optional modules: discovery (EVE), delivery (SHIP), design (Figma bridge), epic

Then type `/pds` and start. Nothing to fill in by hand first — the conductor interviews you.

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

## Guardrails

Gates that only live in a prompt hold as long as everyone honors them. These two are mechanical.

**Git hooks** (`npx pds-stack install` offers to place them in `.git/hooks/`):

| Hook | Blocks |
|---|---|
| `commit-msg` | Product code committed without a `Ref: feature_<id>` trailer, or referencing a spec that is not `VALIDATED` — or one sitting in `specs/dropped/` |
| `pre-commit` | `any` or `@ts-ignore` (ADR-004) · components over the `line_cap` in `STACK.md` · a failing `tsc --noEmit` |

Both read their thresholds from `STACK.md`, warn (rather than block) on `console.log`, stay silent
on commits that touch no product code, and are bypassable with `--no-verify`. Existing hooks are
never overwritten.

Two scoping rules keep them from crying wolf: `tsc` diagnostics are filtered to the files in the
commit, so pre-existing errors elsewhere warn instead of blocking; and an optional `hook_exclude`
key in `STACK.md` lists paths the guards should not judge — sandbox fixtures and vendored samples
are evidence, not your code.

```yaml
hook_exclude: _stack-test-pulse/ examples/
```

**Test the stack on itself.** [`_stack-test-pulse/`](_stack-test-pulse/) holds two full feature
cycles driven end to end through every gate, transcribed and scored. Re-run it whenever you change
what a gate does — `npm run check:parity` warns when the gate files have moved since the last
recorded run.

**Proof over inspection.** Every binary acceptance criterion a machine can decide carries exactly
one assertion that BOB runs before handing over — no test framework installed, no coverage target.
A criterion is `proven`, `unproven` (visual — say why), or `failed`. Never "believed OK". ANALYZER
re-runs the assertions rather than trusting the pasted output, and deducts for a code-decidable
criterion shipped without one.

---

## The four-phase cycle

`/pds` is the front door — it runs the whole cycle and stops at every gate for your call.
The individual commands below stay available when you want to drive a single phase yourself.

```
                         ┌──────────────── /pds ────────────────┐
                         │        adaptive conductor            │
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

### CONDUCTOR — Adaptive entry point
Runs the full cycle so you never have to remember the command sequence. Bootstraps the three
context files by interview on first run, then calls RAY, BOB and ANALYZER as-is — it never alters
their gates, their scoring or their system prompts, and never crosses a gate on your behalf.
Adapts to `user_level` in `STACK.md`: `junior` explains each gate and proposes argued options,
`expert` stays terse.

**Trigger:** `/pds`
**Output:** the whole idea → spec → build → review chain, one decision at a time

---

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
**Verdicts:** 18–20 SHIPPED · 14–17 SHIPPED WITH NOTES → BOB · 10–13 REWORK → BOB · <10 RE-SPEC → RAY  
**Commit gate:** only **≥ 18 is committed**. "Shipped with notes" is accepted in substance and still
goes back to BOB — it does not reach the branch.

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
# STACK.md — PDS Stack configuration

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
│   ├── orchestration/                    ← /pds conductor flow
│   │   ├── pds_conductor.md
│   │   └── flow.md
│   │
│   ├── resources/                        ← palettes, font pairings, aesthetic directions
│   │
│   ├── context/                          ← /pds fills these by interview on first run
│   │   ├── client_vision.md              ← personas, JTBDs, product values
│   │   ├── roadmap.md                    ← priorities, KPIs
│   │   └── design_guide.md               ← tokens, components
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

## MCP integrations

Agents pull design context from connectable MCP servers. Any HTTP- or stdio-compatible MCP server works natively with Claude Code — the stack inherits it automatically.

**Available now**

- **Figma** — bidirectional design context: read designs into code *and* write to the canvas. (`figma-console-mcp` / official Figma plugin)
- **Mobbin** — 600k+ screens from shipped, real-world products; searchable reference for ANALYZER & BOB. *Requires a Mobbin paid plan.*
  ```bash
  claude mcp add mobbin --scope user --transport http https://api.mobbin.com/mcp
  ```
- **Miro** — collaborative whiteboard: pull boards, frames & sticky notes as live references for EVE's discovery and RAY's planning. (official Miro MCP)

**Roadmap**

- **Refero** — web + iOS design references (MCP rolling out). *Requires a Refero paid plan.*
- **Custom inspiration MCP** — locally-curated index with semantic search over your own reference library.

The current state is always documented on the live [release notes](https://pds-stack.netlify.app/release-notes.html).

---

## What does NOT change between versions

Some things are invariants. They don't negotiate.

- The Quality Brief gate — mandatory before all code, every feature, every project
- The /20 scoring + learnings loop — compounds with every feature shipped
- Scope lock at VALIDATED — additions require a new RAY cycle
- Context reset per BOB session — one feature per session, no exceptions
- The ADR system — every structural decision is recorded and enforced

---

## Quick start

```bash
# 0. Install
npx pds-stack install

# 1. That's it — start a feature
/pds "I want to build [feature description]"
```

The conductor takes it from there:

| Step | What happens | Who decides |
|---|---|---|
| **Context** | If `client_vision` / `roadmap` / `design_guide` are still empty, `/pds` interviews you and auto-detects what it can from your repo | you answer |
| **Spec** | Calls RAY — tier (T1/T2/T3), `## OUT OF SCOPE` block, ADR check | you validate the spec |
| **Build** | Calls BOB — Quality Brief first, then the Ralph Loop with a commit per step | you approve the brief |
| **Review** | Calls ANALYZER — score /20, verdict, learnings written | you accept the verdict |

`/pds` never crosses a gate for you. It proposes, you decide.

Set `user_level: junior` in `STACK.md` and it explains every gate and offers 2–3 argued options
at each judgment call. `expert` keeps it terse.

<details>
<summary>Driving the phases manually</summary>

```bash
/ray "I want to build [feature description]"   # spec → statut: VALIDATED
/bob "implement feature_[ID]"                  # Quality Brief → your approval → code
/analyzer "evaluate feature_[ID]"              # verdict + learnings
/ship "feature_[ID]"                           # delivery module only, needs verdict ≥ 14
```

</details>

---

## Contributors

| | Role |
|---|---|
| [@aminelamine](https://linkedin.com/in/lamine-amine) | Product Designer · Architecture · Creative direction |
| [Claude](https://anthropic.com/claude) (Anthropic) | AI pair — spec generation, implementation, QA |

---

*Built and validated by [@aminelamine](https://linkedin.com/in/lamine-amine) — Product Designer, AI workflows.*  
*PDS Stack V3 · MIT License*
