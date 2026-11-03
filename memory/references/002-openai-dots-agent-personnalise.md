---
id: 002
nom: OpenAI dots — l'agent qu'on nomme et qu'on habille
pattern: incarnation d'agent · personnage personnalisable · un nom par agent
source: https://openai.com/fr-FR/index/introducing-dots/ (page de lancement, 2026-09-29 · identité © OpenAI)
date: 2026-10-14
---

> **Pourquoi ça marche** — un agent abstrait (« toujours actif, son propre ordinateur ») reçoit
> un corps minimal : une pastille ronde unie qui, dans le hero, se métamorphose en personnage
> (blob vert, deux yeux, nœud papillon). Le signe de base est neutre et géométrique ; le
> caractère vient d'un ou deux attributs ajoutés (yeux, accessoire). L'utilisateur *nomme* et
> *personnalise* son dot : l'attachement passe par l'appropriation, pas par la complexité du dessin.
>
> **Ce qu'on en a pris** *(proposé — à acter au gate ①)* : signe de base géométrique commun à
> tous les agents + un ou deux attributs qui portent le caractère ; la métamorphose signe → personnage.
> **Ce qu'on n'en a pas pris** : l'autonomie 24/7 et la « recherche proactive » (PDS ne franchit
> aucun gate seul), la personnalisation libre par l'utilisateur, toute l'identité (nom « dots »,
> blob vert, nœud papillon).

## Observé
- Hero : anneau gris-bleu (donut plat) → blob vert anis avec deux yeux ronds et un nœud noir.
- Film de lancement : wordmark « dots » lumineux dans un décor de labo de nuit.
- Ton : le dot « vous signale les décisions qui nécessitent votre intervention » — proche de nos gates.
- Règles intégrées : quand agir seul, quand demander une approbation ; certaines actions restent toujours humaines.

## Mécanique documentée — sûreté et contrôle (ajout 2026-10-24, F-007)
Source : https://openai.com/fr-FR/index/how-we-build-safety-security-and-privacy-into-dots/ (2026-09-29). Fonctionnel seulement.
- **Trois régimes d'action** : poursuivre seul · demander confirmation · rendre la main sur l'étape. Certaines actions exigent une confirmation à chaque fois (suppression définitive, logiciel non reconnu, nouvel accès sensible).
- **Une approbation reste liée à sa tâche** : reprendre ou déléguer ne l'élargit pas.
- **Vérification distincte avant l'action** ; une étape bloquée renvoie sa raison à l'agent, qui demande, contourne autrement, rend la main ou s'arrête.
- **Vue Activité** : tâches en cours et déléguées avec leur état ; on ajoute du contexte, corrige, réoriente, arrête.
- **Secret hors conversation** : la connexion sécurisée transmet le mot de passe sans le montrer au modèle.
- **Règles personnalisées** : l'agent peut les rédiger, l'humain approuve tout changement. Le contexte d'un agent se réinitialise.
- **Pris pour F-007 (B)** : fiche d'agent à trois régimes · raison sur l'étape bloquée · état + Arrêter · clé API hors du fil. **Laissé** : recherche proactive, agent toujours actif, achats.
