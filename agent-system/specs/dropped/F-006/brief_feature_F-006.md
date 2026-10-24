---
feature_id: F-006
feature_name: Casting des agents PDS — donner un corps et une voix aux agents
date: 2026-10-14
lane: system
quality_brief_type: aesthetic
motion_level: L0 (STACK.md → motion_default) — CSS seul
point_de_depart: brief du Talent (« brander notre concept, lui donner vie et itérer ») + références memory/references/002-openai-dots-agent-personnalise.md · 003-grok-bot-equipe-de-formes.md (001 déjà mobilisée en 004)
spec: à écrire par RAY contre ce brief (gate ②, voie System)
statut: ✅ approuvée — Le Talent, 2026-10-20 (gate ①) · « ok je valide » : recommandations du §À trancher retenues par défaut — piste A · L'atelier · agents en encre/papier (6 couleurs de la landing retirées) · regard = deux points au passage de main seulement · agents dans le panneau déplié seulement, encoche repliée à Paraphe
---

# [BOB] ⏸ Brief de direction — F-006 · Casting des agents PDS

## 0. Lecture mémoire — ce qui cadre ce brief

| Source | État | Conséquence |
|---|---|---|
| `memory/identity.md` | **absent** | Aucun socle écrit. Or ce casting *est* de l'identité de marque : une fois approuvé, il a sa place dans `identity.md` à sa création (`memory/SETUP.md`). |
| `memory/design-system/registries/` | **vides** (`ETAT.md`) | **Mode libre** : ce brief *propose*. Aucun token, glyphe ou composant ci-dessous n'existe dans un registre. |
| `memory/directions/004` Paraphe | `retenue` | **Contrainte dure.** Paraphe reste le personnage de l'encoche · mono = machine / serif italique = humain · `#ff5436` = « un gate vous attend », rien d'autre · pas de vert/rouge · on ne montre que ce que l'humain tranche, jamais de flux. |
| `memory/directions/003` Penpot | `retenue` | Leçon prolongée par 004 : **une référence prête sa mécanique, jamais son identité ni son vocabulaire.** |
| Langage visuel PDS de fait | `landing/styles.css` | Encre / papier / accent, 3 familles : repris. **Écart relevé :** la liste des agents de la landing attribue 6 couleurs (`data-accent`), dont un vert `#27d98a` pour ANALYZER et l'accent `#ff5436` pour RAY. Cela contredit 004 (voir §5). |

## 1. Références : ce qu'on garde, ce qu'on laisse *(je tranche ici les lignes « proposées » de 002 et 003)*

**002 · dots.** *On garde :* un signe de base commun à tous, et le caractère porté par un ou deux attributs. On garde aussi la métamorphose « signe → personnage », au bon moment (§3-C), et le ton « je vous signale ce qui demande votre intervention ». *On laisse :* le blob, le nœud papillon, le nom, l'anneau, la personnalisation libre par l'utilisateur et l'autonomie 24/7.

**003 · Grok Bot.** La proposition de la fiche est **amendée** :
- *forme primitive* → **forme d'instrument**. Une primitive pleine avec des yeux, c'est la signature Grok elle-même.
- *deux yeux* → **deux points de regard, conditionnels**.
- *voix propre* → **une seule ligne, au passage de main** (la ligne `⏸`).
- *grappe* → **le rang**.

*On laisse :* le fil de messagerie avec la dernière phrase de chaque agent (c'est un flux), la palette multicolore, la pastille rouge, les minuscules de ton, la sphère-œil, et les agents qui se passent le travail sans approbation.

**Où passe la ligne « créature ronde et molle » (004).** L'exclusion visait Mochi. Elle devient une règle de construction :
- pas de volume plein, pas de corps fermé rond, pas de squash-and-stretch, pas d'easing à rebond ;
- un cercle peut être une *pièce* d'instrument, jamais un *corps* ;
- pas de pupille, de blanc d'œil, de paupière, de bouche ni de membre ;
- un regard sans instrument n'existe pas.

---

## 2. Les 5 dimensions

### 🎯 Direction
**« L'atelier et la main. »** Les agents PDS sont les instruments d'un atelier de dessin : traits
droits, registre mono, chacun a la forme de son métier. Ils ne prennent vie qu'en se tournant vers le
designer pour lui tendre une décision. Paraphe, seule courbe du casting, est la main qui signe.

**Les 3 mots :** `Outillé` (la forme dit le métier) · `Tourné vers vous` (le regard n'existe qu'au passage de main) · `Une seule main` (les agents tendent, seul Paraphe signe)

### 🔤 Typographie *(proposée, reprise de la landing et de 004)*
- **JetBrains Mono** 500, capitales, interlettrage .1em : **le nom de l'agent**, identique au tag terminal `[BOB]`.
- **JetBrains Mono** 400, 12 px : **la ligne de voix**. Casse de phrase, 1re personne, ≤ 60 caractères, au vocabulaire PDS.
- **Instrument Serif** italique : **jamais pour un agent.** Elle reste aux verbes de l'humain (*Approuver*, *Figer*, *Retenue*, *Refusée*) et à la phrase de direction qu'il signe.
- **Space Grotesk** 500/600 : le rôle de l'agent (« Architecte du cadre »), sur la landing et dans les docs seulement.
- **Échelle des glyphes :** 12 (inline, docs) · 16 (panneau d'encoche) · 24 (ligne de cockpit) · 48 · 160 (landing, planche).

### 🎨 Palette *(proposée, absente des registres, tokens de 004 inchangés)*
- Les agents sont tracés en `--paper`. Au repos, ils passent en `--muted`. Le regard est en `--paper`.
- **Aucune couleur par agent.** On reconnaît un agent à sa forme, jamais à sa teinte. Les 6 `data-accent` de la landing deviennent caducs, et `--accent-2` (violet) reste exclu.
- **L'accent appartient au gate, jamais à l'agent.** Quand un agent passe la main, l'accent tient sur la charnière du gate ou sur le filet sous l'encoche. Le trait de l'agent n'est jamais en accent.
- Pas de vert ni de rouge. Une *refusée* reste la rature de Paraphe (004).

### ⚡ Tension
**Droit / courbe.** La séparation machine / humain de 004 descend de la typographie jusqu'au dessin :
- les agents sont faits de segments droits sur la grille mono ;
- Paraphe est la seule courbe libre.

On reconnaît donc qui parle avant même de lire un mot.

**Tension secondaire : regard baissé / regard levé.**
- *Au travail*, l'agent regarde son outil. Il reste muet.
- *Au passage de main*, il lève le regard vers vous et dit une ligne. C'est la seule voix qu'on lui accorde, ce qui règle le conflit avec le « pas de flux » de 004.

### 📐 Composition

**A. Règle de construction commune**
- **Cellule :** un rectangle 3:5, la proportion d'un caractère JetBrains Mono. Chaque glyphe d'agent s'y inscrit.
- **Trait :** un seul trait, d'épaisseur hauteur ÷ 13, soit 1,4 px à 18 px comme Paraphe, avec un minimum de 1,2 px.
- **Géométrie :** segments droits, angles de 90° et 45°, extrémités rondes.
- **Le regard :** deux points de 2 px placés dans l'instrument. C'est le seul trait vivant.
- **SVG :** un SVG par agent, animé en CSS uniquement.

**B. Le casting** *(ordre du cycle. Les noms ne changent pas : BOB, RAY, etc. sont déjà la marque)*

| Agent | Instrument (forme) | Attribut | Geste : au travail → passe la main | Ligne `⏸` (exemple) |
|---|---|---|---|---|
| **Conducteur** `/pds` | l'hexagone ⬡, la marque du stack, en contour | un côté épaissi = la phase courante | le côté épaissi avance d'une phase, puis s'arrête sur la charnière du gate | « Cycle arrêté sur ①. La suite est à vous. » |
| **EVE** | le fil à plomb : une verticale et un poids en losange | le poids | oscille, puis se fige à l'aplomb | « Le problème tient. Une hypothèse est tombée. » |
| **BOB** | le compas : deux branches articulées | la charnière, pour deux moitiés à un gate d'écart | *brief* : les branches s'ouvrent, l'écart est la direction. *build* : elles se referment et tracent un segment | « Direction écrite. Rien n'est produit. » |
| **RAY** | les traits de coupe : 4 équerres | un tireté hors du cadre = `HORS SCOPE` | les équerres se resserrent et se verrouillent | « 6 tâches, 4 hors scope. Figé si vous le figez. » |
| **ANALYZER** | le compte-fils : un carré coupé d'un filet vertical | une moitié graduée (le `/20`), une moitié vide (votre verdict) | les graduations montent. La moitié vide reste vide et se tourne vers vous | « 16/20. La direction, c'est vous. » |
| **SHIP** *(module delivery)* | une flèche qui franchit un seuil | le seuil : un filet | la flèche passe le filet, une seule fois | « En ligne. KPI relevés le 28. » |

ANALYZER *est* la règle « jamais moyennés » faite personnage : son corps garde une moitié vide.

**C. Les états, et où chacun a le droit d'exister**

| État | Glyphe | Regard | Voix | Où |
|---|---|---|---|---|
| **Repos** | en `--muted`, immobile | absent : c'est un signe, pas encore un personnage | — | landing, docs, cockpit (agent inactif) |
| **Au travail** | geste en boucle lente (≥ 3 s) | baissé, vers l'outil | **aucune**, ni « BOB lit… » ni indicateur de frappe | ligne de cockpit, survol sur la landing. **Jamais dans l'encoche** |
| **Passe la main** | geste final, ≤ 600 ms | **apparaît, levé** : c'est la métamorphose de 002 | **la ligne `⏸`**, le même texte que dans le terminal | panneau d'encoche déplié, cockpit « À trancher », terminal `[BOB] ⏸ …` |
| **Tranché** | Paraphe signe ou rature, puis l'agent retourne au repos | se ferme en un tiret | aucune. L'agent ne réagit pas au verdict : ni joie, ni peine | encoche, cockpit |

**D. L'équipe : le rang, pas la grappe**
- Les agents sont alignés sur une ligne de base, dans l'ordre du cycle, comme des caractères dans un composteur.
- Les gates ①②③ s'intercalent comme des **charnières** (004) : `⬡ EVE BOB ① RAY ② BOB ANALYZER ③ SHIP`.
- Paraphe est **au pied de la ligne**, décalé, comme une signature au bas d'un document.

**E. Paraphe et le casting**
- Paraphe n'est pas un agent. C'est la main du designer : sans regard, sans voix, et seul à courber.
- **L'encoche repliée reste à Paraphe seul** (004 intact).
- Le glyphe de l'agent qui passe la main n'apparaît que dans le **panneau déplié**, à 16 px, au-dessus de sa ligne `⏸`. La décision suit en dessous, en serif.

**F. Motion L0**
- `stroke-dashoffset`, `transform` (branches du compas, poids du fil à plomb), opacité.
- `cubic-bezier(.16,1,.3,1)`, sans rebond.
- `prefers-reduced-motion` : glyphes statiques, regard affiché directement.

---

## 3. Pistes de casting

| Piste | Principe | Pour | Contre |
|---|---|---|---|
| **A · L'atelier** *(recommandée)* | Chaque agent est un instrument de dessin en traits droits. Le regard n'apparaît qu'au passage de main | La forme dit le métier : le vocabulaire PDS devient un corps (leçon 003). Machine et humain se distinguent par la construction | Plus de dessin. Le compas et le compte-fils doivent rester lisibles à 12 px (à prouver au proto) |
| **B · La casse** | L'initiale de chaque agent (B, R, A, E, S, ⬡) en JetBrains Mono vivante. Les contre-formes font les yeux | Très typographique, passe tel quel dans le terminal et les docs | La lettre dit le nom, pas le rôle. Ça tient du monogramme plus que du personnage, et le B a deux yeux quand le R n'en a qu'un |
| **C · Les primitives** | Carré, triangle, losange… en contour, avec deux points | Se lit le plus vite en liste | C'est la signature de Grok (formes + yeux), et c'est exactement ce que la leçon 003/004 interdit. Gardée comme contre-exemple |

**Recommandation : A.** C'est la seule piste où la forme porte le métier et où la frontière
droit/courbe (agent/Paraphe) prolonge 004 au lieu de la contourner.

---

## 4. ⚠️ Ne doit jamais apparaître
- **dots :** le blob, le nœud papillon, le nom, l'anneau qui se métamorphose, la personnalisation libre.
- **Grok :** primitives pleines colorées avec des yeux, sphère-œil, liste de messagerie avec la dernière phrase de chaque agent, pastille rouge.
- **Coucou :** son identité (comme en 004).
- **Une couleur par agent.** Pas d'accent sur un agent, pas de vert/rouge, pas de violet.
- **Une voix d'agent hors du passage de main :** narration de progression, « je lis… », indicateur de frappe, fil d'activité.
- **Un agent en serif, un agent qui signe ou qui tranche,** un agent qui réagit au verdict (confettis, mine triste).
- **Les traits de mascotte :** bouche, membres, pupilles, sourcils, joues, costume.
- **Un agent dans l'encoche repliée.** Paraphe porteur d'un regard ou d'une voix.
- **Un emoji ou un glyphe dans les tags terminal.** `[BOB]` reste du texte, parce que le rendu dépend de la police.

## 5. Ce que le proto (`/bob --proto` → `prototypes/006-casting-agents.html`) doit rendre réel
1. **La planche du casting :** les 6 glyphes à 160 px, chacun avec ses 4 états commutables, son nom, son rôle et sa ligne `⏸`. Paraphe est à part, légendé « la main ».
2. **Un hero de landing :** le rang sur sa ligne de base, Paraphe au pied, tout en encre et papier, à la place des 6 couleurs. Au survol d'un agent : son geste et son rôle.
3. **Une ligne de cockpit :** le pipeline à charnières de 004. Le glyphe de l'agent courant (24 px) est assis sur sa phase et travaille. À l'ouverture du gate, il lève le regard et l'accent passe sur la charnière seule.
4. **Un passage de main complet :**
   - l'encoche s'ouvre, le panneau se déplie, avec le glyphe (16 px), la ligne `⏸` en mono et la décision en serif ;
   - un clic : Paraphe signe et l'agent revient au repos ;
   - sur un refus : la rature, puis BOB qui se remet au travail.
5. **Un extrait de terminal** (statique) qui montre que la ligne `⏸` est la même que dans le panneau.

*Simulé :* les données, le terminal, le hook. *Test de lisibilité :* chaque glyphe à 12 px, côte à côte.

## 6. Décision à écrire (voie System), au gate ③ si la direction est retenue
- **`memory/decisions/NNN-casting-agents.md`** reprend :
  - la règle de construction (cellule 3:5, trait = hauteur ÷ 13, segments droits, seul Paraphe courbe) ;
  - le regard conditionnel ;
  - l'absence de couleur par agent et l'accent réservé au gate ;
  - la voix limitée à la ligne `⏸`.
- **Premières entrées des registres** (source « Déclaré »). Conséquence : `ETAT.md` quitte « vide », et les briefs suivants passent en mode contraint.
  - `assets` : 6 glyphes + Paraphe × 4 états ;
  - `components` : `AgentGlyph { agent, state, size }` ;
  - `variables` : tokens de 004 + `--cast-cell`, `--cast-stroke` ;
  - `text-styles` : nom d'agent, ligne de voix, verbe humain.
- Mettre à jour les lignes « pris / pas pris » de `references/002` et `003` selon le §1.
- **Pour RAY au gate ②, l'ordre :** F-005 lot 2 (le cockpit) consomme `AgentGlyph`. F-006 passe donc avant, ou bien le lot 2 réserve l'emplacement.

## 7. À trancher par le Talent avec ce brief
1. **La piste :** A, B ou C.
2. **Les couleurs des agents sur la landing.** Recommandé : les 6 `data-accent` disparaissent au profit de l'encre et du papier, ce qui aligne la landing sur 004. Alternative : une exception marketing assumée.
3. **Le regard.** Recommandé : deux points conditionnels. Alternative : des instruments sans regard du tout, plus stricts vis-à-vis de 004 mais moins vivants.
4. **La présence dans l'encoche.** Recommandé : panneau déplié seulement. Alternatives : aussi dans l'encoche repliée, ou jamais.

---

**[BOB] ⏸ En attente d'approbation. Rien n'est produit, ni prototype, ni maquette, ni registre, avant un oui explicite.**
