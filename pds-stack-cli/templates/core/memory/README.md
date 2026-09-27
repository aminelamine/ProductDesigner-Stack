# memory/ — le cœur de la stack

> Ce qu'un dev a en `package.json` + lockfile + linter, un designer l'a ici.
> **La mémoire est le produit. Le workflow est mince.**

Quatre magasins. Chaque phase du cycle en lit au moins un, et en écrit au plus un.

| Magasin | Contient | Écrit par | Lu par |
|---|---|---|---|
| `identity.md` | l'histoire visuelle, le socle, le « ce que ce produit n'est pas » — **un fichier, pas un magasin** | `setup` (source 4) | **DIRECTION, en premier** |
| `design-system/` | registries JSON extraits de Figma — tokens, composants, text-styles | `setup` | DIRECTION · PRODUIRE · JUGER |
| `references/` | screenshots annotés — **pourquoi** ça marche, pas seulement quoi | `setup` + au fil de l'eau | DIRECTION · PRODUIRE |
| `directions/` | directions **retenues et refusées**, avec la raison | JUGER | DIRECTION |
| `decisions/` | décisions structurantes (ADR design-shaped) | JUGER (voie System) | DIRECTION · CADRE |

---

## Pourquoi `directions/` est le magasin qui compte

C'est le seul qui transforme du **goût** en **actif réutilisable**.

Un score ne se réutilise pas. Un learning technique (`nowrap: boolean`) ne se réutilise pas par
un designer. Une direction refusée *avec sa raison* se réutilise à chaque brief suivant : elle
évite de reproposer ce qui a déjà été jugé faux sur ce produit.

C'est la différence entre un système qui mémorise des faits et un système qui **hérite d'un
jugement**.

> Règle : une direction refusée vaut plus qu'une direction acceptée. Ne jamais supprimer une
> entrée `verdict: refusée` — c'est la matière la plus dense du magasin.

---

## Règle de lecture (phase DIRECTION)

Dans cet ordre, et s'arrêter dès qu'il y a de quoi décider :

0. `identity.md` — le socle et les interdits. Une direction qui y touche ne se propose pas.
1. `directions/` — a-t-on déjà tranché ce type de direction sur ce produit ?
2. `design-system/registries/` — quels tokens et composants existent réellement ?
3. `references/` — quel pattern éprouvé s'applique ?
4. `decisions/` — une décision structurante contraint-elle ce choix ?

**Jamais l'inverse.** Partir des références avant les directions déjà tranchées, c'est
reproposer ce qui a été refusé.

---

## Règle d'écriture

- Un fichier = une entrée. Pas de fichier fourre-tout.
- Les index (`INDEX.md`) sont **générés**, jamais maintenus à la main.
  *(V3 a prouvé le contraire : `LEARNINGS_INDEX.md` a indexé 1 feature sur 7.)*
- Aucun magasin ne bloque une phase parce qu'il est vide. Un magasin vide se signale et se
  remplit — il n'interdit pas d'avancer. *(V3 a prouvé le contraire : `registries/` vide rendait
  `setup` infranchissable.)*
