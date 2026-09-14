---
id: 003
nom: Penpot — second chemin de premier rang, vocabulaire propre
date: 2026-09-14
surface: design-workflow (skill outillage) — F-004
verdict: retenue
---

> **Note de forme** : `quality_brief_type` effectif = `architecture` (brief F-004, `STACK.md` ne
> surcharge pas par feature). Zéro surface visuelle du produit portfolio — les 5 dimensions
> esthétiques du template n'ont pas d'objet ici. Substituées ci-dessous par les 4 axes que
> `architecture` couvre réellement (flux de données, frontières de composants, état, design d'API),
> conformément au brief. Même gate, même exigence de justesse — pas de grille en moins.

## Les 3 mots
`Parallèle` · `Vocabulaire propre` · `Écart nommé`

## Les 4 axes (architecture, substitués aux 5 dimensions esthétiques)

| Axe | Choix |
|---|---|
| Flux de données | Détection explicite du backend en `0a-detect` (jamais « premier tool qui répond ») — question posée si les deux MCP sont configurés, branche directe sinon. Précondition Penpot en premier appel, avant toute autre action |
| Frontières de composants | Un fichier dédié `references/penpot-api-rules.md`, miroir structurel de `figma-api-rules.md` sans en copier la densité (5 règles vs 22 — l'API Penpot est généraliste, pas typée). Branches Penpot insérées au même endroit que la logique Figma dans `onboarding.md` / `design.md` / `review.md`, jamais une réécriture générique fusionnant les deux vocabulaires |
| État | `storage` documenté pour ce qu'il est — un objet JS scopé à la session du plugin ouvert, jamais un backend, jamais présenté comme l'équivalent des tools Figma typés et stateless |
| Design d'API | Table de parité des 7 lignes (6 tools Figma + `generateStyle`/`generateMarkup` en capacité ajoutée) en ouverture du fichier de référence — chaque ligne dit `recette` / `gap` / `capacité ajoutée`, jamais une fausse équivalence |

## Références mobilisées
- `references/figma-api-rules.md` — référence structurelle mirorée (numérotation de règles, blocs WRONG/CORRECT, boilerplate final), sans en copier la densité
- Fichier gabarit Penpot « Prototype examples » — terrain de test réel des 3 recettes nommées (`dsKitOverview`, `tokensOverview`, `stylesOverview`), exécutées et un bug corrigé au passage (commit `56ac8b0`)

## Verdict du designer

**Retenue** — « chaque outil (Figma, Penpot, Framer ou autre) aura son propre jargon, donc ce que
la doc requiert on le fait pour s'aligner à 100% aux principes et fonctionnement de Penpot. »

Ce principe répond directement au point de vigilance soulevé en review : `stylesOverview` n'est
qu'un re-shape de `dsKitOverview`, sans endpoint « styles » distinct côté Penpot. Ce n'est pas une
fausse parité au sens du brief — Penpot n'a pas de concept de styles séparé de sa library, donc la
recette qui le documente comme tel EST l'alignement à 100 % sur le fonctionnement réel de Penpot,
pas un compromis sur la table de parité.

## Ce que la prochaine direction doit en retenir

- **« Vocabulaire propre » se juge à l'endroit où il est le plus facile à trahir : la prose, pas la
  table.** La table de parité peut être honnête et la doc mentir quand même si une phrase en langage
  naturel traduit un concept d'un outil dans le vocabulaire d'un autre (ex. présenter `storage`
  comme « l'équivalent Penpot » d'un tool Figma typé). Vérifier les deux, systématiquement, sur tout
  second backend futur (Framer nommé explicitement dans la justification du designer — donc pas un
  cas hypothétique).
- **Une recette qui ne fait que re-former une lecture déjà faite n'est pas un défaut si l'absence
  de concept séparé côté outil cible est elle-même documentée.** Le critère n'est pas « chaque tool
  Figma a une recette dédiée » mais « chaque ligne de la table dit la vérité sur ce qui existe
  réellement côté Penpot ».
- **La preuve d'exécution vaut plus que l'affirmation, même en doc pure.** Le testing-status en tête
  de `penpot-api-rules.md` nomme précisément ce qui a été exécuté et contre quel fichier — un vrai
  bug trouvé et corrigé (`storage` ne partage pas les déclarations de fonction entre appels
  `execute_code`) est un signal plus fort qu'un « testé » générique. À reproduire pour tout futur
  second backend (Framer ou autre).
