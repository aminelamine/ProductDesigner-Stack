# references/

Screenshots et références de style annotés. Ce magasin remplace le `design-patterns.md` que la
V3 déclarait BLOQUANT dans cinq fichiers sans jamais l'écrire.

Nommage : `NNN-slug.md` + assets dans `screenshots/`.
`INDEX.md` est généré par `npm run memory:index`.

## La seule règle qui compte

Une référence sans **pourquoi** ne vaut rien. Un screenshot seul dit *ce que ça fait* ; il ne dit
pas ce qu'il faut en reprendre. Chaque entrée porte en tête un bloc :

- **Pourquoi ça marche** — le mécanisme, pas l'adjectif
- **Ce qu'on en a pris**
- **Ce qu'on n'en a pas pris** — au moins aussi utile

Sans ce bloc, l'entrée n'est pas indexée.

## Le corps : format DESIGN.md *(ADR-015)*

Sous le bloc, l'entrée suit le format **DESIGN.md** (Google Stitch) — un système de design en
texte, lisible par un agent sans Figma : thème · couleurs (nom, valeur, token, rôle) · typographie
· composants · layout et espacements · responsive. `001-drive-capital.md` en est l'exemple.

Source prête à l'emploi : [awesome-design-md](https://github.com/voltagent/awesome-design-md) —
70+ DESIGN.md extraits de sites réels. Pour en ranger un : copier le fichier en `NNN-slug.md`,
**ajouter le bloc « pourquoi »** (sans lui, rien n'est indexé), puis `npm run memory:index`.
Depuis du code existant : `/impeccable document` produit un DESIGN.md — même règle, le bloc d'abord.
