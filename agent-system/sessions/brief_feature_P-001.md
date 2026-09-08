---
feature_id: P-001
feature_name: Hero — trajet + système Drive Capital
date: 2026-09-08
quality_brief_type: aesthetic
motion_level: L1
spec: agent-system/specs/active/feature_p-001_hero.md (VALIDATED, T3)
adr: agent-system/adr/adr-009-hero-theme-scope-drive-capital.md (✅ ACCEPTED — CA-1 levé)
statut: ✅ APPROUVÉ — Le Talent
---

# [BOB] ⏸ Quality Brief — P-001 : Hero

La direction générale n'est pas à inventer ici — Le Talent l'a arrêtée le 2026-09-08 : système
Drive Capital (`agent-system/context/references/style-drive-capital.md`) + Option 2 du concept
trajet (`agent-system/context/references/concept-explorateur-creatif.md`, « illustration deux
tons »). Ce brief formalise cette direction dans les 5 dimensions attendues par
`BOB_aesthetic_gate.md`, et tranche les quatre points explicitement laissés ouverts par les Notes
BOB de la spec : composition de l'illustration, appariement final des polices, dégression du 144px,
contenu des colonnes flanquantes. Rien ci-dessous n'ajoute de copie non sourcée (CA-10).

---

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[AESTHETIC BRIEF — Feature P-001 : Hero]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Direction    : Une affiche de road-trip éditoriale où le headline massif EST le panneau de
                  départ — Voltage Blue marque le premier arrêt d'un trajet designer → agentique,
                  sur un fond crème silencieux, une seule voix chromatique.

🔤 Typographie  : Playfair Display (400, display) / Inter (300 labels · 400 corps/CTA)
                  → didone réel, contraste porte le "hairline" sans le poids 100
                  → @import : fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400
                    &family=Inter:wght@300;400&display=swap

🎨 Palette      : Drive Capital (style-drive-capital.md)
                  Fond : #fff8f1 (cream) · Accent unique : #006eff (Voltage Blue)
                  Texte : #000000 (ink) · Neutre structurel : #e2e8f0 (ash, hairlines uniquement)

⚡ Tension      : Échelle, pas poids — headline Playfair 400 à 77–120px contre labels Inter 300 à
                  ≤21px. Conforme à la doctrine "whisper-weight" de la référence elle-même
                  (aucun poids ≥600 dans tout le système) : la tension vient du contraste de taille
                  et de forme serif/sans, pas d'un écart de graisse.

📐 Composition  : Headline dominant en colonne principale · une colonne flanquante unique portant
                  l'illustration + la ligne de sous-texte existante + 2 pills CTA outlined,
                  empilées · silhouette deux tons positionnée comme marqueur de départ de trajet ·
                  marge 144px desktop dégradée par paliers documentés (voir §Dégression ci-dessous)
                  · séquence d'entrée à 3 `motion.div` maximum (metadata bar du thème sombre
                  supprimée — elle reposait sur le mono, absent du thème scopé).

⚠️  À éviter ici : bouton rempli (filled) · deuxième teinte chromatique · ombre/dégradé/texture ·
                  image photographique · Voltage Blue sur texte < 18px régulier / < 14,66px gras
                  (CA-16 — accessibilité déjà tranchée par RAY contre la lettre de la référence) ·
                  plus de 3 `motion.div` · tout radius hors 0px / 60px.

📎 Référence    : style-drive-capital.md (palette, échelle typo, pill outlined, traitement plat de
                  l'illustration) · concept-explorateur-creatif.md Option 2 (l'illustration comme
                  marqueur de trajet, pas comme décor).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Approuver en une ligne, ou me dire quoi ajuster.
```

---

## Points tranchés (laissés ouverts par les Notes BOB de la spec)

| Point | Décision | Justification |
|---|---|---|
| **Composition de l'illustration** | Silhouette plate d'un panneau/borne de départ de route — pas de voiture littérale. Voltage Blue à opacité réduite pour la forme principale, noir pour l'ombre/le support. | Le concept doc écarte l'Option 3 (trajet illustré) et cadre l'image comme *marqueur d'étape*, pas comme icône fonctionnelle (CA-13, Story 2) ; un panneau de départ lit "premier arrêt du trajet" sans recycler le cliché voiture d'IA/startup et sans texte invento (CA-10 — aucun lettrage sur le SVG). |
| **Appariement final des polices** | Playfair Display 400 (display) / Inter 300 (labels) + 400 (corps, CTA). | Les deux candidates sont nommées explicitement par `style-drive-capital.md` (substituts) et `concept-explorateur-creatif.md`. Playfair Display est un vrai didone (contraste de traits porté par la forme des lettres, pas par un numéro de graisse) — à 77–120px, l'effet "hairline" de la référence se lit dans le contraste des empattements, même sans le poids 100 (absent de Google Fonts pour cette famille). |
| **Dégression du 144px** | `px-6` (24px) base · `md:px-16` (64px) · `lg:px-36` (144px). | CA-8 exige un fallback non vide documenté à `md:` et à la base — aucune valeur nulle, progression cohérente avec l'échelle 8px de la référence, pas de scroll horizontal à 375px. |
| **Contenu des colonnes flanquantes** | Une seule colonne flanquante, réutilisant verbatim `HERO.subtitle` existant ("Product Designer – AI & Product Systems", `lib/data.ts`) sous l'illustration, puis les 2 CTA. La barre de métadonnées actuelle ("AL · Product Designer · 2026", badge "Disponible") est supprimée — son texte n'est sourcé ni par `client_vision.md` ni par `lib/data.ts` existant, et le mono qui la portait n'existe plus dans le thème scopé (2 familles max, CA-4). | CA-10 : zéro copie inventée au-delà du headline verrouillé. Ce qui existe déjà dans `lib/data.ts` peut être réutilisé ; ce qui n'existe nulle part ne l'est pas — plus simple que d'aller chercher une valeur exacte dans `client_vision.md` pour combler une métadonnée qui n'est plus structurellement portée. |

## Résolution CA-16 appliquée aux pills

`style-drive-capital.md` prescrit un label de pill à 16px / poids 300 en Voltage Blue — sous le
seuil "grande taille" WCAG (18px régulier), donc en conflit direct avec CA-16 (déjà tranché par RAY
en faveur de l'accessibilité, pas rediscuté ici). Résolution : le **contour** du pill reste Voltage
Blue 1,5px (CA-7, ce n'est pas du texte) ; le **label** du pill passe en Ink (#000000) à 16px /
Inter 300. Le bleu reste la seule voix chromatique du hero (CA-6) via le contour, le headline
(≥77px) et l'illustration — jamais via un texte sous le seuil.

---

## Vérification anti-contradiction (spec frozen, §2b BOB_aesthetic_gate.md)

Chaque critère visuel de la spec confronté aux 5 dimensions ci-dessus — aucun conflit détecté :

- CA-6 (cream + Voltage Blue seuls, ash/ink neutres) ↔ Palette — conforme.
- CA-7 (pills 60px, contour 1,5px, transparent, jamais filled) ↔ Composition/Constraints — conforme,
  résolution du label ci-dessus.
- CA-8 (144px lg:, fallback non vide) ↔ Composition — palier `px-6 / md:px-16 / lg:px-36` documenté.
- CA-9 (zéro shadow/gradient, radius 0 ou 60 uniquement) ↔ Constraints — conforme.
- CA-12/CA-13 (SVG inline, deux remplissages exacts, silhouette plate, marqueur de trajet) ↔
  illustration décidée ci-dessus — conforme.
- CA-14 (≤3 `motion.div` pour la séquence d'entrée) ↔ Composition — la metadata bar (qui portait
  1 `motion.div` de plus dans l'implémentation actuelle) est supprimée ; 3 groupes restants
  (headline, colonne flanquante, bloc CTA).
- CA-16 (Voltage Blue jamais < 18px régulier / < 14,66px gras) ↔ résolu explicitement ci-dessus,
  hérité de l'arbitrage RAY — pas un nouveau conflit, une application.

Aucun des 5 choix n'oblige à rouvrir un critère gelé de la spec VALIDATED.

---

**[BOB] ⏸ En attente de validation. Aucune ligne de code avant approbation explicite.**
