# ADR-011 — Plein cadre du hero via breakout scopé au composant (pas d'édition de `app/(site)/layout.tsx`)

**Date :** 2026-09-08
**Statut :** ✅ ACCEPTED
**Décideurs :** Le Talent (+ RAY pour l'analyse)
**Agents concernés :** RAY | BOB | ANALYZER

---

## Contexte

Le Talent a inspecté le rendu réel de P-001 v1 (Chrome, DOM à 375/1440/1920px) et constaté que le
fond `.theme-drive` (cream) n'atteint jamais le bord du viewport, à aucune largeur. Cause : `<main>`
de `app/(site)/layout.tsx` porte `max-w-5xl mx-auto px-6 md:px-8` (layout partagé par toutes les
sections et toutes les pages) ; le hero ajoute par-dessus son propre padding (CA-8 v1). Les deux
s'additionnent — jusqu'à ~176px de fond sombre visible de chaque côté à 1920px, encore 24px à
375px. Ce défaut était déjà signalé dans `feature_P-001_learnings.md` (« Emerging architecture
decision », une occurrence) sans avoir déclenché d'ADR à l'époque (seuil informel de 3 occurrences
non atteint) — ce cycle le tranche explicitement sur déclenchement direct du Talent.

L'ambition « affiche de road-trip éditoriale plein cadre » du brief v1 exige que le fond du hero
touche les deux bords du viewport. `app/(site)/layout.tsx`, `header.tsx`, `footer.tsx` et
`mobile-nav.tsx` sont hors scope de P-001 (ADR-009) et utilisés par toutes les autres sections
(About, Obsolet, Contact), elles-mêmes non reprises ce cycle et construites contre le thème sombre
actuel.

---

## Décision

**Nous obtenons le plein cadre par une technique CSS de « breakout » entièrement contenue dans
`components/hero.tsx`, sans modifier `app/(site)/layout.tsx` ni aucun fichier hors scope du hero.**

Le hero s'échappe du conteneur `max-w-5xl` de `<main>` par le pattern standard « full-bleed dans un
parent contraint » : un wrapper `width: 100vw` recentré par marge négative (`relative left-1/2
-mx-[50vw]`, ou équivalent Tailwind), avec un confinement `overflow-x-clip` posé sur ce même
wrapper — pas sur `body`/`html` — pour absorber tout débordement d'1px lié à l'écart entre `100vw`
et la largeur réelle de la fenêtre (scrollbar). Le padding horizontal progressif du hero
(24px / 64px / 144px, hérité de CA-8 v1) redevient la **seule** couche de marge, appliquée à
l'intérieur du wrapper plein cadre, mesurée depuis le vrai bord du viewport — elle ne s'additionne
plus au padding de `<main>`.

```tsx
// components/hero.tsx — wrapper plein cadre, scopé, aucune autre section ne le référence
<section
  id="hero"
  className="theme-drive relative left-1/2 w-screen -mx-[50vw] overflow-x-clip bg-background ..."
>
  {/* padding interne 24 / md:64 / lg:144, seule couche de marge du hero */}
</section>
```

---

## Alternatives considérées

| Alternative | Raison de rejet |
|---|---|
| Retirer `max-w-5xl`/`px-6 md:px-8` de `<main>` dans `app/(site)/layout.tsx`, et reporter cette contrainte dans chaque section individuellement | Touche un fichier partagé par About/Obsolet/Contact/header/footer, toutes hors scope ce cycle (ADR-009) ; oblige à ajouter un `max-w-5xl mx-auto` dans 3 composants non repris pour ne rien changer visuellement chez eux — surface de régression large pour un gain nul hors hero. |
| Rendre `<Hero />` en dehors de `<main>`, comme sibling de `<Header />`/`<Footer />`, directement dans `app/(site)/layout.tsx` | `layout.tsx` est un layout de route générique (partagé par toute page sous `(site)`), pas le lieu pour référencer un composant de page précis (`page.tsx` en a la responsabilité) ; casserait la séparation layout/page et rendrait le layout dépendant du contenu d'une page spécifique. |
| Accepter l'effet de « boîte » comme contrainte esthétique permanente du thème scopé | Rejeté explicitement par Le Talent ce cycle — l'ambition « plein cadre » du brief v1 n'a jamais été atteinte, ce n'est pas un compromis acceptable, c'est un bug. |

---

## Conséquences

### ✅ Bénéfices attendus
- Zéro ligne modifiée dans `app/(site)/layout.tsx`, `header.tsx`, `footer.tsx`, `mobile-nav.tsx` —
  la garantie d'isolation d'ADR-009 (« zéro régression hors hero ») est préservée et étendue au
  plein cadre.
- Le fond `.theme-drive` atteint réellement les deux bords du viewport à toute largeur testée —
  ce que CA-8 v1 ne vérifiait pas (valeurs de padding vérifiées, jamais le contact au bord réel).
- Le pattern est réutilisable tel quel par toute future section plein cadre (`P-00x`), sans
  attendre le remplacement global de `:root`.

### ⚠️ Contraintes acceptées
- Deux logiques de marge coexistent sur la page : `<main>` continue de contraindre About/Obsolet/
  Contact à `max-w-5xl`, pendant que le hero s'en échappe seul — dissonance structurelle assumée
  tant que ces sections ne sont pas reprises sous la même direction (cf. ADR-009).
- La technique de breakout dépend d'un confinement `overflow-x-clip` propre au wrapper hero ; si un
  futur composant à l'intérieur du hero introduit lui-même un débordement horizontal, il restera
  invisible dans le hero (clip) — vérification du scroll horizontal global de page reste requise en
  Quality Brief.

### 🔗 Impact sur les agents
- **RAY** : toute future feature `P-00x` qui veut du plein cadre réutilise ce pattern scopé au
  composant plutôt que de rouvrir `app/(site)/layout.tsx` — sauf décision explicite de remplacer
  globalement le wrapper `<main>`, qui reste un choix distinct, arbitrable au moment du
  remplacement global de `:root` (cf. condition de révision d'ADR-009).
- **BOB** : n'édite jamais `app/(site)/layout.tsx`, `header.tsx`, `footer.tsx`, `mobile-nav.tsx`
  pour obtenir le plein cadre du hero — le wrapper `left-1/2 w-screen -mx-[50vw]
  overflow-x-clip` (ou équivalent strictement scopé au hero) est la seule surface de changement.
- **ANALYZER** : rejette toute diff touchant `app/(site)/layout.tsx` ou les fichiers des sections
  hors scope (hérité d'ADR-009) ; vérifie explicitement l'absence de scroll horizontal
  (`document.documentElement.scrollWidth <= window.innerWidth`) à 375/768/1024/1440/1920px et le
  contact du fond cream aux deux bords du viewport à ces mêmes largeurs.

---

## ADRs liés

- Dépend de : ADR-009 (thème Drive Capital scopé au hero) — ce breakout applique le même principe
  d'isolation à la structure de layout, pas seulement aux tokens de thème.
- Conditionne : une future décision de remplacement global du wrapper `<main>` (`max-w-5xl`), à
  spécer quand About/Contact/Obsolet/header/footer entreront en cycle RAY sous la même direction —
  au même moment que la révision d'ADR-009.

---

## Révision

**Condition de révision :** quand About/Contact/Obsolet/header/footer entrent en cycle RAY sous la
même direction visuelle et que `<main>` est reconsidéré globalement (cf. révision d'ADR-009). À ce
moment, évaluer si le breakout scopé par section reste pertinent ou si `<main>` doit perdre son
`max-w-5xl` au profit d'un `max-w` porté section par section.

**Date ou milestone suggéré :** prochain cycle `P-00x` de la phase `NEXT`.

---

## Note de numérotation

`ADR-010` reste réservé au cycle *stack* (cf. note de numérotation d'ADR-009) et n'a pas encore été
rédigé au moment de cet ADR. Cet ADR consomme donc `ADR-011` pour éviter toute collision future dans
`ADR_INDEX.md`, registre partagé entre les deux produits de ce dépôt.
