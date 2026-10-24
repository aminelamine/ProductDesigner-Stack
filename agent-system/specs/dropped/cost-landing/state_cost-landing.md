# state — cost-landing

hors /pds · relais ADR-018 (contexte 160k) · 2026-09-28

## À savoir
- PR #27 (branche `docs/cost-page`) ouverte, non mergée : page doc `site/content/cost.mdx`, Why/Concepts allégés, correctif `token-report.mjs` (chemins avec espaces).
- Chiffres réels (prix API sept. 2026) : Obsolet avant la stack $17.05 / 59.8M → avec la stack $7.26 / 18.6M (‑57 %) · portfolio Standard (install < 4.1) $22.25 / 52.7M · plancher Sketch install vierge $1.41 / 2.1M.
- Répartition du $ : lecture de cache ~50 %, écriture ~40 %, sortie < 10 %. Opus 5.5 et Sonnet 5 lisent le cache au même prix ($0.20/MTok) → ce qui fait baisser le coût, c'est un contexte plus court, pas le choix du modèle.
- Limites à assumer : aucun Standard mesuré en 4.1+ · `npm run tokens` n'affiche pas encore de $.
- Question ouverte : porter Cost sur la landing (marketing) — où vit la landing, quel format, sans dupliquer la doc.
