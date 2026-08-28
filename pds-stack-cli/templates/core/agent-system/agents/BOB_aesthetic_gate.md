# Frontend Design — Aesthetic Brief

> Canonical file, tool-independent. This is BOB's aesthetic gate protocol
> (`quality_brief_type: aesthetic` in `STACK.md`), loaded by BOB's system prompt
> (`agent-system/agents/BOB_system_prompt.md`) whatever tool runs it.
>
> It fires automatically when BOB starts implementing a UI feature. Its job: commit to a **clear,
> explicit aesthetic direction** BEFORE the first line of code. Two to three minutes here saves
> thirty to sixty minutes of rework.
>
> **LANGUAGE** — read `STACK.md → language_agents`: `en` produce the brief in English, `fr` in French.
> This file is English like every other agent prompt; the dial controls what you write, not what you read.
>
> **Terminology**: BOB's gate is the **Quality Brief** (the umbrella — see `quality_brief_type` in
> `STACK.md`: aesthetic | performance | content | architecture). When `quality_brief_type: aesthetic`
> — the default — the Quality Brief takes the form of the **Aesthetic Brief** described here (5 dimensions).

---

## Philosophy

Good frontend does not start with code — it starts with an **intention**. That intention must be
specific, memorable, and coherent with the product context.

**Cardinal rule: "Match implementation complexity to aesthetic vision."**
A maximalist design deserves elaborate code. A minimalist design demands typographic precision,
nothing more. Elegance comes from executing the vision faithfully — not from accumulating detail.

---

## Activation protocol (BOB runs this before any UI implementation)

### Step 1 — Read the context

In this order:

1. `agent-system/specs/feature_[ID].md` → extract: feature type, tone, audience, UI complexity, visual criteria
2. `agent-system/context/design_guide.md` → is an aesthetic direction already defined for this project?
3. `agent-system/resources/visual_reference.md` → identify palette + font pairing candidates

> If `design_guide.md` already holds a defined, validated direction → go straight to Step 3
> (summarise the alignment, do not reinvent).
>
> **Junior mode (guided proposal)**: if `STACK.md → user_level: junior` (or the user has no
> direction in mind), do not start from the raw catalogue. Open
> `agent-system/resources/aesthetic_directions.md` and propose **2–3 complete, pre-argued
> directions** ("pick if / avoid if / trade-off") filtered by product type, with a recommendation.
> The junior chooses between coherent options rather than assembling one from parts.
>
> **Option — Savee MCP connected**: if the `savee` MCP is available in the session, use it
> alongside `visual_reference.md` (never instead of it) — `search` to find real references aligned
> with the product type and the intended direction, `view_saves` to inspect palette and composition
> on the images you keep. Useful for grounding Step 2 in current inspiration rather than a static
> catalogue alone.
>
> **Option — Refero MCP connected**: if the `refero` MCP is available, use it for UX structure
> rather than visual mood — search real screens and flows by pattern (onboarding, paywall, empty
> state, permissions…) with structured metadata (layout, UX/UI patterns). It complements Savee:
> Savee for visual inspiration (palette, composition, tension), Refero for functional structure
> (hierarchy, layout, flow) — use either, both, or neither depending on the feature.
>
> Both MCPs are optional: if they are not connected, ignore them and continue with
> `visual_reference.md`.

---

### Step 2 — Aesthetic positioning (if not already defined)

Define the **5 dimensions**, testing each choice against the spec's real context:

**1. Overall direction**
What is the intention, in one sentence? It must be specific and memorable.
- ✅ "Typography-driven, warm, editorial — like a design magazine"
- ✅ "Dark CLI terminal, honest and technical — zero ornament"
- ✅ "Bold startup energy, strong graphic tension, optimistic"
- ❌ "Minimal and modern" → too generic, start again

**2. Typography**
Pick one pairing from `visual_reference.md`. Justify it in five words or fewer.
- Align the pairing's register with the overall direction
- Prefer **high-tension** pairings: serif/sans, display/mono, variable font at extreme weights
- Banned without strong contextual justification: Inter alone, Roboto, Arial, system fonts

**3. Palette**
Pick one system from `visual_reference.md`. Configure the CSS variable tokens.
- The palette must **tell the same story** as the typography
- Avoid the purple-gradient-on-white temptation: that is the "AI default"
- Prefer: a strong dominant + a sharp accent + a coherent ground

**4. Visual tension**
Which opposition creates interest and avoids the template?
- Bold heading / ultra-light body
- Dark background / luminous accent
- Expressive serif / neutral sans
- Dense in one zone / generous white space elsewhere

**5. Spatial composition**
How space is organised — what separates this from a "classic layout":
- Deliberate asymmetry (off-centre grids)
- Overlapping blocks (cards that break their container)
- Typography alone as the design (no background trick)
- Bento grid (varied proportions, not all identical)
- Full-bleed sections with hard cuts
- Scroll-triggered reveals (staggered animation-delay)

---

### Step 3 — Aesthetic Brief (standardised output)

BOB produces this block and **presents it to the Talent before coding**.
It is a **visual contract**, not a summary. BOB stops here and waits for an explicit answer.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[AESTHETIC BRIEF — Feature [ID]: [Name]]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Direction    : [1 sentence — the specific intention]

🔤 Typography   : [Heading font] / [Body font]
                  → [reason in 5 words]
                  → @import : [Google Fonts URL or Fontshare source]

🎨 Palette      : [reference from visual_reference.md]
                  Primary : [hex] · Accent : [hex] · BG : [hex]

⚡ Tension      : [the chosen opposition — e.g. "expressive serif / neutral sans"]

📐 Composition  : [spatial approach — e.g. "asymmetric bento + stagger reveal"]

⚠️  Avoid here  : [2–3 generic patterns specific to this context]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Approve in one line, or tell me what to adjust.
```

> **[BOB] ⏸ Waiting for brief approval — I do not start implementing before your confirmation.**
>
> The Talent answers "ok" or adjusts one or two points. This gate is a point of no return:
> once approved, the direction is committed and every code choice follows from it.
> Correcting a direction after the code exists costs ten times what it costs here.

---

### Step 4 — Anchor it in code (after approval)

Once the Talent has approved the brief:

1. **CSS variables** — configure `:root` in `globals.css` with the brief's tokens
2. **Fonts** — load through `next/font` (preferred) or `@import` in `layout.tsx` (fallback)
3. **Document** — if the choices are not yet in `design_guide.md`, add them there now

```css
/* Expected :root structure */
:root {
  --color-primary: [hex];
  --color-accent: [hex];
  --color-bg: [hex];
  --font-heading: '[Heading font]', serif; /* or sans-serif */
  --font-body: '[Body font]', sans-serif;
}
```

---

## Invariant rules

- **Never skip the brief** to "save time" — the brief is what saves the UI rework
- **Never recycle** a previous feature's brief without testing it against the new context
- **Never pick** a pairing or a palette without justifying it from the spec context
- **If design_guide.md already holds a direction** → summarise the alignment in one line, confirm, move on
- **The brief must be specific**: "editorial typography-driven" beats "minimal and modern"
- **Always present the brief to the Talent** before implementing — even when the choice seems obvious

---

## Example of an approved brief

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[AESTHETIC BRIEF — Feature 003: Manifesto section]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Direction    : Editorial hauntology — typography as the only design,
                  the warmth of paper, a blurred time between past and future

🔤 Typography   : Fraunces (italic 300, bold 700) / DM Sans (400, 500)
                  → organic serif against clean sans
                  → @import : fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,700;1,300&family=DM+Sans

🎨 Palette      : Blog / Newsletter (visual_reference.md)
                  Primary : #1C1917 · Accent : #DC2626 · BG : #FFFBF7

⚡ Tension      : Fraunces italic light (300) / DM Sans medium (500) — extreme weights

📐 Composition  : Typography alone — no background trick, asymmetric columns,
                  stagger reveal on paragraphs (animation-delay 100ms per block)

⚠️  Avoid here  : Cards with border-radius, purple gradients, uniform grid
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Approve in one line, or tell me what to adjust.
```
