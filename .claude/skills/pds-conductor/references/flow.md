# Flow — Conducteur adaptatif (track code)

> Ce fichier définit le flux guidé que le conducteur `/pds` fait suivre à l'utilisateur.
> Chaque step bloque tant que ses prérequis ne sont pas remplis. Modèle : `design-workflow/references/onboarding.md`.
> Le comportement de chaque step est modulé par `user_level` (lu dans `STACK.md`).

---

## Vue d'ensemble

```
STEP 0  Niveau + setup check
   ↓
STEP 1  Bootstrap contexte   ← BLOQUANT si un fichier de contexte est incomplet
   ↓
STEP 2  Idée → Spec          (invoque /ray · rituel VALIDÉE TALENT)
   ↓
STEP 3  Spec → Build         (invoque /bob · Brief Esthétique)
   ↓
STEP 4  Build → Review       (invoque /analyzer · gate /20)
```

---

## STEP 0 — Niveau + setup check

**Déclencheur :** tout lancement de `/pds`.

### 0a. Niveau utilisateur (une seule fois)

Lis `user_level` dans `STACK.md`.

- **Si présent** → charge le dial correspondant, continue silencieusement.
- **Si absent** → pose UNE question, puis écris la clé dans `STACK.md` :
  ```
  Avant de commencer : tu veux que je t'accompagne pas à pas (je t'explique chaque étape et
  je te propose les choix), ou tu connais déjà le flux PDS et tu préfères l'aller direct ?
  → « accompagné » (junior) | « direct » (expert)
  ```
  Écris `user_level: junior` ou `user_level: expert` dans `STACK.md`.

> L'utilisateur peut rebasculer à tout moment : « passe en mode direct / accompagné » → réécris la clé.

### 0b. Setup check

| Check | Vérification | Block-message si échec |
|---|---|---|
| `STACK.md` existe | fichier présent à la racine | voir table Block Messages → « Pas de STACK.md » |
| Projet front présent | `package.json` existe + framework de `STACK.md` détecté | → « Pas de projet front » |
| Module `core` actif | `modules.core: true` dans `STACK.md` | → « Core désactivé » |

Si tout passe → **junior** : « Setup OK. On va cadrer ton idée, puis je passe la main à RAY. »
**expert** : passe directement à STEP 1.

---

## STEP 1 — Bootstrap contexte (levier 2)

**Déclencheur :** après STEP 0, avant toute spec.

### 1a. Détection

Lis les 3 fichiers de contexte et cherche des marqueurs `[À COMPLÉTER]` / `[Fill…]` :
- `agent-system/context/client_vision.md`
- `agent-system/context/roadmap.md`
- `agent-system/context/design_guide.md`

- **Si les 3 sont complets** (zéro marqueur bloquant) → « Contexte en place. » → STEP 2.
- **Si un ou plusieurs sont incomplets** → lance l'interview (1b). **BLOQUANT** : RAY refusera de spécer
  sur un `client_vision.md` incomplet — autant le remplir maintenant.

### 1b. Interview conversationnel

Pose les questions **une par une** (jamais toutes d'un coup), façon STEP 1 de `design-workflow/onboarding.md`.
Couvre uniquement ce qui manque. Adapte au dial :
- **junior** : explique pourquoi chaque réponse compte (« ça sert à RAY pour cadrer / à ANALYZER pour évaluer »).
- **expert** : liste courte, une salve de questions ciblées.

Questions socle (mappées sur `PROJECT_BRIEF_TEMPLATE.md`) :
1. **Résumé produit** — quoi, pour qui, quel problème (2-3 phrases, sans jargon). `→ client_vision`
2. **1 à 3 personas + leur JTBD** (« Quand [situation], je veux [motivation], pour [résultat] »). `→ client_vision`
3. **3-5 valeurs produit + 3 anti-patterns UX.** `→ client_vision`
4. **North Star + features MVP (P0/P1/P2) + 3 out-of-scope.** `→ roadmap`
5. **Direction visuelle (1 phrase) + 3 mots esthétiques + ressentis.** `→ design_guide`

### 1c. Auto-détection stack (débloque `design_guide.md`)

Ne demande PAS ce qui est déductible du repo. Lis et remplis automatiquement :
- `package.json` → framework, versions (Next/React/Tailwind), librairie motion, deps UI
- config Tailwind (`tailwind.config.*` / `@theme` dans `globals.css`) → tokens, breakpoints
- `globals.css` → variables CSS `:root` / `.dark`, thème
- `components.json` → thème Shadcn, style, alias
- fonts réelles (`app/layout.tsx`, imports `next/font`) → typographie

> Règle d'or : **ne jamais inventer** une valeur de token/font/thème. Si le repo ne la contient pas,
> demande-la (junior) ou laisse un `[À COMPLÉTER]` explicite signalé au Talent (expert).

### 1d. Écriture

Écris les 3 fichiers via la **table de propagation** en fin de `PROJECT_BRIEF_TEMPLATE.md`
(section « Propager ce brief vers les 3 fichiers de contexte ») — n'invente pas de structure.
Vérifie : **zéro `[À COMPLÉTER]` bloquant résiduel** avant STEP 2.

Récap : « Contexte écrit — client_vision ✓ · roadmap ✓ · design_guide ✓. On passe à ta feature. »

---

## STEP 2 — Idée → Spec (invoque /ray)

**Prérequis :** contexte complet (STEP 1 passé).

1. Passe l'idée de l'utilisateur à l'agent architecte via `/ray <idée>`.
2. RAY tourne son MODE CHALLENGE (reformulation + 3 questions) puis MODE SPEC.
3. **Adaptation `user_level` :**
   - **junior** : avant d'afficher la spec, explique en 2 lignes ce qu'est une spec et pourquoi le
     scope est gelé. Quand RAY présente un arbitrage, **propose** l'option recommandée + le rationale
     (« je partirais sur X parce que… ; Y serait valable si… »). Glose Gherkin, tiers, motion level.
   - **expert** : relaie la sortie `[RAY]` telle quelle.
4. **Rituel VALIDÉE TALENT (gate) :** ne le fais jamais à la place de l'utilisateur. Demande
   explicitement :
   ```
   La spec est prête. Tu la valides ? (elle gèle le scope — toute addition = nouveau cycle RAY)
   → réponds « validé » pour que BOB puisse démarrer, ou dis ce que tu veux changer.
   ```
   Sur « validé » → marque `VALIDÉE TALENT` dans la spec, puis STEP 3. Sinon → renvoie à RAY (max 3 itérations).

---

## STEP 3 — Spec → Build (invoque /bob)

**Prérequis :** spec `VALIDÉE TALENT`.

1. Lance `/bob <chemin-spec>`.
2. BOB charge son **Quality Brief** (type aesthetic → **Brief Esthétique**, skill `frontend-design`) — gate BLOQUANT avant tout code UI.
3. **Adaptation `user_level` :**
   - **junior** : présente le Brief Esthétique comme **2-3 directions** concrètes avec, pour chacune,
     le rationale et ce que ça implique (« Direction A — sobre/dense : lisible, un peu austère ;
     Direction B — … »). Recommande-en une. Glose « Direction · Typo · Palette · Tension · Composition ».
   - **expert** : relaie le Brief `[BOB]` terse à approuver.
4. **Gate Brief :** attends le « ok » explicite avant l'Étape 1 du Ralph Loop. Ne l'approuve jamais toi-même.
5. BOB exécute le Ralph Loop (Structure → Scaffold → Core → UI → États → Polish), commit par étape.
   - **junior** : annonce chaque étape en clair. **expert** : laisse BOB dérouler.

---

## STEP 4 — Build → Review (invoque /analyzer)

**Prérequis :** feature construite par BOB.

1. Lance `/analyzer <ID-feature>`.
2. ANALYZER score /20 (4 dimensions) et rend son verdict. **Le gate de score existant s'applique tel quel** —
   le conducteur ne le modifie pas (pas de commit < 18/20, aucune exception).
3. **Adaptation `user_level` :**
   - **junior** : explique le verdict et ce que chaque dimension mesure ; traduis les feedbacks
     priorisés en prochaines actions concrètes.
   - **expert** : relaie le rapport `[ANALYZER]`.
4. **Boucle :** selon le verdict —
   - **≥ 18** → ANALYZER commit + met à jour `roadmap.md`. « Feature livrée. Prochaine idée ? »
   - **14-17 / 10-13** → renvoie à BOB avec les feedbacks (max 2 cycles ANALYZER→BOB avant arbitrage Talent).
   - **< 10** → renvoie à RAY (re-spec).

---

## Block Messages Reference

| Situation | Message |
|---|---|
| Pas de STACK.md | « STACK.md introuvable. Lance d'abord : `npx pds-stack install` » |
| Pas de projet front | « Aucun projet front détecté (package.json absent). Le conducteur agit dans un projet Next/Nuxt/SvelteKit/Astro/Remix existant. » |
| Core désactivé | « Le module core est désactivé dans STACK.md. Active `modules.core: true`. » |
| Contexte incomplet | « Avant de spécer, il manque des infos dans {fichier(s)}. On les remplit ensemble maintenant ? » |
| Spec non validée | « La spec attend ton `validé` — BOB ne démarre pas sans ça. Tu valides ou tu ajustes ? » |
| Brief non approuvé | « BOB attend ton ok sur la direction esthétique avant d'écrire du CSS. » |
| Score < 18 | « Feature non commitée — score {X}/20 (seuil : 18). Feedbacks priorisés ci-dessus → BOB. » |

---

## Skip Policy

L'utilisateur PEUT demander de sauter un step non critique. Dans ce cas :
1. Avertis : « Sûr ? Sauter cette étape peut dégrader la qualité. »
2. Si confirmé : logue la raison, continue, signale-le comme advisory dans le récap.
3. **NE JAMAIS sauter** : le bootstrap contexte (STEP 1 si incomplet), le rituel VALIDÉE TALENT,
   le gate Quality Brief, le gate de score ANALYZER. Ce sont les gates qui *sont* la stack.
