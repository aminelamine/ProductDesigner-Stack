# Le cycle V4

> **Budget dur : 3 gates humains maximum, ~12 étapes maximum en voie Standard.**
> Toute règle qui ne rentre pas dans ce budget est coupée, pas documentée.
> V3 : 5 gates / ~39 étapes côté code, 54 gates bloquants côté design.

---

## Les 4 phases

```
DIRECTION  →  CADRE  →  PRODUIRE  →  JUGER + MÉMORISER
```

**La direction vient en premier. C'est le changement structurel de la V4.**

En V3 la séquence était : spec → `VALIDATED`, scope gelé → Quality Brief → code. La direction
était donc décidée **après** le gel du scope, et rien ne comparait les deux. L'auto-test l'a
constaté (`_stack-test-pulse/RUN_005_FINDINGS.md`, F11) : *« les deux gates ont fonctionné
correctement et le résultat viole quand même le contrat — c'est deux gates qui marchent, en
désaccord. »*

En V4 le scope est cadré **par** la direction. Ils ne peuvent plus se contredire.

---

## Étape 0 — la voie *(première question, toujours)*

La voie n'est pas devinée. Elle est demandée, en une question, avant tout le reste.
**Le défaut est Sketch.**

| Voie | Quand | Phases actives | Gates humains |
|---|---|---|---|
| **Sketch** | explorer, décliner, itérer — les 80 % | DIRECTION → PRODUIRE | **1** |
| **Standard** | un écran ou un composant qui part en revue ou en dev | les 4 | **2** |
| **System** | ça touche le design system ou une contrainte structurante | les 4 + décision écrite | **3** |

> En Sketch : **aucun fichier de spec, aucun score, aucune décision écrite.** Une direction courte,
> la production, un coup d'œil. Si ça ne convient pas, on relance — c'est moins cher que de
> documenter.
>
> Passer de Sketch à Standard en cours de route est normal et ne coûte rien : la direction déjà
> actée est reprise telle quelle.

---

## Recherche *(optionnelle — `modules.discovery`)*

En amont de DIRECTION, si le problème n'est pas encore cadré : `eve` prépare l'entretien ou le
test, synthétise la recherche brute, restitue. Sort `discovery/problem_brief.md`, qui pré-remplit
DIRECTION §1–2. Pas de gate — EVE ne bloque rien, elle nourrit.

---

## DIRECTION — gate humain ①

**Lire, dans cet ordre, et s'arrêter dès qu'il y a de quoi décider :**

0. `memory/identity.md` — **le socle et le « ce que ce produit n'est pas »**. Une direction qui
   touche au socle est refusée d'avance : ne pas la proposer.
1. `memory/directions/INDEX.md` — a-t-on déjà tranché ce type de direction ici ?
   **Une direction `refusée` sur cette surface est une contrainte, pas une suggestion.**
2. `memory/design-system/registries/` — quels tokens et composants existent réellement ?
3. `memory/references/` — quel pattern éprouvé s'applique ?
4. `memory/decisions/INDEX.md` — une décision structurante contraint-elle ce choix ?

**Produire** le brief en 5 dimensions (`agent-system/agents/BOB_aesthetic_gate.md`) :
Direction · Typographie · Palette · Tension · Composition.

**Mode contraint / mode libre** — c'est l'état des registres qui décide, pas une question posée :
registres remplis → la direction se conforme ; registres vides → elle **propose et le déclare**
(`memory/SETUP.md`). On n'invente jamais un token en le présentant comme existant.

> ⏸ **Gate ① — approbation du brief.** Pas de production avant un accord explicite.

---

## CADRE *(Standard et System uniquement)*

Le scope est écrit **après** la direction et **contre** elle. Bloc `## HORS SCOPE` obligatoire.

> ⏸ **Gate ② — validation du cadre.** Le scope est gelé ici. En Sketch, cette phase n'existe pas.

---

## PRODUIRE

Sortie par défaut : **Figma**. Sortie optionnelle : **code**, si `modules.code: true`.

Aucune des deux n'est privilégiée par le cycle — c'est `STACK.md` qui décide, et un projet sans
code traverse le cycle entier sans jamais rencontrer un gate git.

---

## HANDOFF *(Figma/Penpot/Framer → dev, quand l'implémentation ne se fait pas dans ce cycle)*

Après PRODUIRE, si la sortie est un frame (Figma aujourd'hui via MCP ; Penpot, Framer — pas
encore connectés) et que personne n'implémente ici : `design:design-handoff` lit le frame
approuvé et `memory/design-system/registries/`, produit `agent-system/handoff/NNN-slug.md`
(`agent-system/handoff/HANDOFF_TEMPLATE.md`) — tokens, états, motion, responsive, ce qui reste
hors scope.

Skip HANDOFF si `modules.code: true` et que `bob-build` implémente directement dans ce dépôt :
BOB lit le Figma via MCP, un document de transfert n'ajoute rien.

Pas de gate — c'est un document de transfert, pas une décision.

---

## JUGER + MÉMORISER — gate humain ③

**Deux verdicts indépendants, jamais moyennés** (`agent-system/agents/ANALYZER_system_prompt.md` §1b) :

| | Conformance | Direction |
|---|---|---|
| Rendu par | le système, mécaniquement | **le designer, seul** |
| Forme | /20 sur 4 dimensions | **binaire** — `retenue` / `refusée` |
| Répond à | « est-ce conforme à ce qui était écrit ? » | « est-ce que ça tient ? » |

**Écrire, quel que soit le verdict :**
- `memory/directions/NNN-slug.md` — **y compris et surtout si `refusée`**
- le learning, moitié DESIGN d'abord (`agent-system/learnings/LEARNING_TEMPLATE.md`)
- en voie System seulement : `memory/decisions/NNN-slug.md`
- puis `npm run memory:index`

> ⏸ **Gate ③ — verdict de direction.** Ne jamais le proposer, ne jamais le déduire du score.

**Routage d'un refus :**
- conformance courte → retour à **PRODUIRE**
- direction refusée → retour à **DIRECTION**, jamais à PRODUIRE

> Un refus de direction n'est pas une liste de bugs à corriger, c'est une direction à reprendre.
> Le router vers l'implémentation reconstruit exactement le défaut V3.

---

## Ce que le conducteur ne fait jamais

- franchir un gate à la place du designer
- deviner la voie au lieu de la demander
- présenter le score comme un verdict de qualité
- proposer une direction déjà refusée sans dire qu'elle l'a été
- bloquer parce qu'un magasin de la mémoire est vide

---

## Handoffs — nommés, jamais improvisés

Chaque passage de main nomme explicitement l'agent suivant et l'état attendu. En V3, `flow.md`
disait « BOB runs the Ralph Loop » alors que BOB avait été scindé en deux et que rien ne nommait
`/bob --build` : *« le conducteur doit improviser au moment précis où la stack promet de ne pas
improviser »* (`learnings/feature_001a_learnings.md`).

| Fin de phase | Handoff explicite | État attendu |
|---|---|---|
| Recherche *(optionnelle)* | `eve` → `bob-brief` | problem brief écrit, DIRECTION non commencée |
| DIRECTION | `bob-brief` → **STOP**, attente du gate ① | brief écrit, non approuvé |
| CADRE | `ray` → **STOP**, attente du gate ② | spec écrite, non gelée |
| PRODUIRE (Figma, implémenté ici) | `design-workflow` → `analyzer` | frame générée |
| PRODUIRE (Figma, dev externe) | `design-workflow` → `design:design-handoff` → `analyzer` | frame générée, spec dev écrite |
| PRODUIRE (code) | `bob-build` → `analyzer` | code livré, assertions jouées |
| JUGER | `analyzer` → **STOP**, attente du gate ③ | conformance rendue, direction en attente |
