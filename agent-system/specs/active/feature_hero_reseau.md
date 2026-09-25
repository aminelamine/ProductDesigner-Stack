---
feature_id: P-003
feature_name: Hero — le plan du réseau (+ header crème avec vraie navigation)
tier: T3
epic: aucun — module epic non installé (STACK.md `modules.epic: false`)
statut: VALIDATED — gate ② franchi le 2026-09-24 par Le Talent (« OK go! ») — scope gelé
date: 2026-09-24
commit_ref: "Ref: feature_hero_reseau"
motion_level: L3
motion_zones: ["hero.entree", "hero.survol", "hero.train", "hero.depart", "header"]
motion_note: L3 vient du motif. Le départ est lié au scroll (la ligne de sortie se remplit
  jusqu'à l'About) et un train discret tourne en boucle au repos, avec un bouton Pause (WCAG 2.2.2).
  Entrée et survol sont en CSS pur. Même moteur natif que P-002, avec zéro GSAP et zéro lib (ADR-012,
  ACCEPTED 2026-09-24). Le header reste en L0 (transitions CSS seulement).
---

## Contexte & JTBD

**Direction approuvée au gate ① :** `sessions/brief_feature_hero.md` (points 1 à 5).

**Prototype de référence :** `prototypes/004-accueil.html`, la page intégrée hero + About.
`prototypes/003-hero-reseau.html` (it. 3) reste une référence. Ses écarts 1 à 11 sont **réputés
acceptés** : train au repos, jonction physique. Le Talent les confirme au gate ②.

**Header :** il suit les arbitrages de `sessions/decisions_talent_2026-09-24.md`, qui **font foi**
sur les prototypes. Les pills d'action de 003 et 004 sont jugées non adaptées.

Le hero est **le plan** : 3 rôles LinkedIn verbatim, soit 3 lignes qui convergent en un nœud. Une
ligne en repart et **descend physiquement** jusqu'à la ligne de l'About (P-002). Cela sert le
ressenti de 0 à 5 s décrit dans `client_vision.md` : trois chemins, une seule suite. Au MÉMORISER,
cette direction remplace `directions/002` sur la surface Hero.

## Tâches

1. **Données** (`lib/data.ts`) :
   - `HERO.headline` reste inchangé ;
   - `NAV_ITEMS` est **conservé et mis à jour** : Parcours → `#parcours`, Manifeste → `#manifeste`,
     Obsolet → `https://obsolet.substack.com/` (externe) ;
   - on ajoute `HEADER_CTA` (« Me contacter » → `#contact`) et les textes ✎ approuvés : « Pause » /
     « Lecture » avec la mention masquée « l'animation du plan », et le renvoi « 02 / Parcours ».

   Les chaînes du hero ne sont plus écrites en dur dans `hero.tsx`.
2. **Header crème, vraie navigation** (decisions/003, proposée). `header.tsx` passe en `.theme-drive`
   avec les variables de police, un filet ash et un fond opaque et plat. Il contient :
   - à gauche, le nom (`SITE.name`) ;
   - à partir de 768 px, au centre, les liens texte Parcours · Manifeste · Obsolet ↗ ;
   - à droite, un seul bouton « Me contacter » (pill outlined).
3. **Menu mobile** (< 768 px) : on adapte `mobile-nav.tsx` sur le Sheet Shadcn existant, repris au
   socle crème. Le déclencheur porte `aria-expanded` et `aria-controls`. Le focus est piégé dans le
   menu, Échap le ferme et rend le focus au déclencheur, et un clic sur un lien le ferme.
4. **Géométrie pure** (`lib/hero-network.ts` + `.check.ts`, sans DOM ni `"use client"`). À partir des
   mesures, elle produit :
   - le mode horizontal ou vertical ;
   - les 3 polylignes octolinéaires ;
   - le nœud, placé 1 pas après le nom le plus long ;
   - les repères 002 (0,3 em) ;
   - la jonction : nœud ↓ 90°, pli à 45°, ↓ 90° sur `[data-junction-target]`, avec un premier pli
     sans collision à 20 px de marge ;
   - les longueurs, et les timings d'entrée : départs à 0 / 80 / 160 ms, arrivée commune à 900 ms ;
   - les points du départ au scroll et du train.
5. **Titre et composition** (Server) : `<section id="hero">` en plein cadre (ADR-011,
   `overflow-x-clip`). Le `<h1>` en texte réel porte 3 rangées, avec les ` | ` en `<span>`
   visuellement masqués. La composition est **déterminée par le CSS** : corps en `clamp`, bascule
   horizontal / vertical à ~580 px, centrage optique en `calc()` sur des constantes en em. Le JS ne
   déplace jamais le texte. Le sous-titre suit.
6. **Réseau** (îlot client) : un seul `<svg aria-hidden="true" focusable="false">`, tracé depuis
   `lib/hero-network.ts`, recalculé au redimensionnement et au chargement des polices. Il déborde
   vers le bas (jonction).
7. **Entrée, une fois par chargement, en CSS** : les 3 tracés arrivent ensemble au nœud. L'allumage
   des repères et des noms passe de 80 % à 100 %. Le nœud apparaît avec un anneau, la sortie se
   trace à 40 %, puis sous-titre, Pause et renvoi apparaissent en opacité.
8. **Isoler une ligne** : au survol (`hover: hover`) ou au focus d'un rôle, les 2 autres lignes
   passent à 40 % et leurs noms à 80 %, tandis que la sortie et la jonction passent en plein.
9. **Train au repos** (Web Animations) :
   - une ligne après l'autre, arrêt de 700 ms au nœud, 90 px/s, 1,6 s entre deux passages ;
   - il s'arrête au survol ou au focus d'un rôle, quand l'onglet est caché, dès que le scroll dépasse
     0, et au bouton Pause (qui bascule en Lecture).
10. **Départ au scroll** (moteur partagé P-002) : la sortie et la jonction se remplissent de 40 % à
    plein jusqu'à l'arrivée du seuil de l'About, et un point les parcourt. Le relais revient à
    P-002, tâche 8. Le **renvoi** « 02 / Parcours → » pointe vers `#parcours`, contre la sortie.
11. **Nettoyage** : on supprime `hero-trajectory.tsx`, `hero-illustration.tsx`, `lib/hero-motion.ts`,
    `lib/hero-rail.ts`, `lib/hero-trajectory.ts` et leurs `.check.ts`. `lib/hero.check.ts` reste.
    `motion/react` sort du hero.

## User stories

**Story 1 — Le plan se trace, puis se tait :**
```gherkin
Given un visiteur charge la page, à 1440 × 900, sans mouvement réduit
When le hero s'affiche
Then le headline est lisible dès la première frame, à 80 % d'opacité au minimum
  And les 3 lignes se tracent depuis le bord gauche et arrivent au nœud au même instant
  And un train discret passe ensuite, qu'un bouton Pause arrête
```

**Story 2 — Descendre vers le trajet :**
```gherkin
Given le hero est affiché
When le visiteur scrolle vers le bas
Then la ligne de sortie se remplit du nœud jusqu'à la ligne de l'About, sans rupture
  And à l'arrivée, la tête de lecture de l'About apparaît et le train au repos est arrêté
```

**Story 3 — Naviguer depuis un mobile :**
```gherkin
Given un visiteur à 375 px de large, au clavier ou au toucher
When il ouvre le menu puis choisit « Manifeste »
Then le menu se ferme et la page va au titre du manifeste
  And Échap, menu ouvert, ferme le menu et rend le focus au bouton qui l'a ouvert
```

**Story N — Edge case : mouvement réduit :**
```gherkin
Given prefers-reduced-motion
When le hero s'affiche puis que le visiteur scrolle
Then l'état final est posé d'emblée (lignes tracées, noms à 100 %, nœud présent, sortie à 40 %)
  And il n'y a ni train, ni bouton Pause, ni remplissage au scroll
```

## Critères d'acceptation

| ID | Critère | Réf. | Notes |
|---|---|---|---|
| CA-1 | ADR-012 est `ACCEPTED` et decisions/003 est `actée` avant le premier commit des tâches 2 et 7 | Dép. | Bloquant |
| CA-2 | `HERO.headline === "Creative Explorer \| Product Designer \| Agentic Design"` (`lib/hero.check.ts` inchangé, vert) | T1 | Verrou P-001 CA-5 |
| CA-3 | Le `textContent` du `<h1>` est strictement égal à `HERO.headline` | T5 | Remplace la formulation « texte visible concaténé » de P-001 v2 CA-6 : voir gate ② |
| CA-4 | Les 3 rôles sont visibles dans l'ordre, chacun sur sa propre rangée, et aucun `\|` n'est visible, à 300, 375, 768, 1024, 1440 et 1920 px | T5 | |
| CA-5 | En géométrie verticale, un nom peut passer à la ligne entre ses mots, et aucun mot n'est tronqué à 300 px | T5 | Learning P-001 |
| CA-6 | La position `left` et `top` du `<h1>` est identique (±1 px) entre la première peinture et 2 s après le chargement | T5 | Pas de décalage par JS |
| CA-7 | L'opacité calculée du `<h1>` n'est jamais < 0,8, à aucun instant de l'entrée | Story 1 | LCP |
| CA-8 | Le hero contient exactement un `<svg>` de décor, et il porte `aria-hidden="true"` | T6 | |
| CA-9 | À 1440 px, les 3 tracés d'entrée finissent à 900 ms (±20 ms) | Story 1 | |
| CA-10 | La géométrie n'emploie que des segments à 0°, 45° et 90°, avec `stroke-linejoin: miter`, et aucun trait ne dépasse 1,5 px | T4 | `.check.ts` |
| CA-11 | Le dernier point de la jonction coïncide (±1 px) avec `[data-junction-target]`, à 375 et à 1440 px | Story 2 | Rendu réel |
| CA-12 | Le tracé de la jonction ne croise aucune boîte de texte du hero (noms, sous-titre, Pause, renvoi), avec 20 px de marge | T4 | `.check.ts` + rendu |
| CA-13 | Au scroll du seuil de l'About au haut de l'écran, la jonction est entièrement pleine (opacité de trait 1) | Story 2 | |
| CA-14 | Le train ne se déplace plus après un clic sur Pause, et reprend après Lecture | T9 | WCAG 2.2.2 |
| CA-15 | Le train est arrêté quand `document.hidden` vaut vrai, et dès que `scrollY` > 0 | T9 | |
| CA-16 | En mouvement réduit : aucun train, aucun bouton Pause dans l'arbre d'accessibilité, aucune animation liée au scroll dans le hero | Story N | |
| CA-17 | Le focus d'un rôle met les 2 autres lignes à une opacité de 0,4 | T8 | Écart 1 accepté |
| CA-18 | Le renvoi « 02 / Parcours » a `href="#parcours"` | T10 | |
| CA-19 | À ≥ 768 px, le header contient, dans l'ordre du DOM : le nom, un `<nav>` étiqueté avec 3 liens (Parcours → `#parcours`, Manifeste → `#manifeste`, Obsolet → externe), puis un seul lien « Me contacter » → `#contact` | T2 | Libellés et href depuis `NAV_ITEMS` / `HEADER_CTA` |
| CA-20 | Chaque lien vers Obsolet (header et menu) a `target="_blank"`, `rel="noopener noreferrer"`, une icône ↗ en `aria-hidden` et le texte masqué « (nouvel onglet) » | T2/T3 | |
| CA-21 | « Me contacter » mesure 32 px de haut (±1), a une cible ≥ 44 × 44 px, un contour de 1,5 px `#006eff`, un radius de 60 px et un fond transparent | T2 | Seule pill du header |
| CA-22 | Sous 768 px, les 3 liens de nav ne sont pas visibles dans le header. Un bouton de menu est visible, avec `aria-expanded="false"` fermé et `"true"` ouvert, et un `aria-controls` qui pointe vers le panneau | T3 | |
| CA-23 | Menu ouvert : le focus est dans le panneau, Tab ne quitte pas le panneau, Échap le ferme et rend le focus au déclencheur, et un clic sur un lien le ferme | Story 3 | Sheet Shadcn, sans modifier `components/ui/` |
| CA-24 | Le header ne déborde pas horizontalement à 300 px (`scrollWidth ≤ clientWidth`) | T2/T3 | |
| CA-25 | Le fond du header et du panneau du menu est `#fff8f1` opaque, sans `backdrop-filter`. Le header a une bordure basse de 1 px `#e2e8f0` | T2/T3 | decisions/003. Le panneau, rendu en portail, porte lui aussi `.theme-drive` |
| CA-26 | Le texte du header, du menu et du hero n'utilise que Playfair Display et Inter, sans police mono | T2 | Socle `identity.md` |
| CA-27 | Aucun texte ≤ 21 px n'est en Voltage Blue, ni dans le hero, ni dans le header, ni dans le menu | — | AA |
| CA-28 | Aucun `box-shadow`, dégradé ni radius hors 0 / 50 % / 60 px, dans le hero, le header et le menu, attributs SVG `rx` / `ry` compris | — | Socle |
| CA-29 | À 300, 375, 768, 1024, 1440 et 1920 px : `scrollWidth ≤ innerWidth`, et le fond crème du hero touche les deux bords | — | ADR-011 |
| CA-30 | Avec le moteur natif forcé indisponible, le repli rAF donne la même fraction remplie de la sortie (±2 %) à 10 positions de scroll | T10 | ADR-012 |
| CA-31 | Aucun composant du hero ou du header n'écrit de style ni d'attribut dans le DOM de `#about` | T6 | Contrat P-002 |
| CA-32 | Les fichiers `components/hero*.tsx`, `header.tsx`, `mobile-nav.tsx` et tout nouveau composant font ≤ 150 lignes. Zéro `any`, zéro `@ts-ignore` | — | |
| CA-33 | Aucun fichier de `components/ui/`, ni `:root`, ni `app/(site)/layout.tsx`, ni `footer.tsx` n'est modifié | — | Diff |
| CA-34 | `package.json` ne gagne aucune dépendance, et aucun `components/hero*.tsx` n'importe `motion/react` | T11 | |

## Critères quantitatifs

| Métrique | Cible | Mesure |
|---|---|---|
| CLS au chargement | ≤ 0,02 | PerformanceObserver `layout-shift` sur 3 s, 375×812 et 1440×900 |
| Élément LCP | le `<h1>` du hero | Trace Chrome |
| Jugement du Talent | approbation explicite du rendu réel | Revue Chrome |

## HORS SCOPE

- **Footer** : cycle à venir. Son contenu est arrêté dans `sessions/decisions_talent_2026-09-24.md`.
  `footer.tsx` n'est pas touché.
- **Lot mise en ligne** : SEO, Open Graph, favicon, sitemap et robots, 404, pages légales,
  bannière cookies et Google Analytics, anti-spam. Cycle suivant.
- **Contact**, et le contenu de l'About (P-002).
- **`:root` et le thème sombre global** : non touchés, tout passe par `.theme-drive`.
  **`app/(site)/layout.tsx`** : non touché (ADR-011). Le header change dans `header.tsx`.
- **Ce que les prototypes simulent** : panneaux d'outils, étiquettes de contexte, instantané figé de
  l'About, Google Fonts. Les **pills d'action du header de 003 et 004** sont remplacées par la nav.
- **État actif des liens** selon la section visible (scroll-spy) : non demandé.
- **Paraphrase du headline**, hook textuel, date dans le hero, graticule, aplat, courbe libre.
- La couture « header crème sur sections sombres » : coût accepté par decisions/003.
- Mettre à jour `identity.md → L'histoire visuelle` : décision du Talent au MÉMORISER.
- Supprimer la dépendance `motion` du projet.

## Dépendances

- **ADR-012** `ACCEPTED` et **decisions/003** `actée` (CA-1), bloquant.
- **P-002** : moteur partagé, `[data-junction-target]`, relais, cibles `#parcours` et `#manifeste`.
  P-002 d'abord, puis P-003, **livrés ensemble**.
- ADR-009 et ADR-011 repris tels quels.

## ADR check

- [x] ADR_INDEX lu. ADR-007 est à amender, d'où ADR-012. ADR-009 liste `header.tsx` et
  `mobile-nav.tsx` comme hors scope : c'est levé par decisions/003, à annoter à l'acceptation.
- [x] Nouvel ADR : **oui**, ADR-012 (commun à P-002). Le menu reprend le Sheet Shadcn déjà présent
  (ADR-001), sans nouvelle dépendance.

## Notes BOB

- Shadcn : `Sheet` (déjà dans `components/ui/`, non modifié) pour le menu. Il fournit le piège de
  focus et Échap. Il est rendu en portail, donc hors de l'arbre `.theme-drive` : il faut appliquer
  `.theme-drive` et les variables de police sur `SheetContent`. Pas de `buttonVariants` s'il
  réintroduit des styles hors socle. Lucide `ExternalLink` et `Menu`.
- **La nav du header n'a pas de prototype** : 003 et 004 montrent encore les pills. Liens texte en
  Inter 300 et encre, soulignement bleu au survol et au focus (grammaire de « Passer le parcours »).
  La mise en page exacte se tranche au Figma de PRODUIRE.
- **Sans JS** : titre, sous-titre et header visibles, pas de réseau. Sous 768 px, le menu ne
  s'ouvre pas sans JS. C'est un écart assumé au brief : la jonction évitant les obstacles exige une
  mesure. Le texte ne dépend jamais du JS (CA-6).
- CSS du hero en CSS Module. Keyframes à géométrie variable : custom properties ou Web Animations,
  pas de `<style>` injecté. Rôles dérivés de `HERO.headline`, jamais retapés.
- Ordre de focus : nom, nav (ou menu), « Me contacter », les 3 rôles, Pause, renvoi.

## Notes ANALYZER

- Focus : CA-3 et CA-6 (verbatim + zéro décalage), CA-11 à CA-13 (jonction), CA-14 à CA-16
  (WCAG 2.2.2), CA-22 et CA-23 (menu), CA-30 (repli).
- Edge cases : ancre `#manifeste` qui saute par-dessus la scène épinglée (fiche et compteurs se
  posent sans roulement, P-002), header à 300 px, menu ouvert au redimensionnement vers ≥ 768 px,
  polices lentes.
- Signal CX : masquer les noms, et vérifier si les lignes restent visiblement *leurs* lignes (test
  anti-001).

## Historique

| Date | Version | Changement | Par |
|---|---|---|---|
| 2026-09-24 | v0.1 | Création contre le brief approuvé et le prototype 003 it. 3 | RAY |
| 2026-09-24 | v0.2 | Header : vraie navigation + menu mobile (`decisions_talent_2026-09-24.md`), `NAV_ITEMS` conservé. Prototype de référence 004. HORS SCOPE footer et lot mise en ligne | RAY |
