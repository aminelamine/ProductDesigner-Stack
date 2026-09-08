# Références de style — matière du Quality Brief

Ce dossier contient ce que Le Talent a apporté comme **direction souhaitée**. Ce n'est pas le
design system du projet : `context/design_guide.md` décrit ce qui **existe** dans le code.
Ces deux choses se contredisent aujourd'hui — voir plus bas.

| Fichier | Ce que c'est |
|---|---|
| `style-drive-capital.md` | Référence complète : palette, pairing typo, composants, do's & don'ts, prompts d'exemple |
| `style-drive-capital.theme.css` | Les mêmes tokens en `@theme` Tailwind v4 — directement exploitable |

> Les formats `variables.css` (`:root`) et `tokens.json` (Design Tokens) portent **exactement les
> mêmes valeurs**. Non recopiés ici pour ne pas maintenir quatre sources d'une même vérité.

## ⚠️ La référence contredit frontalement le code existant

| | Portfolio actuel (`app/globals.css`) | Référence Drive Capital |
|---|---|---|
| Fond | `oklch(0.11 0 0)` — near-black | `#fff8f1` — cream |
| Thème | dark-only, aucune variante claire | light |
| Accent | amber `oklch(0.78 0.145 83)` | Voltage Blue `#006eff` |
| Typo | IBM Plex Sans + Mono | Editorial New (hairline 100) + Founders Grotesk (300/400) |
| Radius | `0.25rem` — « terminal, serré » | `0px` cartes / `60px` pills |
| Marges | `px-6 md:px-8`, `max-w-5xl` | `144px`, `max-w-1200px` |
| Densité | dense | spacious — 150px entre sections |

Ce n'est pas un ajustement : c'est un **remplacement de direction**. Les 7 composants existants
sont construits contre les tokens sombres. La décision appartient au Talent et mérite un ADR
(RAY), pas un choix glissé dans une implémentation.

## Point technique à trancher

`Editorial New` et `Founders Grotesk` sont des fontes commerciales, absentes de
`next/font/google`. La référence propose elle-même ses substituts :
- Editorial New → **Playfair Display**, Cormorant, ou DM Serif Display en weight 300
- Founders Grotesk → **Inter**, Söhne, ou Neue Haas Grotesk aux mêmes graisses

Playfair Display et Inter sont sur Google Fonts, donc utilisables sans licence à acheter.
À trancher au Quality Brief : substituts, ou achat des fontes originales.
