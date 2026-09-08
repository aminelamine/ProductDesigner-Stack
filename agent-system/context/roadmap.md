# roadmap.md

## 📌 Méta

**Projet :** `Portfolio Amine Lamine`
**Version courante :** `single-page en ligne`
**Dernière mise à jour :** `2026-09-08`

> La roadmap de la stack (F-001a→d, ADR-009) vit dans `context/stack/roadmap.md`.
> Ne pas mélanger les numérotations : ici les features sont celles du portfolio.

---

## 🗺️ Vue d'ensemble

| Phase | État | Contenu |
|---|---|---|
| Mise en ligne | ✅ livrée | Hero · About · Obsolet · Contact · header sticky · mobile-nav · footer |
| Reprise sous gates | 🔴 NOW | première section repassée dans la boucle RAY → BOB → ANALYZER, brief esthétique compris |

> **Ce qui existe a été commité en vrac** (`d95a393 feat: implement MVP features F-001 to F-005`),
> jamais passé par un cycle. Aucune entrée dans `specs/shipped/`, aucune dans `history.log`.
> Le gate esthétique n'a encore jamais tourné sur ce projet.

---

## 🔴 NOW

| # | Feature | Spec | Statut | Critère de done |
|---|---|---|---|---|
| P-001 | `[À COMPLÉTER — la section à reprendre en premier. Hero est le candidat : `components/hero.tsx` existe, `specs/dropped/hero-spec.md` sert de matière, et c'est la section qui porte le positionnement.]` | — | `[ ] à spécer` | la section est livrée par la boucle complète, avec un Quality Brief esthétique approuvé et un verdict ANALYZER ≥ 18 |

> Préfixe `P-` pour le portfolio, afin qu'aucune feature ne puisse être confondue avec les
> `F-00Xx` de la stack. La collision s'est déjà produite.

---

## 🟡 NEXT

`[À COMPLÉTER — les sections suivantes, une fois qu'une première a prouvé la boucle.]`

---

## 🔵 LATER

- Variante claire du thème — le dark-first est aujourd'hui sans alternative
- Études de cas par projet `[à confirmer — dépend de la décision « ce que ce produit n'est pas »]`

---

## ❌ OUT OF SCOPE (décisions actées)

- Répliquer Obsolet sur le site — la newsletter reste sur Substack
- Routing multi-pages — le single-page avec ancres est un choix, pas une limite subie

---

## 📊 KPIs Produit

`[À COMPLÉTER — que mesure-t-on ? Ce sont les KPIs du portfolio, pas ceux de la stack.
Les anciens (passes de parité npm, score pulse) sont dans context/stack/roadmap.md.]`

---

## 🗓️ Changelog Roadmap

- `2026-09-08` — séparation des deux produits. Le contexte pointait sur la stack, ce qui cadrait
  chaque feature de portfolio contre la vision de la stack. Ouverture de la phase « Reprise sous
  gates » : une section, la boucle complète, le brief esthétique pour la première fois.
