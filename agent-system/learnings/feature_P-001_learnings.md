---
feature_id: P-001
feature_name: Hero — trajet + système Drive Capital (cycle 2 — RE-SPEC)
date: 2026-09-08
verdict: SHIPPED
score: 20/20
---

## Patterns that worked well
- Le breakout plein cadre (`relative left-1/2 w-screen -mx-[50vw] overflow-x-clip` posé directement
  sur `<section id="hero">`) reprend l'ADR-011 verbatim. Vérifié en rendu Chrome réel (Puppeteer) à
  300/320/375/768/1024/1440/1920px : `heroLeft === 0` et `heroRight === innerWidth` aux 7 largeurs,
  `scrollWidth === innerWidth` partout — le pattern absorbe l'écart `100vw`/scrollbar sans
  dépendance de breakpoint. À reconduire tel quel pour toute future section `P-00x` plein cadre.
- Intégration des marqueurs par construction : chaque `HeroWaypoint` vit dans le même conteneur flex
  que le segment de headline qu'il illustre. Vérifié en rendu réel à 1440px : les 3 marqueurs
  partagent le `left` du headline (144px, colonne unique) et chevauchent (`overlap: true` ×3)
  l'étendue verticale de leur propre ligne — CA-8/CA-9 vrais par structure DOM, pas par
  positionnement approximatif.
- Réaction à un retour ANALYZER MAJOR en un seul commit ciblé (`ea26ddc`) : diagnostic exact de la
  cause racine (`nowrap` non conditionnel), fix minimal (un champ booléen explicite sur le type de
  retour plutôt qu'un correctif au niveau JSX), régression couverte par une assertion nommée
  explicitement "regression guard" dans `hero-trajectory.check.ts`. Pattern à généraliser : quand un
  bug est un cas non traité d'une fonction pure, corriger le type de retour pour rendre l'état
  implicite explicite (`nowrap: boolean`) plutôt que de patcher l'appelant.
- Logique pure extraite en amont du JSX (`lib/hero-trajectory.ts`, `lib/hero-rail.ts`,
  `lib/hero-motion.ts`, aucun `"use client"`), chacune couverte par un `.check.ts` rejoué par
  ANALYZER (`tsc` + `node`, 4/4 vertes à chaque revérification). Pattern à reconduire pour tout futur
  comportement conditionnel testable.

## Detected anti-patterns
- **Cycle 2 intermédiaire (17/20)** : `guardTrailingPipe()` avait une branche non couverte par son
  propre commentaire — le segment sans `"|"` ("Agentic Design") était renvoyé tel quel mais
  l'appelant l'enveloppait quand même dans `whitespace-nowrap` sans condition, rendant la ligne
  entière insécable et la tronquant invisiblement sous `overflow-x-clip` à 300px. Root cause : un
  garde-fou anti-orphelin écrit pour un cas (dernier mot + `"|"`) s'est propagé par défaut à un cas
  qui n'en avait pas besoin, faute d'un signal explicite dans le type de retour pour distinguer les
  deux branches. **Corrigé** par un champ `nowrap: boolean` explicite sur `GuardedSegment` — plus
  aucune branche implicite. À généraliser : toute fonction avec deux branches de comportement
  distinct (protégé vs libre) doit exposer ce distinguo dans son type de retour, pas seulement dans
  un commentaire.
- **Le score automatique de cycle 1 (18/20) n'a pas capté le rejet qualitatif du Talent** — leçon
  confirmée par ce cycle : les 5 critères géométriques (CA-2/3/5/8/9/20) ne sont vérifiables que par
  rendu réel (jsdom n'exécute pas de layout CSS). Ce cycle démontre la correction : ANALYZER avait
  accès à `puppeteer-core` + Chrome dans l'environnement (déjà présent en dépendance de
  `figma-console-mcp`) et a rejoué lui-même les 5 mesures géométriques en navigateur réel plutôt que
  de faire confiance aux traces de session de BOB — elles concordaient exactement. À généraliser :
  quand un outil de rendu réel est disponible dans l'environnement d'ANALYZER, l'utiliser
  systématiquement pour tout critère `getBoundingClientRect`/`scrollWidth`, ne jamais se contenter
  de la prose de session pour ces critères-là.

## Spec ambiguities to anticipate
- CA-7 et Story 2 couvraient explicitement l'orphelin `"|"`, mais aucune formulation explicite
  n'existait pour le cas d'un segment SANS séparateur qui pourrait être sur-protégé par erreur
  (nowrap total au lieu d'aucun). Confirmé comme angle mort réel par le cycle intermédiaire 17/20.
  Formulation à intégrer dans toute future spec touchant un split de texte multi-segments : « chaque
  segment, y compris celui sans glyphe à protéger, doit rester capable de refluer normalement sauf
  la portion strictement nécessaire à la protection d'un caractère ».

## CX signals to watch
- Composition nettement resserrée vs v1 : colonne flanquante supprimée, le headline devient
  lui-même la structure (une ligne = un arrêt du trajet, marqueur inclus). Confirmé en rendu réel —
  amélioration alignée avec le jugement qualitatif du Talent sur ce point précis.
- Risque CX du cycle intermédiaire (troncature invisible de "Design" à 300px, zéro scrollbar pour le
  révéler) est le type de défaut le plus dangereux en CX : silencieux, non repéré par un test
  automatisé de logique pure, seulement visible en rendu réel à une largeur étroite précise. Signal
  à généraliser : tout critère "pas de troncature" sur du texte contraint par `overflow-clip` mérite
  un test à la largeur la plus étroite du spectre testé (ici 300px, sous le minimum 375px prescrit
  par la spec), pas seulement aux largeurs listées.

## Emerging architecture decision
- (none) — ADR-011 couvre déjà le point structurel de ce cycle ; aucun nouveau besoin d'ADR détecté.
