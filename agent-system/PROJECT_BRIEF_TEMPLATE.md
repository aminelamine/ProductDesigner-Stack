# 📋 Project Brief — [Nom du Projet]

> **Ce document est le point d'entrée unique de l'AgentStack V2.**
> Remplis-le AVANT la première session `/jo`. Il alimente directement les 3 fichiers de contexte des agents.
>
> **Flux de données :**
> ```
> Ce brief  →  client_vision.md   (lu par JO avant chaque spec · par DO en simulation)
>           →  roadmap.md         (lu par JO avant chaque spec)
>           →  design_guide.md    (lu par BOB avant chaque implémentation · par DO en évaluation)
> ```
>
> ⏱️ **Temps estimé : 45–90 minutes.**
> Un brief incomplet produit des specs correctement formulées mais mal dirigées.
> Investi ici, récupéré partout — à chaque spec JO, chaque brief BOB, chaque verdict DO.

---

## 🗂️ Méta

| Champ | Valeur |
|---|---|
| **Nom du projet** | `[À COMPLÉTER]` |
| **Date de création** | `[YYYY-MM-DD]` |
| **Auteur (Le Talent)** | `[Ton prénom — tu es le décideur final]` |
| **Type de projet** | `[ ] Produit interne  [ ] Produit client  [ ] Projet perso  [ ] Prototype/POC` |
| **Horizon MVP** | `[ex : 3 semaines / 1 mois / indéfini]` |
| **Statut** | `[ ] DRAFT  [ ] VALIDÉ — prêt pour /jo` |

---

## §1 · Vision

> ⚡ **Remplir en priorité absolue.** C'est la boussole de JO pour chaque spec et de DO pour chaque verdict.

### 1.1 — Résumé produit `→ client_vision.md`

> 2–3 phrases. Quoi ? Pour qui ? Quel problème ça résout ?
> Contrainte : si tu ne peux pas le formuler sans jargon, le projet n'est pas encore assez cadré.

```
[À COMPLÉTER]

ex : "Une app qui permet aux freelances créatifs de tracker leurs projets et envoyer des factures
sans quitter leur environnement de travail. Pour les designers et développeurs solo qui perdent
du temps à jongler entre Notion, Stripe et leur banque."
```

### 1.2 — Proposition de valeur en une phrase

> Format : *"En arrivant sur [produit], l'utilisateur comprend immédiatement [différenciation]
> — il est face à [positionnement unique]."*
> Contrainte : pas de virgule. Une seule idée.

```
[À COMPLÉTER]
```

### 1.3 — Pourquoi maintenant ?

> Quel contexte, tension ou opportunité rend ce projet pertinent en ce moment précis ?
> ex : *"Les SaaS de facturation sont soit trop lourds pour un solo, soit trop limités. Le marché
> freelance explose post-COVID et personne ne parle leur langage."*

```
[À COMPLÉTER]
```

### 1.4 — Définition du succès à 3 mois

> Si le projet est un succès dans 3 mois, qu'est-ce qui s'est passé concrètement ?
> Pas de métriques ici — des situations réelles.
> ex : *"Un freelance m'a contacté pour dire qu'il a arrêté d'utiliser Notion pour ses projets."*

```
[À COMPLÉTER]
```

---

## §2 · Utilisateurs & JTBD `→ client_vision.md`

> **Règle : 1 à 3 personas maximum.** Au-delà, le produit ne sait plus pour qui il est.
> Pour chaque persona : 4 champs + 1 JTBD formulé à la première personne.
> JO utilisera ces JTBD pour ancrer chaque user story. DO les utilisera pour simuler les comportements.

### Persona 1 — [Nom ou archétype]

| Champ | Valeur |
|---|---|
| **Profil** | `[Rôle, contexte, séniorité — sois spécifique, évite "les utilisateurs"]` |
| **Comportement clé** | `[Ce qu'il fait dans le monde réel avant d'arriver sur ton produit]` |
| **Stack mentale** | `[Ce qu'il cherche vraiment — pas ce qu'il dit chercher]` |
| **Risque d'échec** | `[Ce qui le fait partir sans convertir]` |

**JTBD :** *"Quand [situation déclenchante], je veux [action/motivation], pour [résultat attendu]."*
```
[À COMPLÉTER]
```

---

### Persona 2 — [Nom ou archétype] *(supprimer si non applicable)*

| Champ | Valeur |
|---|---|
| **Profil** | `[...]` |
| **Comportement clé** | `[...]` |
| **Stack mentale** | `[...]` |
| **Risque d'échec** | `[...]` |

**JTBD :** *"Quand [...], je veux [...], pour [...]."*
```
[À COMPLÉTER]
```

---

### Persona 3 — [Nom ou archétype] *(supprimer si non applicable)*

| Champ | Valeur |
|---|---|
| **Profil** | `[...]` |
| **Comportement clé** | `[...]` |
| **Stack mentale** | `[...]` |
| **Risque d'échec** | `[...]` |

**JTBD :** *"Quand [...], je veux [...], pour [...]."*
```
[À COMPLÉTER]
```

---

## §3 · Valeurs Produit & Anti-patterns UX `→ client_vision.md`

> Cette section définit l'identité du produit. JO s'y réfère pour arbitrer les edge cases de specs.
> DO déduira des points pour toute violation dans le code de BOB.

### 3.1 — Valeurs produit

> 3–5 mots ou principes qui définissent l'identité du produit.
> Chaque valeur doit être opérationnelle : elle doit permettre de trancher un choix de design.

```
- [Valeur 1] — ex : "Vitesse sur la complétude" (plutôt que l'exhaustivité)
- [Valeur 2] — ex : "Honnêteté, zéro dark pattern"
- [Valeur 3] — ex : [À COMPLÉTER]
```

### 3.2 — Anti-patterns UX (explicites)

> Comportements, esthétiques ou patterns interdits pour ce produit.
> JO flag toute spec qui les contredit. DO déduira des points pour toute présence dans le code.

```
- [Anti-pattern 1] — ex : "Pas de modal sur modal"
- [Anti-pattern 2] — ex : "Zéro gamification ou dark pattern d'engagement"
- [Anti-pattern 3] — ex : [À COMPLÉTER]
```

---

## §4 · Périmètre & Roadmap `→ roadmap.md`

> **Section la plus sous-estimée.** Les "out of scope" explicites sont aussi importants que les features.
> JO refusera toute spec qui contredit les décisions de non-périmètre — sauf escalade explicite du Talent.

### 4.1 — North Star

> La métrique unique ou l'outcome qui définit le succès pour cette phase.
> ex : *"50 freelances actifs à la fin du MVP (session ≥ 1/semaine)"*

```
[À COMPLÉTER]
```

### 4.2 — Features MVP — In Scope ✅

> Ce qui doit exister au lancement. JO ne spec que ce qui est listé ici.

| # | Feature | Valeur pour qui | Priorité | KPI |
|---|---|---|---|---|
| F-001 | `[Nom]` | `[Persona]` | `P0 — bloquant` | `[Métrique]` |
| F-002 | `[Nom]` | `[...]` | `P1 — important` | `[Métrique]` |
| F-003 | `[Nom]` | `[...]` | `P2 — nice-to-have` | `[Métrique]` |

> **P0** = bloquant pour le lancement · **P1** = important mais contournable · **P2** = nice-to-have

### 4.3 — Post-MVP *(capturé, pas committé)*

```
[Liste libre de features envisagées après le MVP]
JO ne spec aucune de ces features avant que le MVP soit validé en production.
```

### 4.4 — Out of Scope ❌ *(décisions actées)*

> Ce que le produit NE SERA PAS. JO refuse toute spec allant à l'encontre de ces décisions.

| Feature ou direction écartée | Raison |
|---|---|
| `[Feature]` | `[ex : "Contredit le positionnement / Hors contrainte technique / Post-MVP uniquement"]` |
| `[...]` | `[...]` |

---

## §5 · KPIs `→ roadmap.md`

> Sans KPIs, DO ne peut pas évaluer si une feature sert les objectifs.
> Format : métrique mesurable + cible + méthode de mesure.

| KPI | Baseline | Cible | Comment mesurer |
|---|---|---|---|
| `[ex : Taux de complétion du premier projet]` | `Non mesuré` | `[> 60%]` | `[Analytics Plausible]` |
| `[ex : Temps moyen pour envoyer une facture]` | `Non mesuré` | `[< 3 minutes]` | `[Mesure session]` |
| `[ex : Taux de rétention semaine 2]` | `Non mesuré` | `[> 40%]` | `[Comptage manuel]` |

---

## §6 · Contraintes `→ client_vision.md`

> Données non-négociables. Elles bornent chaque spec de JO et chaque verdict de DO.

### 6.1 — Contraintes techniques

```
[ ] Solo builder — architecture conservatrice, zéro over-engineering
[ ] Contrainte d'infra : [ex : Vercel free / pas de BDD relationnelle / edge only]
[ ] Pas d'auth en MVP
[ ] Stack imposée : Next.js 15 App Router · TypeScript strict · Tailwind 4.x · Shadcn/ui
[ ] Autre : [...]
```

### 6.2 — Contraintes de temps & organisation

| Champ | Valeur |
|---|---|
| **Délai MVP** | `[ex : 4 semaines]` |
| **Équipe** | `[ex : solo / 2 devs + 1 PD]` |
| **Disponibilité** | `[ex : 2 jours/semaine]` |
| **Deadline externe** | `[ex : démo client le [date] / lancement le [date]]` |

### 6.3 — Contraintes légales & compliance

```
[ ] RGPD — pas de tracking publicitaire, analytics minimaliste (Plausible ou rien)
[ ] Données sensibles : [préciser si applicable — santé, finance, mineurs...]
[ ] Accessibilité : niveau cible [WCAG A / AA / AAA]
[ ] Autre : [...]
```

---

## §7 · Direction Design & Esthétique `→ design_guide.md`

> ⚠️ **BOB Gate — section critique.**
> BOB lit cette section pour générer son Brief Esthétique avant la première ligne de CSS.
> Il s'arrête et attend ton "ok" explicite. Zéro code avant validation.
> Corriger une direction esthétique après implémentation coûte 10× plus cher qu'ici.

### 7.1 — Direction visuelle (1 phrase)

> La direction esthétique committée. BOB ne dévie pas sans validation explicite du Talent.
> ex : *"Dark éditorial, tension typographique, accents chauds — l'outil honnête qui ne cherche pas à plaire."*

```
[À COMPLÉTER]
```

### 7.2 — Les 3 mots de l'esthétique

> Ces mots guident BOB quand la spec est ambiguë. Sois précis : "minimal" n'est pas un mot.
> ex : `Sobre · Éditorial · Systémique` ou `Dense · Tactile · Autoritaire`
>
> 💡 **Pas d'inspiration ?** Consulte `agent-system/resources/visual_reference.md`
> pour identifier le registre qui correspond à ton produit :
> Minimalisme éditorial · Flat couleurs franches · Neubrutalism · Dark mode first ·
> Glassmorphism · Bento Grid · Typographie seule

```
[Mot 1] · [Mot 2] · [Mot 3]
```

### 7.3 — Ce que l'utilisateur doit ressentir

| Moment | Émotion cible |
|---|---|
| **Arrivée (0–5 secondes)** | `[ex : "Je suis au bon endroit — c'est fait pour moi"]` |
| **Exploration (5–60 secondes)** | `[ex : "C'est rapide et ça ne me met pas de bâtons dans les roues"]` |
| **Départ** | `[ex : "Je vais revenir" / "Je vais en parler"]` |

### 7.4 — Références visuelles *(2–3 max)*

> Ce que tu veux retenir spécifiquement — pas juste le style général.

| Référence | Ce que j'en retiens |
|---|---|
| `[URL ou nom du produit]` | `[ex : "La densité d'info de leur dashboard — pas le style"]` |
| `[URL ou nom]` | `[...]` |
| `[URL ou nom]` | `[...]` |

---

## §8 · Stack UI `→ design_guide.md`

> Ce qui est défini ici devient une règle invariante pour BOB.
> DO déduira des points pour toute déviation non justifiée.

### 8.1 — Typographie

> Font pairing. Justifie en 5 mots max.

| Rôle | Font | Graisse | Justification |
|---|---|---|---|
| Display / Heading | `[ex : Geist Sans]` | `[ex : 700, 900]` | `[5 mots max]` |
| Body | `[ex : Geist Sans]` | `[ex : 400, 500]` | `[5 mots max]` |
| Mono *(optionnel)* | `[ex : Geist Mono]` | `[ex : 400]` | `[5 mots max]` |

Import : `[Google Fonts URL / Fontshare / Next.js built-in]`

### 8.2 — Tokens couleur

> Définis tes variables CSS ici. BOB n'utilise jamais de valeurs hex hardcodées dans les composants.

```css
:root {
  --color-bg:        [hex];   /* Fond principal */
  --color-surface:   [hex];   /* Cards, panneaux */
  --color-border:    [hex];   /* Bordures, séparateurs */
  --color-primary:   [hex];   /* Actions principales, CTAs */
  --color-accent:    [hex];   /* Highlights, hover states */
  --color-text:      [hex];   /* Texte primaire */
  --color-muted:     [hex];   /* Texte secondaire — vérifier contraste WCAG AA */
}
```

Dark mode : `[ ] Activé dès le MVP  [ ] Post-MVP  [ ] Non prévu`

### 8.3 — Composants Shadcn/ui validés

> BOB installe uniquement ces composants sans validation du Talent.
> Toute addition → JO crée un ADR avant implémentation.

```bash
# À compléter selon les besoins réels du projet :
npx shadcn@latest add button badge card separator
npx shadcn@latest add input textarea label form
npx shadcn@latest add sheet dialog tooltip
npx shadcn@latest add sonner skeleton
# [Ajouter / retirer selon les features du §4.2]
```

> ⚠️ Règle invariante : ne jamais modifier `/components/ui/` — Shadcn en est propriétaire.

### 8.4 — Motion level par défaut

> Le motion level est une décision de spec (JO), pas de code (BOB).
> En l'absence de `motion_level` dans une spec → BOB applique **L0** sans exception.

| Level | Définition | Quand l'utiliser |
|---|---|---|
| **L0** | Aucune animation | **Défaut** — toutes les features sauf mention contraire |
| **L1** | Transitions CSS uniquement (≤ 200ms) | Hover states, reveals subtils |
| **L2** | CSS keyframes + Tailwind animate | Reveals au load, contenu staggeré |
| **L3** | Librairie motion (ex : Motion/React) | Animations hero, séquences complexes — **validation JO obligatoire** |

```
Motion level par défaut pour ce projet : [L0 recommandé]
```

### 8.5 — Conventions de layout

```
Grille    : [ex : 12 colonnes, gap 24px, max-w-7xl]
Spacing   : [ex : Tailwind default — base 4px]
Radius    : [ex : rounded-lg (8px) cards · rounded-full pills]
Shadows   : [ex : shadow-sm uniquement — pas de drop shadows lourds]
```

---

## §9 · Ce que ce produit N'EST PAS `→ client_vision.md + roadmap.md`

> Section souvent oubliée — la plus utile pour éviter les dérives de JO et les specs hors-sol.
> JO refuse toute spec qui contredit cette liste sans escalade explicite du Talent.
> **Minimum 3 items.** Formuler avec la raison stratégique.

```
❌ [Ce que ce produit n'est pas] — parce que [raison stratégique]
❌ [...]
❌ [...]

ex :
❌ Un outil de gestion de projet complet — parce que Notion et Linear existent déjà,
   la valeur est dans la simplicité du premier usage
❌ Une plateforme sociale — parce que le modèle de valeur repose sur l'utilité solo, pas le réseau
❌ Un outil enterprise — parce que la stack solo-builder impose des contraintes d'auth et de
   multi-tenant qu'on ne peut pas adresser en MVP
```

---

## §10 · Questions ouvertes `→ roadmap.md (decisions log)`

> Ce qui n'est pas encore décidé et devra être arbitré avant ou pendant le projet.

| Question | Urgence | Décideur | Date limite |
|---|---|---|---|
| `[ex : Faut-il un CMS dès le MVP ?]` | `[ ] Bloquante  [ ] Importante  [ ] Nice-to-have` | `[Talent / JO]` | `[YYYY-MM-DD ou "avant F-001"]` |
| `[...]` | `[...]` | `[...]` | `[...]` |

---

## ✅ Checklist de validation — prêt pour `/jo` ?

> Toutes les cases cochées = brief validé. Passe le statut méta à `VALIDÉ — prêt pour /jo`.

**§1 · Vision**
- [ ] Le résumé produit (§1.1) tient en 2–3 phrases sans jargon
- [ ] La proposition de valeur (§1.2) tient en une phrase sans virgule
- [ ] Le "pourquoi maintenant" est formulé avec une tension réelle

**§2 · Utilisateurs**
- [ ] Chaque persona a un JTBD formulé à la première personne
- [ ] Le "risque d'échec" est identifié pour chaque persona

**§3 · Valeurs & Anti-patterns**
- [ ] Au moins 3 valeurs produit sont définies et opérationnelles
- [ ] Au moins 3 anti-patterns UX sont explicités

**§4–5 · Périmètre & KPIs**
- [ ] Le North Star est formulé (1 métrique ou 1 outcome clair)
- [ ] Les features MVP sont priorisées (P0 / P1 / P2) avec leur KPI
- [ ] Au moins 3 décisions "out of scope" sont actées
- [ ] Au moins 2 KPIs mesurables sont définis

**§6 · Contraintes**
- [ ] Les contraintes techniques bloquantes sont documentées
- [ ] Le délai MVP et la disponibilité sont définis

**§7–8 · Design**
- [ ] La direction visuelle (§7.1) est formulée en 1 phrase engagée
- [ ] Les 3 mots esthétiques (§7.2) sont définis — BOB s'en sert pour son Brief Esthétique
- [ ] Les tokens couleur (§8.2) sont définis avec leurs variables CSS
- [ ] Le motion level par défaut est acté

**§9 · Ce que ce produit N'EST PAS**
- [ ] Au moins 3 items avec leur raison stratégique

**Statut final**
- [ ] Le statut du brief (méta) est passé à `VALIDÉ — prêt pour /jo`
- [ ] Les 3 fichiers de contexte ont été mis à jour depuis ce brief

---

## 🔁 Propager ce brief vers les 3 fichiers de contexte

Une fois validé, mets à jour les 3 fichiers — ou demande à Claude de le faire :

```
"À partir du brief complété dans agent-system/PROJECT_BRIEF_TEMPLATE.md,
 mets à jour les 3 fichiers de contexte :
 agent-system/context/client_vision.md
 agent-system/context/roadmap.md
 agent-system/context/design_guide.md"
```

| Section du brief | → Fichier cible | Section cible |
|---|---|---|
| §1.1 Résumé produit | `client_vision.md` | Product summary |
| §2 Personas + JTBD | `client_vision.md` | Target users + Jobs To Be Done |
| §3 Valeurs + anti-patterns UX | `client_vision.md` | Product values + Anti-patterns |
| §6 Contraintes | `client_vision.md` | Known constraints |
| §9 Ce que ce produit n'est pas | `client_vision.md` | Anti-patterns (complément) |
| §4.1 North Star | `roadmap.md` | North Star |
| §4.2 Features MVP | `roadmap.md` | Features — In Scope |
| §4.4 Out of scope | `roadmap.md` | Features — Out of Scope |
| §5 KPIs | `roadmap.md` | (colonne KPI de chaque feature row) |
| §10 Questions ouvertes | `roadmap.md` | Decisions log |
| §7 Direction visuelle + ressentis | `design_guide.md` | Visual direction |
| §8.1 Typographie | `design_guide.md` | Typography |
| §8.2 Tokens couleur | `design_guide.md` | Color tokens |
| §8.3 Composants Shadcn | `design_guide.md` | Allowed Shadcn/ui components |
| §8.4 Motion level | `design_guide.md` | Motion levels |
| §8.5 Conventions de layout | `design_guide.md` | Layout conventions |

---

## 📝 Changelog

| Date | Changement | Par |
|---|---|---|
| `[YYYY-MM-DD]` | Création initiale | `[Le Talent]` |
