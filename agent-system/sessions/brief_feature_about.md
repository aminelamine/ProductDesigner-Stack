---
feature_id: about
feature_name: Section About — Parcours et manifeste
date: 2026-09-24
voie: standard
quality_brief_type: aesthetic
point_de_depart: reference memory/references/003-guillaume-zhu-recit-scroll.md (ancre) + memory/references/002-explorateur-creatif.md (vocabulaire)
mode: libre — registres vides (memory/design-system/registries/ETAT.md)
motion_level: demandé L3 par le motif (épinglage + défilement lié au scroll), implémentation CSS native, zéro GSAP — à trancher au CADRE
statut: APPROUVÉ — gate ①, v2, 2026-09-24, par Le Talent (points 1–5 acceptés)
barre_qualite: niveau Awwwards / FWA — UX et interaction au niveau des meilleurs sites publiés
---

# [BOB] ⏸ Brief de direction v2 — Section About (`components/about.tsx` · `lib/data.ts → ABOUT` · `sessions/about_parcours.md`)

```
Type            : aesthetic
Point de départ : référence memory/references/003 (ancre) · 002 (vocabulaire du trajet)
Mode            : LIBRE — registres vides. Tout token vient de identity.md ou est PROPOSÉ.
Contenu         : faits uniquement (LinkedIn, 9 postes) + ABOUT verbatim.
                  Tout texte nouveau est marqué ✎ et doit être validé.
```

**Direction** — Le hero est la carte ; l'About est **le trajet parcouru**. Une seule ligne
horizontale, comme le thermomètre de ligne au-dessus des portes d'un train, défile sous une tête
de lecture fixe pendant que le visiteur descend. Elle porte les neuf postes datés, deux
embranchements qui ont vraiment existé, et trois temps écrits en Playfair géant *sur* la ligne,
qui défilent avec elle. La ligne ne s'arrête pas : elle s'ouvre sur la chute, la phrase-titre
posée au bout, immobile.

**Les 3 mots** — `Ligne` · `Jalonné` · `Une voix`
*(`Légende` (v1) cède la place à `Ligne`. La légende survit comme composant (elle décode la
ligne), mais ce n'est plus l'idée. `Jalonné` et `Une voix` sont hérités de `identity.md`.)*

---

## L'architecture du récit : 5 plans, une seule section épinglée

Le récit **et** la ligne de temps sont **le même objet**. Pas de texte de récit à côté d'une
frise : deux dispositifs qui racontent la même chose, ça fait doublon. Le manifeste vient
**après**, en lecture libre : on voit d'abord le trajet, puis on entend la voix.

```
 ┌─ ÉPINGLÉ (sticky, ~5–6 hauteurs d'écran, à calibrer au proto) ─────────────────────────────┐
 │                                                                                              │
 │  0 SEUIL        02 / Parcours ✎ · « 2010 → aujourd'hui. Neuf postes, une ligne. » ✎         │
 │                 légende (4 signes) · la ligne entière en miniature = l'échelle de progression│
 │                                                                                              │
 │  1 AVANT        « Avant, la direction artistique. » ✎ défile sur la ligne                    │
 │  2010 → 2019    Crealyse · MMC/DDB · Havas · Wunderman Thompson · 3SG BBDO                   │
 │                                                                                              │
 │  2 PUIS         « Puis, le produit. » ✎                                                      │
 │  2019 → 2023    ── Brand and Bear ─────────────── (voie principale)                          │
 │                    ╲_ Afkar Incubator ______┤ (embranchement, butoir 2022)                   │
 │                                                                                              │
 │  3 AUJOURD'HUI  « Aujourd'hui, avec l'IA. » ✎                                                │
 │  2023 →         ── Niji ──────────────────────────→ (bout ouvert)                            │
 │                    ╲_ Gares & Connexions (SNCF) ___┤ (embranchement, butoir 2025)            │
 │                                                                                              │
 │  4 CHUTE        la ligne s'arrête de défiler. Au bout ouvert, immobile :                     │
 │                 « Je ne suis pas un designer qui utilise l'IA.   ← encre                     │
 │                   Je suis un designer qui pense avec. »          ← Voltage Blue             │
 └──────────────────────────────────────────────────────────────────────────────────────────────┘
   5 MANIFESTE (non épinglé, flux normal) : « Manifeste » (ABOUT.title) → suite du ¶1 → ¶2 → ¶3
                 → ¶4 + lien texte « Lire Obsolet » → coupure franche vers la section sombre
```

**La rime du récit** : le troisième temps finit sur *« avec l'IA »*, la chute finit sur
*« qui pense avec »*. Le dernier mot du trajet annonce la phrase-titre. C'est la seule
liberté d'écriture de ce brief, et elle est marquée ✎.

---

## La ligne de temps : tous les postes, sans regroupement caché

**Les 9 postes sont montrés.** Les regrouper effacerait ce qui rend le trajet intéressant :
cinq agences en neuf ans, puis deux périodes où deux activités ont réellement coexisté. Les
**3 temps** (proposition du conducteur, reprise) ne sont pas des boîtes. Ce sont des phrases
posées sur la ligne. Là où Puis et Aujourd'hui se recouvrent (2023–2025), la ligne le montre
honnêtement par deux voies parallèles, sans couper net.

**Géométrie** : une voie principale, celle qui mène à aujourd'hui, et deux embranchements
inférieurs, à 45° comme sur un plan de ligne. Chacun se termine par un **butoir**, un trait
perpendiculaire avec sa date de fin. Échelle **proportionnelle au temps à l'intérieur de chaque
temps**, avec un écart minimal entre stations pour que les libellés ne se chevauchent jamais
(les deux postes de 2010). Les graduations d'années restent visibles, ce qui rend cette
distorsion lisible au lieu de la cacher.

| # | Signe *(légende v1, réaffectée)* | Voie | Dates | Structure | Rôle | Fait affiché ✎ *(extrait tel quel de `about_parcours.md`, coupé, jamais reformulé)* |
|---|---|---|---|---|---|---|
| 1 | **Départ** | principale | fév. – juil. 2010 | Crealyse | Web Designer | Sites web et apps mobiles (iOS, Android) |
| 2 | Itinéraire | principale | sept. – déc. 2010 | MMC / DDB Tunisia | UI Designer, Art Director | Branding |
| 3 | Itinéraire | principale | janv. 2011 – avr. 2016 | Havas Worldwide Tunisia | UX/UI Designer, Art Director | Clients : Citroën, UBCI (BNP Paribas), BIAT, Tunisie Telecom |
| 4 | Itinéraire | principale | juin 2016 – juil. 2017 | Wunderman Thompson | UX/UI Designer, Art Director | Clients : Zain, Infiniti Cars, Boubyan Bank |
| 5 | Itinéraire | principale | sept. 2017 – mai 2019 | 3SG BBDO | UX/UI Designer, Art Director | Leadership créatif, supervision des équipes |
| 6 | **Bifurcation** (2019) | principale | juin 2019 – fév. 2023 | Brand and Bear | Product Designer — UI & Design System | DriverHero (A/B tests, −40 % sur le temps d'embauche) |
| 7 | Itinéraire + butoir | embranchement | juil. 2019 – juil. 2022 | Afkar Incubator | Product Designer, Art Director & Creative Coach | +100 startups accompagnées |
| 8 | Itinéraire + butoir | embranchement | mars 2023 – juil. 2025 | Gares & Connexions (SNCF) | Product Designer & Lead Design System | Refonte app MaGare SNCF, RGAA, expériences augmentées par l'IA en gare présentées aux JO Paris 2024 (Gare du Nord) |
| 9 | **Bifurcation** (2023) → **Relais** au bout ouvert | principale | mars 2023 – aujourd'hui | Niji | Senior Product Designer, Agentic Design | IA, AI-driven design |

**Ce que montre une station** : au repos, la date (Inter 300, capitales 14px, encre), la
structure (Inter 400 21px) et le rôle (Inter 300 16px). **Quand elle est active** (la tête de
lecture est dans sa période), le fait apparaît en dessous, en opacité seule, et son signe passe
de 40 % à bleu plein. C'est le geste d'allumage de la v1, conservé. On n'invente aucune relation
entre postes parallèles : deux voies, deux libellés, rien de plus. Lieu affiché seulement quand
LinkedIn le donne.

---

## L'interaction signature, réelle dans le prototype v2

**Le scroll vertical fait défiler la ligne horizontalement sous une tête de lecture fixe.**
La portion déjà parcourue est bleu plein, celle qui reste à parcourir est à 40 %. Chaque station
s'allume au passage de la tête. Un compteur d'année en chiffres tabulaires, sous la tête, dit où
l'on est dans le temps. Les phrases des 3 temps défilent avec la ligne : la typographie parcourt
le trajet au lieu de le décrire (réf. 003).

Règles de qualité, là où se fait la différence avec un effet de démo :
- **Scroll natif, jamais détourné.** Pas de capture de la molette, pas de bibliothèque de
  smooth-scroll. La position de défilement pilote la ligne, elle ne la remplace pas.
- **Une seule propriété animée** : `transform` sur une piste, plus `opacity` sur les faits.
  Rien d'autre ne bouge dans la section. Le manifeste est immobile (learning 002 : le mouvement
  traduit le concept ou il n'existe pas, et ici il n'appartient qu'à la ligne).
- **Mini-carte** en marge basse : la ligne entière à petite échelle, la tête y avance. C'est
  l'échelle de progression de la réf. 003, qui porte ici une information réelle au lieu de filets
  abstraits. Chaque station y est un lien.

**Équivalent clavier** : un lien « Passer le parcours » ✎ en tête de section, qui mène au
manifeste. Tab parcourt les 9 stations de la mini-carte ; Entrée fait défiler la page pour que
la tête se place sur la station, et `aria-current="step"` suit. Flèches gauche et droite : station
précédente ou suivante. Le DOM est un `<ol>` chronologique (`<time datetime>`, un `<h3>` par
temps), lisible dans l'ordre par un lecteur d'écran sans aucun effet visuel.

**`prefers-reduced-motion`**, sans JS, ou écran de moins de 500px de haut : **pas
d'épinglage, pas de défilement lié au scroll**. Les 3 temps s'empilent en flux normal. Chacun
porte son tronçon de ligne statique, toutes ses stations et tous ses faits sont visibles, et la
chute est posée. Même contenu, même ordre. C'est le **socle**, et l'épinglage n'est qu'une
amélioration par-dessus.

## Mobile (< 768px)

La ligne **reste horizontale et épinglée**. Une ligne verticale referait le rail du hero, donc
c'est exclu. La tête de lecture est à ~20 % de la largeur, avec une station active à la fois :
seule elle affiche structure, rôle et fait, en pleine largeur sous la ligne. Les autres ne
montrent que leur année. Les phrases des temps sont à ~72–96px et débordent volontairement,
puisqu'elles défilent. Les embranchements sont à 64px sous la voie principale. La mini-carte reste,
c'est la seule vue d'ensemble. Hauteur en `svh`. Paysage bas (< 500px) → le socle statique.

## Comment ne pas refaire le hero

```
  HERO (002, retenue)                        ABOUT v2
  ────────────────────────────               ────────────────────────────────────
  la carte : 3 arrêts, sans date      →      le trajet : 9 postes, datés, 2 embranchements
  axe VERTICAL, 3 lignes empilées            axe HORIZONTAL, une ligne qui défile
  rail qui se dessine une fois (load)        ligne qui ne se dessine pas, elle défile (scroll)
  libellés anglais du positionnement         temps en français, aucun des 3 libellés du hero
  affiche immobile après l'entrée            mouvement pendant la lecture, arrêt à la chute
```

Seul emprunt direct : **le repère du hero** (point noir + barre bleue à 40 %) comme signe
Itinéraire. La légende du seuil le décode, ce qui en fait une information et pas une citation.

---

## Les 5 dimensions : ce que je garde de la réf. 003, ce que je laisse

| Dimension | Choix v2 | Gardé de 003 | Laissé de 003, et pourquoi |
|---|---|---|---|
| **Direction** | Le trajet parcouru : ligne horizontale défilante, 3 temps, chute au bout ouvert | La **dramaturgie en temps** (First · Then · Today → Avant · Puis · Aujourd'hui), le **scroll comme tête de lecture**, **une chute** | Le monogramme 3D et le nom qui glisse hors cadre (plans 1–3) : c'est une ouverture de hero, et le nôtre existe déjà |
| **Typographie** | Playfair Display 400 pour les 3 phrases de temps, posées sur la ligne comme ligne de base, `clamp(96px, 14vw, 200px)` *proposé*. Phrase-titre en Playfair 77px lg / 42px mobile (calibrage du proto v1). Inter 300/400 pour tout le reste : dates en capitales 14px +0,08em, structure 21px, fait 16px, compteur en `tabular-nums` | La **typographie qui voyage le long du tracé** : les mots défilent avec la ligne sur la période qu'ils nomment | Lettres qui ondulent, se dispersent ou tombent une à une : chorégraphie de lettres = décoration, et elle casse la lecture de Playfair. Grotesk géant : socle Playfair / Inter verrouillé (002) |
| **Palette** | Socle crème `#fff8f1` continu (decisions/002). Voltage Blue `#006eff` pour la ligne (parcouru plein / à venir 40 %), les signes, la tête, les phrases de temps et la 2e phrase de la chute. Encre `#000000` pour tout le texte ≤ 21px et la 1re phrase de la chute. Ash `#e2e8f0` pour les graduations et la mini-carte | Le **fond papier chaud** (c'est déjà notre crème) et la **fusion de deux mondes**, traduite sans dégradé : la négation en encre, l'affirmation en bleu, sur la même ligne | Dégradés, grain, 3D, orange/violet, alternance clair/sombre dans la section : `identity.md` (surfaces plates, un seul accent) et decisions/002 (crème continu) priment |
| **Tension** | **Mouvement contre arrêt** : la ligne défile, la tête ne bouge pas ; la chute est le seul plan immobile. **Échelle, pas poids** *(carried 002)* : Playfair 200px contre des dates Inter 14px. **Densité contre étendue** : cinq postes serrés en neuf ans contre une voie ouverte | Le contraste « Today, calme, plein centre » après les plans en mouvement | Le contrepoint de deux lignes qui se croisent (plan 3) : trop proche des lignes empilées du hero |
| **Composition** | Plein cadre, une seule colonne. La ligne traverse bord à bord, tête à ~1/3 de la largeur *(à juger)*. Phrase de temps au-dessus, stations en dessous, embranchements plus bas, mini-carte en marge basse, index calé sur l'axe texte du hero (`px-6 md:px-16 lg:px-36`). Manifeste ensuite, colonne ≤ 600px sur le même axe, filets ash | **Épinglage**, **un temps par écran**, **échelle de progression en marge** (devenue mini-carte) | La diagonale courbe : une courbe serait décorative et rappellerait le tracé dessiné du hero, alors qu'une ligne droite avec embranchements à 45° est de la signalétique (réf. 002). Cartes à coins arrondis, nav en pill translucide |

**Réf. 002 (vocabulaire)** : on garde la grammaire du trajet (étape · bifurcation · route
alternative, qui devient embranchement) et le deux-tons des signes (bleu 40 % + noir). On laisse le
chemin sinueux, les personnages et le multicolore, comme en v1.

**Registre** : le thermomètre de ligne ferroviaire (stations, parcouru / à venir, embranchements,
butoir) vient de la signalétique de la réf. 002, pas d'une référence classée. S'il est retenu, il
faudra le déposer en `memory/references/004`.

---

## Motion : ce que la direction demande

Elle demande **L3 par le motif** : épinglage et défilement lié au scroll figurent dans la colonne
L3 de `design_guide.md`, et L0 ne les autorise pas. En revanche elle **ne demande pas GSAP** :
`position: sticky` + animations CSS liées au scroll (`animation-timeline`), avec un repli
minimal (un écouteur de scroll, `requestAnimationFrame`, une seule `transform`) là où ce n'est
pas pris en charge. `motion/react` sort de ce composant.
→ **À trancher au CADRE par RAY** : `motion_level: L3` + `motion_note` « motif L3, implémentation
CSS native, zéro GSAP », ou une exception ADR à ADR-007.
→ Note pour le CADRE : l'échappement plein cadre du hero utilise `overflow-x-clip`, et il doit
rester `clip`. Avec `hidden`, le `sticky` casse.

## Contraintes : ce qui ne doit jamais apparaître

- Une ligne **verticale**, des lignes display empilées avec repères, un tracé qui se dessine au
  chargement : c'est le hero
- Deux colonnes avec un élément graphique isolé (**refusée**, 001)
- Un second accent, un dégradé, une ombre, une texture, un grain, un coin arrondi
- Du texte ≤ 21px en Voltage Blue : 4,27:1 sur crème, échec AA (constat du proto v1)
- Une capture de la molette, un smooth-scroll de bibliothèque, un fondu + translation en cascade
  sur le manifeste
- Une seconde pill « Lire Obsolet » : ici c'est un lien texte
- Toute modification des 4 paragraphes, toute information de parcours absente de LinkedIn,
  toute relation supposée entre postes parallèles

## Déjà jugé ici

- **001 (refusée)** : une colonne, plein cadre structurel, contrainte tenue.
- **002 (retenue, hero)** : typo, palette et tension par l'échelle *carried*, non rouvertes.
  Ce qui est rouvert : la surface, le dispositif, et un niveau de mouvement au-delà de L0.
- **decisions/002 (actée)** : l'About est sur le crème et forme un bloc continu avec le hero. La
  coupure vers le sombre est traitée : *proposé* ✎, la section se ferme sur un filet Voltage Blue
  pleine largeur, puis coupe franchement vers Obsolet. Le ¶4 finit sur « dans Obsolet », et la
  section suivante est Obsolet.

## Ce que la v2 garde de la v1 approuvée, ce qu'elle abandonne

| | Élément v1 | v2 | Pourquoi |
|---|---|---|---|
| ✔ | Migration crème (decisions/002) | gardée | actée, et la ligne ne se lit que sur la même feuille que la carte |
| ✔ | Libellés **Départ · Bifurcation · Itinéraire · Relais** | gardés, **réaffectés** des paragraphes aux points de la ligne | sur la ligne, ils sont factuels : Bifurcation = 2019 et 2023, vraies fourches |
| ✔ | Phrase-titre = 2 premières phrases du ¶1 | gardée, **déplacée de l'ouverture à la chute** | c'est la fusion (« pense avec »), la destination du trajet |
| ✔ | Repère du hero comme premier signe | gardé | même fonction : la légende décode le glyphe déjà vu |
| ✔ | Allumage 40 % → bleu plein | gardé comme micro-geste de station | c'est le geste validé de la v1 |
| ✔ | ¶ verbatim, lien texte Obsolet, pas de second accent | gardés | invariants |
| ✔ | Corrections du proto v1 (encre sous 21px, 42px mobile, capitales +0,08em) | gardées | constats au prototype, pas des goûts |
| ✘ | `Légende` comme idée directrice | abandonnée pour `Ligne` | une légende sans trajet parcouru décode une carte, mais ne raconte rien |
| ✘ | Rangée de légende collante + liaison clé ↔ paragraphe comme signature | abandonnée | remplacée par le défilement de la ligne ; la légende ne reste qu'au seuil |
| ✘ | Libellés sur les 4 paragraphes | abandonnés | le manifeste redevient une voix continue |
| ✘ | L0, « aucune entrée animée » | abandonné | le récit au scroll l'exige (voir Motion) |

---

**[BOB] ⏸ En attente d'approbation. Rien n'est produit avant un oui explicite.**

Points à trancher avec le oui :
1. **Textes nouveaux ✎** : « 02 / Parcours » · « 2010 → aujourd'hui. Neuf postes, une ligne. » ·
   « Avant, la direction artistique. » · « Puis, le produit. » · « Aujourd'hui, avec l'IA. » ·
   « Passer le parcours ».
2. **Les 9 faits affichés** (colonne du tableau) : extraits coupés de LinkedIn, à valider ligne
   par ligne.
3. **Réaffectation** des 4 libellés v1 aux points de la ligne, et **phrase-titre en chute**
   (encre / bleu).
4. **Motion** : autoriser le prototype v2 à dépasser L0 pour montrer le défilement (sinon la
   direction ne peut pas être jugée en main). Le niveau final est tranché au CADRE.
5. *Optionnel* : le filet bleu à la coupure vers la section sombre.

---

## Historique

- **v1 — approuvée le 2026-09-24** (« l'About est la légende de la carte » : phrase-titre + 4
  paragraphes typés Départ · Bifurcation · Itinéraire · Relais, liaison clé ↔ entrée, L0).
  Prototype : `prototypes/001-about-legende.html`. **Amendée par Le Talent** après le prototype :
  la légende décodait le manifeste mais ne racontait pas le parcours. Il demande du storytelling
  et une ligne de temps de son parcours, au niveau Awwwards / FWA, avec
  `references/003-guillaume-zhu-recit-scroll.md` comme nouvelle ancre.
- **v2 — en attente, gate ①** (ce document).


---

## ✅ Gate ① v2 — approuvé par Le Talent, 2026-09-24

Approuvé avec les 5 points : textes nouveaux ✎, les 9 faits affichés, réaffectation des libellés
+ phrase-titre en chute (encre → bleu), prototype v2 autorisé au-delà de L0 (le niveau motion du
code produit reste à trancher au CADRE), filet bleu à la coupure vers la section sombre.
Barre de qualité maintenue : niveau Awwwards / FWA.

---

## Hors scope — cycles suivants (décidé par Le Talent, 2026-09-24)

Retours faits pendant le prototype About, qui touchent **d'autres surfaces** — traités en cycles
`/pds` séparés, **après** la clôture de l'About :

1. **Hero** — « plus design, avec une animation, un background ». Rouvre la direction retenue
   `memory/directions/002`. **Reste dans le socle** `identity.md` (aplats, illustration deux tons,
   animation de tracés — pas de dégradé, texture ni ombre).
2. **Section Obsolet + footer** — « Obsolet prend trop de place ». Migration de section = décision
   à part (`memory/decisions/001`).
