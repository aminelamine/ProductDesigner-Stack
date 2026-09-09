---
id: 001
nom: Hero Drive Capital — panneau en colonne flanquante
date: 2026-09-08
surface: Hero — portfolio single-page
verdict: refusée
---

## Les 3 mots
`Éditorial` · `Net` · `Orienté`

## Les 5 dimensions

| Dimension | Choix |
|---|---|
| Direction | Système Drive Capital scopé au hero — un panneau signpost deux tons dans une colonne latérale, headline verbatim LinkedIn à gauche |
| Typographie | Playfair Display 400 (display) / Inter 300–400 (labels, corps, CTA) |
| Palette | Fond crème `#fff8f1` · accent unique Voltage Blue `#006eff` · encre `#000000` · ash `#e2e8f0` en filets |
| Tension | Échelle, pas poids — Playfair 40–120px contre Inter ≤21px |
| Composition | Deux colonnes : headline à gauche, illustration signpost isolée à droite. Séquence d'entrée en 3 `motion.div` + `useReducedMotion` |

## Références mobilisées
- `references/style-drive-capital.md` — palette, pills outlined, rapport d'échelle

## Verdict du designer

**Refusée** — malgré une conformité de 18/20, trois choses ne tiennent pas à l'œil : le plein cadre
n'est jamais atteint (le hero est additif au padding de `<main>`), le `|` reste orphelin en fin de
ligne en desktop, et la composition deux colonnes avec une icône isolée à droite lit comme un
template, pas comme une affiche.

## Ce que la prochaine direction doit en retenir

- Sur ce produit, une composition **deux colonnes avec un élément graphique isolé** lit générique.
  Le hero doit rester **une seule colonne**.
- Le plein cadre est une **décision de structure**, pas un réglage de padding — il ne s'obtient pas
  en ajoutant de la largeur à une section contenue.
- Tout headline découpé en segments doit protéger ses glyphes de liaison **par construction**,
  jamais par le reflow naturel.
