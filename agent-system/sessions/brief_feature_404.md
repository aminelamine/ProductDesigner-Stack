---
feature_id: 404
surface: Page 404 — portfolio single-page
type: aesthetic
voie: sketch
point_de_depart: brief
mode: libre (registres vides — memory/design-system/registries/ETAT.md)
date: 2026-09-26
statut: en attente d'approbation (gate ①)
---

# [BOB] ⏸ Brief de direction — Page 404

> Brief du designer : « quelqu'un arrive sur une adresse morte, on le ramène vers le trajet sans
> casser le ton. »

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[AESTHETIC BRIEF — Feature 404 : Voie sans issue]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Type :** aesthetic · **Départ :** brief · **Mode :** libre — les registres sont vides, tout ce qui
n'est pas au socle d'`identity.md` est **proposé**, pas existant.

**Les 3 mots :** `Butoir` · `Correspondance` · `Affiche`

## 🎯 Direction

L'adresse morte est une **voie sans issue** du réseau : une ligne à l'encre entre par le bord
gauche et s'arrête net sur un **butoir** ; juste avant lui, une **correspondance** bleue part à
45° et reprend le trajet — elle *est* le lien vers « 02 / Parcours ».

Concrètement :
- **Métaphore :** la voie de garage / fin de voie. La page ne s'excuse pas, elle signale — comme un
  panneau de quai. L'encre dit la négation (cette voie s'arrête), le bleu dit l'affirmation (le
  trajet continue) — même grammaire que 005.
- **Texte (proposé, à valider au prototype) :**
  - étiquette de quai, capitales Inter : `VOIE 404 — SANS ISSUE`
  - titre Playfair : « Cette adresse ne mène nulle part. »
  - une ligne Inter 300 : « Le trajet, lui, continue. » + le chemin demandé affiché en capitales
    tabulaires, en encre, comme le nom d'une station hors plan (texte échappé, tronqué au-delà
    d'une largeur).
- **Action — un seul geste principal :** la correspondance bleue se termine sur le renvoi
  **« 02 / Parcours → »** (`/#parcours`), même libellé et même flèche → qui pivote au survol qu'en
  004. C'est le lien principal, et le seul élément bleu interactif.
- **Liens :**
  1. primaire — `02 / Parcours →` → `/#parcours` (le trajet, l'About)
  2. secondaire — « Revenir au plan » → `/` (le hero), Inter caps petit corps, encre, sans flèche
  3. le header reste celui du site (vraie navigation, décision 003) — « Me contacter » y est déjà ;
     rien n'est dupliqué dans la page.

## 🔤 Typographie — *conforme au socle*

Playfair Display 400 / Inter 300–400 (`identity.md`, verrouillé par 002).
→ un titre géant, une voix basse.
- Titre Playfair 400, grand corps (même famille d'échelle que la chute de 005) — *taille proposée*.
- Étiquette de quai et chemin demandé : Inter 400 capitales, interlettrage capitales, chiffres
  tabulaires.
- Corps Inter 300. Aucune graisse forte : la tension passe par l'échelle.

## 🎨 Palette — *conforme au socle*

Crème `#fff8f1` · Voltage Blue `#006eff` · Encre `#000000` · ash `#e2e8f0` (`identity.md`).
- **Encre** : la voie morte, le butoir, le titre, le chemin demandé — la négation.
- **Bleu** : uniquement la correspondance et le renvoi « 02 / Parcours → » — l'affirmation, un seul
  accent.
- **Ash** : filets éventuels (sous l'étiquette de quai). Pas de bleu 40 % : ici rien n'est « à venir ».
- Surfaces plates, aucune ombre, aucun dégradé. Pas de thème sombre : la 404 naît sur le socle crème.

## ⚡ Tension

**Arrêt contre correspondance** — la ligne d'encre qui bute, la ligne bleue qui repart.
Échelle, pas poids : Playfair géant contre un filet de 1,5 px et une étiquette en petites
capitales.

## 📐 Composition

- Une colonne, pleine page, la voie **bord à bord** depuis le bord gauche (plein cadre structurel,
  apprentissage de 001) ; géométrie 0 / 45 / 90° du réseau (004).
- Le butoir tombe au tiers droit ; le titre est posé **sur** la voie morte, l'étiquette au-dessus ;
  la correspondance part 1 pas avant le butoir, à 45°, puis à l'horizontale jusqu'au renvoi.
- Mobile : la voie descend verticalement, butoir en bas, la correspondance bifurque et mène au
  renvoi — pas de débordement horizontal.
- Mouvement **L0, une seule fois** : le tracé encre se dessine et s'arrête au butoir, puis la
  correspondance bleue se dessine. Aucun décor vivant au repos (pas de train) → pas de bouton
  Pause nécessaire. Mouvement réduit / sans JS : état final d'emblée, tout lisible.
- Le lien reçoit le focus visible ; l'ordre de tabulation va header → renvoi → « Revenir au plan ».
- Pictogramme **butoir** (barre perpendiculaire au bout de la voie) : *proposé* — il étend la
  légende de 003 (Départ · Itinéraire · Relais) d'un signe « Fin de voie », même dessin plat.

## ⚠️ Contraintes — ce qui ne doit jamais apparaître

- Pas de blague générique : « oups », « perdu ? », « houston », astronaute, robot, chien, carte
  froissée.
- Pas d'illustration stock ni d'illustration tout court hors du vocabulaire du réseau (lignes,
  nœud, butoir).
- Pas de « 404 » géant en décor — le numéro n'existe que comme étiquette de quai.
- Pas de colonne flanquante / deux colonnes avec un élément graphique isolé (**001 refusée**).
- Pas de second accent, pas d'ombre, pas de dégradé, pas de thème sombre.
- Pas de redirection automatique à compte à rebours, pas de champ de recherche : on montre la
  correspondance, on ne force pas le trajet.
- Pas de parcours daté rejoué ici (apprentissage de 004 : le trajet vit dans l'About, on y renvoie).

## Références

- `memory/references/002-explorateur-creatif.md` — **garder** la grammaire de trajet (étape,
  détour, *route alternative*) : la correspondance est la route alternative ; **laisser** le
  lettrage, les textures, la couleur.
- `memory/references/001-drive-capital.md` — **garder** l'affiche éditoriale sur papier chaud, un
  seul bleu, hairline monumental ; **laisser** toute silhouette automobile ici (inutile sur une page
  d'une phrase).

## Déjà jugé ici

- **004 retenue** — le plan du réseau : géométrie 0/45/90°, renvoi « 02 / Parcours → » (flèche →,
  pivot au survol). Repris tel quel.
- **005 retenue** — encre = négation, bleu = affirmation ; mouvement réduit = état final lisible.
  Repris.
- **002 retenue** — échelle, pas poids ; Playfair 400 / Inter 300. Repris.
- **001 refusée** — colonne flanquante. Non reproposée ; la page est une colonne, la voie plein cadre.

## Conforme vs proposé

| Élément | Statut |
|---|---|
| Crème, Voltage Blue, encre, ash · Playfair 400 / Inter 300–400 · surfaces plates · échelle pas poids | **conforme** — socle `identity.md` |
| Renvoi « 02 / Parcours → », géométrie 0/45/90°, trait 1,5 px, grammaire encre/bleu | **conforme** — directions 004 / 005 (vocabulaire des prototypes, pas des registres) |
| Pictogramme butoir, étiquette « VOIE 404 — SANS ISSUE », textes, tailles de corps, placement au tiers, tracé L0 | **proposé** — registres vides, aucun token existant invoqué |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Approuve en une ligne, ou dis ce qu'il faut ajuster.

**[BOB] ⏸ En attente d'approbation. Rien n'est produit avant un oui explicite.**
