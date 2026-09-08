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

> ⚠️ Section *About* intégrée ci-dessous (fournie par le Talent le 2026-09-08). *Expériences*
> détaillées (dates, intitulés) restent non chargées — non bloquant pour le hero, l'About porte
> le positionnement ; à réouvrir si une section timeline/parcours est spécée.

**About (LinkedIn, 2026-09-08)**

> Currently designing agentic AI workflows, orchestrating human–AI collaboration from discovery
> to delivery. I map user and AI flows, design conversation logic and adaptive interfaces, build
> modular agent instructions, and help with AI upskilling across product and design teams.
>
> For the past 16 years, I've been designing digital products and ecosystems built to last. I
> help product, tech, and design teams create accessible, scalable, and business-aligned
> experiences, from early discovery to delivery.
>
> My work focuses on product design and AI-augmented workflows: structuring reflection
> architectures, prompt systems, and agent-based logic to improve product thinking,
> decision-making, and team efficiency without losing human judgment or design intent.
>
> I bring a systemic, pragmatic approach that blends UX expertise, creative intuition, and
> process optimization, with strong attention to accessibility, clarity, and real-world
> constraints.
>
> Multicultural experiences, travel, and continuous exploration at the intersection of design,
> art, and emerging technologies shape how I think, design, and collaborate.
>
> I believe in product design that thinks big but acts simple. Experience builds experience.

---

## 👤 Les Utilisateurs / Personas

Retenues telles quelles (les trois cohabitent, elles ne s'additionnent pas — chaque section
parle d'abord à l'une) — à contester par le Talent si l'une ne se reconnaît pas dans le site :

- **H1 — Le pair qui orchestre des agents.** Lead produit ou designer confronté aux mêmes
  problèmes (sous-spécification, dérive d'agent, coût de tokens). C'est l'audience qui réagit
  aux posts. Il cherche une méthode réutilisable, pas une galerie.
- **H2 — Le décideur / recruteur.** Arrive par une recommandation ou une candidature. Il doit
  situer un profil rare en moins d'une minute : ni designer classique, ni ingénieur.
- **H3 — Le lecteur d'Obsolet.** Vient du contenu, veut savoir qui écrit et ce qu'il fabrique.

## 🎯 Jobs-to-be-done (JTBD)

- **H1** — Quand je conçois ou débogue un système multi-agents, je veux une méthode éprouvée par
  quelqu'un qui a fait le trajet design → agentique, pour ne pas réinventer les garde-fous seul.
- **H2** — Quand je dois situer un profil rare en moins d'une minute, je veux comprendre
  immédiatement ce qu'il fait et pourquoi ça compte, sans jargon à décoder.
- **H3** — Quand je découvre l'auteur d'Obsolet, je veux voir le lien entre ce qu'il écrit et ce
  qu'il fabrique, pour juger si sa pensée est cohérente avec sa pratique.

Trame commune : *« Quand je tombe sur ce profil, je veux comprendre par quel chemin il en est
arrivé là, pour juger si sa manière de penser m'est utile. »* Le trajet, pas le catalogue —
cf. `references/concept-explorateur-creatif.md`.

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
Un designer produit de 16 ans de métier qui a bifurqué vers l'orchestration agentique sans
perdre le jugement humain ni l'intention design — le trajet, ses détours compris, vaut mieux
qu'une grille de projets aboutis. *« Product design that thinks big but acts simple. »*

### Objectifs mesurables
Prise de contact qualifiée (mail/LinkedIn) · clic vers Obsolet (Substack) · mémorisation du
positionnement (qualitatif — testé par retour direct, pas un compteur).

---

## 🎨 Ce que l'utilisateur doit ressentir

**En arrivant (0–5s) :** que ce profil ne rentre dans aucune case existante — ni designer
classique, ni ingénieur — et que c'est délibéré, porté par 16 ans de métier, pas un pivot de
circonstance.
**En utilisant (5–60s) :** qu'il parcourt un trajet — designer produit devenu orchestrateur
d'agents — avec des étapes, des détours et des routes alternatives assumées, pas une ligne droite.
**En partant :** qu'il a envie de voler un artefact — une méthode, une phrase, un système — pas
seulement d'avoir vu du travail. *« Experience builds experience. »*

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
- Un CV en ligne — le trajet raconté prime sur la liste chronologique ; le CV reste sur LinkedIn

---

## 📐 Valeurs Produit (arbitrage RAY & BOB)

Déduites de sa propre production écrite — retenues telles quelles, à contester s'il ne s'y
reconnaît pas :

| Valeur | Ce que ça implique |
|---|---|
| `Le trajet plutôt que la vitrine` | on montre par où c'est passé, détours compris — pas une sélection lissée |
| `La contrainte est la mise au point` | le système visuel est étroit **par choix** ; l'élargir est un aveu, pas une liberté |
| `Rendre entrable` | *« une doc, ça laisse entrer »* — le visiteur doit pouvoir se servir sans parler à l'auteur |
| `L'artefact à voler` | chaque section laisse repartir avec quelque chose d'utilisable |

### Anti-patterns UX
Tirés de ses propres textes : la vitrine animée qui prouve le goût sans prouver l'usage ; le
jargon qui masque une sous-spécification ; le catalogue de projets sans thèse.
