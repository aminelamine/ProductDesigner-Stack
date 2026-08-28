# AGENT SYSTEM — Documentation Opérationnelle
> Le manuel de vol du système multi-agents pour ce projet produit.
> À lire une fois avant de démarrer. À consulter en cas de doute sur le workflow.

---

## 🗺️ Architecture

```
agent-system/
├── AGENT_SYSTEM.md          ← Ce fichier (tu es ici)
│
├── context/                 ← La mémoire partagée des agents (contenu stable = cache-friendly)
│   ├── client_vision.md     ← Objectifs client, JTBD, contraintes, valeurs produit
│   ├── roadmap.md           ← Features, KPIs, backlog, out-of-scope
│   └── design_guide.md      ← Philosophie UI, design tokens, composants Shadcn/ui
│
├── adr/                     ← Architecture Decision Records (mémoire longue)
│   ├── ADR_INDEX.md         ← Registre de toutes les décisions — lire en priorité
│   ├── ADR_TEMPLATE.md      ← Template pour créer un nouvel ADR
│   ├── adr-001-*.md         ← Décisions actives indexées
│   └── ...
│
├── agents/                  ← Les system prompts des agents
│   ├── JO_system_prompt.md      ← Architecte & Strategist
│   ├── BOB_system_prompt.md     ← Builder & UI/UX Engineer
│   └── DO_system_prompt.md      ← Product QA & CX
│
├── learnings/               ← Mémoire longue auto-maintenue par ANALYZER ← NOUVEAU
│   ├── LEARNINGS_INDEX.md   ← Index des patterns — lire en priorité
│   ├── LEARNING_TEMPLATE.md ← Template pour chaque learning
│   └── feature_*_learnings.md ← Un fichier par feature évaluée
│
├── sessions/                ← Checkpoints BOB pour résilience mid-run ← NOUVEAU
│   └── session_feature_[ID].md ← État du Ralph Loop, effacé après verdict ANALYZER
│
└── specs/                   ← Les specs vivantes générées par RAY
    ├── feature_template.md  ← Template à copier pour chaque nouvelle feature
    ├── feature_001_[nom].md ← Exemple de spec (à créer)
    └── ...
```

> **Règle ADR** : Avant toute décision d'architecture ou de dépendance, consulter `adr/ADR_INDEX.md`.
> Si une décision similaire existe en statut ACCEPTED, elle s'applique sans rediscussion.

---

## 🔄 Le Workflow en 3 phases

### PHASE 1 — PLAN (Le Talent → RAY)

```
Le Talent formule une idée brute
        ↓
RAY lit client_vision.md + roadmap.md
        ↓
RAY challenge avec 3 questions (sparring)
        ↓
Le Talent répond / arbitre
        ↓
RAY génère specs/feature_[ID].md
        ↓
Le Talent valide la spec (go/no-go)
```

**Déclencheur :** `"RAY, j'ai une idée : [description brute]"`
**Output :** `specs/feature_[ID]_[nom].md` avec statut VALIDÉE TALENT

---

### PHASE 2 — SHIP (RAY → BOB)

```
BOB reçoit specs/feature_[ID].md
        ↓
BOB lit design_guide.md
        ↓
BOB identifie les composants Shadcn à installer
        ↓
BOB code en Ralph Loop itératif :
  Structure → Scaffold → Core Logic → UI → États → Polish
        ↓
BOB livre avec rapport de conformance auto-évalué
```

**Déclencheur :** `"BOB, implémente la feature [ID] — spec dans specs/feature_[ID].md"`
**Output :** Code Next.js dans `/app` et `/components`

---

### PHASE 3 — ANALYZE (BOB → ANALYZER → Le Talent)

```
ANALYZER reçoit le code de BOB + la spec de RAY
        ↓
ANALYZER évalue sur 4 dimensions (score /20)
        ↓
        ├── Score ≥ 18 → ✅ VALIDÉ → Le Talent
        ├── Score 14-17 → ⚠️ Réserves → BOB (corrections mineures)
        ├── Score 10-13 → ❌ REJETÉ → BOB (rework)
        └── Score < 10  → 🚨 Re-spec → RAY
        ↓ (dans tous les cas)
ANALYZER écrit learnings/feature_[ID]_learnings.md   ← NOUVEAU
ANALYZER met à jour learnings/LEARNINGS_INDEX.md     ← NOUVEAU
Le Talent archive sessions/session_feature_[ID].md   ← NOUVEAU
```

**Déclencheur :** `"ANALYZER, évalue la feature [ID] — code livré par BOB"`
**Output :** Rapport avec verdict, score /20, feedbacks actionnables + fichier learnings

---

## 📋 Règles du Système

### Pour Le Talent (toi)
1. **Tu as le dernier mot** sur toutes les décisions. Les agents challengent, proposent, exécutent — toi tu tranches.
2. **Maintiens la knowledge base à jour** : si la vision change, mets à jour `client_vision.md` avant de demander une nouvelle spec à RAY.
3. **Une spec validée = un contrat** : ne pas demander à BOB d'implémenter sans spec validée.
4. **Max 2 cycles ANALYZER → BOB** avant arbitrage manuel.

### Pour les agents
- RAY ne code pas.
- BOB ne spécifie pas.
- ANALYZER n'invente pas de critères.
- Tous préfixent leurs messages par `[RAY]`, `[BOB]` ou `[ANALYZER]`.

---

## 🚀 Démarrage rapide — Checklist

Avant de créer ta première spec, valide ces points :

- [ ] `context/client_vision.md` est rempli (persona, JTBD, contraintes)
- [ ] `context/roadmap.md` a au moins 1 feature en section NOW
- [ ] `context/design_guide.md` a les design tokens et couleurs définies
- [ ] Le projet Next.js est initialisé (`npx create-next-app@latest`)
- [ ] Shadcn/ui est installé (`npx shadcn@latest init`)
- [ ] Claude Code est installé (`npm install -g @anthropic-ai/claude-code`)

---

## 🔧 Setup dans Claude Code

Ce système est conçu pour **Claude Code** — tout s'active via des slash commands et le `CLAUDE.md` racine.

### Structure des fichiers Claude Code

```
[racine du projet]/
├── CLAUDE.md                        ← Chargé automatiquement à chaque session
└── .claude/
    └── commands/
        ├── ray.md                   ← /ray  — Phase PLAN
        ├── bob.md                   ← /bob  — Phase SHIP
        └── analyzer.md              ← /analyzer — Phase REVIEW
```

### Utilisation des slash commands

```bash
# Phase PLAN — soumettre une idée à RAY
/ray j'ai une idée : [description brute]

# Phase SHIP — demander à BOB d'implémenter
/bob implémente feature_001 — spec dans agent-system/specs/feature_001_[nom].md

# Phase ANALYZE — demander à ANALYZER d'évaluer
/analyzer évalue feature_001 — code dans /app/[feature] et /components/[feature]
```

### Mémoire persistante entre sessions

Claude Code charge `CLAUDE.md` à chaque démarrage. Pour ajouter des informations persistantes en cours de session :
```bash
# Dans le chat Claude Code
# [ton information à mémoriser]
```

### Intégration GSD (optionnel — recommandé pour les features complexes)

[GSD (Get Shit Done)](https://github.com/gsd-build/get-shit-done) résout le context rot sur les longues implémentations BOB. À utiliser quand une feature dépasse ~3h de travail ou implique plusieurs sous-systèmes.

```bash
# Installer GSD
npx get-shit-done-cc@latest

# Initialiser sur ce projet (une seule fois)
/gsd:new-project

# Utilisation type avec ce système
# 1. RAY génère specs/feature_[ID].md
# 2. Tu passes la spec à GSD comme REQUIREMENTS
# 3. GSD orchestre BOB en fresh contexts isolés
# 4. ANALYZER évalue le résultat final
```

Les fichiers de contexte de ce système (`client_vision.md`, `roadmap.md`, `design_guide.md`) sont directement compatibles avec le format de knowledge base de GSD.

---

## ⚡ Optimisation Cache-Prompt (performance)

Le cache de contexte réduit la latence et le coût de chaque invocation d'agent. Pour maximiser les cache hits :

### Règle de structure des fichiers de contexte

> **Stable en tête, volatile en queue.**

Chaque fichier de contexte doit être structuré ainsi :

```
[SECTION STABLE — ne change jamais entre features]
  → Philosophie, valeurs, contraintes fondamentales
  → Design tokens, composants autorisés
  → ADRs ACCEPTED

[SECTION SEMI-STABLE — change rarement]
  → Personas, JTBD principaux
  → KPIs produit, définition du succès

[SECTION VOLATILE — change à chaque feature]
  → Backlog, features en cours, statuts
  → Notes de la dernière session
```

Le modèle peut réutiliser le cache sur les sections stables même quand le contenu volatile change. Si tu permutes l'ordre (volatile en tête), le cache est invalidé à chaque run.

### Comportements par version de modèle

> Ces notes documentent des quirks observés empiriquement. À réviser à chaque upgrade de modèle.

| Modèle | Comportement observé | Impact sur la stack |
|---|---|---|
| claude-sonnet-3.7 | "Context anxiety" : BOB peut demander des confirmations excessives sur des choix évidents en fin de long contexte | Mitigation : Ralph Loop checkpoints pour garder le contexte frais |
| claude-opus-4+ | Comportement plus autonome sur les choix d'implémentation | Surveiller si le Brief Esthétique gate reste nécessaire ou peut être allégé |

> **Règle** : Ne jamais encoder une règle comportementale comme "invariante" si elle compense un quirk modèle-spécifique. La mettre dans ce tableau à la place.

---

## 📝 Convention de nommage des specs

```
specs/feature_[ID]_[nom-kebab-case].md

Exemples :
  specs/feature_001_onboarding-flow.md
  specs/feature_002_dashboard-overview.md
  specs/feature_003_export-csv.md
```

**ID** : numéro séquentiel à 3 chiffres, correspond à l'ID dans `roadmap.md`

---

## ❓ FAQ

**Q : RAY peut-il modifier client_vision.md ou roadmap.md ?**
Non. Ces fichiers sont sous la responsabilité exclusive du Talent. RAY peut signaler des incohérences, mais ne modifie pas ces fichiers.

**Q : Que faire si BOB implémente quelque chose qui n'est pas dans la spec ?**
ANALYZER le détecte et le signale comme "comportement non spécifié". BOB doit le retirer ou Le Talent doit l'ajouter explicitement à la spec.

**Q : Combien de features peuvent être en parallèle ?**
1 feature par agent à la fois. RAY peut préparer la spec suivante pendant que BOB travaille sur la courante.

**Q : Comment gérer un pivot stratégique ?**
1. Mettre à jour `client_vision.md` et/ou `roadmap.md`
2. Re-brief RAY avec le nouveau contexte
3. Les specs existantes peuvent nécessiter une révision — vérifier les dépendances
