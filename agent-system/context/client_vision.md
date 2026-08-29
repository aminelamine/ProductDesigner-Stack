# client_vision.md

## 🗺️ Contexte Projet

**Nom du projet :** `PDS Stack — the design-first AI workflow`
**Date de dernière mise à jour :** `2026-08-28`
**Statut :** `[x] Build` — v3.4.0 publiée sur npm, landing + docs en ligne

> Le produit est la stack elle-même : un système d'agents (RAY · BOB · ANALYZER) distribué par
> `npx pds-stack install`, plus son conducteur `/pds`, ses garde-fous git et sa suite d'auto-test.

---

## 👤 Les Utilisateurs / Personas

### P1 — Le Product Designer qui livre *(source : package.json description, landing hero)*
Designer produit qui code avec un agent. Il sait ce qu'il veut visuellement mais perd le contrôle
dès que l'agent génère : la direction arrive après le code, jamais avant. Il n'a pas d'équipe QA.
Son arbitrage se fait seul, vite, et il paie chaque dérive en rework.

### P2 — Celui qui installe depuis npm *(source : distribution publique, docs/get-started)*
Découvre la stack par la landing ou le paquet npm. N'a lu aucun prompt, ne connaît pas la séquence
de commandes. Son premier contact est `npx pds-stack install` puis `/pds`. S'il se heurte à un gate
qui bloque sans expliquer, il désinstalle — les runs 3 et 5 ont montré exactement ces points.

---

## 🎯 Jobs-to-be-done (JTBD)

- **P1** — Quand je démarre une feature UI, je veux que ma direction visuelle soit actée *avant* la
  première ligne de code, pour ne pas payer le rework à la fin.
- **P1** — Quand une feature est finie, je veux un jugement qui ne soit pas le mien, pour attraper
  ce que j'ai auto-validé sans le voir.
- **P2** — Quand j'installe la stack, je veux lancer une feature sans lire la doc, pour juger en
  dix minutes si ça vaut le coup.

---

## 🏆 Objectifs Produit

### Vision
> En arrivant sur le produit, l'utilisateur comprend immédiatement que **le jugement du designer
> devient le gate qualité du système — pas un avis parmi d'autres.**

### Objectifs mesurables *(source : landing section « What you gain », SCORING.md)*

| Objectif | Persona | Métrique |
|---|---|---|
| Livrer sous gates sans rework de direction | P1 | T1 ≈ 13 min · T2 ≈ 40 min · T3 ≈ 79 min, de bout en bout |
| Aucune feature livrée en dessous du seuil | P1 | Score ANALYZER ≥ 18/20 pour tout commit — zéro exception |
| Ce que le repo contient est ce que l'install livre | P2 | 5 passes de parité vertes à chaque publication |
| Le système trouve ses propres défauts | P1 | 1 run pulse par changement de gate, findings publiés |

---

## 🎨 Ce que l'utilisateur doit ressentir

**En arrivant (0–5s) :** que quelqu'un a déjà décidé pour lui ce qui n'a pas à être décidé.
**En utilisant (5–60s) :** qu'il est arrêté au bon moment, avec la raison — jamais bloqué sans explication.
**En partant :** que ce qui a été livré est ce qu'il avait en tête, pas une approximation.

---

## 🚫 Contraintes & Limites

- Multi-outils : un fichier canonique, cinq surfaces (Claude Code, Cursor, Gemini CLI, Copilot, Codex)
- Distribution npm : ce qui n'est pas dans `templates/` n'existe pas pour l'utilisateur
- Les gates sont *raisonnés* — seul un run pulse complet peut prouver qu'ils tiennent

---

## ❌ Ce que ce produit N'EST PAS

- Un générateur de code — il encadre un agent, il ne le remplace pas
- Un framework de test — une assertion par critère décidable, pas d'objectif de couverture
- Un design system — il précède `design_guide.md`, il ne le fournit pas

---

## 📐 Valeurs Produit (arbitrage RAY & BOB) *(source : les 3 contraintes dures, docs/why)*

| Valeur | Ce que ça implique |
|---|---|
| `Direction avant exécution` | Aucun code avant un Quality Brief approuvé. Le gate est non négociable. |
| `Le scope est sacré` | Gelé à `VALIDATED`. Tout ajout est un nouveau cycle RAY, jamais une conversation. |
| `Le système se souvient` | ANALYZER écrit un learning après chaque verdict, RAY lit les 3 derniers. |
| `Prouver plutôt qu'inspecter` | Un critère décidable par machine porte une assertion exécutée. « believed OK » est banni. |
| `Publier ses échecs` | Les runs ratés sont publiés avec les autres. Le score affiché est ~89, pas ~92. |

### Anti-patterns UX *(source : findings des runs 3 et 5)*

- Un gate qui bloque sans dire pourquoi ni comment en sortir
- Un garde qui juge du code que l'utilisateur n'a pas écrit (`node_modules`, fichiers générés)
- Une règle qui pointe vers un fichier ou une section qui n'existe pas
