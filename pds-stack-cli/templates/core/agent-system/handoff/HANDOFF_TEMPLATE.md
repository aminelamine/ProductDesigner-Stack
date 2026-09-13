# Handoff — dev-ready spec

> Produced by `design:design-handoff`, after PRODUIRE and before JUGER.
> Not a gate — a transfer document. It does not decide anything; it records what DIRECTION and
> CADRE already decided, in a form a developer who was not in the room can act on.

---

```
handoff_id: [H-NNN]
date: [YYYY-MM-DD]
source: [Figma frame URL | Penpot | Framer — the tool the frame lives in today]
direction_ref: [memory/directions/NNN — the approved direction this implements]
status: [draft | ready for dev]
```

## Scope

[What this handoff covers — one screen, one component, one flow. Not the whole file.]

## Tokens used

[Pulled from `memory/design-system/registries/` — color, spacing, type. A token this handoff
needs and the registry doesn't have is a registry gap: flag it here, never invent one and
present it as if it existed.]

## States & behavior

[Every interactive state the frame carries — default, hover, focus, active, disabled, loading,
error, empty. For each: what changes, and what triggers it.]

## Motion

[Level per `STACK.md → motion_default` (L0–L3). What animates, on what trigger, duration/easing.]

## Responsive

[Breakpoints that matter for this scope. What reflows, what hides, what stays fixed.]

## Out of scope

[What the frame shows but this handoff does NOT cover — an adjacent screen, a state not designed
yet. Explicit, so the developer doesn't guess it either.]

## Open questions for dev

[Anything the design can't resolve alone — a data shape, an API constraint, a performance
tradeoff.]
