# glossary.md
> **Usage** : source unique du **vocabulaire PDS** et du **pourquoi des gates**.
> Le conducteur `/pds` et les agents s'en servent en **mode junior** (`STACK.md → user_level: junior`)
> pour **gloser un terme inline** la première fois qu'il apparaît, et pour **expliquer un gate**
> au lieu de simplement l'imposer.
>
> Règle : en mode junior, glose au fil de l'eau (1 phrase, entre parenthèses ou en note), ne récite
> jamais le glossaire en bloc. En mode expert, ne glose rien.

---

## Termes (définition en 1 phrase, sans jargon)

| Terme | En clair |
|---|---|
| **Le Talent** | Toi, l'humain qui décide — l'agent propose, tu tranches à chaque gate. |
| **Spec** | Le document qui décrit *quoi* construire (pas *comment*) — écrit par RAY, il gèle le périmètre. |
| **Scope gelé** | Une fois la spec validée, on n'ajoute plus rien sans un nouveau cycle RAY — ça empêche la dérive. |
| **VALIDÉE TALENT** | Ton feu vert explicite sur une spec — sans lui, BOB ne code pas. |
| **Gherkin** | Une façon d'écrire un scénario en `GIVEN / WHEN / THEN` (contexte / action / résultat observable). |
| **Critère d'acceptation** | Une condition binaire vrai/faux qui dit si la feature est réussie (pas de « à peu près »). |
| **INVEST** | 6 tests de qualité sur chaque critère (Indépendant, Négociable, Valuable, Estimable, Small, Testable). |
| **Tier (T1/T2/T3)** | La taille de la spec : T1 = micro-feature, T2 = feature standard, T3 = feature complexe. |
| **Quality Brief** | Le contrat visuel/technique que BOB fait valider *avant* de coder — son type est réglé dans `STACK.md`. |
| **Brief Esthétique** | Le Quality Brief quand le type = aesthetic : direction, typo, palette, tension, composition. |
| **Ralph Loop** | Les 6 étapes de build de BOB : Structure → Scaffold → Core → UI → États → Polish. |
| **Motion level (L0–L3)** | Le niveau d'animation autorisé (L0 = aucune, L3 = cinématique) — décidé dans la spec, pas par BOB. |
| **ADR** | Architecture Decision Record : une décision structurante actée et archivée, pour ne pas la re-débattre. |
| **JTBD** | Job-to-be-done : ce que l'utilisateur cherche vraiment à accomplir, formulé « Quand… je veux… pour… ». |
| **Score /20** | La note d'ANALYZER sur 4 dimensions — < 18 = pas de commit. |
| **user_level** | Le réglage `STACK.md` qui adapte le conducteur : `junior` (guidé + proposé) ou `expert` (terse). |
| **Learnings** | Les leçons qu'ANALYZER écrit après chaque feature — RAY les relit pour améliorer les specs suivantes. |

---

## Pourquoi chaque gate existe (à expliquer en mode junior)

| Gate | Pourquoi il est là |
|---|---|
| **Pre-flight `client_vision`** (RAY) | Une spec bâtie sur un problème flou produit une mauvaise feature — on vérifie qu'on sait *pour qui* et *pourquoi* avant d'écrire. |
| **VALIDÉE TALENT** (RAY → BOB) | Geler le périmètre au bon moment évite que la feature enfle en cours de route. Ton « validé » est le point de non-retour. |
| **Quality Brief** (BOB) | Décider la direction visuelle *avant* le code coûte 10× moins cher que la corriger après. C'est un contrat, pas une formalité. |
| **Score ≥ 18/20** (ANALYZER) | Le commit n'est autorisé que si la qualité est là — le seuil protège la base de code d'un « à peu près » silencieux. |

> En mode junior, quand tu arrives sur un gate, explique d'abord *pourquoi* il existe (1 phrase
> d'ici), puis demande la décision. En mode expert, applique le gate sans le commenter.
