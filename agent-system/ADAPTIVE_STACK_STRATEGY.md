# Stratégie — Une PDS Stack accessible à tous (le flux unique adaptatif)

> Document de réflexion. Cadre pourquoi et comment rendre la stack utilisable par n'importe qui —
> junior comme expert — et plus agentique. À relire avant de lancer un chantier « accessibilité ».

---

## 1. La tension centrale

Toute la stack repose sur **une hypothèse** : *l'humain est le gate de qualité*.

- RAY attend ton `VALIDÉE TALENT` sur la spec.
- BOB attend ton « ok » sur le Brief Esthétique.
- ANALYZER simule ton jugement d'utilisateur exigeant.

Le spec produit le dit explicitement : *« Product Designers who code — Not junior devs who
design. »* La stack est **expert-first par conception**.

Donc « rendre la stack utilisable par un junior » n'est **pas un problème de documentation**.
C'est une question d'architecture, et elle tient en une phrase :

> **Qui fournit le jugement quand l'utilisateur ne l'a pas encore ?**

Un junior ne peut pas approuver un Brief Esthétique qu'il ne sait pas lire. Ajouter des tutoriels
ne résout rien : le système *demande* un goût que le junior n'a pas.

---

## 2. Le principe retenu : un flux unique adaptatif

Pas deux produits (un « mode simple » et un « mode pro » qui divergent). **Un seul système**, piloté
par **un seul réglage** : `user_level` (`junior | expert`), stocké dans `STACK.md`.

| Comportement | `junior` | `expert` |
|---|---|---|
| **Narration** | explique chaque étape + *pourquoi* ce gate existe | terse — `[RAY]`/`[BOB]`/`[ANALYZER]` seuls |
| **Jugement** | l'agent **propose** 2-3 options argumentées | l'agent **attend** ta décision |
| **Vocabulaire** | glossé inline au moment où il apparaît | supposé connu |

L'expert garde exactement la stack d'aujourd'hui. Le junior reçoit un système qui *propose* le
jugement au lieu de simplement l'attendre — et qui, ce faisant, **l'enseigne**.

---

## 3. Les 4 leviers = les étages d'un même conducteur

Ce ne sont pas 4 features séparées. Ce sont les couches d'**un orchestrateur unique**, `/pds`, qui
manque aujourd'hui au track code (le track Figma `design-workflow` a déjà le sien).

| Levier | Ce que c'est concrètement | Problème résolu |
|---|---|---|
| **1 — Orchestrateur** | Le conducteur `/pds` : déroule idée→spec→build→review, gère les handoffs et le rituel `VALIDÉE TALENT` | Fin de la choréographie manuelle de slash-commands |
| **2 — Bootstrap contexte** | STEP 1 du conducteur : interviewe l'utilisateur + auto-détecte la stack, écrit les 3 fichiers de contexte | Le vrai coût d'onboarding (remplir `client_vision`/`roadmap`/`design_guide` à la main) |
| **3 — Mode assisté** | Le dial `user_level` appliqué au jugement (proposé vs attendu) | La tension junior/expert, résolue au niveau architecture |
| **4 — Unification** | Un seul jeu de noms canoniques, une seule langue, un seul nom de gate | Un système qui se contredit ne peut pas être « utilisable par n'importe qui » |

---

## 4. La dette de cohérence à purger (levier 4)

Aujourd'hui « ce que disent les docs » ≠ « ce qui tourne ». C'est le blocage structurel n°1 pour
l'accessibilité : un débutant qui suit la doc lance des commandes qui n'existent pas.

| Sujet | Version A | Version B | Où |
|---|---|---|---|
| Nom architecte | `RAY` | `JO` | docs/system-prompts vs `.claude/commands/jo.md` |
| Nom QA | `ANALYZER` | `DO` | idem |
| Langue | `language_agents: en` | commandes rédigées en FR | `STACK.md` vs `.claude/commands/*.md` |
| Gate BOB | « Quality Brief » (4 types, EN) | « Brief Esthétique » (5 dimensions, FR) | system-prompt vs `bob.md` + skill |
| Gate spec | tiering T1/T2/T3 | gate INVEST | `RAY_system_prompt.md` vs `jo.md` |
| Mot de validation | `VALIDATED` | `VALIDÉE TALENT` | system-prompts vs commandes |

**Décisions actées (chantier 2, 2026-08-23) :**
- Noms canoniques : **`RAY` / `ANALYZER`** — `/jo` et `/do` deviennent de vrais alias (source unique,
  fin des copies dupliquées). `/analyzer` créé (le README le référençait sans qu'il existe).
- Langue par défaut : **`fr`** (`language_agents: fr` dans `STACK.md`) — aligne le flag sur ce qui tourne.
- Nom du gate BOB : **« Brief Esthétique »** (voir nuance ombrelle/sous-type ci-dessous).

> ⚠️ Nuance gate : « Quality Brief » est l'**ombrelle** (`quality_brief_type` a 4 valeurs dans
> `STACK.md` : aesthetic/performance/content/architecture). « Brief Esthétique » est l'instance
> quand le type = aesthetic — ce projet. Les deux ne sont pas synonymes.

---

## 5. Roadmap des chantiers

| # | Chantier | Leviers | Dépend de | Statut |
|---|---|---|---|---|
| **1** | Conducteur `/pds` MVP — dial `user_level` + bootstrap contexte | 1, 2, 3 | — | **en cours** |
| 2 | Unification : 1 jeu de noms, 1 langue, 1 nom de gate | 4 | décision §4 | **en cours** |
| 3 | Bibliothèque « jugement proposé » — directions/palettes pré-argumentées | 3+ | 1 | à venir |
| 4 | Progressive disclosure — glossaire inline + « pourquoi ce gate » | 5 | 1 | à venir |

**Principe anti-sur-ingénierie :** le conducteur *appelle* les agents existants (`/jo`, `/bob`,
`/do`). Il ne réécrit ni les system-prompts, ni les gates, ni le scoring. `user_level: expert` par
défaut = zéro régression pour l'usage actuel.
