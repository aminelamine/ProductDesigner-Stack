# ADR-004 — TypeScript strict — zéro any, zéro @ts-ignore

**Date :** 2026-03-18
**Statut :** ✅ ACCEPTED
**Décideurs :** Le Talent
**Agents concernés :** BOB, ANALYZER

---

## Contexte

Dans un système multi-agents où BOB implémente sur des sessions isolées, la cohérence des types est le premier
filet de sécurité contre les régressions silencieuses. Un `any` introduit par BOB en session 3 peut casser
une interface attendue par le code de session 1 sans erreur visible jusqu'au runtime.
Le mode strict TypeScript force la résolution de ces ambiguïtés au moment de l'écriture.

---

## Décision

**TypeScript est configuré en mode strict (`"strict": true` dans `tsconfig.json`). Zéro `any`, zéro `@ts-ignore`.**

Les interfaces et types doivent être explicites pour :
- Toutes les props de composants React
- Tous les retours de fonctions non-triviales
- Toutes les réponses d'API et actions serveur

En cas de type genuinement inconnu (réponse externe non typée), utiliser `unknown` + type guard explicite,
jamais `any`.

---

## Alternatives considérées

| Alternative | Raison de rejet |
|---|---|
| **TypeScript sans strict** | Trop permissif — permet des `any` implicites, détection d'erreurs trop tardive |
| **JavaScript pur** | Aucune sécurité de type, incompatible avec les exigences de maintenabilité du système multi-agents |
| **`@ts-ignore` autorisé sur exceptions justifiées** | Crée une dette technique difficile à tracer — les exceptions "justifiées" dérivent en norme |

---

## Conséquences

### ✅ Bénéfices attendus
- Les erreurs de type sont détectées à la compilation, pas en production
- Les interfaces forcent une documentation implicite des contrats entre composants
- BOB ne peut pas "contourner" un problème de typage — il doit le résoudre

### ⚠️ Contraintes acceptées
- Certaines intégrations tierces avec des types mal définis requièrent des efforts supplémentaires
- Le temps d'implémentation initial est légèrement plus long — compensé par l'absence de debugging type en runtime

### 🔗 Impact sur les agents
- **RAY** : Les specs doivent définir les types de données attendus quand pertinent (ex : shape d'un objet de contenu)
- **BOB** : Créer `lib/[feature]/types.ts` systématiquement. Jamais de `any` même "temporaire". Utiliser `unknown` + assertion de type si nécessaire
- **ANALYZER** : `any` ou `@ts-ignore` = déduction automatique de 2 points. Double déduction si trouvé dans une interface publique de composant

---

## ADRs liés

- Conditionne : tous les autres ADRs — c'est une règle transversale. Toute exception à TypeScript strict invalide les garanties de qualité sur lesquelles les autres ADRs s'appuient.

---

## Révision

Cette décision est permanente pour la durée du projet — elle ne doit pas être réexaminée sauf refactoring total de stack.
