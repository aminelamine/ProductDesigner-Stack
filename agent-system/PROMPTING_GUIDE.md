# 🧭 Guide de Prompting — Bien démarrer avec AgentStack V2

> **Pour qui :** Product Designers qui utilisent la stack pour la première fois.
> Pas besoin de savoir coder. Pas besoin de connaître Claude Code en profondeur.
> Ce guide te donne les bons réflexes pour obtenir des résultats dès la première session.

---

## Ce que tu as entre les mains

AgentStack V2 est un système de **trois agents spécialisés** qui travaillent ensemble pour transformer tes idées produit en code Next.js livrable.

Chaque agent a une mission précise et un comportement prévisible. Tu n'as pas à tout expliquer à chaque fois — ils lisent le contexte que tu as rempli dans les 3 fichiers (`client_vision.md`, `roadmap.md`, `design_guide.md`).

L'analogie qui tient : **tu es le directeur artistique. Eux sont ton studio.**
- Tu briefs, tu valides, tu tranches.
- Eux challengent, proposent, exécutent, évaluent.

---

## Les 3 agents en 30 secondes

| Agent | Commande | Rôle | Ce qu'il produit |
|---|---|---|---|
| **JO** | `/jo` | Architecte & Strategist | Il challenge ton idée, puis génère une spec technique |
| **BOB** | `/bob` | Builder & UI/UX | Il code ta feature, après avoir validé la direction visuelle avec toi |
| **DO** | `/do` | Product QA & Juge | Il évalue le code de BOB sur 20 points et écrit les leçons |

> **Règle d'or :** On ne passe jamais une étape.
> JO avant BOB. BOB avant DO. Toujours.

---

## Le workflow complet — De l'idée au code livré

### Étape 1 — Tu as une idée → tu la soumet à JO

```
/jo j'ai une idée : [décris ton idée brièvement, sans sur-expliquer]
```

**Ce qui se passe :** JO lit tes fichiers de contexte, reformule le problème, puis te pose 3 questions pour challenger ton hypothèse.

> **Ce n'est pas du blocage — c'est de la valeur.**
> Les questions de JO révèlent les edge cases que tu n'as pas vus.
> Réponds-y honnêtement. Si tu n'as pas la réponse, dis-le.

---

### Étape 2 — JO challenge → tu réponds, tu tranches

JO va te demander des choses comme :
- "Ce cas d'usage couvre-t-il aussi [persona X] ou uniquement [persona Y] ?"
- "Cette feature contredit la décision out-of-scope F-003 — tu veux escalader ?"
- "Quelle est la définition de 'done' pour cette feature ?"

**Ta posture ici :** répondre clairement. JO ne peut pas deviner tes intentions — il travaille avec ce que tu lui donnes.

Une fois que tu as répondu, dis :

```
/jo go, génère la spec
```

---

### Étape 3 — JO génère la spec → tu la valides

JO produit un fichier `specs/feature_[ID]_[nom].md`. Lis-le.

**Ce que tu cherches en lisant :**
- Les user stories reflètent bien ce que tu voulais
- Les critères d'acceptation sont binaires (on peut dire OUI ou NON)
- Rien ne contredit ce que tu as mis dans ton brief

Si quelque chose cloche : dis-le à JO. Il corrige.

Si c'est bon : **dis "validé" explicitement.** Sans ce mot, BOB ne démarre pas.

```
Validé. BOB peut démarrer sur feature_[ID].
```

---

### Étape 4 — BOB démarre → il te présente un brief esthétique

```
/bob implémente feature_[ID] — spec dans agent-system/specs/feature_[ID]_[nom].md
```

**⚠️ BOB s'arrête avant de coder.** Il te présente un brief en 5 dimensions :

1. **Direction** — L'intention visuelle générale
2. **Typographie** — Ce qu'il va utiliser et pourquoi
3. **Palette** — Les couleurs et leur rôle
4. **Tension** — Le contraste, la densité, l'espace
5. **Composition** — La structure de la page

Lis ce brief. C'est ta dernière chance de réorienter avant que le code soit écrit.

**Si c'est bon :**
```
ok, go
```

**Si tu veux ajuster :**
```
La direction est bonne mais la palette est trop froide — je veux des accents plus chauds.
```

BOB intègre et re-propose. Quand tu dis "ok", il code.

---

### Étape 5 — BOB code → il livre

BOB travaille en 6 étapes internes (Structure → Scaffold → Core Logic → UI → États → Polish). Tu n'as pas besoin de l'interrompre.

Il te livre le code avec un rapport de conformance auto-évalué. Lis le rapport — il te dit ce qu'il a fait et ce qu'il a assumé.

---

### Étape 6 — DO évalue → verdict + leçons

```
/do évalue feature_[ID] — code dans /app/[feature] et /components/[feature]
```

DO score le travail de BOB sur **4 dimensions** pour un total de **20 points** :

| Dimension | Ce qu'elle mesure |
|---|---|
| **Conformance spec** | Le code fait exactement ce que la spec demande |
| **Qualité UX** | L'expérience répond aux JTBD des personas |
| **Qualité code** | TypeScript strict, composants propres, pas de dette |
| **Design system** | Respect des tokens, des composants validés, de la philosophie |

**Lecture du verdict :**

| Score | Verdict | Ce qui se passe |
|---|---|---|
| **≥ 18/20** | ✅ VALIDÉ | Feature livrée. DO écrit les leçons. |
| **14–17/20** | ⚠️ Réserves | BOB corrige les points signalés. |
| **10–13/20** | ❌ REJETÉ | BOB rework. DO a listé ce qui bloque. |
| **< 10/20** | 🚨 Re-spec | JO reprend depuis la spec. |

> **La Learnings Loop :** DO écrit toujours un fichier de leçons après son verdict.
> JO lit ces leçons avant sa prochaine spec. **Le système s'améliore à chaque feature.**

---

## Parler à JO — l'Architecte

### Quand l'appeler
- Quand tu as une idée, même floue
- Quand tu veux challenger une hypothèse produit
- Quand tu dois décider si une feature entre dans le scope ou pas

### Le bon format de démarrage

```
/jo j'ai une idée : [1–3 phrases décrivant le problème ou la feature]
```

**Ce qui fait une bonne soumission à JO :**
- Tu décris un problème ou une intention, pas une solution technique
- Tu mentions le persona concerné si tu le sais
- Tu signales les contraintes que tu as en tête

**Exemple — prompt efficace :**
```
/jo j'ai une idée : les designers abandonnent leur review Figma à mi-chemin
parce qu'ils perdent le fil de quels feedbacks ont été traités.
Je veux une vue consolidée de tous les feedbacks ouverts, triés par statut.
Persona principale : Selin.
```

**Exemple — prompt trop vague :**
```
/jo j'ai une idée : une page de dashboard
```

> JO peut travailler avec peu — mais plus tu lui donnes de contexte sur le *problème*,
> moins il va te poser de questions bloquantes au départ.

### La bonne posture face au challenge

JO va te pousser. C'est son travail. Quelques postures à éviter :

| Ce que tu fais | Ce que JO interprète | Mieux |
|---|---|---|
| "Fais juste ce que j'ai dit" | Contournement du process → il obéit mais sans garantie de qualité | Réponds à ses questions, même vite |
| "Je veux tout dans une seule feature" | Scope trop large → spec impossible à tenir | Découpe : une feature = un JTBD |
| Tu ignores ses questions ouvertes | JO assume → le risque passe dans la spec sans que tu le saches | Dis "je ne sais pas encore" plutôt que rien |

---

## Parler à BOB — le Builder

### Quand l'appeler
Uniquement quand la spec est **VALIDÉE TALENT**. Pas avant.

### Le déclencheur

```
/bob implémente feature_[ID] — spec dans agent-system/specs/feature_[ID]_[nom].md
```

### Le BOB Gate — ne jamais le sauter

BOB te présentera toujours un brief esthétique avant de coder. Ce gate existe pour une raison simple : corriger une direction visuelle après implémentation coûte 10× plus cher qu'ici.

**Comment valider le brief :**
- Lis les 5 dimensions (Direction · Typo · Palette · Tension · Composition)
- Si tu vois quelque chose qui ne correspond pas à la vision du brief → corrige maintenant
- Si tout est aligné → dis "ok, go" clairement

**Comment formuler une correction :**
```
La direction et la typo sont bonnes. Mais la palette est trop neutre —
je veux que la couleur primaire soit plus affirmée, moins grisée.
Le produit doit feel "outil professionnel", pas "app minimaliste lifestyle".
```

> Tu n'as pas besoin d'utiliser des termes techniques de design.
> BOB comprend le registre sémantique (chaleur, tension, densité, rigueur...).

### Ce que tu ne dois pas faire avec BOB

```
❌ /bob fais quelque chose de joli
❌ /bob tu peux améliorer l'UI de la feature 2 ?  ← sans spec
❌ /bob change la couleur du bouton  ← sans passer par une spec de correction
```

> BOB sans spec = BOB qui invente. Et l'inventé ne passe pas DO.

---

## Parler à DO — le Juge

### Quand l'appeler
Quand BOB a livré et que tu veux un verdict objectif.

### Le déclencheur

```
/do évalue feature_[ID] — code dans /app/[feature] et /components/[feature]
```

### Comment lire le verdict

DO te donne :
1. Un **score /20** avec le détail par dimension
2. Un **verdict** (VALIDÉ / Réserves / REJETÉ / Re-spec)
3. Des **feedbacks actionnables** — ce qui a raté, et pourquoi
4. Des **leçons** écrites dans `agent-system/learnings/`

**Ce que tu fais selon le verdict :**

- **VALIDÉ ≥ 18 :** Feature terminée. Tu peux démarrer la suivante avec `/jo`.
- **Réserves 14–17 :** Passe les feedbacks de DO à BOB : `/bob corrige les points DO sur feature_[ID]`
- **REJETÉ < 14 :** Passe le rapport complet à BOB pour rework.
- **Re-spec < 10 :** Reprends avec JO. La spec était le problème, pas le code.

---

## Anatomie d'un bon prompt

Tout prompt efficace dans cette stack repose sur **4 ingrédients** :

### 1 — L'agent ciblé (explicite)
Commence toujours par `/jo`, `/bob` ou `/do`.
Sans ça, le modèle peut répondre en mode générique — sans charger le bon agent.

### 2 — Le contexte minimal
Ce que tu sais déjà, ce qui est important pour ce prompt précis.
Pas besoin de répéter ce qui est dans les fichiers de contexte — JO et BOB les lisent automatiquement.
Donne uniquement ce qui est **différent** ou **nouveau**.

### 3 — L'intention claire
Ce que tu veux obtenir comme output.
Pas "fais quelque chose", mais "génère la spec", "implémente la feature", "évalue le code".

### 4 — Les contraintes actives
Quelles règles s'appliquent ici ? Persona concernée ? Scope limité ?
Si tu as une contrainte que les fichiers de contexte ne couvrent pas encore → dis-la ici.

---

### Exemples annotés

**Prompt ❌ qui échoue :**
```
/bob améliore l'interface
```
- Pas d'agent clair ✓ (il y en a un mais...)
- Pas de contexte → BOB ne sait pas quelle interface
- Intention floue → "améliore" ne veut rien dire sans critère
- Pas de contrainte → BOB va inventer une direction

---

**Prompt ✅ qui fonctionne :**
```
/bob implémente feature_003 — spec dans agent-system/specs/feature_003_feedback-tracker.md
Contrainte additionnelle : l'écran sera principalement consulté sur mobile (breakpoint md prioritaire).
```
- Agent ciblé ✓
- Contexte : la spec + une contrainte nouvelle non documentée ✓
- Intention claire : implémenter ✓
- Contrainte active mentionnée ✓

---

**Prompt ❌ à JO trop ambigu :**
```
/jo j'ai une idée de feature de notifications
```

**Prompt ✅ à JO avec du contexte :**
```
/jo j'ai une idée : les designers ne voient pas quand un dev a traité leur feedback.
Je veux un système de notification léger (pas de push, juste in-app) qui alerte Selin
quand un feedback passe de "open" à "in review".
Contrainte : pas de BDD en temps réel — on peut polling toutes les 30s si nécessaire.
```

---

## Les 5 erreurs classiques des débutants

**1. Sauter JO et aller directement à BOB**
BOB sans spec = code sans direction. DO rejette systématiquement. Tu perds plus de temps qu'en passant par JO.

**2. Ignorer le Brief Esthétique de BOB**
Répondre "ok" sans lire le brief, c'est déléguer une décision de design à une machine. Lis les 5 dimensions — ça prend 2 minutes.

**3. Donner des feedbacks vagues à BOB après un rejet DO**
"Améliore l'UX" ne veut rien dire pour BOB. Passe-lui le **rapport exact de DO** avec les points négatifs. Il a besoin d'un problème précis, pas d'une directive floue.

**4. Mettre trop de choses dans une seule feature**
Une feature = un JTBD = une spec. Si JO te challenge sur le scope, c'est un signe que tu essaies de mettre 3 features en 1. Découpe.

**5. Ne pas mettre à jour les fichiers de contexte quand la vision change**
JO et BOB lisent `client_vision.md` et `roadmap.md` à chaque session. Si tu as changé d'avis sur un persona, une contrainte ou un out-of-scope — mets à jour les fichiers avant de relancer. Sinon les agents travaillent sur un contexte périmé.

---

## Lexique — les termes à connaître

| Terme | Ce que ça veut dire |
|---|---|
| **Spec** | Le document technique que JO génère à partir de ton idée. C'est le contrat de BOB. |
| **JTBD** | "Job To Be Done" — la raison profonde pour laquelle un persona utilise le produit. |
| **Brief Esthétique** | Le document en 5 dimensions que BOB présente avant de coder. Gate obligatoire. |
| **BOB Gate** | L'étape de validation du brief esthétique. BOB ne code pas sans ton "ok". |
| **Ralph Loop** | Le processus de BOB pour coder : 6 étapes de Structure à Polish. |
| **Learnings Loop** | Le mécanisme par lequel DO écrit les leçons après chaque verdict. JO les lit ensuite. |
| **Motion level** | Le niveau d'animation d'une feature (L0 = aucune, L3 = complexe). Défini par JO dans la spec. |
| **ADR** | "Architecture Decision Record" — une décision technique documentée dans `agent-system/adr/`. |
| **Le Talent** | Toi. Le décideur. Les agents proposent, challengent, exécutent. Toi tu tranches. |
| **Statut VALIDÉE TALENT** | La mention dans une spec qui autorise BOB à démarrer. Sans elle, BOB attend. |
| **Out of scope** | Ce que le produit NE FERA PAS. Défini dans le brief et dans `roadmap.md`. JO le garde. |

---

## En résumé — les 5 réflexes à avoir

1. **Toujours commencer par `/jo`** — même si l'idée semble simple.
2. **Lire le brief esthétique de BOB** avant de dire "ok" — 2 minutes qui évitent du rework.
3. **Un prompt = un agent + une intention claire** — pas de message multi-sujets.
4. **Mettre à jour les fichiers de contexte** quand la vision change — avant de relancer.
5. **Lire le rapport DO en entier** — le score seul ne suffit pas. Les feedbacks sont dans les détails.
