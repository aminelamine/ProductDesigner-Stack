---
id: 002
nom: Hero — le headline est le trajet
date: 2026-09-08
surface: Hero — portfolio single-page
verdict: retenue
---

## Les 3 mots
`Affiche` · `Jalonné` · `Une voix`

## Les 5 dimensions

| Dimension | Choix |
|---|---|
| Direction | Le headline devient lui-même le trajet — trois arrêts empilés, chacun jalonné d'un repère deux tons, reliés par un tracé qui se dessine à l'arrivée. La route est la mise en page. Fond crème plein cadre, une seule voix chromatique |
| Typographie | Inchangée — Playfair Display 400 / Inter 300–400 *(carried 001)* |
| Palette | Inchangée — crème `#fff8f1` · Voltage Blue `#006eff` · encre `#000000` · ash `#e2e8f0` *(carried 001)* |
| Tension | Échelle, pas poids *(carried)* + tension spatiale nouvelle : trois lignes denses et jalonnées contre un bloc sous-titre + CTA généreusement dégagé |
| Composition | Une seule colonne. Le `<h1>` porte 3 lignes-blocs, une par segment, chacune précédée d'un repère `aria-hidden` dimensionné en `em` — il suit le type scale sans logique mobile séparée. Rail vertical 1,5px reliant les 3 repères, dessiné en `scaleY` origin top |

## Références mobilisées
- `references/style-drive-capital.md` — palette et échelle, reconduites sans être rouvertes

## Verdict du designer

**Retenue** — la composition est nettement resserrée : la colonne flanquante disparaît et le
headline porte lui-même la structure. Une ligne = un arrêt du trajet, repère compris.

## Ce que la prochaine direction doit en retenir

- Quand une direction est reconduite, **ne rouvrir que ce qui est explicitement listé comme ouvert**.
  Ici : forme des marqueurs, comportement mobile, dispositif motion. Le reste est carried.
- Dimensionner les éléments décoratifs en **`em` relatifs à la ligne** supprime le besoin d'une
  logique responsive séparée.
- Un dispositif de motion doit **traduire le concept** (le tracé se dessine), pas appliquer un
  fade+translate uniforme.
