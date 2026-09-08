# Contexte du produit « PDS Stack »

Ce dossier garde la vision et la roadmap de **la stack elle-même** — le paquet npm, les agents,
les garde-fous, la suite pulse.

Il a été sorti de `agent-system/context/` le 2026-09-08 parce que RAY lit
`context/client_vision.md` et `context/roadmap.md` avant **chaque** spec. Tant que ces deux
fichiers décrivaient la stack, toute feature du portfolio était cadrée contre la vision de la
stack — c'est la cause du sur-place diagnostiqué ce jour-là.

Un dépôt, deux produits :

| Produit | Code | Contexte |
|---|---|---|
| Portfolio Amine Lamine | `app/` · `components/` · `lib/` | `agent-system/context/` |
| PDS Stack | `pds-stack-cli/` · `agent-system/agents/` · `templates/` | `agent-system/context/stack/` |

**Pour reprendre un cycle sur la stack** (F-001b, F-001c, l'ADR-009 sur la portée des lignes
vertes) : échanger les deux jeux de fichiers, ou travailler la stack dans un dépôt séparé.
Ne pas mélanger les deux numérotations de features — c'est déjà arrivé (F-001 portfolio contre
F-001a stack).
