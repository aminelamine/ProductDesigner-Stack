# ADR-019 — Résistance et goût : des gates qu'on ne contourne pas, une mémoire qui éclaire

| | |
|---|---|
| **Statut** | 🟡 **PROPOSED** — en attente de validation du Talent |
| **Domaine** | Architecture / Orchestration |
| **Date** | 2026-10-05 |
| **Complète** | [ADR-014](adr-014-stack-lean.md) · [ADR-018](adr-018-thermostat-contexte.md) |

---

## Contexte

Les gates de PDS sont de la prose : elles tiennent tant que l'agent les respecte. Sous pression
(« pas le temps, fais juste le proto »), un agent trouve toujours une bonne raison de passer.
obra/superpowers écrit ses règles en partant du principe que l'agent va les contourner — son
domaine est le code, pas le nôtre, mais le principe s'applique.

Second constat : la gate ① présente **une** direction. Le designer approuve ou corrige, il ne
choisit pas. Et la mémoire des directions s'accumule sans jamais revenir dans le brief suivant.

Principe posé par le designer : **la mémoire et les propositions éclairent, elles ne tranchent
jamais — c'est toujours le designer qui tranche.**

## Décision

1. **Socle — excuses refusées et preuve avant « fait ».** Une table `| excuse | réalité |` aux
   trois gates (BOB §1, RAY §2, ANALYZER §1b), en remplacement de la prose. Dans `flow.md` : on
   cite la preuve (chemin, sortie d'outil, screenshot) avant d'annoncer qu'une production est faite ;
   le rapport d'un sous-agent n'est pas une preuve.
2. **A — gates mécaniques.** `scripts/gate-guard.mjs`, hook `PreToolUse` (`Write|Edit`) :
   - gate ① : un fichier `prototypes/*.html` commence par `<!-- brief: brief_feature_<id>.md -->`,
     et ce brief porte `statut: ✅ APPROUVÉ` ; un sous-agent ne peut pas écrire ce statut — seul le
     conducteur le fait, sur le oui du designer ;
   - gate ③ : une direction `memory/directions/NNN-*.md` avec un verdict porte `tranché_par: designer`.
3. **C — diverger avant de converger.** BOB propose **3 directions contrastées** (au moins 2 des 5
   dimensions diffèrent nettement), une recommandation, aucun choix. Le designer en garde une ; les
   deux autres sont écrites en `refusée` avec sa raison — ou `raison: non donnée`, jamais une raison
   inventée. Lane Sketch : forme courte (3 mots + une ligne).
4. **B — la mémoire qui éclaire.** `npm run memory:index` génère `memory/directions/TASTE.md` : les
   apprentissages des directions passées, regroupés par dimension, avec le compte retenues / refusées.
   Le brief cite 1 à 3 directions passées (« s'appuie sur » / « s'écarte de », et pourquoi). Aucun
   blocage sur la similarité : s'écarter d'un refus passé reste permis, il faut le dire.

## Limite

Le hook garantit **l'ordre et la traçabilité**, pas que le designer a vraiment dit oui. Le
conducteur peut écrire `statut: ✅ APPROUVÉ` ou `tranché_par: designer` sans accord réel : le hook
rend l'écart visible et nominatif dans le fichier, il ne le rend pas impossible. Le oui reste une
parole du designer dans la conversation.

## Hors périmètre

- **Les écritures Figma (MCP)** : pas de hook en v1. Le garde-fou git couvre déjà le code.
- **Un score de similarité** entre directions : ce serait la mémoire qui tranche.

## Alternatives considérées

| Alternative | Raison de rejet |
|---|---|
| Garder les gates en prose, renforcer le ton | C'est l'état actuel — la pression gagne |
| Bloquer un brief proche d'une direction refusée | Contraire au principe : la mémoire éclaire, elle ne tranche pas |
| 2 directions au lieu de 3 | Un choix binaire pousse au compromis ; 3 laisse une option franche à chaque extrême |
| Faire écrire `tranché_par` par l'ANALYZER | L'agent consignerait sa propre décision — c'est ce qu'on retire |

## Conséquences

- Chaque gate ① produit 2 entrées `refusée` dans `memory/directions/` : la mémoire du goût se
  remplit trois fois plus vite, y compris de ce que le designer ne veut pas.
- Le brief gate ① est plus long (3 directions) : à mesurer sur le prochain cycle (`npm run tokens`).
- `check-parity` reste le contrôle des miroirs ; `gate-guard.mjs` part dans le template.
