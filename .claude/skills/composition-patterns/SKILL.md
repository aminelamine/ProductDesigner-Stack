---
name: vercel-composition-patterns
description: >
  React composition patterns (Vercel) — compound components, no boolean-prop proliferation,
  React 19 APIs. Fires ONLY when BOB splits a component over the line cap, designs a reusable
  component API during a build, or ANALYZER reviews component architecture. Never on a
  direction brief or an HTML prototype.
license: MIT
metadata:
  author: vercel
  version: '1.0.0'
  source: https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns
  vendored: 2026-09-28 — ADR-016
---

# React Composition Patterns

> **PDS — préséance (ADR-016).** Le découpage au-delà du plafond de lignes (STACK.md) suit ces
> patterns plutôt qu'un découpage arbitraire. `/components/ui/` n'est jamais touché :
> `react19-no-forwardref` ne s'applique pas au code Shadcn. Une règle qui contredit la spec ou
> un ADR ACCEPTED est levée et notée, pas appliquée.

Composition patterns for building flexible, maintainable React components. Avoid
boolean prop proliferation by using compound components, lifting state, and
composing internals. These patterns make codebases easier for both humans and AI
agents to work with as they scale.

## When to Apply

Reference these guidelines when:

- Refactoring components with many boolean props
- Building reusable component libraries
- Designing flexible component APIs
- Reviewing component architecture
- Working with compound components or context providers

## Rule Categories by Priority

| Priority | Category                | Impact | Prefix          |
| -------- | ----------------------- | ------ | --------------- |
| 1        | Component Architecture  | HIGH   | `architecture-` |
| 2        | State Management        | MEDIUM | `state-`        |
| 3        | Implementation Patterns | MEDIUM | `patterns-`     |
| 4        | React 19 APIs           | MEDIUM | `react19-`      |

## Quick Reference

### 1. Component Architecture (HIGH)

- `architecture-avoid-boolean-props` - Don't add boolean props to customize
  behavior; use composition
- `architecture-compound-components` - Structure complex components with shared
  context

### 2. State Management (MEDIUM)

- `state-decouple-implementation` - Provider is the only place that knows how
  state is managed
- `state-context-interface` - Define generic interface with state, actions, meta
  for dependency injection
- `state-lift-state` - Move state into provider components for sibling access

### 3. Implementation Patterns (MEDIUM)

- `patterns-explicit-variants` - Create explicit variant components instead of
  boolean modes
- `patterns-children-over-render-props` - Use children for composition instead
  of renderX props

### 4. React 19 APIs (MEDIUM)

> **⚠️ React 19+ only.** Skip this section if using React 18 or earlier.

- `react19-no-forwardref` - Don't use `forwardRef`; use `use()` instead of `useContext()`

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/architecture-avoid-boolean-props.md
rules/state-context-interface.md
```

Each rule file contains:

- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references

## Full Compiled Document

Not vendored (ADR-016): the compiled `AGENTS.md` is not shipped — read `rules/<rule>.md` only.
