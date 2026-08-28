# Pulse run 3 — findings

## F1 · The conductor's bootstrap trigger does not match the shipped templates — BLOCKER

`orchestration/flow.md` STEP 1a:
> Lis les 3 fichiers de contexte et cherche des marqueurs `[À COMPLÉTER]` / `[Fill…]`
> Si les 3 sont complets (zéro marqueur bloquant) → « Contexte en place. » → STEP 2.

The shipped `templates/core/agent-system/context/*.md` contain **neither marker**:

| File | Placeholders actually present | Detected? |
|---|---|---|
| `client_vision.md` | `[Fill before /ray]`, `[Personas, jobs-to-be-done…]` | borderline — only if `[Fill…]` is read loosely |
| `roadmap.md` | `[Active sprint / phase]`, `[Prioritized list — …]` | **no** |
| `design_guide.md` | `[Colors, spacing, typography…]`, `[Which Shadcn/ui components…]` | **no** |

A conductor reading its own flow literally declares "Contexte en place." on two empty
templates and goes straight to RAY — which is exactly the failure the 2026-08-20 SCORING §5
flagged and that `/pds` STEP 1 was built to prevent. The onboarding claim ("nothing to fill in
by hand — the conductor interviews you") does not hold on a fresh install.

Root cause: flow.md is written in French against French markers; the shipped templates are
English and use free-form descriptive placeholders. The two were never checked against each
other, because nothing checks them — the parity script verifies that files *exist*, not that a
detection rule *matches its target*.

Severity: blocker for the headline onboarding path.

## F2 · The shipped gate protocol is French-only, regardless of `language_agents` — MINOR

`STACK.md` here is `language_agents: en`. `agent-system/agents/BOB_aesthetic_gate.md` — the
protocol BOB must load whenever `quality_brief_type: aesthetic`, i.e. the default — is written
entirely in French, including its output template (`🎯 Direction`, `⚠️ Éviter ici`,
`✅ Validez en 1 ligne`).

BOB can follow it and answer in English, so this is not a blocker. But the gate that the landing
page calls "the creative contract" hands an English-configured project a French form to fill in.
The same applies to `orchestration/flow.md` and `pds_conductor.md`.

Not a bug in the gate's logic — a distribution artefact: these files were written for this repo
(`language_agents: fr`) and shipped unchanged as templates.

## F3 · The §3b proof rule is not runnable as written — MAJOR

BOB §3b says: *"If it has none → do **not** install one. Write the assertions in a single plain
module (`lib/[feature]/[feature].check.ts`) and run it with whatever the project can already
execute."*

In a standard TypeScript project (`moduleResolution: bundler`, the Next.js default) there is no
such thing. Measured, in order:

| Attempt | Result |
|---|---|
| `node lib/changelog/changelog.check.ts` | `ERR_MODULE_NOT_FOUND` — Node's type-stripping loader needs file extensions; the codebase's imports are extensionless |
| Add `.ts` extensions to the imports | `TS5097` — needs `allowImportingTsExtensions`, and the extension would have to cascade through the product's own source files to satisfy a test harness |
| `import assert from "node:assert/strict"` | `TS2307` — needs `@types/node`, a dependency the rule forbids adding |

What actually worked, with zero new dependencies: **compile with the `tsc` that `strict_mode: true`
already requires**, and use a local equality helper instead of `node:assert`.

```bash
tsc lib/changelog/*.ts --outDir .proof --module commonjs --target ES2022 --strict --skipLibCheck
node .proof/changelog.check.js
```

The rule is right in intent and unusable in its current wording. It should name this path
explicitly, forbid `node:` imports in check files, and say that `.proof/` is disposable output.

This is the finding the run was for: the rule reads well and does not survive contact with a
real project. It was written and shipped without ever being executed.

## F4 · `components/ui/` exclusion silently downgrades real breakage — MINOR

The commit that introduced the four `components/ui/*.tsx` primitives produced four tsc errors,
all inside those exact files. The hook reported:

> ⚠ tsc reports pre-existing errors elsewhere — not from this commit

They were not elsewhere and not pre-existing — they were introduced by that commit. The cause is
that `components/ui/` is stripped from `staged` (it is Shadcn-owned, ADR-001), and the tsc
diagnostic filter reuses `staged`. So any type error in that directory is classified as somebody
else's problem.

Defensible by design — BOB does not author that directory — but the message is then untrue.
Either the filter should use the full staged set for tsc while keeping the ADR-004 and line-cap
checks scoped, or the wording should say "outside your authored files" rather than "pre-existing".

## F5 · The proof file trips the console.log warning, every commit — MINOR

`lib/changelog/changelog.check.ts` exists to print its assertion results. §3b requires BOB to
paste that output. The pre-commit hook then warns:

> ⚠ console.log left in code — ANALYZER deducts 1 pt for this

Same class as the CLI-script false positive fixed in 3.1.1: a file whose job is printing is
flagged for printing. The `*.check.ts` convention §3b establishes should be exempt from that
warning — otherwise the rule and the guard contradict each other on every single commit.
