---
id: 004
nom: Paraphe — le guichet de signature du designer
date: 2026-10-13
surface: compagnon PDS (encoche Mac des 3 gates) + cockpit local — F-005
verdict: retenue
---

## Les 3 mots
`Muet` · `Un seul acte` · `Signé`

## Les 5 dimensions

| Dimension | Choix |
|---|---|
| Direction | L'encoche reste muette tant que rien n'attend le designer ; un gate ouvert présente *une seule* décision, au vocabulaire PDS (Approuver · Figer · Retenue · Refusée), tranchée comme un paraphe et non chassée comme une notification |
| Typographie | Identité de la landing PDS : JetBrains Mono = voix de la machine (gates, phases, /20) · Instrument Serif italique = voix du designer (verdicts, libellés de bouton) · Space Grotesk = titres du cockpit seulement |
| Palette | Encre `#0a0908` · surface `#16140f` · papier `#efe9df` · accent `#ff5436` réservé à « un gate vous attend ». Pas de vert/rouge : *refusée* = papier atténué + barré |
| Tension | Score machine en mono / verdict humain en serif italique, séparés par un filet — jamais dans la même cellule, jamais combinés. Silence au repos / une seule ligne d'accent à l'appel |
| Composition | Encoche en 3 états (repos · gate en attente → panneau déplié · gate tranchée), file de gates en `+1` sans pastille. Cockpit en 3 zones : À trancher · Features (gates en charnières entre phases) · Mémoire. Motion L0, CSS seul |

## Références mobilisées
- `references/001-coucou-compagnon-encoche.md` — l'emplacement dans l'encoche, la mécanique hook → socket → clic, un personnage qui porte l'état, le tout-local. Laissés : le flux d'activité, le chat, les intégrations, « Always », toute l'identité (nom, Mochi, sons)

## Verdict du designer

**retenue** — jugée au clic sur le prototype `prototypes/005-paraphe-compagnon.html`, le 2026-10-13.

## Ce que la prochaine direction doit en retenir

Un compagnon PDS ne montre que ce que l'humain doit trancher : le reste de l'activité de l'agent reste dans le terminal.
Le verdict humain et le score machine se distinguent par la forme (serif / mono, filet), jamais par une couleur ni un calcul commun.
Une référence externe prête sa mécanique, jamais son identité ni son vocabulaire (prolonge la 003).
