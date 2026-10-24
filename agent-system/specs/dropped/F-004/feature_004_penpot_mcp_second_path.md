---
feature_id: F-004
feature_name: Support MCP Penpot officiel — second chemin de premier rang dans design-workflow
tier: T3
epic: aucun — module epic non installé (STACK.md `modules.epic: false`), pas de parent requis
status: VALIDATED
date: 2026-09-14
motion_level: N/A
motion_note: Zéro surface visuelle du produit portfolio — feature outillage/skill. `quality_brief_type`
  effectif = `architecture` (déjà tranché au brief, `STACK.md` ne surcharge pas par feature).
  Aucun gate esthétique ne s'applique ; ne pas fabriquer de valeur L0–L3 pour remplir le champ.
---

## Contexte

> Direction brief approuvé — gate ① franchi : `agent-system/sessions/brief_feature_F-004.md`.

Un designer qui travaille sous Penpot plutôt que Figma ne peut aujourd'hui suivre le cycle
spec → design → review de `design-workflow` qu'en redécouvrant `execute_code` et l'API `penpot.*`
à chaque session — le skill ne connaît qu'un backend. Penpot devient un **second chemin de premier
rang** (parallèle, pas un fallback dégradé) : sa propre recette documentée, un vocabulaire de
snippets nommés et stables, un écart nommé partout où la parité avec Figma n'existe pas plutôt
qu'une fausse équivalence.

**Les 3 mots du brief, qui gouvernent chaque CA ci-dessous** : `Parallèle` (aucune branche Figma
ne se dégrade) · `Vocabulaire propre` (jamais un déguisement en pseudo-tool Figma) · `Écart nommé`
(un gap documenté vaut mieux qu'une fausse parité).

## User stories

**Story 1 — Détection explicite du backend actif (STEP 0) :**
```gherkin
Given un .mcp.json qui déclare à la fois figma-console-mcp et le MCP Penpot officiel
When l'utilisateur déclenche une requête design-related (STEP 0 d'onboarding.md)
Then le skill pose explicitement la question du backend actif
  And aucune branche n'est engagée sur la base du "premier tool qui répond"
```

**Story 2 — Précondition Penpot traduite en message actionnable :**
```gherkin
Given le backend actif est Penpot et le plugin n'est pas connecté au fichier ouvert
When le premier appel de précondition (`high_level_overview` ou `execute_code` minimal) échoue
  avec "No Penpot instance connected for user token."
Then le skill traduit l'échec en message bloquant équivalent à la ligne Figma existante
  And le message nomme l'action de récupération exacte : ouvrir le fichier Penpot puis
    MCP Server → Connect depuis le menu du fichier
```

**Story 3 — Recette design/review Penpot nommée, sans fausse parité :**
```gherkin
Given le backend actif est Penpot et la précondition (Story 2) est passée
When `actions/design.md` ou `actions/review.md` s'exécute
Then chaque étape utilise un snippet `execute_code` nommé documenté dans
  `references/penpot-api-rules.md`, jamais un `execute_code` improvisé en session
  And toute étape sans équivalent Penpot direct affiche le gap documenté plutôt que de
    prétendre un contrat identique à un tool Figma typé
```

**Story N — Edge case : zéro régression sur le chemin Figma seul :**
```gherkin
Given un utilisateur qui n'a jamais configuré le MCP Penpot officiel
When il suit le cycle design-workflow comme avant cette feature
Then onboarding.md, actions/design.md et actions/review.md se comportent à l'identique
  And aucun step, aucune ligne de Block Messages Reference, aucun heading Figma existant
    n'a été renommé, réordonné ou supprimé
```

## Acceptance criteria

| ID | Criterion | Story ref | Notes |
|---|---|---|---|
| CA-1 | `onboarding.md` STEP 0 contient une branche explicite de détection de backend : si figma-console-mcp ET le MCP Penpot officiel sont tous deux déclarés/disponibles, le flux pose la question à l'utilisateur au lieu de choisir implicitement | Story 1 | ferme le risque "premier tool qui répond" nommé au brief |
| CA-2 | Si un seul des deux MCP est disponible, STEP 0 engage directement la branche correspondante — aucune question posée quand il n'y a pas d'ambiguïté | Story 1 | |
| CA-3 | La précondition Penpot (`high_level_overview` ou `execute_code` minimal) est le premier appel de toute branche Penpot, avant toute autre action | Story 2 | miroir de `figma_get_status()` en 0a |
| CA-4 | Le message `"No Penpot instance connected for user token."` est intercepté et remplacé par un message bloquant nommant l'action exacte : ouvrir le fichier Penpot → MCP Server → Connect (menu du fichier) | Story 2 | équivalent structurel de la ligne Figma "Desktop is not connected..." |
| CA-5 | Le tableau `Block Messages Reference` d'`onboarding.md` gagne deux lignes Penpot (MCP non configuré / non connecté), même format `Situation \| Message` que les lignes Figma existantes | Story 2 | |
| CA-6 | `references/penpot-api-rules.md` existe, chemin canonique `pds-stack-cli/templates/core/tools/claude/.claude/skills/design-workflow/references/` | Story 3 | |
| CA-7 | `references/penpot-api-rules.md` ne nomme que les 4 tools Penpot réels — `high_level_overview`, `penpot_api_info`, `execute_code`, `export_shape` — zéro tool inventé | Story 3 | contrainte brief §6, non négociable |
| CA-8 | La table de parité des 7 lignes du brief §5 (6 tools Figma + la capacité `generateStyle`/`generateMarkup` ajoutée côté Penpot) ouvre `references/penpot-api-rules.md`, reproduite avec son statut exact (recette / gap / capacité ajoutée) | Story 3 | le lecteur Penpot-only voit la frontière honnête avant tout snippet |
| CA-9 | `references/penpot-api-rules.md` documente explicitement l'objet `storage` : ce qui y vit d'un appel à l'autre (cache `tokenOverview`/`shapeStructure`), et sa portée exacte — session du plugin ouvert, pas un backend persistant keyé par feature ou utilisateur | Story 3 | contrainte brief §4 — ne jamais présenter `storage` comme un contrat équivalent aux tools Figma typés |
| CA-10 | `references/penpot-api-rules.md` inclut des snippets nommés et stables construits sur les helpers `penpotUtils` (`getPages`, `shapeStructure`, `findShapes`, `findShapeById`, `tokenOverview`, `analyzeDescendants`) pour au moins les 3 lignes "recette à construire" de la table de parité (design system kit, variables/tokens, styles) | Story 3 | pas de `execute_code` brut réinventé à chaque session |
| CA-11 | `references/penpot-api-rules.md` suit la structure de `references/figma-api-rules.md` (règles numérotées, blocs WRONG/CORRECT là où un vrai piège existe, boilerplate de script en fin de fichier) sans copier sa densité de 22 règles | Story 3 | l'API Penpot est généraliste, pas typée — brief §3 |
| CA-12 | `actions/design.md` gagne une branche Penpot au même endroit que la logique Figma existante (section chargement des règles API + section exécution de script), pointant vers `references/penpot-api-rules.md` quand le backend actif est Penpot | Story 3 | |
| CA-13 | `actions/review.md` gagne une branche Penpot équivalente pour les items du checklist qui référencent des tools Figma typés (`figma_get_variables`, `figma_take_screenshot`) — lectures `execute_code` via l'API Penpot à la place | Story 3 | |
| CA-14 | Aucun heading, aucun numéro de step, aucune ligne du tableau `Block Messages Reference` déjà présent pour Figma dans les 3 fichiers touchés n'est renommé, réordonné ou supprimé | Story N | zéro régression, vérifiable par diff structurel additive-only |
| CA-15 | Aucun tool Penpot ou Figma inventé n'apparaît dans les 4 fichiers touchés (3 modifiés + 1 créé) au-delà des 6 tools Figma déjà câblés et des 4 tools Penpot réels | Story N | grep de contrôle sur les 4 fichiers |
| CA-16 | L'import Figma↔Penpot n'est documenté comme capacité dans aucun des 4 fichiers touchés | Story N | non-objectif explicite du brief §5 |
| CA-17 | `.mcp.json` n'est ni créé, ni édité, ni cité avec des valeurs concrètes dans aucun des livrables de cette feature | Story N | reste gitignoré, hors périmètre |
| CA-18 | La copie sous `agent-system/templates/agent-stack-template/` ne porte aucune modification liée à cette feature — diff structurel vide sur ce chemin | Story N | stale et hors périmètre, brief §3 |

## Quantitative success criteria (measurable post-delivery)

| Metric | Baseline | Target | Measurement method |
|---|---|---|---|
| Tools Figma sans statut Penpot documenté (recette/gap/capacité ajoutée) | 6/6 non documentés | 0/6 non documentés | lecture de la table de parité en tête de `penpot-api-rules.md` |
| Lignes/heading Figma-only supprimés ou renommés dans les 3 fichiers touchés | n/a (pré-existant) | 0 | diff structurel avant/après sur `onboarding.md`, `actions/design.md`, `actions/review.md` |
| Occurrences de tool Penpot/Figma inventé dans les 4 fichiers livrés | n/a | 0 | grep des noms de tools contre la liste des 10 réels (6 Figma + 4 Penpot) |

## OUT OF SCOPE

- Import Figma↔Penpot dans un sens ou dans l'autre — aucun chemin symétrique n'existe (le seul
  import Penpot est le format `.penpot`, zip+JSON) ; non-objectif explicite du brief.
- Toute couche d'abstraction multi-MCP masquant les deux vocabulaires derrière une API interne
  commune — sur-ingénierie explicitement refusée par le brief (mode libre n'est pas licence à
  abstraire un second cas d'usage unique).
- Édition de `.mcp.json` — gitignoré, jamais commité, hors périmètre de ce cycle.
- Synchronisation de la copie stale sous `agent-system/templates/agent-stack-template/` — RAY
  tranchera si un ADR de parité miroir type F-001d doit s'ouvrir séparément ; pas l'objet de cette
  feature.
- Génération d'une knowledge-base Penpot équivalente à STEP 0b d'`onboarding.md` (registries JSON
  extraits automatiquement) — Penpot n'a pas d'API d'extraction riche équivalente à
  `figma_get_design_system_kit`/`figma_get_variables`/`figma_get_styles` à ce jour ; les recettes
  `execute_code` de cette feature couvrent la lecture à la demande, pas une extraction batch.
- Édition de `SKILL.md`, `references/quality-gates.md`, `references/actions/spec.md`,
  `references/actions/done.md`, `references/actions/drop.md`, `references/templates/*`,
  `references/knowledge-base/**` — aucun ne porte de logique Figma-spécifique à dédoubler pour
  cette feature.
- Création ou modification du fichier gabarit Penpot « Prototype examples » — il est cité comme
  terrain de test déjà existant pour valider les snippets avant de les figer dans
  `penpot-api-rules.md`, pas un livrable de cette feature.
- Généralisation du pattern de détection à un 3e backend design tool — la branche STEP 0 est
  écrite pour exactement deux backends, pas pour un nombre arbitraire.

## Dependencies

- Aucune dépendance bloquante sur une autre feature active.
- `ADR_INDEX.md` relu — aucune entrée existante ne couvre la détection de backend MCP design ou
  un second backend design tool. Voir `## ADR check` ci-dessous : nouvel ADR recommandé, non créé
  dans ce cycle (hors périmètre confié à RAY pour cette tâche — spec seule).

## ADR check

- [x] `ADR_INDEX.md` reviewed — no conflicts
- [ ] New ADR needed: **yes** — candidat `adr-012-backend-detection-explicite-design-workflow.md`,
  titre proposé : « Détection explicite de backend MCP design (Figma/Penpot), jamais de choix
  implicite ni d'abstraction commune ». Déclencheur : c'est un pattern architectural qui
  contraindra toute session future touchant `design-workflow` — pas une décision d'implémentation
  mineure. **Non créé ici** : cette tâche RAY est bornée à la spec ; l'ADR reste une question
  ouverte pour Le Talent (voir section finale).

## Notes BOB

- Livrable = 4 fichiers markdown, chemin canonique unique :
  `pds-stack-cli/templates/core/tools/claude/.claude/skills/design-workflow/` — ne rien toucher
  sous `agent-system/templates/agent-stack-template/` (CA-18).
- Aucun composant Shadcn, aucune UI, aucun `motion_level` réel — ne pas fabriquer de contenu pour
  ces champs au moment du commit.
- Ordre d'implémentation recommandé (un commit par tâche, `Ref: feature_004`) :
  1. `references/penpot-api-rules.md` — table de parité + section `storage` + snippets nommés
     (CA-6 à CA-11)
  2. `onboarding.md` STEP 0 — branche de détection + lignes Block Messages (CA-1 à CA-5)
  3. `actions/design.md` — branche Penpot pointant vers `penpot-api-rules.md` (CA-12)
  4. `actions/review.md` — branche Penpot équivalente du checklist (CA-13)
  5. Contrôle zéro régression — diff structurel des 3 fichiers Figma-only + grep tools inventés +
     diff vide sur la copie stale (CA-14 à CA-18)
- Avant de figer un snippet comme "recette" dans `penpot-api-rules.md` : le tester sur le fichier
  gabarit Penpot « Prototype examples ». Un snippet non testé documenté comme équivalent à un tool
  Figma serait le mensonge que le brief §6 interdit explicitement.
- Les helpers `penpotUtils` (`getPages`, `shapeStructure`, `findShapes`, `findShapeById`,
  `tokenOverview`, `analyzeDescendants`) sont la base de vocabulaire — ne pas réinventer un accès
  API brut équivalent à chaque snippet.

## Notes ANALYZER

- Conformance : vérifier l'absence de tout tool Penpot/Figma inventé (CA-7, CA-15), le zéro
  régression Figma (CA-14), et que `storage` est documenté sans fausse parité (CA-9).
- Direction : le "vocabulaire propre" est-il tenu dans la prose des 3 fichiers modifiés, pas
  seulement dans la table de parité — ou est-ce que `execute_code` + `storage` finit par être
  présenté comme un pseudo-tool Figma malgré la contrainte du brief ?
- Edge case à vérifier en review : un utilisateur avec les deux MCP configurés mais aucun fichier
  ouvert nulle part — les deux messages de blocage (Figma / Penpot) restent-ils distinguables l'un
  de l'autre, ou se confondent-ils dans la sortie STEP 0 ?
- Signal CX à surveiller : est-ce qu'un designer Penpot qui suit `actions/design.md`/`review.md`
  pour la première fois retrouve, à la relecture, un cycle qui a la même forme que le chemin Figma
  — sans avoir dû lire `figma-api-rules.md` pour comprendre la sienne ?

## Spec history

| Date | Version | Change | By |
|---|---|---|---|
| 2026-09-14 | v0.1 | Initial creation, contre brief F-004 (gate ① approuvé) | RAY |
