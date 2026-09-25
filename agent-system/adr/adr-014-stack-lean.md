# ADR-014 — Stack lean : une phase par session, budget contexte, sortie courte

| | |
|---|---|
| **Statut** | ✅ **ACCEPTED** — Le Talent, 2026-09-25 |
| **Domaine** | Architecture / Orchestration |
| **Date** | 2026-09-25 |
| **Complète** | [ADR-008](adr-008-agents-isoles.md) — l'isolement des agents est conservé |

---

## Contexte

Le cycle portfolio a tenu ses promesses de rôle et de gates, mais il a coûté nettement plus qu'une
exécution directe. Mesure faite sur les transcripts de 9 sessions (lecture de cache cumulée) :

| Poste | Lecture de cache | Part | Cause |
|---|---|---|---|
| Conversations principales | 336 M | ~75 % | sessions de 342 tours, contexte jusqu'à 669k |
| `bob-build` (10 runs) | 92 M | ~20 % | un run à 163 tours / 490k ; captures PNG pleine résolution lues (jusqu'à 390k caractères) |
| `analyzer` · `ray` · `bob-brief` | 21 M | ~5 % | — |

Ce qui **n'était pas** la cause : les prompts d'agents (un sous-agent démarre à ~7k) et les
sous-agents génériques (~0 %). Tout ce qui entre dans le contexte est relu à chaque tour suivant :
le coût est la **durée de vie** du contexte, pas la taille des prompts.

## Décision

1. **Une phase = une conversation.** À chaque gate franchi, le conducteur écrit
   `agent-system/sessions/state_<feature>.md` et propose `/pds reprendre <feature>` dans une
   session neuve. Au-delà de ~150k de contexte, il le signale.
2. **Budget contexte** (`flow.md` → *Budget contexte*) : captures réduites, le texte avant
   l'image, valeurs mesurées plutôt que comparaison d'images, gros fichiers lus par section,
   entrées lourdes digérées une fois dans `memory/references/`.
3. **`bob-build` sur Sonnet** (`model: sonnet`). Le brief et ANALYZER restent sur le modèle par
   défaut : ce sont eux qui jugent.
4. **Boucle Ralph proportionnée au tier** — T1 : 1 passe · T2 : 3 étapes · T3 : 6 — et plafond
   de ~60 appels d'outils par run, reprise par un run neuf depuis le checkpoint.
5. **`output: short`** par défaut (`STACK.md`) : dans le chat, le résultat d'abord, le chemin du
   fichier, la décision attendue. Les fichiers écrits restent complets.

## Conséquences

- Les gates, le /20, le verdict binaire et les écritures `memory/` sont inchangés.
- Le Talent ouvre plus de sessions, plus courtes. L'état passe par un fichier, pas par l'historique.
- À vérifier par mesure (`scripts/token-report.mjs`) sur le prochain cycle : aucune session
  > 150k, `bob-build` < 60 tours, lecture de cache par cycle −60 % vs le cycle footer.
