# setup — construire la mémoire

> **Invariant V4 : `setup` ne bloque jamais.**
> Un magasin vide se signale et se remplit. Il n'interdit pas d'avancer.
>
> La V3 faisait l'inverse : sur une install fraîche, la règle « ne jamais inventer un token »
> et la règle « ne pas avancer tant qu'il manque un token » se contredisaient — le chemin nominal
> se bloquait, et les deux seules issues étaient interdites
> (`_stack-test-pulse/RUN_005_FINDINGS.md`, F9). Axe *Onboarding path* : **8/20**.

---

## Les trois sources, dans l'ordre

`setup` remplit `design-system/registries/` depuis la première source disponible. Il n'en exige
aucune.

| # | Source | Quand | Ce qu'elle produit |
|---|---|---|---|
| 1 | **Figma** (MCP) | une librairie DS publiée existe | `components.json` · `variables.json` · `text-styles.json` — extraction réelle, clés vérifiées |
| 2 | **Le code** | `modules.code: true` et le projet a des tokens | tokens lus dans `globals.css` / `components.json` — **faits lus, jamais proposés** |
| 3 | **Le designer** | ni l'un ni l'autre, mais une identité existe | un seed minimal déclaré en 4 réponses : fond, accent, famille typo, unité d'espacement |
| 4 | **La genèse** | **il n'y a rien** — produit neuf, pas de marque | `memory/identity.md` construit avec le designer, puis seed du registre depuis le socle |

Les sources 1 à 3 supposent toutes qu'une identité **existe déjà quelque part**. La source 4 est
celle qui couvre le cas où il n'y a rien — et c'est un **parcours de création**, pas un aveu
d'échec.

---

## Source 4 — la genèse

> Déclenchée quand ni Figma, ni le code, ni le designer ne portent d'identité préexistante.
> Sortie : `memory/identity.md` rempli, et le socle recopié en seed dans `registries/`.

Quatre questions, dans cet ordre. Une à la fois.

| # | Question | Remplit |
|---|---|---|
| 1 | Qu'est-ce que ce produit raconte avant d'être lu ? | § L'histoire visuelle |
| 2 | Trois mots, et pas un de plus. | § Les 3 mots |
| 3 | Qu'est-ce qui ne se rediscutera plus : fond, accent, typo ? | § Le socle |
| 4 | **Qu'est-ce que ce produit n'est pas ?** | § Ce que ce produit n'est pas |

> La question 4 est celle qui porte le plus. Un socle dit ce qui est permis ; les interdits disent
> ce qu'aucune direction ne doit reproposer. C'est la seule des quatre qui économise des cycles
> entiers plus tard.

Les références apportées au passage vont dans `references/`, annotées — jamais brutes.

**Ce que la genèse ne fait pas** : elle ne génère ni logo ni asset de marque. Elle acte une
direction, elle ne produit pas d'artefact. La production, c'est la phase PRODUIRE.

---

Aucune source disponible **et** genèse refusée par le designer → `setup` écrit `registries/ETAT.md`
qui dit *pourquoi* c'est vide, et **rend la main**. Le cycle démarre quand même, en mode
**direction libre** (voir plus bas).

---

## Les deux modes de la phase DIRECTION

C'est l'état de `design-system/` qui décide du mode — pas une question posée à l'utilisateur.

**Direction contrainte** — les registries existent.
La direction se **conforme** : elle pioche dans des tokens et des composants réels. Une valeur
hors registre est une erreur.

**Direction libre** — les registries sont vides ou partiels.
La direction **propose** : elle pose des valeurs et les déclare comme propositions, pas comme
faits. Elles deviennent le seed du registre une fois la direction retenue.

> C'est ça, la résolution de F9 : on n'invente jamais un token **en le présentant comme existant**.
> On a le droit d'en proposer un, à condition de le dire. Le blocage V3 venait de la confusion
> entre les deux.

---

## Ce que `setup` écrit

```
memory/
├── identity.md                 ← le socle du produit (source 4, ou repris de l'existant)
├── design-system/registries/   ← 1 à 4 JSON, ou ETAT.md si vide
├── references/                 ← ce que le designer apporte, annoté
├── directions/                 ← vide au départ, c'est normal
└── decisions/                  ← vide au départ, c'est normal
```

`directions/` et `decisions/` **doivent** être vides sur un projet neuf. Ce sont des magasins qui
se remplissent par l'usage. Aucun gate ne les exige.

---

## Vérification

- Extraction Figma : re-importer 3 à 5 clés au hasard par registre avant de déclarer le registre
  valide (`design-system/schemas/validation.md`). Une clé qui ne réimporte pas invalide le registre.
- `npm run memory:index` régénère les index. Ils ne sont jamais édités à la main.
- **Test décisif** : lancer `setup` dans un dossier vide, sans `package.json`, sans Figma connecté.
  Il doit rendre la main avec un `ETAT.md` explicite et un cycle Sketch praticable.
  Il ne doit poser aucune question à laquelle il n'y a pas de réponse.
