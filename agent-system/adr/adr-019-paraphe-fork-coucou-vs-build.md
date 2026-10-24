# ADR-019 — Paraphe : forker Coucou, construire notre encoche, ou cockpit seul

**Date :** 2026-10-14
**Statut :** 🟡 PROPOSED
**Décideurs :** Le Talent (+ RAY pour l'analyse)
**Agents concernés :** RAY | BOB | Tous

---

## Contexte

La direction 004 (`memory/directions/004-paraphe-guichet-de-signature.md`, retenue) place les
3 gates dans l'encoche Mac, avec un cockpit local. La référence 001 (Coucou) prouve la mécanique
hook → socket local → le hook attend le clic. Mais elle n'en prête que la mécanique : son code est
MIT, son nom, sa mascotte Mochi, son icône et ses sons sont réservés. Coucou : Swift 6 / SwiftUI /
AppKit (macOS 15+), Tauri 2 pour Windows/Linux, plus iPhone/Android. PDS est une stack pilotée par
un designer, distribuée en Node (`npx pds-stack`), sans Swift dans l'outillage. Le cockpit
(F-005, lot cockpit) se construit sans cette décision ; l'encoche et le clic qui tranche, non.

---

## Le contrat partagé — vaut pour les trois options

Quelle que soit l'option, le pont entre l'agent et le designer est le même, et il est à nous :

- **Émetteur** : un hook Claude Code en Node (`scripts/paraphe-hook.mjs`, comme
  `context-thermostat.mjs`), déclenché à l'arrêt d'un tour (`Stop`) quand le dernier message porte
  un marqueur de gate `⏸ Gate ①|②|③`.
- **Transport** : socket local via `node:net` — socket Unix sur macOS/Linux, *named pipe* sur
  Windows. Aucun port TCP, aucun réseau.
- **Message** : un gate par événement `{ feature, gate, artefact, voie }` → une réponse
  `{ decision }` avec `decision ∈` le vocabulaire du gate (`approuver|ajuster`, `figer|renvoyer`,
  `retenue|refusée`). Jamais de liste, jamais de « toujours ».
- **Retour à l'agent** : le hook rend la décision à Claude Code comme consigne de reprise du tour.
- **Repli** : délai dépassé ou aucun client à l'écoute → le hook sort sans rien dire, le terminal
  reste la voie normale. Le hook ne bloque jamais (même règle que l'ADR-018).

> **Non prouvé** : que le hook `Stop` puisse rendre une décision humaine comme reprise de tour de
> façon fiable doit être vérifié en premier, sur un vrai `/pds`, avant tout code d'interface
> (learning F-004 : marquer `unproven` plutôt que simuler).

---

## Décision

**Recommandation RAY : (c) d'abord, (b) ensuite sous condition. Jamais (a).**

1. Construire le contrat ci-dessus et faire du **cockpit** son premier client : il reçoit le gate
   et porte les 2 boutons. Notification système optionnelle à l'arrivée.
2. Ne construire l'**encoche native** (option b, mince, macOS d'abord) que si le cockpit prouve
   l'usage : le designer tranche réellement ses gates hors du terminal.

La décision appartient au Talent.

---

## Alternatives considérées

| Option | Pour | Contre |
|---|---|---|
| **(a) Forker Coucou** | Encoche macOS + Tauri déjà faits ; mécanique prouvée | On supprime l'essentiel (flux d'activité, chat, intégrations, mobile, « Always ») et on refait toute l'identité (nom, Mochi, icône, sons réservés) : il ne reste que du code qu'on maintient seuls, sans pouvoir suivre l'amont. Trois bases (Swift, Tauri, mobile) pour un mainteneur designer. Risque d'identité résiduelle. |
| **(b) Construire notre encoche** | Exactement les 3 états du proto, rien de plus ; identité propre dès le départ | Une app native à écrire, signer et notarier ; dépendance à Swift (ou Tauri) dans une stack Node pilotée par un designer ; macOS seul au début |
| **(c) Cockpit seul** (navigateur + notification système / terminal) | Zéro app native, multi-plateforme d'emblée, réutilise le serveur du cockpit, livrable par `bob-build` | Perd l'emplacement — l'encoche, « là où l'œil est déjà » — cœur de la référence ; le navigateur n'est pas toujours visible |

---

## Conséquences

### ✅ Bénéfices attendus
- Le contrat hook → socket est écrit une fois et sert les trois options : (c) aujourd'hui, (b) plus tard sans réécriture.
- Aucune dépendance Swift ni signature Apple tant que l'usage n'est pas prouvé.
- Aucun risque de licence ou d'identité lié à Coucou.

### ⚠️ Contraintes acceptées
- Avec (c), la direction 004 est livrée **en partie** : l'encoche, son personnage et ses sons attendent. À dire au gate ③, pas à masquer.
- Le cockpit passe d'un serveur en lecture seule à un serveur qui relaie une décision : sa surface d'attaque change (cadre F-005b).
- (b) reste à trancher plus tard, avec sa propre question : Swift seul (macOS) ou Tauri (multi-OS).

### 🔗 Impact sur les agents
- **RAY** : spécer le contrat (F-005b) avant toute UI de décision ; une décision = un gate = un message.
- **BOB** : jamais de code repris de Coucou, ni d'asset, ni de son ; jamais d'option « toujours » ni de lot dans le contrat.
- **ANALYZER** : rejet si un message du contrat porte plus d'un gate, ou si le hook peut bloquer l'agent.

---

## ADRs liés

- Dépend de : ADR-018 — Thermostat de contexte (précédent du hook Node qui ne bloque jamais)
- Conditionne : le cadre F-005b (hook → socket + clic qui tranche) et un futur ADR encoche native (Swift vs Tauri)

---

## Révision

**Condition de révision :** le hook `Stop` s'avère incapable de rendre une décision de façon fiable (le contrat tombe, les 3 options aussi), ou le cockpit montre que le designer tranche hors du terminal (ouvre la question b).

**Date ou milestone suggéré :** après le premier cycle `/pds` tranché depuis le cockpit.
