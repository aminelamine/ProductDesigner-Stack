---
feature_id: F-001d
feature_name: Parité bidirectionnelle des dossiers miroirs
date: 2026-09-08
---

## Ralph Loop Status

| Step | Status | Notes |
|---|---|---|
| 1 — Structure  | ✅ | aucun fichier créé — le fix vit dans `checkDrift()` existant, pas dans une 7e passe (brief §2) |
| 2 — Scaffold   | ✅ | `checkDrift()` → `checkMirror()`, retour `{ drifted, orphans }` ; `orphan = { side, file, expected }` |
| 3 — Core logic | ✅ | direction A (template → dépôt), direction B (dépôt → paquet) dérivée de `simulateInstall()`, exemption `GENERATED` |
| 4 — UI         | — | sans objet : CLI Node, `motion_level: L0`, zéro composant. Le rendu console suit la grammaire de `main()` (bloc orphans après le bloc drift) |
| 5 — States     | — | sans objet : la passe a deux issues, exit 0 / exit 1, toutes deux couvertes par les mutations M0–M5 |
| 6 — Polish     | — | sans objet : aucune surface visuelle, aucune animation |

## Last completed step
Step 3/6 — Core logic — 2026-09-08. Étapes 4–6 sans objet sur une feature CLI.

## Notable implementation choices
- **Exemption dérivée, pas listée** (brief §4) : un fichier dépôt est légitime parce que
  `simulateInstall()` fait atterrir quelque chose à son chemin installé. Prouvé par M3 — la paire
  module `probe.md` passe en 0 avec `check-parity.js` byte-identique entre M2 et M3.
- **`GENERATED` indexé par chemin installé**, même jeu de clés que `isIgnorable()` — pas de second
  vocabulaire. M4 montre que l'exemption mord : la retirer fait rouge sur `pds-stack.mdc`.
- **Renommage `checkDrift()` → `checkMirror()`** (Q2, approuvée) : `gateFiles()` ne couvre pas
  `pds-stack-cli/bin/`, la baseline pulse ne bouge pas. `--accept-pulse` non lancé.
- **Pas de deny-list `.DS_Store` / `Thumbs.db`** (Q1, approuvée). Risque assumé et documenté au
  brief §5 : un fichier gitignoré dans un dossier miroir ferait rouge. Le message nomme le chemin.
- **`MIRRORED` byte-identique à HEAD**, 9 paires — vérifié par extraction du bloc et `diff`.
- **6 passes dans `main()`**, inchangé : le déclencheur du learning F-001a (« à la 8e passe, un
  fichier ou un dossier se re-tranche par ADR ») n'est pas consommé.
- **Le contenu des 5 fichiers packagés sous `templates/modules/` reste non vérifié** — direction B
  assure la présence, jamais l'égalité d'octets. OUT OF SCOPE de la spec, trou nommé.

## Active blockers
- Aucun. 11/11 CA prouvés par exécution + mutation (M0–M5), zéro `unproven`.
