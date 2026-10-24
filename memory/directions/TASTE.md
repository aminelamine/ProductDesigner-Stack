<!-- GÉNÉRÉ par scripts/memory-index.mjs — ne pas éditer à la main. -->
# Goût observé — tendances

> **Éclaire, ne tranche jamais (ADR-020).** Ce sont les verdicts passés du designer, regroupés.
> Le brief cite ce sur quoi il s'appuie ou ce dont il s'écarte — s'écarter reste permis, le
> designer tranche.

2 verdict(s) — 2 retenue(s) · 0 refusée(s)

## Par dimension

### Flux de données
- ✅ 003 · Détection explicite du backend en `0a-detect` (jamais « premier tool qui répond ») — question posée si les de…

### Frontières de composants
- ✅ 003 · Un fichier dédié `references/penpot-api-rules.md`, miroir structurel de `figma-api-rules.md` sans en copier l…

### État
- ✅ 003 · `storage` documenté pour ce qu'il est — un objet JS scopé à la session du plugin ouvert, jamais un backend, j…

### Design d'API
- ✅ 003 · Table de parité des 7 lignes (6 tools Figma + `generateStyle`/`generateMarkup` en capacité ajoutée) en ouvert…

### Direction
- ✅ 004 · L'encoche reste muette tant que rien n'attend le designer ; un gate ouvert présente *une seule* décision, au …

### Typographie
- ✅ 004 · Identité de la landing PDS : JetBrains Mono = voix de la machine (gates, phases, /20) · Instrument Serif ital…

### Palette
- ✅ 004 · Encre `#0a0908` · surface `#16140f` · papier `#efe9df` · accent `#ff5436` réservé à « un gate vous attend ». …

### Tension
- ✅ 004 · Score machine en mono / verdict humain en serif italique, séparés par un filet — jamais dans la même cellule,…

### Composition
- ✅ 004 · Encoche en 3 états (repos · gate en attente → panneau déplié · gate tranchée), file de gates en `+1` sans pas…

## Ce que les directions ont appris

- ✅ 003 — **« Vocabulaire propre » se juge à l'endroit où il est le plus facile à trahir : la prose, pas la table.** La table de parité peut être honnête et la doc mentir quand même si une phrase en langage na…
- ✅ 004 — Un compagnon PDS ne montre que ce que l'humain doit trancher : le reste de l'activité de l'agent reste dans le terminal. Le verdict humain et le score machine se distinguent par la forme (serif / mon…
