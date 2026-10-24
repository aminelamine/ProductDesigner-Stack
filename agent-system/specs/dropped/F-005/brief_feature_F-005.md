---
feature_id: F-005
feature_name: Compagnon PDS — encoche des 3 gates + cockpit local
date: 2026-10-13
lane: sketch
quality_brief_type: aesthetic
motion_level: L0 (STACK.md → motion_default) — CSS seul
point_de_depart: référence memory/references/001-coucou-compagnon-encoche.md
spec: aucune — voie Sketch, il n'y en aura pas
statut: ✅ approuvée — Le Talent, 2026-10-13 (gate ①) · nom : Paraphe · refus ③ : apprentissage dans la conversation (ANALYZER) · identité : celle de la landing PDS (landing/styles.css)
---

# [BOB] ⏸ Brief de direction — F-005 · Compagnon PDS

> ID `F-005` attribué par BOB (dernier connu : F-004). Renommable sans conséquence.

## 0. Lecture mémoire — ce qui cadre ce brief

| Source | État | Conséquence |
|---|---|---|
| `memory/identity.md` | **absent** | Aucun socle ni « ce que le produit n'est pas » à respecter. Les garde-fous viennent de `CLAUDE.md` (3 gates, verdicts jamais moyennés). À créer avant le prochain cycle (`memory/SETUP.md`). |
| `memory/design-system/registries/` | **vides** (`ETAT.md`) | **Mode libre** : ce brief *propose*. Aucun token ci-dessous n'existe dans un registre. |
| Langage visuel PDS de fait | `landing/styles.css` | Pas un registre, mais la seule identité PDS existante. Je **propose** de la reprendre (encre / papier / accent, 3 familles). Marqué *proposé — repris de la landing, absent des registres*. |
| `memory/directions/INDEX.md` | 1 entrée, 003 Penpot, `retenue` | Rien sur ce sujet, aucune direction `refusée` à respecter. Leçon reprise de la 003 : **« vocabulaire propre »**. Le compagnon parle PDS (direction, scope, retenue/refusée), jamais Coucou (Allow / Deny / Always). |
| `memory/decisions/INDEX.md` | vide | — |

## 1. Référence 001 (Coucou) : ce qu'on garde, ce qu'on laisse

**On garde :**
- **L'emplacement.** L'encoche, là où l'œil est déjà, sans ajouter de fenêtre.
- **La mécanique.** Hook → socket local → le hook *attend* le clic → la réponse repart vers l'agent.
- **Un personnage qui porte l'état.** On lit l'humeur sans lire de texte.
- **La confiance.** Zéro télémétrie, zéro compte, tout en local.

**On laisse :**
- **Le flux d'activité.** Pas de fichiers lus ou édités, pas de diffs, pas de chat multi-fournisseurs, pas de pastilles GitHub/Stripe/Vercel, pas de musique, pas de voix.
- **« Always ».** Un gate ne se franchit jamais par avance ni en lot. Toujours un acte humain, gate par gate.
- **Toute l'identité.** Ni le nom, ni Mochi, ni la forme de créature ronde et molle, ni les sons, ni l'icône (© réservés).

---

## 2. Les 5 dimensions

### 🎯 Direction
**« Le guichet de signature du designer. »** L'encoche reste muette tant que rien n'attend le
designer. Quand un gate s'ouvre, elle présente *une seule* décision, au vocabulaire exact de PDS.
Le designer la tranche d'un geste qui compte, comme un paraphe et pas comme une notification
qu'on chasse.

**Les 3 mots :** `Muet` (au repos) · `Un seul acte` (pas un flux) · `Signé` (la décision a du poids)

*Réf. 001 : on garde l'ambiant toujours visible. On laisse le « compagnon bavard » qui commente tout.*

### 🔤 Typographie *(proposée, reprise de la landing PDS)*
- **JetBrains Mono** 400/500 : **la voix de la machine.** Libellés de gate, noms de feature, phases, score `/20`. C'est la seule famille de l'encoche, à 11–12 px.
- **Instrument Serif** italique 400 : **la voix du designer.** Ce que seul l'humain prononce : *Approuver*, *Figer*, *Retenue*, *Refusée*, et la phrase de direction. Ces mots servent aussi de libellés de bouton.
- **Space Grotesk** 500/600 : titres du cockpit uniquement (nom de feature, en-têtes de colonne).
- **Échelle cockpit :** 12 / 14 / 18 / 28 / 44. **Échelle encoche :** 11 / 12, plus 16 pour le mot-verdict en serif.
- **Polices embarquées en local** (woff2 dans le paquet) : aucune requête réseau à l'exécution. Dans le proto, un `@import` Google Fonts avec repli est toléré, à signaler en tête de fichier comme simulé.

*Réf. 001 : rien à garder (la typo native SF de Coucou relève de son identité). Pas de police système, l'encoche doit se reconnaître comme PDS.*

### 🎨 Palette *(proposée, absente des registres)*
| Token | Valeur | Rôle |
|---|---|---|
| `--ink` | `#0a0908` | fond de l'encoche (fondu avec le noir matériel) et du cockpit |
| `--surface` | `#16140f` | panneau déplié, cartes de feature |
| `--paper` | `#efe9df` | texte, verdict `retenue` |
| `--muted` | `rgba(239,233,223,.56)` | phases passées, métadonnées |
| `--line` | `rgba(239,233,223,.12)` | filets, séparation score / verdict |
| `--accent` | `#ff5436` | **un seul usage : « ceci vous attend »**, c'est-à-dire un gate ouvert |

- **Pas de paire vert/rouge.** *Retenue* = papier plein. *Refusée* = papier à 56 % + barré d'un trait d'encre. Le statut se lit par la forme, pas par une couleur sémantique.
- L'accent n'apparaît jamais sur une chose finie. Quand tout est tranché, l'écran est entièrement encre et papier.
- `--accent-2` (violet) de la landing est **exclu**.

*Réf. 001 : rien de repris.*

### ⚡ Tension
**Machine en mono / humain en serif italique, et jamais dans la même cellule.**
- Le score de conformité `/20` (calculé, mécanique) est en mono, aligné à droite.
- Le verdict de direction (*retenue* / *refusée*, rendu par le designer seul) est en serif italique.
- Un filet vertical les sépare. Aucun chiffre ne combine les deux, ni jauge, ni moyenne. C'est la règle « jamais moyennés » de `CLAUDE.md`, rendue visible.

**Tension secondaire : silence / appel.** L'encoche est noire et vide au repos, une ligne d'accent unique quand un gate s'ouvre.

### 📐 Composition

**A. L'encoche : trois états. Le proto doit les rendre réels et cliquables.**

| État | Forme | Contenu | Son |
|---|---|---|---|
| **Repos** | Taille de l'encoche matérielle, noir pur. Le personnage est réduit à un signe de 6 px dans l'aile droite, qui « respire » (opacité .3 → .6, 4 s). | Rien d'autre. Aucun compteur, aucune pastille. | aucun |
| **Gate en attente** | Les ailes s'élargissent (~360 px). Un filet `--accent` de 1 px sous l'encoche. Le personnage passe en posture d'attente. | Mono : `① DIRECTION · F-005 Compagnon`. S'il y a d'autres gates en file : `+1` en mono `--muted`, sans pastille rouge. | **arrivée** (1 son court) |
| **↳ dépliée** (clic ou survol prolongé) | Panneau ~380 × 200 qui descend de l'encoche, fond `--surface`, coins 14 px. | Le contenu dépend du gate (voir sous le tableau). En pied de panneau : `Ouvrir le cockpit ↗` en mono. | — |
| **Gate tranchée** | Le personnage joue le geste de décision (~600 ms). Le panneau se replie ensuite. | Mono pendant 2,5 s : `① approuvée · BOB reprend` ou `③ refusée · retour DIRECTION`. Puis retour au repos, ou au gate suivant en file. | **décision** (un son pour l'acte positif, un pour le refus) |

Contenu du panneau déplié, par gate :
- **① Direction**
  - Contenu : la phrase de direction en serif italique et les 3 mots.
  - Boutons : *Approuver* · *Ajuster*. *Ajuster* ouvre le brief dans le cockpit, sans réponse texte depuis l'encoche.
- **② Scope** *(Standard et System seulement, jamais affiché en Sketch)*
  - Contenu : `N tâches · M hors scope`.
  - Boutons : *Figer* · *Renvoyer à RAY*.
- **③ Verdict**
  - Contenu : score `14/20` en mono, puis un filet, puis la question « La direction est-elle retenue ? ».
  - Boutons : *Retenue* · *Refusée*.

Deux boutons au plus par gate. Pas de troisième option, pas d'« Always ».

**B. Le cockpit : page locale dans le navigateur, qui lit le repo.**
- **Grille asymétrique en trois zones :**
  - **Gauche, étroite (~280 px), « À trancher ».** La même file que l'encoche, en tête. C'est la seule zone qui peut porter l'accent.
  - **Centre, large, « Features ».** Une ligne par feature : pipeline horizontal `DIRECTION — ① — CADRE — ② — PRODUIRE — JUGER — ③`. **Les gates sont les charnières entre les phases**, pas des phases. En Sketch, ② est absent du tracé (pas grisé : absent).
  - **Droite (~320 px), « Mémoire ».** Les directions retenues et refusées. Les refusées ont **le même poids typographique** que les retenues (une refusée vaut plus qu'une acceptée, `directions/INDEX`).
- Score `/20` et verdict sont dans deux colonnes distinctes, séparées par le filet (voir Tension).
- Dense au centre, aéré sur les bords. Pas de cartes en grille uniforme : des lignes et des filets, comme un registre.
- **Motion L0 :**
  - transitions CSS de largeur et de hauteur, `cubic-bezier(.16,1,.3,1)`, ≤ 400 ms ;
  - tracé du personnage en `stroke-dashoffset` ;
  - `prefers-reduced-motion` → changements instantanés, personnage statique.

**C. Ce que le proto (`/bob --proto`, un seul fichier HTML) doit rendre réel :**
- un faux bureau macOS avec l'encoche simulée et ses 3 états ;
- le dépliage, les 2 boutons par gate, le geste de décision et le retour au repos ;
- la file de gates (`+1`) ;
- la bascule encoche ↔ cockpit (`Ouvrir le cockpit ↗`) ;
- le cockpit alimenté par un jeu de données factice : 3 features dans des lanes différentes, au moins une direction refusée en mémoire ;
- les sons synthétisés en Web Audio, réels et coupables ;
- un sélecteur de démo « déclencher gate ① / ② / ③ ».

Simulés : le hook, le socket, la lecture réelle du repo.

---

## 3. Identité : trois pistes de nom et de personnage

Toutes originales, sans rien qui évoque l'oiseau ou le coucou, la créature ronde, ni les sons de la référence.
**La disponibilité des noms (marque, domaine) n'a pas été vérifiée.**

| Piste | Nom | Personnage (repos → attente → tranché) | Sons |
|---|---|---|---|
| **A · recommandée** | **Paraphe** | Un trait d'encre vivant. Repos : un point d'encre qui respire. Attente : une boucle qui tourne sur elle-même, plume levée. Tranché : la signature se trace d'un seul geste (*retenue*, *approuvée*) ou une rature barre le trait (*refusée*). | Arrivée : une plume posée sur le papier. Décision : un grattement court et net (signature) ou un double trait sec (rature). |
| **B** | **Guichet** | La trappe d'un guichet, avec deux yeux, logée dans l'encoche. Repos : trappe fermée, une fente. Attente : la trappe s'entrouvre, les yeux regardent vers le bas. Tranché : un coup de tampon, puis la trappe se referme. | Arrivée : une sonnette de comptoir, un seul coup. Décision : un coup de tampon mat. |
| **C** | **Sas** | Trois lamelles, ①②③, comme un glyphe-personnage. Repos : trois traits fins. Attente : la lamelle du gate concerné s'entrouvre et luit (accent). Tranché : elle se referme en douceur (franchi) ou se bloque (renvoyé). | Arrivée : un déclic de verrou. Décision : un clac de fermeture, ou un verrou bloqué. |

**Recommandation : A · Paraphe.**
- C'est la seule piste où le personnage *est* l'acte demandé au designer : signer.
- Elle prolonge la tension mono/serif (le paraphe est l'élément serif vivant de l'encoche).
- Elle se dessine en un seul SVG animé en CSS (L0).

B a plus d'humour mais une métaphore administrative ; C est la plus structurelle mais la moins « personnage ».

---

## 4. ⚠️ Ne doit jamais apparaître
- Quoi que ce soit de l'identité Coucou : nom, Mochi ou créature ronde et molle, sons, icône.
- Flux d'activité de l'agent : fichiers, diffs, appels d'outils, chat, intégrations tierces, musique, voix.
- « Toujours autoriser », approbation en lot, auto-approbation sous condition. Un gate = un clic humain.
- Un nombre, une jauge ou une couleur qui combine `/20` et verdict.
- Une paire de couleurs sémantiques vert/rouge, un dégradé violet, une encoche en verre dépoli façon template macOS.
- Une pastille de notification rouge avec compteur.
- Compte, connexion, synchronisation cloud, télémétrie, appel réseau à l'exécution.
- Le gate ② affiché dans une feature en voie Sketch.

## 5. À trancher par le Talent avec ce brief (sans bloquer)
1. **Le nom et le personnage :** A, B ou C.
2. ***Refusée* au gate ③ depuis l'encoche.** La mémoire exige un apprentissage écrit (moitié DESIGN d'abord).
   - Proposition : le clic enregistre le verdict, puis l'apprentissage est demandé dans la conversation (ANALYZER), pas dans l'encoche.
   - Alternative : un champ d'une ligne « pourquoi » dans le panneau.
3. **Reprise du langage visuel de la landing PDS**, ou identité visuelle distincte pour le compagnon.

---

**[BOB] ⏸ En attente d'approbation. Rien n'est produit, ni prototype ni maquette, avant un oui explicite.**
