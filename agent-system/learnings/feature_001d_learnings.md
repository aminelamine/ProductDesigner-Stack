---
feature_id: F-001d
feature_name: Parité bidirectionnelle des dossiers miroirs
date: 2026-09-08
verdict: SHIPPED
score: 18/20
---

## Patterns qui ont bien marché

- **L'exemption dérivée d'un modèle, jamais d'une liste de noms.** La direction dépôt → paquet
  n'exempte un fichier que parce que `simulateInstall()` fait atterrir quelque chose à son chemin
  installé. La preuve n'est pas une affirmation, c'est un invariant : entre M2 (`.claude/commands/probe.md`
  seul → exit 1) et M3 (paire module ajoutée → exit 0), `check-parity.js` est resté **byte-identique**
  (md5 `fe7ebcf4…` avant et après, `git status` vide sur le script). Une liste de noms tolérés aurait
  demandé une édition et aurait périmé au module suivant. **Généraliser : quand un gate doit tolérer
  des exceptions, les dériver de la règle qui les crée, et prouver la dérivation en montrant que le
  gate n'a pas été touché.**

- **Nommer le piège de contamination *avant* de mesurer.** Le brief §6 pose que M2 se dépose dans
  `.claude/commands/` et jamais dans `.claude/agents/`, où `checkAgents()` sortirait en 1 pour une
  autre raison et masquerait le silence de la passe miroir. Règle d'assertion associée : chaque
  mutation vérifie le **code de sortie ET la ligne du bon bloc**. Rejoué : sur M1, `checkAgents()`
  reste muet et seul le bloc orphans parle. C'est ce qui distingue « la passe mord » de « quelque
  chose a échoué ».

- **La garantie transitive plutôt que le contrat recopié.** `AGENT_CONTRACT` n'est pas dupliqué côté
  template : fichier template ⇒ jumeau dépôt (CA-1) ⇒ octets égaux (drift) ⇒ `checkAgents()` juge le
  jumeau. Sonde indépendante : un 5e agent déposé **des deux côtés** sort en 1 par `checkAgents()`
  (« is not one of the four — ADR-008 D1 »), déposé côté template seul il sort en 1 par la passe
  miroir. Les deux portes sont fermées avec une règle générale sur 9 paires, pas neuf contrats.

- **Les anti-patterns du cycle précédent corrigés un par un, sans qu'on ait à les redemander.**
  Spec + ligne roadmap commitées **avant** le premier commit de code (330c208 < 31d4be1), commit de
  code portant `Ref: feature_001d | spec:…` et ne touchant qu'un fichier, zéro housekeeping
  transporté, entrée de changelog roadmap datée. Les 5 anti-patterns du learning F-001a sont soit
  fermés, soit explicitement renvoyés en LATER.

## Anti-patterns détectés

- **La ligne verte promet encore un cran de plus qu'elle ne vérifie — un étage plus haut.** CA-9
  fixe `✓ no drift between the repo and the templates, and no file on one side only.` La chaîne est
  exacte et le périmètre *fichier* est tenu. Mais le garde d'entrée de la boucle,
  `if (!fs.existsSync(tplDir) || !fs.existsSync(repoDir)) continue;` (`check-parity.js:134`), saute
  la paire entière quand un des deux dossiers manque. Vérifié en live : `mv .agents /tmp` puis
  relance → **exit 0**, run intégralement vert, 5 `SKILL.md` template devenus invisibles, sous une
  ligne qui affirme « no file on one side only ». Un fichier d'un seul côté est vu ; un **dossier**
  d'un seul côté ne l'est pas. C'est la même classe de défaut que celui fermé ici, décalée d'un
  niveau de granularité. *Correction attendue : traiter une paire dont un côté manque comme un
  problème, ou restreindre la chaîne de succès aux paires effectivement comparées.*

- **Un `Fix:` unique pour deux remèdes opposés.** Le bloc orphans imprime
  `Fix: add the missing twin, or drop the file from the mirrored folder.` pour les deux côtés. Côté
  template, c'est juste. Côté dépôt, le vrai remède est « empaqueter le fichier sous
  `pds-stack-cli/templates/…` (core ou module) », pas « ajouter un jumeau » — un P2 qui lit ça
  cherche un jumeau là où il faut écrire une règle de copie. *Correction attendue : brancher la
  ligne `Fix:` sur `side`, comme la ligne `dim` l'est déjà.*

- **Un champ produit et jamais lu.** `orphans.push({ side: 'repo', file: installed, expected: installed })` :
  `expected` n'est rendu que dans la branche `template`, et vaut ici exactement `file`. Le brief §3
  annonçait deux chemins distincts côté dépôt (chemin dépôt / chemin installé) ; ils coïncident par
  construction puisque `prefix` est le chemin dépôt débarrassé de `../`. Donnée morte, sans effet,
  mais qui fait mentir le contrat de forme écrit au brief.

## Ambiguïtés de spec à anticiper

- **« Un fichier sous le dossier template d'une paire MIRRORED » présuppose que la paire est vivante.**
  CA-1 est écrit sans condition, et il existe un chemin d'exécution où un fichier template sans jumeau
  laisse la commande en 0 : celui où le dossier dépôt de la paire n'existe pas. La spec n'a pas
  questionné le garde d'entrée, hérité de F-001a. Formulation suggérée pour la prochaine spec de
  parité : *« une paire dont un seul des deux dossiers existe est elle-même un problème, signalé et
  compté ; aucune paire déclarée n'est sautée en silence. »*

- **La spec fixe la chaîne de succès, donc elle en porte la promesse.** CA-9 a bien appliqué le
  correctif de forme du learning F-001a (« formuler le succès au périmètre réellement testé »), mais
  la chaîne a été écrite avant que le périmètre réel soit connu au niveau dossier. Règle à retenir
  côté RAY : *la chaîne verte se fige en dernier, une fois les mutations passées — pas au moment de
  la spec.*

- **« Présence » et « contenu » restent deux mots pour un même vert.** La direction B ne vérifie que
  la présence d'un chemin dans `landed`. Vérifié : un `probe.md` dépôt et son jumeau module au
  contenu **divergent** laissent la commande en 0. C'est l'OUT OF SCOPE assumé de la spec, et il est
  correctement nommé partout (spec, brief §2, message de commit) — mais il touche les 5 fichiers
  réellement packagés sous `templates/modules/` (`EVE`/`SHIP_system_prompt.md`, `eve.md`, `ship.md`,
  `design-workflow.md`), pas des cas théoriques. Prochaine spec : le fermer coûte 5 paires dans
  `MIRRORED`, c'est un cycle court et il ferme la dernière asymétrie du KPI P2.

## Signaux CX à surveiller

- **JTBD P2 — « ce que le dépôt contient est ce que l'install livre » : la mesure a cessé de mentir
  dans un sens.** Le défaut trouvé au verdict F-001a est refermé et reproductible dans les deux
  sens. Le KPI roadmap « 5 passes de parité vertes » mesure maintenant quelque chose de plus proche
  de ce qu'il annonce.

- **Friction P2 — le gate qui bloque sur un fichier gitignoré.** D4 (approuvé, sans deny-list) fait
  que tout fichier posé dans un dossier miroir sort en 1, y compris un `.DS_Store` invisible au
  `git status`. Le message nomme le chemin exact, donc le diagnostic reste court — mais c'est le
  scénario « bloqué sans comprendre » du persona P2 qui se rapproche d'un cran. À surveiller : si
  l'occurrence se produit une fois en vrai, la deny-list se re-tranche, avec un fait plutôt qu'une
  hypothèse.

- **Friction P2 — une commande locale légitime fait rouge.** Un utilisateur qui ajoute son propre
  `.claude/commands/mon-truc.md` sur ce dépôt fait échouer la passe. C'est le comportement voulu
  pour le dépôt de la stack (CA-3), mais le message ne le dit pas : combiné au `Fix:` générique
  ci-dessus, il lit « ajoute un jumeau » là où la réponse est « ce dossier est miroir, tes fichiers
  locaux n'y ont pas leur place ».

## Décision d'architecture émergente

- **Le garde « paire incomplète » mérite une règle, pas un `continue`.** Deux passes sautent
  silencieusement du travail quand un chemin n'existe pas (`checkMirror`, et le `if (!fs.existsSync(src)) continue`
  de la boucle de référence). Chaque saut est individuellement raisonnable et collectivement
  invisible. → **Candidat ADR : « aucune paire ni aucun fichier déclaré n'est sauté en silence — une
  cible absente est un problème compté. »** Déclencheur observé : 1re occurrence mesurée (`.agents`
  retiré → run vert). À convertir en ADR si une 2e apparaît, ou à traiter dans la feature qui ferme
  la byte-identité des fichiers modules.

- **Compteur de passes : toujours 6, déclencheur F-001a non consommé.** `main()` appelle
  `checkMirror` / `checkDetectors` / `checkSectionAnchors` / `checkAgents` / `checkPulse` plus la
  passe de référence en ligne. Le fix a vécu dans la fonction existante (+50/−13 lignes), pas dans
  une 7e passe. Le déclencheur « à la 8e passe, un fichier ou un dossier de passes se re-tranche par
  ADR » reste armé, et `check-parity.js` est passé de 508 à 545 lignes — la question se posera avant
  le compteur de passes si la croissance continue à ce rythme.
