# aesthetic_directions.md
> **Usage** : bibliothèque de **directions esthétiques pré-argumentées**, prêtes à proposer.
> Elle sert le **mode junior** du conducteur `/pds` et le skill `frontend-design` : quand
> l'utilisateur n'a pas encore le goût pour trancher un Brief Esthétique, l'agent lui propose
> **2-3 directions complètes** (pas un catalogue à assembler) et le laisse choisir.
>
> Chaque direction **compose** des entrées existantes de [`visual_reference.md`](./visual_reference.md)
> (palette + pairing + style + tension) et y ajoute ce qui manque à un junior : *quand ça colle,
> quand l'éviter, et le compromis*. On ne réinvente rien — on emballe et on argumente.

---

## Comment l'agent s'en sert

1. Lire le **type de produit** dans `client_vision.md` (persona, JTBD, valeurs).
2. Sélectionner les **2-3 directions** dont le « Quand ça colle » matche le mieux.
3. Les présenter en bloc avec une **reco** (« je partirais sur X parce que… »).
4. Le Talent choisit ou ajuste → l'agent ancre le choix dans `design_guide.md` (jamais à sa place).

> Ce sont des **points de départ argumentés**, pas des templates. La règle reste : palette + typo
> doivent raconter la même histoire, et on dévie si le contexte l'exige.

---

## D1 — Terminal Honnête
**En une phrase** : outil technique, dark et dense, où chaque élément a le poids d'un ticket de code.
**Quand ça colle** : dev tool, CLI, dashboard technique, plateforme data pour devs.
**Quand l'éviter** : consumer grand public, marketing, contenu chaleureux.
**Palette** : *Dev tool / CLI* — `#16A34A` sur `#0A0A0A` + amber `#D97706` (warning). *(visual_reference → SaaS & Outils)*
**Typo** : *Space Mono / IBM Plex Sans* — mono heading assumé + humaniste lisible.
**Tension** : mono heading / body clean · dark bg / accent lumineux.
**Style** : Dark mode first.
**Compromis** : austère — superbe pour un public technique, rebutant pour un public lambda.

## D2 — Éditorial Chaleureux
**En une phrase** : la typographie comme seul design, chaleur du papier, lecture posée.
**Quand ça colle** : portfolio, blog, newsletter, personal brand, page manifeste.
**Quand l'éviter** : app data-dense, dashboard, formulaires complexes.
**Palette** : *Blog / Newsletter* — stone `#1C1917` + rouge éditorial `#DC2626` sur `#FFFBF7`. *(visual_reference → Editorial)*
**Typo** : *Fraunces / DM Sans* — serif organique + sans clean.
**Tension** : serif expressif / sans neutre · poids extrêmes (300 / 700).
**Style** : Typographie seule.
**Compromis** : magnifique pour du contenu, inadapté dès qu'il faut afficher beaucoup de données.

## D3 — SaaS Confiance
**En une phrase** : outil B2B lisible et solide, l'efficacité avant l'ornement.
**Quand ça colle** : SaaS B2B, dashboard, outil interne, plateforme produit.
**Quand l'éviter** : luxury, éditorial, positionnement premium.
**Palette** : *SaaS générique* — trust blue `#2563EB` + orange CTA `#EA580C` sur `#FFFFFF`. *(visual_reference → SaaS & Outils)*
**Typo** : *Syne / Inter* — heading géométrique distinctif + body ultra-lisible.
**Tension** : heading distinctif / body neutre.
**Style** : Flat + couleurs franches.
**Compromis** : rassurant et rapide à lire, mais peu mémorable si l'identité n'est pas poussée ailleurs.

## D4 — Institutionnel Sobre
**En une phrase** : confiance et clarté, zéro ornement — on ne cherche pas à séduire, on rassure.
**Quand ça colle** : fintech, legal, compliance, rapport, trust-critical.
**Quand l'éviter** : produit ludique, bold, consumer jeune.
**Palette** : *Fintech / Banking* — bleu institutionnel `#1D4ED8` sur `#FFFFFF`, 0 ornement. *(visual_reference → Fintech & Pro)*
**Typo** : *Libre Baskerville / Source Sans 3* — serif académique + sans lisible.
**Tension** : serif de confiance / sans clair.
**Style** : Minimalisme / flat sobre.
**Compromis** : crédible et sérieux, mais peut paraître froid ou daté si mal dosé.

## D5 — Bold Startup
**En une phrase** : énergie de lancement, tension graphique forte, identité qui claque.
**Quand ça colle** : landing page, splash, marque forte, produit design-forward.
**Quand l'éviter** : enterprise, médical, finance, tout contexte trust-critical.
**Palette** : *SaaS B2C* — rose bold `#EC4899` + cyan contraste `#0891B2` sur `#FFFFFF`. *(visual_reference → E-commerce & Consumer)*
**Typo** : *Clash Display / Switzer* — display très distinctif + body clean. *(ou Unbounded / DM Sans)*
**Tension** : display ultra-bold / body neutre.
**Style** : Neubrutalism ou Bento grid.
**Compromis** : mémorable et différenciant, mais fatigant en usage prolongé et risqué en B2B.

---

## Note pour l'expert
En mode `user_level: expert`, l'agent ne déroule pas ces directions : il va directement à
`visual_reference.md` et compose. Cette bibliothèque est un **échafaudage pour former le jugement**,
pas une contrainte — une fois le goût acquis, on s'en passe.
