---
id: 003
nom: Grok Bot — une équipe d'agents, une forme par métier
pattern: casting d'agents · avatar géométrique + yeux · un rôle = un nom de métier
source: https://x.ai/bot (page produit · identité © xAI)
date: 2026-10-14
---

> **Pourquoi ça marche** — chaque agent est une forme primitive pleine (cercle, triangle,
> losange) d'une couleur franche, animée par **deux yeux** seulement. La forme + la couleur
> distinguent les rôles d'un coup d'œil dans une liste ; les yeux suffisent à en faire des
> coéquipiers. Le nom est un métier (Chief, Talent Scout, Expense Manager), et chaque agent parle
> à la 1re personne, en minuscules, d'une phrase de compte rendu (« report filed. 9 receipts,
> nothing outstanding »). Un groupe = les formes agglutinées en grappe.
>
> **Ce qu'on en a pris** *(proposé — à acter au gate ①)* : une forme primitive par agent
> (BOB · RAY · ANALYZER · EVE · conducteur), deux yeux comme seul trait vivant, une voix écrite
> propre à chaque agent, la grappe pour une équipe.
> **Ce qu'on n'en a pas pris** : le fil de messagerie et le compte rendu continu d'activité
> (direction 004 : on ne montre que ce que l'humain tranche), les agents qui se passent le
> travail sans approbation, la palette multicolore, toute l'identité Grok.

## Observé
- Liste latérale façon messagerie : avatar 24 px, nom de métier, heure, dernière phrase de l'agent.
- Formes vues : cercle sarcelle, cercle orange, triangle violet (pastille rouge de notif), losange violet, cercle bleu, grappe de 3 formes (« Offsite crew »).
- Logo hero : sphère noire avec un reflet en forme d'œil, insérée dans le titre « Meet ● Grok Bot ».
- « come back when your approval is needed » — l'appel à l'humain comme moment fort.

## Mécanique documentée — bots, skills, routines (ajout 2026-10-24, F-007)
Sources : https://docs.x.ai/grok-bot/overview · /bots · /skills-routines-and-automations · https://x.ai/bot/marketplace. Fonctionnel seulement.
- Un bot = **un nom, un métier, sa propre conversation, un contexte qui s'accumule** ; le premier message fixe le rôle, les sources et les limites d'approbation.
- **Règle durable ≠ consigne de tâche** (« retiens ça » contre un message ordinaire). La mémoire n'est pas une source d'autorité : vérifier la source pour une décision qui compte.
- **Skills** enregistrés à partir d'un processus réussi, appelés par `/` dans le champ. **Routines** programmées ou déclenchées par un évènement.
- **Passation visible** dans un fil de groupe ; un bot coordinateur assigne le travail. Le bot revient vers l'humain quand il faut une approbation.
- **Fiche « Détails »** au clic sur le nom (instruction, quand lancer, historique des exécutions). Masquer est réversible, supprimer non.
- Fiches de la marketplace : chaque bot **énonce sa règle d'approbation** (« never sends without you »).
- **Pris pour F-007 (B)** : `/` pour les commandes PDS, passation en une ligne, fiche d'agent avec sa règle d'approbation, inspecteur qui cite le fichier plutôt qu'un souvenir. **Laissé** : ordinateur cloud, routines et déclencheurs, « Teach a task », voix, marketplace.
