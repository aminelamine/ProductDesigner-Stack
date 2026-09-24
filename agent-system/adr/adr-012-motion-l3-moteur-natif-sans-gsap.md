# ADR-012 — Motion L3 par le motif, moteur natif lié au scroll, sans GSAP

**Date :** 2026-09-24
**Statut :** ✅ ACCEPTED — 2026-09-24, Le Talent (gate ② P-002 / P-003)
**Décideurs :** Le Talent (+ RAY pour l'analyse)
**Agents concernés :** RAY | BOB | ANALYZER

---

## Contexte

Deux directions approuvées au gate ① (`sessions/brief_feature_about.md` v2, `sessions/brief_feature_hero.md`)
demandent des motifs que `design_guide.md` classe en **L3** : une section épinglée (`position: sticky`),
des animations pilotées par le scroll, et une animation en boucle au repos (le train du hero, avec un
bouton Pause). Les prototypes validés (`prototypes/002-about-trajet.html` it. 5,
`prototypes/003-hero-reseau.html` it. 3) les réalisent **sans aucune bibliothèque** : animations CSS
liées au scroll (`animation-timeline`), avec un repli (un écouteur de scroll passif et
`requestAnimationFrame`). Or ADR-007 associe L3 à `motion` + `gsap` + `@gsap/react`, et sa règle universelle
illustre `prefers-reduced-motion` par `useReducedMotion` de `motion/react`. En l'état, déclarer L3 pour un
code sans GSAP contredirait la lettre d'ADR-007. Déclarer L0 serait faux, puisque L0 interdit
l'épinglage et le scroll-linked.

---

## Décision

**Le niveau motion se déclare par le motif, la bibliothèque par la nécessité. L3 n'implique pas GSAP.**
Pour P-002 (About) et P-003 (Hero), `motion_level: L3` est implémenté avec un seul moteur natif partagé :

- **moteur principal :** animations CSS liées au scroll (`animation-timeline: scroll()` / `view()`,
  `animation-range`), ou `ScrollTimeline` / `ViewTimeline` via Web Animations. On choisit l'un ou l'autre
  selon la détection de support, jamais les deux sur le même élément ;
- **repli :** un seul écouteur `scroll` passif et `requestAnimationFrame`, qui lit **les mêmes points
  d'arrêt** que le moteur principal (source unique : une fonction pure dans `lib/scroll-engine.ts`) ;
- pendant le scroll, **seuls `transform` et `opacity`** sont animés. Le scroll natif n'est jamais capturé :
  ni `preventDefault` sur la molette ou le toucher, ni bibliothèque de smooth-scroll ;
- `prefers-reduced-motion` reste obligatoire. Dans les composants qui n'importent pas `motion`, on le lit
  via la media query CSS et `matchMedia`, pas via `useReducedMotion`. En mode réduit : pas d'épinglage,
  pas de scroll-linked, pas de boucle ;
- une boucle au repos n'est permise qu'avec un contrôle Pause visible (WCAG 2.2.2). Elle s'arrête quand
  l'onglet est caché, au scroll et en mouvement réduit ;
- `gsap`, `@gsap/react` et toute bibliothèque de scroll **ne sont pas installés**. `motion/react` quitte
  `components/hero*.tsx` et `components/about*.tsx`, mais la dépendance `motion` reste dans le projet
  (d'autres sections peuvent l'utiliser).

`STACK.md → motion_default: L0` est inchangé : L0 reste le défaut, L3 est une décision de spec.

---

## Alternatives considérées

| Alternative | Raison de rejet |
|---|---|
| GSAP + ScrollTrigger (L3 nominal d'ADR-007) | Il ajoute une dépendance et un moteur JS sur le thread principal pour des motifs que le navigateur fait nativement. Le prototype, jugé bon, n'en a pas besoin |
| `motion` : `useScroll` + `useTransform` (déjà installé) | Il est piloté frame par frame en JS, n'apporte rien à l'épinglage (`sticky` reste du CSS), et on aurait deux moteurs différents entre le prototype validé et le produit |
| Déclarer L0 (« c'est du CSS ») | C'est faux : L0 interdit l'épinglage et le scroll-linked (`design_guide.md`, tableau des motifs). Le niveau décrit ce que voit l'utilisateur, pas l'outil |

---

## Conséquences

### ✅ Bénéfices attendus
- Aucune dépendance ajoutée, et `motion/react` sort de deux composants.
- Un seul moteur pour le hero et l'About : la ligne de sortie du hero et la ligne du trajet se remplissent
  avec la même mécanique.
- Sur les navigateurs compatibles, le scroll-linked tourne hors du thread principal.

### ⚠️ Contraintes acceptées
- Support inégal (`animation-timeline` : Chromium, Safari récent, pas encore Firefox en stable). Le repli
  rAF est donc **obligatoire et testé**, ce n'est pas une option.
- Les points d'arrêt dépendent de la géométrie mesurée. Ils sont recalculés au redimensionnement, jamais
  cumulés.
- ADR-007 est **amendé**, pas remplacé : l'association « L3 = GSAP » devient « L3 = GSAP possible ».

### 🔗 Impact sur les agents
- **RAY** : toute spec L3 écrit dans `motion_note` le moteur retenu (natif ou GSAP) et pourquoi. GSAP
  demande une justification que le natif n'atteint pas.
- **BOB** : pas de `gsap`, pas de smooth-scroll, pas de `preventDefault` sur le scroll. Seuls `transform`
  et `opacity` bougent pendant le scroll. Le repli lit les mêmes points que le moteur natif.
- **ANALYZER** : on rejette un `package.json` qui gagne `gsap` ou une bibliothèque de scroll, et une
  propriété animée autre que `transform` / `opacity` dans les keyframes liées au scroll. On vérifie le
  repli en forçant `CSS.supports("animation-timeline: scroll()")` à `false` (Puppeteer,
  `evaluateOnNewDocument`).

---

## ADRs liés

- Amende : [ADR-007](adr-007-motion-level-system.md). À l'acceptation, mettre à jour `design_guide.md`
  § L3, ligne « Librairie », en « `motion` et/ou `gsap` si nécessaire, sinon natif (ADR-012) », et la
  règle universelle, qui accepte aussi `matchMedia`.
- Conditionne : P-002 (`specs/active/feature_about_trajet.md`), P-003 (`specs/active/feature_hero_reseau.md`).

---

## Révision

**Condition de révision :** un motif L3 que le natif ne sait pas faire (timeline séquencée complexe,
morphing SVG), ou un repli rAF qui ne tient pas 60 fps sur un mobile d'entrée de gamme.

**Date ou milestone suggéré :** au prochain motif L3 spécé.

---

## Note de numérotation

`ADR-010` reste réservé au cycle *stack* (cf. ADR-009, ADR-011). `ADR_INDEX.md` n'est mis à jour
qu'au passage en `ACCEPTED` (protocole RAY, étape 4).
