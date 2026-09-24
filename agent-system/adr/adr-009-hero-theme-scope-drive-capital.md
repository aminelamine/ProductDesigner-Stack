# ADR-009 — Thème Drive Capital scopé au hero (pas de remplacement global de `:root`)

**Date :** 2026-09-08
**Statut :** ✅ ACCEPTED
**Décideurs :** Le Talent (+ RAY pour l'analyse)
**Agents concernés :** RAY | BOB | ANALYZER

---

## Contexte

Le portfolio est aujourd'hui dark-only : `app/globals.css` définit dans `:root` un fond near-black,
un accent amber, la police IBM Plex, un radius serré (0.25rem). Ce thème est utilisé sans exception
par les 7 composants existants (`header`, `hero`, `about`, `obsolet-section`, `contact`, `footer`,
`mobile-nav`).

Le Talent a arrêté une nouvelle direction — système Drive Capital : cream `#fff8f1`, Voltage Blue
`#006eff` comme seul accent, didone hairline 100 + grotesk 300/400, pills 60px outlined, surfaces
plates, 144px de marge (`agent-system/context/references/style-drive-capital.md`). Ce cycle ne
reprend que le hero (P-001) — About, Contact, Obsolet, header et footer restent non repris et sont
construits contre les tokens sombres actuels.

## Décision

**Nous adoptons un thème scopé au hero, pas un remplacement de `:root`.**

Un nouveau bloc CSS, porté par un sélecteur dédié (ex. `.theme-drive`), applique les tokens
cream/ash/ink/Voltage Blue et les deux nouvelles familles typographiques uniquement à l'intérieur
du wrapper `<section id="hero">`. Le bloc `:root` existant n'est pas modifié : aucune ligne du dark
theme actuel n'est touchée par cette feature.

```css
/* app/globals.css — bloc additif, :root inchangé */
.theme-drive {
  --background: #fff8f1;
  --foreground: #000000;
  --primary: #006eff;
  --border: #e2e8f0; /* Ash */
  /* + variables de police scopées, cf. spec P-001 */
}
```

Le remplacement global de `:root` par le système Drive Capital est **reporté** à un cycle
ultérieur, quand About/Contact/Obsolet/header/footer seront repris sous la même direction
(phase 🟡 NEXT de `roadmap.md`).

## Alternatives considérées

| Alternative | Raison de rejet |
|---|---|
| Remplacer `:root` globalement maintenant | Casse le rendu de 5 sections non repensées (contraste, radius, police et densité conçus pour le thème sombre) — c'est toucher les autres sections sans éditer leur code, ce que le scope de P-001 exclut. |
| Dupliquer tout `globals.css` en deux thèmes avec toggle clair/sombre | Une variante claire avec toggle est un item `LATER` de la roadmap — c'est une feature à part, pas un pré-requis pour livrer un hero. |

## Conséquences

### ✅ Bénéfices attendus
- Zéro régression visuelle hors hero — le reste du site reste identique pixel pour pixel.
- La nouvelle direction est testable en isolation sur une seule section, exactement ce que le cycle
  « reprise sous gates » demande (premier passage du gate esthétique).
- Le remplacement global reste un choix distinct, arbitrable avec le contexte complet des sections
  suivantes plutôt que décidé par défaut aujourd'hui.

### ⚠️ Contraintes acceptées
- Deux systèmes de tokens coexistent temporairement dans `globals.css` (dette assumée, à résorber
  quand le remplacement global sera spécé dans un cycle NEXT).
- Le header sticky (non repris) reste dark et survolera visuellement un hero devenu cream — seam
  transitoire connu et accepté, pas un défaut de cette feature (cf. `## OUT OF SCOPE` de la spec
  P-001).

### 🔗 Impact sur les agents
- **RAY** : toute future feature `P-00x` qui reprend une autre section doit soit réutiliser ce même
  sélecteur scopé, soit spécer explicitement le remplacement global de `:root` — ne pas laisser BOB
  trancher au fil de l'eau.
- **BOB** : n'édite jamais le bloc `:root` existant sur ce cycle ; toute règle Drive Capital vit
  dans le sélecteur scopé ; Voltage Blue n'est jamais utilisé sur du texte < 18px (conflit
  accessibilité — cf. CA-16 de la spec P-001).
- **ANALYZER** : rejette toute diff touchant `:root` ou les fichiers des sections hors scope
  (`about.tsx`, `contact.tsx`, `obsolet-section.tsx`, `header.tsx`, `footer.tsx`, `mobile-nav.tsx`).

---

## ADRs liés

- Conditionne : une future décision de remplacement global de `:root`, à spécer quand les sections
  `NEXT` (About, Expériences, Obsolet, Contact) entreront en cycle RAY sous la même direction.

---

## Révision

**Condition de révision :** quand About/Contact/Obsolet/header/footer entrent en cycle RAY sous la
même direction visuelle. À ce moment, remplacer ce scoping par un remplacement global de `:root` et
marquer cet ADR `SUPERSEDED`.

**Date ou milestone suggéré :** prochain cycle `P-00x` de la phase `NEXT`.

---

## Note de numérotation — à trancher par Le Talent

`agent-system/context/stack/roadmap.md` réserve informellement le libellé « candidat ADR-009 » pour
une décision **sans rapport**, côté produit *stack* (le prompt `flow.md` STEP 3 qui ne nomme pas
`/bob --build`). Cet ADR-ci est le premier des deux à être réellement rédigé et consomme donc
`ADR-009` dans `ADR_INDEX.md`, qui est un registre **partagé** entre les deux produits de ce dépôt.
Quand le cycle *stack* rédigera son propre ADR, il devra prendre `ADR-010` pour éviter la collision
que le handoff signalait déjà une fois côté numérotation de features (`P-` vs `F-00Xx`).


> **Annotation 2026-09-24 (gate ② P-002 / P-003)** — `about.tsx`, `header.tsx` et `mobile-nav.tsx` sortent de la liste hors scope : l'About migre sur le socle crème (`memory/decisions/002`), le header aussi (`memory/decisions/003`). `contact.tsx`, `obsolet-section.tsx` et `footer.tsx` restent hors scope jusqu'à leurs cycles.
