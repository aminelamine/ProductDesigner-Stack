# Handoff — dev-ready spec · Accueil (hero + header + About)

> Transfer document, not a gate. It records what DIRECTION (gate ①) and CADRE (gate ②) decided,
> in a form a developer who was not in the room can act on. The code already exists on branch
> `feat/about-hero-cycle` (P-002 + P-003, 19 commits) — this document is the reference to review,
> maintain or re-implement it.

```
handoff_id: H-001
date: 2026-09-25
source: Figma https://www.figma.com/design/F2UtGEYdLDmZLT2gmMp9uz — page « Accueil » (frames 01 Hero · 02 Parcours · 03 Chute · 04 Manifeste), page « Composants »
prototype: prototypes/004-accueil.html (page intégrée, validée en main par Le Talent)
direction_ref: sessions/brief_feature_hero.md · sessions/brief_feature_about.md (gate ① approuvés) — memory/directions à écrire au gate ③
specs: agent-system/specs/active/feature_hero_reseau.md (P-003) · feature_about_trajet.md (P-002) — VALIDATED
status: ready for dev
```

## Scope

La page d'accueil de haut en bas : **header** (vraie navigation) → **hero** « le plan du réseau » →
**jonction** (une ligne continue) → **About** « le trajet » (seuil, scène épinglée, stations, fiches,
chiffres, clients, outils, compteurs) → **chute** enrichie → **manifeste** (version A).

## Tokens used

Registres de code vides (`memory/design-system/registries/ETAT.md`) : les valeurs viennent du socle
`memory/identity.md`, mirées dans Figma (collection **Socle**, mode « Crème »).

| Token | Valeur | Usage |
|---|---|---|
| `color/cream` | `#fff8f1` | fond de toutes les surfaces (hero, header, menu, About) |
| `color/ink` | `#000000` | tout texte ≤ 21 px, arrêts de poste, tête de lecture |
| `color/ash` | `#e2e8f0` | filets uniquement (bordure du header, séparateurs, mini-carte) |
| `color/blue` | `#006eff` | **seul accent** : lignes, nœud, grands textes (≥ 24 px), chiffres |
| Trait | 1,5 px, angles vifs (0° / 45° / 90°, `miter`) | réseau, jonction, ligne du parcours |
| Radius | 0 · 50 % · 60 px | rien d'autre (pas d'ombre, pas de dégradé) |

Typo (styles Figma « Display/* » et « Text/* ») : **Playfair Display 400** pour l'affiche (hero 92,
temps 200, chute 77, manifeste 136, chiffre 64, phrase clé 30) · **Inter 300–400** pour le reste
(station 28, body 20/16, caps 12 +8 %, nav 14). Tracking −2 % sauf capitales (+8 %).

**Gaps signalés** : aucun token d'espacement ni de durée n'existe en registre — valeurs dans les
specs (P-002 / P-003, notes BOB).

## States & behavior

| Élément | États | Déclencheur |
|---|---|---|
| Ligne de rôle (hero) | repos (pleine) · isolée (pleine, les 2 autres à 40 %) | survol ou focus du rôle |
| Nœud du hero | absent → apparaît + anneau | fin de l'entrée (900 ms) |
| Sortie / jonction | 40 % → pleine | scroll, du haut de page jusqu'à l'épinglage de l'About |
| Train (point au repos) | en marche · en pause | bouton Pause / Lecture ; pause auto si onglet caché ou `scrollY > 0` |
| Station | à venir (40 %) · active (bleu, 100 %) · parcourue | position de la tête de lecture |
| Fiche | une seule visible à la fois | station sous la tête ; saut direct → pose immédiate, sans animation |
| Compteurs (année, ans d'expérience) | roulement · pose directe | scroll continu · saut > 2 d'écart |
| Chute | cachée · posée | arrivée au bout de la ligne |
| Header « Me contacter » | repos · survol (opacité 0,7) · focus visible | — |
| Menu mobile | fermé · ouvert | bouton menu ; Échap, clic sur un lien ou clic dehors ferment |
| Erreur / vide | sans objet (contenu statique) | — |

## Interaction

Comportements réels du prototype 004 et du code. Tout lien interne **saute** (pas de défilement
doux) pour que la scène épinglée arrive directement dans son état final.

| Élément | Déclencheur | Réponse | Clavier |
|---|---|---|---|
| Rôle du `<h1>` | survol / focus | sa ligne pleine jusqu'au nœud, les 2 autres à 40 % (160 ms, opacité) | Tab sur chaque rôle (3 arrêts, écart accepté) |
| Pause / Lecture | clic | arrête / relance le train | Entrée, Espace |
| « 02 / Parcours ↓ » | clic | saut vers `#parcours` | Entrée |
| Scroll (hero) | défilement | la jonction se remplit ; un point la parcourt ; relais à la tête de l'About | flèches, Page ↓ |
| Scroll (About) | défilement | la piste glisse sous la tête fixe ; stations, fiches, chiffres et compteurs suivent | idem |
| Mini-carte | clic sur un poste | saut vers ce poste, `aria-current="step"` | Tab puis Entrée, ← →, Début, Fin |
| « Passer le parcours » | clic | saut vers le manifeste, focus sur « Manifeste » | 1er élément focusable de l'About |
| Nav header | clic | saut vers `#parcours` / `#manifeste` ; Obsolet en nouvel onglet | Tab |
| Menu mobile | bouton menu | panneau ouvert, focus piégé dedans | Échap ferme et rend le focus au bouton |

**Simulé dans le prototype, pas dans le code** : pastilles P2/P3/P4, étiquettes « contexte », contrôle de vitesse.

## Accessibility

Audit WCAG 2.1 AA sur le code (mesures Puppeteer de BOB + vérification du conducteur au navigateur)
et sur le frame Figma (audit des textes ≤ 21 px en bleu et des débordements : 0 défaut).

- **Contrast** — encre sur crème : 20,1:1. Bleu `#006eff` sur crème : **4,27:1**, donc réservé au
  grand texte (≥ 24 px, seuil 3:1) et aux éléments non textuels ; **aucun texte ≤ 21 px en bleu**
  (P-002 CA-2x, P-003 CA-27). Phrases « à venir » à 80 % (3,2:1, grand texte).
- **Focus order** — header (nom, 3 liens, Me contacter) → 3 rôles du `<h1>` → Pause → renvoi →
  « Passer le parcours » → mini-carte → manifeste → Lire Obsolet. Menu mobile : focus piégé, rendu au
  bouton à la fermeture.
- **Focus visible** — contour visible sur tous les liens, rôles, boutons et arrêts de la mini-carte.
- **Semantics** — `<header>` + `<nav aria-label>` ; `<h1>` en vrai texte, `textContent` = `HERO.headline`
  exact (les `|` masqués visuellement) ; décor du hero = **un seul** `<svg aria-hidden>` ; parcours =
  `<ol>` chronologique avec `<time>` et un `<h3>` par temps ; bouton menu avec `aria-expanded` et
  `aria-controls` ; liens externes : `rel="noopener noreferrer"`, ↗ en `aria-hidden`, « (nouvel onglet) » masqué.
- **Touch targets** — ≥ 44 × 44 px partout (le CTA fait 32 px visibles, cible étendue à 44).
- **Motion** — `prefers-reduced-motion` : aucun train, aucun bouton Pause, aucune animation liée au
  scroll ; l'About passe en **socle empilé** (tout le contenu visible, sans épinglage) ; même socle sans JS.
  Le train en boucle a un **Pause** (WCAG 2.2.2).
- **Screen reader** — la mini-carte annonce l'étape courante (`aria-current="step"`) ; le texte n'est
  jamais dupliqué (le manifeste n'a plus d'exergue).
- **Reste à vérifier** : Firefox (repli rAF, pas d'`animation-timeline`), zoom 200 %, et le contour
  du CTA rendu à 1 px au lieu de 1,5 px par Chrome (écart accepté au gate ② du build).

## Motion

Niveau **L3 par moteur natif** (ADR-012) : `animation-timeline` CSS + repli `requestAnimationFrame`,
**zéro GSAP**, un seul écouteur de scroll passif. Pendant le scroll, **seuls `transform` et `opacity`
bougent** (CLS mesuré : 0,0000).

| Mouvement | Durée / courbe |
|---|---|
| Entrée du réseau | 3 tracés, départs 0 / 80 / 160 ms, **arrivée commune à 900 ms**, `cubic-bezier(0.65,0,0.35,1)` ; nœud 240 ms ; sortie tracée à 40 % ensuite |
| Isolement d'une ligne | 160 ms, opacité |
| Train au repos | 90 px/s, 700 ms d'arrêt au nœud, 1,6 s entre deux passages |
| Chute | phrase 1 en 640 ms (+300 ms), phrase 2 en 1200 ms (+440 ms), chiffres ensuite |
| Manifeste | filets qui se tracent, numéros qui roulent ; le texte ne bouge pas |

## Responsive

| Largeur / hauteur | Comportement |
|---|---|
| ≥ 768 px | header complet (nom · 3 liens · CTA) ; hero en géométrie horizontale, groupe centré |
| < 768 px | header : nom · CTA · bouton menu ; les 3 liens passent dans le menu |
| < ~580 px | hero en géométrie verticale : un mot par ligne (~65 px), lignes pliées dans la marge droite, sortie verticale vers l'About |
| hauteur < 640 px | scène de l'About en disposition compacte (toujours épinglée) |
| hauteur < 500 px, mouvement réduit, sans JS | socle empilé |
| 300 → 1920 px | aucun débordement horizontal ; fond crème du hero bord à bord |

## Out of scope

- **Footer** : la section sombre Obsolet + Contact reste en place jusqu'à son cycle (contenu arrêté
  dans `sessions/decisions_talent_2026-09-24.md`). Elle porte une erreur React préexistante (clé
  dupliquée sur les liens Obsolet) que ce cycle ne corrige pas.
- **Lot mise en ligne** : SEO, image Open Graph, favicon, sitemap/robots, 404, pages légales,
  bannière cookies + Google Analytics, anti-spam.
- `:root` et le thème sombre global, `app/(site)/layout.tsx`, `components/ui/`.
- Écrans **mobiles dans Figma** : non dessinés (le code et le prototype font référence).

## Open questions for dev

1. **Firefox** : valider en main le repli rAF (fraction remplie identique au moteur natif à ±2 %, mesurée sous Chrome).
2. **Contour 1,5 px** du CTA : accepter le rendu 1 px de Chrome, ou passer par un trait SVG.
3. **Déploiement** : le build passe depuis l'exclusion de `_stack-test-pulse` (`tsconfig.json`) — à garder tant que la fixture n'est pas réparée.
