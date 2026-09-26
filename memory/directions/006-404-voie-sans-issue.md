---
id: 006
nom: 404 — voie sans issue
date: 2026-09-26
surface: Page 404 — portfolio single-page
verdict: retenue
---

## Les 3 mots
`Butoir` · `Correspondance` · `Affiche`

## Les 5 dimensions

| Dimension | Choix |
|---|---|
| Direction | L'adresse morte est une voie de garage : un rail encre entre par le bord gauche et bute sur un butoir ; un pas avant, une correspondance bleue part à 45° et se termine sur le renvoi « 02 / Parcours → » — la ligne et le lien sont un seul objet |
| Typographie | Playfair 400 grand corps pour « Cette adresse ne mène nulle part. », posé sur le rail ; Inter 300 pour « Le trajet, lui, continue. » ; étiquette de quai et chemin demandé en Inter capitales |
| Palette | Crème · encre = la voie morte, la négation · bleu = la seule correspondance, l'affirmation · ash en filets |
| Tension | Arrêt contre correspondance ; échelle, pas poids ; rail et jonction au même trait 1,5 px |
| Composition | Une colonne, rail bord à bord sous la dernière ligne du titre, butoir au tiers droit, bloc centré dans la hauteur ; mobile : rail vertical le long du titre, butoir sous sa dernière ligne ; tracé L0 une fois, mouvement réduit = état final |

## Références mobilisées
- `references/002-explorateur-creatif.md` — la route alternative du trajet
- `references/001-drive-capital.md` — l'affiche éditoriale, un seul bleu, hairline
- Prototype : `prototypes/005-404-voie-sans-issue.html` (voie Sketch, 4 itérations)

## Verdict du designer

**Retenue** — par Le Talent le 2026-09-26, sur le prototype (Sketch : pas de spec, pas de score).

## Ce que la prochaine direction doit en retenir
- Une correspondance qui ne mène pas physiquement au lien est un décor : la ligne doit *finir* sur l'action (itération 1 ratée sur ce point).
- Le titre doit reposer sur la voie, pas flotter sous un filet : la ligne est l'épine de l'affiche, pas un ornement de tête.
- Un `border` de 1,5 px se résout à 1 px dans Chromium — tracer les traits fins en fond de dimension explicite ou en SVG.
- Mobile : le rail vertical n'a que la hauteur du titre, la voie y pèse moins qu'en desktop — à renforcer si la page passe en Standard (Figma).
- Flèche → : le prototype 004 a le même bug ↓ (rotate 90° au repos) — non corrigé ici.
- impeccable : `overused-font` et `cream-palette` levés (socle) ; `clipped-overflow-container` levé (`overflow-x: hidden` pendant le tracé, rien d'échappable sur la page).
