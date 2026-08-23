# client_vision.md
> **Usage** : Ce fichier est la source de vérité sur le contexte client et les objectifs produit.
> RAY le lit en priorité pour cadrer chaque spec. À mettre à jour à chaque évolution stratégique significative.
> **⚠️ À REMPLIR avant de lancer le premier `/ray`.**

---

## 🗺️ Contexte Projet

**Nom du projet :** `Critique — Design Review Tracker`
**Date de dernière mise à jour :** `2026-04-14`
**Statut :** `[x] Build`

---

## 👤 Les Utilisateurs / Personas

> Décris 2 à 3 personas. Pour chaque persona, réponds aux 4 questions ci-dessous.
> Sois factuel et spécifique — évite les généralités comme "tout le monde" ou "les utilisateurs".

### Persona 1 — Selin, Product Designer senior

| Champ | Valeur |
|---|---|
| Profil | Designer senior dans une scale-up, 6 ans d'xp, travaille avec 3 équipes dev en parallèle |
| Comportement | Fait ses reviews dans Figma Comments ou Notion, relance manuellement les devs en Slack |
| Stack mentale | Veut savoir en 10 secondes "où en est ce feedback que j'ai laissé il y a 3 jours" |
| Risque | Si l'outil lui demande de saisir plus d'infos que dans Figma, elle l'abandonne immédiatement |

### Persona 2 — Kévin, Lead Front-end

| Champ | Valeur |
|---|---|
| Profil | Dev front expérimenté, lit rarement Figma, travaille depuis son IDE et son kanban Linear |
| Comportement | Ignore les feedbacks Figma jusqu'à ce que le designer le mentionne en standup |
| Stack mentale | Veut une liste claire de "ce qu'on attend de moi", triée par criticité |
| Risque | Si c'est un outil de plus à connecter ou notifier, il ne l'utilisera pas |

---

## 🎯 Jobs-to-be-done (JTBD)

> Format : *"Quand [situation], [persona] veut [motivation], pour [résultat attendu]."*
> Un JTBD par persona principale.

**JTBD Persona 1 :**
*"Quand je termine une review Figma, je veux tracker l'état de chaque feedback sans effort supplémentaire, pour ne plus perdre de temps à relancer les devs manuellement."*

**JTBD Persona 2 :**
*"Quand je commence une session de dev, je veux voir la liste des feedbacks design en attente triés par criticité, pour traiter les plus importants en premier sans aller dans Figma."*

---

## 🏆 Objectifs Produit

### Vision (proposition de valeur en 1 phrase)
> En arrivant sur le produit, l'utilisateur comprend immédiatement que…

`[À COMPLÉTER — 1 phrase, sans jargon]`

### Objectifs mesurables

| Objectif | Persona cible | Métrique de succès |
|---|---|---|
| `[Objectif 1]` | `[Persona]` | `[Métrique concrète]` |
| `[Objectif 2]` | `[Persona]` | `[Métrique concrète]` |
| `[Objectif 3]` | `[Persona]` | `[Métrique concrète]` |

---

## 🎨 Ce que l'utilisateur doit ressentir

**En arrivant (0–5s) :** `[À COMPLÉTER]`
**En utilisant (5–60s) :** `[À COMPLÉTER]`
**En partant :** `[À COMPLÉTER]`

---

## 🚫 Contraintes & Limites

### Contraintes techniques
- `[Contrainte 1 — ex : solo builder, pas de BDD en MVP]`
- `[Contrainte 2 — ex : budget infra limité]`
- `[Contrainte 3 — ex : délai de X semaines]`

### Contraintes de contenu / légales
- `[RGPD, données sensibles, contenu externe, etc.]`

---

## ❌ Ce que ce produit N'EST PAS

> Définir les limites est aussi important que définir le scope.

- ❌ `[Ce que le produit ne fait pas — formulé explicitement]`
- ❌ `[Anti-pattern à éviter]`
- ❌ `[Cas d'usage exclu volontairement]`

---

## 📐 Valeurs Produit (arbitrage RAY & BOB)

| Valeur | Définition opérationnelle |
|---|---|
| `[Valeur 1]` | `[Ce que ça signifie concrètement pour les décisions de design et de code]` |
| `[Valeur 2]` | `[À COMPLÉTER]` |
| `[Valeur 3]` | `[À COMPLÉTER]` |

---

## 📝 Décisions historiques

| Date | Décision | Raison | Impact |
|---|---|---|---|
| `[YYYY-MM-DD]` | `[Première décision structurante]` | `[Pourquoi]` | `[Ce que ça change]` |
