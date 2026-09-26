# Le cycle V4

> **Budget dur : 3 gates humains maximum, ~12 étapes maximum en voie Standard.**
> Toute règle qui ne rentre pas dans ce budget est coupée, pas documentée.
> V3 : 5 gates / ~39 étapes côté code, 54 gates bloquants côté design.

---

## Les phases

```
DIRECTION  →  PROTOTYPE  →  CADRE  →  PRODUIRE  →  JUGER + MÉMORISER
  brief ou       HTML        scope     Figma +      conformance
  référence   interactif              composants   + direction
                                      → handoff (a11y · interaction)
```

Sketch s'arrête après PROTOTYPE. Standard et System vont jusqu'au bout.

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

| Voie | Quand | Phases actives | Sortie | Gates humains |
|---|---|---|---|---|
| **Sketch** | explorer, décliner, itérer — les 80 % | DIRECTION → PROTOTYPE | prototype HTML interactif | **1** |
| **Standard** | un écran ou un composant qui part en revue ou en dev | les 4 | prototype → Figma + composants → handoff | **2** |
| **System** | ça touche le design system ou une contrainte structurante | les 4 + décision écrite | idem Standard | **3** |

> En Sketch : **aucun fichier de spec, aucun score, aucune décision écrite.** Une direction courte,
> un prototype qu'on manipule, un coup d'œil. Si ça ne convient pas, on relance — c'est moins cher
> que de documenter.
>
> Passer de Sketch à Standard en cours de route est normal et ne coûte rien : la direction déjà
> actée **et le prototype** sont repris tels quels.

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

**Deux points de départ, au choix du designer** — demandé, pas deviné :
- **un brief** — l'intention en quelques lignes ;
- **une référence** — une entrée de `memory/references/` (ou une image / URL, qu'on y range
  d'abord). La direction s'en déduit : ce qu'on garde, ce qu'on laisse, et pourquoi.

**Produire** le brief en 5 dimensions (`agent-system/agents/BOB_aesthetic_gate.md`) :
Direction · Typographie · Palette · Tension · Composition.

**Mode contraint / mode libre** — c'est l'état des registres qui décide, pas une question posée :
registres remplis → la direction se conforme ; registres vides → elle **propose et le déclare**
(`memory/SETUP.md`). On n'invente jamais un token en le présentant comme existant.

> ⏸ **Gate ① — approbation du brief.** Pas de production avant un accord explicite.

---

## PROTOTYPE — la première production, dans toutes les voies

`/bob --proto` sort **un fichier HTML interactif, autonome** : `prototypes/NNN-slug.html`.
Il sert à **penser**, pas à livrer — on juge la direction en cliquant, pas en lisant.

- construit depuis le brief approuvé, jamais depuis une spec (il n'y en a pas encore) ;
- un seul fichier, CSS et JS inline, zéro dépendance, zéro build — s'ouvre dans un navigateur ;
- tokens pris dans `memory/identity.md` et les registres ; registres vides → valeurs proposées,
  déclarées comme telles en tête de fichier ;
- les interactions qui portent l'idée sont réelles (états, transitions, navigation) ; le reste
  est simulé, et le fichier dit quoi ;
- hors hooks git : ni `.ts` ni `app/` — ce n'est pas du code produit, `modules.code` n'est pas requis.

En **Sketch**, le cycle s'arrête ici : le designer regarde, garde ou relance.

---

## CADRE *(Standard et System uniquement)*

Le scope est écrit **après** la direction et **contre** elle — et, s'il existe, contre le
prototype, qui montre ce que la direction implique vraiment. Bloc `## HORS SCOPE` obligatoire.

> ⏸ **Gate ② — validation du cadre.** Le scope est gelé ici. En Sketch, cette phase n'existe pas.

---

## PRODUIRE *(Standard et System)*

**Figma, à partir du prototype** — `/design-workflow design` lit `prototypes/NNN-slug.html`
comme source de structure, de contenu et d'états, puis construit le frame avec les composants
du DS. Ce que le prototype répète devient composant (`design-workflow`, mode composant).

Sortie optionnelle : **code produit**, si `modules.code: true` — `bob-build`, contre la spec gelée.

Un projet sans code traverse le cycle entier sans jamais rencontrer un gate git.

---

## HANDOFF *(après Figma — specs d'accessibilité et d'interaction)*

Après PRODUIRE, si la sortie est un frame (Figma aujourd'hui via MCP ; Penpot, Framer — pas
encore connectés) : `design:design-handoff` lit le frame approuvé, le prototype et
`memory/design-system/registries/`, produit `agent-system/handoff/NNN-slug.md`
(`agent-system/handoff/HANDOFF_TEMPLATE.md`) — tokens, états, **interaction**, motion,
responsive, **accessibilité**, ce qui reste hors scope. La section accessibilité est remplie avec
`design:accessibility-review` (WCAG 2.1 AA) sur le frame et le prototype.

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

## Sessions — une phase, une conversation *(ADR-014)*

Chaque gate franchi ferme la conversation. L'état passe par un fichier, pas par l'historique.
**Exception Sketch** : DIRECTION et PROTOTYPE tiennent dans la même conversation ; la coupure
vient après la remise du prototype (premier cycle V5 : 89k de contexte au pire).

`agent-system/sessions/state_<feature>.md` :

```markdown
---
feature: <id>
voie: sketch | standard | system
phase_suivante: PROTOTYPE | CADRE | PRODUIRE | HANDOFF | JUGER
---
## Acté
- gate ① — brief approuvé : agent-system/sessions/brief_feature_<id>.md
- [gate ② — spec gelée : agent-system/specs/active/feature_<id>.md]
## Produit
- [chemins des fichiers produits]
## À savoir pour la suite
- [≤ 5 lignes — ce que le fichier ne dit pas déjà]
```

`/pds reprendre <feature>` lit ce fichier, et lui seul, puis ouvre `phase_suivante`.

**Nommer la conversation** — `PDS · <feature> · <phase>` (hors cycle : `PDS · stack · <sujet>`),
fixé au STEP 0 et à chaque reprise. Le titre suffit à ranger : on ne déplace jamais une
conversation dans un groupe et on ne touche pas à la vue de la barre latérale — c'est celle du Talent.

---

## Budget contexte *(toutes les sessions, tous les agents)*

Ce qui entre dans le contexte est relu à chaque tour suivant. Sur le cycle portfolio, une seule
capture PNG lue en pleine résolution pesait jusqu'à 390 000 caractères — relue ensuite à chaque tour.

- **Captures** : navigateur `scale ≤ 0.5` · Figma `maxDimension ≤ 600`. Jamais de `Read` sur un
  PNG pleine résolution.
- **Le texte d'abord** : `read_page`, `get_page_text`, `get_metadata` quand la question porte sur la
  structure ou le contenu. L'image seulement quand la question est visuelle.
- **Vérification répétée** (le rendu suit-il le prototype ?) : mesurer — valeurs calculées via
  `javascript_tool`, `getComputedStyle`, dimensions — plutôt que relire deux images. Une capture
  finale, une seule, comme preuve.
- **Gros fichiers** (prototype, brief, spec > 300 lignes) : `grep` puis lecture de la section utile.
  Jamais le fichier entier pour vérifier un détail.
- **Figma** : `get_metadata` d'abord ; `get_design_context` sur un nœud précis, jamais sur une page.
- **Entrées lourdes** (PDF, dossier de références, site) : un sous-agent les digère une fois dans
  `memory/references/NNN-slug.md`. Les autres ne lisent que le digest.

### Outils de vérification *(ADR-015 — absents ⇒ on le dit, on ne bloque pas)*

| Besoin | Outil | Commande |
|---|---|---|
| Ouvrir un prototype | Playwright CLI | `file://` est bloqué → `python3 -m http.server 8765` (en arrière-plan), puis `playwright-cli open http://127.0.0.1:8765/prototypes/NNN-slug.html` |
| Vérifier un élément, un texte, un état | Playwright CLI | `playwright-cli find "<texte>"` · `snapshot <ref>` · `click <ref>` · `resize <w> <h>` |
| Une valeur calculée (couleur, taille, espacement) | Playwright CLI | `playwright-cli eval "getComputedStyle(document.querySelector('h1')).fontSize"` |
| Erreurs JS | Playwright CLI | `playwright-cli console` |
| La preuve visuelle finale, pour le Talent | Playwright CLI | `playwright-cli screenshot` → `.playwright-cli/*.png` — le chemin est donné au Talent, l'image n'est pas relue |
| Le plancher anti-« slop » | impeccable | `npx impeccable detect <fichier\|dossier\|url> --json` — résumer par règle (`antipattern` × nombre), ne pas coller le JSON |

**Mesuré sur `prototypes/004-accueil.html`** : `snapshot` de la page entière = 63 Ko (~16k tokens) ;
`snapshot` d'un élément = 0,6 Ko ; `find` = quelques lignes. Donc : jamais le snapshot complet dans
le contexte — `find`, ou `snapshot <ref>`, ou `snapshot > fichier` puis `grep`. Le navigateur
reste ouvert entre deux commandes ; `playwright-cli close` à la fin.

**impeccable ne décide pas de la direction.** Ses règles sont un plancher, pas un goût. Une règle
qui contredit `memory/identity.md` ou le brief approuvé au gate ① est **levée** : notée en tête du
prototype (`/* impeccable: <règle> levée — identity §… | brief §… */`), jamais corrigée. Sur le
portfolio, par exemple : `cream-palette` et `overused-font` contredisent le socle (fond crème,
Playfair) ; `em-dash-overuse` contredit la typographie française. En revanche `low-contrast`
(`#006eff` sur `#fff8f1` = 4,3:1, sous l'AA) est un vrai défaut, trouvé dans 3 prototypes sur 4.

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
| PROTOTYPE | `bob-build --proto` → **STOP** (Sketch) · `ray` (Standard · System) | `prototypes/NNN-slug.html` ouvert |
| CADRE | `ray` → **STOP**, attente du gate ② | spec écrite, non gelée |
| PRODUIRE (Figma, implémenté ici) | `design-workflow` → `analyzer` | frame générée |
| PRODUIRE (Figma, dev externe) | `design-workflow` → `design:design-handoff` → `analyzer` | frame générée, spec dev écrite |
| PRODUIRE (code) | `bob-build` → `analyzer` | code livré, assertions jouées |
| JUGER | `analyzer` → **STOP**, attente du gate ③ | conformance rendue, direction en attente |
