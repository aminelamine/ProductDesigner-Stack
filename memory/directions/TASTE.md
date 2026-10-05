<!-- GÉNÉRÉ par scripts/memory-index.mjs — ne pas éditer à la main. -->
# Goût observé — tendances

> **Éclaire, ne tranche jamais (ADR-019).** Ce sont les verdicts passés du designer, regroupés.
> Le brief cite ce sur quoi il s'appuie ou ce dont il s'écarte — s'écarter reste permis, le
> designer tranche.

1 verdict(s) — 1 retenue(s) · 0 refusée(s)

## Par dimension

### Flux de données
- ✅ 003 · Détection explicite du backend en `0a-detect` (jamais « premier tool qui répond ») — question posée si les de…

### Frontières de composants
- ✅ 003 · Un fichier dédié `references/penpot-api-rules.md`, miroir structurel de `figma-api-rules.md` sans en copier l…

### État
- ✅ 003 · `storage` documenté pour ce qu'il est — un objet JS scopé à la session du plugin ouvert, jamais un backend, j…

### Design d'API
- ✅ 003 · Table de parité des 7 lignes (6 tools Figma + `generateStyle`/`generateMarkup` en capacité ajoutée) en ouvert…

## Ce que les directions ont appris

- ✅ 003 — **« Vocabulaire propre » se juge à l'endroit où il est le plus facile à trahir : la prose, pas la table.** La table de parité peut être honnête et la doc mentir quand même si une phrase en langage na…
