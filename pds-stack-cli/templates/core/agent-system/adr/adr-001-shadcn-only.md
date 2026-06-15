# ADR-001 — Shadcn/ui comme seule librairie de composants UI

**Date :** 2026-03-18
**Statut :** ✅ ACCEPTED
**Décideurs :** Le Talent
**Agents concernés :** BOB, ANALYZER

---

## Contexte

Le projet est un portfolio produit personnel avec un design sobre et éditorial. Le choix de la librairie
de composants impacte directement la maintenabilité, le degré de contrôle sur le markup, et la cohérence
visuelle long terme. Dans un système multi-agents, une librairie unique réduit les risques de divergence
entre les sessions BOB.

---

## Décision

**Nous adoptons Shadcn/ui comme seule et unique source de composants UI, installés exclusivement via CLI.**

- Installation : `npx shadcn@latest add [composant]` uniquement
- Les fichiers générés dans `/components/ui/` sont sous ownership Shadcn — jamais modifiés directement
- Extension uniquement via `className` ou `cva` (class-variance-authority, inclus dans Shadcn)
- Toute addition de composant hors liste validée (`design_guide.md`) requiert validation Talent

---

## Alternatives considérées

| Alternative | Raison de rejet |
|---|---|
| **Radix UI direct** | Shadcn est déjà une surcouche Radix — doublon inutile, complexité sans bénéfice |
| **MUI / Chakra** | Opinionated styling difficile à surcharger, bundle heavy, incompatible avec l'esthétique sobre visée |
| **Headless UI (Tailwind Labs)** | Moins de composants, maintenance moins active que Radix/Shadcn |
| **Composants custom from scratch** | Accessibilité non garantie, coût de développement élevé sur les patterns complexes |

---

## Conséquences

### ✅ Bénéfices attendus
- Accessibilité ARIA garantie par Radix (base de Shadcn) sans effort supplémentaire
- Ownership total sur le styling — markup copiable, pas de CSS encapsulé
- Cohérence garantie entre sessions BOB (pas de drift librairie)
- Compatible TypeScript strict nativement

### ⚠️ Contraintes acceptées
- La liste de composants validés doit être maintenue dans `design_guide.md`
- Tout nouveau composant nécessite une étape d'installation CLI consciente
- Certains patterns très spécifiques (data tables complexes, rich text editor) peuvent nécessiter une exception ADR

### 🔗 Impact sur les agents
- **RAY** : Les specs UI doivent référencer des composants Shadcn existants — ne pas spécer des composants inexistants sans noter la dépendance
- **BOB** : Vérifier `design_guide.md §Composants validés` avant tout travail d'interface. Bloquer si un composant nécessaire n'est pas listé
- **ANALYZER** : Toute utilisation d'une librairie UI non-Shadcn est un critère de rejet automatique

---

## ADRs liés

- Conditionne : [ADR-002](adr-002-zinc-theme.md) — le thème Zinc est une configuration Shadcn, sa validité dépend de cette décision
- Conditionne : [ADR-005](adr-005-no-dark-mode-mvp.md) — indirectement, via la chaîne ADR-001 → ADR-002 → ADR-005

---

## Révision

Cette décision doit être réexaminée si : le projet évolue vers un dashboard complexe (tables, charts, formulaires multi-steps) où Shadcn montre ses limites.
Date de révision suggérée : post-MVP, avant phase V2.
