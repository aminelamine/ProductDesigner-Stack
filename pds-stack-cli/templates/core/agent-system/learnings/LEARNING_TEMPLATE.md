---
feature_id: [ID]
feature_name: [Nom]
voie: [sketch / standard / system]
date: [YYYY-MM-DD]
conformance: [X]/20
direction: [retenue / refusée]
---

<!-- ============================================================ -->
<!-- ① DESIGN — obligatoire, quelle que soit la voie              -->
<!-- Lisible par un designer qui ne code pas.                     -->
<!-- Test mécanique : zéro terme TypeScript dans cette moitié.    -->
<!-- ============================================================ -->

## Ce que la direction a appris
> Ce que ce cycle apprend sur **ce produit** — pas sur le framework, pas sur le langage.
> Formuler en contrainte réutilisable, pas en récit.
- (aucun) OU [Contrainte formulée pour le prochain brief]

## Références — ce qui a porté, ce qui a induit en erreur
> Une référence qui n'a pas marché est aussi utile qu'une qui a marché. Dire laquelle et pourquoi.
- (aucune) OU [Référence + ce qu'on en a pris ou pourquoi elle a mal orienté]

## Design system — ce qui manque ou dérive
> Un token absent, un composant recréé à la main, une valeur posée hors registre.
- (aucun) OU [Manque constaté → ce qu'il faudrait ajouter au registre]

## Critique récurrente
> Le même reproche revient-il d'un cycle à l'autre ? À la 3ᵉ occurrence, ça devient une décision.
- (aucune) OU [Le reproche + combien de fois il est apparu]

## Voix et contenu
> Ce que ce cycle apprend sur le ton, la densité de copy, la hiérarchie éditoriale.
- (aucun) OU [Constat]

<!-- ============================================================ -->
<!-- ② TECHNIQUE — uniquement si modules.code: true               -->
<!-- Secondaire. Ne remonte jamais avant la moitié ①.             -->
<!-- ============================================================ -->

## Technique — patterns et anti-patterns
> Réservé à l'implémentation. Cette section n'est jamais lue par la phase DIRECTION.
- (aucun) OU [Pattern ou anti-pattern + correction attendue]

## Ambiguïtés de spec à anticiper
- (aucune) OU [Point ambigu + formulation suggérée]

<!-- ============================================================ -->

> **Pourquoi cet ordre.** En V3, les learnings de P-001 parlaient de `nowrap: boolean`,
> `overflow-x-clip` et de types de retour — zéro ligne sur la composition ou l'échelle typo.
> Après 3 features, la mémoire du système était une mémoire de QA frontend. Ce qui devait
> composer, c'était le goût.
