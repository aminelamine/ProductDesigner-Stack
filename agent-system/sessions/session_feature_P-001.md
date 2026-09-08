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
| 4 — UI         | ⏳ | |
| 5 — States     | ⏳ | |
| 6 — Polish     | ⏳ | |

## Last completed step
Step 3/6 — Core logic

## Notable implementation choices
- Variants d'entrée extraites dans `lib/hero-motion.ts` (module pur, pas de "use client")
  pour rendre CA-15 prouvable par assertion `tsc` plutôt que par inspection visuelle.

## Notable implementation choices
- (à venir)

## Active blockers
- [None]
