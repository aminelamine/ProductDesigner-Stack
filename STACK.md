# STACK.md — PDS Stack configuration
# Edit to match your project constraints.
# All agents (RAY, BOB, ANALYZER) read this file before every session.

framework: nextjs          # nextjs | nuxt | sveltekit | astro | remix | vite
language: typescript       # typescript | javascript | python | ruby | other
ui_lib: shadcn             # shadcn | radix | mantine | tailwind-only | none
strict_mode: true          # true: enforces zero `any`, zero @ts-ignore
line_cap: 150              # max component lines before mandatory split
motion_default: L0         # L0 (CSS only) | L1 (motion lib, 3 divs max) | L2 (AnimatePresence) | L3 (GSAP, RAY validation required)
quality_brief_type: aesthetic  # aesthetic | performance | content | architecture

# Modules installed
modules:
  core: true          # always required — RAY + BOB + ANALYZER + all gates
  discovery: false    # EVE agent + PROBLEM_BRIEF_TEMPLATE
  delivery: false     # SHIP agent + RELEASE_TEMPLATE
  design: true        # extended design_guide, motion system L0–L3, Figma bridge
  epic: false         # epic template + T3 spec parent structure

# Agent language
# EN: agents respond in English, templates in English
# FR: agents respond in French, templates in French
# Applies to: [RAY] [BOB] [ANALYZER] [EVE] [SHIP] signals and generated file content
language_agents: en    # en | fr
