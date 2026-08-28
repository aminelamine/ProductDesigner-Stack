# glossary.md
> **Usage**: the single source for **PDS vocabulary** and for **why each gate exists**.
> The `/pds` conductor and the agents use it in **junior mode** (`STACK.md → user_level: junior`)
> to **gloss a term inline** the first time it appears, and to **explain a gate** rather than
> simply imposing it.
>
> Rule: in junior mode, gloss as you go (one sentence, in parentheses or as a note) — never recite
> the glossary in a block. In expert mode, gloss nothing.

---

## Terms (one sentence each, no jargon)

| Term | In plain words |
|---|---|
| **The Talent** | You, the human who decides — the agent proposes, you settle it at every gate. |
| **Spec** | The document describing *what* gets built (not *how*) — written by RAY, it freezes the scope. |
| **Frozen scope** | Once the spec is validated nothing is added without a new RAY cycle — that is what stops drift. |
| **VALIDATED** | Your explicit go-ahead on a spec — without it BOB writes no code. |
| **Gherkin** | A way of writing a scenario as `GIVEN / WHEN / THEN` (context / action / observable outcome). |
| **Acceptance criterion** | A binary true/false condition saying whether the feature succeeded — no "roughly". |
| **INVEST** | Six quality tests on each criterion (Independent, Negotiable, Valuable, Estimable, Small, Testable). |
| **Tier (T1/T2/T3)** | The size of the spec: T1 a micro-feature, T2 a standard feature, T3 a complex one. |
| **Quality Brief** | The visual or technical contract BOB gets approved *before* coding — its type is set in `STACK.md`. |
| **Aesthetic Brief** | The Quality Brief when the type is aesthetic: direction, typography, palette, tension, composition. |
| **Ralph Loop** | BOB's six build steps: Structure → Scaffold → Core → UI → States → Polish. |
| **Motion level (L0–L3)** | How much animation is allowed (L0 none, L3 cinematic) — decided in the spec, not by BOB. |
| **ADR** | Architecture Decision Record: a structural decision written down and archived, so it is not re-argued. |
| **JTBD** | Job-to-be-done: what the user is actually trying to accomplish, phrased "When… I want… so that…". |
| **Proof / assertion** | One line of runnable code per criterion a machine can decide — BOB runs it before handing over. |
| **Score /20** | ANALYZER's mark across 4 dimensions — below 18, nothing is committed. |
| **user_level** | The `STACK.md` setting that adapts the conductor: `junior` (guided, options proposed) or `expert` (terse). |
| **Learnings** | What ANALYZER writes after each feature — RAY reads them to improve the next specs. |

---

## Why each gate exists (explain this in junior mode)

| Gate | Why it is there |
|---|---|
| **Pre-flight `client_vision`** (RAY) | A spec built on a vague problem produces the wrong feature — we check we know *for whom* and *why* before writing. |
| **Spec validation** (RAY → BOB) | Freezing scope at the right moment stops the feature swelling mid-build. Your "validated" is the point of no return. |
| **Quality Brief** (BOB) | Deciding the visual direction *before* the code costs ten times less than correcting it after. It is a contract, not a formality. |
| **Brief vs spec check** (BOB) | The brief comes after the freeze, so it can contradict it. Both documents were approved; only you can decide which one moves. |
| **Score ≥ 18/20** (ANALYZER) | The commit is only allowed when the quality is there — the threshold protects the codebase from a silent "good enough". |

> In junior mode, when you reach a gate, explain *why* it exists first (one sentence from here),
> then ask for the decision. In expert mode, apply the gate without commenting on it.
