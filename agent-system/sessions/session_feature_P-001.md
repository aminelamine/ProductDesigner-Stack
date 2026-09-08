---
feature_id: P-001
feature_name: Hero — trajet + système Drive Capital (cycle 2 — RE-SPEC)
date: 2026-09-08
---

## Ralph Loop Status

| Step | Status | Notes |
|---|---|---|
| 1 — Structure  | ✅ | `hero-illustration.tsx` repositionné sur `HeroWaypoint` (marqueur unique) ; `hero-trajectory.tsx` (à créer Step 2) ; `lib/hero-trajectory.ts` (split verbatim) + `lib/hero-rail.ts` (classnames rail purs) créés |
| 2 — Scaffold   | ⏳ | |
| 3 — Core logic | ⏳ | |
| 4 — UI         | ⏳ | |
| 5 — States     | ⏳ | |
| 6 — Polish     | ⏳ | |

## Last completed step
Step 1/6 — Structure

## Notable implementation choices
- `hero-illustration.tsx` cesse de porter le signpost complet (mât + 3 bras empilés) : il exporte
  désormais `HeroWaypoint`, un marqueur unique deux tons, réutilisé 3× par `HeroTrajectory`
  (Task 3, Point tranché brief cycle 2). Corrige au passage l'anti-pattern `rx="11"` signalé par
  `feature_P-001_learnings.md` — `rx="0"` strict sur la barre bleue.
- Logique pure extraite en amont du composant (pattern loué en cycle 1) : `buildHeroTrajectory`
  (split verbatim du headline en 3 lignes-blocs, CA-6/CA-7) et `getRailClassName` (résolveur de
  classes du rail, CA-16/CA-17) vivent dans `lib/`, sans `"use client"` — prouvables par `.check.ts`
  avant même d'écrire le JSX.

## Active blockers
- [None]
