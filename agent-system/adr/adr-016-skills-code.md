# ADR-016 — Skills code : React best practices et composition (Vercel)

| | |
|---|---|
| **Statut** | ✅ **ACCEPTED** — Le Talent, 2026-09-28 |
| **Domaine** | Outillage / Qualité du code |
| **Date** | 2026-09-28 |
| **Suit** | [ADR-015](adr-015-skills-externes.md) — skills externes · [ADR-014](adr-014-stack-lean.md) — budget contexte |

---

## Contexte

Le Talent demande des skills existantes pour améliorer le code produit par BOB. ADR-015 couvre le
rendu (Playwright CLI) et le plancher visuel (impeccable) ; rien ne couvre la **qualité React /
Next.js** du code lui-même. Source explorée : le catalogue VoltAgent/awesome-agent-skills
(1 400+ entrées), filtré sur un critère — **combler un manque réel sans recouvrir la stack**.

## Décision

| Skill | Rôle dans la stack | Statut |
|---|---|---|
| **react-best-practices** (Vercel, MIT) | 70 règles de perf React/Next par impact (waterfalls, bundle, RSC, re-renders). BOB §6 pendant le build, ANALYZER dimension C. | ✅ adoptée |
| **composition-patterns** (Vercel, MIT) | Comment découper un composant au-delà du plafond de lignes — compound components, pas de prolifération de props booléennes, API React 19. | ✅ adoptée |
| **next-best-practices** (Vercel) | N'existe plus comme skill : livrée par Next.js (docs embarquées + `AGENTS.md` généré par `next dev`, 16.3+). Sur 16.2 : `npx @next/codemod@canary agents-md` — mais il écrit un `AGENTS.md` concurrent du nôtre. | ⏸ au passage à Next 16.3 |
| **web-design-guidelines** (Vercel) | Télécharge ses règles depuis une URL **à chaque exécution** : instructions non figées, non relues. Recouvre impeccable + `design:accessibility-review`. | ❌ écartée |
| **web-quality-skills** (Addy Osmani) | Audit Lighthouse (perf, a11y, SEO). Recouvre Playwright + impeccable + a11y du HANDOFF ; ~1 000 lignes. | ⏸ opt-in, projet par projet |
| **skill-creator**, **shadcn-ui**, **frontend-design**, **figma** | Déjà présentes (ou version PDS plus adaptée — cf. ADR-015 pour frontend-design). | ❌ doublons |

**Vendorées, pas installées.** `SKILL.md` + `rules/` copiés dans `.claude/skills/`, figés au
2026-09-28 (`NOTICE`). Le `AGENTS.md` compilé (~108 Ko) n'est pas copié : l'agent lit **une**
règle à la fois (`rules/<règle>.md`, ~1,5 Ko). Coût permanent : deux descriptions dans la liste des
skills (~150 tokens).

**Déclencheur restreint** (même correctif que `frontend-design`, ADR-015) : build et revue de code
uniquement — jamais au brief ni au prototype HTML.

**Règle de préséance.** Aucune règle ne décide contre la spec VALIDATED, le brief ou un ADR
ACCEPTED : elle est levée et notée. **Aucune dépendance ajoutée** par une règle — `swr`,
`better-all`, `lru-cache`, `@vercel/analytics` ne s'appliquent que déjà installés ; sinon
l'équivalent natif, ou un ADR. `/components/ui/` n'est jamais touché.

**Règle d'absence** (ADR-015) : skill absente ⇒ on le dit en une ligne, on continue.

## Conséquences

- BOB §6 et ANALYZER §1.C y renvoient en une ligne. **Pas de nouvelle déduction** dans le /20 :
  une règle CRITICAL violée est un retour dans le feedback, pas un point — à revoir après 3 livraisons.
- Mise à jour : manuelle, en relisant le diff amont avant de recopier (aucun chargement distant).
