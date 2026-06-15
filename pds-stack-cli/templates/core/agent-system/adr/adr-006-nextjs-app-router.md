# ADR-006 — Next.js App Router + stratégie Server/Client Components

**Date :** 2026-04-02
**Statut :** ✅ ACCEPTED
**Décideurs :** Le Talent
**Agents concernés :** BOB, RAY, ANALYZER

---

## Contexte

Next.js propose deux paradigmes de routing coexistants : le Pages Router (legacy, stable, basé sur `pages/`)
et l'App Router (introduit en Next.js 13, stable depuis 14, recommandé en 15). Les deux sont incompatibles
en terme de patterns : data fetching, layouts, gestion des erreurs, et streaming diffèrent fondamentalement.

Dans un système multi-agents où BOB reçoit des sessions isolées, l'ambiguïté entre les deux paradigmes
est une source majeure d'erreurs silencieuses — du code Pages Router valide dans un projet App Router
ne lève pas d'erreur à la compilation mais produit des comportements inattendus ou sous-optimaux.

Cette décision est aussi la fondation sur laquelle repose la stratégie Server Components (React 19) :
les deux sont indissociables en Next.js 15.

---

## Décision

**Nous utilisons exclusivement le App Router (`app/` directory). Le paradigme Pages Router est interdit.**

**Principe directeur : Server Component par défaut, `'use client'` uniquement quand contraint.**

```
app/
  layout.tsx          ← Root layout — Server Component
  page.tsx            ← Home page — Server Component
  [route]/
    page.tsx          ← Route page — Server Component par défaut
    loading.tsx       ← Suspense boundary automatique
    error.tsx         ← Error boundary (doit être Client Component)
    layout.tsx        ← Layout imbriqué si nécessaire
```

**Règles de classification Server / Client :**

| Situation | Directive |
|---|---|
| Lecture de données, rendu statique ou SSR | Server Component (défaut — aucune directive) |
| `useState`, `useReducer`, `useEffect` | `'use client'` obligatoire |
| Event handlers (`onClick`, `onChange`…) | `'use client'` obligatoire |
| Composants Shadcn interactifs (Dialog, Sheet, DropdownMenu, Form…) | `'use client'` obligatoire |
| Accès aux Browser APIs (`window`, `localStorage`, `navigator`) | `'use client'` obligatoire |
| Composants d'affichage pur sans état | Server Component — ne pas ajouter `'use client'` |
| Hooks Shadcn (`useToast`, `useSonner`) | `'use client'` obligatoire |

**Stratégie de data fetching :**

```tsx
// ✅ Correct — async Server Component
export default async function ProjectList() {
  const projects = await getProjects() // lib/projects/queries.ts
  return <ul>{projects.map(p => <ProjectCard key={p.id} project={p} />)}</ul>
}

// ❌ Interdit — fetching dans useEffect
export default function ProjectList() {
  const [projects, setProjects] = useState([])
  useEffect(() => { fetch('/api/projects').then(...) }, []) // anti-pattern App Router
}
```

**Mutations — Server Actions exclusivement :**

```tsx
// lib/[feature]/actions.ts
'use server'
export async function submitContactForm(formData: FormData) { ... }

// Jamais de route handler /api/ pour les mutations internes
```

---

## Alternatives considérées

| Alternative | Raison de rejet |
|---|---|
| **Pages Router** | Legacy — pas de Server Components, data fetching verbeux (`getServerSideProps`), layouts non composables. Next.js 15 le maintient pour compatibilité mais ne l'optimise plus |
| **App Router + Pages Router mixtes** | Coexistence possible mais crée deux paradigmes à maintenir — confusion garantie pour BOB en session isolée |
| **Remix** | Excellent routing, mais Next.js est le choix de stack validé — pas de justification de migration |
| **Server Components sans App Router** | Impossible — les RSC (React Server Components) ne sont supportés qu'avec le App Router en Next.js |

---

## Conséquences

### ✅ Bénéfices attendus
- Rendu HTML initial plus rapide — les Server Components n'envoient pas de JS au client
- Data fetching colocalisé avec le composant — pas de waterfall `useEffect` / `fetch`
- Layouts imbriqués sans re-render — transitions de page plus fluides
- Server Actions remplacent les route handlers pour les mutations — moins de boilerplate
- Streaming natif via Suspense + `loading.tsx` — perçu instantané pour l'utilisateur

### ⚠️ Contraintes acceptées
- Les composants Shadcn interactifs imposent `'use client'` sur leur wrapper — fragmenter l'arbre de composants en conséquence
- Certains packages npm ne supportent pas encore les Server Components — vérifier avant d'installer
- Le debugging est différent : les erreurs Server Component apparaissent dans le terminal, pas dans la console navigateur
- `error.tsx` doit obligatoirement être un Client Component (`'use client'`) — contrainte Next.js

### 🔗 Impact sur les agents

- **RAY** : Les specs doivent préciser si un composant est interactif (implique `'use client'`) ou de lecture pure (Server Component). Ne pas spécer de `useEffect` pour le data fetching — utiliser le pattern async Server Component. Les Server Actions sont le pattern attendu pour les mutations (contact form, etc.).

- **BOB** :
  - Jamais de fichier dans `pages/` — exclusivement `app/`
  - Jamais de `getServerSideProps`, `getStaticProps`, `getStaticPaths` — patterns Pages Router
  - Jamais de `useEffect` + `fetch` pour récupérer des données — async Server Component
  - `'use client'` en haut de fichier uniquement si un des triggers ci-dessus est présent
  - Garder les Client Components aussi bas que possible dans l'arbre (envelopper seulement le composant interactif, pas toute la page)
  - `loading.tsx` et `error.tsx` obligatoires pour chaque route avec données asynchrones
  - Les Server Actions vivent dans `lib/[feature]/actions.ts` avec directive `'use server'`

- **ANALYZER** :
  - Toute utilisation de `pages/` = rejet automatique (violation ADR-006)
  - `useEffect` pour du fetching de données = -2 pts (anti-pattern App Router)
  - Absence de `loading.tsx` sur une route avec `async` = -1 pt (état obligatoire non implémenté)
  - `'use client'` sur un composant sans état ni event handler = -1 pt (overhead JS inutile)
  - Route handler `/api/` pour une mutation interne = -1 pt (Server Action attendu)

---

## ADRs liés

- Conditionne : [ADR-001](adr-001-shadcn-only.md) — les composants Shadcn interactifs nécessitent `'use client'`, ce qui impacte la façon dont BOB les intègre dans l'arbre Server/Client
- Conditionne : [ADR-004](adr-004-typescript-strict.md) — les Server Actions et les props de Server Components doivent être typés strictement (pas de `any` sur `FormData` ou les retours d'actions)
- Indépendant de : ADR-002, ADR-003, ADR-005

---

## Révision

**Condition de révision :** Si Next.js introduit un breaking change majeur sur l'App Router, ou si React Server Components évoluent de manière incompatible.

**Date ou milestone suggéré :** À chaque upgrade majeur de Next.js (15.x → 16.x).
