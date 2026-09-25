---
feature_id: P-002 + P-003
feature_name: Accueil — About « le trajet parcouru » + Hero « le plan du réseau »
voie: standard
date: 2026-09-25
conformance: P-002 20/20 · P-003 20/20 (après un premier passage à 18 et 16)
direction: P-002 retenue · P-003 retenue
---

<!-- ① DESIGN -->

## Ce que la direction a appris
- Deux surfaces voisines tiennent si chacune a son axe et son verbe : le hero **converge** (le plan), l'About **défile** (le trajet). Un brief écrit explicitement « contre » la surface voisine évite le doublon.
- Une interaction élégante sans récit ni données reste une frise décorée : la v1 « légende » a été abandonnée au prototype. Ce qui fait vivre la ligne, ce sont les faits réels — dates, missions, clients, chiffres.
- Le Talent juge la vie d'une page en main, pas sur description : chaque retour « il manque de vie », « trop d'espace blanc », « texte seul » est venu d'un prototype cliquable. Garder le prototype HTML comme lieu du jugement.

## Références — ce qui a porté, ce qui a induit en erreur
- `references/003` (Guillaume Zhu) a porté la dramaturgie en temps et l'épinglage ; ses dégradés, son grain et sa 3D ont été laissés sans débat grâce au socle.
- Les pills d'action des prototypes ont induit en erreur sur le header : remplacées par une vraie navigation. Un prototype ne fait pas foi sur une surface qu'il n'a pas pour sujet.
- Le CV du Talent a corrigé la structure : les missions client (SNCF, V&B, Carrefour ; Philip Morris, DriverHero, Inteliam, HA, Afkar) ne sont pas des postes parallèles. Toujours croiser LinkedIn et CV avant de dessiner un parcours.

## Design system — ce qui manque ou dérive
- Le voile d'un composant Shadcn (menu) réintroduisait un flou que le socle exclut : tout composant emprunté se vérifie contre `identity.md`.
- Le repère deux tons (point encre + barre bleue) et le nœud cerclé servent désormais sur trois surfaces (hero, timeline, chute) : candidats au registre.
- Le Figma existe (fichier F2UtGEYdLDmZLT2gmMp9uz : variables Socle, 11 styles, 6 composants) mais les registres de code restent vides : prochaine extraction à faire.

## Critique récurrente
- Le plein cadre et le `|` orphelin (direction 001) ne sont pas revenus : 0 récurrence. « Un seul accent » tient sur trois cycles.
- Bleu `#006eff` sur crème = 4,27:1 : revenu à chaque itération (libellés, « et après → »). Règle à appliquer d'office : pas de texte ≤ 21 px en bleu.

## Voix et contenu
- La chute en deux phrases (négation en encre, affirmation en bleu) porte la voix mieux qu'un paragraphe. Les chiffres dérivés des faits (16 · 17 · +100) évitent l'emphase ; « 8 missions » sous-vendait le parcours.
- Le manifeste n'était pas logique : réécrit depuis les articles Obsolet (version A, « le craft a migré »), en 4 temps constat → conviction → pratique → preuve.

<!-- ② TECHNIQUE -->

## Technique — patterns et anti-patterns
- Pattern : moteur de scroll partagé (animation-timeline natif + repli rAF sur les mêmes points d'arrêt) — rendu identique mesuré (Δ 0 sur 20 et 10 positions), CLS 0, ADR-012.
- Pattern : état dérivé à chaque frame de la position réelle, jamais cumulé — a supprimé les désynchronisations compteur/fiche après un saut.
- Anti-pattern : critères décidables sur les données annoncés dans un commit sans assertion (P-003 CA-18/19, P-002 CA-17) → −3 points au premier passage.
- Anti-pattern : `style={{ "--x": … }}` pour passer des variables CSS → attributs `data-*`.
- Piège outillage : les captures du panneau navigateur ont du retard sur le scroll ; toujours vérifier la position réelle (scrollY, transform) avant de conclure à un bug.
- Piège prototype : une bascule « socle empilé » sur critère de hauteur (< 500 px) a fait croire à un scroll cassé dans un panneau bas.

## Ambiguïtés de spec à anticiper
- Glyphe d'un renvoi (↓ dans la spec, → dans le prototype) : figer le glyphe dans le critère. Tranché : →.
- « Une seule fiche visible » : préciser le cas d'arrivée (0 fiche, la chute prend le relais).
- Amendement après le gate ② (A-1, nœud terminus venu du Figma) : le dater comme nouvelle version de spec et le faire re-juger, ce qui a été fait.
