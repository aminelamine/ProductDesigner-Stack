---
name: frontend-design
description: >
  Génère un brief esthétique avant toute implémentation UI.
  Commit sur une direction visuelle précise basée sur le contexte de la spec.
  BOB l'active automatiquement au début de chaque feature UI — avant la première ligne de CSS.
  Triggers : "bob", "implémente", "feature_[ID]", toute implémentation UI Next.js.
---

# Frontend Design — Brief Esthétique

> Ce skill s'active automatiquement quand BOB démarre l'implémentation d'une feature UI.
> Son rôle : établir une **direction esthétique claire et commitée** AVANT d'écrire la première ligne de code.
> Durée estimée : 2–3 minutes. Économise 30–60 minutes de rework.
>
> **Terminologie** : le gate BOB s'appelle **Quality Brief** (ombrelle — voir `quality_brief_type`
> dans `STACK.md` : aesthetic | performance | content | architecture). Quand
> `quality_brief_type: aesthetic` — le cas par défaut — le Quality Brief prend la forme du
> **Brief Esthétique** décrit ici (5 dimensions).

---

## Philosophie

Un bon frontend ne commence pas par du code — il commence par une **intention**.
L'intention doit être spécifique, mémorisable, et cohérente avec le contexte produit.

**Règle cardinale : "Match implementation complexity to aesthetic vision."**
Un design maximaliste mérite un code élaboré.
Un design minimaliste exige de la précision typographique, pas plus.
L'élégance vient de l'exécution fidèle à la vision — pas de l'accumulation de détails.

---

## Protocole d'activation (BOB l'exécute avant toute implémentation UI)

### Étape 1 — Lire le contexte

Lire dans cet ordre :

1. `agent-system/specs/feature_[ID].md` → extraire : type de feature, tone, audience, complexité UI, critères visuels
2. `agent-system/context/design_guide.md` → une direction esthétique est-elle déjà définie pour ce projet ?
3. `agent-system/resources/visual_reference.md` → identifier les candidats palette + font pairing

> Si `design_guide.md` a déjà une direction définie et validée → aller directement à l'Étape 3 (résumer l'alignement, ne pas réinventer).
>
> **Mode junior (proposition guidée)** : si `STACK.md → user_level: junior` (ou si l'utilisateur n'a
> pas de direction en tête), ne pars pas du catalogue brut. Ouvre
> `agent-system/resources/aesthetic_directions.md` et propose **2-3 directions complètes et
> pré-argumentées** (« choisis si / évite si / compromis ») filtrées par le type de produit, avec une
> reco. Le junior choisit entre des options cohérentes plutôt que d'assembler lui-même.

---

### Étape 2 — Positionnement esthétique (si pas encore défini)

Définir les **5 dimensions** en confrontant chaque choix au contexte réel de la spec :

**1. Direction globale**
Quelle intention en 1 phrase ? Elle doit être spécifique et mémorable.
- ✅ "Typographie-driven, chaud, éditorial — comme un magazine de design"
- ✅ "Dark CLI terminal, honnête et technique — zéro ornement"
- ✅ "Bold startup energy, tensions graphiques fortes, optimiste"
- ❌ "Minimaliste et moderne" → trop générique, recommencer

**2. Typographie**
Choisir 1 pairing depuis `visual_reference.md`. Justifier en 5 mots max.
- Aligner le registre du pairing avec la direction globale
- Préférer les pairings à **haute tension** : serif/sans, display/mono, variable font sur les poids extrêmes
- Interdits sans justification contextuelle forte : Inter seul, Roboto, Arial, system fonts

**3. Palette**
Choisir 1 système depuis `visual_reference.md`. Configurer les tokens CSS variables.
- La palette doit **raconter la même histoire** que la typo
- Éviter la tentation du violet-dégradé sur blanc : c'est le "AI default"
- Préférer : dominant fort + accent tranchant + fond cohérent

**4. Tension visuelle**
Quelle opposition crée l'intérêt et évite le template ?
- Bold heading / body ultra-léger
- Dark background / accent lumineux
- Serif expressif / sans neutre
- Densité forte dans 1 zone / espace blanc généreux ailleurs

**5. Composition spatiale**
Comment l'espace est organisé — ce qui différencie du "layout classique" :
- Asymétrie assumée (grilles non-centrées)
- Overlap de blocs (cartes qui se chevauchent)
- Typographie seule comme design (pas de background trick)
- Bento grid (proportions variées, pas toutes identiques)
- Full-bleed sections avec coupures nettes
- Scroll-triggered reveals (staggered animation-delay)

---

### Étape 3 — Brief Esthétique (sortie standardisée)

BOB produit ce bloc et **le présente au Talent avant de coder**.
C'est un **contrat visuel**, pas un résumé. BOB s'arrête ici et attend une réponse explicite.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[BRIEF ESTHÉTIQUE — Feature [ID] : [Nom]]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Direction    : [1 phrase — l'intention spécifique]

🔤 Typographie  : [Heading font] / [Body font]
                  → [raison en 5 mots]
                  → @import : [URL Google Fonts ou source Fontshare]

🎨 Palette      : [Référence visual_reference.md]
                  Primary : [hex] · Accent : [hex] · BG : [hex]

⚡ Tension      : [opposition choisie — ex: "serif expressif / sans neutre"]

📐 Composition  : [approche spatiale — ex: "bento asymétrique + stagger reveal"]

⚠️  Éviter ici  : [2–3 patterns génériques spécifiques à ce contexte]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Validez en 1 ligne ou indiquez vos ajustements.
```

> **[BOB] ⏸ En attente de validation du brief — je ne commence pas l'implémentation avant ta confirmation.**
>
> Le Talent répond "ok" ou ajuste 1–2 points. Ce gate est un point de non-retour :
> une fois validé, la direction est engagée et tous les choix de code en découleront.
> Corriger une direction après le code coûte 10× plus cher qu'ici.

---

### Étape 4 — Ancrer dans le code (après validation)

Une fois le brief validé par le Talent :

1. **CSS Variables** — Configurer `:root` dans `globals.css` avec les tokens du brief
2. **Fonts** — Loader via `next/font` (préféré) ou `@import` dans `layout.tsx` (fallback)
3. **Documenter** — Si les choix ne sont pas encore dans `design_guide.md`, les y ajouter maintenant

```css
/* Exemple de structure :root attendue */
:root {
  --color-primary: [hex];
  --color-accent: [hex];
  --color-bg: [hex];
  --font-heading: '[Heading font]', serif; /* ou sans-serif */
  --font-body: '[Body font]', sans-serif;
}
```

---

## Règles invariantes

- **Ne jamais sauter le brief** pour "gagner du temps" — c'est lui qui économise les reworks UI
- **Ne jamais recycler** un brief d'une feature précédente sans le confronter au nouveau contexte
- **Ne jamais choisir** un pairing ou une palette sans le justifier par le contexte spec
- **Si design_guide.md a déjà une direction** → résumer en 1 ligne l'alignement, confirmer et passer
- **Le brief doit être spécifique** : "typographie-driven éditorial" > "minimaliste et moderne"
- **Toujours présenter le brief au Talent** avant d'implémenter — même si le choix semble évident

---

## Exemple de brief validé

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[BRIEF ESTHÉTIQUE — Feature 003 : Section Manifeste]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Direction    : Hauntologie éditoriale — typographie comme seul design,
                  chaleur du papier, temporalité floue entre passé et futur

🔤 Typographie  : Fraunces (italic 300, bold 700) / DM Sans (400, 500)
                  → contraste organique serif / clean sans
                  → @import : fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,700;1,300&family=DM+Sans

🎨 Palette      : Blog / Newsletter (visual_reference.md)
                  Primary : #1C1917 · Accent : #DC2626 · BG : #FFFBF7

⚡ Tension      : Fraunces italic léger (300) / DM Sans medium (500) — poids extrêmes

📐 Composition  : Typographie seule — pas de background trick, colonnes asymétriques,
                  stagger reveal sur les paragraphes (animation-delay 100ms par bloc)

⚠️  Éviter ici  : Cards avec border-radius, purple gradients, grid uniforme
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Validez en 1 ligne ou indiquez vos ajustements.
```
