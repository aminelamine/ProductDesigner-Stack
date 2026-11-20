# ADR-021 — Shell front : un core unique `@pds/core` sur le Claude Agent SDK, plusieurs shells

**Date :** 2026-10-24
**Statut :** 🟡 PROPOSED
**Décideurs :** Le Talent (+ RAY pour l'analyse)
**Agents concernés :** Tous
**Remplace :** ADR-019 (Paraphe — contrat hook `Stop` → socket)

---

## Contexte

PDS n'existe que dans le terminal : il faut savoir lancer `/pds`, lire les gates et taper la
décision. Le 2026-10-24, le Talent pivote vers une interface front qui rend le cycle
DIRECTION → CADRE → PRODUIRE → JUGER visible et cliquable, et choisit le **modèle A** : le designer
branche *son* Claude et choisit *un dossier local* qui porte le contexte métier (`memory/`,
`identity.md` via la genèse). Rien n'est hébergé.

L'ADR-019 reposait sur un point **non prouvé** : qu'un hook `Stop` puisse rendre une décision
humaine comme reprise de tour. Le reverse engineering de Claude.app (REA, artefact livré,
evidence `ev_2f4d6e16…` · `ev_303e589d…`) montre une autre voie, déjà en production : l'app pilote
le **même moteur que la CLI** via `claude-agent-sdk` en `stream-json`, renvoie chaque action
sensible à l'UI par `canUseTool`, et expose **ses propres outils MCP** à l'agent. L'UI n'ajoute
aucune intelligence : elle rend un flux d'événements et répond à des demandes d'approbation.

---

## Décision

**Nous adoptons un core unique, `@pds/core`, qui enveloppe le Claude Agent SDK et reste
file-based ; chaque interface est un shell mince au-dessus de lui.**

```
@pds/core  (Node, @anthropic-ai/claude-agent-sdk)
  ├─ lit / écrit memory/ · agent-system/specs/ · STACK.md   ← seule source de vérité
  ├─ parseState()  → un état lisible unique (features, phase, gate ouvert, verdicts)
  ├─ serveur MCP in-process « pds » : request_gate · set_phase · show_proto
  └─ émet un flux typé : message · tool · gate · artifact · phase
shells :  CLI (existe, inchangée) · `npx pds-stack ui` → Next.js localhost (v1)
          · desktop Electron/Tauri (v2) · web hébergé (v3, hors cadre)
```

1. **Gates = `request_gate` + `canUseTool`.** L'agent appelle `request_gate({ feature, gate, artefact, voie })` ;
   le core suspend l'appel et le shell affiche une carte à deux décisions au vocabulaire du gate
   (`approuver|ajuster` · `figer|renvoyer` · `retenue|refusée`). La réponse revient comme résultat
   d'outil. Aucune option « toujours », aucun lot : un appel = un gate = un clic.
2. **Même stack que la CLI.** Le core charge les réglages projet (`settingSources: ['project']`) :
   `CLAUDE.md`, `.claude/agents/`, skills et hooks sont ceux du terminal. Aucun prompt d'agent n'est
   dupliqué dans le shell.
3. **File-based.** Le shell ne garde aucun état propre : il relit les fichiers. Une feature lancée
   depuis l'UI se continue dans la CLI, et l'inverse.
4. **Modèle A.** Le Claude du designer, sur sa machine, dans le dossier qu'il a choisi. Aucun
   serveur PDS, aucun compte PDS, aucune télémétrie. v1 sur Claude seul.
5. **Distribution.** `npx pds-stack ui` dans le paquet `pds-stack` existant (`pds-stack-cli/`) —
   aucun nouveau canal.

**À corriger avant `parseState()`** (constat du plan) : `status:` vs `statut:`, `approuvée` vs la
regex `APPROUV` sensible à la casse dans `scripts/gate-guard.mjs`, scores `/20` écrits en prose.
Le core normalise à la lecture ; il ne réécrit pas l'historique.

> **Non prouvé — à vérifier en premier, avant tout code d'interface :**
> **l'authentification.** La doc de l'Agent SDK demande une clé API (ou Bedrock / Vertex) et
> n'autorise pas, sauf accord, qu'un produit tiers propose la connexion claude.ai. « Brancher son
> Claude par login » n'est donc **pas acquis** pour un paquet distribué. v1 part sur la clé API du
> designer, stockée localement ; la voie login est une question ouverte, pas une hypothèse de build.

---

## Alternatives considérées

| Alternative | Raison de rejet |
|---|---|
| **ADR-019 : hook `Stop` → socket local → cockpit** | Repose sur une reprise de tour par hook jamais prouvée ; le SDK donne la suspension native (`canUseTool`, outil MCP qui attend). Le contrat `{feature, gate, artefact, voie} → {decision}` est conservé, son transport change. |
| **Second produit : une app avec ses propres prompts et son état** | Deux moteurs à maintenir, divergence CLI/UI garantie ; contredit « l'UI est un shell, pas un second produit ». |
| **Piloter la CLI `claude -p` en sous-processus et parser sa sortie** | C'est ce que le SDK fait déjà, avec des types et `canUseTool` en plus ; le parsing maison serait fragile. |
| **Web hébergé dès la v1** | Exige sandbox, auth et stockage par utilisateur ; hors modèle A. Reporté en v3. |

---

## Conséquences

### ✅ Bénéfices attendus
- Une seule intelligence : la CLI et l'UI lancent les mêmes agents sur les mêmes fichiers.
- Les gates ①②③ deviennent des cartes d'approbation sans hook non prouvé.
- Le passage desktop (v2) réutilise le core tel quel : seul le shell change.

### ⚠️ Contraintes acceptées
- Dépendance à `@anthropic-ai/claude-agent-sdk` : sa version est épinglée et suivie.
- L'auth par login claude.ai reste ouverte (voir « Non prouvé ») ; tant qu'elle l'est, v1 = clé API.
- Le desktop (v2) coûte un packaging durci (Claude.app : fuses RunAsNode off, intégrité ASAR) — à
  budgéter alors, pas maintenant.
- Le shell localhost expose une page qui relaie des décisions : écoute sur `127.0.0.1` seulement,
  jeton de session local, aucun CORS ouvert.
- La direction 004 (encoche) n'est plus le premier client ; elle reste une direction retenue, et
  l'encoche native redevient une question de shell v2.

### 🔗 Impact sur les agents
- **RAY** : le cadre de la v1 (gate ②) porte `## HORS SCOPE` = desktop, web hébergé, multi-utilisateur,
  autres modèles. Une décision = un gate = un appel `request_gate`.
- **BOB** : aucun prompt, aucune règle de gate ni état dans le shell — tout passe par le core. Jamais
  d'option « toujours » ni d'approbation en lot. `/components/ui/` reste en lecture seule (ADR-001).
- **ANALYZER** : rejet si le shell détient un état que les fichiers n'ont pas, si une action de la CLI
  et de l'UI diverge sur la même feature, ou si un gate se franchit sans clic.

---

## ADRs liés

- Remplace : ADR-019 — Paraphe, contrat hook → socket (le contrat survit, le transport change)
- Dépend de : ADR-001 (Shadcn seul) · ADR-006 (Next.js App Router) · ADR-008 (agents isolés) · ADR-020 (gates mécaniques, 3 directions à ①)
- Conditionne : le cadre v1 `npx pds-stack ui` · un futur ADR shell desktop (Electron vs Tauri) · un futur ADR auth

---

## Révision

**Condition de révision :** l'Agent SDK ne permet pas de suspendre un appel d'outil le temps d'un
clic humain, ou l'auth du modèle A s'avère impossible sans hébergement.

**Date ou milestone suggéré :** après le premier cycle `/pds` tranché depuis `npx pds-stack ui`.
