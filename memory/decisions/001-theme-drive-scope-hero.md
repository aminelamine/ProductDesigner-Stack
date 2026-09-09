---
id: 001
nom: Thème Drive Capital scopé au hero, pas de remplacement global
portee: visuelle
statut: actée
date: 2026-09-08
---

> Reprise de `agent-system/adr/adr-009-hero-theme-scope-drive-capital.md` (✅ ACCEPTED).

## Contexte

Le portfolio est dark-only : `app/globals.css` définit dans `:root` un fond near-black, un accent
amber, IBM Plex, un radius serré — utilisé sans exception par les 7 composants existants.

Une nouvelle direction a été arrêtée : le système Drive Capital (crème, Voltage Blue en accent
unique, didone hairline + grotesk, pills outlined, surfaces plates, marges généreuses —
`memory/references/001-drive-capital.md`). Seul le hero est repris à ce cycle.

## Décision

**Thème scopé au hero, pas un remplacement de `:root`.** Un sélecteur dédié (`.theme-drive`)
applique les tokens crème/ash/encre/Voltage Blue à l'intérieur du wrapper `<section id="hero">`.
Le bloc `:root` n'est pas modifié : aucune ligne du thème sombre n'est touchée.

## Ce que ça contraint

- Toute direction sur une section **non encore reprise** (About, Expériences, Obsolet, Contact,
  header, footer) reste construite contre les tokens sombres tant qu'elle n'est pas migrée.
- La migration de chaque section suivante est une décision à part, pas un effet de bord.
- Le produit vit avec **deux systèmes visuels en cohabitation** pendant la reprise.

## Ce qu'on accepte de perdre

La cohérence visuelle globale pendant toute la durée de la reprise. C'est le prix d'une migration
section par section plutôt qu'un big bang qui aurait cassé les 7 composants d'un coup.
