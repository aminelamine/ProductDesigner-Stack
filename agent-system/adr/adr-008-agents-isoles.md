# ADR-008 — RAY, BOB et ANALYZER comme agents isolés

| | |
|---|---|
| **Statut** | ✅ **ACCEPTED** — question ouverte tranchée par Le Talent (Option A) |
| **Domaine** | Architecture / Orchestration |
| **Date** | 2026-08-28 · accepté le 2026-08-29 |
| **Auteur** | RAY, cycle F-001 |

---

## Contexte

Aujourd'hui `/ray`, `/bob` et `/analyzer` sont des slash-commands qui chargent un system prompt
**dans la conversation en cours**. Il n'existe aucun `.claude/agents/`, aucun sous-agent, aucune
isolation de contexte. La séparation des rôles — la propriété que `SCORING.md` note 20/20 sur l'axe
« Role fidelity » — est donc **conventionnelle, pas architecturale**.

Conséquence mesurable : ANALYZER voit le raisonnement de BOB, pas seulement sa sortie. Il ne juge
pas un travail extérieur, il juge son propre travail récent avec un autre chapeau. Que le run 1 ait
malgré tout attrapé un défaut auto-validé par BOB est un bon signe — mais obtenu *malgré* le
contexte partagé, pas grâce à une isolation.

C'est le dernier gate de la stack qui tient par honnêteté. Les cinq runs pulse ont fermé tous les
autres (spec gate, ADR-004, line cap, preuve) en les rendant mécaniques.

Le frontmatter d'un agent Claude Code supporte nativement les quatre couches visées :
`name` · `description` · `tools:` · `skills:` · `hooks:`.

## Décision

Faire de RAY, BOB (scindé) et ANALYZER de vrais agents `.claude/agents/`, avec contexte isolé et
outils restreints, appelant des skills.

### D1 — L'orchestrateur ne devient pas un agent
Un sous-agent part, travaille et rend ; il ne peut pas tenir un checkpoint avec l'humain.
`/pds` reste dans la conversation principale, seul à parler au Talent, et spawn les autres.

### D2 — BOB devient deux fichiers d'agent
`bob-brief` produit un document → ni `Edit` ni `Bash`. `bob-build` implémente → les deux.
Un fichier unique obligerait à donner à l'agent-brief les outils de l'agent-build, et le gate
perdrait sa dent. **Les agents se coupent SUR les gates, jamais à travers.**

### D3 — Les prompts canoniques ne bougent pas
`agent-system/agents/*.md` reste la source unique. `.claude/agents/*.md` sont des loaders d'une
douzaine de lignes portant `tools:` et `skills:`. `check-parity` les couvre déjà.

### D4 — Les slash-commands restent
Sur Claude Code elles deviennent le déclencheur qui spawn l'agent. Les 4 autres surfaces
(Cursor, Gemini CLI, Copilot, Codex) gardent les leurs et perdent seulement l'isolation.
**L'isolation est un bonus d'une surface, pas un fork de l'architecture.**

### D5 — Skills : le mécanisme, pas le catalogue
`quality_brief_type` est le premier point d'extension : `STACK.md` en déclare 4, un seul a un
protocole. On extrait `aesthetic` en skill et on implémente `architecture` — parce que la feature
elle-même en a besoin, n'ayant aucune surface visuelle. `performance` et `content` restent en F-002.

Ne sont **pas** découpés en skills : le Ralph Loop, les conventions de commit. Les runs 1→5 ont
montré que les pires défauts naissent de règles éparpillées entre fichiers qui se contredisent
(F1, F8, F9, F11). On ne multiplie pas cette surface.

## Conséquences

**Positives**
- L'indépendance d'ANALYZER devient architecturale
- `tools:` convertit une consigne en absence de capacité — même mouvement que les hooks git
- Le point d'extension `quality_brief_type` est prouvé, pas déclaré

**Négatives / acceptées**
- `tools:` restreint des **types**, pas des **chemins**. RAY garde `Write` et pourrait
  techniquement écrire un `.tsx`. L'étanchéité réelle passe par `hooks: PostToolUse` — hors
  périmètre, inscrit en LATER dans la roadmap. **Ne pas vendre plus que ce que ça livre.**
- Un sous-agent coûte un aller-retour et perd du contexte parfois utile
- Asymétrie assumée entre Claude Code et les 4 autres surfaces

## Découpage retenu — Option A (tranchée le 2026-08-29)

Le périmètre est un T3 par toute lecture (4 agents, 2 skills, le flow, check-parity, les templates,
5 surfaces). Or la règle de RAY dit « T3 → epic parent requis » et `STACK.md` porte `epic: false`.

**Décision du Talent : Option A.** `modules.epic` reste `false`. F-001 est découpé en trois T2
successifs, chacun livrable et rejouable au pulse :

> **Frontière F-001a / F-001b déplacée le 2026-08-29 (arbitrage Talent).** La lecture initiale
> laissait `bob-build.md` packagé mais inatteignable jusqu'à F-001b — un fichier mort pendant un
> cycle, et un F-001a que le pulse ne peut pas rejouer, ce qui contredit le critère même de
> l'Option A. F-001a porte donc l'**existence** du passage `bob-brief` → humain → `bob-build` ;
> F-001b porte son **protocole**.

| Sous-feature | Périmètre | Dépend de |
|---|---|---|
| `F-001a` | les 4 fichiers d'agent (`ray`, `bob-brief`, `bob-build`, `analyzer`) + `tools:` + les slash-commands qui les spawnent, **y compris le câblage minimal `/bob` → `bob-brief` → main → `bob-build`** | — |
| `F-001b` | le **protocole** de checkpoint agent↔humain dans le flow du conducteur (formulation du gate, reprise, itérations, cas d'échec) | `F-001a` |
| `F-001c` | `quality_brief_type` en skills (`aesthetic` extrait, `architecture` implémenté) | `F-001a` |

**Option B écartée** — activer `modules.epic: true` et spécer un T3 avec parent. Rejetée : elle
allume un module pour une seule feature et rend le tout non rejouable au pulse par morceaux.

> Constat sur la stack, à verser au prochain run : **« T3 sans module epic » n'est prévu nulle
> part.** La règle exige un parent que la config par défaut ne fournit pas. Le découpage en T2
> contourne le trou, il ne le ferme pas — à traiter comme finding de stack, hors périmètre F-001.

## Alternatives écartées

- **Tout collapser en un agent + skills** — l'agent jugerait son propre travail ; le défaut attrapé
  au run 1 deviendrait invisible. La séparation d'autorité est la valeur, pas la modularité.
- **Porter l'isolation sur les 5 surfaces** — aucun équivalent natif ailleurs ; on maintiendrait
  deux architectures en parallèle et la dérive qu'on vient de fermer reviendrait.
