# PNPEKIT — Document de Reprise d'Implementation

> Document de transfert pour une nouvelle discussion et un nouveau contexte d'implementation.
>
> Version : 1.0 — 19 aout 2026
>
> Projet : `PNPE-Project/`

## 0. Consigne de reprise

Ce document est le brief operationnel a charger avant toute modification du code. La prochaine session doit commencer par lire ce fichier, `PNPE-Project/docs/PNPE-specs.md`, `PNPE-Project/docs/PNPE-ANALYSIS.md`, puis inspecter l'etat reel de `PNPE-Project/`.

La mission n'est pas de polir le prototype existant. Il faut le faire evoluer vers un **simulateur credible de la future plateforme digitale de la PNPE d'Edea**, centre sur les besoins metier, les acteurs et un parcours de demonstration deterministe.

Le resultat attendu doit donner a un dirigeant PNPE cette comprehension immediate :

> La PNPE ne digitalise pas seulement ses formulaires. Elle digitalise la transformation d'un porteur de projet en entrepreneur capable de creer de la valeur.

### Regles imperatives

- Ne pas modifier `StarterKITCM/` ni `BSTP-Project/`.
- Conserver `PNPE-Project/` independant.
- Ne pas commencer par un hero public marketing.
- L'ouverture de l'application doit proposer le choix de l'acteur et de son dashboard.
- Le premier parcours du porteur est un referencement guide, avant son dashboard.
- Toutes les donnees doivent rester centralisees et coherentes.
- Toute donnee, regle de score, statut ou procedure non confirmee doit etre marquee comme **proposition UX de demonstration**.
- Chaque grande interaction doit fonctionner sans backend, Moodle ou API IA externe.
- L'animation doit expliquer un changement metier ; elle ne doit pas etre une decoration permanente illisible.
- Verifier `npm run build` apres chaque lot significatif.

## 1. Etat actuel et diagnostic

### Ce qui existe deja

Le projet actuel est une application React/Vite avec React Router, Framer Motion, Lucide React, Sonner et une couche `mockService`. Il contient notamment :

- une landing publique qui doit etre remplacee par un selecteur d'acteur ;
- un espace porteur autour de Marie N. et AgroFresh Cameroun ;
- une page de parcours ;
- un catalogue de formations ;
- une banque de projets ;
- une vue conseiller simplifiee ;
- une vue direction simplifiee ;
- `src/data/demoUniverse.js` pour l'univers de demonstration ;
- `src/services/mockService.js` pour les acces de donnees simules ;
- `src/hooks/usePnpeResource.js` pour les etats de chargement/erreur ;
- `src/components/ui.jsx`, `AsyncState.jsx` et un CSS global important.

### Diagnostic sans complaisance

Le livrable actuel est un socle technique et un vertical slice incomplet, estime a environ **15 %** de la cible. Il ne doit pas etre traite comme une version finale.

Ecarts bloquants :

1. L'ouverture ne propose pas le choix d'acteur.
2. Le porteur arrive trop vite dans un dashboard et ne vit pas le referencement guide.
3. Le conseiller et la direction ont des tableaux de bord mais pas encore de vrais flux operationnels.
4. L'espace partenaire/financeur est absent.
5. La candidature est reduite a trois champs au lieu d'un dossier structure.
6. Formation, certification, passeport et maturite ne sont pas relies par une interaction demonstrable.
7. Incubation, rendez-vous, actions, financement, post-incubation, communaute et evenements sont absents ou superficiels.
8. Le matching est une carte/toast et non un parcours de sourcing.
9. Le cockpit Direction manque de pipeline, cohortes, territoires, vigilance et impact exploitable.
10. Le design est trop fade : palette peu contrastee, peu d'images, peu de profondeur, cartes abstraites et absence d'incarnation humaine.
11. Les animations existantes sont ponctuelles et ne structurent pas la demonstration.
12. `App.jsx` concentre encore trop de routes et de presentation ; la cible doit separer les espaces et les features.

## 2. References deja auditees

### StarterKITCM

Patterns a conserver : layouts public/auth/prive, parcours comme objet produit, espace beneficiaire, formations, documents, certifications, communaute, evenements, formulaires multi-etapes, donnees centralisees, lazy loading et etats de chargement.

### BSTP-Project

Patterns a reprendre en les verticalisant PNPE :

- layouts par role : `PrivateLayoutPME`, `PrivateLayoutAgent`, `PrivateLayoutDO`, `PrivateLayoutDG` ;
- dashboard oriente decision ;
- `KpiCard`, pipeline, badges de confiance, passeport, progression academy, radar de maturite, feed d'opportunites ;
- observatoire avec KPI, pipeline, capital humain, secteurs, regions et vigilance ;
- annuaire et sourcing donneur d'ordre ;
- matching explicable ;
- service IA avec gateway, provider mock et fallback ;
- apparitions Framer Motion, toasts, upload, cartes d'alerte et progressions.

Assets exploitables a copier localement dans `PNPE-Project/public/assets/` sans importer le code BSTP :

- `african-woman-manager-looking-camera-smiling-holding-clipboard-while-diverse-coworkers-talking-background.jpg` ;
- `employees-explaining-business.jpg` et `employees-explaining-business2.jpg` ;
- `training.jpg` a `training7.jpg` ;
- `university-students-learning-accounting-principles-financial-analysis.jpg` ;
- `hero.jpg`, `design.png`, `background-design.png`, `bubble.jpg` ;
- logos et visuels institutionnels si leur usage est pertinent.

Ne pas copier l'esthetique indigo BSTP telle quelle. Ne pas copier les donnees BSTP ni le modele PME deja constitue.

## 3. Produit a construire

### Positionnement

**PNPEKIT — Le parcours entrepreneurial numerique de la PNPE d'Edea, de l'idee a l'entreprise.**

La plateforme coordonne :

```text
IDEe → REFERENCEMENT → DIAGNOSTIC → FORMATION → CERTIFICATION
→ INCUBATION → ACCOMPAGNEMENT → MATURITE → FINANCEMENT
→ BANQUE DE PROJETS → OPPORTUNITES → CROISSANCE → ALUMNI
```

### Acteurs

| Acteur | Question principale | Entree attendue |
| --- | --- | --- |
| Porteur de projet | Ou en est mon projet et quelle est ma prochaine etape ? | Referencement guide puis cockpit |
| Conseiller PNPE | Qui dois-je accompagner aujourd'hui et sur quoi ? | File de travail priorisee |
| Partenaire / financeur | Quels projets structures correspondent a mon besoin ? | Sourcing, filtres, matching |
| Direction PNPE | Quel impact produit la PNPE ? | Observatoire et cockpit d'impact |

## 4. Premiere experience : Role Selector

La route `/` ne doit plus etre une landing marketing. Elle devient le **PNPE Control Room / selecteur d'acteur**.

### Ecran

- marque PNPEKIT et mention « Prototype de demonstration » ;
- titre : « Choisissez une perspective pour explorer la plateforme » ;
- quatre cartes d'acteur, chacune avec image locale, mission, indicateurs et action ;
- un bouton `Lancer la visite guidee` ;
- acces secondaire a la documentation de demonstration ;
- transition Framer Motion de la carte selectionnee vers l'espace choisi.

### Cartes

1. **Porteur de projet** — « Je veux structurer mon idee » → `/porteur/referencement`.
2. **Conseiller PNPE** — « J'accompagne les porteurs au quotidien » → `/conseiller`.
3. **Partenaire / financeur** — « Je cherche des projets qualifies » → `/partenaire`.
4. **Direction PNPE** — « Je pilote l'impact de la PNPE » → `/direction`.

La premiere entree porteur doit toujours ouvrir le referencement. Un controle discret `Revoir le cockpit de Marie` peut permettre au presentateur de sauter directement au dashboard apres le premier passage.

## 5. Referencement guide du porteur

Route cible : `/porteur/referencement`.

Ce parcours est la porte d'entree principale. Il doit etre chaleureux, explicite et accessible a une personne peu technophile.

### Principes UX

- une question principale par ecran ou un petit groupe tres court ;
- progression persistante `Etape X sur 5` ;
- temps estime et sauvegarde automatique simulee ;
- vocabulaire simple, exemples camerounais et aide PNPE visible ;
- tuiles de choix, grands champs, labels visibles, feedback immediate ;
- option `Je ne sais pas encore` ;
- aucun blocage par jargon ou document non disponible ;
- bouton precedent, continuer et quitter/reprendre ;
- assistant PNPE non intrusif : « Pourquoi cette question ? » ;
- mobile prioritaire pour le formulaire.

### Etapes

1. **Bienvenue et identite** : prenom, nom, telephone, ville, photo facultative.
2. **Idee ou activite** : nom du projet, secteur, probleme auquel il repond.
3. **Niveau d'avancement** : idee, concept, prototype, premieres ventes, activite lancee.
4. **Besoins immediats** : formation, accompagnement, equipement, financement, formalites, reseau.
5. **Resume et orientation** : recapitulatif, diagnostic initial, prochaine etape proposee, creation du cockpit.

### Moment WOW

A la validation : animation de progression du profil, confirmation « Votre parcours PNPE est pret », apparition d'une carte de parcours personnalisee, puis transition vers le dashboard porteur. L'univers de demo devient Marie N. / AgroFresh Cameroun avec les valeurs de reference.

## 6. Dashboard porteur guide

Route : `/porteur`.

Le dashboard doit repondre en moins de dix secondes : **ou suis-je, pourquoi, et que dois-je faire maintenant ?**

Ordre de lecture :

1. accueil humain et etape actuelle ;
2. prochaine action dominante ;
3. bandeau de parcours ;
4. conseiller referent et aide ;
5. formation recommandee ;
6. rendez-vous et notifications ;
7. opportunite expliquee ;
8. preuves du passeport et impact.

Composants requis : `JourneyStrip`, `NextBestAction`, `AdvisorPresence`, `MaturitySummary`, `CourseProgress`, `OpportunityCard`, `AppointmentCard`, `NotificationCenter`, `HelpAssistant`.

Donnees Marie : AgroFresh Cameroun, Edéa/Littoral, maturite 78/100, etape 5/8 validation marche, Business Model Canvas 82 %, 4 formations terminees, 3 certificats, besoin financement + equipement, 15 000 000 FCFA, 12 emplois potentiels, matching 94 %.

## 7. Espaces a implementer

### Porteur

Routes minimales :

```text
/porteur/referencement
/porteur
/porteur/parcours
/porteur/passeport
/porteur/formations
/porteur/formations/:id
/porteur/incubation
/porteur/actions
/porteur/rendez-vous
/porteur/opportunites
/porteur/financement
/porteur/documents
/porteur/communaute
/porteur/evenements
/porteur/alumni
```

Le passeport doit rassembler identite, projet, score, axes, formations, certificats, documents, accompagnement, historique, preuves et prochaines etapes.

### Conseiller PNPE

Routes minimales :

```text
/conseiller
/conseiller/porteurs
/conseiller/porteurs/:id
/conseiller/candidatures
/conseiller/actions
/conseiller/rendez-vous
/conseiller/formations
/conseiller/alertes
```

Le dossier detaille doit repondre : ou en est la personne, quel est son probleme, quelle preuve manque, quelle action vient ensuite, depuis combien de temps elle est bloquee.

### Partenaire / financeur

Routes minimales :

```text
/partenaire
/partenaire/projets
/partenaire/projets/:id
/partenaire/matching
/partenaire/opportunites
/partenaire/mises-en-relation
```

La banque de projets n'est pas une simple liste. Chaque carte doit afficher visuel, secteur, ville, maturite, statut propose, preuves, besoin, montant, emplois, certifications et score de correspondance. Les filtres minimum sont secteur, territoire, maturite, formation, statut, besoin et montant.

### Direction

Routes minimales :

```text
/direction
/direction/pipeline
/direction/cohortes
/direction/secteurs
/direction/territoires
/direction/impact
/direction/vigilance
```

KPI de demonstration : 1 248 porteurs accompagnes, 186 projets en incubation, 92 % completions formation, 74 projets finances, 1 460 emplois generes. Toujours afficher `Donnees de demonstration`.

## 8. Formation : chaine complete

Le catalogue doit montrer la relation PNPEKIT → Moodle, sans reproduire Moodle.

```text
Decouverte → Inscription → Eligibilite → Paiement simule si necessaire
→ Campus Moodle → Progression → Evaluation → Certificat
→ Passeport → Evolution de maturite
```

Chaque formation affiche titre, categorie, niveau, duree, formateur, format, prix, apprenants, progression, certificat et recommandation. Prevoir gratuit/payant, detail de cours, modules, evaluation, certificat avec identifiant et QR simule.

Moment WOW : terminer `Construire un Business Model viable` fait passer la progression a 100 %, affiche le certificat, ajoute la preuve au passeport et anime la hausse du score avec explication.

## 9. Incubation, financement et impact

### Incubation

Roadmap : diagnostic, business model, prototype, validation marche, commercialisation, financement, croissance. Ajouter mentor, actions avec echeance, rendez-vous et historique.

### Financement

```text
Diagnostic → Qualification → Preparation → Recherche
→ Candidature → Decision → Financement → Suivi
```

Afficher checklist Business Plan, previsions, documents, pitch, diagnostic et score de preparation. Les statuts sont des propositions UX.

### Post-incubation

Vue `Apres PNPE` : entreprise creee, chiffre d'affaires, emplois, clients, investissements, nouveaux besoins, opportunites et statut Alumni PNPE.

## 10. Direction artistique et assets

La direction doit etre **premium, humaine, institutionnelle, technologique et africaine contemporaine**, avec davantage d'energie que l'actuelle interface vert/gris.

Palette recommandee :

- encre anthracite pour le texte ;
- ivoire/champagne clair pour les surfaces ;
- vert foret pour la confiance ;
- jaune solaire/ocre pour les milestones et opportunites ;
- corail pour les actions et alertes ;
- bleu lagon pour la formation et le numerique ;
- touches de rouge controle pour les blocages.

Ne pas mettre des gradients partout, ne pas utiliser de blobs decoratifs, ne pas transformer chaque section en carte flottante. Utiliser des sections non encadrees et des cartes uniquement pour des objets metier.

Copier les assets BSTP utiles dans `PNPE-Project/public/assets/` avec des noms ASCII propres. Les images doivent servir a identifier l'acteur, la formation, l'equipe, le projet ou l'action ; ne pas utiliser d'images lointaines ou purement decoratives.

## 11. Animation system

Dependance principale : Framer Motion deja presente. Ajouter seulement les primitives necessaires de type Radix/shadcn : Dialog, Sheet, Tabs, Tooltip, Dropdown, Popover, Command. Utiliser Sonner, Recharts et Lucide deja adoptes. React Hook Form/Zod/Zustand peuvent etre ajoutes si absents et justifies.

### Regles

- animation d'entree progressive par section ;
- layout transitions entre etapes et statuts ;
- compteurs et scores animes ;
- pipeline qui se dessine ;
- progression de formation et certificat ;
- matching qui trie les resultats avec justification ;
- drawers et sheets pour detail sans perdre le contexte ;
- hover avec elevation, image et action visible ;
- feedback toast + etat visuel persistant ;
- `prefers-reduced-motion` respecte.

Chaque motion doit etre liee a un evenement : selection d'acteur, sauvegarde, validation, soumission, certification, action conseiller, matching, financement ou franchissement de jalon.

## 12. Architecture technique cible

```text
src/
├── app/                 # routes, providers, session demo
├── layouts/             # role-selector, porteur, conseiller, partenaire, direction
├── pages/               # pages par espace
├── features/            # onboarding, formation, incubation, sourcing, impact
├── components/ui/       # primitives accessibles inspirees de shadcn
├── components/domain/   # Journey, Passport, Maturity, Matching, etc.
├── data/                # univers de demonstration et taxonomies
├── mocks/               # fixtures et adapters deterministes
├── services/            # contrats et MockService/API adapter futur
├── stores/              # session, parcours, scenario
├── hooks/               # orchestration UI
├── ai/                  # AI Gateway, mock provider, types normalises
├── lib/                 # formatters, routing, a11y
└── styles/              # tokens et styles globaux
```

Contrats minimum :

```js
getBeneficiary(id)
getProject(id)
getJourney(id)
getCourses(filters)
getTrainingProgress(beneficiaryId)
getOpportunities(filters)
getAdvisorQueue()
getAdvisorCase(id)
getPartnerProjects(filters)
getDashboardMetrics(period)
getImpactSnapshot(filters)
submitApplication(payload)
completeTraining(courseId)
advanceJourney(stageId)
requestMatch(criteria)
```

Les pages ne doivent pas contenir de gros objets mockes locaux. Tous les changements du mode demonstration passent par un store et des services.

## 13. Mode de demonstration deterministe

Prevoir une barre ou un menu discret `Mode demonstration` avec :

- reset de la session ;
- choix de l'acteur ;
- `Scene suivante` ;
- retour a l'accueil des acteurs ;
- indication de la scene courante.

Scenario canonique :

```text
1. Choisir Porteur
2. Referencer Marie / AgroFresh
3. Voir diagnostic initial
4. Ouvrir le cockpit porteur
5. Terminer une formation
6. Voir certificat et maturite evoluer
7. Ouvrir incubation et action conseiller
8. Passer en vue partenaire
9. Rechercher Agro-industrie + Littoral + maturite > 70
10. Ouvrir AgroFresh et demander une mise en relation
11. Passer en Direction
12. Lire pipeline et impact consolides
```

Le scenario doit etre rejouable et ne doit dependre d'aucun appel reseau.

## 14. Qualite et verification

Pour chaque lot :

- `npm run build` ;
- verifier les routes principales ;
- verifier les clics du scenario ;
- tester desktop large, tablette et mobile ;
- tester clavier, focus, labels, contraste et `prefers-reduced-motion` ;
- tester loading, empty, error, pending, completed, blocked et verified ;
- verifier qu'aucune image externe obligatoire ne casse la demo ;
- verifier que les donnees Marie/AgroFresh sont identiques partout.

### Criteres de sortie

Le prototype est presentable lorsque :

1. l'ouverture permet de choisir un acteur ;
2. le porteur entre par un referencement guide ;
3. le dashboard explique toujours la prochaine action ;
4. conseiller, partenaire et direction ont des espaces distincts et utiles ;
5. la formation produit un certificat, une preuve et une evolution de parcours ;
6. le partenaire peut trouver AgroFresh avec des filtres et un matching explique ;
7. la direction peut lire le pipeline et l'impact ;
8. la visite guidee est rejouable ;
9. l'interface est visuellement vivante mais lisible ;
10. le build est propre et la demo fonctionne hors backend.

## 15. Ordre d'implementation immediat

### Lot 1 — Entree et fondations

- installer/verifier les dependances utiles ;
- creer `DemoSessionStore` ;
- refondre tokens CSS et navigation ;
- copier assets locaux ;
- creer Role Selector et layouts par role.

### Lot 2 — Vertical slice prioritaire

- creer `RegistrationWizard` complet ;
- relier soumission au store ;
- creer transition de succes ;
- refondre cockpit porteur avec guidance ;
- ajouter JourneyStrip, NextBestAction, AdvisorPresence et HelpAssistant.

### Lot 3 — Preuves metier

- formation detail/progression/evaluation/certificat ;
- passeport mis a jour ;
- score de maturite explicable et anime ;
- incubation, action et financement.

### Lot 4 — Acteurs ecosysteme

- conseiller et dossier detaille ;
- partenaire, banque de projets, filtres, matching et mise en relation ;
- direction, observatoire, pipeline, territoires, cohortes et impact.

### Lot 5 — Presentation et QA

- mode visite guidee ;
- transitions et moments WOW ;
- responsive et accessibilite ;
- build, screenshots et correction des regressions ;
- mise a jour de `PNPE-README.md`.

## 16. Instruction finale au prochain contexte

Ne pas repondre par un nouveau plan abstrait. Apres lecture de ce document, inspecter l'etat reel du projet, installer uniquement les dependances justifiees, puis implementer directement le **Lot 1** et le debut du **Lot 2**.

Commencer par le chemin visible :

```text
Role Selector → Porteur de projet → Referencement guide → Confirmation → Dashboard guide
```

Ensuite continuer sans attendre une validation intermediaire pour chaque detail. Garder les hypothèses metier explicites dans la documentation et executer le build apres chaque lot.
