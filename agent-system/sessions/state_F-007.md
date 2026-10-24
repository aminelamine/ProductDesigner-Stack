# state_F-007 — Interface front PDS

## À savoir
- Sketch · gate ① franchie 2026-10-24 : **B · L'établi** (brief rév. 3) · A/C → `directions/005`/`006` refusée · ADR-021 PROPOSED (y reporter : clé API en formulaire dédié, trousseau)
- **Socle révisé (session 06)** : `memory/identity.md` rév. 1, choisie par le Talent sur ses réfs (`refs-F-007/socle-*`) — clair · Poppins + Merriweather · accent bleu `#2563eb` = « une décision vous attend » · règle n° 6 « pas un outil d'initié ». Landing à reporter (liste dans `identity.md`)
- **Proto rév. 1 vérifié au navigateur (session 07, 1440×900)** — parcours complet, Arrêter/Reprendre, `/bob --proto` → « Pas encore possible », `@ray`, fiche, Décisions, console vide. Corrigé : lignes d'attente bleues restées après décision (n° 4) · « Ajouter à mes goûts » jamais visible · Reprendre aussi dans la barre d'état · onglet « arrêté » · inspecteur vide avant directions. Reste à revoir au navigateur après ces correctifs (JS `node --check` OK). Pastille bleue « Décision » dans « Votre style » (replié) laissée — au Talent de trancher. Ex-statut : : `prototypes/F-007-etabli.html` — même layout 340/centre/320, étapes groupées repliées, inspecteur replié sauf Direction, vocabulaire nouveau venu (Direction › Prototype › Votre avis ; « Je la garde / Je ne la garde pas » ; note /20 et chemins en détail replié), mode replié à l'accueil. JS : `node --check` OK
- Gate ③ **non rendue** — verdict au Talent seul, après vérification du proto rév. 1

## Retours du Talent — 2026-10-24
- Trop chargé, trop d'informations d'un coup, pas clean
- Typo « trop IA slop » → à changer
- Un nouveau venu qui ne connaît pas la stack ne peut pas s'en servir : trop technique → simplifier l'UX writing **et** l'expérience
- Mode **clair**, plus sombre
- Portée tranchée : **tout le socle** (pas une exception F-007) → `memory/identity.md` est révisé (fond, polices), landing comprise

## Prochain (ordre)
1. ~~Révision du socle~~ — fait (session 06, `identity.md` rév. 1)
2. ~~Vérifier le proto rév. 1~~ — fait session 07 (re-vérif rapide des correctifs à faire) dans le navigateur intégré, 1440×900 : démo → Esquisse rapide → Valider → prototype → avis ; Arrêter/Reprendre ; `/bob --proto` avant validation = « Pas encore possible » ; `@ray` ; fiche d'agent ; console propre. Corriger, commiter `fix(F-007): …`
3. Puis gate ③ du proto révisé — verdict au Talent seul
4. Hors F-007 : reporter le socle rév. 1 sur la landing (liste dans `identity.md`)
