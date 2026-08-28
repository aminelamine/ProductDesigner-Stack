# STACK.md — PDS Stack configuration (Pulse test project)
# Snapshot copied from repo root for the isolated stack test.

framework: nextjs
language: typescript
ui_lib: shadcn
strict_mode: true
line_cap: 150
motion_default: L0
quality_brief_type: aesthetic

modules:
  core: true          # RAY + BOB + ANALYZER + all gates
  discovery: false    # EVE not installed
  delivery: false     # SHIP not installed  → ANALYZER emits delivery WARNING, not block
  design: true        # extended design_guide + motion L0–L3
  epic: false

language_agents: en
