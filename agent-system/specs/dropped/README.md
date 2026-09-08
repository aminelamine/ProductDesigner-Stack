# specs/dropped/

Specs qui ne doivent **pas** être implémentées telles quelles. Le hook `commit-msg` refuse tout
commit dont le `Ref:` pointe ici — c'est le garde-fou, pas un accident.

| Fichier | Pourquoi ici |
|---|---|
| `hero-spec.md` | Format design-workflow (références de nœuds Figma), jamais passée par RAY, sans `status`. Gardée comme **matière première** pour la vraie spec du hero — pas comme spec à exécuter. |
| `layout-navigation-spec.md` | Idem. Décrit la coquille single-page, porte l'ancien ID `F-001` qui entrait en collision avec `F-001a` de la stack. |
| `feature_001_feedback_card.md` | Spec d'exemple du template, arrivée à l'install. N'a jamais concerné ce projet. |
