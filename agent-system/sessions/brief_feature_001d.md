---
feature_id: F-001d
feature_name: Parité bidirectionnelle des dossiers miroirs
date: 2026-09-08
quality_brief_type: architecture
motion_level: L0
spec: agent-system/specs/active/feature_001d_parite_miroirs.md (VALIDATED, T2)
statut: ✅ APPROUVÉ — Le Talent, 2026-09-08 · Q1 sans deny-list, Q2 renommage accepté
---

# [BOB] ⏸ Quality Brief — F-001d

**Type : `architecture`.** `STACK.md` déclare `quality_brief_type: aesthetic` en global et n'offre
pas de surcharge par feature — limite de config déjà signalée au cycle F-001a. La feature ne touche
aucune surface visuelle (`motion_level: L0`, un fichier de CLI Node, zéro composant, zéro CSS) :
le gate esthétique (`BOB_aesthetic_gate.md`) n'est **pas** rejoué. Direction, typo, palette et
tension n'ont pas d'objet ici. Le brief porte sur les quatre points que la spec met en jeu :
la frontière de la passe, la forme de ce qu'elle retourne, l'origine de l'exemption module,
et le protocole qui prouve CA-5 / CA-6 / CA-8.

---

## 1. Intention en une phrase

La passe 2 cesse d'être une comparaison d'octets sur l'intersection des deux côtés, et devient une
**égalité d'ensembles** sur les 9 paires déclarées : ce qui est dans `templates/` a un jumeau au
dépôt, ce qui est au dépôt atterrit sur une install complète. Le mécanisme change, le périmètre non.

---

## 2. Frontière de la passe miroir

### Ce qu'elle juge

Uniquement à l'intérieur des **9 paires de `MIRRORED`** — pas un dossier de plus (CA-10) :

| Direction | Règle | Verdict |
|---|---|---|
| A — template → dépôt | tout fichier sous le dossier template a un jumeau au même chemin relatif sous le dossier dépôt | exit 1 (CA-1) |
| Drift (inchangé) | les fichiers présents des deux côtés sont byte-identiques | exit 1 |
| B — dépôt → paquet | tout fichier sous le dossier dépôt atterrit **à son propre chemin installé** sur une install maximale (core + 4 modules + 5 surfaces) | exit 1 (CA-3) |
| B — exemption | sauf si ce chemin installé est dans `GENERATED` | pas de problème (CA-4) |

Elle juge **tous les fichiers** que `walk()` retourne, sans filtre d'extension. Une asymétrie sur un
`.toml`, un `.mdc` ou un `.gitkeep` est un défaut d'empaquetage au même titre qu'un `.md` — la passe
de référence, elle, ne regarde que `md|mdc|toml`, mais elle répond à une autre question.

### Ce qu'elle ne juge pas — et le dit

- **Le contenu des fichiers packagés sous `templates/modules/`.** Direction B assure la *présence*
  à l'install, jamais l'égalité d'octets. Les 5 fichiers concernés (`EVE_system_prompt.md`,
  `SHIP_system_prompt.md`, `eve.md`, `ship.md`, `design-workflow.md`) peuvent diverger de leur
  source dépôt sans que rien ne le dise. C'est l'OUT OF SCOPE explicite de la spec : le fermer
  demande 5 paires de plus dans `MIRRORED`, donc un autre cycle. **Trou nommé, pas caché.**
- **Tout ce qui est hors des 9 paires** : `.claude/skills/` (hors périmètre depuis F-001a — et le
  dépôt y porte 3 skills locales sans rapport avec la stack : `newsletter-obsolet`,
  `product-idea-capture`, `social-media-post` ; ajouter la paire ferait rouge immédiatement),
  `agent-system/context/`, les specs, les ADR, `templates/core/hooks/`, `.claude/settings.local.json`.
- **La conformité du fichier packagé à `AGENT_CONTRACT`.** Elle n'est pas revérifiée côté template
  et le contrat n'est **pas dupliqué** : la garantie est transitive — fichier template ⇒ jumeau
  dépôt (A) ⇒ octets égaux (drift) ⇒ `checkAgents()` juge le jumeau ⇒ le packagé vaut le jumeau.
  Une règle générale sur 9 paires plutôt qu'un contrat recopié par dossier.
- **La fidélité de `simulateInstall()` à `install.js`.** Direction B mesure contre un *modèle* des
  règles de copie. Si `install.js` diverge du modèle, la passe reste verte à tort. Ce risque
  préexiste (la passe de référence s'appuie déjà sur ce modèle) ; F-001d ne l'aggrave ni ne le
  ferme, et la ligne verte de CA-9 ne prétend pas le couvrir.

### Le compteur de passes ne bouge pas

Le fix vit dans la fonction existante (`check-parity.js:122–141`), pas dans une 7e passe. `main()`
garde **6** passes : le déclencheur du learning F-001a (« à la 8e passe, un fichier ou un dossier
se re-tranche par ADR ») n'est pas consommé ici. Croissance attendue du fichier : ~25 lignes.

---

## 3. Forme des deux catégories de problèmes

Une seule fonction, une seule boucle sur `MIRRORED`, **deux catégories** retournées ensemble :

```js
// checkDrift() → checkMirror() : la passe ne mesure plus seulement la dérive.
// { drifted: [{ template, source }],            ← inchangé
//   orphans: [{ side, file, expected }] }       ← nouveau
const { drifted, orphans } = checkMirror();
```

- `side: 'template'` → `file` = chemin template, `expected` = chemin du jumeau dépôt **manquant**.
- `side: 'repo'` → `file` = chemin dépôt, `expected` = chemin installé cherché en vain dans `landed`.

Les deux formes portent **les deux chemins**, jamais un seul : CA-2 est une exigence UX, un gate qui
bloque doit dire par où sortir. Le rendu suit la grammaire déjà en place dans `main()` — un titre
rouge compté, une ligne par problème, la ligne `dim` d'explication en dessous, une ligne `Fix:` :

```
  ✗ 2 file(s) exist on one side of a mirrored pair only:

    templates/core/tools/claude/.claude/agents/pds.md
      no twin at .claude/agents/pds.md
    .claude/commands/probe.md
      lands nowhere on a full install — nothing under templates/ installs to this path

  Fix: add the missing twin, or drop the file from the mirrored folder.
```

Le bloc s'imprime **immédiatement après le bloc drift**, dont le libellé reste inchangé : même
passe, deux symptômes, lus au même endroit. Le mot employé pour la catégorie est *orphan*, pas
*missing* — `missing` est déjà pris par la passe de référence et désigne autre chose.

**Ligne de succès (CA-9), chaîne fixée par la spec, recopiée telle quelle :**

```
  ✓ no drift between the repo and the templates, and no file on one side only.
```

Elle remplace la ligne 453 et n'annonce que le périmètre réellement testé — c'est l'anti-pattern
« une ligne verte qui promet plus qu'elle ne vérifie » relevé au verdict F-001a. `orphans.length`
rejoint la condition du bloc vert (l. 449–450) ; le mécanisme de sortie en 1 pour un problème non
`missing` est déjà en place (l. 494), rien à y toucher.

---

## 4. Dérivation de l'exemption — `simulateInstall()`, pas une liste de noms

Le point qui décide de la durée de vie du fix. Aucune liste de fichiers tolérés n'est écrite :

```js
const landed = simulateInstall();                        // installedPath → source template
const prefix = repoRel.replace(/^\.\.\//, '');           // '../.claude/commands' → '.claude/commands'
const installed = path.join(prefix, rel).split(path.sep).join('/');
if (GENERATED.has(installed)) continue;                  // CA-4
if (!landed.has(installed)) orphans.push({ side: 'repo', file: installed, expected: installed });
```

Un fichier dépôt est légitime **parce qu'une règle de copie l'installe**, pas parce que son nom
figure quelque part. C'est ce qui fait passer CA-8 sans toucher `check-parity.js` : un
`templates/modules/discovery/tools/claude/.claude/commands/probe.md` entre dans `landed` par la
boucle `modules/<mod>/tools/<tool>/**` déjà écrite (l. 81–84), donc le `probe.md` dépôt est couvert
le jour où il est packagé. Une liste de noms, elle, périme au module suivant.

`GENERATED` est indexé par **chemin installé** — la même forme de clé que dans `isIgnorable()`.
Un seul jeu de clés pour les deux usages, pas un second vocabulaire.

`simulateInstall()` est appelée depuis `checkMirror()` sans argument (comme `checkSectionAnchors()`
le fait déjà) : ~60 fichiers walkés, sans état, la simplicité de signature vaut plus que l'appel
économisé.

**Vérifié sur l'arbre au 2026-09-08** — la dérivation couvre exactement les 6 dépôt-seul légitimes :
`agent-system/agents/{EVE,SHIP}_system_prompt.md` (modules discovery/delivery),
`.claude/commands/{eve,ship,design-workflow}.md` (modules discovery/delivery/design), et
`.cursor/rules/pds-stack.mdc` (`GENERATED`). Côté template : **zéro** fichier sans jumeau. CA-7 est
donc atteignable en l'état, sans exemption ajoutée.

---

## 5. Décisions d'implémentation à approuver

| # | Décision | Raison |
|---|---|---|
| D1 | `checkDrift()` → `checkMirror()`, retour `{ drifted, orphans }` | le nom doit décrire ce que la passe juge ; `gateFiles()` n'inclut pas `pds-stack-cli/bin/`, la baseline pulse ne bouge pas |
| D2 | Un seul site d'appel dans `main()` | le compteur reste à 6 passes |
| D3 | Bloc orphans juste après le bloc drift, libellé drift inchangé | zéro churn sur du texte qui marche |
| D4 | Aucun deny-list de bruit filesystem (`.DS_Store`, `Thumbs.db`) | la spec tranche déjà : « si la passe signale un 7e, c'est un vrai défaut, pas une exemption à ajouter » |
| D5 | `MIRRORED` non modifiée, 9 paires | CA-10 — le scope est le mécanisme, pas l'élargissement |

**Risque assumé par D4 :** un `.DS_Store` déposé par macOS dans `.claude/commands/` ferait sortir la
passe en 1 sur un fichier gitignoré, donc invisible au `git status`. L'arbre est propre aujourd'hui
(vérifié). Le message nommant le chemin exact, le diagnostic reste court. → **Question Q1.**

---

## 6. Protocole de mutation — la preuve

Le harnais de test **est** le sujet testé (`npm test` = `node bin/check-parity.js`). Aucun runner
installé, aucun `.check.ts` : les 11 CA sont décidables par exécution de la commande, et les
mutations sont l'unité de preuve. *Une assertion verte sans mutation associée ne prouve rien*
(learning F-001a).

**Règle d'assertion — non négociable :** chaque mutation vérifie le **code de sortie ET la ligne du
bon bloc**. Un `exit 1` ne prouve rien tant qu'on n'a pas montré que c'est la passe miroir qui a
parlé — c'est précisément le défaut F-001a qu'on referme.

**Piège de contamination, nommé avant de commencer :** la mutation dépôt-seul (M2) se pose dans
`.claude/commands/`, **jamais** dans `.claude/agents/`, où `checkAgents()` sortirait en 1 pour
« not one of the four » et masquerait le silence de la passe miroir. M1 pose son fichier côté
template `.claude/agents/` — `checkAgents()` ne lit que le dépôt, il doit donc rester muet.

| # | CA | Mutation | Attendu |
|---|---|---|---|
| M0 | CA-7, CA-9 | aucune, arbre propre | exit 0 · ligne CA-9 exacte · aucun des 6 dépôt-seul nommé |
| M1 | CA-1, CA-2, CA-5 | créer `templates/core/tools/claude/.claude/agents/pds.md` avec `tools: Read, Edit, Bash`, rien côté dépôt | exit 1 · bloc orphans · nomme `…/agents/pds.md` **et** `.claude/agents/pds.md` |
| M2 | CA-3, CA-6 | créer `.claude/commands/probe.md` seul | exit 1 · bloc orphans · nomme `.claude/commands/probe.md` |
| M3 | CA-8 | ajouter `templates/modules/discovery/tools/claude/.claude/commands/probe.md` **et** `.claude/commands/probe.md` | exit 0 · aucun problème sur `probe.md` · `check-parity.js` non modifié entre M2 et M3 |
| M4 | CA-4 | retirer temporairement `.cursor/rules/pds-stack.mdc` de `GENERATED` | exit 1 nommant `pds-stack.mdc` — prouve que l'exemption est vivante, pas du code mort |
| M5 | CA-11 | après défaisage : `git status --porcelain` + relance | exit 0 · aucun fichier de contrôle dans l'arbre |

Chaque mutation est **défaite immédiatement après sa capture**, et l'exit 0 est re-constaté avant
de passer à la suivante. CA-10 se lit sur le diff : `git diff -U0 pds-stack-cli/bin/check-parity.js`
ne touche aucune ligne de la constante `MIRRORED`.

**Matrice de preuve à livrer** (format §3b, sorties réelles collées — jamais « believed OK ») :

```
[BOB] 🔬 Proof — feature_001d
  CA-1  fichier template sans jumeau → exit 1                    (M1)
  CA-2  le message nomme template + jumeau attendu               (M1)
  CA-3  fichier dépôt qui n'atterrit pas → exit 1                (M2)
  CA-4  GENERATED exempte, et l'exemption mord                   (M0 + M4)
  CA-5  pds.md tools: Read, Edit, Bash → exit 1, nommé           (M1)
  CA-6  contrôle négatif direction B                             (M2)
  CA-7  arbre non modifié → 0, aucun des 6 signalés              (M0)
  CA-8  paire module des deux côtés → 0, sans éditer le script   (M3)
  CA-9  chaîne de succès exacte                                  (M0, grep littéral)
  CA-10 MIRRORED : 9 paires, diff vide                           (git diff)
  CA-11 arbre propre au commit                                   (M5)
```

Aucun CA n'est `unproven` : la feature n'a pas de surface décidable à l'œil.

---

## 7. Ordre des commits

Le learning F-001a est explicite — `git checkout <premier commit de code>` doit donner du code dont
la spec existe.

1. `docs(feature_001d)` — la spec + la ligne roadmap, **avant** toute ligne de code.
2. `feat(feature_001d)` — `checkMirror()`, deux directions, exemption dérivée + ligne CA-9.
   `Ref: feature_001d | spec:CA-1,CA-2,CA-3,CA-4,CA-9,CA-10`
3. Rien d'autre dans ce commit. Tout housekeeping éventuel part en `chore:` séparé — le trailer doit
   décrire le diff, pas une intention.

`--accept-pulse` n'est **pas** lancé (`gateFiles()` n'inclut pas `pds-stack-cli/bin/`, la baseline
ne doit pas bouger).

---

## 8. Questions au Talent

- **Q1 — bruit filesystem.** Je pars sans deny-list (D4) : un `.DS_Store` dans un dossier miroir
  fera rouge. Alternative : ignorer 2 noms connus. **Ma reco : sans deny-list**, conforme à la spec.
- **Q2 — renommage.** `checkDrift()` → `checkMirror()` (D1). Purement interne, hors baseline pulse.
  **Ma reco : oui.** Si tu préfères zéro renommage, je garde `checkDrift()` et le retour élargi.

---

## 9. Contraintes tenues

`MIRRORED` inchangée · pas de 7e passe · pas de `AGENT_CONTRACT` dupliqué · pas de liste de noms
exemptés · pas de `--accept-pulse` · pas de découpage de `check-parity.js` · aucun des 4 fichiers
d'agent, `tools:` ou slash-command touché · `.claude/skills/` hors périmètre · F-001b et F-001c
non entamées.

**[BOB] ⏸ En attente de validation. Aucune ligne de code avant approbation explicite.**
