# Reprise — première section du portfolio sous gates

> À coller (ou à pointer) au début de la nouvelle discussion, avant `/pds`.
> Écrit le 2026-09-08, à la fin de la session qui a livré F-001a et F-001d.

## Où on en est

Le dépôt contient **deux produits**. C'était la cause du sur-place : `context/client_vision.md` et
`context/roadmap.md` décrivaient la stack, et RAY les lit avant chaque spec — donc toute feature de
portfolio était cadrée contre la vision de la stack.

| Produit | Code | Contexte |
|---|---|---|
| **Portfolio Amine Lamine** ← le sujet | `app/` · `components/` · `lib/` | `agent-system/context/` |
| PDS Stack (gelée) | `pds-stack-cli/` · `agent-system/agents/` · `templates/` | `agent-system/context/stack/` |

## Ce qui est déjà fait pour toi

- `context/client_vision.md` et `context/roadmap.md` **pointent sur le portfolio**. Ils portent des
  `[À COMPLÉTER]` : c'est voulu. STEP 1 du conducteur les remplit par entretien — le profil LinkedIn
  en est la matière première.
- `context/design_guide.md` : **0 marqueur restant.** Thème (`neutral` / `base-nova`), fonts
  (IBM Plex Sans + Mono), tokens oklch, max-widths — tous **lus dans le dépôt**, pas proposés.
  Ce qui reste ouvert est la *direction*, et elle se décide au Quality Brief.
- `specs/active/` est **vide**. `specs/shipped/` porte les deux features de la stack.
- Les specs pré-stack (`hero-spec.md`, `layout-navigation-spec.md`) sont dans `dropped/` :
  matière première, pas specs à exécuter. Le hook `commit-msg` refuse un `Ref:` vers `dropped/`.
- Numérotation : le portfolio utilise **`P-001`, `P-002`…**, la stack ses `F-00Xx`. La collision
  s'est déjà produite une fois.

## Ce qu'il faut apporter dans la nouvelle discussion

1. **Le profil LinkedIn** → personas, JTBD, positionnement (STEP 1).
2. **Le prompt de référence design + les captures de style** → le **Quality Brief esthétique** de
   BOB. Pas pour être copiés : pour que BOB dise ce qu'il en retient, et ce qu'il écarte.
3. **La section à reprendre.** Le hero est le candidat : `components/hero.tsx` existe, la matière
   est dans `dropped/hero-spec.md`, et c'est la section qui porte le positionnement.

## Le point qui n'a jamais été testé

`quality_brief_type: aesthetic` est déclaré dans `STACK.md` depuis le début et **n'a jamais tourné**.
Les deux features livrées étaient du code de CLI, donc en `architecture`. Le gate qui justifie toute
la stack — *« direction avant exécution »* — n'a jamais rencontré un vrai goût sur une vraie surface.
C'est la question ouverte de ce cycle, et elle vaut plus que la feature elle-même.

Limite connue : `STACK.md` porte `quality_brief_type` en **global**, sans surcharge par feature.
Ici c'est sans conséquence — la feature est visuelle, le global `aesthetic` est le bon.

## État de la stack au moment du gel

F-001a (agents isolés) et F-001d (parité miroirs) livrées à 18/20. Restent ouverts, dans
`context/stack/roadmap.md` : F-001b (`flow.md` STEP 3 ne nomme pas `/bob --build`), F-001c, et un
candidat **ADR-009** — trois fois de suite, une ligne verte a affirmé plus large que ce que la passe
vérifiait. À traiter dans un cycle *stack*, pas ici.
