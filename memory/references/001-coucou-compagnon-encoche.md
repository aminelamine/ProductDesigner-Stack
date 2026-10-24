---
id: 001
nom: Coucou — compagnon d'agents dans l'encoche Mac
pattern: compagnon ambiant · décision humaine en un clic hors du terminal
source: https://github.com/Louis-CFM/coucou (MIT pour le code · nom, mascotte Mochi, icône, sons © Louis Raillé, réservés)
date: 2026-10-13
---

> **Pourquoi ça marche** — l'agent tourne dans le terminal, mais la *décision* remonte là où
> l'œil est déjà : l'encoche, toujours visible, jamais une fenêtre de plus. Un hook Claude Code
> pousse l'événement sur un socket Unix local ; pour une permission, le hook *attend* le clic
> avant de répondre. La mascotte donne un état d'humeur lisible sans lire de texte.
>
> **Ce qu'on en a pris** : l'emplacement (encoche / bord d'écran), la mécanique hook → socket →
> clic qui répond à l'agent, l'idée d'un personnage qui porte l'état.
> **Ce qu'on n'en a pas pris** : le flux de tout ce que fait l'agent (fichiers lus/édités, diffs),
> le chat multi-fournisseurs, les pastilles GitHub/Stripe/Vercel, la musique, la voix. Et toute
> l'identité (nom, Mochi, sons) — réservée. Notre compagnon n'affiche **que les 3 gates humains**.

## Exploitable

- **Plateformes** : macOS 15+ en Swift 6 / SwiftUI / AppKit sans dépendance · Windows/Linux en
  Tauri 2 · iPhone (CloudKit + Live Activities) · Android (Wi-Fi local).
- **Branchement Claude Code** : petit script hook → socket Unix. Installation depuis Settings,
  avec sauvegarde de la config de l'agent et diff montré avant écriture.
- **Interaction** : Allow / Deny / Always sur les permissions ; réponse aux questions de Claude
  depuis l'encoche ou le téléphone (Face ID).
- **Confiance** : pas de télémétrie, pas de compte, clés dans le trousseau de l'OS.
