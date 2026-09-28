# ADR-017 — Session 0 de cadrage, une session par agent, relais plutôt que branche

| | |
|---|---|
| **Statut** | ✅ **ACCEPTED** — Le Talent, 2026-09-28 |
| **Domaine** | Architecture / Orchestration |
| **Date** | 2026-09-28 |
| **Complète** | [ADR-014](adr-014-stack-lean.md) — une phase par session, inchangé |

---

## Contexte

ADR-014 a coupé le cycle en sessions : une phase par conversation, l'état dans
`state_<feature>.md`. Deux trous restent.

1. **Le contexte projet n'a pas de maison.** Chaque `/pds` le redemande ou le reconstruit : cible,
   contraintes, références, périmètre. Sur un projet à plusieurs features, on le paie à chaque
   ouverture.
2. **« Ouvrir une branche » quand la discussion s'allonge** est l'intuition naturelle, mais une
   conversation forkée emporte tout son historique. On repaie exactement ce qu'on voulait
   couper : le coût, c'est la durée de vie du contexte (ADR-014).

## Décision

**Nous adoptons une session 0 de cadrage par projet, puis une session par agent, et le relais
(fichier + session neuve) comme seule façon de couper une discussion longue.**

1. **`/pds cadrer <projet>` : la session 0.** Optionnelle : on la lance pour un projet à
   plusieurs features, et une feature isolée continue avec `/pds`. Elle collecte : cible,
   problème, contraintes, références, features envisagées. Les entrées lourdes (PDF, dossiers,
   sites) passent par un sous-agent qui écrit un digest dans `memory/references/` (règle ADR-014).
   Elle **ne franchit aucun gate** : pas de direction, pas de scope.
2. **Elle écrit un seul fichier, `agent-system/sessions/project_<projet>.md`, en ~60 lignes
   maximum,** puis la session se ferme. Ce qui ne tient pas dans ce fichier n'entre pas dans
   le projet. Le fichier contient :
   - le contexte ;
   - le plan de dispatch, avec une ligne par feature (voie · première session · prompt à coller) ;
   - un `state_<feature>.md` par feature, `phase_suivante: DIRECTION`, écrit en même temps.
3. **Une session = un agent = une phase.** Le Talent ouvre chaque session à partir du prompt
   du plan (`/pds reprendre <feature>`). `/pds reprendre` lit `project_<projet>.md` (s'il est
   référencé) + `state_<feature>.md`, et rien de plus.
4. **Relais, jamais fork.** Au-delà de ~150k, ou quand la discussion dérive, le conducteur
   propose un relais : il met à jour `state_<feature>.md` (≤ 5 lignes « À savoir ») et donne
   le prompt de la session neuve. On ne forke jamais une conversation pour continuer.
   Une branche git reste un outil de code, sans rapport avec la coupure d'une conversation.
5. **Le Talent ouvre les sessions.** Le conducteur donne le titre (`PDS · <feature> · <phase>`)
   et le prompt ; il ne crée ni groupe ni vue dans la barre latérale.

## Alternatives considérées

| Alternative | Raison de rejet |
|---|---|
| Forker la conversation quand elle s'allonge | Le fork emporte l'historique : même coût, même dérive |
| Le conducteur ouvre lui-même les sessions | Il franchirait le moment de décision du Talent ; la barre latérale est la sienne |
| Stocker le contexte projet dans `memory/identity.md` | `identity` est le socle de l'auteur, pas celui d'un projet ; il serait réécrit à chaque projet |

## Conséquences

- Les gates, le /20, le verdict binaire et le budget « 3 gates, ~12 étapes » sont inchangés :
  la session 0 est une étape d'entrée, pas un gate.
- Une feature démarre avec le contexte projet déjà digéré, sans relire la session 0.
- À mesurer sur le prochain projet multi-features (`npm run tokens`) : session 0 < 60k, aucune
  session > 150k, zéro fork.
