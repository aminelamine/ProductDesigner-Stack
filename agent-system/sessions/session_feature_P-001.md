---
feature_id: P-001
feature_name: Hero — trajet + système Drive Capital
date: 2026-09-08
---

## Ralph Loop Status

| Step | Status | Notes |
|---|---|---|
| 1 — Structure  | ✅ | tokens scopés `.theme-drive` + `lib/fonts.ts` + skeleton `hero-illustration.tsx` |
| 2 — Scaffold   | ✅ | `hero.tsx` réécrit (structure + types), `HERO.headline` verrouillé (CA-5) |
| 3 — Core logic | ✅ | `lib/hero-motion.ts` (variants purs) + wiring `useReducedMotion` dans `hero.tsx` — 3 `motion.div` (CA-14) |
| 4 — UI         | ✅ | Illustration finale (signpost 2 tons), palette/typo Drive Capital, pills outlined 60px |
| 5 — States     | ✅ | focus-visible scopé (`--ring`), hover opacity CTAs, reduced-motion vérifié bout en bout |
| 6 — Polish     | ✅ | Contraste WCAG calculé, proof suite complète rejouée, revue finale des 16 CA |

## Last completed step
Step 6/6 — Polish (Ralph Loop terminé)

## Notable implementation choices
- Variants d'entrée extraites dans `lib/hero-motion.ts` (module pur, pas de "use client")
  pour rendre CA-15 prouvable par assertion `tsc` plutôt que par inspection visuelle.
- Bug trouvé et corrigé en Step 4 : `buttonVariants({variant, className})` sans `cn()`
  ne déduplique pas les classes conflictuelles (`border-border` vs `border-primary`,
  `bg-background` vs `bg-transparent`) — le cascade CSS tranchait au hasard, contour
  invisible au rendu. Fix : `cn(buttonVariants({variant:"outline"}), PILL)`, cohérent avec
  le pattern déjà utilisé par `components/ui/button.tsx`.
- Illustration : panneau/borne à 3 bras (silhouette signpost), pas de voiture littérale —
  décision Quality Brief déjà actée.
- Vérifié en rendu réel (headless Chrome, captures desktop/md/mobile) : contours des pills
  visibles, pas de scroll horizontal à 375px, headline lisible sans scroll (Story 1).
- Step 5 : `.theme-drive` ne scopait pas `--ring` — le focus-visible des pills (bordure +
  halo) retombait sur l'ambre de `:root`, une 2e teinte au clavier (violation CA-6 sur un
  état interactif, pas seulement statique). Ajouté `--ring: #006eff` au bloc scopé.
  Vérifié via CDP (`getComputedStyle(hero).getPropertyValue('--ring')` === `#006eff`) —
  pas une capture d'écran, une lecture de token calculée.
- Step 6 (Polish) : contraste WCAG calculé (formule luminance relative) — headline Voltage
  Blue sur cream 4.27:1 (seuil grand texte 3:1, largement au-delà), corps Ink sur cream
  19.95:1 (seuil texte normal 4.5:1). Confirme que la résolution CA-16 (bleu jamais < 18px)
  n'est pas seulement une règle défensive mais reflète un vrai écart de contraste à cette
  taille. Aucune régression trouvée en relecture finale des 16 CA — voir livraison BOB.

## Active blockers
- [None]
