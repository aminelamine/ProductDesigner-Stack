---
feature_id: F-004
feature_name: Support MCP Penpot officiel dans design-workflow (option parallèle à Figma)
date: 2026-09-14
quality_brief_type: architecture
motion_level: N/A — zéro surface visuelle du produit portfolio, feature outillage/skill
spec: (n'existe pas encore — ce brief précède le cadrage RAY, gate ①)
statut: ⏸ en attente d'approbation — Le Talent
---

# [BOB] ⏸ Direction brief — F-004

**Type déclaré : `architecture`.** `STACK.md` fixe `quality_brief_type: aesthetic` en global et
n'offre pas de surcharge par feature — même limite de config déjà signalée par le brief F-001d.
Cette feature ne touche aucune surface visuelle du produit portfolio : c'est un ajout dans
`.claude/skills/design-workflow/` (fichiers `.md` + snippets JS de référence), zéro composant, zéro
CSS, zéro thème. Le gate esthétique (`BOB_aesthetic_gate.md`) n'a pas d'objet ici — Direction/
Typographie/Palette/Tension n'existent pas pour ce périmètre. Le brief porte sur les quatre axes que
`quality_brief_type: architecture` couvre réellement : flux de données, frontières de composants,
gestion d'état, design d'API.

**Lecture mémoire** : `memory/identity.md` gouverne l'identité visuelle du portfolio — sans objet
ici. `memory/directions/INDEX.md` et `memory/decisions/INDEX.md` ne portent aucune entrée sur
Penpot, un second backend design tool, ou une abstraction multi-MCP : **mode libre**, cette
direction *propose*, elle ne se conforme à rien d'existant. Aucune direction `refusée` à respecter.

---

## 1. Intention en une phrase

Penpot devient un **second chemin de premier rang** dans `design-workflow` — pas un contournement
bricolé sur les tools Figma — avec sa propre recette documentée (mapping capacité par capacité,
snippets `execute_code` nommés et stables) pour qu'un designer Penpot suive le même cycle
spec → design → review sans redécouvrir `execute_code` / l'API Penpot à chaque session.

**Les 3 mots** : `Parallèle` (pas fallback) · `Vocabulaire propre` (pas un déguisement en pseudo-tool
Figma) · `Écart nommé` (un gap documenté vaut mieux qu'une fausse parité).

---

## 2. Flux de données (data flow)

- **Détection du backend** — `onboarding.md` STEP 0 doit décider *explicitement* quel MCP est actif
  (figma-console-mcp vs Penpot officiel) avant d'engager une branche. Pas de choix implicite basé
  sur « le premier tool qui répond » : les deux MCP peuvent être configurés simultanément dans un
  même `.mcp.json`, la stack ne doit pas deviner.
- **Précondition Penpot, vérifiée en premier appel** — avant toute action, un appel trivial
  (`high_level_overview` ou un `execute_code` minimal) doit confirmer la connexion. L'échec
  (`"No Penpot instance connected for user token."`) est un signal attendu, pas une erreur brute :
  il doit être traduit en message actionnable équivalent à la ligne Figma existante
  (« Figma Desktop is not connected... ») — précondition utilisateur : ouvrir le fichier Penpot et
  faire *MCP Server → Connect* depuis le menu du fichier.
- **Cycle inchangé dans sa forme** — les mêmes 6 étapes (`onboarding.md`), la même paire
  spec → design → review. Le backend choisi ne réordonne rien, il ne fait que substituer la source
  des données et le mécanisme d'exécution à STEP 0, STEP 4 et STEP 5.

## 3. Frontières de composants (quels fichiers, et où s'arrête chacun)

- **Chemin canonique unique** : `pds-stack-cli/templates/core/tools/claude/.claude/skills/design-workflow/`.
  La copie sous `agent-system/templates/agent-stack-template/` est stale et **hors périmètre de ce
  cycle** — ne pas la synchroniser (RAY tranchera si un ADR de parité miroir type F-001d doit
  s'ouvrir séparément ; ce n'est pas l'objet de cette feature).
- **Un fichier de référence dédié Penpot**, miroir structurel de `references/figma-api-rules.md`
  (candidat : `references/penpot-api-rules.md`) — plutôt que noyer les deux vocabulaires dans un
  seul fichier. `figma-api-rules.md` documente une API riche et typée (22 règles sur des primitives
  concrètes : `setBoundVariable`, `combineAsVariants`, etc.). Le pendant Penpot documente une API
  généraliste (`execute_code` + objet `penpot.*`) : les deux fichiers ne peuvent pas avoir la même
  densité par construction, et ce n'est pas un défaut à corriger.
- **`onboarding.md`, `actions/design.md`, `actions/review.md`** gagnent chacun une branche
  conditionnelle par backend, au même endroit dans le fichier que la logique Figma existante —
  jamais une réécriture générique qui gommerait le vocabulaire des deux (`figma_get_status` n'a pas
  de tool typé équivalent côté Penpot ; le présenter comme tel serait mentir sur la nature du pont).
- **Zéro régression sur le chemin Figma** — aucun fichier ne doit rendre la lecture Figma-only plus
  coûteuse qu'aujourd'hui pour un designer qui n'utilise pas Penpot.

## 4. Gestion d'état (l'équivalent conceptuel, pas de state React)

- Le seul état disponible côté Penpot est l'objet `storage`, persistant entre appels `execute_code`
  dans la session du plugin. Il n'y a pas d'équivalent aux tools Figma qui gardent un contexte côté
  serveur (`figma_get_variables`, `figma_get_styles` sont des lectures sans état côté MCP).
- La doc doit dire explicitement **ce qui vit dans `storage`** d'un appel à l'autre (candidat : cache
  du résultat `tokenOverview` / `shapeStructure` pour éviter de re-parcourir l'arbre à chaque appel)
  et **jusqu'où va cette persistance** — scopée à la session du plugin ouvert, pas un backend keyé
  par feature ou par utilisateur.
- Ne jamais présenter `execute_code` + `storage` comme un contrat équivalent aux tools Figma typés :
  documenter la différence de nature plutôt que la masquer derrière un vocabulaire commun.

## 5. Design d'API (le cœur du brief — table de parité honnête)

Pour chacun des 6 tools Figma câblés en dur, dire soit « recette Penpot équivalente via
`execute_code` + snippet nommé », soit « pas d'équivalent — gap documenté » :

| Tool Figma | Équivalent Penpot | Statut |
|---|---|---|
| `figma_get_status` | probe `execute_code` triviale / `high_level_overview` | recette |
| `figma_get_design_system_kit` | `execute_code` + `penpot.library.local.components` / `.colors` / `.typographies` + `Variants`/`VariantContainer` | recette à construire, pas de tool dédié |
| `figma_get_variables` | `execute_code` + `penpot.library.local.tokens` (TokenCatalog, modèle proche W3C Design Tokens) | recette, modèle de données différent — à ne pas prétendre isomorphe |
| `figma_get_styles` | recouvert par le même `execute_code` que ci-dessus (couleurs/typos vivent dans la même API library) | recette, pas un endpoint séparé côté Penpot |
| `figma_take_screenshot` | `export_shape` (PNG/SVG, shape ou page entière) | recette directe |
| `figma_execute` | `execute_code` | équivalent direct — c'est le socle des deux MCP |
| *(sans tool Figma nommé)* | `penpot.generateStyle()` / `generateMarkup()` — équivalent du panneau Inspect | **capacité ajoutée**, pas un mapping — à cadrer comme tel, pas comme un manque côté Figma |

- Les recettes Penpot doivent s'appuyer sur les helpers `penpotUtils` déjà éprouvés en session
  (`getPages`, `shapeStructure`, `findShapes`, `findShapeById`, `tokenOverview`,
  `analyzeDescendants`) plutôt que réinventer l'accès à l'API brute à chaque session — un vocabulaire
  de snippets nommés et stables, testé sur le fichier gabarit Penpot « Prototype examples ».
- **Non-objectif explicite** : l'import d'un fichier Figma existant vers Penpot (ou l'inverse).
  Aucun chemin symétrique n'existe (le seul import Penpot est le format `.penpot`, zip+JSON) — à
  nommer comme hors scope pour que RAY ne le mette pas au cadrage par erreur.

## 6. Contraintes — ce qui ne doit jamais apparaître

- Ne jamais inventer un nom de tool Penpot qui n'existe pas — seuls les 4 réels :
  `high_level_overview`, `penpot_api_info`, `execute_code`, `export_shape`.
- Ne jamais présenter une recette `execute_code` non testée comme équivalente à un tool Figma sans
  le dire explicitement.
- Ne jamais faire dépendre le flux Figma existant de la présence ou de l'absence de Penpot.
- Ne pas toucher `.mcp.json` (gitignoré, jamais commité) ni la copie stale sous
  `agent-system/templates/agent-stack-template/` dans ce cycle.
- Ne pas coder l'import Figma↔Penpot.
- Ne pas construire une couche d'abstraction qui masquerait les deux vocabulaires derrière une API
  interne commune — ce serait le sur-ingénierie que le produit s'interdit (registres muets = mode
  libre, mais mode libre n'est pas licence à abstraire ce qui n'a pas encore de second cas d'usage).

## 7. Référence

- `references/figma-api-rules.md` — référence structurelle à mirorer stylistiquement pour le
  pendant Penpot (numérotation de règles, blocs WRONG/CORRECT, boilerplate de script en fin de
  fichier), sans copier sa densité qui ne correspond pas à la surface réelle de l'API Penpot.
- Le fichier gabarit Penpot « Prototype examples » — terrain déjà utilisé en session pour valider
  les helpers `penpotUtils` ; à citer comme fichier de test de référence dans la spec à venir.

## 8. Déjà jugé ici

Aucune direction ni décision en mémoire (`directions/INDEX.md`, `decisions/INDEX.md`) ne couvre
Penpot, un second backend design tool, ou une abstraction multi-MCP. Premier brief sur ce sujet.

---

**[BOB] ⏸ En attente de validation. Rien n'est produit avant un accord explicite — le cadrage
(RAY, gate ②) ne s'ouvre qu'après.**
