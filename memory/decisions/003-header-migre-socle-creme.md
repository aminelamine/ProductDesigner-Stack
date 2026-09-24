---
id: 003
nom: Le header migre vers le socle crème et devient une vraie navigation
portee: visuelle
statut: actée
date: 2026-09-24
---

## Contexte
`decisions/001` fait de chaque migration de surface une décision à part, et cite le header parmi les
surfaces concernées. La direction du hero « Le plan du réseau » (`sessions/brief_feature_hero.md`)
retire les CTA du hero. Le Talent a arbitré le header dans `sessions/decisions_talent_2026-09-24.md` :
il demande une vraie navigation, et juge non adaptées les pills d'action des prototypes 003 et 004.
Un header sombre au-dessus d'un hero et d'un About crème recréerait deux systèmes sur une même
bande de 56 px.

## Décision
Le header (`components/header.tsx`, `components/mobile-nav.tsx`) passe sur le socle de
`identity.md` : fond crème `#fff8f1` opaque, filet ash `#e2e8f0` en bas, encre, Voltage Blue comme
seul accent, Playfair Display et Inter uniquement, sans flou. On utilise le même mécanisme que le
hero et l'About : scope `.theme-drive`, sans toucher `:root`.

Son contenu :
- à gauche, le nom (`SITE.name`) ;
- au centre, les liens texte Parcours · Manifeste · Obsolet ↗ (`NAV_ITEMS`, conservé et mis à jour) ;
- à droite, un seul bouton « Me contacter ».

Sur mobile, les liens passent dans un menu (le Sheet, repris au socle crème).

## Ce que ça contraint
- Le header, le hero et l'About forment une seule feuille crème. Une direction future du header ne
  peut pas le rendre sombre ou translucide sans rouvrir cette décision.
- Le header ne porte qu'**une** action en pill. Toute autre entrée est un lien texte.
- Les ancres `#parcours` et `#manifeste` deviennent un contrat : l'About doit les exposer.
- Le footer reste une décision à part (son contenu est arrêté dans `decisions_talent_2026-09-24.md`).

## Ce qu'on accepte de perdre
- **Une couture inversée** : jusqu'au cycle du footer, le header crème survole la section sombre
  qui suit l'About.
- **Le lien « Contact »** comme lien de navigation : il devient le bouton « Me contacter ».
