---
feature_id: hero
feature_name: Hero — Le plan du réseau
date: 2026-09-24
voie: standard
quality_brief_type: aesthetic
point_de_depart: brief du Talent (composition A « Le plan du réseau », schéma fourni) + continuité imposée avec l'About v2 approuvé (prototypes/002-about-trajet.html)
mode: libre, registres vides (memory/design-system/registries/ETAT.md). Tout token absent de identity.md est PROPOSÉ.
motion_level: entrée CSS (compatible L0) + départ lié au scroll = motif L3, implémentation CSS native, même moteur que l'About, zéro GSAP. À trancher au CADRE.
statut: APPROUVÉ — gate ①, 2026-09-24, par Le Talent (« let's go » — points 1 à 5 acceptés tels que proposés)
barre_qualite: niveau Awwwards / FWA en UX et interaction
---

# [BOB] ⏸ Brief de direction — Hero (`components/hero.tsx` · `components/hero-trajectory.tsx` · `lib/data.ts → HERO`)

```
Type            : aesthetic
Point de départ : brief du Talent, composition A « Le plan du réseau » (choisie, non rouverte)
Mode            : LIBRE. Registres vides : tout token vient de identity.md ou de l'About v2, sinon il est PROPOSÉ
Contenu         : HERO.headline verbatim (verrou P-001 CA-5), HERO.subtitle, 2 pills. Aucun texte nouveau requis
```

**Direction** : le hero est **le plan du réseau**. Trois lignes de train horizontales entrent par
le bord gauche du cadre. Chacune porte un rôle en Playfair géant posé dessus, et elles convergent
en un seul nœud bleu. Une seule ligne en repart et sort du cadre : c'est la ligne que l'About fait
défiler. Au chargement, le réseau se trace. Au repos, c'est une affiche. Au scroll, la ligne de
sortie se remplit et emmène le lecteur vers le trajet.

**Les 3 mots** : `Réseau` · `Convergence` · `Affiche`
*(`Jalonné` passe à l'About, qui porte les jalons datés. `Une voix` n'est plus un mot de
direction : c'est une contrainte du socle. `Affiche` reste parce qu'elle décide de l'état au
repos.)*

---

## La composition

### Desktop (géométrie horizontale)

```
        ●▬ Creative Explorer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╲
                                              ╲
        ●▬ Product Designer                    ╲
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◉┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄→ bord droit
                                               ╱   ligne de sortie : 40 % au repos, se remplit au scroll
        ●▬ Agentic Design                     ╱
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╱
        Product Designer – AI & Product Systems
        ( Me contacter )  ( Lire Obsolet ↗ )

  ━  ligne de rôle, Voltage Blue plein, 1,5 px         ●▬  repère du hero 002 (point encre + barre bleue)
  ┄  ligne de sortie, même trait, bleu 40 %            ◉   nœud de correspondance, bleu plein, anneau crème
```

- **Les noms sont posés sur leur ligne**, qui leur sert de ligne de base. C'est le dispositif des
  phrases de temps de l'About (« posées sur la ligne comme ligne de base »). Le hero et l'About
  parlent donc la même grammaire : du Playfair bleu *sur* un trait bleu de 1,5 px. Les jambages
  (p, g) traversent le trait, comme dans l'About, sans skip-ink simulé.
  *Écart assumé au schéma, qui place le trait à mi-hauteur après le nom : sur l'axe, le trait
  s'interrompt au nom et le mobile n'a plus de place. En ligne de base, le trait court sous le nom
  quelle que soit sa longueur.*
- **Les lignes entrent par le bord gauche** (x = 0, plein cadre) et ne commencent par aucun
  terminus. Les trois rôles existent au-delà du cadre, puisque le plan continue hors de la feuille.
- **Géométrie octolinéaire** (0° / 45°), comme un plan de métro, sans aucune courbe libre. La
  ligne 2 va droit au nœud. Les lignes 1 et 3 plient à 45° et le rejoignent. Les angles sont vifs
  (`miter`), comme la ligne de l'About.
- **Le nœud** est placé à droite du nom le plus long, avec un dégagement d'environ 1 pas de ligne,
  soit à peu près 70–75 % de la largeur à 1440 px (*à calibrer au proto*). La ligne de sortie court
  ensuite du nœud jusqu'au bord droit.
- **Toute la géométrie est en `em` du corps display** (learning 002). Les largeurs des noms en
  Playfair sont fixes en em, donc le nœud, les plis et les pas se calculent sans mesure JS. Le SVG
  est rendu côté serveur, complet.
- La **colonne texte** reste sur l'axe du site (`px-6 md:px-16 lg:px-36`). Sous-titre et pills
  restent sous le headline, sur le même axe, comme dans le schéma.

### Mobile 375 px (convergence verticale)

```
  ●▬ Creative Explorer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ●▬ Product Designer             ┃
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃
  ●▬ Agentic Design             ┃  ┃
━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃  ┃     faisceau de 3 verticales, pas 6 px, gouttière droite
                             ╲ ┃ ╱
                               ◉        nœud sous le h1
                               ┆
  Product Designer – AI & …    ┆        ligne de sortie VERTICALE : elle descend vers l'About
  ( Me contacter )             ┆        et se remplit dans le sens du scroll
  ( Lire Obsolet ↗ )           ┆
───────────────────────────────┆──  → haut de l'About
```

- Même topologie qu'en desktop (3 → 1 → sortie), tournée d'un quart : chaque ligne plie à 90° dans
  la gouttière droite. La ligne du haut plie le plus à l'extérieur, ce qui évite tout croisement.
  Le faisceau converge à 45° dans le nœud.
- Sur mobile, « vers l'About », c'est **vers le bas**. La ligne de sortie descend donc dans la
  gouttière droite jusqu'au bas du hero, et son remplissage suit le sens du pouce.
- Noms en Playfair `clamp(34px, 10.5vw, 44px)` *proposé*. « Creative Explorer » doit tenir avant
  le faisceau, ce qui laisse environ 12 px de marge à 375 px, à vérifier au proto.
- **Le basculement horizontal ↔ vertical n'est pas un breakpoint deviné.** La géométrie
  horizontale s'active quand *nom le plus long + 2 pas de ligne + ~20 % de ligne de sortie* tient
  dans la largeur utile, sinon la géométrie verticale prend le relais. Entre 768 et 1023 px, le
  proto dira laquelle s'applique.

---

## Le « background » : c'est le réseau, et rien d'autre

Il n'y a **pas de couche de fond indépendante**. Le fond demandé par Le Talent, c'est le réseau
qui occupe le cadre bord à bord : trois lignes qui entrent par la gauche, une qui sort par la
droite (ou par le bas), tracées à l'échelle du Playfair géant. Le cadre crème est traversé, pas
décoré.

| Candidat au fond | Décision | Pourquoi |
|---|---|---|
| Le réseau lui-même, plein cadre | **retenu** | il porte l'information (3 rôles, 1 convergence, 1 suite) |
| Repère du hero 002 (point encre + barre bleue) sur chaque ligne | **retenu**, taille unique 0,3 em | l'About v2 en fait son signe Itinéraire, et sa légende décode « le glyphe déjà vu ». Sans le repère, ce lien est rompu. La taille dégressive 5:4:3 disparaît : les trois lignes sont des pairs |
| Graduations / quadrillage ash (graticule de carte) | écarté | décoration sans information (`identity.md`) |
| Grand aplat bleu 40 % (zone de correspondance, silhouette) | écarté | un bloc graphique à droite, c'est la composition refusée 001. Les aplats restent dans les signes |
| Origines des lignes datées (2008 · 2019 · 2023, longueur = ancienneté) | écarté | ça ferait du hero une seconde frise, doublon de l'About. Surtout, la ligne de sortie irait alors du présent vers 2008, un sens du temps contradictoire. Le hero reste **hors du temps** : c'est un plan, pas une chronologie |

---

## La chorégraphie

### Entrée, une fois par chargement, ≈ 1,5 s, jamais en boucle

| t | Ce qui se passe | Propriété |
|---|---|---|
| 0 | Crème. Les noms sont **déjà peints**, à 80 % (convention « à venir » de l'About). Les repères sont à 40 %. Les lignes sont absentes | aucune |
| 0 → ~900 ms | Les 3 lignes se tracent depuis le bord gauche, avec des départs décalés de 0 / 80 / 160 ms. Les durées sont calculées sur la longueur de chaque tracé pour que **les trois pointes arrivent au nœud au même instant** : c'est le hook. Quand une pointe passe sous son repère, la barre passe de 40 % à plein et le nom de 80 % à 100 % (l'allumage de l'About) | `stroke-dashoffset` (`pathLength=1`), `opacity` |
| ~900 ms | Arrivée : le nœud apparaît (`scale` 0 → 1, 240 ms) et **un anneau** de 1,5 px part du nœud une seule fois. C'est le geste d'arrivée en station de l'About | `transform`, `opacity` |
| ~1000 → 1500 ms | La ligne de sortie se trace du nœud au bord, à 40 %. Sous-titre et pills en opacité seule, 300 ms, sans translation | `stroke-dashoffset`, `opacity` |

Easing : les tracés freinent à l'arrivée au nœud, comme la ligne de l'About freine à chaque
station, avec `cubic-bezier(0.65, 0, 0.35, 1)` *proposé*. Tout le reste utilise `--ease-out`
`cubic-bezier(0.2, 0, 0, 1)`, repris de l'About.

### Après l'entrée

- **Au repos : immobile.** C'est une affiche. Pas de pulsation, pas de train qui circule en boucle.
  Une boucle serait décorative, et au-delà de 5 s elle exigerait un bouton pause (WCAG 2.2.2).
- **Survol d'une ligne** (`@media (hover: hover)`, zone = la rangée entière) : la ligne survolée,
  le nœud et la ligne de sortie passent en plein. Les deux autres lignes descendent à 40 % et leurs
  noms à 80 %, en 160 ms, en opacité seule. Le geste dit que **chaque rôle mène au même trajet**.
  C'est le geste d'un plan de réseau interactif (isoler une ligne). Il ne porte aucune information
  exclusive, donc il ne demande pas d'équivalent clavier.
- **Scroll, « le départ »** : la plage va de la position 0 au moment où le bas du hero quitte le
  haut de l'écran. La ligne de sortie **se remplit de 40 % à plein**, du nœud vers le bord (ou vers
  le bas sur mobile). C'est la convention parcouru / à venir de l'About, qui commence ici. Une seule
  propriété bouge (`transform: scaleX`, ou `scaleY` sur mobile, appliquée à une copie pleine du
  tracé). Les noms, les lignes de rôle et le texte ne bougent pas : pas de parallaxe. Le scroll
  reste natif, sans capture de molette ni smooth-scroll de bibliothèque.

### Niveau motion demandé, et pourquoi

- **Entrée et survol : CSS pur.** Keyframes sur `stroke-dashoffset`, `transform` et `opacity`,
  compatibles L0. Le tracé traduit le concept (learning 002) : le réseau se dessine, au lieu d'un
  fondu + translation uniforme.
- **Départ au scroll : motif L3**, pour la même raison que l'About. Implémentation CSS native
  (`animation-timeline: view()`), avec le repli de l'About (un écouteur passif et
  `requestAnimationFrame`). Il n'y a **qu'un seul moteur pour les deux sections**, et zéro GSAP.
- `motion/react` sort du hero : les 3 `motion.div` de CA-16 sont remplacés par du CSS. → **À
  trancher au CADRE par RAY**, dans la même décision que l'About (`motion_level: L3` +
  `motion_note`, ou une exception ADR à ADR-007).

---

## La continuité avec l'About : la ligne de sortie EST la ligne du trajet

| | Hero : ligne de sortie | About v2 : ligne du trajet |
|---|---|---|
| Trait | 1,5 px, `miter` | 1,5 px, `miter` |
| Couleur | Voltage Blue, **40 % à venir / plein parcouru** | idem |
| Mécanique | se remplit au scroll | défile au scroll sous la tête |
| Signes | repère (point encre + barre) = futur signe Itinéraire · nœud = disque + anneau crème 3 px (construction de la tête de lecture de l'About), en bleu parce que c'est une correspondance, pas la tête · anneau d'arrivée | Itinéraire · tête (disque encre + anneau crème) · anneau d'arrivée en station |
| Texte | Playfair bleu posé sur la ligne | Playfair bleu posé sur la ligne |

Le lecteur quitte le nœud par la voie d'accès, qui se remplit pendant qu'il descend. L'About prend
ensuite le relais au signe **Départ**, avec sa ligne à 40 % devant la tête.

*Examiné puis écarté* : une jonction physique au même y, en épinglant le hero pour que sa ligne
devienne la piste de l'About. On aurait deux sections épinglées d'affilée, lourdes sur mobile, et
l'épinglage du hero concurrencerait celui de l'About. Si Le Talent la veut quand même, c'est un
point à rouvrir, pas un réglage.

---

## Les 5 dimensions

| Dimension | Choix | Hérité (carried) | Changé |
|---|---|---|---|
| **Direction** | Le plan du réseau : 3 lignes de rôle convergent en un nœud, 1 ligne part vers le trajet | une colonne, plein cadre structurel (001), le mouvement traduit le concept (002) | le headline n'est plus *le trajet* mais *le plan*. Le trajet appartient désormais à l'About |
| **Typographie** | Playfair Display 400 pour les 3 noms, desktop `clamp(40px, 7.2vw, 112px)` *proposé* (à calibrer pour que nom + convergence tiennent), mobile `clamp(34px, 10.5vw, 44px)` *proposé*. Pas entre lignes de base ≈ 1,2 em *proposé*. Inter 300 16px pour le sous-titre, pills inchangées | Playfair / Inter, tracking −0,02 em (socle) | les `|` ne sont plus affichés (voir Accessibilité) |
| **Palette** | Crème `#fff8f1`. Voltage Blue `#006eff` pour les lignes, les noms (grand texte, 4,27:1 ≥ 3:1), le nœud et les barres de repère. Bleu 40 % pour la ligne de sortie à venir, les repères au repos et les lignes non survolées. Encre `#000000` pour les points des repères, le sous-titre et le texte des pills | socle `identity.md`, sans le rouvrir | ash n'apparaît pas dans le hero |
| **Tension** | **Trois contre un** : trois lignes denses à gauche, une seule qui s'échappe vers la droite, dans le vide. **Échelle, pas poids** : un Playfair de 110 px posé sur un filet de 1,5 px, les lignes ne s'épaississent jamais. **Mouvement puis arrêt** : le réseau se trace, puis l'affiche se tait | échelle, pas poids (002) | la tension spatiale de 002 (bloc dense / bloc dégagé) devient une tension topologique |
| **Composition** | Plein cadre, colonne texte sur l'axe du site, réseau bord à bord derrière et sous le texte. Géométrie octolinéaire en em. Mobile : même topologie tournée, convergence verticale dans la gouttière droite | em relatifs, pas de logique responsive séparée pour les signes (002) | le rail vertical 1,5 px de 002 disparaît en desktop. Les lignes deviennent horizontales et convergent |

### 002 : reconduite ou remplacée ?

**Remplacée sur la surface Hero.** Son idée directrice (« le headline est le trajet, rail
vertical ») cède la place au plan du réseau, parce que le trajet est désormais raconté par
l'About v2, qui est approuvé. Garder un trajet dans le hero ferait doublon. 002 reste `retenue`
dans l'historique : elle était juste à son heure, et ses acquis sont reconduits (typo, palette,
échelle pas poids, une colonne, plein cadre, repère en em, le mouvement traduit le concept).
Au MÉMORISER, la nouvelle direction s'écrit en `directions/004` et référence 002 comme remplacée.

**À signaler, sans bloquer** : `identity.md → L'histoire visuelle` dit « une route à trois arrêts
[…] la mise en page *est* cette route ». Le socle (le tableau) n'est pas touché. Mais si cette
direction est retenue, la phrase devrait devenir « un réseau de trois lignes qui convergent, puis
un trajet ». Cette décision appartient au Talent, au MÉMORISER.

---

## Comment ne pas retomber sur la composition refusée 001

| 001 (refusée) | Ce brief |
|---|---|
| Deux colonnes : headline à gauche, **élément graphique isolé** à droite | Le réseau n'est pas à côté du texte, il est **sous** lui : chaque nom est posé sur sa ligne, qui part du bord gauche. **Test au proto** : si on masque les noms, les lignes restent visiblement *leurs* lignes. Rien à droite du nœud ne porte de contenu propre, seulement la ligne qui sort |
| Plein cadre jamais atteint | Les lignes touchent les deux bords, donc le plein cadre devient visible et plus seulement structurel (ADR-011 conservé, `overflow-x-clip`, jamais `hidden`) |
| `|` orphelin en fin de ligne | Les `|` ne sont plus affichés : le séparateur visuel, c'est la ligne elle-même. Le problème disparaît par construction (learning 001) |
| Illustration signpost | Pas d'illustration. Les seuls aplats sont ceux des signes |

---

## Accessibilité

- **`<h1>` en texte réel**, rendu côté serveur, peint dès la première frame (80 % puis 100 %, jamais
  0). C'est le LCP, et il n'attend jamais le décor. Son `textContent` reste **verbatim** :
  `Creative Explorer | Product Designer | Agentic Design`. Les deux ` | ` sont dans des `<span>`
  visuellement masqués, et chaque rôle occupe une rangée visuelle.
- Tout le réseau tient dans **un seul `<svg aria-hidden="true" focusable="false">`**. Les repères
  sont `aria-hidden`.
- Aucun texte ≤ 21 px en bleu (règle de l'About). Pills inchangées : `Me contacter`,
  `Lire Obsolet` + « (nouvel onglet) » masqué, focus visible (anneau bleu 2 px, offset 3 px),
  cibles ≥ 44 px.
- Ordre de focus : pills uniquement, le décor n'est jamais focusable.
- Zoom 200 % et reflow : la géométrie en em suit. Si le nom le plus long ne tient plus,
  c'est la géométrie verticale qui prend le relais (même règle que sur mobile).

## `prefers-reduced-motion` · sans JS

- **Reduced motion** : l'état final est posé d'emblée (lignes tracées, noms à 100 %, nœud présent,
  ligne de sortie à 40 %). Pas de remplissage au scroll. Le survol change l'opacité sans
  transition.
- **Sans JS** : l'entrée est en CSS pur, elle joue donc quand même. Le moteur de scroll étant
  absent, la ligne de sortie reste à 40 %. Le SVG est complet côté serveur, il n'y a pas de
  géométrie mesurée.

---

## Contraintes : ce qui ne doit jamais apparaître

- Deux colonnes avec un élément graphique isolé (**refusée**, 001), ou un bloc graphique à droite
  du nœud
- Dégradé, texture, grain, ombre, 3D, coin arrondi (hors pills), second accent
- Courbes libres, trait qui s'épaissit, trait de plus de 1,5 px
- Animation en boucle au repos, parallaxe, fondu + translation en cascade, capture de la molette
- Texte caché à 0 % d'opacité en attendant le tracé (LCP et lecteurs d'écran)
- Toute paraphrase du headline, un hook textuel ajouté, une date dans le hero

## Déjà jugé ici

- **001 (refusée, hero)** : contrainte tenue, voir le tableau plus haut.
- **002 (retenue, hero)** : **remplacée** sur l'idée directrice, acquis reconduits.
- **About v2 (approuvé, gate ①)** : le hero lui fournit le glyphe Itinéraire, la grammaire « texte
  posé sur la ligne » et la convention 40 % / plein. En échange, il s'interdit toute chronologie.
- **decisions/001 et 002 (actées)** : `.theme-drive` scopé, hero et About forment un bloc crème
  continu, qu'aucun changement de fond ne sépare.

---

**[BOB] ⏸ En attente d'approbation. Rien n'est produit avant un oui explicite.**

Points à trancher avec le oui :

1. **Noms posés sur leur ligne** (ligne de base) plutôt que le trait à mi-hauteur du schéma.
2. **Les `|` ne sont plus affichés**, mais restent dans le DOM (`textContent` verbatim). RAY doit
   confirmer que P-001 CA-5 porte sur le texte, pas sur le glyphe visible.
3. **Repère 002 conservé en taille unique** (le dégressif 5:4:3 disparaît). C'est le glyphe que la
   légende de l'About décode.
4. **Motion** : autoriser le prototype hero à dépasser L0 pour montrer le départ au scroll. Le
   niveau final est tranché au CADRE, avec l'About.
5. *Optionnel ✎* : un renvoi au bout de la ligne de sortie, `02 / Parcours →` (Inter 300,
   capitales 12 px, encre). Ce n'est pas un texte nouveau, c'est l'index déjà approuvé de l'About,
   utilisé comme renvoi de plan (« suite feuille suivante »). Aucun hook textuel n'est proposé :
   le hook, c'est l'arrivée simultanée des trois lignes au nœud.

Note pour le prototype (`/bob --proto`, après le oui) : il doit contenir **le haut de l'About**
(seuil + début de la ligne, repris de `prototypes/002-about-trajet.html`), pour que la jonction
se juge en main et pas sur un schéma.


---

## ✅ Gate ① — approuvé par Le Talent, 2026-09-24

Réponse : « let's go ». Points 1 à 5 acceptés tels que proposés (noms posés sur leur ligne ; `|`
masqués visuellement, texte exact conservé — confirmation CA-5 par RAY au CADRE ; repère 002 en
taille unique ; prototype autorisé au-delà de L0 ; renvoi optionnel « 02 / Parcours → » inclus au
prototype, retirable au jugement). Barre de qualité : Awwwards / FWA.
