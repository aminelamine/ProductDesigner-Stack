---
feature_id: F-007
feature_name: Interface front PDS — le shell `npx pds-stack ui`
date: 2026-10-24
lane: sketch
quality_brief_type: aesthetic
motion_level: L0 (STACK.md → motion_default) — CSS seul
point_de_depart: plan ~/.claude/plans/pivot-du-projet-vers-snoopy-ladybug.md (réfs 1–4 décrites) + refs-F-007/ (réfs 5 et 6, images du Talent) + benchmark fonctionnel dust.tt + memory/directions/004 (retenue) · architecture ADR-021
revision: 3 — 2026-10-24, gate ① tranchée (B) + benchmark fonctionnel complémentaire §6 (docs Dust · Grok Bot · OpenAI dots)
spec: aucune — voie Sketch
statut: ✅ approuvé — gate ① franchie par le Talent le 2026-10-24 : **B · L'établi** · A → `directions/005` refusée · C → `directions/006` refusée
---

# [BOB] ✅ Brief de direction — F-007 · Interface front PDS — B · L'établi

> ID `F-007` attribué par BOB (dernier connu : F-006). Renommable sans conséquence.

## 0. Lecture mémoire — ce qui cadre ce brief

| Source | État | Conséquence |
|---|---|---|
| `memory/identity.md` | **validé** 2026-10-24 | Socle figé : encre `#0a0908` · surface `#16140f` · papier `#efe9df` · accent `#ff5436` = « un gate vous attend » et rien d'autre · Space Grotesk titres · Instrument Serif *italique* = l'humain · JetBrains Mono = la machine · rayon 14 px. **Les 3 directions ne touchent pas au socle** : elles varient sur la direction, la hiérarchie des familles, la répartition de la palette, la tension et la composition. |
| `identity.md` → « n'est pas » | 5 règles | n° 3 « pas une boîte noire » : le dessous du capot (appels d'outils, fichiers) est **visible à la demande**, replié par défaut. Statuts aux conventions UX, jamais portés par la couleur seule (WCAG 1.4.1). |
| `memory/directions/INDEX.md` | 003 retenue · 004 retenue · aucune refusée | Rien d'interdit sur cette surface. |
| `memory/directions/TASTE.md` | 2 retenues | 004 : un gate = une décision ; score mono / verdict serif séparés par un filet ; gates en **charnières** entre phases. |
| `memory/design-system/registries/` | seed déclaré (`ETAT.md`) | Mode **contraint** sur les tokens du seed ; le reste (composants, échelles) est *proposé*. |
| F-006 L'atelier (`specs/dropped/F-006/`) | gate ① franchie, jamais jugée | **Pas une contrainte** (aucune entrée `directions/`). Proposé comme avatars d'agents : instruments en traits droits, regard au passage de main seulement, aucune couleur par agent. À confirmer (§5). |
| ADR-021 | proposé | Le shell rend un flux d'événements (`message · tool · gate · artifact · phase`) et des cartes `request_gate`. Rien n'est hébergé. |
| `memory/references/001` coucou | déjà mobilisée par 004 | Pas reprise ici : sa mécanique (encoche, hook → clic) vit déjà dans le Paraphe. |

🧠 **Mémoire utilisée :** s'appuie sur **004** (une décision par gate, charnières, filet score/verdict) — C la prolonge le plus, B s'en écarte le plus (l'artefact au centre plutôt que la décision). Révisée par l'identité : le flux de l'agent n'est plus caché, il est replié.

## 1. Les références : ce qu'on garde, ce qu'on laisse

Réfs 1 à 4 décrites dans le plan ; réfs 5 et 6 dans `refs-F-007/` ; dust.tt en benchmark
**fonctionnel** (aucun goût visuel n'en est tiré).

| Réf | On garde (mécanique) | On laisse |
|---|---|---|
| **1 · Chat multi-agents** (Sales Outbound) | les agents comme **interlocuteurs persistants** ; un statut vivant par conversation ; une feature = une conversation | le fil « dernière phrase de chaque agent » en liste (c'est un flux), les couleurs par agent, la pastille rouge à compteur |
| **2 · Home prompt + cartes** | l'intention d'abord (« Que veux-tu designer ? ») ; les actions en cartes → **la voie se demande visuellement** : Sketch · Standard · System · Audit · Référence | la grille de suggestions génériques, le dégradé « IA » |
| **3 · Framer / Relume** (onglets + inspecteur) | les phases en **onglets** ; l'aperçu vivant au centre ; un **inspecteur** à droite = les 5 dimensions de la direction | les panneaux de propriétés exhaustifs, la palette d'outils de canevas |
| **4 · Dashboard 3 colonnes** | une vue d'ensemble multi-sources → **Mémoire** : directions retenues/refusées, scores `/20`, learnings | les KPI en cartes uniformes, les graphiques décoratifs |
| **5 · Panneau « Contexte de l'opportunité »** | **un panneau de contexte par dossier**, en sections empilées et repliables, chacune avec son compte : **Socle** (`identity.md`, lecture seule) · **Parcours** (phase en cours + suivante, « étape 2 sur N ») · **Sources** (les références du designer, statut *validée* en texte + icône) · **Connecteurs** (MCP : Figma…) · **Mémoire du dossier** (décisions · learnings · versions, horodatée) · le geste **« Proposer au … »** : la mémoire locale *monte* d'un cran, mais seulement par une validation humaine | la jauge « 50 % » (une jauge, c'est ce qu'on refuse pour le `/20`) ; la barre de progression en segments colorés (statut porté par la couleur) ; « Proposer **au socle** » tel quel — le socle est figé, le geste monte vers `TASTE.md` / `directions/`, jamais vers `identity.md` ; le thème clair et les liens bleus |
| **6 · Proma** (3 colonnes) | **espaces → dossiers** dans la colonne de gauche, arborescents ; dans le fil, **les étapes de raisonnement en une ligne chacune, repliées** (« a réfléchi 4 s › », « cherche dans 5 sources › ») = le dessous du capot de l'identité n° 3 ; **une carte d'artefact dans le fil** qui ouvre le **panneau d'artefact à droite**, avec ses onglets ; **les pastilles de fichiers** dans le champ de saisie (le contexte attaché se voit avant l'envoi) ; le modèle affiché dans le champ ; le fil d'Ariane espace / dossier / objet | les icônes colorées par espace (une couleur par entité) ; le bouton bleu « Generate » et « Share » (rien n'est hébergé) ; les 3 cartes génériques Pipelines · Magic Chat · Studio ; le lecteur média ; « Community prompts » ; le thème clair |
| **dust.tt** · benchmark fonctionnel | des **agents nommés à qui l'on confie un rôle** (identité n° 1) ; **appeler un agent par `@`** dans le fil, plusieurs agents dans une même conversation → `@ray`, `@analyzer` passent la main sans changer d'écran ; la **fiche d'un agent** consultable (instructions, outils, usage) = le dessous du capot, côté agent ; la **revue humaine insérée dans le flux** = nos gates ; distinguer *ce que l'agent peut lire* (dossier, connecteurs) de *qui l'utilise* → le panneau dit ce que l'agent voit | le constructeur d'agents (BOB, RAY, ANALYZER sont fixés) ; 70+ connecteurs, gouvernance, SCIM, audit, analytics, coûts/ROI ; multi-fournisseurs de modèles (ici : *son* Claude) ; résidence des données, hébergement, curseurs multi-utilisateurs |

> **dust.tt, limites de lecture :** vérifié sur la page d'accueil et `docs.dust.tt/docs/intro` (agents,
> connecteurs, `@` multi-agents, fiche d'agent, revue humaine). La façon dont Dust **cite ses sources**
> et **montre ses appels d'outils** n'y est pas décrite : non reprise, à observer en produit si besoin.

**Ce que 5 · 6 · dust changent :** les trois convergent sur une **troisième colonne** — un panneau
à droite qui porte soit l'**artefact** (6), soit le **contexte du dossier** (5). Et elles tranchent
la forme du dessous du capot : **une ligne par étape, repliée**, plus le contexte attaché visible
en pastilles avant l'envoi.

## 2. Invariants — communs aux trois directions (ne se tranchent pas ici)

- **La carte de gate** est le Paraphe de 004 généralisé : une décision, deux verbes en serif italique, le seul endroit où l'accent vit. Score `/20` en mono | filet | verdict en serif. Jamais « toujours », jamais de lot.
- **Écran 0 · Accueil du modèle A** : brancher son Claude (clé API — ADR-021, login non prouvé) → choisir un dossier → si `identity.md` manque, la **genèse** (`memory/SETUP.md`).
- **Le dessous du capot** (réf. 6) : chaque message d'agent est précédé de ses étapes, **une ligne mono `--muted` par étape** (« BOB a lu 4 fichiers › »), repliées par défaut, dépliables une à une.
- **Le contexte attaché** (réf. 6) : les sources et fichiers joints s'affichent en **pastilles** dans le champ avant l'envoi ; le modèle (*son* Claude) y est nommé.
- **Les agents s'appellent par `@`** (dust) : `@bob` · `@ray` · `@analyzer` dans le fil ; leur fiche (rôle, outils, ce qu'ils lisent) s'ouvre au clic sur le nom.
- **Le panneau de contexte** (réf. 5) existe dans les trois directions — seule sa place change : Socle (lecture seule) · Parcours · Sources · Connecteurs · Mémoire du dossier → « Proposer au goût » (vers `TASTE.md`, validé par le designer).
- **Sketch** : le gate ② n'existe pas dans le tracé (absent, pas grisé).
- Motion L0 : `cubic-bezier(.16,1,.3,1)` ≤ 400 ms · `prefers-reduced-motion` respecté.

---

## 3. Les 3 directions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[AESTHETIC BRIEF — F-007 · Direction A : La conversation]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Direction    : On travaille AVEC une équipe — chaque feature est une conversation
                  avec BOB, RAY, ANALYZER, qu'on appelle par @ ; les gates arrivent dans
                  le fil comme des pièces à signer. (réfs 1 · 6 · dust au centre)
🔤 Typographie  : JetBrains Mono domine (messages d'agent, 14 px) / Instrument Serif
                  pour vos messages et vos verbes / Space Grotesk réduit au titre de feature
                  → votre voix contre la leur
🎨 Palette      : encre plein écran, surface pour les bulles d'agent seulement,
                  vos messages sans fond (papier sur encre). Statuts en texte + forme.
⚡ Tension      : machine / humain jusque dans le fil — un message d'agent ne ressemble
                  jamais à un vôtre (mono encadré vs serif nu, aligné à droite)
📐 Composition  : 2 colonnes + 1 panneau à la demande (réf. 6) — sidebar 260 px
                  (dossiers → features = conversations, glyphe de l'agent courant +
                  statut « gate ① en attente ») · fil centré 720 px, étapes repliées,
                  champ avec pastilles et @agent.
                  Panneau droit 400 px, fermé au repos, 2 onglets : Artefact (s'ouvre
                  quand BOB émet le proto, depuis sa carte dans le fil) · Contexte (réf. 5).
                  Home = prompt centré + 5 cartes de voie sous le champ.
                  Phases = fine barre de charnières en tête du fil, cliquable.
                  Mémoire = un écran à part, 3 colonnes (réf. 4).
⚠️  À éviter    : un clone de messagerie (bulles arrondies colorées, indicateur de
                  frappe, avatars ronds) · le fil qui déroule chaque appel d'outil ·
                  un clone de Proma ou de Dust (même grille, même chrome)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[AESTHETIC BRIEF — F-007 · Direction B : L'établi]  ★ recommandée
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Direction    : Le prototype est posé sur l'établi — on juge l'objet, pas la
                  discussion ; la direction et le dossier deviennent des choses qu'on
                  inspecte. (réfs 3 · 5 au centre, 6 en bord)
🔤 Typographie  : Space Grotesk mène (onglets de phase, titres de l'inspecteur) /
                  JetBrains Mono 12 px pour l'inspecteur et la colonne agents /
                  Instrument Serif seulement sur la phrase de direction et les verbes
                  → l'outil d'atelier, sobre et précis
🎨 Palette      : trois plans — encre (chrome), surface (inspecteur, colonne agents),
                  et le proto lui-même sur sa propre page, cadré d'un filet papier 12 %.
                  L'accent sur l'onglet de la phase dont le gate est ouvert, et nulle part ailleurs.
⚡ Tension      : chrome dense et minuscule / aperçu immense et silencieux —
                  l'interface s'efface devant l'artefact
📐 Composition  : 3 colonnes, dans l'ordre de Proma mais artefact au centre (réf. 6) —
                  conversation 340 px à gauche (fil d'Ariane dossier / feature en tête,
                  étapes repliées, champ avec pastilles et @agent ; repliable) ·
                  aperçu central plein cadre, onglets ① Direction · ② Cadre ·
                  ③ Produire · ④ Juger en tête · inspecteur 320 px à droite
                  = le panneau de contexte de la réf. 5, ouvert sur sa 1re section
                  « Direction » (les 5 dimensions, éditables en texte), puis Socle ·
                  Parcours · Sources · Connecteurs · Mémoire du dossier, repliées.
                  La carte de gate se pose en bas de l'inspecteur.
                  Dossiers = un sélecteur dans le fil d'Ariane, pas une 4e colonne.
                  Home = prompt + 5 cartes de voie, plein écran avant l'établi.
                  Mémoire = un écran à part, 3 colonnes (réf. 4).
⚠️  À éviter    : un faux Figma (barre d'outils de dessin, calques, poignées) ·
                  un inspecteur à 40 réglages · onglets qui laissent croire qu'on
                  saute une gate · une 4e colonne pour les dossiers (écran trop
                  étroit pour l'aperçu)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[AESTHETIC BRIEF — F-007 · Direction C : Le registre]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Direction    : Un registre de décisions — on n'ouvre l'interface que pour trancher ;
                  tout le reste est une ligne dans un livre de comptes.
                  (réfs 4 · 5 au centre, prolonge le cockpit de 004)
🔤 Typographie  : JetBrains Mono quasi seule (lignes, colonnes, phases, /20) /
                  Instrument Serif pour les verdicts dans la colonne Mémoire /
                  Space Grotesk absente des écrans (landing seulement)
                  → un livre, pas une app
🎨 Palette      : encre et papier seuls, aucune surface au repos ; la surface
                  n'apparaît que sous la carte de gate ouverte. Accent sur la
                  colonne « À trancher » seule.
⚡ Tension      : registre immobile, dense, tabulaire / une seule carte vivante
                  qui s'ouvre par-dessus — le silence de 004, en pleine page
📐 Composition  : grille asymétrique 3 colonnes — À trancher 280 px · Features
                  (une ligne par feature, pipeline à charnières DIRECTION—①—CADRE—②—
                  PRODUIRE—JUGER—③) · Mémoire 320 px = les sections de la réf. 5 en
                  lignes et comptes (Socle · Sources · Connecteurs · Décisions ·
                  Learnings), « Proposer au goût » en pied. Lignes et filets, pas de cartes.
                  Home = le registre lui-même, prompt en une ligne en tête + voies
                  en mots mono (pas de cartes).
                  Conversation et proto = un tiroir qui s'ouvre sur la ligne de la feature
                  (fil à étapes repliées de la réf. 6, @agent, artefact en onglet).
⚠️  À éviter    : un tableau de bord SaaS (KPI en tuiles, graphiques) · le tableur
                  froid sans hiérarchie · un tiroir qui devient l'écran principal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Contrastes :** A↔B diffèrent sur direction, hiérarchie typo, tension, composition · A↔C sur
direction, typo, palette, composition · B↔C sur les cinq. Les réfs 5 · 6 · dust rapprochent les
trois sur **les invariants** (étapes repliées, pastilles, `@agent`, panneau de contexte), pas sur
la direction : le contraste tient.

| | A · La conversation | B · L'établi ★ | C · Le registre |
|---|---|---|---|
| Au centre | le fil | l'artefact | la liste des décisions |
| Réf. 6 Proma | le fil + panneau d'artefact à la demande | sa grille, artefact au centre | le tiroir |
| Réf. 5 Contexte | onglet du panneau droit | **l'inspecteur entier** | la colonne Mémoire |
| dust | `@agent` au cœur | `@agent` dans la colonne gauche | `@agent` dans le tiroir |
| On juge… | en lisant | **en regardant l'objet** | en signant une ligne |

**Recommandation : B · L'établi, maintenue et renforcée.** Le verdict de 004 a été rendu *au clic
sur le prototype* : le jugement PDS porte sur l'artefact, pas sur la conversation. La réf. 5 donne
enfin à l'inspecteur de B un contenu qui n'est pas un panneau de propriétés : **le dossier lui-même**
(direction, socle, parcours, sources, mémoire). La réf. 6 donne sa grille à B en déplaçant seulement
l'artefact au centre.
**Contrepoids honnête :** les réfs 1 et 6 et dust mettent toutes la conversation au centre. Si le
Talent veut que PDS se vive d'abord comme *une équipe à qui l'on parle* (identité n° 1) plutôt que
comme *un objet qu'on juge*, c'est **A** — et A a gagné le plus avec cette révision. C reste la plus
fidèle à 004, mais un designer qui ne connaît pas le terminal n'y trouve toujours pas où *faire*.

## 4. ⚠️ Ne doit jamais apparaître
- L'accent sur autre chose qu'un gate ouvert ; `--accent-2` violet ; un dégradé « IA ».
- Un agent en serif, un message humain en mono ; un verdict et un `/20` dans la même cellule, une jauge qui les combine.
- « Toujours autoriser », approbation en lot, un gate franchi sans clic.
- Une couleur par agent ; avatars ronds à visage ; pastille rouge à compteur.
- Compte PDS, synchro cloud, télémétrie.
- Le gate ② dans une feature Sketch.
- Une écriture dans `identity.md` depuis l'interface (« Proposer au socle ») : le socle est figé, le geste monte au goût.
- Une jauge ou un pourcentage d'avancement ; un statut porté par la seule couleur d'un segment.

## 5. À trancher par le Talent avec ce brief
1. ~~**La direction :** A, B ou C.~~ **Tranché : B** (2026-10-24). A → `directions/005`, C → `directions/006`, `refusée`, raison non donnée.
2. **« Proposer au goût »** (réf. 5) : le geste existe-t-il en v1 ? Recommandé : oui, en lecture
   (le panneau montre la mémoire du dossier) et en un seul geste — une learning proposée à
   `TASTE.md`, que le designer valide.
3. **Avatars d'agents :** reprendre les instruments de F-006 *L'atelier* (recommandé) ou des tags texte `[BOB]` seuls.
4. **Le prochain pas après ① :** `/bob --proto` — un fichier HTML, 4 écrans (home, feature + carte de gate, phases + aperçu, Mémoire) + l'écran 0. Simulés : le SDK, les fichiers.

---

## 6. Benchmark fonctionnel complémentaire — après ① (précise B, ne change pas la direction)

Lu le 2026-10-24 sur les liens donnés par le Talent : Dust (`docs.dust.tt` intro + cas d'usage,
`dust.tt/home/product`), Grok Bot (`docs.x.ai/grok-bot/overview` · `/bots` · `/skills-routines-and-automations`,
`x.ai/bot/marketplace`), OpenAI dots (article sûreté, sécurité et confidentialité, 2026-09-29).
Mécanique seulement. Lu en direct : le skill REA vise les binaires et l'exécution, pas une doc publique.

| Source | On garde (mécanique) → où dans B | On laisse |
|---|---|---|
| **Dust** | les **Pods** (un espace persistant qui tient conversations, tâches, fichiers et agents) → **le dossier PDS** est cet espace, ouvert par le fil d'Ariane · **espaces et groupes** : ce qu'un agent peut lire est explicite → section **Connecteurs** de l'inspecteur : « ce que BOB lit » · **la fiche d'agent** (instructions, outils, usage) → s'ouvre au clic sur le nom · `@agent` et plusieurs agents dans un fil | les modèles multiples et le pool de crédits, audit, analytics, ordinateur virtuel partagé, automatisations, Frames (non documentées) |
| **Grok Bot** | un agent = **un nom, un métier, sa conversation, un contexte qui s'accumule** · **règles durables ≠ consigne de tâche** (« retiens ça » vs un message) · **les skills s'appellent par `/` dans le champ** → `/bob --proto`, `/analyzer` dans le champ de la colonne gauche · **la passation visible** dans un fil de groupe, un coordinateur qui assigne → le CONDUCTOR et « BOB passe la main à RAY » en une ligne mono · **revenir quand il faut une approbation** = la carte de gate · **la fiche « Détails »** au clic sur le nom · la mémoire **n'est pas une source d'autorité** → l'inspecteur cite le fichier, pas un souvenir · une fiche d'agent **énonce sa règle d'approbation** (« ne franchit jamais un gate sans vous ») · masquer (réversible) plutôt que supprimer | l'ordinateur cloud, les routines programmées et déclencheurs (PDS n'agit pas seul), « Teach a task » (enregistrement d'écran), la voix, la marketplace, le tag sur X, l'avatar libre |
| **OpenAI dots** | **trois régimes d'action** : poursuivre seul · demander confirmation · rendre la main sur l'étape → la fiche d'agent les liste · **une approbation reste liée à sa tâche** : reprendre ou déléguer ne l'élargit pas (= « jamais toujours ») · **une étape bloquée dit pourquoi** → la ligne repliée porte la raison · **la vue Activité** : tâches en cours et déléguées, avec leur état ; on ajoute du contexte, corrige, réoriente ou **arrête** → en tête de la colonne gauche, un état + **Arrêter** · **le secret hors de la conversation** : la connexion sécurisée garde le mot de passe hors du modèle → à l'écran 0, la clé API se saisit dans un formulaire dédié, jamais dans le fil · **l'agent rédige une règle, l'humain approuve le changement** = le geste « Proposer au goût » · le contexte d'un agent se réinitialise | la recherche proactive en arrière-plan, l'agent toujours actif, les achats, le moniteur de sécurité côté serveur, l'entraînement sur les données |

**Ce que §6 ajoute à B — à prototyper, pas à re-trancher :**
1. **Fiche d'agent** (au clic sur `BOB`) : métier · ce qu'il lit · ce qu'il fait seul / ce qu'il vous demande / ce qu'il vous rend · règle d'approbation en une phrase.
2. **Champ de la colonne gauche** : `@agent` pour appeler, `/` pour les commandes PDS, pastilles du contexte attaché.
3. **En tête de la colonne gauche** : l'état de l'agent courant (« BOB · produit le proto ») + **Arrêter**.
4. **Passation** : une ligne mono dans le fil, « BOB → RAY », jamais un changement d'écran.
5. **Étape bloquée** : sa ligne repliée dit pourquoi.
6. **Écran 0** : la clé API dans un formulaire à part (rangée dans le trousseau du système), jamais visible dans le fil — à reporter dans ADR-021.

---

**[BOB] ✅ Gate ① franchie — B · L'établi. Prochain pas : `/bob --proto` (1 HTML, écran 0 + 4 écrans), sur le oui du Talent. Restent ouverts au §5 : « Proposer au goût » en v1 · avatars d'agents.**
