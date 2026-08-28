# visual_reference.md
> **Usage**: a BOB-level, project-agnostic resource.
> BOB consults it when RAY validates a new project **with no pre-existing design system**.
> Its role: anchor visual choices in curated references rather than generic hallucination.
> It does NOT replace a project's `design_guide.md` — it precedes and informs it.

---

## How to use this file

1. **RAY validates a spec** with no design system defined → BOB opens this file
2. BOB identifies the closest **product category**
3. BOB picks an aligned palette + type pairing and adapts them to the real context
4. BOB documents the choices in the project's `design_guide.md`, with the reason

> ⚠️ These references are **starting points**, not templates to copy-paste.
> The aesthetic rule stays on top: if a reference reads generic in context, deviate.

---

## 🎨 Colour palettes — by product category

Chaque palette est un système de tokens complet (variables CSS compatibles Shadcn/ui / Tailwind).
Source : ui-ux-pro-max v2.5.0, filtrées pour les profils de produits fréquents dans ce stack.

### SaaS & Product Tools

| Product | Primary | Secondary | Accent | BG | Notes |
|---|---|---|---|---|---|
| SaaS générique | `#2563EB` | `#F1F5F9` | `#EA580C` | `#FFFFFF` | Trust blue + orange CTA — contraste élevé |
| Dashboard analytics | `#6366F1` | `#EEF2FF` | `#06B6D4` | `#F8FAFC` | Indigo tool + cyan data emphasis |
| Design tool / créatif | `#7C3AED` | `#F5F3FF` | `#F59E0B` | `#FAFAFA` | Violet craft + amber highlight |
| Dev tool / CLI | `#16A34A` | `#F0FDF4` | `#D97706` | `#0A0A0A` | Code green sur dark + amber warning |
| Project management | `#0F172A` | `#F1F5F9` | `#3B82F6` | `#FFFFFF` | Slate authority + blue action |
| AI / LLM platform | `#8B5CF6` | `#F5F3FF` | `#10B981` | `#0F0F1A` | Violet neural + green output sur dark |

### Editorial & Portfolio

| Product | Primary | Secondary | Accent | BG | Notes |
|---|---|---|---|---|---|
| Portfolio / Personal brand | `#0F172A` | `#F8FAFC` | `#6366F1` | `#FFFFFF` | Typographie-driven, accent discret |
| Blog / Newsletter | `#1C1917` | `#FAFAF9` | `#DC2626` | `#FFFBF7` | Warm stone + rouge éditorial |
| Documentation / Knowledge base | `#1E293B` | `#F1F5F9` | `#0EA5E9` | `#FFFFFF` | Slate lisible + sky pour liens |
| Media / Magazine | `#18181B` | `#F4F4F5` | `#F97316` | `#FAFAFA` | Zinc neutre + orange journalistique |

### Fintech & Pro

| Product | Primary | Secondary | Accent | BG | Notes |
|---|---|---|---|---|---|
| Financial dashboard | `#0F172A` | `#F8FAFC` | `#22C55E` | `#FFFFFF` | Dark authority + vert positif |
| Fintech / Banking | `#1D4ED8` | `#EFF6FF` | `#0F172A` | `#FFFFFF` | Bleu institutionnel, 0 ornement |
| Legal / Compliance | `#292524` | `#FAFAF9` | `#7C3AED` | `#FAFAF9` | Stone sobre + violet signature |

### E-commerce & Consumer

| Product | Primary | Secondary | Accent | BG | Notes |
|---|---|---|---|---|---|
| E-commerce premium | `#1C1917` | `#F5F5F4` | `#D97706` | `#FFFFFF` | Stone + gold — positionnement haut |
| Marketplace | `#0F172A` | `#F1F5F9` | `#F59E0B` | `#FFFFFF` | Autorité + amber appel à action |
| SaaS B2C / App mobile | `#EC4899` | `#FDF2F8` | `#0891B2` | `#FFFFFF` | Rose bold + cyan contraste |

### Dark Mode First

| Product | Primary | Secondary | Accent | BG | Notes |
|---|---|---|---|---|---|
| Developer platform | `#F8FAFC` | `#1E293B` | `#818CF8` | `#0F172A` | Dark slate + indigo medium |
| Creative / Motion tool | `#E2E8F0` | `#1E293B` | `#A78BFA` | `#09090B` | Zinc dark + violet doux |
| Cybersecurity / Infra | `#00FF41` | `#0D1117` | `#FF6B35` | `#0D1117` | Terminal green + orange alerte |

---

## 🔤 Font pairings — by register

Pairings curatés depuis 73 combinaisons. Format : `Heading / Body` + imports.
Prioriser des combinaisons **non-génériques** — éviter Space Grotesk / Inter / système seuls.

### Register — Editorial & Portfolio

```
Fraunces / DM Sans
→ Serif organique + sans clean. Chaleureux, distinctif.
→ @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,700;1,300&family=DM+Sans:wght@400;500&display=swap')
→ Best for : portfolio personnel, newsletter, blog premium
```

```
Playfair Display / Source Sans 3
→ Contraste serif/sans classique revisité. Lisibilité maximale.
→ @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@400;600&display=swap')
→ Best for : editorial, journalisme, documentation premium
```

```
DM Serif Display / Lato
→ Serif display doux + sans neutre. Élégance sans ostentation.
→ @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Lato:wght@300;400;700&display=swap')
→ Best for : portfolio créatif, personal brand, consulting
```

### Register — SaaS & Tools

```
Syne / Inter
→ Syne géométrique distinctif en heading — Inter en body pour lisibilité.
→ @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap')
→ Best for : SaaS tool, dashboard, platform B2B
```

```
Cabinet Grotesk / Satoshi
→ Deux grotesques modernes qui se différencient par le poids. Contemporain tech.
→ Disponible via Fontshare (gratuit) : fontshare.com
→ Best for : startup SaaS, design tool, AI platform
```

```
General Sans / Epilogue
→ General Sans (geometric, neutre) + Epilogue (variable, expressif). Stack polyvalent.
→ Disponible via Fontshare
→ Best for : product tool, app mobile, dashboard analytics
```

```
Clash Display / Switzer
→ Clash Display très distinctif en display — Switzer clean en body.
→ Disponible via Fontshare
→ Best for : startup tech à forte identité, design-forward SaaS
```

### Register — Brutalist / Strong character

```
Space Mono / IBM Plex Sans
→ Mono heading assumé + IBM humaniste. Honnêteté technique.
→ @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&family=IBM+Plex+Sans:wght@400;500;600&display=swap')
→ Best for : dev tool, CLI, documentation technique, terminal-inspired
```

```
Unbounded / DM Sans
→ Unbounded très large + DM Sans sobre. Tension forte/doux.
→ @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=DM+Sans:wght@400;500&display=swap')
→ Best for : marque forte, splash page, creative agency
```

```
Basement Grotesque / Inter (Neubrutalism)
→ Display ultra-bold + corps neutre. Tension graphique maximale.
→ Basement via basement.studio (gratuit)
→ Best for : neubrutalism, startup bold, landing page à fort caractère
```

### Register — Finance / Institutional

```
Neue Haas Grotesk / Suisse Int'l
→ La référence institutionnelle. Impeccable mais nécessite licence Adobe/Monotype.
→ Fallback gratuit : Hahmlet (Google) / Plus Jakarta Sans
→ Best for : fintech, legal, institutional SaaS
```

```
Libre Baskerville / Source Sans 3
→ Serif académique + sans lisible. Confiance + clarté.
→ @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@400;600&display=swap')
→ Best for : finance, compliance, rapport annuel, legal tech
```

### Typical Tailwind config (adapt it)

```js
// tailwind.config.js
fontFamily: {
  heading: ['Fraunces', 'serif'],       // remplacer selon choix
  body: ['DM Sans', 'sans-serif'],       // remplacer selon choix
  mono: ['Space Mono', 'monospace'],
}
```

---

## 🖼️ UI styles — decision matrix

Pour chaque feature, BOB se pose la question : **quel registre visuel le contexte produit appelle-t-il ?**

| Style | When to use it | When to avoid it | Key tokens |
|---|---|---|---|
| **Minimalisme éditorial** | Portfolio, blog, documentation | Gamification, consumer app | Beaucoup d'espace blanc, typo-driven, 0 dégradé |
| **Flat + couleurs franches** | SaaS B2B, dashboard, outil interne | Luxury, premium, éditorial | Palette restreinte, composants solides, lisibilité max |
| **Neubrutalism** | Startup bold, landing page, créatif | Finance, médical, enterprise | Borders épaisses, couleurs primaires, pas d'ombres douces |
| **Dark mode first** | Dev tool, data platform, creative tool | Consumer grand public, e-commerce | Background `#0D1117` ou `#09090B`, accents lumineux |
| **Glassmorphism** | App mobile premium, feature showcase | Dashboard dense, accessibilité critique | `backdrop-blur`, `bg-white/10`, nécessite image de fond |
| **Bento Grid** | Dashboard, feature page, portfolio | Formulaires, flux linéaires | Grilles asymétriques, cartes de tailles variées |
| **Typographie seule** | Portfolio, newsletter, personal brand | App data-dense | Hiérarchie type uniquement, couleurs quasi-neutres |

---

## 📐 Assembly rules (BOB)

1. **Palette and type must tell the same story.** Editorial Fraunces on a fintech palette is dissonance. Align the register.
2. **Choose a tension.** The best interfaces play one opposition: `serif / sans`, `dark ground / vivid accent`, `bold heading / light body`. Name the tension before coding.
3. **At most two type families** per project. A third, if mono, is for code only.
4. **The starting palette is not the final palette.** These entries are anchors — adjust the HSL values for the specific context.
5. **Document the choice** in the project's `design_guide.md`: which reference, why, what was adapted.

---

*Source: ui-ux-pro-max v2.5.0 (nextlevelbuilder) — selective extraction, June 2026*
*Worth refreshing if the project moves into new product profiles.*
