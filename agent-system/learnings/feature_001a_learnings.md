---
feature_id: F-001a
feature_name: Agents isolés — 4 fichiers `.claude/agents/` + `tools:` + spawn
date: 2026-09-07
verdict: SHIPPED
score: 18/20
---

## Patterns qui ont bien marché

- **Le contrôle négatif comme unité de preuve.** BOB n'a pas seulement montré que
  `check-parity.js` sort en 0 — il a cassé l'arbre pour montrer que la passe mord. J'ai rejoué
  9 mutations (Edit donné à `bob-brief`, `tools: *`, 5e agent, cap de lignes dépassé, prompt
  canonique décité, commande qui recharge le prompt, `--build` retiré, §2 réapproprié par
  `bob-build`, dossier supprimé) : les 9 échouent en exit 1 avec un message qui nomme la cause.
  **Une assertion verte sans mutation associée ne prouve rien ; à généraliser à toute la stack.**

- **Couper les agents SUR le gate, jamais à travers (ADR-008 D2).** Le split `bob-brief` /
  `bob-build` transforme « BOB ne doit pas coder avant approbation » en « BOB n'a pas `Edit` ».
  Même mouvement que les hooks git : une consigne devient une absence de capacité. Le pattern est
  réutilisable partout où un gate tient aujourd'hui par honnêteté.

- **Asserter aussi l'anti-pattern, pas seulement la présence.** `checkCommands()` vérifie que la
  commande contient `spawn the **\`ray\`**` ET qu'elle ne contient plus
  `Load and apply, **in full**`. Sans le second test, une commande pourrait spawner l'agent *et*
  recharger le prompt dans la conversation : tous les fichiers présents, tous les hash bons, et
  l'isolation qui n'a pas lieu. **Un test de présence ne détecte pas une régression cumulative.**

- **Traçabilité commit → critère.** Chaque commit porte `Ref: feature_001a | spec:CA-x,CA-y`.
  La chaîne spec → commit → verdict est relisible sans contexte : c'est ce qui m'a permis de juger
  depuis un contexte vide.

- **L'écart hors scope déclaré plutôt que corrigé en douce.** `flow.md` STEP 3 ne connaît pas
  `/bob --build` ; BOB l'a nommé dans le checkpoint et renvoyé à F-001b au lieu de dégeler le
  scope. Comportement exemplaire — le scope gelé tient parce qu'on le déclare, pas parce qu'on
  l'oublie.

## Anti-patterns détectés

- **L'assertion regarde le dépôt, pas l'artefact livré.** `checkAgents()` et `checkCommands()`
  lisent `.claude/` du repo ; `checkDrift()` saute tout fichier template sans jumeau
  (`if (!fs.existsSync(twin)) continue;`, justifié par « checked by the reference pass »).
  Or un fichier d'agent est **découvert par scan de dossier, jamais référencé** — la passe de
  référence ne peut structurellement pas le couvrir. Vérifié en live : un
  `templates/core/tools/claude/.claude/agents/pds.md` portant `tools: Read, Edit, Bash` passe en
  **exit 0**, sous la ligne verte « the four agents carry the tool boundary their gates are cut
  on ». Le 5e agent partirait chez les utilisateurs. *Correction attendue : appliquer
  `AGENT_CONTRACT` aux deux côtés du miroir, ou faire échouer un fichier template sans jumeau
  dans un dossier déclaré MIRRORED.*

- **Une ligne verte qui promet plus que ce qu'elle vérifie.** ADR-008 écrit « Ne pas vendre plus
  que ce que ça livre » à propos de `tools:` — la même exigence vaut pour les messages de
  `check-parity`. Formuler le succès au périmètre réellement testé.

- **Déplacement de fichier non déclaré dans un scope gelé.**
  `specs/active/feature_001_feedback_card.md` → `specs/dropped/` dans le commit 69464c8, sans
  mention dans la spec, l'OUT OF SCOPE ou le checkpoint. Le geste est probablement sain (spec de
  démo de 2026-04 qui squattait l'ID F-001), mais un `feat` étiqueté `spec:CA-1,CA-2,CA-4,CA-5`
  ne doit rien transporter d'autre. *Correction attendue : housekeeping dans son propre commit
  `chore:`, ou une ligne dans « Notable implementation choices ».*

- **La spec commitée après le code qu'elle spécifie.** À 69464c8 (premier commit de code),
  `feature_001a_agents_isoles.md` n'était pas dans l'arbre — il arrive en dernier (cf78b69).
  `git checkout 69464c8` donne des agents dont la spec n'existe pas. Pour une stack dont la thèse
  est la traçabilité, l'historique doit se lire dans l'ordre : **docs RAY commitées avant le
  premier commit BOB.**

- **Ligne de roadmap périmée.** F-001a est resté `[ ] À spécer` alors que la spec était VALIDATED
  et la feature construite. Le tableau NOW est le seul endroit où Le Talent lit l'état — il se
  met à jour au franchissement de chaque gate, pas seulement à la livraison.

## Ambiguïtés de spec à anticiper

- **Les critères « décidables par lecture » n'ont pas de définition de preuve.** La spec dit pour
  CA-5→CA-7 : « une assertion de présence sur la phrase-clé du loader, pas sur son intention ».
  Formulation honnête et bien tenue, mais elle laisse RAY choisir la phrase-clé après coup :
  ici l'assertion cherche `QUALITY BRIEF is not yours`, ce qui fige une formulation anglaise dans
  une regex. Reformulation suggérée : *« CA-x est prouvé par la présence de la chaîne exacte
  "<chaîne>" — la spec fixe la chaîne, pas BOB. »*

- **La parité miroir n'est pas définie comme bidirectionnelle.** CA-8 dit « les 4 fichiers sont
  packagés […] byte-identiques au repo » — repo → template. Rien n'interdit un 5e fichier côté
  template. Formulation suggérée : *« le dossier packagé et le dossier repo contiennent le même
  ensemble de fichiers, byte-identiques — dans les deux sens. »*

- **« Sans régression sur les 4 autres surfaces » (CA-12) ne couvre pas les fichiers de flow.**
  `.cursor/`, `.gemini/`, `.github/prompts/`, `.agents/` sont inchangés — mais `flow.md`, qui
  pilote les 5 surfaces, décrit désormais un `/bob` qui n'existe plus d'une pièce. Une prochaine
  spec qui scinde une commande doit lister explicitement **les documents qui la citent** parmi
  les critères, ou les envoyer en OUT OF SCOPE nommément (pas par catégorie).

## Signaux CX à surveiller

- **JTBD P1 — « un jugement qui ne soit pas le mien » : livré, et vérifiable sur cette évaluation
  même.** J'ai été spawné en contexte vide, je n'ai vu que spec + code + commits, et j'ai trouvé
  un trou (blind spot template) que les 4 contrôles négatifs de BOB ne couvraient pas. C'est la
  Story 1 exécutée en vrai, pas simulée.

- **Friction : le tunnel entre F-001a et F-001b.** Un Talent qui lance `/pds` aujourd'hui arrive
  au gate du Quality Brief, approuve… et `flow.md` lui dit « BOB runs the Ralph Loop » alors que
  `bob-brief` est terminé et que rien ne nomme `/bob --build`. Le conducteur doit improviser au
  moment précis où la stack promet de ne pas improviser. JTBD impacté : *« je veux un système qui
  tient le gate à ma place »*. F-001b est prioritaire — pas seulement « débloquée ».

- **Friction : les deux moitiés de BOB partagent un prompt qui parle des deux.** `bob-brief` et
  `bob-build` chargent `BOB_system_prompt.md` en entier ; seul le loader dit « §2 n'est pas à
  toi ». Ça tient tant que le loader est lu en dernier. À surveiller au prochain run pulse : un
  `bob-build` qui rejoue §2 est exactement le défaut auto-validé que l'isolation doit fermer.

## Décision d'architecture émergente

- **Le garde-fou git est inerte sur ce dépôt.** Le hook `commit-msg` ne détecte le « code
  produit » que via `^(app|src|components|lib|pages)/` + extensions web. `pds-stack-cli/bin/`,
  `.claude/agents/` et `templates/` n'y sont pas : les 7 commits de F-001a n'ont **jamais** été
  gatés, leurs trailers `Ref:` sont volontaires. BOB s'est bien tenu sans contrainte — mais la
  stack se teste elle-même avec un garde-fou qui ne s'applique pas à elle. → **Candidat ADR :
  « le périmètre "code produit" est déclaré dans STACK.md, pas codé en dur dans le hook. »**
  Déclencheur observé : 2e occurrence (déjà relevé implicitement par `hook_exclude`).

- **`tools:` restreint des types, pas des chemins — dette assumée et maintenant datée.** ADR-008
  l'inscrit en LATER. F-001a la rend concrète : `ray` a `Write` et pourrait écrire un `.tsx`,
  `analyzer` a `Bash` et pourrait faire autre chose qu'un commit. → Convertir en ADR au moment où
  `hooks: PostToolUse` est spécé, pas avant.

- **`check-parity.js` : 508 lignes, 6 passes, un seul fichier.** Le choix vient de la spec
  (« les pires défauts naissent de règles éparpillées ») et il est bon. Mais chaque feature
  d'architecture y ajoute une passe. → Déclencheur à poser dès maintenant : **à la 8e passe, la
  question « un fichier ou un dossier de passes » se re-tranche par ADR**, pas par accumulation.
