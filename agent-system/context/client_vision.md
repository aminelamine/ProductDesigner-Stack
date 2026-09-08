# client_vision.md

## 🗺️ Contexte Projet

**Nom du projet :** `Portfolio Amine Lamine`
**Date de dernière mise à jour :** `2026-09-08`
**Statut :** `[x] Build` — single-page en ligne, à reprendre sous gates

> Le produit est **le portfolio**. La vision de la stack PDS vit dans `context/stack/` —
> ne pas cadrer une feature de portfolio contre elle.

**Sources :** profil LinkedIn `linkedin.com/in/lamineamine` (lu le 2026-09-08, 9 posts récents),
`lib/data.ts`, `app/(site)/page.tsx`.

**Identité déclarée**
- Headline LinkedIn : **`Creative Explorer | Product Designer | Agentic Design`**
- Signature récurrente en fin de post : *« Moi, c'est Amine Lamine, Product Designer & Creative
  AI-Driven Explorer »* — la formule est stable sur des mois, c'est un positionnement tenu.
- Paris · Niji (#VoicesofNiji) · Institut Ingemedia · ~6 000 abonnés LinkedIn
- Tagline actuelle du site : *« Je ne fais pas de l'IA. Je pense avec. »*

> ⚠️ Sections *About* et *Expériences* du profil non chargées (lazy-load). Dates, intitulés et
> parcours détaillé restent `[À COMPLÉTER]` — ils comptent si le portfolio raconte un trajet.

---

## 👤 Les Utilisateurs / Personas

`[À COMPLÉTER — décision du Talent. Trois hypothèses tirées de l'audience réelle observée sur
LinkedIn, à confirmer ou écarter, pas à additionner :]`

- **H1 — Le pair qui orchestre des agents.** Lead produit ou designer confronté aux mêmes
  problèmes (sous-spécification, dérive d'agent, coût de tokens). C'est l'audience qui réagit
  aux posts. Il cherche une méthode réutilisable, pas une galerie.
- **H2 — Le décideur / recruteur.** Arrive par une recommandation ou une candidature. Il doit
  situer un profil rare en moins d'une minute : ni designer classique, ni ingénieur.
- **H3 — Le lecteur d'Obsolet.** Vient du contenu, veut savoir qui écrit et ce qu'il fabrique.

## 🎯 Jobs-to-be-done (JTBD)

`[À COMPLÉTER — un par persona retenu.]`

Amorce défendable, tirée du positionnement : *« Quand je tombe sur ce profil, je veux comprendre
par quel chemin il en est arrivé là, pour juger si sa manière de penser m'est utile. »*
Le trajet, pas le catalogue — cf. `references/concept-explorateur-creatif.md`.

---

## 🧭 Terrain thématique *(observé, non déclaré)*

Ce sur quoi il écrit publiquement, de façon répétée — matière première des sections :

| Thème | Illustration |
|---|---|
| Design agentique & orchestration | états comportementaux, guardrails, colonne stable / colonne adaptative |
| La sous-spécification comme vrai goulot | *« Le goulot d'étranglement de vos agents n'est plus le modèle, c'est la précision de votre spécification »* |
| Le coût invisible des prompts | tokenisation du français, +20–30 % face à l'anglais |
| Attention, FOMO, curiosité lente | #MODEAVION — *« Rester dans la course ↔ rester dans sa peau »* |
| Contrainte comme mise au point | #ThinkInsideTheBox — la créativité est affaire de géométrie, pas d'évasion |
| Designer → builder | *« Une landing page, ça montre. Une doc, ça laisse entrer. »* |

**Artefacts fabriqués** — ce sont les projets à raconter, pas des « travaux clients » :
`PDS Stack` (workflow AI design-first, 5 agents, *design is the quality gate*) ·
`Peson` (peser le coût réel et la valeur d'un prompt) ·
`Dicrotic95` (décomposition de prompts — chrome Windows 95, scanlines CRT, chiptune) ·
`Obsolet` (newsletter, album #MODEAVION en 8 éditions).

---

## 🏆 Objectifs Produit

### Vision
`[À COMPLÉTER — en une phrase, ce que le visiteur doit comprendre en arrivant.]`

Amorce : le trajet d'un designer qui explore — ses détours et ses culs-de-sac compris — vaut
mieux qu'une grille de projets aboutis.

### Objectifs mesurables
`[À COMPLÉTER — prise de contact ? abonnement Obsolet ? mémorisation du positionnement ?]`

---

## 🎨 Ce que l'utilisateur doit ressentir

**En arrivant (0–5s) :** `[À COMPLÉTER]` — amorce : que ce profil ne rentre dans aucune case
existante, et que c'est délibéré.
**En utilisant (5–60s) :** `[À COMPLÉTER]` — amorce : qu'il parcourt un trajet, avec des étapes,
des détours et des routes alternatives assumées.
**En partant :** `[À COMPLÉTER]` — amorce : qu'il a envie de voler un artefact, pas seulement
d'avoir vu du travail.

> Ces trois lignes alimentent directement le **Quality Brief esthétique** de BOB.
> Direction visuelle arrêtée : voir `references/` — style Drive Capital, concept trajet,
> **option 2 retenue** (illustration deux tons).

---

## 🚫 Contraintes & Limites

- Single-page, navigation par ancres — pas de routing multi-pages
- Next.js App Router · TypeScript strict · Tailwind v4 · Shadcn (`base-nova`)
- Obsolet est une destination externe (Substack), pas une section à répliquer
- **Le thème actuel est dark-only et va être remplacé** par le système cream/Voltage Blue :
  décision de direction, ADR requis avant implémentation

---

## ❌ Ce que ce produit N'EST PAS

- Un blog — Obsolet vit sur Substack, la page y renvoie
- Une grille de projets — les 3 références de trajectoire écartent explicitement le catalogue
- Un CV en ligne `[à confirmer]`

---

## 📐 Valeurs Produit (arbitrage RAY & BOB)

`[À COMPLÉTER — à valider par le Talent. Déduites de sa propre production écrite, donc à
contester s'il ne s'y reconnaît pas :]`

| Valeur | Ce que ça implique |
|---|---|
| `Le trajet plutôt que la vitrine` | on montre par où c'est passé, détours compris — pas une sélection lissée |
| `La contrainte est la mise au point` | le système visuel est étroit **par choix** ; l'élargir est un aveu, pas une liberté |
| `Rendre entrable` | *« une doc, ça laisse entrer »* — le visiteur doit pouvoir se servir sans parler à l'auteur |
| `L'artefact à voler` | chaque section laisse repartir avec quelque chose d'utilisable |

### Anti-patterns UX
`[À COMPLÉTER — 3 attendus.]` Amorce, tirée de ses propres textes : la vitrine animée qui prouve
le goût sans prouver l'usage ; le jargon qui masque une sous-spécification ; le catalogue de
projets sans thèse.
