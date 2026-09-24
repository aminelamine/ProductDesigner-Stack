---
date: 2026-09-24
source: Le Talent, en conversation /pds, après le prototype 004 (accueil intégré)
usage: à intégrer par RAY avant le gate ② (P-003) et dans les cycles suivants
---

# Arbitrages du Talent

## Header (P-003, spec à corriger avant gel)
**Vraie navigation.** Nom à gauche, liens texte au centre : Parcours · Manifeste · Obsolet ↗. Un seul
bouton « Me contacter » à droite. Sur mobile : un menu. Le menu actuel (2 pills) est jugé non adapté.
→ Remplace la suppression de `NAV_ITEMS` / `mobile-nav.tsx` prévue par P-003.

## Footer (cycle « Obsolet + footer »)
La section sombre Obsolet actuelle devient un **footer normal**, qui contient :
- Contact + réseaux : email **masqué contre le spam**, LinkedIn, Obsolet ;
- Liens légaux : mentions légales, confidentialité, © 2026 Amine Lamine ;
- Rappel de la ligne : la ligne bleue du parcours finit dans le footer.
(Les derniers articles Obsolet ne sont pas repris.)

## Mise en ligne (nouveau lot)
Meta title/description, image Open Graph, favicon (repère du hero), sitemap.xml + robots.txt,
404 custom, pages légales (mentions légales, confidentialité RGPD — CGU si utile), anti-spam,
textes alternatifs, contrastes, vitesse (Lighthouse), nettoyage de `public/`.

**Mesure d'audience : Google Analytics.** Conséquence obligatoire (CNIL) : bannière cookies avec
refus aussi simple que l'acceptation, aucun traceur avant consentement, choix modifiable à tout
moment (lien dans le footer), politique de confidentialité qui le décrit.
