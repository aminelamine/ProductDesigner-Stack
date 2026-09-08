# client_vision.md

## 🗺️ Contexte Projet

**Nom du projet :** `Portfolio Amine Lamine`
**Date de dernière mise à jour :** `2026-09-08`
**Statut :** `[x] Build` — single-page en ligne, sections Hero / About / Obsolet / Contact

> Le produit est **le portfolio**, pas la stack qui le construit. La vision de la stack vit
> dans `context/stack/` — ne pas cadrer une feature de portfolio contre elle.

**Ce que le dépôt dit déjà** *(source : `lib/data.ts`, `app/(site)/page.tsx`)*
- Positionnement affiché : `Product Designer — Design × IA × Leadership`
- Tagline du hero : *« Je ne fais pas de l'IA. Je pense avec. »*
- Navigation : About · Contact · Obsolet (newsletter externe, Substack)
- Sections en place : Hero · About · Obsolet · Contact, plus header sticky, mobile-nav, footer

---

## 👤 Les Utilisateurs / Personas

`[À COMPLÉTER — 1 à 3 personas. Qui atterrit sur cette page ? Recruteur, client, pair,
lecteur d'Obsolet ? Dans quel contexte arrive-t-il, et que cherche-t-il à décider ?]`

> Matière première : le profil LinkedIn. C'est ce que STEP 1 du conducteur va exploiter.

---

## 🎯 Jobs-to-be-done (JTBD)

`[À COMPLÉTER — format « Quand [situation], je veux [motivation], pour [résultat] ».
Au moins un par persona.]`

---

## 🏆 Objectifs Produit

### Vision
`[À COMPLÉTER — ce que le visiteur doit comprendre en arrivant, en une phrase.]`

### Objectifs mesurables
`[À COMPLÉTER — que doit-il se passer pour que cette page ait fait son travail ?
Prise de contact, lecture d'Obsolet, mémorisation du positionnement ?]`

---

## 🎨 Ce que l'utilisateur doit ressentir

**En arrivant (0–5s) :** `[À COMPLÉTER]`
**En utilisant (5–60s) :** `[À COMPLÉTER]`
**En partant :** `[À COMPLÉTER]`

> Ces trois lignes nourrissent directement le **Quality Brief esthétique** de BOB.
> Les captures de style et le prompt de référence se déposent ici.

---

## 🚫 Contraintes & Limites

- Single-page, navigation par ancres — pas de routing multi-pages
- Dark-first : le thème n'a pas de variante claire aujourd'hui (`app/globals.css`)
- Next.js App Router · TypeScript strict · Tailwind v4 · Shadcn (style `base-nova`)
- Obsolet est une destination externe (Substack), pas une section à répliquer

---

## ❌ Ce que ce produit N'EST PAS

- Un blog — Obsolet vit sur Substack, la page y renvoie
- Une étude de cas détaillée par projet `[à confirmer]`
- Un CV en ligne `[à confirmer]`

---

## 📐 Valeurs Produit (arbitrage RAY & BOB)

`[À COMPLÉTER — 3 à 5 valeurs qui tranchent un arbitrage, plus 3 anti-patterns UX.]`
