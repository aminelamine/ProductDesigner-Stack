---
feature_id: F-005
feature_name: Paraphe — cockpit local des 3 gates (lot cockpit du compagnon PDS)
tier: T3
epic: aucun — module epic non installé (STACK.md `modules.epic: false`)
status: DRAFT
date: 2026-10-14
lane: standard (passage Sketch → Standard par Le Talent, 2026-10-14)
motion_level: L0
motion_note: CSS seul — transitions ≤ 400 ms `cubic-bezier(.16,1,.3,1)`, `prefers-reduced-motion` → instantané (brief §2 Composition).
---

> [RAY] ⚠ `memory/identity.md` absent — aucun socle produit à respecter au-delà de `CLAUDE.md`.
> Ne bloque pas ce cadre. À créer avant le prochain cycle (`memory/SETUP.md`).

## Contexte & JTBD

> Direction retenue — gate ① franchi : `memory/directions/004-paraphe-guichet-de-signature.md`,
> brief `agent-system/sessions/brief_feature_F-005.md`. Source de structure et d'états :
> `prototypes/005-paraphe-compagnon.html` (vue `#v-cock`, fonctions `pipe()` / `renderCockpit()`).

JTBD P1 (`client_vision.md`) : *« le jugement du designer devient le gate qualité du système »*.
Aujourd'hui, ce qui attend le designer est dispersé entre `state_*.md`, briefs, specs, verdicts et
`memory/directions/`. Le cockpit le rend lisible d'un coup d'œil, au vocabulaire PDS.

**Les 3 mots qui gouvernent chaque CA** : `Muet` · `Un seul acte` · `Signé`.

**Pourquoi le cockpit d'abord, et en lecture seule.** Le cockpit est la seule surface de la
direction 004 qui ne dépend d'aucune décision ouverte : il lit des fichiers que le cycle écrit déjà.
Il ne **tranche pas** de gate dans ce cadre, pour trois raisons :
1. **Le clic n'atteindrait pas l'agent.** Un gate se tranche dans une conversation en pause ; sans le
   mécanisme hook → socket (ADR-019, PROPOSED), écrire `retenue` dans un fichier depuis le navigateur
   laisse l'agent attendre une réponse qui n'arrive jamais — deux vérités divergentes.
2. **Le gate ③ exige un apprentissage écrit** (moitié DESIGN d'abord) : le brief §5.2 a tranché
   qu'il se rédige dans la conversation avec ANALYZER, pas dans un panneau.
3. **Surface d'attaque nulle.** Un serveur local en GET seul ne peut rien écrire dans le repo, même
   appelé par une page tierce ouverte dans le même navigateur.

Le cockpit nomme donc *où* et *comment* trancher (fichier + commande). Le clic qui tranche arrive
avec le mécanisme partagé de l'ADR-019, dans un cadre séparé (voir HORS SCOPE).

## User stories

**Story 1 — Voir ce qui m'attend :**
```gherkin
Given un repo PDS avec un brief F-005 non approuvé et une spec F-006 en `status: DRAFT`
When le designer lance `npx pds-stack ui` à la racine du repo et ouvre l'URL affichée
Then la zone « À trancher » liste 2 entrées : ① DIRECTION · F-005 et ② SCOPE · F-006
  And chaque entrée nomme le fichier à lire et la commande `/pds reprendre <id>`
```

**Story 2 — Lire l'état des features sans confondre score et verdict :**
```gherkin
Given F-004 livrée (20/20, direction retenue) et une feature en voie Sketch
When le designer regarde la zone « Features »
Then F-004 montre `20/20` en mono et `retenue` en serif italique, séparés par un filet vertical
  And la ligne Sketch ne contient aucun élément ②, aucun score, aucune colonne de verdict
```

**Story 3 — Edge case : pas un repo PDS / rien n'attend :**
```gherkin
Given un dossier sans `STACK.md`
When le designer lance `npx pds-stack ui`
Then la commande s'arrête avec un message qui nomme le fichier manquant, sans démarrer de serveur
Given un repo PDS où aucun gate n'est ouvert
When le cockpit s'affiche
Then « À trancher » montre « Rien n'attend. » en serif et aucune couleur accent n'apparaît sur la page
```

## Modèle de lecture — ce que le cockpit lit, et comment il en déduit l'état

Aucune donnée nouvelle n'est créée : tout se déduit des fichiers que le cycle écrit déjà.

| Fichier lu | Champ | Sert à |
|---|---|---|
| `agent-system/sessions/state_<id>.md` | `feature`, `voie`, `phase_suivante` | ligne de feature, voie, phase courante |
| `agent-system/sessions/brief_feature_<id>.md` | `feature_name`, `statut` | nom ; ① franchi si `statut` contient `approuvée`, sinon ① ouvert |
| `agent-system/specs/{active,shipped}/feature_<n>_*.md` | `status` | ② franchi si `VALIDATED`, ouvert si `DRAFT` |
| `agent-system/sessions/verdict_feature_<id>.md` | premier `N/20` | score avant verdict |
| `agent-system/learnings/feature_<n>_learnings.md` | `score` | score d'une feature livrée (prioritaire) |
| `memory/directions/NNN-*.md` (hors README, TEMPLATE, INDEX) | `id`, `nom`, `date`, `verdict`, `surface` ; 1re ligne de « Ce que la prochaine direction doit en retenir » | zone Mémoire ; ③ franchi si `surface` contient l'id de la feature |

- **③ ouvert** = `phase_suivante: JUGER` et aucune direction ne référence la feature.
- **Phase courante** : `PROTOTYPE` et `HANDOFF` s'affichent sur la phase `PRODUIRE`.
- **② présent** si `voie ∈ {standard, system}` ou si une spec existe ; sinon **absent du DOM**.
- **Voie inconnue** (pas de `state_*.md`) : affichée `—`, jamais devinée.
- **Ordre de la file** : l'artefact le plus ancien (mtime) en tête.

## Acceptance criteria

| ID | Critère | Story | Notes |
|---|---|---|---|
| CA-1 | `npx pds-stack ui` démarre un serveur HTTP lié à `127.0.0.1` uniquement, port par défaut 4519, surchargeable par `--port <n>` | 1 | |
| CA-2 | La commande affiche l'URL du cockpit sur une seule ligne en sortie standard | 1 | n'ouvre pas le navigateur |
| CA-3 | `npx pds-stack` sans argument conserve le comportement d'install actuel, octet pour octet sur la sortie des prompts | 1 | zéro régression |
| CA-4 | Lancée dans un dossier sans `STACK.md`, la commande sort en code ≠ 0 avec un message nommant `STACK.md`, sans ouvrir de port | 3 | |
| CA-5 | Port occupé → sortie code ≠ 0, message qui propose `--port` | 3 | |
| CA-6 | Le serveur répond `405` à toute méthode autre que `GET` et `HEAD` | 1 | lecture seule |
| CA-7 | Le serveur répond `403` à toute requête dont l'en-tête `Host` n'est ni `127.0.0.1:<port>` ni `localhost:<port>` | 1 | anti DNS-rebinding |
| CA-8 | Le serveur ne sert que la liste blanche d'assets du cockpit et `/api/state` ; tout autre chemin (dont `../`) renvoie `404` | 1 | aucun fichier du repo servi tel quel |
| CA-9 | `/api/state` renvoie un JSON `{ features, queue, memory, warnings }` déduit selon le tableau « Modèle de lecture » | 1, 2 | |
| CA-10 | Un fichier au frontmatter illisible produit une entrée dans `warnings` (chemin + raison) et n'interrompt pas la lecture des autres | 3 | |
| CA-11 | Aucun fichier du repo n'est créé, modifié ou supprimé par la commande `ui` (diff `git status` vide après une session) | 1 | |
| CA-12 | Le cockpit est une grille en 3 zones dans cet ordre : « À trancher » (~280 px) · « Features » (fluide) · « Mémoire » (~320 px), une colonne sous 1060 px | 1 | proto `.cockpit` |
| CA-13 | Chaque entrée « À trancher » affiche le gate (mono, `①`/`②`/`③` + `DIRECTION`/`SCOPE`/`VERDICT`), l'id et le nom de la feature | 1 | |
| CA-14 | Chaque entrée « À trancher » affiche le chemin de l'artefact à lire et la commande `/pds reprendre <id>` | 1 | |
| CA-15 | Chaque entrée « À trancher » porte au plus un bouton : « Copier la commande » | 1 | aucun bouton qui tranche |
| CA-16 | La ligne d'une feature trace `DIRECTION — ① — CADRE — ② — PRODUIRE — JUGER — ③`, les gates rendus comme charnières rondes entre phases | 2 | proto `pipe()` |
| CA-17 | Une feature dont ② est absent (voir Modèle) ne contient aucun élément ② dans le DOM | 2 | absent, pas grisé |
| CA-18 | Le score est rendu en JetBrains Mono, aligné à droite, et le verdict en Instrument Serif italique, dans deux cellules séparées par un filet vertical `--line-strong` | 2 | |
| CA-19 | Aucune cellule (élément sans enfant élément) ne contient à la fois le score et le verdict, et aucune valeur dérivée des deux (somme, moyenne, jauge, couleur) n'existe | 2 | `CLAUDE.md` |
| CA-20 | Une feature en voie Sketch affiche « voie Sketch · pas de score, pas de spec » à la place des colonnes score/verdict | 2 | |
| CA-21 | Une direction `refusée` s'affiche en `--muted` barrée d'un trait, à la même taille et graisse qu'une `retenue` | 2 | brief §2 Palette |
| CA-22 | `--accent` n'est appliqué qu'aux entrées « À trancher » et aux charnières de gate ouvert | 1, 3 | jamais sur une chose finie |
| CA-23 | Aucune paire vert/rouge, aucune pastille à compteur, aucun dégradé n'est présent dans le CSS du cockpit | 2 | brief §4 |
| CA-24 | État vide : aucune entrée en file → « Rien n'attend. » (serif) + « Tout est tranché. » (mono) | 3 | |
| CA-25 | État erreur : `/api/state` injoignable → le cockpit affiche en mono « Cockpit hors ligne — relancer `npx pds-stack ui` », sans contenu périmé | 3 | |
| CA-26 | `warnings` non vide → une ligne mono `--muted` en pied de page par fichier, chemin compris | 3 | |
| CA-27 | Le cockpit relit `/api/state` au chargement et à chaque retour de focus de la fenêtre, sans polling ni `fs.watch` | 1 | muet |
| CA-28 | Les 3 familles sont servies en woff2 locaux avec leur licence OFL ; zéro URL `http(s)://` externe dans les assets du cockpit | 2 | brief §2 Typo |
| CA-29 | `prefers-reduced-motion: reduce` → durée de transition et d'animation à 0 sur tout le cockpit | 2 | |
| CA-30 | À 375 px de large, aucun défilement horizontal de page (le tracé de pipeline défile dans sa ligne) | 2 | |
| CA-31 | Tous les éléments interactifs sont atteignables au clavier avec un focus visible `outline: 1px solid var(--paper)` | 2 | |

## Quantitative success criteria

| Métrique | Baseline | Cible | Mesure |
|---|---|---|---|
| Endroits à ouvrir pour savoir ce qui attend le designer | 4 dossiers | 1 page | lecture du cockpit sur ce repo |
| Requêtes réseau externes à l'exécution | n/a | 0 | onglet réseau / `playwright-cli` |
| Écritures dans le repo par `pds-stack ui` | n/a | 0 | `git status` avant / après |

## HORS SCOPE

**Jamais (brief §4 — vaut pour ce cadre et les suivants) :**
- Aucun flux d'activité de l'agent : fichiers lus/édités, diffs, appels d'outils, chat, intégrations tierces, musique, voix.
- Aucun « Toujours autoriser », aucune approbation en lot, aucune auto-approbation conditionnelle. Un gate = un acte humain.
- Aucun nombre, jauge ou couleur qui combine `/20` et verdict.
- Aucune paire vert/rouge, aucun dégradé violet (`--accent-2` exclu), aucune pastille rouge à compteur, aucune encoche en verre dépoli.
- Aucun compte, connexion, synchronisation cloud, télémétrie ni appel réseau à l'exécution.
- Le gate ② jamais affiché pour une feature en voie Sketch.
- Rien de l'identité Coucou : nom, Mochi ou créature ronde, sons, icône.

**Reporté — hors de ce cadre :**
- **Trancher un gate depuis le cockpit** (toute écriture : statut de brief, `status` de spec, verdict, `memory/directions/`). Arrive avec le mécanisme hook → socket.
- **Le mécanisme hook → socket local** et **l'encoche** (3 états, personnage Paraphe, sons). Dépendent de l'ADR-019 (PROPOSED). Spécer leurs tâches avant la décision figerait un choix technique non tranché. Un cadre séparé (F-005b) s'ouvre après l'ACCEPTED.
- Les sons Web Audio — appartiennent à l'encoche.
- Le lien « Ajuster » qui ouvre un brief dans le cockpit (vue de lecture d'un fichier) — le chemin affiché suffit en lecture seule.
- Ajout d'un champ `feature:` au `memory/directions/TEMPLATE.md` (la jointure se fait sur `surface`, voir Questions).
- Copie du cockpit dans `pds-stack-cli/templates/` : il vit dans le paquet, jamais installé dans le projet.
- Création de `memory/identity.md`.

## Dependencies

- Aucune feature bloquante. Lit les formats existants de `flow.md` (state), ANALYZER (`verdict_feature_*`), `memory/directions/TEMPLATE.md`.
- ADR-019 (PROPOSED) conditionne les cadres suivants, pas celui-ci.

## ADR check

- [x] `ADR_INDEX.md` relu. ADR-001 (Shadcn) et ADR-006 (Next App Router) concernent le produit Next ; le cockpit est un asset statique du paquet CLI, servi par `node:http`, sans framework ni lib UI. ADR-004 : voir Questions (JS + `// @ts-check`).
- [x] Nouvel ADR : **ADR-019** — fork Coucou vs build vs cockpit seul (PROPOSED, écrit avec ce cadre).
- Aucune dépendance npm ajoutée : `node:http`, `node:fs`, `node:path`, `node:test` seulement.

## Lots

- **Lot 1 — tâches 1–3 · lecteur + serveur** · un `bob-build` neuf, ≤ ~50 tours · vérifiable par `node --test` et `curl`, sans UI.
- **Lot 2 — tâches 4–6 · page cockpit** · un `bob-build` neuf, ≤ ~50 tours · vérifiable par `playwright-cli` + `impeccable`.

### Tâches

1. **Lecteur du repo** — `pds-stack-cli/ui/read-repo.js` (+ `frontmatter.js` si > 150 lignes) : fonction pure `readRepo(root) → { features, queue, memory, warnings }`, règles du « Modèle de lecture ». Fixtures `pds-stack-cli/ui/test/fixtures/` couvrant : Sketch sans ②, Standard ② DRAFT, ③ ouvert avec `verdict_feature`, livrée avec learnings, direction refusée, frontmatter cassé. Tests `node --test`. → CA-9, CA-10, CA-17 et CA-20 (côté données).
2. **Serveur** — `pds-stack-cli/ui/server.js` : `node:http`, `127.0.0.1`, GET/HEAD, liste blanche, contrôle `Host`, `/api/state` appelle `readRepo(process.cwd())`. → CA-1, CA-5 à CA-8, CA-11.
3. **Sous-commande** — `bin/install.js` : dispatch `ui` avant `main()`, contrôle `STACK.md`, `--port` ; `package.json` : `ui` dans `files`, script `test:ui`. → CA-2, CA-3, CA-4.
4. **Page + styles** — `pds-stack-cli/ui/public/index.html`, `cockpit.css` : tokens du brief §2 Palette, 3 zones, échelle 12/14/18/28/44, woff2 + OFL. → CA-12, CA-18, CA-21 à CA-23, CA-28 à CA-31.
5. **Rendu** — `pds-stack-cli/ui/public/cockpit.js` (découpé si > 150 lignes : `render-queue.js`, `render-features.js`, `render-memory.js`) : file, pipeline à charnières, colonnes score/verdict, mémoire, états vide/erreur/warnings, relecture au focus, copie de commande. → CA-13 à CA-17, CA-19, CA-20, CA-24 à CA-27.
6. **Contrôles** — sur ce repo réel : `impeccable detect`, `grep -E 'https?://' ui/public` vide, 375 px, reduced-motion, `git status` inchangé. Tout contrôle non rejouable par ANALYZER est marqué `unproven` + raison (learning F-004). → CA-11, CA-23, CA-28 à CA-30.

## Règles impeccable levées

- aucune levée explicite dans le brief ni dans l'en-tête du prototype.
- **À confirmer au gate ②** : `overused-font` risque de signaler Space Grotesk, que le brief §2 Typographie choisit (« Space Grotesk 500/600 : titres du cockpit uniquement »). S'il est levé, BOB l'annote `/* impeccable: overused-font levée — brief §2 Typographie */`.

## Notes BOB

- Pas de Next, pas de Tailwind, pas de Shadcn : asset statique du paquet CLI. CSS reprend les variables du proto (`--ink`, `--surface`, `--paper`, `--muted`, `--faint`, `--line`, `--line-strong`, `--accent`, `--ease`).
- Fichiers JS en CommonJS comme `bin/` (Node ≥ 18), `// @ts-check` + JSDoc en tête, aucun type `*` ni `any` en JSDoc (voir Questions).
- Plafond 150 lignes **par fichier**, HTML et CSS compris.
- Rendu côté client par `textContent` / `createElement` — jamais `innerHTML` avec une valeur lue dans le repo (titres de feature = entrée non fiable).
- Le proto rend `--accent` sur la charnière `.gt.open` : à garder (CA-22).
- Pas de panneau de démo, pas de données factices dans le livrable : le cockpit lit le vrai repo.
- Commit par tâche : `feat(5): <titre>` + `Ref: feature_005`.

## Notes ANALYZER

- Conformance : CA-17 et CA-19 sont des contrôles DOM, pas visuels — vérifier par sélecteur.
- Lecture seule : CA-6, CA-8, CA-11 sont rejouables en `curl` + `git status`.
- Direction : « Muet » tient-il sur un repo où rien n'attend (page entièrement encre et papier) ?
- Edge case : feature présente seulement dans `learnings/` (livrée avant les `state_*.md`) — voie `—`, pipeline complet, pas de devinette.
- Hors de portée d'ANALYZER : le rendu des polices (outil visuel) — accepter la preuve `playwright-cli` de BOB.

## Questions ouvertes pour Le Talent — gate ②

1. **TypeScript strict vs paquet CLI JS.** `pds-stack-cli/` est en JS sans build. Proposition : JS + `// @ts-check` + JSDoc, sans `tsc` dans le paquet. Alternative : ajouter `typescript` en devDependency et un `tsc --noEmit --checkJs --strict` au `prepublishOnly`.
2. **Jointure direction ↔ feature** par l'id `F-NNN` dans `surface` (fragile mais sans changement de format), ou ajout d'un champ `feature:` au TEMPLATE des directions (+ `memory-index`) ?
3. **Accent dans « Features »** : le brief dit « seule zone qui peut porter l'accent » (À trancher), le proto met l'accent sur la charnière ouverte. La spec suit le proto et la direction 004 (« un gate vous attend »). À confirmer.
4. **Levée `overused-font`** pour Space Grotesk (voir ci-dessus).
5. **Port 4519** par défaut — aucun conflit connu, à changer si vous en préférez un.

## Spec history

| Date | Version | Changement | Par |
|---|---|---|---|
| 2026-10-14 | v0.1 | Création contre la direction 004 et le proto 005 — cockpit lecture seule d'abord | RAY |
