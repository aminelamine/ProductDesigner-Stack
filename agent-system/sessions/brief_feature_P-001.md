---
feature_id: P-001
feature_name: Hero — trajet + système Drive Capital (cycle 2 — RE-SPEC)
date: 2026-09-08
quality_brief_type: aesthetic
motion_level: L1
spec: agent-system/specs/active/feature_p-001_hero.md (VALIDATED, T3, cycle 2)
adr: agent-system/adr/adr-011-hero-full-bleed-scoped-breakout.md (✅ ACCEPTED) ·
  agent-system/adr/adr-009-hero-theme-scope-drive-capital.md (✅ ACCEPTED, inchangé)
supersedes: ce fichier remplace la version cycle 1 (même chemin) — le rendu cycle 1 reste tracé en
  `specs/shipped/feature_p-001_hero.md`, le commit `84ed947`, et les décisions de cycle 1 encore
  valides (palette, typo, dégression 144px, résolution CA-16 sur les pills) sont reprises ci-dessous
  sans être rouvertes.
statut: ✅ APPROUVÉ — Le Talent
---

# [BOB] ⏸ Quality Brief — P-001 : Hero (cycle 2)

Ce cycle ne repart pas de zéro. La direction Drive Capital (palette, typographie, pills outlined,
verbatim LinkedIn, concept trajet Option 2) est arrêtée depuis le cycle 1 et n'est pas rouverte ici.
Trois points, et seulement trois, sont laissés ouverts par les Notes BOB de la spec v2 et tranchés
dans ce brief : **la forme exacte des marqueurs au-delà du minimum de 3, le comportement du trajet
en mobile, et le choix du dispositif motion.** Tout le reste ci-dessous est soit carried (inchangé
depuis le brief cycle 1), soit une conséquence directe des Tasks 1–4 de la spec v2.

---

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[AESTHETIC BRIEF — Feature P-001 : Hero — cycle 2]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Direction    : Le headline devient lui-même le trajet — trois arrêts empilés (Creative Explorer /
                  Product Designer / Agentic Design), chacun jalonné d'un repère deux tons, reliés
                  par un tracé qui se dessine à l'arrivée sur la page. Plus un panneau isolé dans une
                  colonne latérale : la route est la mise en page. Fond crème plein cadre (ADR-011),
                  une seule voix chromatique.

🔤 Typographie  : Inchangé, carried cycle 1 — Playfair Display (400, display) / Inter (300 labels ·
                  400 corps/CTA). Non rouvert (spec v2, OUT OF SCOPE).

🎨 Palette      : Inchangée, carried cycle 1 — Drive Capital (style-drive-capital.md)
                  Fond : #fff8f1 (cream) · Accent unique : #006eff (Voltage Blue)
                  Texte : #000000 (ink) · Neutre structurel : #e2e8f0 (ash, hairlines uniquement)

⚡ Tension      : Échelle, pas poids (carried) — headline Playfair 400 à 40–120px selon breakpoint
                  contre labels/subtitle Inter 300–400 ≤21px. Nouvelle tension spatiale : trois
                  lignes denses et jalonnées (le trajet) contre un unique bloc sous-titre + CTA
                  généreusement dégagé en dessous — la colonne flanquante du cycle 1 disparaît, la
                  page redevient une seule colonne, plus proche de la lecture "affiche" que
                  "template 2 colonnes" reprochée par Le Talent.

📐 Composition  : Le `<h1>` porte 3 lignes-blocs, une par segment ("Creative Explorer |" /
                  "Product Designer |" / "Agentic Design"), chacune sa propre unité de bloc — plus
                  de dépendance au reflow naturel pour séparer les segments (CA-7). Chaque ligne est
                  précédée d'un repère (waypoint) deux tons, aria-hidden, dimensionné en unités `em`
                  relatives à la taille de ligne — donc il suit le type scale responsive sans logique
                  mobile séparée. Un rail vertical 1,5px Voltage Blue relie les 3 repères et se
                  dessine (scaleY, origin top, stagger par segment) à l'arrivée sur la page — c'est
                  le dispositif qui traduit "le trajet" (CA-17), pas un fade+translate uniforme.
                  Sous ce bloc trajectoire : le sous-titre existant (`HERO.subtitle`, verbatim) puis
                  les 2 pills CTA outlined, en un seul bloc, plus de colonne flanquante séparée.
                  Le wrapper plein cadre + dégression de marge (`px-6 / md:px-16 / lg:px-36`,
                  ADR-011) est inchangé — carried cycle 1.
                  Séquence d'entrée toujours 3 `motion.div` max : container + item(bloc trajectoire)
                  + item(sous-titre/CTA). Le rail n'est pas un `motion.div`, budget préservé.

⚠️  À éviter ici : bouton rempli (filled) · deuxième teinte chromatique · ombre/dégradé/texture ·
                  image photographique · Voltage Blue sur texte < 18px régulier / < 14,66px gras
                  (CA-14) · plus de 3 `motion.div` · tout radius hors 0px / 60px, y compris `rx`/`ry`
                  SVG des repères · repère isolé dans une colonne latérale déconnectée du headline ·
                  `<br>` conditionnels par breakpoint pour séparer les segments · réutilisation du
                  radius 60px des pills sur les repères (le pill reste exclusif aux CTA).

📎 Référence    : style-drive-capital.md (palette, échelle typo, pill outlined, traitement plat de
                  l'illustration) · concept-explorateur-creatif.md Option 2 (le trajet comme
                  structure de page, pas comme décor) · ADR-011 (wrapper plein cadre).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Approuver en une ligne, ou me dire quoi ajuster.
```

---

## Points tranchés (les 3 laissés ouverts par les Notes BOB de la spec v2)

| Point | Décision | Justification |
|---|---|---|
| **Forme exacte des marqueurs (au-delà du minimum de 3)** | Un composant `HeroWaypoint` unique, réutilisé 3×, un par segment : un nœud rond noir (`<circle>`/`<ellipse>`, pas de `<rect>` arrondi — évite toute ambiguïté `rx`) + une barre horizontale Voltage Blue `fillOpacity 0.4` (`<rect rx="0">` strict, corrige l'anti-pattern `rx="11"` signalé par `feature_P-001_learnings.md`), largeur dégressive par index (ex. 40/32/24px) pour garder la lecture "étapes d'un trajet" déjà validée en cycle 1 ("bras bleus dégressifs" noté positivement dans les learnings), redistribuée en 3 instances adjacentes au lieu d'un objet unique empilé en colonne. | Réutilise la grammaire visuelle du signpost v1 (deux tons, formes simples) sans la réinventer (Notes BOB) ; corrige l'anti-pattern radius ; satisfait CA-8/CA-9 par construction — chaque repère est physiquement dans la même ligne flex que son segment, donc chevauche son étendue verticale, jamais confiné dans une colonne déconnectée. |
| **Comportement du trajet en mobile** | Même structure à tous les breakpoints — pas de variante mobile simplifiée, pas de masquage des repères sous `lg:`. Les 3 lignes-blocs (marqueur + segment) et le rail restent visibles dès 375px ; seule leur taille suit le type scale responsive existant (`text-[40px] … lg:text-[120px]`) via des dimensions `em` sur le marqueur. | Le trajet structure la page, pas un bonus desktop — la spec vise justement le ressenti 0–5s de `client_vision.md`, valable sur tout device. Éviter une logique conditionnelle par breakpoint réduit aussi la surface de bug (cohérent avec l'anti-pattern `<br>` par breakpoint déjà écarté pour Task 2). |
| **Dispositif motion (tracé CSS vs décalage spatial différencié)** | Tracé — mais en rail CSS (`transform: scaleY()`, `transform-origin: top`, 1,5px Voltage Blue) reliant les 3 repères plutôt qu'un `<path>` SVG à `stroke-dashoffset` : un rail par segment de connexion (entre repère N et N+1) est trivialement responsive dans un layout flex empilé, alors qu'un `<path>` unique demanderait des coordonnées `viewBox` recalculées par breakpoint. Le rail est hors budget `motion.div` (pur CSS), et son état "réduit" est piloté par le **même** `shouldReduce` (booléen `useReducedMotion()`) déjà calculé dans `Hero()` pour les 2 `motion.div` — passé en prop au bloc trajectoire pour basculer une classe/style qui neutralise l'animation du rail, plutôt qu'une `@media (prefers-reduced-motion)` CSS indépendante. | CA-16 formule explicitement "`useReducedMotion` encadre l'ensemble, **y compris** le dispositif de Task 4" — une seule source de vérité (le hook, pas un media query CSS séparé) évite un désaccord possible entre les deux mécanismes et reste dans l'esprit du pattern déjà loué par `feature_P-001_learnings.md` (variants motion extraits en module pur, prouvables par `.check.ts`). Le rail directement connecté aux repères satisfait CA-17 sans ambiguïté ("lien visible avec les marqueurs"). |

## Ce qui reste carried, inchangé depuis le brief cycle 1

- **Dégression 144px** : `px-6` (24px) base · `md:px-16` (64px) · `lg:px-36` (144px), désormais mesurée depuis le vrai bord du viewport via le wrapper plein cadre d'ADR-011 (le bug du cycle 1 — l'addition avec le padding de `<main>` — est résolu par ADR-011, pas par ce brief).
- **Résolution CA-14 appliquée aux pills** (ex-CA-16 v1) : le label du pill reste en Ink `#000000` à 16px/Inter 300 ; seul le contour 1,5px reste Voltage Blue — le bleu ne descend jamais sous le seuil WCAG en texte.
- **Sous-titre et CTA** : `HERO.subtitle` verbatim ("Product Designer – AI & Product Systems", `lib/data.ts`), 2 pills outlined ("Me contacter", "Lire Obsolet ↗") — aucune copie nouvelle inventée (CA-18).
- **2 familles de police uniquement**, exposées en variables scopées au thème du hero — aucune nouvelle dépendance npm.

## Vérification anti-contradiction (spec frozen, §2b BOB_aesthetic_gate.md)

Chaque critère visuel de la spec v2 confronté aux dimensions ci-dessus — aucun conflit détecté :

- CA-6 (texte headline verbatim, concaténation exacte) ↔ 3 lignes-blocs "Creative Explorer |" /
  "Product Designer |" / "Agentic Design" concaténées = le texte exact, espace insécable avant
  chaque "|" pour qu'il ne se détache jamais du mot précédent — conforme.
- CA-7 (aucune ligne ne commence par "|", séparation non dépendante du reflow) ↔ chaque segment est
  son propre bloc (`display: block`), le "|" est collé en fin de ligne précédente via ` |` —
  structurel, pas de `<br>` conditionnel — conforme.
- CA-8/CA-9 (≥3 repères, chacun adjacent à un segment, chevauche ≥2 des 3 étendues verticales) ↔
  3 `HeroWaypoint` en ligne flex avec leur segment respectif — chevauchement garanti par
  construction, jamais de colonne latérale isolée — conforme.
- CA-10 (deux remplissages exacts : Voltage Blue opacité réduite + noir) ↔ `HeroWaypoint` = cercle
  noir + barre Voltage Blue `fillOpacity 0.4`, rien d'autre — conforme.
- CA-11 (zéro shadow/gradient, radius 0 ou 60 uniquement, y compris `rx`/`ry` SVG) ↔ `<rect rx="0">`
  strict sur la barre, `<circle>`/`<ellipse>` pour le nœud (pas de radius applicable), rail CSS sans
  `border-radius` — conforme, corrige l'anti-pattern `rx="11"` de cycle 1.
- CA-12 (pills 60px, contour 1,5px, transparent, jamais filled) ↔ inchangé — conforme.
- CA-13 (cream + Voltage Blue seuls, ink/ash neutres) ↔ rail et repères n'introduisent aucune
  troisième teinte — conforme.
- CA-14 (Voltage Blue jamais < 18px régulier / < 14,66px gras) ↔ aucun texte n'est ajouté en dessous
  de ce seuil ; résolution pill inchangée — conforme.
- CA-15 (2 polices, variables scopées, zéro nouvelle dépendance) ↔ inchangé — conforme.
- CA-16 (≤3 `motion.div`, `useReducedMotion` encadre l'ensemble y compris Task 4) ↔ container +
  2 items = 3 ; rail piloté par le même booléen `shouldReduce`, pas un media query indépendant —
  conforme par construction, pas seulement par intention.
- CA-17 (distinction spatiale liée au trajet, pas un fade+translate uniforme sans lien visible) ↔ le
  rail relie explicitement les 3 repères — conforme, c'est le critère que ce dispositif a été choisi
  pour satisfaire.
- CA-18 (aucune copie inventée) ↔ repères et rail sont décoratifs (`aria-hidden`), aucun texte
  nouveau ; sous-titre repris verbatim — conforme.
- CA-19 (150 lignes max, split autorisé) ↔ recommandation d'implémentation : garder les 3
  `HeroWaypoint` + le rail dans `hero-illustration.tsx` (ou un `hero-trajectory.tsx` dédié si le
  bloc lignes+repères+rail alourdit `hero.tsx` au-delà du cap) — décision de fichier laissée à
  l'implémentation, la contrainte de lignes n'est pas négociable.

Aucun des choix ci-dessus n'oblige à rouvrir un critère gelé de la spec VALIDATED — la composition
et le dispositif motion sont les deux axes explicitement rouverts par cette spec v2 (Tasks 3–4),
rien d'autre n'est touché.

---

**[BOB] ⏸ En attente de validation. Aucune ligne de code avant approbation explicite.**
