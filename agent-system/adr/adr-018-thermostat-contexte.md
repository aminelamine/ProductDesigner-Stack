# ADR-018 — Thermostat de contexte : le seuil de relais devient mécanique

| | |
|---|---|
| **Statut** | ✅ **ACCEPTED** — Le Talent, 2026-09-28 |
| **Domaine** | Architecture / Orchestration |
| **Date** | 2026-09-28 |
| **Complète** | [ADR-014](adr-014-stack-lean.md) · [ADR-017](adr-017-session-cadrage.md) |

---

## Contexte

ADR-014 a mesuré que ~75 % de la dépense venait des conversations principales trop longues, et
fixé le seuil : au-delà de ~150k, on relaie. ADR-017 a fait du relais (fichier + session neuve) la
seule façon de couper. Mais le seuil reste une **consigne** : le conducteur doit penser à regarder
la taille du contexte, et hors `/pds` personne ne la regarde.

Le même mouvement a déjà réussi deux fois : `maxTurns` dans le frontmatter (le plafond de tours) et
le hook qui empêche `bob-build` de lire une image. Une consigne qu'on oublie devient une capacité
du harnais.

## Décision

**Un hook `UserPromptSubmit` dans `.claude/settings.json` mesure le contexte à chaque prompt et
injecte la consigne de relais au-delà du seuil.**

1. `scripts/context-thermostat.mjs` lit `transcript_path` et prend le contexte du dernier tour
   (cache lu + cache écrit + entrée), comme `token-report.mjs`.
2. **< 120k** : rien. **120k–150k** : « termine l'étape, puis propose le relais ». **≥ 150k** :
   « avant toute autre chose, mets à jour `state_<feature>.md` (ou un handoff hors `/pds`) et donne
   le prompt de la session neuve ». Le Talent voit une ligne (`⬡ Contexte 160k — relais demandé`).
3. Le hook **ne bloque jamais** le prompt : il injecte, il n'interdit pas. Toute erreur sort en
   silence. C'est le Talent qui ouvre la session neuve (ADR-017).
4. `check-parity` l'exécute (trois cas), comme la garde image.

## Hors périmètre

- **Le modèle et l'effort de la conversation principale** : aucun hook ne peut les changer. Le
  réglage reste au Talent (échelle d'ADR-014).
- **Le routage du modèle des sous-agents selon le tier** et **la boucle de retour** qui recalibre
  les seuils à partir de la mesure : à reprendre seulement si la mesure le demande.
- **Les sous-agents** : `UserPromptSubmit` ne s'y déclenche pas ; ils restent tenus par `maxTurns`.

## Alternatives considérées

| Alternative | Raison de rejet |
|---|---|
| Bloquer le prompt au-delà de 150k (exit 2) | Retire la main au Talent au milieu d'une étape ; un relais forcé en plein build coûte plus qu'il n'économise |
| Hook `Stop` (après chaque réponse) | Se déclenche aussi en fin de sous-tâche ; `UserPromptSubmit` tombe au moment où le Talent décide |
| Laisser la consigne dans `flow.md` | C'est l'état actuel — le seuil n'est vu que si le conducteur y pense |

## Conséquences

- Le seuil de 150k s'applique à toutes les conversations du projet, `/pds` ou non.
- À mesurer sur le prochain cycle (`npm run tokens`) : aucune session principale > ~170k (le
  seuil plus le tour de relais).
