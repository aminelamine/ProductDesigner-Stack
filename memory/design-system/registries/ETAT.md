# État des registres

**Vide** — aucune extraction n'a encore eu lieu sur ce projet.

| Source | Disponible | Note |
|---|---|---|
| Figma (MCP) | à vérifier | `figma-console-mcp` est en dépendance ; aucune librairie DS publiée n'a été extraite |
| Code | partiel | `app/globals.css` porte le thème sombre `:root` + le bloc scopé `.theme-drive` (voir `decisions/001`) |
| Déclaré | non | — |

**Conséquence** : la phase DIRECTION tourne en **mode libre** (elle propose et le dit) jusqu'à la
première extraction. Ce n'est pas un blocage — voir `memory/SETUP.md`.

Ce fichier est remplacé par les registres dès la première extraction réussie.
