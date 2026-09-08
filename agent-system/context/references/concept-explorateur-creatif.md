# Concept — « explorateur créatif »

> Apporté par Le Talent le 2026-09-08, en même temps que la référence de style Drive Capital.
> **Les 3 images sources ne sont pas sur disque** — elles ont été partagées en conversation.
> Ce fichier est leur transcription, écrite pour survivre au changement de session.
> Si BOB doit les voir, les déposer dans `agent-system/context/references/img/`.

Intention formulée : *« vu que j'aime dire que je suis un explorateur créatif, voici les refs »*.

## Ce que montrent les 3 références

**Réf 1 — « PORTFOLIO 2026 », Durga Vaishnav.** Flat-lay illustré sur un tapis de découpe vert
quadrillé : crayons de couleur, copeaux de taille-crayon, trombones, post-it « TO-DO LIST », tube
de colle, carnet à spirale avec des croquis de personnages, sticker-portrait dessiné. Le mot
PORTFOLIO est lettré à la main sur un morceau de papier déchiré scotché. Registre : **atelier,
tactile, artisanal, fait-main**. Le désordre est la mise en scène du travail.

**Réf 2 — « The Road to Wellness ».** Infographie-parcours : un chemin sinueux traverse toute la
page, jalonné d'étapes numérotées, de personnages en action, de panneaux. Typographie mixte,
lettrage manuscrit, palette rétro-flat. Structure narrative explicite : `START → LEARN · BUILD ·
GROW → MILESTONE`. Registre : **jeu de plateau, progression, étapes visibles**.

**Réf 3 — « Career Road Map — Become an Architect ».** Même dispositif, exécution isométrique sur
fond noir/violet. Le trajet devient un plateau 3D avec bâtiments et véhicules. Surtout : une
**légende** en bas définit un vocabulaire — *mini destination · pit stops · obstacles · life roles ·
bridge · alternate route*. Registre : **carte de trajectoire, avec sa grammaire**.

## Le fil commun

Les trois racontent **un trajet**, pas un catalogue. Aucune n'est une grille de projets.
Le sujet n'est pas *ce que j'ai produit* mais *par où je suis passé* — étapes, détours, obstacles,
routes alternatives. C'est ce que « explorateur créatif » veut dire ici, et c'est structurant :
ça décrit une **architecture d'information**, pas une décoration.

## Le conflit à trancher — et pourquoi il n'est pas insoluble

La référence de style (`style-drive-capital.md`) et ces 3 références **ne sont pas dans le même
registre visuel** :

| | Drive Capital | Réfs 1–3 |
|---|---|---|
| Densité | spacious, colonne centrée unique | dense, trajet sinueux, lecture non linéaire |
| Couleur | monochrome bleu sur cream, **une seule teinte** | multicolore assumé |
| Surface | strictement plate, zéro texture | textures, papier déchiré, grain, isométrie |
| Typo | didone hairline + grotesk 300 | lettrage manuscrit, casses mélangées |
| Illustration | *« Icons are absent »* | l'illustration **est** le contenu |

Appliqués littéralement ensemble, ils s'annulent.

**Le pont existe, et il est dans la référence elle-même.** Drive Capital est décrit comme un
*« retro road-trip poster »* — c'est déjà un trajet. Et son unique porte d'entrée pour l'image est
explicite : *« flat vector illustration, two-color treatment: Voltage Blue at reduced opacity for
primary forms, true black for shadows… mid-century editorial: simplified automotive silhouette »*.

Soit : **le trajet comme structure de la page, exécuté dans la langue éditoriale de Drive Capital**
— cream, un seul bleu, aplats deux tons, hairline monumental. Pas le crayon de couleur, pas
l'isométrie, pas la seconde teinte.

C'est une hypothèse de synthèse, **pas une décision** : elle appartient au Quality Brief, et c'est
exactement le genre d'arbitrage que le gate esthétique doit faire trancher avant la première ligne
de CSS.

## ✅ Direction tranchée par Le Talent — 2026-09-08

**Option 2 — illustration deux tons.** Le trajet structure la page ; l'image y entre par la seule
porte que la référence de style ouvre elle-même : *flat vector, deux tons, Voltage Blue à opacité
réduite pour les formes, noir pour les ombres, silhouette mid-century éditoriale*.

Ce que ça engage, concrètement :

- Des **silhouettes plates bleu/noir** jalonnent le parcours. Elles ne décorent pas : elles
  marquent les étapes, comme les panneaux des réfs 2 et 3.
- **Aucune seconde teinte chromatique.** Pas de crayon de couleur (réf 1), pas d'isométrie
  multicolore (réf 3). Ce qui est repris de ces images est leur *grammaire de trajet*, pas leur
  palette.
- **Aucune texture, aucun grain, aucun relief.** Le papier déchiré et le tapis de découpe de la
  réf 1 restent hors du système.
- Le vocabulaire de la réf 3 — *étape · détour · obstacle · route alternative* — est repris comme
  **structure d'information**, à traduire en français dans les sections.

Options écartées : **1** (zéro illustration — trop sec pour « explorateur créatif »),
**3** (trajet illustré — sortait du système Drive Capital sur au moins un axe et demandait son
propre ADR).

> Renfort inattendu, relevé après lecture du LinkedIn : l'identité visuelle déjà présente dans son
> travail est **rétro** — `Dicrotic95` (chrome Windows 95, scanlines CRT, palette cassette,
> chiptune), `Obsolet` (rétrofuturisme, hauntologie). Drive Capital se décrit comme un *retro
> road-trip poster*. Les deux registres partagent le rétro : le pont n'est pas qu'une commodité,
> il correspond à quelque chose qu'il fait déjà.

## Ce qui reste au Quality Brief

Le *quoi* est tranché. Le *comment* ne l'est pas, et c'est le travail de BOB :
densité du parcours, ce qu'est une étape à l'écran, comportement du trajet en mobile,
et quelles fontes substituent Editorial New / Founders Grotesk (Playfair Display + Inter sont les
candidates Google Fonts nommées par la référence).
