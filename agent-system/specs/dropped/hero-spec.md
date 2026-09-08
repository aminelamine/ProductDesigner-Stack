# Hero — F-002

## Description

Section hero du portfolio single-page. Premier point de contact visuel — doit communiquer le positionnement "Design × IA" en < 5 secondes. Le hero repose entièrement sur la typographie : pas d'image, pas d'illustration, pas de décoration. Le contenu parle.

**User goal:** Comprendre immédiatement que ce profil est différent — un designer qui ne *fait pas* de l'IA, il *pense* avec l'IA.

**Feature:** F-002
**Parent layout:** Portfolio Layout — Desktop 1440 (node 42:72)
**Replaces:** Hero Section placeholder (first section in Main Content)

---

## Reference Screen

None — new layout, building from scratch. Section within existing layout shell.

---

## Visual Reference

| | |
|---|---|
| **Pattern** | Editorial hero — centered typography, minimal, no media |
| **Key composition rules** | - Display typography en vedette, tracking-tight |
| | - Hiérarchie claire : tagline > sous-texte > CTA |
| | - Blanc tournant généreux (le vide est intentionnel) |
| | - Un seul CTA visible (règle design_guide : 1 Button default par section) |

**Composition notes:**
Style éditorial type Stripe / Linear. La puissance vient de la typographie surdimensionnée et de l'espace négatif. Le tagline est une déclaration, pas une description. Le sous-texte contextualise sans diluer. Le CTA est discret mais présent.

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Hero Section                          │
│                  py-24 (desktop)                         │
│                                                          │
│              ┌──── max-w-3xl ────┐                       │
│              │                    │                       │
│              │    [Tagline]       │  display/lg           │
│              │    centered        │  tracking-tight       │
│              │                    │  multi-line           │
│              │                    │                       │
│              │  [Sous-texte]      │  body/lg              │
│              │  centered          │  muted-foreground     │
│              │                    │                       │
│              │    [CTA]           │  Button ghost         │
│              │    centered        │                       │
│              │                    │                       │
│              └────────────────────┘                       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Vertical rhythm:**
- Top padding: spacing/24 (96px)
- Tagline → sous-texte gap: spacing/6 (24px)
- Sous-texte → CTA gap: spacing/8 (32px)
- Bottom padding: spacing/24 (96px)

---

## Sections

### Tagline
- **Purpose**: Déclaration de positionnement — le visiteur comprend en 3 mots
- **Content**: "Un designer qui\npense avec l'IA"
- **Typography**: display/lg (60px, Bold, tracking-tight)
- **Color**: color/foreground (noir)
- **Alignment**: center
- **Behavior**: Texte statique, multi-ligne (chaque domaine sur sa propre ligne)

### Sous-texte
- **Purpose**: Contextualiser le tagline — humaniser le positionnement
- **Content**: "Product Design · AI Orchestration · AI Designer"
- **Typography**: body/lg (16px, Regular, leading-relaxed)
- **Color**: color/muted-foreground
- **Alignment**: center
- **Max-width**: max-w-md (~448px) pour forcer des lignes courtes et lisibles

### CTA
- **Purpose**: Inviter à la prise de contact sans insistance
- **Content**: "Me contacter →"
- **Style**: Button ghost (variant tertiaire — cohérent avec le leadership tranquille)
- **Color**: color/muted-foreground, hover → color/foreground
- **Alignment**: center
- **Behavior**: Smooth scroll vers #contact

---

## States

| State | Description |
|-------|-------------|
| Default | Tagline + sous-texte + CTA visibles, pas d'animation |
| Hover CTA | Le texte du CTA passe de muted-foreground à foreground |

---

## DS Components Used

| Component | Variant/Size | Strategy | Location |
|-----------|-------------|----------|----------|
| Button | ghost, default size | build from primitives | CTA |

**Note:** Le hero est purement typographique — pas de composants DS complexes. Tout est construit en primitives (frames auto-layout + text nodes bindés aux tokens).

---

## New DS Components Required

None — all patterns covered by existing DS primitives and tokens.

---

## Content Structure

```
Tagline:     "Product Design
              AI Orchestration
              AI Designer"

Sous-texte:  "Un designer qui pense avec l'IA — pas juste un utilisateur d'outils."

CTA:         "Me contacter →"
```

---

## Design Tokens

### Layout
| Token | Key | Value | Usage |
|-------|-----|-------|-------|
| spacing/24 | f5ccde62... | 96px | Section top + bottom padding |
| spacing/6 | 20e662c4... | 24px | Gap tagline → sous-texte |
| spacing/8 | bcaf02e5... | 32px | Gap sous-texte → CTA |
| spacing/4 | dfd88b61... | 16px | CTA internal horizontal padding |
| spacing/2 | 5e02cb68... | 8px | CTA internal vertical padding |
| radius/md | 02f08700... | 8px | CTA border-radius |

### Colors
| Token | Key | Usage |
|-------|-----|-------|
| color/background | d0a226c3... | Section background (transparent/white) |
| color/foreground | bd3c27e7... | Tagline text |
| color/muted-foreground | c9f3da72... | Sous-texte + CTA text |
| color/accent | 4d200cfd... | CTA hover background |

### Typography
| Style | Key (local ID) | Usage |
|-------|----------------|-------|
| display/lg | e8ea30d7... | Tagline — 60px Bold |
| body/lg | c53c23a5... | Sous-texte — 16px Regular |
| body/md | 376cf523... | CTA label — 14px Regular |

---

## Responsive Rules

| Breakpoint | Layout change |
|-----------|---------------|
| Desktop (>1024px) | display/lg (60px), py-24 (96px), max-w-3xl |
| Tablet (768-1024px) | display/md (48px), py-16 (64px), max-w-3xl |
| Mobile (<768px) | heading/h1 (30px), py-16 (64px), full-width px-6 |

---

## Acceptance Criteria

- [ ] Le tagline "Product Design / AI Orchestration / AI Designer" est lisible en < 3 secondes
- [ ] Hiérarchie typographique : tagline (display/lg) > sous-texte (body/lg) > CTA (body/md)
- [ ] Le tagline utilise la font Inter Bold 60px avec tracking-tight
- [ ] Le sous-texte est en muted-foreground, centré, max-width ~448px
- [ ] Le CTA est un ghost button ("Me contacter →") centré sous le sous-texte
- [ ] Section padding : 96px top et bottom (spacing/24)
- [ ] Tous les éléments utilisent les design tokens
- [ ] Le contenu est centré horizontalement dans la colonne max-w-3xl
- [ ] L'ensemble respire — le blanc tournant est intentionnel et généreux

---

## Open Questions

None.
