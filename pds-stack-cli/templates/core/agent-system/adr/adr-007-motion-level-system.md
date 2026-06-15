# ADR-007 — Système de niveaux motion L0–L3

**Date :** 2026-04-09
**Statut :** ✅ ACCEPTED
**Décideurs :** Le Talent
**Agents concernés :** JO | BOB | DO

---

## Contexte

La stack ne disposait d'aucune couche motion formalisée. Le `design_guide.md` interdisait les animations "pour impressionner" mais ne définissait pas ce qui était autorisé, laissant BOB sans contrainte claire. Le risque : sur-animation par défaut (comportement statistique des LLMs sans contrainte), ou absence totale d'animation sur des features où le motion aurait un impact réel. Par ailleurs, le projet portfolio (filosophie "sobre, éditorial") ne doit pas imposer ses contraintes à des features futures qui pourraient nécessiter un impact visuel fort (landing page, onboarding, product demo).

---

## Décision

**Nous adoptons un système de 4 niveaux motion typés (L0–L3), définis dans `design_guide.md` et obligatoirement spécifiés par JO dans chaque spec.**

```yaml
# Champ obligatoire dans chaque feature spec
motion_level: L0   # L0 | L1 | L2 | L3
motion_zones: []   # zones concernées — ex: ["hero", "cards"]
motion_note: ""    # obligatoire si L3 : justification en 1 ligne (JO)
```

Librairies associées :
- L0 : aucune lib (CSS Tailwind uniquement)
- L1–L2 : `motion` (`npm install motion`)
- L3 : `motion` + `gsap` + `@gsap/react` (opt-in, validation JO)

Règle universelle (tous niveaux) : `prefers-reduced-motion` obligatoire sur tous les composants animés.

---

## Alternatives considérées

| Alternative | Raison de rejet |
|---|---|
| Framer Motion (ancien package) | Remplacé par `motion` — même auteur, meilleur tree-shaking, API identique |
| Niveau unique "sobre" fixe | Trop restrictif pour des features à fort impact ; BOB interprète "sobre" de façon variable |
| Laisser BOB choisir le niveau | Comportement non déterministe — les LLMs sur-animent sans contrainte explicite |
| GSAP par défaut | Overhead injustifié pour L0–L2 ; GSAP réservé aux cas cinématiques réels |

---

## Conséquences

### ✅ Bénéfices attendus
- Niveau motion décidé consciemment à la spec, pas à l'implémentation
- Stack agile : le même système de spec couvre du portfolio sobre jusqu'à une landing page cinématique
- BOB ne peut pas sur-animer sans spec explicite — L0 par défaut élimine la dérive
- `prefers-reduced-motion` systématique → accessibilité non négociable

### ⚠️ Contraintes acceptées
- JO doit évaluer et définir `motion_level` pour chaque feature — charge cognitive légèrement accrue
- L3 nécessite une justification écrite de JO — pas de GSAP "parce que c'est plus impactant"
- `motion` est installé par défaut même si 80% des features restent en L0 (overhead minimal, ~30kb gzip)

### 🔗 Impact sur les agents
- **JO** : Doit définir `motion_level` + `motion_zones` dans chaque spec générée. Pour L3, rédiger `motion_note` expliquant pourquoi le niveau cinématique est justifié par le contexte produit.
- **BOB** : Lit `motion_level` avant tout travail d'UI. Absent → L0 forcé. L3 sans `motion_note` → STOP, demande clarification. N'excède jamais le niveau défini, même si le rendu semble "meilleur".
- **DO** : Évalue si le niveau motion choisi est cohérent avec le contexte de la feature (ex : L2 sur un formulaire de contact = rejet). Vérifie la présence du `prefers-reduced-motion` sur tous les composants animés.

---

## ADRs liés

- Dépend de : [ADR-001](adr-001-shadcn-only.md) — Shadcn/ui comme seule librairie UI (motion est une lib d'animation, pas une lib de composants — pas de conflit)
- Conditionne : toute future décision sur les page transitions ou les animations globales

---

## Commits de référence

| Commit | Description |
|---|---|
| `—` | `chore(stack): add motion system L0–L3 to design_guide + spec template + BOB prompt` |

---

## Révision

**Condition de révision :** Si `motion` (le package) introduit une breaking change majeure, ou si GSAP sort une API React native stable qui justifie une adoption à L2.

**Date ou milestone suggéré :** post-MVP — réévaluer si le projet évolue vers des features cinématiques régulières.
