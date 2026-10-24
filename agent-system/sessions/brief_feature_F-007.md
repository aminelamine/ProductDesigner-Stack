---
feature_id: F-007
feature_name: Interface front PDS — le shell `npx pds-stack ui`
date: 2026-10-24
lane: sketch
quality_brief_type: aesthetic
motion_level: L0 (STACK.md → motion_default) — CSS seul
point_de_depart: plan ~/.claude/plans/pivot-du-projet-vers-snoopy-ladybug.md (4 références décrites) + memory/directions/004 (retenue) · architecture ADR-021
spec: aucune — voie Sketch
statut: ⏸ en attente — gate ①, décision du Talent
---

# [BOB] ⏸ Brief de direction — F-007 · Interface front PDS

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

🧠 **Mémoire utilisée :** s'appuie sur **004** (une décision par gate, charnières, filet score/verdict) — C la prolonge le plus, B s'en écarte le plus (l'artefact au centre plutôt que la décision). Révisée par l'identité : le flux de l'agent n'est plus caché, il est replié.

## 1. Les 4 références : ce qu'on garde, ce qu'on laisse

| Réf | On garde (mécanique) | On laisse |
|---|---|---|
| **1 · Chat multi-agents** (Sales Outbound) | les agents comme **interlocuteurs persistants** ; un statut vivant par conversation ; une feature = une conversation | le fil « dernière phrase de chaque agent » en liste (c'est un flux), les couleurs par agent, la pastille rouge à compteur |
| **2 · Home prompt + cartes** | l'intention d'abord (« Que veux-tu designer ? ») ; les actions en cartes → **la voie se demande visuellement** : Sketch · Standard · System · Audit · Référence | la grille de suggestions génériques, le dégradé « IA » |
| **3 · Framer / Relume** (onglets + inspecteur) | les phases en **onglets** ; l'aperçu vivant au centre ; un **inspecteur** à droite = les 5 dimensions de la direction | les panneaux de propriétés exhaustifs, la palette d'outils de canevas |
| **4 · Dashboard 3 colonnes** | une vue d'ensemble multi-sources → **Mémoire** : directions retenues/refusées, scores `/20`, learnings | les KPI en cartes uniformes, les graphiques décoratifs |

## 2. Invariants — communs aux trois directions (ne se tranchent pas ici)

- **La carte de gate** est le Paraphe de 004 généralisé : une décision, deux verbes en serif italique, le seul endroit où l'accent vit. Score `/20` en mono | filet | verdict en serif. Jamais « toujours », jamais de lot.
- **Écran 0 · Accueil du modèle A** : brancher son Claude (clé API — ADR-021, login non prouvé) → choisir un dossier → si `identity.md` manque, la **genèse** (`memory/SETUP.md`).
- **Le dessous du capot** : chaque message d'agent porte un repli `outils · fichiers` en mono `--muted`, fermé par défaut.
- **Sketch** : le gate ② n'existe pas dans le tracé (absent, pas grisé).
- Motion L0 : `cubic-bezier(.16,1,.3,1)` ≤ 400 ms · `prefers-reduced-motion` respecté.

---

## 3. Les 3 directions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[AESTHETIC BRIEF — F-007 · Direction A : La conversation]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Direction    : On travaille AVEC une équipe — chaque feature est une conversation
                  avec BOB, RAY, ANALYZER ; les gates arrivent dans le fil comme des
                  pièces à signer. (réf. 1 au centre)
🔤 Typographie  : JetBrains Mono domine (messages d'agent, 14 px) / Instrument Serif
                  pour vos messages et vos verbes / Space Grotesk réduit au titre de feature
                  → votre voix contre la leur
🎨 Palette      : encre plein écran, surface pour les bulles d'agent seulement,
                  vos messages sans fond (papier sur encre). Statuts en texte + forme.
⚡ Tension      : machine / humain jusque dans le fil — un message d'agent ne ressemble
                  jamais à un vôtre (mono encadré vs serif nu, aligné à droite)
📐 Composition  : 2 colonnes — sidebar 260 px (features = conversations, glyphe de l'agent
                  courant + statut « gate ① en attente ») · fil centré 720 px.
                  Home = prompt centré + 5 cartes de voie sous le champ.
                  Phases = fine barre de charnières en tête du fil, cliquable.
                  Proto = s'ouvre en panneau à droite quand BOB l'émet.
                  Mémoire = un écran à part, 3 colonnes (réf. 4).
⚠️  À éviter    : un clone de messagerie (bulles arrondies colorées, indicateur de
                  frappe, avatars ronds) · le fil qui déroule chaque appel d'outil
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[AESTHETIC BRIEF — F-007 · Direction B : L'établi]  ★ recommandée
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Direction    : Le prototype est posé sur l'établi — on juge l'objet, pas la
                  discussion ; la direction devient une chose qu'on inspecte.
                  (réf. 3 au centre)
🔤 Typographie  : Space Grotesk mène (onglets de phase, titres de l'inspecteur) /
                  JetBrains Mono 12 px pour l'inspecteur et la colonne agents /
                  Instrument Serif seulement sur la phrase de direction et les verbes
                  → l'outil d'atelier, sobre et précis
🎨 Palette      : trois plans — encre (chrome), surface (inspecteur, colonne agents),
                  et le proto lui-même sur sa propre page, cadré d'un filet papier 12 %.
                  L'accent sur l'onglet de la phase dont le gate est ouvert, et nulle part ailleurs.
⚡ Tension      : chrome dense et minuscule / aperçu immense et silencieux —
                  l'interface s'efface devant l'artefact
📐 Composition  : 3 zones — colonne agents 300 px à gauche (la conversation,
                  repliable : réf. 1) · aperçu central plein cadre avec
                  onglets ① Direction · ② Cadre · ③ Produire · ④ Juger en tête ·
                  inspecteur 320 px à droite = les 5 dimensions, éditables en texte.
                  La carte de gate se pose en bas de l'inspecteur.
                  Home = prompt + 5 cartes de voie, plein écran avant l'établi.
                  Mémoire = un écran à part, 3 colonnes (réf. 4).
⚠️  À éviter    : un faux Figma (barre d'outils de dessin, calques, poignées) ·
                  un inspecteur à 40 réglages · onglets qui laissent croire qu'on
                  saute une gate
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[AESTHETIC BRIEF — F-007 · Direction C : Le registre]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Direction    : Un registre de décisions — on n'ouvre l'interface que pour trancher ;
                  tout le reste est une ligne dans un livre de comptes.
                  (réf. 4 au centre, prolonge le cockpit de 004)
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
                  PRODUIRE—JUGER—③) · Mémoire 320 px. Lignes et filets, pas de cartes.
                  Home = le registre lui-même, prompt en une ligne en tête + voies
                  en mots mono (pas de cartes).
                  Conversation et proto = un tiroir qui s'ouvre sur la ligne de la feature.
⚠️  À éviter    : un tableau de bord SaaS (KPI en tuiles, graphiques) · le tableur
                  froid sans hiérarchie · un tiroir qui devient l'écran principal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Contrastes :** A↔B diffèrent sur direction, hiérarchie typo, tension, composition · A↔C sur
direction, typo, palette, composition · B↔C sur les cinq.

**Recommandation : B · L'établi.** Le verdict de 004 a été rendu *au clic sur le prototype* : le
jugement PDS porte sur l'artefact, pas sur la conversation. B est la seule direction qui met
l'artefact au centre et fait de la direction (les 5 dimensions) un objet visible en permanence.
A est la plus familière, mais glisse vers le flux qu'on a voulu replier ; C est la plus fidèle à
004, mais un designer qui ne connaît pas le terminal n'y trouve pas où *faire*.

## 4. ⚠️ Ne doit jamais apparaître
- L'accent sur autre chose qu'un gate ouvert ; `--accent-2` violet ; un dégradé « IA ».
- Un agent en serif, un message humain en mono ; un verdict et un `/20` dans la même cellule, une jauge qui les combine.
- « Toujours autoriser », approbation en lot, un gate franchi sans clic.
- Une couleur par agent ; avatars ronds à visage ; pastille rouge à compteur.
- Compte PDS, synchro cloud, télémétrie.
- Le gate ② dans une feature Sketch.

## 5. À trancher par le Talent avec ce brief
1. **La direction :** A, B ou C. Les deux non retenues iront en `memory/directions/` comme `refusée` (ADR-020).
2. **Avatars d'agents :** reprendre les instruments de F-006 *L'atelier* (recommandé) ou des tags texte `[BOB]` seuls.
3. **Le prochain pas après ① :** `/bob --proto` — un fichier HTML, 4 écrans (home, feature + carte de gate, phases + aperçu, Mémoire) + l'écran 0. Simulés : le SDK, les fichiers.

---

**[BOB] ⏸ En attente d'approbation. Rien n'est produit, ni prototype, ni maquette, ni code, avant un oui explicite.**
