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
| 4 — UI         | ✅ | palette/typo/pills carried inchangés ; vérifié par grep : `rx="0"` unique (aucun `rx="11"` en code, seulement en commentaire doc), `.theme-drive` n'expose que cream/ink/Voltage Blue/ash/ring — aucune 3e teinte |
| 5 — States     | ✅ | `shouldReduce` câblé identique pour les 2 `motion.div` et le rail (`HeroTrajectory`) — une seule source de vérité, pas de media query indépendante ; focus-visible `--ring` scopé, inchangé (globals.css non touché ce cycle) |
| 6 — Polish     | ✅ | cap 150 lignes vérifié (`hero.tsx` 69, `hero-trajectory.tsx` 52, `hero-illustration.tsx` 20) ; `aria-hidden` sur rail + marqueurs ; diff nulle sur les 7 fichiers + `lib/data.ts` hors headline (CA-4/CA-18) ; proof suite rejouée (4/4 verte) |

## Last completed step
Step 6/6 — Polish (Ralph Loop terminé)

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
- Proof run (§3b) — 5 assertions rejouées via `tsc` + `node`, toutes vertes : CA-6 (`hero.check.ts`),
  CA-16 (`hero-motion.check.ts`), CA-6/CA-7 ×2 (`hero-trajectory.check.ts`), CA-16/CA-17
  (`hero-rail.check.ts`).
- Relecture post-Step 6 : le premier rendu de `HeroTrajectory` laissait "Explorer |" scindable au
  retour à la ligne naturel à largeur étroite — la faille CA-7 que ce cycle corrige, réintroduite
  par inattention. `guardTrailingPipe()` isole le dernier mot + " |" dans un `whitespace-nowrap`
  (espace normal conservé, pas de `nbsp`, CA-6 intact) — vérifié en rendu réel (`curl` sur le dev
  server, markup SSR inspecté) : `Creative <span class="whitespace-nowrap">Explorer |</span>`.

## Cycle 2 — Correction post-ANALYZER (17/20 SHIPPED WITH NOTES, non committé)

**Bug MAJOR corrigé — CA-7 :** `guardTrailingPipe()` retournait `{ lead: "", guarded: segment }`
pour le segment sans `"|"` ("Agentic Design"), et `hero-trajectory.tsx` enveloppait
inconditionnellement `guarded` dans `<span className="whitespace-nowrap">` — la ligne entière
devenait insécable alors qu'elle n'avait rien à protéger. Confirmé par Le Talent en rendu réel à
300px : "Design" débordait du viewport et se faisait tronquer invisiblement par
`overflow-x-clip` (ADR-011), sans scrollbar pour le révéler.

Fix : `GuardedSegment` porte désormais un champ explicite `nowrap: boolean` — `true` seulement pour
la branche `" |"` (dernier mot + séparateur, unité insécable), `false` pour la branche sans `"|"`
(texte passé tel quel, `guarded === segment`). `hero-trajectory.tsx` ne pose `whitespace-nowrap`
que si `nowrap === true` :
```tsx
{nowrap ? <span className="whitespace-nowrap">{guarded}</span> : guarded}
```

Assertion ajoutée (`lib/hero-trajectory.check.ts`) : pour le segment sans `"|"`,
`guardTrailingPipe(...).nowrap` doit être `false` et `guarded` doit rester égal au segment
d'origine — sinon `throw`. Proof rejouée (`tsc` + `node`), 3/3 verte :
```
CA-6/CA-7 buildHeroTrajectory produces 3 verbatim, non-orphaned segments — passed
CA-7 guardTrailingPipe keeps the last word + "|" atomic on all 3 lines — passed
CA-7 guardTrailingPipe leaves the unguarded segment ("Agentic Design") fully reflowable (nowrap=false) — passed
```

**Feedback process (MINOR) — traces de mesures réelles manquantes pour CA-2/CA-3/CA-5/CA-9/CA-20.**
Le Talent dispose de Chrome (`/Applications/Google Chrome.app`) et `puppeteer-core` est déjà présent
dans `node_modules` (dépendance de `figma-console-mcp`) — mesures prises contre le dev server local
(`localhost:3000`), scripts jetables non committés (`.gitignore`-scope temporaire, supprimés après
usage) :

- **CA-2** (fond cream touche les 2 bords, 0px de bande sombre) — `getBoundingClientRect('#hero')`
  à 375/768/1024/1440/1920px : `heroLeft === 0` et `innerWidth - heroRight === 0` aux 5 largeurs.
  Fond mesuré `rgb(255, 248, 241)` (`#fff8f1`) à chaque largeur.
- **CA-3** (aucun scroll horizontal introduit) — `document.documentElement.scrollWidth` ===
  `window.innerWidth` exactement aux 5 largeurs (375/768/1024/1440/1920 → tous égaux, delta 0).
- **CA-5** (padding hero = seule couche de marge) — à chaque largeur, `h1.getBoundingClientRect().left`
  (distance réelle depuis le bord du viewport) est strictement égal à `getComputedStyle(hero).paddingLeft`
  (24/64/144/144/144px) — alors que `<main>` porte toujours son propre padding (24/32/32/32/32px) sans
  jamais s'additionner, la preuve que le breakout sort bien le hero de la boîte de `<main>`.
- **CA-9** (marqueurs adjacents à leur segment, pas de colonne isolée) — à 1440px (`lg:`), les 3
  wrappers de ligne partagent le même `left` (144px, colonne unique) et pour les 3 lignes,
  l'intervalle vertical du marqueur (`svg.getBoundingClientRect()`) chevauche celui de sa propre
  ligne de texte (`overlaps: [true, true, true]`) — au-delà du minimum de 2/3 exigé par le critère.
- **CA-20** (diff nulle hors scope) — `git diff --stat 84ed947 -- app/(site)/layout.tsx
  components/header.tsx components/footer.tsx components/mobile-nav.tsx components/about.tsx
  components/obsolet-section.tsx components/contact.tsx` → sortie vide, aucun fichier listé.

**Limite explicite** : ces 5 mesures viennent d'un run Chrome headless réel (pas de jsdom — jsdom
n'exécute pas de layout CSS, `getBoundingClientRect` y renvoie toujours 0, donc ne prouve rien pour
des critères géométriques). Elles couvrent les 5 largeurs prescrites par la spec mais restent un
run ponctuel de ce cycle, non rejouable automatiquement (script jetable, pas conservé comme
`.check.ts` — ce sont des critères de rendu, hors du périmètre §3b qui réserve les assertions
committées à la logique pure). Capture d'écran à 300px jointe à la livraison BOB comme preuve
visuelle de la correction CA-7 (Agentic Design reflowe sur 2 lignes, "Design" entièrement visible,
plus de troncature invisible).

## Active blockers
- [None]
