---
feature_id: P-002
feature_name: About — le trajet parcouru (ligne épinglée, 7 postes, missions, chute, manifeste)
tier: T3
epic: aucun — module epic non installé (STACK.md `modules.epic: false`)
statut: VALIDATED — gate ② franchi le 2026-09-24 par Le Talent (« OK go! ») — scope gelé
date: 2026-09-24
commit_ref: "Ref: feature_about_trajet"
motion_level: L3
motion_zones: ["about.scene", "about.chute", "about.manifeste"]
motion_note: L3 vient du motif (section épinglée + défilement de la ligne lié au scroll, voulu par la
  direction approuvée). L'implémentation est native (animation-timeline, repli rAF), avec zéro GSAP et
  zéro lib. Voir ADR-012 (ACCEPTED 2026-09-24).
---

## Contexte & JTBD

**Direction approuvée, gate ① v2 :** `sessions/brief_feature_about.md` (points 1–5).
**Prototype de référence :** `prototypes/004-accueil.html`, la page intégrée hero + About.
`prototypes/002-about-trajet.html` (it. 5) et `003-hero-reseau.html` (it. 3) restent des références.
**Contenu :** `sessions/about_parcours.md`. Deux choses y **font foi** sur LinkedIn et sur le CV :
les arbitrages du Talent, et la section « ✅ Manifeste — nouvelle version choisie par Le Talent
(version A) ».

Ce scope répond à la trame de `client_vision.md` : *« comprendre par quel chemin il en est arrivé
là »*. Le hero est le plan ; l'About est **le trajet parcouru**. Une ligne horizontale défile sous
une tête de lecture fixe, puis la chute arrive, puis le manifeste. La ligne arrive du hero : il n'y
a pas de butoir de départ, et la tête n'apparaît qu'au relais. Les écarts des prototypes 002 et 004
sont **réputés acceptés**. Le Talent les confirme au gate ②.

## Tâches

1. **Données** (`lib/data.ts`), source unique du contenu :
   - un export `PARCOURS` typé : 2 formations, 7 postes, 8 missions rattachées à leur employeur,
     3 temps, 3 plages d'outils, des jalons, le seuil, la légende, le lien d'évitement ;
   - `ABOUT.paragraphs` est **remplacé par la version A**, et ses 4 phrases clés sont stockées comme
     sous-chaînes ;
   - un champ `ABOUT.chute` : « Je ne suis pas un designer qui utilise l'IA. Je suis un designer qui
     pense avec. » ;
   - les libellés de la chute : « Arrivée · aujourd'hui », « ans d'exploration », « marques &
     clients », « startups accompagnées », « L'exploration continue → ».

   Aucune chaîne de contenu n'est écrite en dur dans un `.tsx`.
2. **Logique pure**, sans `"use client"`, chaque module avec son `.check.ts` :
   - `lib/about-timeline.ts` : index de mois, échelle proportionnelle par temps avec écart minimal,
     points d'arrêt du freinage, station active pour une progression donnée, années d'expérience et
     **chiffres de la chute** (voir CA-31) ;
   - `lib/scroll-engine.ts` : détection du support, interpolation, progression depuis des
     rectangles. C'est le **moteur partagé avec P-003**.
3. **Socle empilé**, en Server Components : `<section id="about">` en plein cadre (breakout
   ADR-011, `overflow-x-clip`, jamais `hidden`), `.theme-drive` (decisions/002). Il contient le
   seuil (`#parcours`), la légende des 4 signes, l'`<ol>` chronologique complet, la chute, le
   manifeste (`#manifeste`) et le filet bleu de coupure. Ce socle est le rendu sans JS, en
   mouvement réduit, ou sur un écran de hauteur < 500 px.
4. **Scène épinglée**, en amélioration côté client : piste sticky, ligne qui défile sous la tête
   fixe (1/3 de la largeur, 20 % en compact), parcouru en plein et à venir à 40 %, phrases des
   temps qui s'allument au passage, freinage à chaque station, anneau d'arrivée.
5. **Fiche de l'événement courant**, une seule à la fois : texte, chiffres en odomètre, tableau de
   départs des clients de l'ère agence. Plus les compteurs (année, années d'expérience), la bande
   des outils et les jalons.
6. **Mini-carte et clavier** : 7 postes en liens, Tab / Entrée / ← → / Début / Fin,
   `aria-current="step"`, et le lien « Passer le parcours ».
7. **Chute** (prototype 004) : le repère « Arrivée · aujourd'hui », puis la phrase-titre (encre,
   puis bleu), les 3 chiffres (ans d'exploration · marques & clients · startups accompagnées)
   **dérivés de `PARCOURS`**, et « L'exploration continue → ».
   **Manifeste** : les 4 paragraphes de la version A, numérotés 01 à 04, avec la phrase clé de
   chacun surlignée dans le texte, des filets tracés à l'entrée et le lien texte « Lire Obsolet ».
8. **Arrivée depuis le hero** : aucun butoir en tête de ligne. Le seuil se place à droite de la
   tête. La tête d'encre n'apparaît qu'au relais (début de l'épinglage, piloté par l'état de
   scroll de l'About). L'About expose `data-junction-target` et ne lit rien du hero.
9. **Nettoyage** : `motion/react` sort de `components/about*.tsx`.

## User stories

**Story 1 — Lire le trajet en descendant :**
```gherkin
Given un visiteur sur desktop (≥ 768 px de large, ≥ 500 px de haut), sans mouvement réduit
When il fait défiler la page à travers la section About
Then la ligne défile horizontalement sous une tête de lecture immobile
  And chaque station s'allume quand la tête l'atteint, et sa fiche remplace la précédente
  And la ligne s'arrête sur « aujourd'hui », puis la chute se pose avec ses 3 chiffres
```

**Story 2 — Aller à un poste au clavier :**
```gherkin
Given un visiteur qui navigue au clavier
When il tabule jusqu'à la mini-carte et presse Entrée sur « Havas Worldwide Tunisia »
Then la page défile jusqu'à ce que la tête soit sur Havas
  And ce lien porte aria-current="step"
```

**Story N — Edge case : pas d'effet :**
```gherkin
Given prefers-reduced-motion, ou JS désactivé, ou une fenêtre de hauteur < 500 px
When la section About s'affiche
Then rien n'est épinglé et rien ne défile par le scroll
  And les 3 temps, les 17 étapes, les faits, la chute et le manifeste sont visibles en flux normal, dans l'ordre
```

## Critères d'acceptation

| ID | Critère | Réf. | Notes |
|---|---|---|---|
| CA-1 | ADR-012 est `ACCEPTED` avant le premier commit de la tâche 4 | Dép. | Bloquant |
| CA-2 | `PARCOURS` compte exactement 7 postes, 2 formations et 8 missions | T1 | `.check.ts` |
| CA-3 | Le titre du seuil est exactement « 2008 → aujourd'hui. Sept postes, une ligne. » | T1 | Validé au Talent |
| CA-4 | Brand and Bear finit en `2023-02`, SNCF Gares & Connexions en `2025-06` | T1 | Arbitrages du Talent |
| CA-5 | Afkar Incubator et HA sont des missions de Brand and Bear. HA n'a aucune date, et son rang d'ordre suit Inteliam | T1 | `.check.ts` |
| CA-6 | `ABOUT.chute` est exactement « Je ne suis pas un designer qui utilise l'IA. Je suis un designer qui pense avec. », et le texte rendu de la chute (espaces insécables normalisées) lui est égal | T1/T7 | `.check.ts` + rendu |
| CA-7 | `ABOUT.paragraphs` contient exactement les 4 paragraphes de la version A (`about_parcours.md`), sans les marqueurs `**`. Le texte rendu de chaque paragraphe (espaces insécables normalisées) est égal à `ABOUT.paragraphs[i]` | T1/T7 | `.check.ts` + rendu |
| CA-8 | Les 4 phrases surlignées sont exactement les passages en gras de la version A. Chacune est une sous-chaîne de son paragraphe et n'apparaît qu'une fois dans le DOM de la section | T7 | Aucune exergue dupliquée |
| CA-9 | Aucun fichier `components/about*.tsx` ne contient de chaîne de contenu ni de chiffre de contenu : tout vient de `lib/data.ts` ou de `lib/about-timeline.ts` | T1 | Grep |
| CA-10 | Sans JS, le DOM de la section contient un `<ol>` avec les 3 temps (`<h3>`) et 17 étapes, chaque étape datée ayant un `<time datetime>` | Story N | JS désactivé |
| CA-11 | En mouvement réduit, ou à une hauteur de fenêtre < 500 px, aucun élément de la section n'a `position: sticky` actif ni d'animation liée au scroll | Story N | |
| CA-12 | À ≥ 768 × 820 px, pendant la traversée de la scène, la tête garde la même position horizontale (±1 px) et la piste se translate | Story 1 | Puppeteer |
| CA-13 | Pour toute position de scroll dans la scène, une seule fiche a une opacité > 0 | Story 1 | Échantillon de 20 positions |
| CA-14 | La station dont la période contient la position de la tête a son signe à opacité 1, et les stations à venir à 0,4 | Story 1 | |
| CA-15 | Le compteur d'expérience vaut `00` à la station 2008 et, à « aujourd'hui », la valeur de `yearsOfExploration(now)` | T5 | Calcul client uniquement |
| CA-16 | La mini-carte contient 7 liens, un par poste. Entrée sur un lien amène la tête sur ce poste et lui donne `aria-current="step"` | Story 2 | |
| CA-17 | Sur un lien de la mini-carte, → et ← déplacent le focus au poste suivant ou précédent. Début et Fin vont au premier et au dernier | Story 2 | |
| CA-18 | « Passer le parcours » est le premier élément focusable de la section et déplace le focus sur le titre « Manifeste » | T6 | |
| CA-19 | Avec le moteur natif forcé indisponible, le repli rAF produit la même station active que le moteur natif aux 20 positions de CA-13 | T2 | ADR-012 |
| CA-20 | Les keyframes liées au scroll n'animent que `transform` et `opacity`, et aucun écouteur n'appelle `preventDefault` sur `wheel` / `touchmove` | T4 | ADR-012 |
| CA-21 | La ligne n'a aucun butoir ni terminus à gauche de la première station. La tête d'encre a une opacité de 0 avant le relais et de 1 après | T8 | Report 003 |
| CA-22 | La section expose exactement un élément `[data-junction-target]`, sur sa ligne | T8 | Contrat avec P-003 |
| CA-23 | Aucun texte ≤ 21 px de la section n'est en Voltage Blue | — | 4,27:1, échec AA |
| CA-24 | Aucun `box-shadow`, dégradé ni `border-radius` hors 0, 50 % (disques des signes) et 60 px dans la section | — | Socle |
| CA-25 | La section utilise le fond crème. Ses seules couleurs sont `#006eff`, `#000000`, `#e2e8f0` et `#fff8f1`, avec leurs opacités | — | Socle |
| CA-26 | À 300, 375, 768, 1024, 1440 et 1920 px : `scrollWidth ≤ innerWidth`, et le fond crème touche les deux bords | — | ADR-011, learning P-001 |
| CA-27 | La section se ferme sur un filet Voltage Blue pleine largeur de 1,5 px, suivi directement de la section suivante de la page | T3 | Point 5 du gate ① |
| CA-28 | Chaque `components/about*.tsx` fait ≤ 150 lignes. Zéro `any`, zéro `@ts-ignore` | — | STACK.md |
| CA-29 | Aucun fichier de `components/ui/`, ni `:root`, ni `app/(site)/layout.tsx` n'est modifié | — | Diff |
| CA-30 | Aucun `components/about*.tsx` n'importe `motion/react`, et `package.json` ne gagne aucune dépendance | T9 | |
| CA-31 | Les chiffres de la chute sont calculés depuis `PARCOURS`, jamais saisis. `.check.ts` : « marques & clients » = nombre de clients distincts = **17** ; « startups accompagnées » = `+100` (résultat Afkar) ; « ans d'exploration » = `yearsOfExploration(now)`, qui vaut 16 au 2026-09-24 | T2/T7 | Règle de comptage : voir gate ② |
| CA-32 | La chute affiche, dans l'ordre : « Arrivée · aujourd'hui », la phrase-titre, les 3 chiffres avec leurs libellés, puis « L'exploration continue → » | T7 | Prototype 004 |
| CA-33 | La page contient exactement un `#parcours` (titre du seuil) et un `#manifeste` (titre du manifeste), chacun avec un `scroll-margin-top` ≥ la hauteur du header | T3 | Cibles de la nav de P-003 |

## Critères quantitatifs

| Métrique | Cible | Mesure |
|---|---|---|
| CLS au chargement puis traversée complète de l'About | ≤ 0,02 | PerformanceObserver `layout-shift`, 375×812 et 1440×900 |
| Jugement du Talent | approbation explicite du rendu réel | Revue Chrome, comme pour P-001 |

## HORS SCOPE

- **Footer** : cycle à venir. Son contenu est arrêté dans
  `sessions/decisions_talent_2026-09-24.md` (la section sombre Obsolet y est absorbée ; la ligne
  bleue y finit). Ici, la coupure est traitée côté About par CA-27 seulement.
- **Lot mise en ligne** : SEO, Open Graph, favicon, sitemap et robots, 404, pages légales,
  bannière cookies et Google Analytics, anti-spam. Cycle suivant.
- **Contact** et toute autre section sous l'About.
- **`:root` et le thème sombre global** : non touchés. La migration passe par `.theme-drive` scopé
  (decisions/002, ADR-009).
- **`app/(site)/layout.tsx`** : non touché (ADR-011).
- **Le hero, le header et la jonction qui descend du hero** : P-003. L'About ne fournit que
  l'ancre (CA-22), les cibles `#parcours` et `#manifeste` (CA-33), et son propre relais.
- **Ce que les prototypes simulent** : panneaux d'outils, étiquettes de contexte, contrôle de
  vitesse, bouton « forcer le repli », tranche sombre, Google Fonts (en produit, `lib/fonts.ts`
  via `next/font`).
- **Tout fait absent de `about_parcours.md`**, toute date inventée (HA), toute relation supposée
  entre missions.
- Le dépôt du thermomètre de ligne en `memory/references/004` (au MÉMORISER).
- La suppression de la dépendance `motion` du projet.

## Dépendances

- **ADR-012** `ACCEPTED` (CA-1), bloquant.
- decisions/002 (actée), ADR-009 et ADR-011 (acceptés) : mécanisme de thème et plein cadre repris
  tels quels.
- **P-003 (Hero + header)** dépend de cette spec : moteur partagé, ancre `data-junction-target`,
  cibles `#parcours` et `#manifeste`. Ordre : P-002, puis P-003, **livrés ensemble**.

## ADR check

- [x] ADR_INDEX lu. ADR-001, 004, 006, 009 et 011 sont compatibles. ADR-007 est à amender, d'où ADR-012.
- [x] Nouvel ADR : **oui**, ADR-012 (ACCEPTED 2026-09-24). ADR-009 liste `about.tsx` comme hors scope : c'est
  levé par decisions/002 (actée). À annoter à l'acceptation d'ADR-012.

## Notes BOB

- Shadcn : aucun composant requis. `components/ui/` n'est pas touché.
- **Server par défaut** (ADR-006) : le socle est rendu côté serveur. Seule la scène (piste, tête,
  compteurs, fiche, mini-carte) est un îlot client qui s'ajoute par-dessus. Les couches visuelles
  sont en `aria-hidden` : on ne rend jamais deux fois le contenu lisible.
- Découpage suggéré, chaque fichier ≤ 150 lignes : `about.tsx` · `about-seuil.tsx` ·
  `about-signs.tsx` · `about-timeline.tsx` · `about-station.tsx` · `about-stage.tsx` (client) ·
  `about-panel.tsx` · `about-odometer.tsx` · `about-counter.tsx` · `about-tools-band.tsx` ·
  `about-minimap.tsx` · `about-chute.tsx` · `about-manifeste.tsx`. CSS de la scène en CSS Module.
- « Aujourd'hui » (compteur, « ans d'exploration ») se lit sur l'horloge du client **après
  l'hydratation**. Le rendu serveur affiche la valeur calculée au build, puis le client la corrige
  sans décalage de mise en page.
- Épinglage seulement à ≥ 768 × 820 px. De 640 à 820 px de haut : disposition compacte. En
  dessous de 500 px : socle.
- Learning P-001 : tester à 300 px, et vérifier la géométrie en rendu réel (Puppeteer).

## Notes ANALYZER

- Focus : CA-12 à CA-14 et CA-19 en rendu réel, aux deux moteurs. CA-6 à CA-8 et CA-31 : verbatim
  et chiffres dérivés.
- Edge cases : saut brusque (Fin, mini-carte, nav du header vers `#manifeste`), où compteurs et
  fiche se posent sans roulement. HA : le compteur affiche l'année de la ligne. Paysage mobile
  < 500 px de haut.
- Signal CX : le trajet se lit-il **en le parcourant**, ou comme une frise décorée ?

## Historique

| Date | Version | Changement | Par |
|---|---|---|---|
| 2026-09-24 | v0.1 | Création contre le brief v2 et le prototype 002 it. 5, avec le report des écarts 9–10 du prototype 003 | RAY |
| 2026-09-24 | v0.2 | Manifeste version A. Chute enrichie (prototype 004), chiffres dérivés. Ancres `#parcours` et `#manifeste`. HORS SCOPE footer et lot mise en ligne | RAY |
