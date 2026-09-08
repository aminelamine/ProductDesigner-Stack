# Layout & Navigation — Portfolio Amine Lamine

## Description

Coquille structurelle single-page du portfolio : header sticky avec navigation par ancres, zone de contenu principale, et footer minimal. Le layout doit communiquer l'expertise Design x IA en < 5 secondes et servir de socle à toutes les sections (Hero, About, Contact, Obsolet CTA).

**Type:** Screen (layout shell)
**Feature:** F-001

---

## Reference Screen

None — new layout, building from scratch. Shell structure documented below.

---

## Visual Reference

| | |
|---|---|
| **Pattern** | Editorial single-page — narrow content column, sticky header, minimal footer |
| **Screenshots studied** | None available yet (setup step skipped) |
| **Key composition rules** | - Single narrow column (max-w-5xl layout, max-w-3xl content) centered |
| | - Header is the only persistent navigation element |
| | - Typography-driven hierarchy, no color-heavy UI |
| | - Generous vertical spacing between sections (py-16 md:py-24) |

**Composition notes:**
Portfolio éditorial style Stripe Docs / Works in Progress. Tension entre ordre (design system) et pensée (éditorial). La colonne étroite force la lecture, le blanc tourne renforce le focus. Le header est discret mais toujours accessible.

---

## Layout Structure

```
┌─────────────────────────────────────────────────────┐
│  Header  sticky · h-14 · border-b · max-w-5xl      │
│  [Logo/Nom]                    [Nav links] [Burger] │
├─────────────────────────────────────────────────────┤
│                                                      │
│  <main> max-w-5xl mx-auto px-6 md:px-8              │
│                                                      │
│    ┌─────────────────────────────────────┐           │
│    │  #hero — Section Hero (F-002)       │           │
│    │  py-16 md:py-24                     │           │
│    └─────────────────────────────────────┘           │
│                                                      │
│    ┌─────────────────────────────────────┐           │
│    │  #about — Section About (F-003)     │           │
│    │  py-16 md:py-24                     │           │
│    └─────────────────────────────────────┘           │
│                                                      │
│    ┌─────────────────────────────────────┐           │
│    │  #contact — Section Contact (F-004) │           │
│    │  py-16 md:py-24                     │           │
│    └─────────────────────────────────────┘           │
│                                                      │
├─────────────────────────────────────────────────────┤
│  Footer  border-t · py-8 · text-muted-foreground    │
│  [© 2026 Amine Lamine]  [Obsolet ↗]  [Contact]     │
└─────────────────────────────────────────────────────┘
```

**Desktop:** 1440px viewport, content centered at max-w-5xl (1024px)
**Mobile:** Full-width with px-6 padding, burger replaces nav links

---

## Sections

### Header
- **Purpose**: Navigation persistante + identité
- **DS Components used**: Button (ghost, sm) for nav links, Sheet for mobile menu, Separator for border
- **Content**:
  - Left: "Amine Lamine" — heading/h3 weight, text link to top
  - Right desktop: "About" · "Contact" · "Obsolet ↗" — ghost buttons, smooth scroll anchors
  - Right mobile: Burger icon → Sheet drawer with nav links
- **Behavior**: `position: sticky`, `top: 0`, `z-50`, `bg-background/95 backdrop-blur`
- **Height**: h-14 (56px)
- **Border**: border-b with `color/border` token

### Main Content Area
- **Purpose**: Container pour les sections scrollables
- **DS Components used**: None (structural wrapper only)
- **Content**: Slot pour Hero (F-002), About (F-003), Contact (F-004)
- **Behavior**: Scroll naturel, chaque section est une `<section>` avec `id` pour les ancres

### Footer
- **Purpose**: Clôture sobre + CTA Obsolet (F-005) + contact rapide
- **DS Components used**: Separator (border-t), Button (link variant)
- **Content**:
  - Left: "© 2026 Amine Lamine"
  - Right: "Obsolet ↗" (lien externe) · "Contact" (mailto ou ancre #contact)
- **Behavior**: Statique, visible au scroll bottom

---

## States

| State | Description |
|-------|-------------|
| Default | Layout shell avec sections placeholder (gray muted boxes montrant les zones) |
| Populated | Avec le contenu réel des features F-002 à F-005 |

---

## DS Components Used

| Component | Variant/Size | Strategy | Location |
|-----------|-------------|----------|----------|
| Button | ghost, sm | build from primitives | Header nav links |
| Button | link, sm | build from primitives | Footer links |
| Sheet | default | build from primitives | Mobile nav drawer |
| Separator | horizontal | build from primitives | Header border-b, Footer border-t |

**Note:** shadcn is code-first. All components built from Figma primitives (frames, auto-layout, text) bound to design tokens.

---

## New DS Components Required

None — all patterns covered by existing DS components and primitives.

---

## Content Structure

### Header
```
Logo:    "Amine Lamine"
Nav:     ["About", "Contact", "Obsolet ↗"]
```

### Section placeholders
```
Hero:    "Hero Section — F-002" (placeholder)
About:   "About Section — F-003" (placeholder)
Contact: "Contact Section — F-004" (placeholder)
```

### Footer
```
Left:    "© 2026 Amine Lamine"
Right:   "Obsolet ↗" · "Contact"
```

---

## Design Tokens

### Layout
| Token | Key | Value | Usage |
|-------|-----|-------|-------|
| spacing/4 | dfd88b61... | 16px | Header horizontal padding, nav gap |
| spacing/6 | 20e662c4... | 24px | px-6 mobile content padding |
| spacing/8 | bcaf02e5... | 32px | px-8 desktop content padding |
| spacing/16 | d01bd5d2... | 64px | py-16 section padding mobile |
| spacing/24 | f5ccde62... | 96px | py-24 section padding desktop |

### Colors
| Token | Key | Usage |
|-------|-----|-------|
| color/background | d0a226c3... | Page background |
| color/foreground | bd3c27e7... | Primary text, logo |
| color/muted-foreground | c9f3da72... | Footer text, nav items |
| color/border | aea4ef66... | Header border-b, footer border-t |
| color/primary | 0fde2320... | Active nav item |
| color/accent | 4d200cfd... | Hover state on nav items |

### Typography
| Style | Key | Usage |
|-------|-----|-------|
| heading/h3 | 7a40c817... | Logo "Amine Lamine" |
| body/md | 376cf523... | Nav links |
| caption/md | 86185a2c... | Footer text |

---

## Responsive Rules

| Breakpoint | Layout change |
|-----------|---------------|
| Desktop (>1024px) | Full nav visible, max-w-5xl centered, px-8 |
| Tablet (768-1024px) | Full nav visible, max-w-5xl, px-6 |
| Mobile (<768px) | Burger + Sheet drawer, px-6, nav links hidden |

---

## Acceptance Criteria

- [ ] Header est sticky (reste visible au scroll)
- [ ] Header fait exactement h-14 (56px) de hauteur
- [ ] Navigation par ancres smooth scroll vers #hero, #about, #contact
- [ ] Mobile: burger icon ouvre un Sheet avec les mêmes liens
- [ ] Footer affiche copyright, lien Obsolet (externe ↗), lien Contact
- [ ] Layout respecte max-w-5xl (1024px) avec centrage horizontal
- [ ] Sections utilisent py-16 (mobile) et py-24 (desktop) de padding vertical
- [ ] Tous les éléments utilisent les design tokens (pas de couleurs hardcodées)
- [ ] Contraste WCAG AA respecté (4.5:1 texte, 3:1 UI)
- [ ] Le design est présenté en 1440px viewport width

---

## Open Questions

None — spec is self-contained for the layout shell.
