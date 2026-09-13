# ⬡ PDS Stack

**The design stack for product designers who work with agents.**

A dev has `package.json`, a lockfile, a linter, CI. A designer has a Figma file and their memory.

PDS Stack gives the designer the equivalent: **a versioned design system, annotated references,
and the directions they have already validated or refused** — read by every agent, on every
feature, before anything is produced.

**The memory is the product. The workflow is thin.**

Two constraints hold it together. Direction is approved as text before anything is generated.
And the designer's verdict on that direction is binary, blocking, and cannot be overridden by any
score. Figma is the default output; **code is a module** — a project with `modules.code: false`
traverses the whole cycle without ever meeting a git gate.

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
- Optional modules: code (RAY + BOB build + git guards), discovery (EVE), delivery (SHIP), epic

Then type `/pds` and start. Nothing to fill in by hand first — the conductor interviews you.

---

## Why PDS Stack

Every other framework has the same architecture: AI writes code, human reviews output.  
Design is a recommendation. Quality is a hope. The system has no memory.

PDS Stack is built on three different constraints:

**Direction comes first — before the scope, not after.**  
The Quality Brief is approved before the scope is frozen. In V3 it was the other way round, and the
two gates could contradict each other while both passing. The scope is now framed *by* the
direction.

**Taste compounds, not trivia.**  
`memory/directions/` records every direction submitted to judgment — **retained and refused**, with
the reason. A refused direction is worth more than a retained one: it stops the next brief
reproposing what was already judged wrong on this product. Nothing is ever deleted from it.

**Two verdicts, never averaged.**  
Conformance is a /20 the system computes. Direction is binary and the designer alone renders it.
A delivery can be 20/20 and refused — and the system says exactly that instead of flattening it
into one number.

**Ceremony matches stakes.**  
Three lanes, default **Sketch**: direction + production, one gate, no spec file, no score. Hard
budget: **3 human gates, ~12 steps**. Any rule that does not fit is cut, not documented.

---

## Guardrails

Gates that only live in a prompt hold as long as everyone honors them. These two are mechanical.

**Git hooks** (`npx pds-stack install` offers to place them in `.git/hooks/`) — they belong to the
**code module**. With `modules.code: false` they exit silently on every commit, so a design-only
project never meets them:

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

## The memory

The four stores every phase reads. This is the part that compounds.

```
memory/
├── identity.md        the visual story, the floor, and what this product is NOT
├── design-system/     registries extracted from Figma — tokens, components, text styles
├── references/        annotated screenshots — WHY it works, what we took, what we did not
├── directions/        every direction judged — retained AND refused, with the reason
└── decisions/         structural decisions, design-shaped
```

Reading order in the DIRECTION phase, and never the reverse: `identity` → `directions` →
`design-system` → `references` → `decisions`. Starting from references before the directions
already settled is how you repropose what was refused.

`setup` builds it from Figma, from the code, from four declared answers — or, when there is
nothing at all, through a **genesis** that writes `identity.md` with you. **No empty store ever
blocks a phase.** It is signalled and filled.

---

## The cycle

`/pds` is the front door. The first question is the lane, and the default is Sketch.

```
                    ┌──────────── /pds ────────────┐
                    │      adaptive conductor      │
DIRECTION            CADRE             PRODUIRE          JUGER + MÉMORISER
─────────────────    ───────────────   ──────────────    ──────────────────
brief, 5 dimensions  scope, framed     Figma (default)   ① conformance /20
read from memory/    BY the direction  code (module)     ② direction — binary
        ⏸ gate ①            ⏸ gate ②                            ⏸ gate ③
```

| Lane | When | Phases | Human gates |
|---|---|---|---|
| **Sketch** *(default)* | explore, iterate — the 80 % | DIRECTION → PRODUIRE | **1** |
| **Standard** | a screen or component going to review or dev | all four | **2** |
| **System** | it touches the design system | all four + written decision | **3** |

In Sketch: no spec file, no score, no written decision. Relaunching is cheaper than documenting.

A refused direction goes back to **DIRECTION**, never to the builder. It is not a list of bugs to
fix; it is a direction to retake.

---

## The agents

### CONDUCTOR — Adaptive entry point
Runs the full cycle so you never have to remember the command sequence. Asks the lane first —
Sketch by default, never guessed — then calls BOB, RAY and ANALYZER as-is: it never alters
their gates, their scoring or their system prompts, and never crosses a gate on your behalf.
Adapts to `user_level` in `STACK.md`: `junior` explains each gate and proposes argued options,
`expert` stays terse.

**Trigger:** `/pds`
**Output:** the whole direction → scope → production → judgment chain, one decision at a time

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
**① Conformance:** Spec (5) · UX & DS (5) · Technical Quality (5) · CX (5) = /20.
All four compare the delivery to something *written*. **None asks whether it holds together
visually** — so this number is never presented as a quality verdict.
**② Direction:** binary, `retenue` / `refusée`, rendered by the designer alone. Never inferred from ①.
**Commit gate:** needs **① ≥ 18 AND ② retenue**. The two are never averaged.

> Why: P-001 cycle 1 scored **18/20 = SHIPPED** and was rejected outright by the designer.
> With four conformance dimensions and no aesthetic one, that was the only possible outcome.
> The case is now a regression test for the gate itself
> (`_stack-test-pulse/REGRESSION_GATE_DIRECTION.md`).

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

default_lane: sketch      # sketch | standard | system

modules:
  core: true              # the memory + the 4-phase cycle + the 3 gates
                          # + the motion system and the Figma bridge, since V4
  code: false             # BOB build, git guards, TypeScript constraints
  discovery: false        # EVE agent
  delivery: false         # SHIP agent
  epic: false             # T3 epic parent structure

language_agents: en       # en | fr
```

With `code: false` — the install default — no git guard arms, and the cycle stays traversable end
to end. The direction gate is identical regardless of stack, and regardless of whether you ship
code at all.

---

## File structure

```
[project-root]/
├── STACK.md                              ← Stack config — read by all agents
├── CLAUDE.md                             ← Agent registry — generated at install
│
├── memory/                               ← THE PRODUCT — read by every phase
│   ├── identity.md                       ← visual story · the floor · what this product is NOT
│   ├── design-system/
│   │   ├── schemas/                      ← registry formats, read by setup
│   │   └── registries/                   ← tokens · components · text styles (extracted)
│   ├── references/                       ← annotated screenshots + why they work
│   ├── directions/                       ← every direction judged — retained AND refused
│   └── decisions/                        ← structural decisions, design-shaped
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

## Motion system

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

- **The memory is the product** — four stores, read before anything is produced
- **Direction before scope** — the brief is approved first, the scope is framed by it
- **Two verdicts, never averaged** — no score overrides the designer's no
- **A refused direction is never deleted** — it is the densest material in the memory
- **An empty memory store never blocks** — it is signalled and filled, never a deadlock
- **The budget** — 3 human gates, ~12 steps. A rule that does not fit is cut, not documented

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
| **Lane** | One question, asked first. Default **Sketch** | you pick |
| **Setup** *(first run)* | Builds `memory/` — from Figma, from your code, from four answers, or through a genesis if there is nothing yet | you answer |
| **Direction** | The brief, read from `memory/` — a direction already refused is not reproposed | you approve the brief ⏸ |
| **Cadre** *(Standard / System)* | The scope, framed **by** the direction | you validate the scope ⏸ |
| **Produire** | Figma by default · code if `modules.code: true` | — |
| **Juger** | ① conformance /20 · ② direction, yours alone | you render the direction ⏸ |

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
*PDS Stack V4 · MIT License*
