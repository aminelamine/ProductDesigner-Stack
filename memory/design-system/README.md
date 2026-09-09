# design-system/

Ce que le design system contient **réellement** — pas ce qu'on aimerait qu'il contienne.

```
schemas/      format des registres, lu par setup avant toute extraction
registries/   les registres eux-mêmes (JSON), extraits de Figma / du code / déclarés
```

## Faits, pas propositions

Un registre ne contient que du vérifié : une clé de composant doit réimporter, une variable doit
exister. Une valeur souhaitée mais non existante appartient à `directions/`, jamais ici.

> La V3 confondait les deux : `agent-system/context/design_guide.md` décrivait un outil sombre et
> dense (`Terminal · Précis · Dense`) pendant que le produit réel était un portfolio éditorial
> crème en Playfair. C'est contre ce fichier que la seule dimension « design » du score /20 était
> évaluée. Un registre extrait du réel rend cette dérive impossible.

## Mise à jour

Relancer `setup` — il détecte les registres existants et propose une mise à jour incrémentale.
Chaque registre porte son `meta.extractedAt`.
