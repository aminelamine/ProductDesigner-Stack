# ADR-015 — Skills externes : Playwright CLI, impeccable, format DESIGN.md

| | |
|---|---|
| **Statut** | ✅ **ACCEPTED** — Le Talent, 2026-09-25 |
| **Domaine** | Outillage / Qualité |
| **Date** | 2026-09-25 |
| **Suit** | [ADR-014](adr-014-stack-lean.md) — budget contexte |

---

## Contexte

Le Talent demande de renforcer les agents avec des skills existantes plutôt que d'en développer.
Cinq candidates ont été évaluées sur un critère : **combler un manque réel de la stack sans
recouvrir ce qu'elle fait déjà**.

## Décision

| Skill | Rôle dans la stack | Statut |
|---|---|---|
| **Playwright CLI** (`@playwright/cli`) | vérifier un prototype ou un rendu en **texte** (`snapshot`, `eval`) plutôt qu'en images — le levier 2 d'ADR-014. BOB §1b, ANALYZER. | ✅ adoptée |
| **impeccable** (Apache 2.0) | `npx impeccable detect --json` : un plancher mécanique anti-« slop » — auto-contrôle du prototype (BOB §1b) et déduction mécanique en dimension B d'ANALYZER (−0,5 / règle, plafond −2). Ses commandes (`/impeccable polish`, `critique`…) restent au Talent, à la demande. | ✅ adoptée |
| **DESIGN.md** (format, via awesome-design-md) | format du corps des entrées `memory/references/` — déjà suivi de fait par `001-drive-capital` ; awesome-design-md devient une source de références. | ✅ adoptée — rien à installer |
| **taste-skill** | comparée à `frontend-design` (voir ci-dessous) : 7× plus lourde, elle *déduit* la direction au lieu de lire celle approuvée, et impose des règles qui contredisent le socle. | ❌ écartée — `frontend-design` conservée |
| **img2threejs** | reconstruction 3D d'un objet depuis une image — utile pour un projet 3D, hors du périmètre actuel. | ⏸ opt-in, projet par projet |

**Règle de préséance.** Aucun outil externe ne décide de la direction : le brief approuvé au gate ①
prime. Une règle impeccable qui le contredit est levée et notée, pas corrigée.

**Règle d'absence.** Un outil non installé ne bloque rien : l'agent le dit en une ligne et continue.

## frontend-design vs taste-skill — comparaison du 2026-09-25

| Critère | `frontend-design` (aesthetic gate) | `taste-skill` v2 |
|---|---|---|
| Poids chargé | 11,6 Ko (~3k tokens) | 87 Ko (~22k tokens) |
| Qui décide la direction | le Talent, au gate ① — la skill la **formule** | l'agent la **déduit** (« Design Read ») et avance |
| Lit la mémoire | oui — identity, directions refusées, registres, références | non |
| Compatible avec le socle portfolio | oui | non — mode sombre obligatoire, tiret cadratin banni, stack imposée (Tailwind v4, Motion) |
| Anti-« slop » mécanique | non — c'est le rôle d'impeccable (ADR-015) | des règles écrites, non exécutées |

Verdict : `frontend-design` est plus légère, plus efficace et c'est la seule compatible avec les
gates. Ce que taste-skill apporte de meilleur — la chasse aux tics d'IA — est déjà couvert,
mécaniquement, par `impeccable detect`. Correctif appliqué : le déclencheur de `frontend-design`
est restreint à l'écriture du brief (il se déclenchait aussi sur « implement » et tout travail UI).

## Conséquences

- `flow.md` → *Outils de vérification* porte les commandes ; BOB §1b et ANALYZER §1.B y renvoient.
- Ne pas lancer `/impeccable init` : il écrirait un `PRODUCT.md` concurrent de `memory/identity.md`,
  qui reste la seule source du socle.
- La conformance /20 gagne une part mécanique en dimension B ; le verdict de direction est inchangé.
