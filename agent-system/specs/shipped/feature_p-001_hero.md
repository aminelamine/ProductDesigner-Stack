---
feature_id: P-001
feature_name: Hero — trajet + système Drive Capital
tier: T3
status: VALIDATED
date: 2026-09-08
motion_level: L1
motion_note: Séquence d'entrée orchestrée au chargement du hero (pattern déjà en place dans le
  code pré-gates) — reconduite mais recadrée à ≤3 `motion.div` (cf. Notes BOB).
---

## Context & JTBD

Le hero est le premier point de contact et porte seul le positionnement — aucune autre section
n'est reprise ce cycle. Trame commune des trois personas (`client_vision.md`) : *« Quand je tombe
sur ce profil, je veux comprendre par quel chemin il en est arrivé là, pour juger si sa manière de
penser m'est utile. »* Le hero actuel (`components/hero.tsx`) porte une tagline ("Je ne fais pas de
l'IA. Je pense avec.") qui ne reflète plus le positionnement LinkedIn arrêté, sur un thème dark-only
que la direction visuelle remplace. Ce cycle valide pour la première fois la boucle complète avec
Quality Brief esthétique (`quality_brief_type: aesthetic`, jamais exécuté jusqu'ici).

## Tasks

1. **Tokens scopés + ADR** — `app/globals.css` gagne un bloc de thème scopé au hero (voir
   ADR-009), sans toucher `:root`. Police(s) chargées via `next/font/google`, exposées en variables
   scopées.
2. **Reconstruction du hero** — `components/hero.tsx` : contenu (positionnement LinkedIn),
   composition (headline massive + colonnes flanquantes + pills), application du thème scopé,
   séquence d'entrée recadrée.
3. **Illustration** — `components/hero-illustration.tsx` : silhouette plate deux tons, SVG inline,
   marque le début du trajet.

## User stories

**Story 1 — Positionnement lu en moins de 5 secondes :**
```gherkin
Given un visiteur arrive sur la page d'accueil du portfolio
When le hero s'affiche au-dessus de la ligne de flottaison
Then le texte "Creative Explorer | Product Designer | Agentic Design" est visible sans scroll
  And c'est l'élément textuel visuellement le plus dominant de la section
```

**Story 2 — Le trajet, pas le catalogue :**
```gherkin
Given un visiteur scanne le hero dans les 5 premières secondes
When il regarde l'illustration
Then il voit une silhouette plate deux tons qui se lit comme une étape d'un parcours, pas comme
  une vignette de projet ou une icône fonctionnelle
  And aucune troisième couleur ni texture n'apparaît nulle part dans la section
```

**Story N — Edge case : mouvement réduit :**
```gherkin
Given un visiteur a activé "prefers-reduced-motion"
When le hero se monte
Then la séquence d'entrée se réduit à de simples transitions d'opacité ≤150ms, ou est désactivée
```

## Acceptance criteria

| ID | Criterion | Story ref | Notes |
|---|---|---|---|
| CA-1 | `agent-system/adr/adr-009-hero-theme-scope-drive-capital.md` est passé à `✅ ACCEPTED` avant le début de la Task 2 | Dépendance | Bloquant — RAY a rédigé l'ADR en `PROPOSED`, Le Talent valide |
| CA-2 | `app/globals.css` gagne un nouveau bloc de sélecteur scopé (ex. `.theme-drive`) portant cream/ash/ink/Voltage Blue ; le bloc `:root` existant a zéro ligne modifiée | Task 1 | Diff-testable |
| CA-3 | Aucun fichier hors `components/hero.tsx` et ses sous-composants ne référence le sélecteur du thème scopé | Task 1 | Grep-testable |
| CA-4 | Les deux nouvelles familles de police sont chargées via `next/font/google` et exposées uniquement en variables scopées au thème du hero — `--font-sans` et `--font-mono` globaux restent inchangés | Task 1 | |
| CA-5 | Le headline du hero rend exactement le texte "Creative Explorer \| Product Designer \| Agentic Design" — aucune paraphrase | Story 1 | |
| CA-6 | Toutes les surfaces du hero utilisent le fond cream (`#fff8f1`) et le Voltage Blue (`#006eff`) comme seul accent chromatique — zéro deuxième teinte (hors `#000000` ink et `#e2e8f0` ash, neutres) | Story 2 | |
| CA-7 | Chaque bouton/pill du hero a un radius 60px, un contour 1.5px Voltage Blue, un fond transparent — aucune variante remplie (filled) n'apparaît | Story 2 | Cf. style-drive-capital.md « Don't use filled buttons » |
| CA-8 | Le hero applique 144px de marge horizontale à partir du breakpoint desktop (`lg:`), avec un fallback non vide documenté à `md:` et à la base — aucun scroll horizontal introduit jusqu'à 375px de large | Task 2 | 144px n'a de sens qu'en desktop ; la dégression est à la charge du Quality Brief |
| CA-9 | Aucun `box-shadow`, gradient, ni radius autre que 0px (surfaces) ou 60px (pills) n'apparaît dans le hero | Story 2 | |
| CA-10 | Tout texte du hero au-delà du headline verrouillé (CA-5) est repris verbatim de `client_vision.md` ou de `lib/data.ts` existant — aucune copie inventée | Task 2 | Anti-invention |
| CA-11 | `components/hero-illustration.tsx` existe comme fichier séparé ; `hero.tsx` et ce fichier restent chacun ≤150 lignes | Task 3 | Line cap |
| CA-12 | L'illustration est un SVG inline (aucune nouvelle dépendance npm), utilise exactement deux remplissages — Voltage Blue à opacité réduite pour les formes principales, `#000000` pour les ombres/accents — sans gradient, texture ni asset photographique | Task 3, Story 2 | |
| CA-13 | L'illustration est un vecteur plat de type silhouette, positionnée dans le hero comme un marqueur de trajet au sens de `concept-explorateur-creatif.md` | Task 3, Story 2 | Composition/densité exactes laissées au Quality Brief |
| CA-14 | La séquence d'entrée du hero utilise au maximum 3 `motion.div` au total | Task 2 | Relit `design_guide.md` L1 : le plafond s'applique à la séquence d'entrée du hero, pas à la page entière — cf. Notes BOB |
| CA-15 | `useReducedMotion` encadre la séquence d'entrée ; si vrai, le mouvement se réduit à des transitions d'opacité ≤150ms ou est désactivé | Story N | |
| CA-16 | Aucun texte en Voltage Blue ne descend sous 18px régulier / 14.66px gras (seuil « grande taille » WCAG) ; tout texte < 18px reste en Ink (`#000000`) sur cream | Task 2 | Conflit détecté entre `style-drive-capital.md` (labels 14px en Voltage Blue) et l'accessibilité non-négociable de `design_guide.md` — tranché ici en faveur de l'accessibilité |

## Quantitative success criteria (measurable post-delivery)

| Metric | Baseline | Target | Measurement method |
|---|---|---|---|
| Lecture du positionnement | n/a (thème actuel non testé) | Un lecteur restitue "explorateur créatif / design produit / agentique" après 5s d'exposition | Test qualitatif 5-secondes, 3–5 personnes — cf. `roadmap.md` (KPI déclaré qualitatif, pas un compteur) |
| Cohérence hors scope | n/a | 0 diff visuelle sur About/Obsolet/Contact/header/footer avant/après | Comparaison capture d'écran pré/post merge |

## OUT OF SCOPE

- About, Obsolet, Contact, header, footer, mobile-nav — non touchés, restent sur le thème sombre
  actuel ce cycle
- Remplacement global des tokens `:root` / migration du thème sur tout le site — reporté à un
  cycle `NEXT`, voir ADR-009
- Achat des polices commerciales originales (Editorial New / Founders Grotesk) — le Quality Brief
  choisit le substitut Google Fonts maintenant (Playfair Display / Inter sont les candidates
  nommées par `style-drive-capital.md`) ; l'achat des polices d'origine est une décision séparée,
  non couverte ici
- Composition exacte de l'illustration et comportement précis du trajet en mobile — Quality Brief,
  cf. `concept-explorateur-creatif.md` (« Ce qui reste au Quality Brief »)
- Toggle thème clair/sombre site-wide — item `LATER` de `roadmap.md`
- Toute nouvelle copie hero au-delà du headline verrouillé — pas de tagline/sous-texte inventés
- Le seam visuel entre le header sticky (resté sombre) et le hero (devenu cream) au scroll — état
  transitoire connu et accepté tant que le header n'est pas repris (cf. ADR-009)

## Dependencies

- ADR-009 doit passer `ACCEPTED` avant Task 2/3 (CA-1) — bloquant, pas de code de thème avant
  validation Talent
- Aucune dépendance sur une autre feature `P-00x` (aucune n'existe encore)

## ADR check

- [x] ADR_INDEX.md reviewed — no conflicts (ADR-001 shadcn-only, ADR-004 ts-strict, ADR-006 app
  router, ADR-007 motion levels compatibles ; ADR-002/003/005 sont des exemples de template, non
  applicables à ce projet)
- [x] New ADR needed: **yes** — ADR-009, rédigé par RAY dans cette session
  (`agent-system/adr/adr-009-hero-theme-scope-drive-capital.md`), statut `PROPOSED`, en attente de
  validation Talent

## Notes BOB

- **Shadcn** : étendre `Button` via `className`/`cva` pour la pill 60px outlined — ne jamais éditer
  `/components/ui/button.tsx`
- **Fichiers** : nouveau `components/hero-illustration.tsx` (SVG, fichier séparé pour respecter le
  cap 150 lignes de `hero.tsx`)
- **Thème scopé** : appliquer via un wrapper unique (ex. `<section id="hero" className="theme-drive ...">`)
  — ne jamais toucher au bloc `:root` existant (cf. ADR-009)
- **Polices** : deux appels `next/font/google` — Playfair Display (substitut didone) et Inter
  (substitut grotesk) sont les candidates nommées par `style-drive-capital.md` ; BOB propose
  l'appariement final au Quality Brief, RAY/Talent valide avant code (HARD CONSTRAINTS)
- **Voltage Blue jamais sous 18px de texte** — voir CA-16, arbitrage RAY tranché contre la lettre
  de `style-drive-capital.md` en faveur de l'accessibilité non-négociable
- **motion_level: L1** — séquence d'entrée du hero seule, ≤3 `motion.div`, `useReducedMotion`
  obligatoire (le hero actuel en compte ~7 : à corriger, pas à reproduire)
- **`lib/data.ts`** : ne modifier que l'export `HERO` — ne pas toucher `ABOUT`, `CONTACT`,
  `OBSOLET_SECTION`, `SITE`, `NAV_ITEMS`, `FOOTER_LINKS`
- Le Quality Brief doit trancher explicitement, avant code : composition/sujet exact de
  l'illustration, appariement final des polices, dégression du 144px en mobile/tablette, et tout
  contenu de colonne flanquante (label/valeur) — sans inventer de copie (CA-10)

## Notes ANALYZER

- **Focus d'évaluation** : conformité aux Do's/Don'ts de `style-drive-capital.md` (monochrome bleu,
  pills outlined uniquement, surfaces plates, tracking serré) + zéro impact sur les autres sections
  (diff visuelle du reste de la page doit être nulle)
- **Edge cases à vérifier** : fallback reduced-motion, dégression du 144px en mobile, contraste
  Voltage Blue sur petit texte (CA-16)
- **CX signal à surveiller** : le hero se lit-il comme un *début de trajet* et non comme une
  déclaration statique — relie directement à la trame commune H1/H2/H3 de `client_vision.md`

## Spec history

| Date | Version | Change | By |
|---|---|---|---|
| 2026-09-08 | v0.1 | Création initiale | RAY |
