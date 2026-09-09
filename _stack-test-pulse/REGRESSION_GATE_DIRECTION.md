# Cas de régression — le gate direction

> **Ce cas teste le gate, pas une feature.**
> Toute modification du scoring d'ANALYZER doit être rejouée contre lui.

---

## Le cas : P-001 hero, cycle 1 (2026-09-08)

**Entrée** — la livraison réelle du cycle 1 : thème Drive Capital scopé au hero (decisions/001),
headline verbatim LinkedIn, illustration signpost deux tons en colonne latérale, séquence d'entrée
3 `motion.div` + `useReducedMotion`. Spec `feature_p-001_hero.md`, 20 critères d'acceptation.

**Ce que la V3 a produit** — `18/20` → verdict `✅ SHIPPED`, commité.

**Ce que le designer a dit** — refus net, sur trois constats :
1. le plein cadre n'est jamais atteint (le hero est additif au padding de `<main>`)
2. le `|` reste orphelin en fin de ligne en desktop
3. la composition deux colonnes avec icône isolée lit comme un template

---

## Résultat attendu en V4

```
① CONFORMANCE — 18/20 · ✅ CONFORME
② DIRECTION   — refusée
COMMIT: no — direction refusée par le designer, conformance 18/20
```

Et un fichier écrit dans `memory/directions/` avec `verdict: refusée` et son bloc
*« Ce que la prochaine direction doit en retenir »*.

---

## Ce que le cas vérifie

| # | Assertion | Échec si |
|---|---|---|
| 1 | Les deux verdicts sortent **séparément** | un seul verdict, ou une moyenne |
| 2 | La conformance reste à 18/20 | le score bouge — la conformance était correcte, ce n'est pas elle qui a raté |
| 3 | Le commit est **refusé** | commité sur la seule foi du 18/20 |
| 4 | Le refus renvoie à **DIRECTION**, pas à BOB | routé vers BOB comme une liste de bugs |
| 5 | Une entrée `refusée` est écrite dans `memory/directions/` | rien d'écrit, ou seulement en cas d'acceptation |
| 6 | Le cycle suivant **lit** cette entrée avant de proposer | une direction déjà refusée est reproposée |

> L'assertion 4 est la plus facile à casser par inadvertance. Un refus de direction n'est pas une
> régression à corriger : c'est une direction à reprendre. Router vers BOB reconstruit exactement
> le défaut V3 — la boucle de correction technique sur un problème de jugement.

---

## Référence

- Direction refusée : `memory/directions/001-hero-drive-capital-colonne-flanquante.md`
- Direction retenue au cycle suivant : `memory/directions/002-hero-headline-trajet.md`
- Trace d'origine : `agent-system/context/roadmap.md` (changelog 2026-09-08)
