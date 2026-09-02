# Spec — F-001 : FeedbackCard
> **Statut :** `VALIDÉE TALENT`
> **Rédigée par :** JO
> **Date :** 2026-04-14
> **Motion level :** `L1`

---

## 🎯 Objectif

Créer un composant React autonome `FeedbackCard` affichant un feedback de design review avec ses métadonnées, son statut, sa sévérité, et ses actions contextuelles.

Ce composant est la brique centrale du produit "Critique". Il doit fonctionner isolément (props-driven, pas de store).

---

## 👤 User Story

> En tant que designer (Selin), je veux voir d'un coup d'œil le statut, la sévérité et le contexte d'un feedback, pour comprendre l'état sans avoir à ouvrir Figma.

> En tant que dev (Kévin), je veux pouvoir changer le statut d'un feedback directement depuis la card, pour signaler ma progression sans quitter mon contexte.

---

## 📦 Interface TypeScript

```typescript
type FeedbackSeverity = 'critical' | 'major' | 'minor'
type FeedbackStatus = 'new' | 'in_review' | 'implemented' | 'closed'

interface FeedbackCardProps {
  id: string
  title: string
  description: string
  component: string          // ex: "Button / Primary"
  severity: FeedbackSeverity
  status: FeedbackStatus
  author: {
    name: string
    avatar?: string
  }
  createdAt: Date
  onStatusChange?: (id: string, newStatus: FeedbackStatus) => void
}
```

---

## 🎨 Design — Visual Spec

### Anatomie de la card

```
┌─────────────────────────────────────────────────────────┐
│ [SEVERITY_DOT] [COMPONENT_PATH]          [STATUS_BADGE] │  ← Header
│─────────────────────────────────────────────────────────│
│ Title (bold, lisible)                                   │  ← Title
│ Description (body, muted)                               │  ← Body
│─────────────────────────────────────────────────────────│
│ [AVATAR] Author · [TIMESTAMP mono]    [ACTION_BUTTON]   │  ← Footer
└─────────────────────────────────────────────────────────┘
```

### Severity dot — couleurs fonctionnelles
- `critical` → rouge destructif (`text-red-500` / `bg-red-500/10`)
- `major` → amber (`text-amber-400` / `bg-amber-400/10`)
- `minor` → slate (`text-slate-400` / `bg-slate-400/10`)

### Status badge — transitions
| Status | Label | Couleur |
|---|---|---|
| `new` | NEW | `bg-blue-500/15 text-blue-400` |
| `in_review` | IN REVIEW | `bg-amber-500/15 text-amber-400` |
| `implemented` | IMPLEMENTED | `bg-emerald-500/15 text-emerald-400` |
| `closed` | CLOSED | `bg-slate-500/15 text-slate-400` |

### Action button — transitions autorisées
```
new         → [ Mark In Review ]
in_review   → [ Mark Implemented ]
implemented → [ Close ]
closed      → (aucune action, card opaque 60%)
```

---

## 🎬 Motion — Niveau L1

```typescript
// Séquence d'entrée : fade-up depuis le bas (stagger si liste)
initial: { opacity: 0, y: 12 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.35, ease: 'easeOut' }

// Transition de status : fade de l'ancien badge vers le nouveau
// Utiliser AnimatePresence sur le status badge uniquement
// ⚠️ AnimatePresence est autorisé à L1 uniquement pour les changements de contenu inline
```

---

## ✅ Critères de done (DO les vérifie)

- [ ] Tous les états de status sont visuellement distincts
- [ ] Tous les états de severity sont distincts
- [ ] L'action contextuelle est correcte pour chaque status
- [ ] La card `closed` est clairement désactivée visuellement
- [ ] TypeScript strict — aucun `any`
- [ ] Composant < 150 lignes (hors types)
- [ ] `prefers-reduced-motion` respecté
- [ ] Données via props — aucune valeur hardcodée dans le composant

---

## 🚫 Out of scope (F-001)

- ❌ Gestion des permissions (designer vs dev)
- ❌ Connexion à une API ou store global
- ❌ Formulaire de réponse / thread de commentaires
- ❌ Dark/light toggle (dark mode only pour le MVP)

---

## 📝 Notes JO

Le principal risque de BOB sur cette spec : **sur-complexifier le footer** en ajoutant des menus ou des tooltips non demandés. La card doit rester dense mais lisible — pas de popover en MVP.

Second risque : utiliser `AnimatePresence` au niveau de la card entière plutôt que du badge seul — ce serait L2, pas L1.
