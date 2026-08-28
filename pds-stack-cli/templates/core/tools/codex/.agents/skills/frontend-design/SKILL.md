---
name: frontend-design
description: >
  Génère un brief esthétique avant toute implémentation UI.
  Commit sur une direction visuelle précise basée sur le contexte de la spec.
  BOB l'active automatiquement au début de chaque feature UI — avant la première ligne de CSS.
  Triggers : "bob", "implémente", "feature_[ID]", toute implémentation UI Next.js.
---

> **Source unique** : ce fichier est un loader. Le protocole complet vit dans
> `agent-system/agents/BOB_aesthetic_gate.md` (partagé avec les autres outils — Claude Code,
> Cursor, VS Code, Gemini CLI).

Charge et applique **intégralement** `agent-system/agents/BOB_aesthetic_gate.md`.
