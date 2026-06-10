# Feature Spec — [FEATURE_ID] : [Nom de la Feature]
> **Généré par** : RAY
> **Tier** : `[ ] T1 — Hotfix/Polish  [ ] T2 — Standard  [ ] T3 — Complexe`
> **Statut** : `[ ] DRAFT  [ ] VALIDÉE TALENT  [ ] EN DEV  [ ] EN REVIEW  [ ] LIVRÉE`
> **Dernière mise à jour** : `[YYYY-MM-DD]`
> **Lien Roadmap** : `roadmap.md#[ID]`

---

## Guide de sélection du tier

RAY déclare le tier **avant** d'écrire la spec. Le tier détermine la profondeur documentaire, pas la rigueur.

| Tier | Scope estimé | Critères | Process |
|---|---|---|---|
| **T1** | < 100 LOC | Hotfix, polish visuel, utility class, changement < 5 fichiers, zéro API, zéro nouvelle dépendance | Spec 30 lignes · pas de Gherkin · AC en liste plate · learnings 3 bullets · DO compact |
| **T2** | 100–300 LOC | Feature standard, nouveau composant, flow UI simple | Spec 100–150 lignes · 2 stories max · AC décomposés · learnings complets |
| **T3** | > 300 LOC ou nouvelle UI majeure | Feature complexe, nouvelle route, API, dépendance structurante | Spec complète · Gherkin exhaustif · Notes BOB/DO · learnings complets |

> ⚠️ Si le scope estimé dépasse le tier déclaré en cours d'implémentation → RAY re-tiere avant la prochaine spec.

---

---
# TIER 1 — Hotfix / Polish / Utility
> Utiliser quand : changement localisé < 100 LOC, zéro API, zéro nouvelle dépendance.
> Supprimer cette section si Tier 2 ou 3.
---

## Scope
**Problème :** `[1 phrase — quel comportement est cassé ou manquant]`
**Solution :** `[1 phrase — ce qu'on fait]`
**Fichiers touchés :** `[liste des fichiers modifiés — max 5]`

## Critères d'Acceptation
- [ ] `[Critère 1 — binaire, vérifiable par grep ou inspection visuelle]`
- [ ] `[Critère 2]`
- [ ] `[Critère 3 si applicable]`

**AC quantitatifs à grepper :**
- `[valeur cible]` → grep `[pattern]` dans `[fichier]`

## Notes BOB
`[1-3 lignes d'instruction si le changement est non-trivial. Sinon : "Modification atomique — voir AC."]`

---

---
# TIER 2 — Feature Standard
> Utiliser quand : nouveau composant ou flow UI, 100–300 LOC attendus.
> Supprimer cette section si Tier 1 ou 3.
---

## 📋 Contexte & Problème

**Problème :** `[2 phrases max — quel problème utilisateur concret]`
**JTBD :** *"Quand [situation], l'utilisateur veut [motivation], pour [résultat attendu]."*
**KPI cible :** `[1 métrique depuis roadmap.md]` → `[cible]` *(mesure : `[méthode]`)*

## 🎯 Scope

**In :** `[comportement 1]` · `[comportement 2]` · `[comportement 3]`
**Out :** `[non-comportement explicite]`
**Dépendance :** `[feature ID]` — `[relation]` — `[statut]`

## 👤 User Stories (max 2)

```gherkin
GIVEN [état initial]
WHEN [action]
THEN [résultat observable]
  AND [résultat secondaire si applicable]
```

```gherkin
GIVEN [condition limite ou cas d'erreur]
WHEN [action]
THEN [comportement attendu]
```

## ✅ Critères d'Acceptation

- [ ] `[Critère fonctionnel 1 — binaire]`
- [ ] `[Critère fonctionnel 2]`
- [ ] **Loading state** : `[description]`
- [ ] **Empty state** : `[description]`
- [ ] **Error state** : `[description]`
- [ ] Design System : composants listés dans `design_guide.md`, contraste WCAG AA, navigable clavier

**AC quantitatifs à grepper :**
- `[valeur cible]` → grep `[pattern]` dans `[fichier]`

## 🖥️ Interface

**Composants Shadcn requis :** `npx shadcn@latest add [composant]`
**Layout :** `[description textuelle ou wireframe ASCII]`
**Figma :** `[lien ou "À créer"]`

## 📐 Notes BOB
- `[Note technique 1]`
- `[Note technique 2 si applicable]`

---

---
# TIER 3 — Feature Complexe
> Utiliser quand : > 300 LOC, nouvelle route, API, ou dépendance structurante.
> Supprimer cette section si Tier 1 ou 2.
---

## 📋 Contexte & Problème

### Problème à résoudre
> En 2-3 phrases : quel est le problème utilisateur concret que cette feature adresse ?
> Ne pas décrire la solution ici — uniquement le problème.

`[À COMPLÉTER PAR RAY]`

### JTBD ciblé
> Extraire depuis `context/client_vision.md`

*"Quand [situation], l'utilisateur veut [motivation], pour [résultat attendu]."*
`[À COMPLÉTER]`

### Impact attendu
| KPI | Avant | Cible après feature | Méthode de mesure |
|---|---|---|---|
| `[KPI depuis roadmap.md]` | `[Baseline]` | `[Cible]` | `[Méthode]` |

---

## 🎯 Scope

### In Scope ✅
- `[Comportement 1]`
- `[Comportement 2]`
- `[Comportement 3]`

### Out of Scope ❌
- `[Non-comportement 1 — ex. : "pas de gestion multi-tenant"]`
- `[Non-comportement 2]`

### Dépendances
| Feature | Relation | Statut |
|---|---|---|
| `[Feature ID]` | `[doit être livrée avant / peut être parallèle]` | `[statut]` |

---

## 👤 User Stories (Format Gherkin)

### Story 1 — [Titre]
```gherkin
GIVEN [état initial du système / contexte utilisateur]
WHEN [action de l'utilisateur]
THEN [résultat observable attendu]
  AND [résultat secondaire si applicable]
```

### Story 2 — [Titre]
```gherkin
GIVEN [état initial]
WHEN [action]
THEN [résultat]
```

### Story 3 — Edge Case : [Titre]
```gherkin
GIVEN [condition limite ou cas d'erreur]
WHEN [action]
THEN [comportement de gestion d'erreur attendu]
```

---

## ✅ Critères d'Acceptation — Validés INVEST

> Chaque critère est BINAIRE (VRAI ou FAUX). Jamais "devrait", "généralement", "si possible".
> ANALYZER coche cette liste pour rendre son verdict.

### Fonctionnels
- [ ] `[Critère 1]`
- [ ] `[Critère 2]`
- [ ] `[Critère 3]`
- [ ] `[Critère 4]`

### États UI (obligatoires)
- [ ] **Loading state** : `[Description]`
- [ ] **Empty state** : `[Description + CTA si applicable]`
- [ ] **Error state** : `[Description + action proposée]`
- [ ] **Success state** : `[Description du feedback positif]`

### Design System
- [ ] Les composants utilisés sont listés dans `design_guide.md`
- [ ] La hiérarchie des actions (primary/secondary/destructive) est respectée
- [ ] Le contraste WCAG AA est respecté sur tous les éléments
- [ ] L'interface est navigable au clavier

### Performance
- [ ] `[Critère perf — ex. : "Liste charge en < 500ms sur 4G"]`

**AC quantitatifs à grepper :**
| Critère | Cible | Grep pattern | Fichier |
|---|---|---|---|
| `[valeur]` | `[cible]` | `[pattern]` | `[fichier]` |

---

## 🖥️ Interface & Comportements

### Composants Shadcn/ui requis
```bash
npx shadcn@latest add [composant-1]
npx shadcn@latest add [composant-2]
```

### Wireframe / Description de l'interface
```
┌─────────────────────────────────┐
│ [Description du layout]        │
│                                 │
│  [Zone A]    [Zone B]           │
│                                 │
│  [CTA Primary]  [CTA Secondary] │
└─────────────────────────────────┘
```

**Figma :** `[lien ou "À créer"]`

### Interactions clés
| Action utilisateur | Comportement attendu |
|---|---|
| `[Clic sur [bouton]]` | `[Description précise]` |
| `[Soumission formulaire]` | `[Validation → appel API → feedback]` |

---

## 🔌 Données & API

### Données nécessaires
| Donnée | Source | Type | Requis |
|---|---|---|---|
| `[Nom]` | `[API / BDD / État local]` | `[type]` | `[Oui / Non]` |

### Endpoints / Actions
```typescript
async function [actionName](params: [Type]): Promise<[ReturnType]> {
  // [Description de la logique attendue]
}
```

### Gestion des erreurs
| Cas d'erreur | Message utilisateur | Action proposée |
|---|---|---|
| `[Timeout API]` | `[Message clair]` | `[Bouton "Réessayer"]` |
| `[Erreur 500]` | `[Message générique]` | `[Contact support]` |

---

## 📐 Notes Techniques pour BOB
- `[Note 1]`
- `[Note 2]`

---

## 🔍 Notes pour ANALYZER
- `[Point d'attention UX 1]`
- `[Point d'attention 2]`

---

## 📝 Historique de la Spec

| Date | Version | Changement | Par |
|---|---|---|---|
| `[YYYY-MM-DD]` | `v0.1` | Création initiale | RAY |
| `[YYYY-MM-DD]` | `v0.2` | `[Description]` | `[RAY / Le Talent]` |
