---
feature_id: [ID]
feature_name: [Nom de la feature]
tier: [T1 / T2 / T3]
date: [YYYY-MM-DD]
verdict: [VALIDÉ / VALIDÉ AVEC RÉSERVES / REJETÉ]
score: [X]/20
---

<!-- ============================================================ -->
<!-- TIER 1 — Format compact (supprimer si T2 ou T3)             -->
<!-- ============================================================ -->

## T1 — Learnings

- **Pattern :** `[Ce que BOB a bien fait — à réutiliser]`
- **Anti-pattern :** `[Ce qui a causé une déduction — à éviter]` *(ou "(aucun)")*
- **ADR candidat :** `[Si un pattern récurrent émerge — sinon "(aucun)"]`

<!-- ============================================================ -->
<!-- TIER 2 / TIER 3 — Format complet (supprimer si T1)          -->
<!-- ============================================================ -->

## Patterns qui ont bien fonctionné
> Ce que BOB a fait de remarquable — à réutiliser dans les prochaines features.
- (aucun) OU [Pattern concret + contexte d'application]

## Anti-patterns détectés
> Ce qui a causé des déductions — à éviter systématiquement.
- (aucun) OU [Anti-pattern + pourquoi ça pose problème + correction attendue]

## Ambiguïtés de spec à anticiper
> Ce que RAY doit clarifier dès la spec pour éviter l'interprétation libre de BOB.
- (aucun) OU [Point ambigu + formulation suggérée pour la prochaine spec]

## Signal CX à surveiller
> Frictions utilisateur identifiées en simulation — à intégrer dans les prochaines user stories.
- (aucun) OU [Friction + JTBD impacté]

## Décision d'architecture émergente
> Si le code de BOB révèle un besoin d'ADR non couvert, le signaler ici pour RAY.
- (aucun) OU [Décision potentielle + déclencheur observé] → À transformer en ADR si récurrent 3+ fois
