# ADR-[NNN] — [Titre court de la décision]

**Date :** YYYY-MM-DD
**Statut :** 🟡 PROPOSED | ✅ ACCEPTED | ⚠️ DEPRECATED | 🔄 SUPERSEDED by [ADR-NNN]
**Décideurs :** Le Talent (+ RAY pour l'analyse)
**Agents concernés :** RAY | BOB | ANALYZER | Tous

---

## Contexte

> Décris le problème ou la situation qui nécessite une décision.
> Quelles sont les contraintes ? Qu'est-ce qui a déclenché cette question ?
> Sois factuel — pas de justification de la décision ici.
> 2-4 phrases suffisent.

[Contexte]

---

## Décision

> La décision prise, formulée en une phrase directe.
> Suivie des détails de mise en œuvre si nécessaire (extrait de config, commande CLI, pattern de code).

**Nous adoptons [X].**

[Détails de mise en œuvre — 3-5 lignes max, bloc de code si pertinent]

---

## Alternatives considérées

> Lister uniquement les alternatives qui ont été sérieusement évaluées.
> Ne pas inventer des options rejetées pour faire plus crédible — si une seule alternative existait, une seule ligne.

| Alternative | Raison de rejet |
|---|---|
| [Alternative A] | [Pourquoi écartée — 1 phrase, factuelle] |
| [Alternative B] | [Pourquoi écartée] |

---

## Conséquences

### ✅ Bénéfices attendus
- [Bénéfice 1 — concret et mesurable si possible]
- [Bénéfice 2]

### ⚠️ Contraintes acceptées
- [Trade-off ou limitation que cette décision impose]
- [Condition à maintenir pour que la décision reste valide]

### 🔗 Impact sur les agents
- **RAY** : [Ce que ça change dans la façon de spécer — règle concrète]
- **BOB** : [Ce que ça change dans la façon d'implémenter — règle concrète, ce qu'il ne faut jamais faire]
- **ANALYZER** : [Critère de déduction ou de rejet lié à cette décision]

---

## ADRs liés

> Lister les ADRs qui dépendent de cette décision ou qui la conditionnent.
> Supprimer cette section s'il n'y a pas de dépendance.

- Dépend de : [ADR-NNN — titre]
- Conditionne : [ADR-NNN — titre]

---

## Commits de référence

> Lister les commits qui ont implémenté ou suivi cette décision.
> Format : `type(scope): description` — hash court.
> Mettre à jour au fur et à mesure. Supprimer cette section si aucun commit direct.

| Commit | Description |
|---|---|
| `[hash]` | [feat/chore(scope): ce qui a été fait] |

---

## Révision

**Condition de révision :** [Événement ou constat qui rendrait cette décision caduque — ex : passage en V2, nouveau besoin métier, limite technique atteinte]

**Date ou milestone suggéré :** [ex : post-MVP | sprint V1.1 | jamais — décision permanente]
