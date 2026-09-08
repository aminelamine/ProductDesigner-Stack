# design_guide.md
> **Usage** : Ce fichier définit la philosophie UI/UX et les règles du design system pour ce projet.
> BOB le lit avant tout travail d'interface. ANALYZER s'y réfère pour évaluer la conformance.
> **Tokens, fonts et thème : renseignés depuis le dépôt le 2026-09-08** — ce sont des faits lus
> dans `components.json`, `app/globals.css` et `app/layout.tsx`, pas des propositions.
> Ce qui reste ouvert est la **direction** (hiérarchie, tension, composition) : elle se décide au
> Quality Brief esthétique de BOB, pas ici.

---

## 🎨 Philosophie de Design

### Principe directeur
> En 1 phrase : quelle est l'intention esthétique et fonctionnelle de ce produit ?

"Un outil de travail honnête et technique — dark, dense, lisible — où chaque feedback a le poids d'un ticket de code."

### Les 3 mots qui définissent l'UI
`Terminal` · `Précis` · `Dense`

### Ce que ça signifie concrètement pour BOB
- Fond sombre (near-black, pas du noir pur), typographie monospace pour les métadonnées, sans-serif clean pour le contenu lisible
- La hiérarchie est portée par le poids typographique et les micro-séparateurs — pas par des couleurs vives
- Les status badges utilisent des couleurs fonctionnelles (amber, emerald, slate) jamais décoratives

---

## 🏗️ Stack UI

| Outil | Rôle | Version |
|---|---|---|
| **Next.js** | Framework React (App Router) | `15.x` |
| **Tailwind CSS** | Utility-first styling | `4.x` |
| **Shadcn/ui** | Composants accessibles, ownership total | `latest` |
| **Lucide React** | Iconographie (sparingly) | `latest` |
| **IBM Plex Mono + IBM Plex Sans** | Mono pour meta/code, Sans pour contenu — cohérence IBM Plex | `latest` |
| **motion** | Animations React (L1–L2) — installé par défaut | `latest` |
| **gsap** | Animations cinématiques (L3 uniquement) — opt-in, validation RAY requise | `latest` |

> ⚠️ BOB ne doit **pas** introduire de librairie UI non listée ici sans validation du Talent.

---

## 🎭 Motion Design — Système de Niveaux

> Le niveau motion est une décision de spec, pas une décision de code.
> **RAY le définit dans la spec. BOB l'exécute. BOB ne choisit jamais le niveau lui-même.**
> En l'absence de `motion_level` dans une spec → BOB applique **L0** sans exception.

---

### Les 4 niveaux

#### L0 — Fonctionnel *(défaut)*
**Librairie :** aucune. Tailwind + CSS natif uniquement.
**Usage :** tout ce qui est fonctionnel — navigation, boutons, inputs, toasts.
**Ce qui est autorisé :**
- `transition-colors duration-150` sur les hover states
- `transition-opacity` sur les états de chargement
- `focus-visible:ring` sur les éléments interactifs
- `hover:` et `active:` Tailwind

**Règle :** si une animation peut être faite en CSS pur sans librairie, elle doit l'être.

---

#### L1 — Éditorial
**Librairie :** `motion` (`npm install motion`)
**Usage :** portfolios, dashboards, pages de contenu. Le niveau "sobre" enrichi.
**Ce qui est autorisé :**
- Une séquence d'entrée orchestrée par page (hero stagger au load)
- `useInView` + `motion.div` pour scroll reveals (fade-up discret)
- Maximum **3 `motion.div`** par page complète
- Durées : 300–500ms, easing `ease-out`

**Ce qui est interdit à ce niveau :**
- `AnimatePresence` (réservé L2+)
- Parallax
- Animations en boucle (`repeat: Infinity`)

---

#### L2 — Expressif
**Librairie :** `motion`
**Usage :** landing pages, case studies, features à fort impact visuel.
**Ce qui est autorisé :**
- Page transitions via `AnimatePresence`
- Layout animations (`layoutId` pour les éléments partagés)
- Orchestration de sections (groupes de stagger)
- Hover states enrichis (`whileHover`, `whileTap`)
- Durées : jusqu'à 700ms pour les séquences orchestrées

**Ce qui est interdit à ce niveau :**
- ScrollTrigger (réservé L3)
- Canvas ou WebGL
- Animations > 700ms sur des éléments isolés

---

#### L3 — Cinématique
**Librairie :** `motion` + `gsap` + `@gsap/react` *(opt-in — validation RAY obligatoire dans la spec)*
**Usage :** "wow moments" — onboarding flows, product demos, présentations.
**Ce qui est autorisé :**
- ScrollTrigger, timelines GSAP, sections épinglées
- Animations pilotées par scroll (`useScroll`, `useTransform`)
- Canvas/WebGL si justifié
- Durées : dictées par la narration, pas par une contrainte fixe

**Condition d'activation :** la spec doit contenir `motion_level: L3` ET une justification en 1 ligne rédigée par RAY.

---

### Règle universelle (tous niveaux)

```tsx
// Non négociable — à intégrer dans tous les composants animés
import { useReducedMotion } from 'motion/react'
const shouldReduce = useReducedMotion()
```

Si `prefers-reduced-motion` est activé → toutes les animations se réduisent à de simples transitions d'opacité (150ms max) ou sont désactivées.

---

### Patterns autorisés par niveau (référence rapide)

| Pattern | L0 | L1 | L2 | L3 |
|---|---|---|---|---|
| CSS hover transitions | ✅ | ✅ | ✅ | ✅ |
| Scroll reveal (fade-up) | ❌ | ✅ | ✅ | ✅ |
| Hero stagger au load | ❌ | ✅ | ✅ | ✅ |
| Page transitions | ❌ | ❌ | ✅ | ✅ |
| Layout animations | ❌ | ❌ | ✅ | ✅ |
| Hover enrichi (whileHover) | ❌ | ❌ | ✅ | ✅ |
| ScrollTrigger / pinning | ❌ | ❌ | ❌ | ✅ |
| Canvas / WebGL | ❌ | ❌ | ❌ | ✅ |
| Animations en boucle | ❌ | ❌ | ❌ | ⚠️ justification requise |

---

## 🎛️ Design Tokens

> Choisis un thème Shadcn/ui ou définis tes propres tokens CSS.
> Consulte la doc Shadcn pour les thèmes disponibles : https://ui.shadcn.com/themes

### Thème Shadcn/ui sélectionné
**Base color `neutral` · style `base-nova` · CSS variables activées · icônes `lucide`**
*(source : `components.json`, lu dans le dépôt — pas un choix à refaire)*

### Variables CSS — `globals.css`
> Copie ici les variables générées par `npx shadcn@latest init` ou personnalise manuellement.

**Thème dark-first : `:root` *est* le thème sombre.** Il n'existe aucune variante claire —
`@custom-variant dark (&:is(.dark *))` est déclaré, mais aucun bloc `.dark` ne le surcharge.
*(source : `app/globals.css`)*

```css
:root {
  --background: oklch(0.11 0 0);        /* near-black, jamais du noir pur */
  --foreground: oklch(0.93 0 0);        /* blanc chaud */
  --card: oklch(0.15 0 0);
  --primary: oklch(0.78 0.145 83);      /* amber — la seule couleur du système */
  --primary-foreground: oklch(0.11 0 0);
  --muted: oklch(0.19 0 0);
  --muted-foreground: oklch(0.58 0 0);
  --border: oklch(0.26 0 0);
  --ring: oklch(0.78 0.145 83);         /* focus = amber */
  --radius: 0.25rem;                    /* serré — parti pris « terminal » */
}
```

**Un seul accent chromatique.** Tout le reste est une échelle de gris neutres. Un composant
qui introduit une deuxième teinte casse le système — c'est un arbitrage RAY, pas un détail.

### Dark mode
`[x] Dark-only` — pas de toggle, pas de variante claire. Une variante claire est en LATER
dans la roadmap : c'est une feature, pas un réglage.

---

## 🔤 Typographie

### Font principale
**IBM Plex Sans** (texte) et **IBM Plex Mono** (code, métadonnées, timestamps).
*(source : `app/layout.tsx` — deux familles, pas trois)*

```tsx
// app/layout.tsx
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
// exposées en variables : --font-ibm-sans · --font-ibm-mono
// mappées dans globals.css : --font-sans · --font-mono
```

Le mono n'est pas décoratif : il porte ce qui est *machine* — chemins, statuts, dates.
Le mettre sur de la prose brouille cette distinction.

### Échelle typographique (Tailwind)

| Usage | Classes Tailwind suggérées | À adapter si besoin |
|---|---|---|
| Display / Hero | `text-4xl md:text-6xl font-bold tracking-tight` | |
| Heading 1 | `text-3xl font-bold tracking-tight` | |
| Heading 2 | `text-xl font-semibold` | |
| Heading 3 | `text-base font-semibold` | |
| Body | `text-base font-normal leading-relaxed` | |
| Body small | `text-sm font-normal leading-relaxed` | |
| Caption / Meta | `text-xs text-muted-foreground` | |
| Code / Mono | `font-mono text-sm` | |

---

## 📐 Spacing & Layout

> Adapte ces valeurs à ton produit. Les valeurs ci-dessous sont des défauts raisonnables.

- **Grille de base :** 8px (multiples de `2` en Tailwind)
- **Max-width contenu :** `max-w-2xl` (prose) — `max-w-3xl` pour un bloc éditorial large
- **Max-width layout :** `max-w-5xl` avec padding horizontal `px-6 md:px-8`
  *(valeurs relevées dans `components/*.tsx`, pas proposées)*
- **Sections :** padding vertical `py-16 md:py-24`
- **Breakpoints actifs :** `md (768px)` et `lg (1024px)` — mobile-first

---

## 🧱 Composants Shadcn/ui — Liste validée pour ce projet

> BOB installe **uniquement** les composants de cette liste. Toute addition doit être validée par le Talent.
> Exemples courants — à adapter à ton projet :

```bash
# Navigation & Layout
npx shadcn@latest add navigation-menu
npx shadcn@latest add separator
npx shadcn@latest add sheet           # menu mobile

# Actions
npx shadcn@latest add button
npx shadcn@latest add badge

# Contenu
npx shadcn@latest add card

# Formulaires
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add label

# Feedback
npx shadcn@latest add sonner          # toasts
npx shadcn@latest add skeleton        # loading states
```

### Règles d'utilisation
1. **Jamais modifier `/components/ui/`** — ces fichiers appartiennent à Shadcn. Étendre uniquement via `className`.
2. **Variantes custom** → utiliser `cva` (class-variance-authority, déjà inclus dans Shadcn).
3. **`asChild`** → utiliser pour composer des composants Radix sans wrapper superflu.

---

## 🖥️ Patterns de Layout

### Structure de page type

```
┌─────────────────────────────────────────────────┐
│ <Header />  sticky · h-14 · border-b            │
├─────────────────────────────────────────────────┤
│                                                  │
│  <main>                                          │
│    [max-w défini ci-dessus] mx-auto px-6         │
│    [sections avec py-16 md:py-24]                │
│                                                  │
├─────────────────────────────────────────────────┤
│ <Footer />  border-t · text-muted-foreground    │
└─────────────────────────────────────────────────┘
```

### États obligatoires

Pour tout composant impliquant du chargement ou des données :
- `[ ]` **Loading** — `<Skeleton />` avec les mêmes dimensions que le contenu final
- `[ ]` **Empty** — message contextuel + CTA si applicable
- `[ ]` **Error** — message actionnable (pas "Une erreur s'est produite")
- `[ ]` **Success** — feedback via `<Sonner />` toast

---

## ♿ Accessibilité (non négociable)

- Contraste WCAG AA minimum (4.5:1 texte, 3:1 UI)
- `outline` de focus jamais supprimé sans alternative visible
- Tous les éléments interactifs accessibles au clavier
- Images décoratives : `alt=""` — images de contenu : `alt` descriptif
- Les composants Shadcn/Radix sont ARIA-compliant — ne pas bypasser leur structure

---

## 🚫 Anti-patterns (BOB ne fait jamais ça)

- ❌ Inline styles `style={{...}}` — Tailwind uniquement
- ❌ Animations sans `motion_level` défini dans la spec (→ fallback L0 obligatoire)
- ❌ Animations > 200ms sur des éléments fonctionnels (boutons, inputs, feedback states)
- ❌ `motion.div` ou tout composant animé sans vérification `prefers-reduced-motion`
- ❌ Niveau L3 sans validation explicite de RAY dans la spec
- ❌ Plus d'un `Button` variant="default" visible simultanément dans une section
- ❌ Texte sur fond coloré non validé en contrast ratio
- ❌ Images sans dimensions explicites (layout shift)
- ❌ `useEffect` pour de la logique qui peut vivre en Server Component
- ❌ Données hardcodées dans les composants — toujours via props ou `lib/data.ts`

---

## 📝 Décisions de design

| Date | Décision | Raison |
|---|---|---|
| `[YYYY-MM-DD]` | `[Première décision de design system — ex : thème Zinc]` | `[Pourquoi ce choix]` |
| 2026-04-09 | Système de niveaux motion L0–L3 (`motion` par défaut, GSAP opt-in L3) | Flexibilité par projet sans risque de sur-animation par défaut — voir ADR-007 |
