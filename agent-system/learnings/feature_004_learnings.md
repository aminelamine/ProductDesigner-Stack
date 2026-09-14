---
feature_id: F-004
feature_name: Support MCP Penpot officiel — second chemin de premier rang dans design-workflow
date: 2026-09-14
verdict: SHIPPED
score: 20/20
---

## Patterns qui ont bien marché

- **Le testing-status en tête de fichier, écrit avant que le test existe.** `penpot-api-rules.md`
  ouvre par un bloc qui nomme explicitement ce qui a été exécuté, contre quel fichier, et ce que ça
  a renvoyé (« 1 component, 0 colors, 1 typography, an empty token catalog »). Ce n'est pas un
  disclaimer générique — c'est vérifiable et daté. Le commit `327ed79` a même figé le snippet en
  disant *pourquoi* il n'avait pas pu être exécuté (accès Penpot MCP absent de la session BOB), ce
  qui a rendu le trou visible plutôt que maquillé en « proven ». `56ac8b0` a ensuite refermé
  exactement ce trou, avec un vrai bug trouvé au passage (`dsKitOverview()` appelé comme closure
  persistante alors que seul `storage` survit entre appels `execute_code`) — la preuve n'était pas
  un vœu pieux, elle a produit une correction concrète. **Généraliser : quand un livrable dépend d'un
  outil auquel BOB n'a pas accès en session, marquer `unproven` avec la raison exacte plutôt que de
  simuler un succès — ça donne à la session suivante (ou à ANALYZER) un statut actionnable, pas une
  case à cocher aveuglément.**

- **Le vocabulaire propre tenu dans la prose, pas seulement dans la table.** Les trois fichiers
  modifiés (`onboarding.md`, `actions/design.md`, `actions/review.md`) nomment chaque branche
  Penpot « Penpot backend — load/execute/inspect instead », jamais une fusion générique des deux
  vocabulaires. `penpot-api-rules.md` va plus loin : Rule 4 interdit explicitement de traduire le
  modèle de tokens Penpot dans le vocabulaire des Variables Figma, avec un exemple WRONG qui est une
  phrase de prose (pas du code) — la contrainte du brief §3/§6 (« jamais un déguisement en pseudo-tool
  Figma ») est vérifiée à l'endroit où elle est le plus facile à trahir : la description en langage
  naturel, pas la signature de fonction.

- **Diff additif prouvé par le chiffre, pas par l'affirmation.** Les trois commits qui touchent des
  fichiers Figma existants (`2c7e325`, `8b2444b`, `b9f996e`) annoncent chacun `X insertions, 0
  suppression` et c'est vérifiable en une commande (`git show --numstat`) — recoupé et confirmé.
  CA-14 (zéro régression) n'est donc pas une promesse de commit, c'est un fait rejouable.

## Anti-patterns détectés

- (aucun sur le périmètre de cette feature — voir la note hors-scope ci-dessous, qui n'est pas
  imputable à F-004)

## Ambiguïtés de spec à anticiper

- **« Assertion » n'a pas de sens univoque hors du code applicatif.** Le §3b du contrat BOB (repris
  par la règle de preuve ANALYZER) suppose un test rejouable en Bash. Ici, la seule preuve possible
  passe par des tools MCP Penpot live (`execute_code` contre un fichier réel), auxquels ANALYZER n'a
  pas accès dans son propre bac à outils (`Read`/`Write`/`Bash` seulement). Résultat : ANALYZER ne
  peut pas rejouer lui-même la preuve de CA-10, seulement l'inspecter statiquement et faire confiance
  au niveau de détail du résultat rapporté (un vrai bug, avec cause précise, pas un « ça marche »
  générique). **Formulation suggérée pour une prochaine spec touchant un MCP tiers : nommer
  explicitement dans les CA quelles preuves resteront hors de portée d'ANALYZER, pour que le gate ③
  ne découvre pas la limite en cours de verdict.**

- **Le champ `quality_brief_type` par feature reste absent de `STACK.md`.** Signalé une 3e fois
  (après F-001d, puis le brief F-004 lui-même) : une feature 100 % outillage doit encore se justifier
  ligne par ligne pourquoi le gate esthétique global ne s'applique pas. Le contournement (motion_level
  N/A + note explicite) fonctionne mais reste un contournement répété.

## Signaux CX à surveiller

- **Le cas « deux MCP configurés, aucun fichier ouvert nulle part » reste net.** Simulé en lecture :
  `0a-detect` force une réponse explicite avant d'engager une branche, donc le message de blocage qui
  suit (Figma « Desktop is not connected » vs Penpot « No Penpot instance connected ») ne peut
  jamais se produire pour le mauvais backend — l'ambiguïté est purgée un cran plus tôt qu'au message
  d'erreur lui-même. Bon signal, à rejouer si un 3e backend apparaît un jour (hors scope assumé de
  cette feature).

- **Un designer Penpot n'a plus besoin d'ouvrir `figma-api-rules.md`.** `actions/design.md` dit
  explicitement « Read this instead of (not in addition to) figma-api-rules.md ». Le JTBD « suivre
  le cycle sans redécouvrir l'API à chaque session » (brief §1) est concrètement tenu dans ce fichier,
  pas juste énoncé en intention.

## Décision d'architecture émergente

- **La détection de backend explicite (`0a-detect`, jamais « premier tool qui répond ») est un
  pattern qui contraindra toute session future touchant `design-workflow`.** RAY l'a déjà identifié
  dans la spec (`ADR check` → candidat `adr-012-backend-detection-explicite-design-workflow.md`,
  non créé dans ce cycle, question ouverte pour Le Talent). Confirmé après implémentation : le
  pattern est bien celui qui a été codé (table à 3 lignes dans `onboarding.md`, aucune heuristique
  de fallback). → Candidat ADR toujours ouvert, à trancher par Le Talent avant qu'un 3e backend ne
  force la main.

## Note hors scope (signalée, non comptée contre cette feature)

`onboarding.md` ligne ~215 référence `figma_get_component`, un tool absent de la table de parité du
brief §5 (les 6 tools Figma câblés en dur n'incluent pas `figma_get_component`) et donc absent de
`penpot-api-rules.md`. Pré-existant, hors du diff additif de cette feature (vérifié : cette ligne
n'apparaît dans aucun des 5 commits F-004). À traiter dans une feature séparée — soit le tool existe
réellement et la table de parité de F-004 a un trou pour un 7e tool Figma, soit c'est un nom obsolète
à nettoyer côté Figma seul.
