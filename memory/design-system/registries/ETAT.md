# État des registres

**Seed déclaré** — issu de la genèse (`memory/SETUP.md`, source 4), le 2026-10-24.
Aucune extraction Figma n'a encore eu lieu.

| Source | Disponible | Note |
|---|---|---|
| Figma (MCP) | à vérifier | `figma-console-mcp` est en dépendance ; aucune librairie DS publiée n'a été extraite |
| Code | non | — |
| Déclaré | **oui** | socle de `memory/identity.md`, recopié ci-dessous |

## Le seed

| Rôle | Token | Valeur |
|---|---|---|
| Fond (encre) | `--ink` | `#0a0908` |
| Surface | `--surface` | `#16140f` |
| Texte (papier) | `--paper` | `#efe9df` |
| Accent — « un gate vous attend » | `--accent` | `#ff5436` |
| Titres | `--f-disp` | Space Grotesk |
| Voix humaine | `--f-serif` | Instrument Serif italique |
| Voix machine | `--f-mono` | JetBrains Mono |
| Rayon | `--r` | `14px` |

Le seed reste dans ce fichier et non dans `variables.json` / `text-styles.json` : leur schéma
exige des clés Figma (`key`) que seul un import produit. Un JSON sans clé échouerait à la
validation (`schemas/validation.md`).

**Conséquence** : la phase DIRECTION **conforme** au seed — une valeur hors seed se déclare comme
proposition. Ce fichier est remplacé par les registres dès la première extraction Figma réussie.
