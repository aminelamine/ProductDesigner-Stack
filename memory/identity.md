---
produit: PDS Stack — landing · docs · compagnon Paraphe · interface front (F-007)
source: genèse (memory/SETUP.md, source 4) · révision 1 du Talent, 2026-10-24
date: 2026-10-24
revision: 1 — mode clair · Poppins + Merriweather · palette « Color System » (réfs du Talent)
statut: validé par le designer
---

# Identité — PDS Stack

> Le socle du produit : son histoire visuelle, ce qui ne bouge pas, et **ce que ce produit n'est
> pas**. Lu en premier par DIRECTION — une direction qui touche au socle ne se propose pas.

## L'histoire visuelle

*La stack dont le product designer a besoin à l'ère de l'IA.*

Avant d'être lue, la page dit que c'est l'outil **du designer** — pas celui de la machine.
Et elle se comprend du premier coup, même par quelqu'un qui ne connaît pas la stack : **clair,
simple, peu de choses à l'écran**, le détail à la demande.

## Les 3 mots

`Augmented` · `Design` · `Stack`

## Le socle

Choisi par le Talent le 2026-10-24 sur ses références :
`agent-system/sessions/refs-F-007/socle-palette-color-system.webp` (palette) ·
`agent-system/sessions/refs-F-007/socle-typo-poppins-merriweather.png` (typo). Ne se rediscute plus.

| Rôle | Token | Valeur |
|---|---|---|
| Fond | `--bg` | `#ffffff` |
| Surface (panneaux, cartes) | `--surface` | `#f8fafc` |
| Filet, bordure | `--border` | `#e5e7eb` |
| Texte principal | `--text` | `#111827` (17,7:1) |
| Texte secondaire | `--text-2` | `#6b7280` (4,8:1) |
| Texte désactivé | `--text-3` | `#9ca3af` (jamais pour un texte à lire) |
| Accent — gate | `--accent` | `#2563eb` (5,2:1 ; texte blanc dessus 5,2:1) |
| Accent — survol | `--accent-strong` | `#1d4ed8` |
| Accent — teinte | `--accent-soft` | `#f0f6ff` |
| Titres, interface, voix machine | `--f-sans` | **Poppins** 400 · 500 · 600 · 700 |
| Voix humaine | `--f-serif` | **Merriweather** 400 · 700 |
| Détail technique (replié seulement) | `--f-mono` | `ui-monospace` (police système, aucune chargée) |
| Rayon | `--r` | `12px` |

**Statuts** (palette sémantique de la réf., teinte 50 en fond + ton 700 en texte, toujours avec
une icône) : réussi `#15803d` / `#f0fdf4` · attention `#b45309` / `#fffbeb` · erreur `#b91c1c` /
`#fef2f2` · information = **neutre** (`--text-2` sur `--surface` + icône), jamais le bleu de l'accent.

**Ce qu'on laisse de la réf. :** les dégradés (« Brand Gradients »), le violet « Premium »,
le bleu en info, le bleu pour toutes les actions. Les actions ordinaires sont neutres
(texte `--text`, bordure `--border`) ; le bouton plein bleu est celui du gate.

## Ce que ce produit n'est pas

1. **Pas un outil passif qu'on pilote seul.** PDS accompagne, aide, facilite : on lui délègue des
   tâches et on travaille avec lui — l'esprit des agents qu'on nomme et à qui l'on confie un rôle
   (`references/002`, `references/003`, mécanique seulement).
2. **Pas celui qui décide.** On délègue l'exécution, jamais le jugement. Les gates restent humains.
3. **Pas une boîte noire.** Ce qui se passe sous le capot est visible pour qui veut comprendre —
   *à la demande*, jamais imposé à l'écran, jamais caché.
4. **L'accent n'est pas une couleur de marque.** Le bleu `#2563eb` veut dire « une décision vous
   attend », et rien d'autre — ni lien, ni info, ni bouton ordinaire.
5. **Les deux voix ne se mélangent pas.** Poppins = l'interface et la machine (agents, étapes,
   score) · Merriweather = l'humain (vos décisions, verdicts, la phrase de direction).
   Jamais inversées, jamais dans la même cellule.
6. **Pas un outil d'initié.** Un nouveau venu comprend chaque écran sans connaître la stack : des
   mots de tous les jours au premier plan ; le vocabulaire interne (noms de phases, chemins de
   fichiers, commandes, notes chiffrées) vit dans le détail replié.

Les statuts ne sont pas un interdit : ils suivent les règles d'expérience utilisateur — lisibles,
accessibles, la couleur n'étant jamais le seul porteur de sens (WCAG 1.4.1).

## Ce que l'identité révise

- **Révision 1 (2026-10-24, le Talent)** : le socle sombre (encre `#0a0908`, papier `#efe9df`,
  accent `#ff5436`, Space Grotesk · Instrument Serif · JetBrains Mono, rayon 14) est remplacé —
  jugé trop chargé et « IA slop ». Mode clair, Poppins + Merriweather, accent bleu, règle n° 6.
  La portée est tout le produit, landing comprise.
- La direction 004 (Paraphe, retenue) disait « on ne montre que ce que l'humain tranche » et
  « pas de vert/rouge ». L'identité les révise : **sous le capot visible à la demande** (n° 3) et
  **statuts selon les conventions UX**. La prochaine direction Paraphe s'y conforme.

## À reporter (dépend du socle, pas encore refait)

- `landing/styles.css` : tokens `:root` (fond, surface, texte, `--muted`/`--faint`/`--line*` sont
  des transparences du papier → à inverser sur le texte), `--accent` → bleu et usages hors gate
  (préchargeur, `.preloader__count i`) à neutraliser, `--accent-2` à retirer, `--f-*` à remplacer,
  `code` (fond papier 8 %).
- `landing/index.html` · `landing/release-notes.html` : lien Google Fonts → Poppins + Merriweather.
- Le préchargeur, la nav et les en-têtes de section reposent sur la mono : à repasser en Poppins.
- `agent-system/sessions/brief_feature_F-007.md` §0 décrit l'ancien socle (historique, non réécrit).
