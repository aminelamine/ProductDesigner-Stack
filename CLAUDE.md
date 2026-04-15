# CLAUDE.md — Contexte Global du Projet
> Ce fichier est chargé automatiquement par Claude Code à chaque session.
> Il bootstrappe le système multi-agents JO / BOB / DO.

---

## 🗺️ Ce projet

Ce projet suit un workflow multi-agents structuré en 3 phases : **PLAN → SHIP → ANALYZE**.
Avant toute action, identifie dans quelle phase tu te trouves et quel agent tu incarnes.

**Stack technique :** Next.js · TypeScript strict · Tailwind CSS · Shadcn/ui · Lucide React
**Stack design :** Figma Desktop + figma-console-mcp (write access) + Bridge DS `/design-workflow`

> 🤖 Agents : **JO** (Strategist) · **BOB** (Builder) · **DO** (QA)

---

## 📄 Fichiers de contexte partagés

Lis ces fichiers en priorité au début de chaque session :

| Fichier | Contenu | Lu par |
|---|---|---|
| `agent-system/context/client_vision.md` | Vision client, JTBD, contraintes | JO, DO |
| `agent-system/context/roadmap.md` | Features, KPIs, backlog, out-of-scope | JO, BOB |
| `agent-system/context/design_guide.md` | Tokens UI, composants Shadcn autorisés, anti-patterns | BOB, DO |
| `agent-system/resources/visual_reference.md` | Palettes, font pairings, styles UI — référence projet-agnostique | BOB |

---

## 📁 Arborescence clé

```
.claude/
├── commands/          → Slash commands agents (jo, bob, do, design-workflow + aliases)
└── skills/
    ├── design-workflow/   → Bridge Figma ↔ Spec (agent stack)
    ├── frontend-design/   → Brief Esthétique BOB (agent stack)
    ├── newsletter-obsolet/    → Skill contenu (Obsolet)
    ├── product-idea-capture/  → Skill contenu (Notion ideas)
    └── social-media-post/     → Skill contenu (LinkedIn)

agent-system/
├── context/           → client_vision, roadmap, design_guide
├── specs/
│   ├── active/        → Specs en cours (source unique — JO écrit ici)
│   ├── backlog/       → Specs en attente
│   ├── shipped/       → Specs livrées et validées DO ≥ 18/20
│   ├── dropped/       → Specs abandonnées
│   └── feature_template.md
├── agents/            → System prompts JO, BOB, DO
├── adr/               → Architecture Decision Records
├── docs/              → Schémas visuels (stack-schema, system-map)
├── learnings/         → Mémoire longue DO (patterns récurrents entre features)
├── sessions/          → Checkpoints BOB (résilience Ralph Loop)
├── resources/         → visual_reference.md
└── templates/         → agent-stack-template (boilerplate réutilisable)
```

---

## 🤖 Les agents disponibles

Utilise les slash commands pour activer chaque agent :

| Command | Agent | Phase | Action |
|---|---|---|---|
| `/jo` | JO — Architecte & Strategist | PLAN | Challenge une idée, génère une spec |
| `/design-workflow` | Bridge DS — Designer Figma | DESIGN | Génère un frame Figma depuis une spec JO |
| `/bob` | BOB — Builder & UI/UX | SHIP | Implémente une spec en code Next.js |
| `/do` | DO — Product QA & CX | ANALYZE | Évalue le code livré, rend un verdict /20 |

---

## 🔄 Workflow complet

```
1. /jo               → "j'ai une idée : [description]"
                      → JO challenge + génère agent-system/specs/active/feature_[ID].md

2. /design-workflow  → "spec feature_[ID]"          ← optionnel, recommandé pour features visuelles
                      → Bridge DS lit la spec + génère le frame Figma

3. /bob              → "implémente feature_[ID]"
                      → BOB lit la spec + design_guide + frame Figma (si existant)
                      → BOB génère un Brief Esthétique (.claude/skills/frontend-design)
                         ↳ Direction · Typo · Palette · Tension · Composition
                         ↳ [BOB] ⏸ En attente de validation — BOB s'arrête ici
                         ↳ Talent valide en 1 ligne → BOB code
                      → Ralph Loop avec signaux de progression :
                         [BOB] 📍 Étape 1/6 — Structure
                         [BOB] 📍 Étape 2/6 — Scaffold
                         [BOB] 📍 Étape 3/6 — Core Logic
                         [BOB] 📍 Étape 4/6 — UI
                         [BOB] 📍 Étape 5/6 — États
                         [BOB] 📍 Étape 6/6 — Polish

4. /do               → "évalue feature_[ID]"
                      → DO score /20 + verdict + feedbacks
```

> 💡 **Le Brief Esthétique est un gate obligatoire** — BOB s'arrête et attend ta confirmation avant de coder.
> Tu lis 5 lignes, tu dis "ok" ou tu ajustes. BOB te tient informé à chaque étape du Ralph Loop.

---

## 🚫 Règles invariantes

- Ne jamais coder sans brief esthétique validé par le Talent (gate BOB non négociable)
- Ne jamais coder sans spec validée (`statut: VALIDÉE TALENT` dans la spec)
- Ne jamais modifier les fichiers dans `/components/ui/` (Shadcn — ownership total)
- Ne jamais introduire une librairie UI non listée dans `design_guide.md` sans validation
- TypeScript strict : zéro `any`, zéro `@ts-ignore`
- Chaque composant fait < 150 lignes — découper si dépassement

---

## 🎨 Esthétique frontend (règle BOB)

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics. Consult `agent-system/resources/visual_reference.md` for curated non-generic pairings.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!

Bold Aesthetic Direction: Before writing any CSS, commit to a specific, memorable direction. "Dark CLI terminal, honnête et technique" or "typographie-driven éditorial, chaud comme du papier" beats "clean and modern". This direction must be visible in every line of code you write. See `.claude/skills/frontend-design/SKILL.md` for the full protocol.

Implementation Complexity: Match the complexity of your code to the vision. A maximalist layout warrants elaborate layering — CSS gradients, overlapping elements, staggered animations. A typographic-only design demands precision in spacing and weight contrasts, nothing more. Elegance comes from executing the vision well, not accumulating effects.

Spatial Composition: Actively avoid "template" layouts. Favor unconventional spatial choices: asymmetric grids, overlapping cards, bento layouts with varied proportions, full-bleed sections with sharp cuts, scroll-triggered staggered reveals. The layout itself should communicate design intent.
</frontend_aesthetics>
