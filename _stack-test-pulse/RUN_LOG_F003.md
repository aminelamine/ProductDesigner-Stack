# RUN LOG — Pulse run 3 · the mechanisms that had never been measured
> Date 2026-08-28 · stack v3.1.1 (local templates) · modules core + design · `user_level: junior`
> Target: `/pds` conductor, the aesthetic gate as a *shipped* file, the git guardrails, and the
> §3b proof rule. None of these existed at the 2026-08-20 run.
> Sandbox: a fresh Next-shaped TypeScript project, `npx pds-stack install` from local templates.

---

## 0 · Install

```
✓ STACK.md   ✓ CLAUDE.md   ✓ agent-system/   ✓ module: design
✓ Claude Code (.claude/)   ✓ .git/hooks/commit-msg   ✓ .git/hooks/pre-commit
```

`user_level: junior` written to STACK.md. Entry points present. **First mechanism check passed.**

## 1 · STEP 1 — context bootstrap → FAILED (finding F1)

flow.md STEP 1a detects `[À COMPLÉTER]` / `[Fill…]`. The shipped English templates contain
neither in `roadmap.md` or `design_guide.md`. A conductor reading its own flow declares
"Contexte en place." on two empty files and proceeds to RAY.

Context was written by hand to let the rest of the cycle be measured.

## 2 · RAY

```
[RAY] Pre-flight — client_vision.md → 4/4 checked. PASS.
[RAY] Routing: reco clear (>80%) — on-roadmap P1/F-001, no new dependency. Skipping challenge.
[RAY] T2 — Changelog digest list
      ADR check: ADR-001 / 004 / 006 cover it — no new ADR.
      spec → specs/active/feature_001_changelog_digest.md · status: DRAFT
```

7 acceptance criteria, `## OUT OF SCOPE` present, dependencies declared.

## 3 · The spec gate, mechanically

Attempted a code commit against the DRAFT spec:

```
✗ Spec not validated — no code before the Talent validates it.
      agent-system/specs/active/feature_001_changelog_digest.md
      status: DRAFT
```

**Commit refused.** Talent then set `status: VALIDATED`. This gate has never been mechanical
before; it held on its first real use.

## 4 · BOB — Quality Brief

Emitted from the shipped `BOB_aesthetic_gate.md`: Direction · Typography · Palette · Tension ·
Composition · Avoid here. Stopped and waited. Approved by Talent. (Protocol file is French in an
`language_agents: en` project — finding F2.)

## 5 · BOB — §3b proof → the rule did not run (finding F3)

Three attempts, all failing, before one worked with no new dependency:

```
node lib/changelog/changelog.check.ts   → ERR_MODULE_NOT_FOUND (extensionless imports)
imports rewritten to .ts                → TS5097 allowImportingTsExtensions
import assert from "node:assert/strict" → TS2307, needs @types/node
```

What worked — compile with the `tsc` that `strict_mode: true` already requires:

```
[BOB] 🔬 Proof — feature_001
  CA-1 parseCommit reads type/scope/subject, null on non-conventional  ✓ passed
  CA-2 groupByDay orders days desc, commits within a day desc          ✓ passed
  CA-3 no commit is dropped — input count equals output count          ✓ passed
  CA-4 filterByType narrows by type; null returns everything           ✓ passed
```

## 6 · Commits through the guardrails

```
chore(feature_001): add badge, button, separator, skeleton primitives   Ref: feature_001 | spec:CA-5
feat(feature_001): add changelog parse, group and filter logic with proof   Ref: … | spec:CA-1..CA-4
feat(feature_001): add digest view with type filter and states          Ref: … | spec:CA-5,CA-6,CA-7
```

Each passed `✓ constraints hold` and `✓ feature_001 — spec VALIDATED`. Two hook messages proved
wrong along the way — findings F4 and F5.

## 7 · ANALYZER — 16/20 · SHIPPED WITH NOTES

Caught a MAJOR defect BOB had self-passed, and **proved it by running code** rather than by
reading:

```
1 commit in the repo, filter "fix" → 0 groups → UI renders "No commits yet"
```

`ChangelogDigest.tsx:15` derives the empty state from the post-filter count, while CA-7 specifies
it for "when the repo has zero commits". Routed to BOB. A CA-5 wording ambiguity was routed to RAY.

---

## What this run establishes

| Mechanism | First measured here | Verdict |
|---|---|---|
| Install ships working entry points | yes | holds |
| `/pds` STEP 1 context bootstrap | yes | **fails — F1** |
| Aesthetic gate as a shipped file | yes | holds (French-only — F2) |
| commit-msg spec gate | yes | holds |
| pre-commit ADR-004 / line cap / tsc | yes | holds, two messages wrong — F4, F5 |
| §3b proof rule | yes | **fails as written — F3** |
| ANALYZER proving instead of inspecting | yes | holds, and caught a real defect |
