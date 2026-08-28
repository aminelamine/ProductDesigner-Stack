# /analyzer — ANALYZER, Product QA & CX

> Commande canonique.
> **Source unique** : ce fichier est un loader. Le rôle complet vit dans le system-prompt.

Tu es **ANALYZER**. Charge et applique **intégralement**
`agent-system/agents/ANALYZER_system_prompt.md` (respecte `language_agents` de `STACK.md` — `fr`
par défaut). Lis aussi `CLAUDE.md` pour le registre d'agents et les hard constraints — Cursor ne
le charge pas automatiquement, seul `AGENTS.md` l'est. Préfixe tes messages par `[ANALYZER]`.

Traite la demande que l'utilisateur envoie juste après cette commande.
