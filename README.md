# ⬡ AgentStack — Stack Officielle Product Designer

> Système multi-agents **JO · BOB · DO** pour Claude Code.
> Architecture **OS-light · Skills-first** — optimisée pour les product designers qui buildent avec l'IA.

---

## Pourquoi cette stack

La plupart des setups Claude Code font deux erreurs : ils surchargent `CLAUDE.md` (l'équivalent de la RAM permanente) et ils mélangent la logique des agents avec la configuration projet. Résultat : ~1 400 tokens chargés à chaque tour, des agents qui se contredisent entre sessions, et une documentation qui dérive du code au bout de 3 features.

Cette stack résout ça avec une thèse simple : `CLAUDE.md` est l'OS. Les agents sont des apps chargées à la demande. Les specs sont la source de vérité. Les learnings sont la mémoire longue.

| | Setup classique | AgentStack |
|---|---|---|
| `CLAUDE.md` | ~1 400 tokens par tour | ~150 tokens — OS uniquement |
| Logique agents | Dans l'OS (dupliquée) | Dans system prompts, chargés à la demande |
| Mémoire longue | Inexistante | DO écrit les learnings · JO les lit |
| Brief esthétique | Optionnel, souvent sauté | Gate obligatoire avant tout code |
| Décisions archi | Perdues entre sessions | ADR system intégré |
| Économie (20 tours) | — | ~25 000 tokens |

---

## Les agents

| Slash command | Agent | Phase | Mission |
|---|---|---|---|
| `/jo` · `/ray` | **JO / RAY** — Architecte & Strategist | PLAN | Challenge les idées · génère les specs · crée les ADRs |
| `/bob` | **BOB** — Builder & UI/UX Engineer | SHIP | Brief esthétique (gate) · implémente · commite |
| `/do` · `/analyze` | **DO / ANALYZER** — Product QA & CX | ANALYZE | Score /20 · verdict VALIDÉ/REJETÉ · écrit les learnings |
| `/design-workflow` | **Bridge DS** — Designer Figma | DESIGN | Génère des frames Figma depuis une spec JO *(optionnel)* |

---

## Stack

| Outil | Version | Notes |
|---|---|---|
| **Next.js** | `16.2.0` (App Router) | Server Components par défaut |
| **React** | `19.2.4` | Client Components explicitement justifiés |
| **TypeScript** | `strict: true` | Zéro `any`, zéro `@ts-ignore` |
| **Tailwind CSS** | `4.x` | Nouvelle syntaxe — config via CSS, plus de `tailwind.config.js` |
| **Shadcn/ui** | `4.x` via CLI | `/components/ui/` est read-only — ownership Shadcn |
| **Motion** | `12.x` | Animations — remplace Framer Motion |
| **Base UI** | `1.x` | Primitives headless complémentaires |
| **Lucide React** | `0.577+` | Icônes |
| **Figma MCP** | `figma-console-mcp` | Pré-installé en devDependency |
| **Node.js** | `>=20` | |

---

## Workflow

```
/jo  "j'ai une idée : [description]"
      ↓
     JO challenge → génère specs/active/feature_[ID].md
     statut: VALIDÉE TALENT requis pour débloquer BOB
      ↓
/design-workflow  "spec feature_[ID]"    ← optionnel, recommandé pour features visuelles
      ↓
     Bridge DS → frame Figma
      ↓
/bob  "implémente feature_[ID]"
      ↓
     BOB lit spec + design_guide + ADRs
      ↓
     [BRIEF ESTHÉTIQUE — gate obligatoire]
     ⏸ BOB s'arrête et attend ta validation
     "ok" ou ajustements → BOB code
      ↓
     Ralph Loop : Structure → Scaffold → Logic → UI → États → Polish
      ↓
/do  "évalue feature_[ID]"
      ↓
     DO → score /20 · conformance spec + ADRs · verdict
      ↓
     Learnings écrits dans agent-system/learnings/feature_[ID]_learnings.md
      ↓
     JO lit ces learnings avant la prochaine spec → le système s'améliore
```

---

## Quick Start

Ce repo est un projet Next.js réel **et** le système agentique. Pour utiliser la stack sur un nouveau projet, clone le template générique dans `agent-stack-template/` :

```bash
# Cloner le template générique
gh repo clone aminelamine/ProductDesigner-Stack mon-projet -- --depth=1
cd mon-projet/agent-stack-template
bash setup.sh

# Ou sans historique git
npx degit aminelamine/ProductDesigner-Stack/agent-stack-template mon-projet
cd mon-projet
bash setup.sh
```

Le wizard `setup.sh` configure `CLAUDE.md` avec le nom et la description de ton projet, installe les dépendances, et initialise le repo git.

Pour lancer le projet en local :

```bash
pnpm dev
```

---

## Structure

```
ProductDesigner-Stack/
│
├── CLAUDE.md                              ← OS — ~150 tokens, toujours en RAM
├── AGENTS.md                              ← Contraintes opérationnelles du sprint en cours
│
├── .claude/
│   ├── commands/
│   │   ├── jo.md                          ← /jo  — charge JO_system_prompt.md
│   │   ├── ray.md                         ← /ray — alias de JO (même agent, nom alternatif)
│   │   ├── bob.md                         ← /bob — charge BOB_system_prompt.md
│   │   ├── do.md                          ← /do  — charge DO_system_prompt.md
│   │   ├── analyze.md                     ← /analyze — alias de DO
│   │   └── design-workflow.md             ← /design-workflow — Bridge Figma (optionnel)
│   └── skills/
│       └── frontend-design/
│           └── SKILL.md                   ← Brief esthétique BOB (gate non négociable)
│
├── agent-system/
│   ├── AGENT_SYSTEM.md                    ← Vue d'ensemble du système agentique
│   ├── PROJECT_BRIEF_TEMPLATE.md
│   ├── PROMPTING_GUIDE.md
│   ├── agents/
│   │   ├── JO_system_prompt.md            ← Chargé par /jo et /ray
│   │   ├── BOB_system_prompt.md           ← Chargé par /bob
│   │   └── DO_system_prompt.md            ← Chargé par /do et /analyze
│   ├── context/
│   │   ├── client_vision.md               ← [À REMPLIR] Vision, JTBD, contraintes
│   │   ├── roadmap.md                     ← [À REMPLIR] Features, KPIs, sprint en cours
│   │   └── design_guide.md               ← [À REMPLIR] Tokens, composants, anti-patterns
│   ├── docs/
│   │   ├── stack-schema.html              ← Schéma visuel de la stack
│   │   ├── system-map.html                ← Carte du système agentique
│   │   └── workflow-jo-bob-do.mermaid     ← Diagramme workflow
│   ├── adr/
│   │   ├── ADR_INDEX.md                   ← Registre des décisions actives (lu par tous)
│   │   └── ADR_TEMPLATE.md               ← Template à copier pour chaque décision
│   ├── learnings/
│   │   ├── LEARNINGS_INDEX.md             ← Index des learnings DO (lu par JO)
│   │   └── LEARNING_TEMPLATE.md           ← Template DO pour écrire les learnings
│   ├── specs/
│   │   ├── active/                        ← Spec en cours (0–1 à la fois)
│   │   ├── backlog/
│   │   ├── shipped/
│   │   ├── dropped/
│   │   └── feature_template.md           ← Template spec Gherkin + gate INVEST
│   ├── resources/
│   │   └── visual_reference.md            ← 15 pairings typo + 9 palettes
│   └── sessions/                          ← Checkpoints BOB (exclu du git)
│
├── agent-stack-template/                  ← Template générique réutilisable
│   ├── setup.sh                           ← Wizard d'installation one-command
│   └── ...                               ← Structure miroir sans contenu projet
│
├── app/                                   ← Next.js App Router
├── components/
│   └── ui/                               ← Read-only — Shadcn owns it
├── lib/
└── public/
```

---

## Principes d'architecture

### OS-light
`CLAUDE.md` ne contient que les contraintes invariantes (~150 tokens). Tout le reste — logique agents, workflows, esthétique — est dans des fichiers chargés à la demande. Le contexte d'une session de 20 tours économise ~25 000 tokens vs un setup classique.

### Séparation OS / Apps
Les commandes slash (`.claude/commands/`) sont de simples loaders : elles chargent le system prompt de l'agent concerné (`agent-system/agents/`). La logique vit dans les system prompts, pas dans l'OS.

### Mémoire longue via learnings
DO écrit un fichier de learnings après chaque évaluation. JO lit les 3 plus récents avant de générer chaque spec. Les ambiguïtés récurrentes, les anti-patterns détectés et les signaux CX remontent automatiquement dans les prochaines specs — sans intervention manuelle.

### ADR System
Les Architecture Decision Records (`agent-system/adr/`) empêchent BOB de contredire en session 5 une décision prise en session 1. JO crée un ADR pour toute décision structurante. DO le vérifie à chaque évaluation.

### BOB Gate
BOB ne code jamais sans un brief esthétique validé. Ce gate prend 2 minutes et évite 30 à 60 minutes de rework. Il est non négociable — BOB refusera si tu essaies de le sauter.

---

## Configuration post-clone

### 1. Remplis les 3 fichiers de contexte (priorité absolue)

**`agent-system/context/client_vision.md`**
→ Vision produit, personas, JTBD, contraintes connues. JO refuse de spécer sans ce fichier.

**`agent-system/context/roadmap.md`**
→ Features in/out-of-scope, KPIs, sprint en cours.

**`agent-system/context/design_guide.md`**
→ Direction esthétique, tokens CSS, composants Shadcn autorisés, anti-patterns visuels. BOB et DO lisent ce fichier à chaque session.

### 2. Figma MCP

`figma-console-mcp` est pré-installé en devDependency. Configure uniquement le token :

Crée `.mcp.json` (déjà dans `.gitignore`, ne jamais commiter) :
```json
{
  "mcpServers": {
    "figma-console": {
      "command": "node",
      "args": ["./node_modules/figma-console-mcp/dist/local.js"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "TON_TOKEN_ICI",
        "ENABLE_MCP_APPS": "true"
      }
    }
  }
}
```

### 3. Ruptures de compatibilité connues

Next.js 16 + React 19 ont des APIs différentes de la plupart des training data de LLMs. BOB consulte la doc locale (`node_modules/next/dist/docs/`) avant d'écrire du code. Tailwind 4 utilise une config via CSS — pas de `tailwind.config.js`.

---

## Générique vs. projet-spécifique

| Fichier | Générique | Projet-spécifique |
|---|---|---|
| `CLAUDE.md` | Structure | Nom du projet, stack si différente |
| `.claude/commands/*.md` | ✅ Tout | Rien |
| `.claude/skills/frontend-design/SKILL.md` | ✅ Tout | Rien |
| `agent-system/agents/*.md` | ✅ Tout | Rien |
| `client_vision.md` | Structure | Tout le contenu |
| `roadmap.md` | Structure | Contenu + sprint en cours |
| `design_guide.md` | Structure | Tokens, stack UI, décisions |
| `visual_reference.md` | 15 pairings + 9 palettes | Tes ajouts custom |
| `adr/ADR_INDEX.md` | Structure | Décisions du projet |
| `adr/ADR_TEMPLATE.md` | ✅ Tout | Rien |
| `feature_template.md` | ✅ Tout | Rien |
| `LEARNING_TEMPLATE.md` | ✅ Tout | Rien |

---

## Notes importantes

- **Premier run** : JO demandera que `client_vision.md` et `roadmap.md` soient remplis avant de générer quoi que ce soit. C'est voulu.
- **Le BOB gate est non négociable** : si tu dis "skip le brief", BOB refusera.
- **Les learnings s'accumulent** : plus tu utilises le système, plus JO anticipe les problèmes de spec.
- **`sessions/`** est exclu du git — éphémère par design. DO archive les learnings, pas les sessions.
- **`AGENTS.md`** définit le scope du sprint en cours, les limites d'autonomie par agent, et les conventions de commits.
- **`agent-stack-template/`** est le template générique réutilisable — c'est ce que tu clones pour un nouveau projet.

---

## Contributors

| | Rôle |
|---|---|
| [@aminelamine](https://linkedin.com/in/lamine-amine) | Product Designer · Architecture · Direction artistique |
| [Claude](https://anthropic.com/claude) (Anthropic) | AI pair programming · Génération de code · Specs |

---

*Conçu et validé par [@aminelamine](https://linkedin.com/in/lamine-amine) — Product Designer, AI workflows.*
