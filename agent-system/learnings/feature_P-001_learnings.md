---
feature_id: P-001
feature_name: Hero — trajet + système Drive Capital
date: 2026-09-08
verdict: SHIPPED
score: 18/20
---

## Patterns that worked well
- Extraire les variants d'entrée motion dans un module pur (`lib/hero-motion.ts`, pas de
  `"use client"`) plutôt que de les inliner dans le composant : ça rend un critère visuel
  (CA-15, reduced-motion) prouvable par une assertion `tsx`/`tsc` classique
  (`lib/hero-motion.check.ts`) au lieu de dépendre d'une inspection manuelle en navigateur.
  À reconduire pour tout futur `motion_level: L1+` où un comportement conditionnel
  (reduced-motion, variantes) peut être isolé du JSX.
- Étendre `buttonVariants({variant:"outline"})` via `cn(buttonVariants(...), PILL)` plutôt que
  `buttonVariants({variant, className})` — BOB a détecté et corrigé un vrai bug (classes Tailwind
  conflictuelles non dédupliquées par le cascade CSS, contour de pill invisible au rendu) et a
  documenté la correction dans le message de commit. Bon réflexe : quand on étend un composant
  Shadcn par variant + className, toujours passer par `cn()`/`twMerge`, jamais la concaténation
  brute de `buttonVariants`.
- Scoper `--ring` dans `.theme-drive` en plus de `--background`/`--foreground`/`--primary`/
  `--border` : BOB a testé l'état focus-visible au clavier (pas seulement l'état statique) et
  trouvé que l'anneau de focus retombait sur l'ambre de `:root` faute de token scopé — capturé et
  corrigé avant la revue. Vérifié par lecture de token calculée (`getComputedStyle` via CDP), pas
  par capture d'écran seule. Réflexe à généraliser : toute feature avec thème scopé doit vérifier
  les tokens d'état interactif (`--ring`, focus/hover), pas seulement les tokens de surface.

## Detected anti-patterns
- `hero-illustration.tsx` utilise `rx="11"` sur les trois rectangles de l'illustration (bras du
  signpost) — un radius qui n'est ni 0px ni 60px, en violation littérale de CA-9 (« aucun radius
  autre que 0px (surfaces) ou 60px (pills) n'apparaît dans le hero »). Aucune assertion ne couvrait
  ce critère, et le Quality Brief affirme la conformité CA-9 sans traiter explicitly le radius de
  l'illustration (les 4 points tranchés portent sur composition/police/144px/colonne, pas sur ce
  détail). Correction attendue côté BOB : `rx="0"` sur les trois rects, ou remontée explicite au
  Quality Brief d'une exception documentée si le radius est un choix assumé (écho visuel avec les
  pills CTA). Pattern à répéter : un critère de radius/couleur/ombre « zéro exception » doit être
  vérifié aussi contre les fichiers SVG inline, pas seulement contre les classes Tailwind du
  composant principal.
- Aucun des 16 critères, à l'exception de CA-5 et CA-15, n'a été laissé sous forme d'assertion
  rejouable (`.check.ts`) — le reste a été vérifié une fois en session (rendu Chrome headless, CDP)
  mais n'est pas reproductible par ANALYZER sans reconstituer l'inspection soi-même. Pas
  bloquant ici (ANALYZER a pu tout revérifier par grep/diff/capture), mais un `.check.ts` couvrant
  au moins CA-2/CA-3 (diff/grep-testables par construction, donc peu coûteux à scripter) éviterait
  de dépendre du jugement de relecture à chaque cycle.

## Spec ambiguities to anticipate
- CA-8 (« 144px de marge horizontale à partir du breakpoint desktop ») a été écrit sans tenir
  compte du wrapper partagé `app/(site)/layout.tsx` (`max-w-5xl mx-auto px-6 md:px-8`, hors scope
  de P-001). Résultat vérifié en rendu réel à 1440px : le hero cream est encadré par des bandes
  noires de chaque côté (le `main` limite le contenu à 960px), un effet de « boîte » qui n'existait
  pas visuellement avant (le hero sombre se fondait dans le fond de page sombre — le contraste
  cream/noir rend la limite du wrapper soudain visible). CA-8 au sens littéral (valeurs de padding)
  est respecté ; l'ambition « affiche éditoriale plein cadre » du Quality Brief l'est moins à partir
  de résolutions desktop courantes. À la prochaine spec touchant une section sur fond clair sous ce
  wrapper partagé : soit accepter explicitement cet effet de boîte dans le `## OUT OF SCOPE`, soit
  spécer le remplacement/l'ajustement du wrapper en même temps que le thème.
- La formulation CA-4 (« exposées uniquement en variables scopées ») est ambiguë entre deux
  lectures : (a) les polices ne doivent jamais toucher `--font-sans`/`--font-mono` globaux — ce que
  BOB a respecté ; (b) l'application des polices doit systématiquement passer par la variable CSS
  (`var(--font-drive-display)`) plutôt que par la classe générée `.className` de `next/font`. BOB a
  fait (a) mais pas strictement (b) (usage direct de `.className` sur `h1` et la colonne flanquante
  en plus de `.variable` sur la section). Le résultat reste scopé au hero dans les deux cas — mais
  si (b) est l'intention réelle, la reformuler explicitement (« passer exclusivement par
  `var(--font-x)`, jamais par `.className` ») pour lever l'ambiguïté au prochain cycle.

## CX signals to watch
- L'effet de « boîte cream sur fond noir » à partir de ~1024px (cf. ambiguïté CA-8 ci-dessus) va à
  l'encontre du ressenti visé par `client_vision.md` en 0–5s (« que ce profil ne rentre dans aucune
  case existante ») — ironie de composition à surveiller si la direction Drive Capital s'étend à
  d'autres sections : le wrapper `max-w-5xl` partagé mérite d'être réévalué au même moment que le
  thème, pas après coup.
- Testé en simulation utilisateur (H2 — décideur/recruteur, JTBD « situer un profil rare en moins
  d'une minute ») : le headline se lit intégralement sans scroll aussi bien en desktop qu'à 375px
  (capture vérifiée), et l'illustration signpost (mât noir + 3 bras bleus dégressifs) se lit
  immédiatement comme un marqueur d'étape de trajet, pas comme une vignette de projet ou une icône
  produit générique (pas de dossier/ampoule/engrenage — l'écueil typique des vignettes IA). Aucune
  friction identifiée sur ce parcours.

## Emerging architecture decision
- Le wrapper `max-w-5xl` de `app/(site)/layout.tsx` était invisible tant que toutes les sections
  partageaient le même fond sombre que `body`. Il devient un choix de composition actif dès qu'une
  section change de fond (cream vs `:root` sombre) — cf. CX signal ci-dessus. Si un futur cycle
  `P-00x` reprend une autre section sous le système Drive Capital (ou toute section à fond clair),
  RAY doit trancher explicitement : garder le wrapper partagé (effet de boîte assumé et documenté)
  ou le sortir du scope « layout partagé, jamais touché » pour permettre un plein cadre par
  section. → Candidat ADR si ça se reproduit sur une 2e section.
