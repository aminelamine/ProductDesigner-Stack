---
feature_id: P-001
feature_name: Hero — trajet + système Drive Capital (cycle 2 — RE-SPEC)
date: 2026-09-08
---

## Ralph Loop Status

| Step | Status | Notes |
|---|---|---|
| 1 — Structure  | ✅ | `hero-illustration.tsx` repositionné sur `HeroWaypoint` (marqueur unique) ; `lib/hero-trajectory.ts` (split verbatim) + `lib/hero-rail.ts` (classnames rail purs) créés |
| 2 — Scaffold   | ✅ | `hero-trajectory.tsx` créé — `HeroTrajectoryProps` typé (`shouldReduce: boolean`), 3 lignes-blocs `<h1>`, marqueur + rail par ligne |
| 3 — Core logic | ✅ | `hero.tsx` : wrapper plein cadre (ADR-011) posé sur `<section>`, colonne flanquante supprimée, `HeroTrajectory` câblé avec `shouldReduce`. `.check.ts` CA-6/7/16/17 ajoutés, tous verts |
| 4 — UI         | ⏳ | |
| 5 — States     | ⏳ | |
| 6 — Polish     | ⏳ | |

## Last completed step
Step 3/6 — Core logic

## Notable implementation choices
- `hero-illustration.tsx` cesse de porter le signpost complet (mât + 3 bras empilés) : il exporte
  désormais `HeroWaypoint`, un marqueur unique deux tons, réutilisé 3× par `HeroTrajectory`
  (Task 3, Point tranché brief cycle 2). Corrige au passage l'anti-pattern `rx="11"` signalé par
  `feature_P-001_learnings.md` — `rx="0"` strict sur la barre bleue.
- Logique pure extraite en amont du composant (pattern loué en cycle 1) : `buildHeroTrajectory`
  (split verbatim du headline en 3 lignes-blocs, CA-6/CA-7) et `getRailClassName` (résolveur de
  classes du rail, CA-16/CA-17) vivent dans `lib/`, sans `"use client"` — prouvables par `.check.ts`
  avant même d'écrire le JSX.

- Breakout plein cadre (ADR-011) posé directement sur `<section id="hero">` — `relative left-1/2
  w-screen -mx-[50vw] overflow-x-clip`, exactement le pattern documenté par l'ADR. Aucune ligne
  éditée dans `app/(site)/layout.tsx` ni les 6 autres fichiers hors scope (vérifié `git diff
  --stat`, CA-4).
- Proof run (§3b) — 4 assertions rejouées via `tsc` + `node`, toutes vertes : CA-6 (`hero.check.ts`),
  CA-16 (`hero-motion.check.ts`), CA-6/CA-7 (`hero-trajectory.check.ts`), CA-16/CA-17
  (`hero-rail.check.ts`).

## Active blockers
- [None]
