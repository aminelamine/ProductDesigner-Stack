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
| P-001 | `Hero` — porte le positionnement, système Drive Capital scopé (ADR-009), plein cadre (ADR-011) | `specs/shipped/feature_p-001_hero_v2.md` | `✅ DELIVERED 20/20` | la section est livrée par la boucle complète, avec un Quality Brief esthétique approuvé et un verdict ANALYZER ≥ 18 — cycle 2 (RE-SPEC) déclenché par rejet qualitatif du Talent malgré 18/20 en cycle 1 |

> Préfixe `P-` pour le portfolio, afin qu'aucune feature ne puisse être confondue avec les
> `F-00Xx` de la stack. La collision s'est déjà produite.

---

## 🟡 NEXT

Sections suivantes non listées — priorisées une fois P-001 livré et la boucle prouvée
(candidats connus : About, Expériences, Obsolet, Contact — cf. handoff).

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

Prise de contact qualifiée (mail/LinkedIn) · clic vers Obsolet (Substack) · mémorisation du
positionnement (qualitatif). Les anciens KPIs (passes de parité npm, score pulse) sont dans
`context/stack/roadmap.md` — ne pas mélanger.

---

## 🗓️ Changelog Roadmap

- `2026-09-08` — P-001 livrée 18/20 (ANALYZER) : thème Drive Capital scopé au hero (ADR-009), headline LinkedIn verrouillé, illustration signpost deux tons, séquence d'entrée 3 `motion.div` + reduced-motion. Trou résiduel noté : radius 11 sur les bras de l'illustration hors de la règle CA-9 (0/60px) — candidat correction mineure côté BOB.
- `2026-09-08` — P-001 cycle 2 livrée 20/20 (ANALYZER) : rejet qualitatif du Talent du rendu v1 (malgré 18/20) sur 3 constats — plein cadre jamais atteint (padding `<main>` + hero additif, tranché par ADR-011, breakout scopé au hero), orphelin typographique "|" en desktop, composition 2-colonnes générique avec icône isolée. RE-SPEC : plein cadre réel (ADR-011), headline restructuré en 3 lignes-blocs anti-orphelin, 3 marqueurs de trajet intégrés au headline (plus de colonne flanquante), motion porté par un tracé de rail CSS pur hors budget `motion.div`. Un cycle de correction intermédiaire (17/20 SHIPPED WITH NOTES, non committé) a précédé ce verdict : régression CA-7 où `guardTrailingPipe()` forçait `whitespace-nowrap` sur la ligne "Agentic Design" sans "|" à protéger, tronquée invisiblement par `overflow-x-clip` à 300px — corrigée (`ea26ddc`) par un champ explicite `nowrap: boolean` sur `GuardedSegment`, ne posant `whitespace-nowrap` que sur la branche qui en a réellement besoin. Les 20 CA + le fix ont été revérifiés en rendu Chrome réel (Puppeteer, 300 à 1920px), pas seulement par assertion — 0 troncature, 0 scroll horizontal, marqueurs vérifiés chevauchant leur segment.
- `2026-09-08` — séparation des deux produits. Le contexte pointait sur la stack, ce qui cadrait
  chaque feature de portfolio contre la vision de la stack. Ouverture de la phase « Reprise sous
  gates » : une section, la boucle complète, le brief esthétique pour la première fois.
