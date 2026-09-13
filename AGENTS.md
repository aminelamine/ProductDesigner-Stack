# AGENTS.md — contraintes opérationnelles

> Cursor et Codex chargent ce fichier par défaut (pas `CLAUDE.md`).
> **Source de vérité : [CLAUDE.md](CLAUDE.md) pour les contraintes dures, [STACK.md](STACK.md)
> pour la config, [`agent-system/orchestration/flow.md`](agent-system/orchestration/flow.md)
> pour le cycle.** Ce fichier ne les répète pas — il ajoute ce qui n'est nulle part ailleurs.

---

## Le cycle, en une ligne

`DIRECTION → CADRE → PRODUIRE → JUGER + MÉMORISER` — 3 gates humains, ~12 étapes en Standard.
La voie est demandée en premier, jamais devinée. Défaut : **Sketch** (1 gate, aucune spec, aucun score).

---

## Limites d'autonomie

| Agent | Peut | Ne peut jamais |
|---|---|---|
| **BOB (direction)** | écrire le brief en 5 dimensions | franchir le gate ① · produire quoi que ce soit avant l'accord |
| **RAY (cadre)** | écrire la spec, créer un ADR | marquer une spec `VALIDATED` · modifier `client_vision.md` ou `roadmap.md` |
| **BOB (build)** | implémenter une spec `VALIDATED`, commiter | toucher `/components/ui/` · ajouter une dépendance sans ADR · déployer |
| **ANALYZER** | rendre la conformance /20, écrire le learning | rendre le verdict de direction · le déduire du score · modifier du code |

> Le verdict de direction (`retenue` / `refusée`) appartient au designer seul. Aucun agent ne le propose.

---

## Conventions de commit

```
type(scope): description courte à l'impératif

[corps optionnel — contexte, trade-offs, pourquoi pas autre chose]

Ref: feature_<id>
```

Le trailer s'écrit **`Ref:`** — c'est la forme que le hook `commit-msg` reconnaît. Il est exigé
sur tout commit touchant du code produit, et la spec citée doit être `VALIDATED`.
Types : `feat` `fix` `refactor` `style` `chore` `docs` `test`.

Avec `modules.code: false` dans `STACK.md`, les hooks sortent en silence : un projet design-only
ne rencontre jamais cette règle.

---

## Versions

Les versions verrouillées sont celles de [`package.json`](package.json) — il n'y a pas de second
tableau à maintenir ici. Next.js et React évoluent plus vite que les données d'entraînement :
vérifier l'API réelle dans `node_modules/` avant d'écrire du code qui en dépend.
