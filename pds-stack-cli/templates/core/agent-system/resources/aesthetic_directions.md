# aesthetic_directions.md
> **Usage**: a library of **pre-argued aesthetic directions**, ready to propose.
> It serves **junior mode** of the `/pds` conductor and the `frontend-design` skill: when the user
> does not yet have the taste to settle an Aesthetic Brief, the agent offers **2–3 complete
> directions** (not a catalogue to assemble) and lets them choose.
>
> Each direction **composes** existing entries from [`visual_reference.md`](./visual_reference.md)
> (palette + pairing + style + tension) and adds what a beginner is missing: *when it fits, when to
> avoid it, and the trade-off*. Nothing is reinvented — it is packaged and argued.

---

## How the agent uses it

1. Read the **product type** from `client_vision.md` (persona, JTBD, values).
2. Select the **2–3 directions** whose "Fits" matches best.
3. Present them as a block with a **recommendation** ("I'd go with X because…").
4. The Talent chooses or adjusts → the agent anchors the choice in `design_guide.md`, never on their behalf.

> These are **argued starting points**, not templates. The rule still holds: palette and typography
> must tell the same story, and you deviate when the context demands it.

---

## D1 — Honest Terminal
**In one sentence**: a technical tool, dark and dense, where every element has the weight of a code ticket.
**Fits**: dev tool, CLI, technical dashboard, data platform for developers.
**Avoid if**: mainstream consumer, marketing, warm content.
**Palette**: *Dev tool / CLI* — `#16A34A` on `#0A0A0A` + amber `#D97706` (warning). *(visual_reference → SaaS & Tools)*
**Type**: *Space Mono / IBM Plex Sans* — a deliberate mono heading + a readable humanist body.
**Tension**: mono heading / clean body · dark ground / luminous accent.
**Style**: Dark mode first.
**Trade-off**: austere — excellent for a technical audience, off-putting for everyone else.

## D2 — Editorial Warmth
**In one sentence**: typography as the only design, the warmth of paper, settled reading.
**Fits**: portfolio, blog, newsletter, personal brand, manifesto page.
**Avoid if**: data-dense app, dashboard, complex forms.
**Palette**: *Blog / Newsletter* — stone `#1C1917` + editorial red `#DC2626` on `#FFFBF7`. *(visual_reference → Editorial)*
**Type**: *Fraunces / DM Sans* — organic serif + clean sans.
**Tension**: expressive serif / neutral sans · extreme weights (300 / 700).
**Style**: Typography alone.
**Trade-off**: beautiful for content, unsuited the moment you must display a lot of data.

## D3 — SaaS Trust
**In one sentence**: a legible, solid B2B tool — efficiency before ornament.
**Fits**: B2B SaaS, dashboard, internal tool, product platform.
**Avoid if**: luxury, editorial, premium positioning.
**Palette**: *Generic SaaS* — trust blue `#2563EB` + CTA orange `#EA580C` on `#FFFFFF`. *(visual_reference → SaaS & Tools)*
**Type**: *Syne / Inter* — a distinctive geometric heading + an ultra-readable body.
**Tension**: distinctive heading / neutral body.
**Style**: Flat with frank colour.
**Trade-off**: reassuring and fast to read, but forgettable unless the identity is pushed elsewhere.

## D4 — Sober Institutional
**In one sentence**: trust and clarity, zero ornament — it does not seduce, it reassures.
**Fits**: fintech, legal, compliance, reporting, anything trust-critical.
**Avoid if**: playful, bold, young consumer products.
**Palette**: *Fintech / Banking* — institutional blue `#1D4ED8` on `#FFFFFF`, no ornament. *(visual_reference → Fintech & Pro)*
**Type**: *Libre Baskerville / Source Sans 3* — academic serif + readable sans.
**Tension**: serif of trust / clear sans.
**Style**: Sober minimalism / flat.
**Trade-off**: credible and serious, but can read cold or dated if the balance is off.

## D5 — Bold Startup
**In one sentence**: launch energy, strong graphic tension, an identity that lands.
**Fits**: landing page, splash, strong brand, design-forward product.
**Avoid if**: enterprise, medical, finance, any trust-critical context.
**Palette**: *B2C SaaS* — bold pink `#EC4899` + contrasting cyan `#0891B2` on `#FFFFFF`. *(visual_reference → E-commerce & Consumer)*
**Type**: *Clash Display / Switzer* — a very distinctive display + a clean body. *(or Unbounded / DM Sans)*
**Tension**: ultra-bold display / neutral body.
**Style**: Neubrutalism or bento grid.
**Trade-off**: memorable and differentiating, but tiring over long use and risky in B2B.

---

## Note for the expert
In `user_level: expert`, the agent does not walk through these directions: it goes straight to
`visual_reference.md` and composes. This library is **scaffolding to build judgment**, not a
constraint — once the taste is there, you do without it.
