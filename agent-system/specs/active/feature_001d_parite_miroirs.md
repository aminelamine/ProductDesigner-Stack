---
feature_id: F-001d
feature_name: Parité bidirectionnelle des dossiers miroirs
tier: T2
status: VALIDATED
date: 2026-09-07
motion_level: L0
---

## Context

Objectif produit P2 : *« ce que le dépôt contient est ce que l'install livre »*, mesuré par des passes
de parité vertes à chaque publication. Aujourd'hui la mesure ment dans un sens.

`checkDrift()` (`check-parity.js:122`) saute tout fichier template sans jumeau au dépôt
(`if (!fs.existsSync(twin)) continue;`, ligne 131), au motif qu'il est « checked by the reference
pass ». Le motif est valide pour un fichier **cité** par un autre fichier ; il est faux pour un
fichier **découvert par scan de dossier et cité par personne** — un agent, une commande.
`checkAgents()` et `checkCommands()` ne referment pas le trou : elles lisent `.claude/` du dépôt,
jamais l'arbre packagé.

Reproduction vérifiée (ANALYZER, verdict F-001a, rejouée à la main) : un
`templates/core/tools/claude/.claude/agents/pds.md` portant `tools: Read, Edit, Bash`, sans rien
côté dépôt, laisse `check-parity.js` sortir en **0**, sous la ligne verte « ✓ the four agents carry
the tool boundary their gates are cut on ». Ce 5e agent, non gaté, partirait chez tout utilisateur
de `npx pds-stack install`.

F-001d corrige l'empaquetage et rien d'autre. Elle ne touche ni le flow du conducteur (F-001b) ni
les skills (F-001c).

## User stories

**Story 1 — un fichier déposé d'un seul côté ne passe pas :**
```gherkin
Given un dossier déclaré dans MIRRORED
  And un fichier existe côté templates/ sans jumeau au même chemin relatif côté dépôt
When Le Talent lance node pds-stack-cli/bin/check-parity.js
Then la commande sort en code 1
  And le message nomme le fichier template et le jumeau qui manque
```

**Story 2 — un fichier packagé par un module ne déclenche pas de faux positif :**
```gherkin
Given .claude/commands/eve.md existe au dépôt et est packagé sous templates/modules/discovery/
When Le Talent lance node pds-stack-cli/bin/check-parity.js
Then la commande sort en code 0
  And aucun problème n'est signalé pour eve.md
```

## Acceptance criteria

| ID | Criterion | Notes |
|---|---|---|
| CA-1 | Un fichier sous le dossier **template** d'une paire `MIRRORED`, sans jumeau au même chemin relatif côté dépôt, fait sortir `check-parity.js` en code 1 | ferme le `continue` de la ligne 131 |
| CA-2 | Le message d'échec de CA-1 nomme le chemin du fichier template et le chemin du jumeau attendu | anti-pattern UX : un gate qui bloque sans dire comment en sortir |
| CA-3 | Un fichier sous le dossier **dépôt** d'une paire `MIRRORED` qui n'atterrit pas, à son propre chemin, sur une install complète (core + 4 modules + 5 surfaces) fait sortir en code 1 | direction dépôt → paquet |
| CA-4 | Un fichier listé dans `GENERATED` est exempté de CA-3 | `.cursor/rules/pds-stack.mdc` est écrit par l'installeur, jamais packagé |
| CA-5 | Reproduction du défaut : avec `templates/core/tools/claude/.claude/agents/pds.md` portant `tools: Read, Edit, Bash` et rien côté dépôt, la commande sort en 1 et le message nomme `pds.md` | le contrôle négatif de référence |
| CA-6 | Contrôle négatif direction B : avec un fichier créé côté dépôt seul dans un dossier `MIRRORED`, la commande sort en 1 et le message le nomme | |
| CA-7 | Sur l'arbre non modifié, la commande sort en 0 et ne signale aucun problème sur les 6 fichiers dépôt-seul légitimes listés dans les Notes BOB | c'est le risque de faux positif, il est nommé |
| CA-8 | Ajouter un fichier packagé par un module des deux côtés (`templates/modules/discovery/tools/claude/.claude/commands/probe.md` + `.claude/commands/probe.md`) laisse la commande en 0 **sans modifier `check-parity.js`** | l'exemption est dérivée de `simulateInstall()`, pas listée à la main — sinon elle périme au prochain module |
| CA-9 | La ligne de succès de la passe miroir est exactement : `✓ no drift between the repo and the templates, and no file on one side only.` | la spec fixe la chaîne, pas BOB — et elle n'annonce que le périmètre réellement testé |
| CA-10 | La constante `MIRRORED` contient les mêmes 9 paires qu'avant la feature — aucun ajout, aucun retrait | le scope est le mécanisme, pas l'élargissement du périmètre miroir |
| CA-11 | `node pds-stack-cli/bin/check-parity.js` sort en 0 sur l'arbre final, et aucun fichier de contrôle des CA-5/CA-6/CA-8 ne subsiste dans l'arbre au commit | |

## OUT OF SCOPE

- **La byte-identité des fichiers packagés sous `templates/modules/`** (`EVE_system_prompt.md`,
  `SHIP_system_prompt.md`, `eve.md`, `ship.md`, `design-workflow.md`). CA-3 vérifie leur
  **présence** dans l'install, pas leur **contenu**. Le faire demanderait d'ajouter 5 paires à
  `MIRRORED` : autre fix, autre rayon d'explosion. Trou résiduel nommé, pas caché.
- Ajouter `.claude/skills/` à `MIRRORED` — déjà déclaré hors périmètre en F-001a, inchangé ici.
- Le périmètre « code produit » du hook `commit-msg` (`^(app|src|components|lib|pages)/`, qui ne
  couvre ni `pds-stack-cli/`, ni `.claude/`, ni `templates/`) → candidat ADR, proposé en roadmap
  LATER, pas spécé ici.
- `flow.md`, le protocole de checkpoint, `/bob --build` → **F-001b**.
- Toute modification des 4 fichiers d'agent, de leur `tools:`, ou des slash-commands.
- Découper `check-parity.js` en plusieurs fichiers, et lancer `--accept-pulse`.

## Dependencies

- **F-001a** — livrée 18/20. F-001d corrige le défaut trouvé à son verdict ; elle ne rouvre pas son scope.
- **ADR-008 D3** — « `check-parity` les couvre déjà » : cette feature rend l'affirmation vraie dans les deux sens.
- **Ne bloque pas F-001b ni F-001c** — aucun fichier partagé, cycles indépendants.
- `ADR_INDEX.md` relu : aucun conflit, aucun nouvel ADR requis pour cette feature.

## Notes BOB

- **Le fix vit dans `checkDrift()`** (`check-parity.js:122–141`), pas dans une 7e passe : la passe 2
  devient « parité miroir » et retourne deux catégories de problèmes. Le learning F-001a pose un
  déclencheur — *à la 8e passe, « un fichier ou un dossier de passes » se re-tranche par ADR*. Ne
  pas consommer ce compteur ici. Le nombre de passes appelées dans `main()` reste 6.
- **Direction B, matériel déjà présent** : `simulateInstall()` produit la map des chemins installés ;
  `repoRel.replace(/^\.\.\//, '')` donne le préfixe installé d'un dossier dépôt — le pattern existe
  déjà ligne 134.
- **Ne pas dupliquer `AGENT_CONTRACT` côté template.** La garantie sur le 5e agent est transitive :
  fichier template ⇒ jumeau dépôt existe (CA-1) ⇒ octets égaux (passe drift) ⇒ le jumeau satisfait
  `AGENT_CONTRACT` (`checkAgents`) ⇒ le fichier packagé le satisfait aussi. Une règle générale sur
  les 9 paires vaut mieux qu'un contrat recopié par dossier.
- **État factuel vérifié le 2026-09-07** — les 9 paires portent **zéro** fichier template-seul, et
  exactement **6** fichiers dépôt-seul, tous légitimes :
  `agent-system/agents/EVE_system_prompt.md`, `agent-system/agents/SHIP_system_prompt.md`,
  `.claude/commands/eve.md`, `.claude/commands/ship.md`, `.claude/commands/design-workflow.md`
  (packagés sous `templates/modules/`) et `.cursor/rules/pds-stack.mdc` (`GENERATED`).
  Si la passe en signale un 7e, c'est un vrai défaut à corriger — pas une exemption à ajouter.
- **Preuve (§3b)** : les 11 CA sont décidables par machine. CA-5, CA-6 et CA-8 sont des mutations —
  on les applique, on observe le code de sortie et le message, on les défait. Une assertion verte
  sans mutation associée ne prouve rien (learning F-001a).
- **Ordre des commits** : la spec et la ligne roadmap sont commitées **avant** le premier commit de
  code. `git checkout <premier commit>` doit donner du code dont la spec existe.
- `motion_level: L0`, aucune surface visuelle — `quality_brief_type` effectif = `architecture`.
  Le brief porte sur la frontière de la passe miroir, pas sur une direction esthétique.
- `gateFiles()` n'inclut pas `pds-stack-cli/bin/` : la baseline pulse ne doit pas bouger.
  Ne pas lancer `--accept-pulse`.
