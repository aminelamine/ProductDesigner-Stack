---
feature_id: P-001
feature_name: Hero — trajet + système Drive Capital (cycle 2 — RE-SPEC)
tier: T3
status: VALIDATED
date: 2026-09-08
motion_level: L1
motion_note: Séquence d'entrée orchestrée au chargement du hero, plafonnée à 3 `motion.div`
  (ADR-007, inchangé) — mais recadrée pour porter le trajet dans sa forme, pas seulement un
  fade+translate uniforme (cf. CA-17).
---

> **Pourquoi un nouveau fichier, même feature_id.** V1 (`specs/shipped/feature_p-001_hero.md`) est
> le compte-rendu figé de ce qui a été livré et committé (`84ed947`, 18/20 ANALYZER) — il ne doit
> pas être réécrit après coup. Ce cycle 2 reste le même hero, la même feature P-001 : palette Drive
> Capital, positionnement LinkedIn verbatim, concept trajet et Option 2 (illustration deux tons)
> restent arrêtés, rien de tout ça n'est rouvert. Ce n'est donc pas une nouvelle feature — c'est un
> nouveau cycle de la même feature, tracé dans `## Spec history` ci-dessous et dans un nouveau
> fichier `specs/active/` (le cycle normal avant re-livraison en `specs/shipped/`).

## Context & JTBD

Le Talent a rejeté qualitativement le rendu v1 malgré un score ANALYZER de 18/20 — déclenchement
volontaire, équivalent à un `< 10 → RE-SPEC`, sur QA du rendu réel (Chrome, DOM inspecté à
375/1440/1920px), pas sur le score automatique. Trois faits déclencheurs, pas des options :

1. **Bug bloquant** : `<main>` de `app/(site)/layout.tsx` (`max-w-5xl px-6 md:px-8`, layout
   partagé, hors scope) et le padding du hero (CA-8 v1) s'additionnent — le fond `.theme-drive`
   n'atteint jamais le bord du viewport, à aucune largeur. L'ambition « affiche plein cadre » du
   brief v1 n'a jamais été obtenue. **Tranché ici** : le hero casse le conteneur par un breakout
   scopé à `components/hero.tsx` — zéro ligne éditée dans `app/(site)/layout.tsx` ou toute autre
   section hors scope. Voir ADR-011.
2. **Bug typographique** : à 1440/1920px, le `|` du headline démarre des lignes (« | Product »,
   « | Agentic Design ») — caractère orphelin cassable au reflow. Tranché ici par un changement
   structurel : les 3 segments du headline cessent de dépendre du retour à la ligne naturel du
   navigateur pour se séparer.
3. **Manque d'ambition créative** (jugement, pas un bug) : composition 2-colonnes générique,
   illustration isolée dans du vide lue comme une icône de kit UI, motion plafonné à un fade
   uniforme sans traduction du concept trajet. La barre monte sur ces trois axes sans rouvrir ce qui
   reste arrêté (palette, verbatim LinkedIn, concept trajet lui-même, Option 2).

La trame commune des personas (`client_vision.md`) ne change pas : *« Quand je tombe sur ce profil,
je veux comprendre par quel chemin il en est arrivé là, pour juger si sa manière de penser m'est
utile. »* Ce cycle sert directement le ressenti 0–5s de `client_vision.md` (« que ce profil ne
rentre dans aucune case existante ») — un hero encadré de noir et une icône générique contredisent
justement ça.

## Tasks

1. **Plein cadre (ADR-011)** — `components/hero.tsx` : wrapper de breakout scopé (`left-1/2
   w-screen -mx-[50vw] overflow-x-clip` ou équivalent), padding progressif 24/64/144px redevenu
   couche unique, mesuré depuis le vrai bord du viewport. Aucune autre section touchée.
2. **Headline anti-orphelin** — restructuration des 3 segments verbatim en unités de bloc
   indépendantes du reflow naturel ; le texte visible concaténé reste exactement
   « Creative Explorer | Product Designer | Agentic Design ».
3. **Illustration — marqueurs de trajet** — `components/hero-illustration.tsx` (et sous-composants
   si le cap 150 lignes l'exige) : au moins 3 instances du marqueur plat deux tons, associées
   chacune à un segment du headline plutôt qu'une colonne isolée unique. Correction du `rx="11"`
   signalé en anti-pattern par `feature_P-001_learnings.md` (0px ou 60px uniquement, y compris SVG).
4. **Motion — le trajet, pas le fade** — séquence d'entrée toujours ≤3 `motion.div` (L1, ADR-007
   inchangé), mais un dispositif qui traduit le trajet (ex. révélation échelonnée le long des
   marqueurs, tracé de ligne en CSS pur hors budget `motion.div`) plutôt qu'un fade+translate
   identique appliqué à chaque groupe.

## User stories

**Story 1 — Le fond touche le bord, à toute largeur :**
```gherkin
Given un visiteur charge la page d'accueil, à 375px, 1440px ou 1920px de large
When le hero s'affiche
Then le fond cream (`#fff8f1`) du hero touche les deux bords du viewport, sans bande du fond sombre
  global visible d'aucun côté
  And aucun scroll horizontal n'est introduit par ce changement
```

**Story 2 — Positionnement lu en moins de 5 secondes, sans orphelin :**
```gherkin
Given un visiteur arrive sur la page d'accueil du portfolio, à n'importe quelle largeur testée
When le hero s'affiche au-dessus de la ligne de flottaison
Then le texte "Creative Explorer | Product Designer | Agentic Design" est visible sans scroll et
  reste l'élément textuel visuellement le plus dominant de la section
  And aucune ligne visible ne commence par le caractère "|" ou un glyphe séparateur — le
  retour à la ligne ne dépend jamais du reflow naturel pour séparer les 3 segments
```

**Story 3 — Le trajet structure la page, pas une icône isolée :**
```gherkin
Given un visiteur scanne le hero dans les 5 premières secondes, en desktop (`lg:`)
When il regarde la composition
Then au moins 3 marqueurs plats deux tons sont visibles, chacun associé visuellement à l'un des 3
  segments du headline — aucun n'est confiné seul dans une colonne latérale déconnectée du headline
  And aucune troisième couleur ni texture n'apparaît nulle part dans la section
```

**Story N — Edge case : mouvement réduit :**
```gherkin
Given un visiteur a activé "prefers-reduced-motion"
When le hero se monte
Then la séquence d'entrée (headline, marqueurs, CTA) se réduit à de simples transitions d'opacité
  ≤150ms, ou est désactivée — y compris le dispositif de trajet de la Task 4
```

## Acceptance criteria

| ID | Criterion | Story ref | Notes |
|---|---|---|---|
| CA-1 | `agent-system/adr/adr-011-hero-full-bleed-scoped-breakout.md` est passé à `✅ ACCEPTED` avant le début de la Task 1 | Dépendance | Bloquant — rédigé en `PROPOSED`, Le Talent valide |
| CA-2 | À 375/768/1024/1440/1920px, le fond `.theme-drive` (cream) touche les deux bords du viewport — 0px de fond sombre visible d'aucun côté | Story 1 | Testable via `getBoundingClientRect`/couleur au pixel de bord |
| CA-3 | Aucun scroll horizontal n'est introduit à aucune des 5 largeurs ci-dessus (`document.documentElement.scrollWidth <= window.innerWidth`) | Story 1 | |
| CA-4 | Zéro ligne modifiée dans `app/(site)/layout.tsx`, `header.tsx`, `footer.tsx`, `mobile-nav.tsx`, `about.tsx`, `obsolet-section.tsx`, `contact.tsx` | Task 1 | Diff-testable, hérité et étendu d'ADR-009 |
| CA-5 | Le padding horizontal progressif du hero (base / `md:` / `lg:`) est la seule couche de marge appliquée — il n'existe plus de padding hérité de `<main>` en plus du padding propre au hero à l'intérieur du wrapper plein cadre | Task 1 | Remplace CA-8 v1 |
| CA-6 | Le headline rend exactement, texte visible concaténé, "Creative Explorer \| Product Designer \| Agentic Design" — aucune paraphrase | Story 2 | Carried CA-5 v1 — la présentation (Task 2) peut changer, le texte non |
| CA-7 | Aucune ligne visible ne commence par "\|" ou tout glyphe séparateur, à aucune des 5 largeurs testées — chaque segment (Creative Explorer / Product Designer / Agentic Design) est rendu comme sa propre unité de bloc, non dépendante du reflow naturel pour se séparer des autres | Story 2 | Anti-orphelin — nouveau |
| CA-8 | Au moins 3 instances du marqueur deux tons sont visibles en `lg:`, chacune positionnée visuellement adjacente à l'un des 3 segments du headline | Story 3 | Nouveau — remplace la lecture "silhouette unique" de CA-13 v1 |
| CA-9 | En `lg:`, l'ensemble des marqueurs chevauche ou s'aligne avec l'étendue verticale d'au moins 2 des 3 segments du headline — aucun marqueur n'est confiné dans une colonne latérale unique et déconnectée du headline | Story 3 | Interdit structurellement le pattern "icône isolée dans du vide" signalé par le Talent |
| CA-10 | L'illustration utilise exactement deux remplissages — Voltage Blue à opacité réduite pour les formes principales, `#000000` pour les ombres/accents — sans gradient, texture ni asset photographique, sur tous les marqueurs | Story 3 | Carried CA-12 v1 |
| CA-11 | Aucun `box-shadow`, gradient, ni radius autre que 0px (surfaces) ou 60px (pills) n'apparaît dans le hero — y compris les attributs `rx`/`ry` de tout SVG inline | Task 3 | Carried + corrige l'anti-pattern `rx="11"` signalé par `feature_P-001_learnings.md` |
| CA-12 | Chaque bouton/pill du hero a un radius 60px, un contour 1.5px Voltage Blue, un fond transparent — aucune variante remplie n'apparaît | Story 3 | Carried CA-7 v1 |
| CA-13 | Toutes les surfaces du hero utilisent le fond cream et le Voltage Blue comme seul accent chromatique — zéro deuxième teinte (hors `#000000` ink et `#e2e8f0` ash, neutres) | Story 3 | Carried CA-6 v1 |
| CA-14 | Aucun texte en Voltage Blue ne descend sous 18px régulier / 14,66px gras ; tout texte < 18px reste en Ink sur cream | — | Carried CA-16 v1, arbitrage RAY inchangé |
| CA-15 | Les deux familles de police restent chargées via `next/font/google`, exposées uniquement en variables scopées au thème du hero — `--font-sans`/`--font-mono` globaux inchangés ; aucune nouvelle dépendance npm introduite | Task 3/4 | Carried CA-4 v1 |
| CA-16 | La séquence d'entrée utilise au maximum 3 `motion.div` au total ; `useReducedMotion` encadre l'ensemble, y compris le dispositif de Task 4 ; si vrai, tout se réduit à des transitions d'opacité ≤150ms ou est désactivé | Story N | Carried CA-14/15 v1, plafond L1 non négociable (ADR-007) |
| CA-17 | La séquence d'entrée porte une distinction spatiale liée au trajet (ex. révélation échelonnée le long des marqueurs, tracé de ligne) — un fade+translation vertical uniforme et identique appliqué à chaque groupe, sans lien visible avec les marqueurs de Task 3, ne satisfait pas ce critère | Story N | Nouveau — dans le même budget que CA-16, ne l'augmente pas |
| CA-18 | Tout texte du hero au-delà du headline verrouillé est repris verbatim de `client_vision.md` ou `lib/data.ts` existant — aucune copie inventée | Task 2/3 | Carried CA-10 v1, anti-invention |
| CA-19 | `components/hero.tsx` et chacun de ses sous-composants (`hero-illustration.tsx` et tout fichier additionnel créé pour la Task 3) restent chacun ≤150 lignes | Task 1–4 | Carried CA-11 v1 — la Task 3 augmente la complexité, split explicitement autorisé |
| CA-20 | Diff visuelle nulle sur About/Obsolet/Contact/header/footer/mobile-nav avant/après, à toute largeur testée | — | Carried, quantitatif ci-dessous |

## Quantitative success criteria (measurable post-delivery)

| Metric | Baseline | Target | Measurement method |
|---|---|---|---|
| Plein cadre réel | v1 : bande sombre visible à toute largeur (24–176px selon breakpoint) | 0px de bande visible à 375/768/1024/1440/1920px | Capture d'écran + inspection couleur au pixel de bord (CA-2) |
| Lecture du positionnement | v1 : texte lu mais orphelin de "\|" en desktop | Un lecteur restitue "explorateur créatif / design produit / agentique" après 5s d'exposition, sans confusion visuelle | Test qualitatif 5-secondes, 3–5 personnes |
| Cohérence hors scope | v1 : conforme | 0 diff visuelle sur About/Obsolet/Contact/header/footer/mobile-nav avant/après | Comparaison capture d'écran pré/post merge (CA-20) |
| Jugement qualitatif du Talent | v1 : rejeté malgré 18/20 | Approbation explicite du Talent sur le rendu réel (pas seulement le score ANALYZER) avant clôture du cycle | Revue Chrome par Le Talent, comme ce cycle |

## OUT OF SCOPE

- About, Obsolet, Contact, header, footer, mobile-nav — non touchés, restent sur le thème sombre
  actuel ce cycle (inchangé depuis ADR-009)
- **Édition de `app/(site)/layout.tsx`** — décidée contre, pas seulement différée : le plein cadre
  s'obtient par breakout scopé au hero (ADR-011), pas par modification du layout partagé
- Remplacement global des tokens `:root` / migration du thème sur tout le site — reporté à un
  cycle `NEXT` (ADR-009, révision liée à ADR-011)
- Le contenu verbatim du headline — "Creative Explorer | Product Designer | Agentic Design" n'est
  pas rouvert, seule sa présentation structurelle change (Task 2)
- Le concept trajet et l'Option 2 (illustration deux tons) eux-mêmes — arrêtés, non rediscutés ;
  seule leur exécution (composition, densité, intégration) monte en ambition
- Achat des polices commerciales originales (Editorial New / Founders Grotesk) — substitut Google
  Fonts déjà tranché en cycle 1 (Playfair Display / Inter), non rouvert
- Comportement précis du trajet en mobile (`< md:`) au-delà du plein cadre et de l'anti-orphelin —
  Quality Brief, comme en cycle 1
- Toggle thème clair/sombre site-wide — item `LATER` de `roadmap.md`
- Le seam visuel entre le header sticky (resté sombre) et le hero (cream, plein cadre) au scroll —
  état transitoire connu et accepté, inchangé depuis ADR-009

## Dependencies

- ADR-011 doit passer `ACCEPTED` avant Task 1 (CA-1) — bloquant, pas de code de breakout avant
  validation Talent
- ADR-009 reste `ACCEPTED`, inchangé — gouverne toujours les tokens de thème scopé
- Ce cycle part du code livré en `84ed947` (v1) comme base — pas une reconstruction depuis zéro
- Aucune dépendance sur une autre feature `P-00x`

## ADR check

- [x] ADR_INDEX.md reviewed — ADR-009 (thème scopé) étendu par ADR-011 sans contradiction ;
  ADR-007 (motion L0–L3) compatible, CA-16/CA-17 restent dans le budget L1 ; ADR-001/004/006/008
  compatibles, aucun conflit
- [x] New ADR needed: **yes** — ADR-011, rédigé par RAY dans cette session
  (`agent-system/adr/adr-011-hero-full-bleed-scoped-breakout.md`), statut `PROPOSED`, en attente de
  validation Talent. `ADR_INDEX.md` n'est pas mis à jour tant que le statut n'est pas `ACCEPTED`
  (protocole RAY, étape 4)

## Notes BOB

- **Breakout plein cadre** : `left-1/2 w-screen -mx-[50vw] overflow-x-clip` posé sur le wrapper
  `<section id="hero">` lui-même — le `overflow-x-clip` scopé au hero absorbe l'écart 1px
  `100vw`/scrollbar sans toucher `body`/`html` (cf. ADR-011). Vérifier le scroll horizontal global
  de page à la fin, pas seulement l'absence de débordement visuel du hero.
- **Anti-orphelin** : ne pas patcher au cas par cas avec des `<br>` conditionnels par breakpoint —
  structurer les 3 segments comme des unités de bloc dès le départ (ex. chacun sa propre ligne),
  ce qui règle le bug par construction plutôt que par rustine responsive.
- **Marqueurs** : réutiliser le langage visuel du signpost v1 (deux tons, formes simples) mais le
  redistribuer en ≥3 instances alignées aux segments plutôt qu'un objet unique en colonne latérale
  — pas besoin de tout réinventer, redistribuer la même grammaire. Corriger `rx="11"` → `0` ou `60`
  sur toutes les formes (CA-11).
- **Motion** : un tracé de ligne en CSS pur (`stroke-dashoffset` sur un `<path>` SVG, animé en CSS)
  ne compte pas dans le budget `motion.div` — c'est une option pour porter le trajet sans dépasser
  le plafond L1. Alternative : garder 3 `motion.div` mais leur donner un décalage spatial différencié
  par marqueur plutôt qu'un `y: 16` identique partagé.
- **Fichiers** : split `hero-illustration.tsx` en sous-composants si le cap 150 lignes est atteint
  par les 3 marqueurs — nommer explicitement, chacun ≤150 lignes (CA-19)
- **`lib/data.ts`** : ne modifier que l'export `HERO` si besoin — ne pas toucher `ABOUT`,
  `CONTACT`, `OBSOLET_SECTION`, `SITE`, `NAV_ITEMS`, `FOOTER_LINKS`
- Le Quality Brief doit trancher explicitement, avant code : forme exacte des marqueurs
  au-delà du minimum de 3, comportement précis du trajet en mobile, choix du dispositif motion
  (tracé vs décalage spatial différencié) — sans inventer de copie (CA-18)

## Notes ANALYZER

- **Focus d'évaluation ce cycle** : les 4 points qui ont fait échouer v1 malgré 18/20 — plein cadre
  réel à 5 largeurs (pas seulement les valeurs de padding), absence d'orphelin "\|" à 5 largeurs,
  intégration des marqueurs (pas d'icône isolée en colonne), motion distinct d'un fade uniforme. Un
  score élevé sur les critères déjà couverts en cycle 1 sans vérification explicite de ces 4 points
  ne doit pas suffire à un verdict SHIPPED.
- **Edge cases à vérifier** : fallback reduced-motion sur le nouveau dispositif motion (CA-17),
  radius SVG (`rx`/`ry`) sur tous les marqueurs (pas seulement les classes Tailwind du composant
  principal — cf. anti-pattern déjà noté en cycle 1), absence de scroll horizontal après le
  breakout, diff nulle sur les 7 fichiers hors scope (CA-4)
- **CX signal à surveiller** : le hero se lit-il comme un *début de trajet* structuré par la
  composition elle-même, pas seulement raconté par le texte — relie directement à la trame commune
  H1/H2/H3 de `client_vision.md` et au ressenti 0–5s (« ne rentre dans aucune case existante »)

## Spec history

| Date | Version | Change | By |
|---|---|---|---|
| 2026-09-08 | v1 (shipped) | Cycle 1 — spec initiale, livrée 18/20 ANALYZER, commit `84ed947`. Voir `specs/shipped/feature_p-001_hero.md` | RAY |
| 2026-09-08 | v2.0 (ce fichier) | RE-SPEC cycle 2 — rejet qualitatif du Talent malgré 18/20 : plein cadre (ADR-011, bug bloquant), anti-orphelin typographique (bug), composition/illustration/motion relevées en ambition (jugement) | RAY |
