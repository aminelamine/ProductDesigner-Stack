---
id: 002
nom: L'About migre vers le socle crème — la coupure avec le thème sombre descend d'une section
portee: visuelle
statut: actée
date: 2026-09-24
---

## Contexte
`decisions/001` a scopé le thème Drive Capital au hero et fait de chaque migration de section une
décision à part. La direction de l'About (`agent-system/sessions/brief_feature_about.md`) en fait la
**légende** de la carte que dessine le hero : une légende sur un autre fond que sa carte ne se lit
plus comme une légende.

## Décision
La section About passe sur le socle de `identity.md` — crème `#fff8f1`, Voltage Blue seul accent,
encre, filets ash, Playfair Display / Inter, surfaces plates. Même mécanisme que le hero : le scope
`.theme-drive` s'étend à `<section id="about">`, `:root` n'est pas touché.

## Ce que ça contraint
- Hero et About forment un seul bloc visuel continu ; aucune direction future ne peut les séparer
  par un changement de fond.
- La coupure avec le thème sombre se fait désormais **entre l'About et la section suivante** — elle
  doit être traitée comme une transition assumée, pas un accident.
- Les sections suivantes (Expériences, Obsolet, Contact, header, footer) restent chacune une
  décision à part.

## Ce qu'on accepte de perdre
Une page encore plus visiblement coupée en deux systèmes, plus bas qu'avant, jusqu'à la migration
des sections suivantes.
