# PNPEKIT — Analyse d'écosystème et architecture cible

> Phase 0 du prototype indépendant PNPE-Project.
>
> Référence métier prioritaire : `PNPE-Project/docs/PNPE-specs.md`.
>
> Tous les chiffres, scores, statuts et parcours du prototype sont des données de démonstration. Les règles de calcul proposées ne constituent pas des procédures officielles de la PNPE.

## 1. Conclusion exécutive

La valeur du futur prototype ne doit pas venir du nombre d'écrans, mais de la continuité perceptible entre les missions de la PNPE : accueillir un porteur, qualifier son potentiel, le former, l'incuber, l'accompagner, structurer son projet, l'orienter vers une opportunité et mesurer les résultats.

StarterKITCM fournit la base d'un portail entrepreneurial : pages publiques, authentification progressive, espace bénéficiaire, parcours, formations, documents, certifications et communauté. BSTP-Project renforce cette base avec une architecture par rôles, des espaces opérationnels distincts, un cockpit de direction, des données d'observatoire, des composants de passeport/maturité et une passerelle IA avec fallback.

PNPEKIT doit conserver ces fondations, mais changer le centre de gravité produit : le bénéficiaire n'est pas une PME déjà qualifiée et la finalité n'est pas la mise en relation avec des donneurs d'ordre. Le modèle PNPE part du porteur et de son idée, puis rend visible la transformation progressive vers un projet mature, une entreprise et un impact mesurable.

## 2. Référentiel métier PNPE

### 2.1 Vision à matérialiser

**De l'idée à l'entreprise, la PNPE accompagne, structure, forme, finance et fait grandir.**

Parcours narratif cible :

```text
Idée → Candidature → Évaluation → Sélection → Formation → Incubation
→ Prototypage → Accompagnement → Validation → Financement → Lancement
→ Suivi → Croissance → Alumni
```

La plateforme doit montrer que la PNPE ne digitalise pas seulement ses formulaires : elle centralise les signaux de progression et coordonne les interventions humaines et numériques.

### 2.2 Missions traduites en capacités numériques

| Mission PNPE | Capacité proposée | Preuve de démonstration |
| --- | --- | --- |
| Accueil et orientation | Programmes publics, orientation initiale, CTA de candidature | Le visiteur comprend où commencer |
| Identification du potentiel | Profil promoteur/projet, auto-évaluation, diagnostic | Un dossier produit un profil synthétique |
| Formation | Catalogue, inscription, progression, évaluation, certification | La formation alimente le passeport |
| Incubation et pépinière | Roadmap, jalons, actions, rendez-vous, mentors | L'agent sait quelle action vient ensuite |
| Faisabilité et soutien technique | Axes de maturité, pièces, évaluations, recommandations | Le score est explicable, jamais magique |
| Formalités de création | Checklist et orientation vers le Centre des Formalités | La formalisation devient une étape |
| Opportunités et réseautage | Banque de projets, opportunités, matching justifié | Un partenaire trouve un projet pertinent |
| Suivi post-incubation | Indicateurs, emplois, chiffre d'affaires, besoins, alumni | La Direction voit l'impact après la sortie |

### 2.3 Utilisateurs et questions principales

| Espace | Question à résoudre | Action principale |
| --- | --- | --- |
| Public | « La PNPE peut-elle m'aider et comment commencer ? » | Découvrir un programme / candidater |
| Porteur | « Où en est mon projet et quelle est ma prochaine étape ? » | Compléter, apprendre, agir, suivre |
| Conseiller PNPE | « Qui dois-je accompagner aujourd'hui et sur quoi ? » | Prioriser une intervention |
| Direction | « Quel impact réel produit la PNPE ? » | Piloter cohortes, territoires et résultats |
| Partenaire | « Quels projets structurés correspondent à mon besoin ? » | Rechercher, comparer, demander une mise en relation |

## 3. Audit de StarterKITCM

### 3.1 Architecture observée

StarterKITCM est une application React 18 + Vite organisée autour de React Router, de layouts publics/authentifiés/privés, de contextes transverses et de pages par domaine.

Éléments vérifiés :

- `src/App.jsx` centralise routing, lazy loading, `Suspense`, scroll reset et providers ;
- `components/layout/` sépare `PublicLayout`, `AuthLayout` et `PrivateLayout` ;
- `pages/` couvre accueil, authentification, dashboard bénéficiaire, formations, certifications, documents, projets et communauté ;
- `context/` contient auth, langue, thème, événements et parcours ;
- `data/` centralise notamment formations, parcours, partenaires et utilisateur ;
- `components/ui/` fournit Button, Card, Badge, Modal, LoadingSpinner et ErrorBoundary ;
- Framer Motion, Lucide React, React Router et Tailwind forment le socle.

### 3.2 Forces à conserver

1. Les layouts par contexte, qui évitent de mélanger navigation publique et privée.
2. Le parcours comme objet produit via `ParcoursContext`, les pages de parcours et `ParcoursDetail`.
3. Le découpage bénéficiaire : formations, documents, certifications, profil et projets.
4. La séparation initiale des mocks dans `src/data`.
5. Le lazy loading et les états de chargement.
6. Les formulaires multi-étapes, le dépôt de documents et les composants d'événements.
7. La communauté et les événements, cohérents avec réseautage, mutualisation et information.

### 3.3 Limites à corriger pour PNPEKIT

- Le routing est concentré dans un seul `App.jsx` et mélange production et pages de test.
- Le layout privé concentre shell, navigation, responsive et détails de marque dans un fichier très long.
- Le design system repose largement sur des classes globales et des styles hérités.
- La navigation bénéficiaire liste des destinations mais ne rend pas assez visible la prochaine action.
- Des assets distants fragilisent une démonstration sans réseau.
- La frontière entre données, état de session et logique métier doit être explicite.

## 4. Audit de BSTP-Project

### 4.1 Évolution architecturale

BSTP-Project reprend le socle Vite/React Router et ajoute :

- React Query, Zustand, React Hook Form, Zod, Recharts, Sonner et Leaflet ;
- layouts dédiés PME, donneur d'ordre, agent et direction générale ;
- espaces PME, agent, observatoire DG et sourcing donneur d'ordre ;
- stores spécialisés `agentStore`, `annuaireStore`, `authStore`, `dgStore`, `passeportStore` ;
- mocks séparés pour opportunités, tâches, observatoire, formations et donneurs d'ordre ;
- `services/ai/` avec gateway, configuration, fixtures et adaptateur mock.

### 4.2 Patterns qui ont démontré leur efficacité

#### Espaces par rôle

`PrivateLayoutPME`, `PrivateLayoutAgent`, `PrivateLayoutDO` et `PrivateLayoutDG` font correspondre chaque rôle à un vocabulaire et à des priorités propres. Ce pattern est indispensable pour PNPE avec les rôles porteur, conseiller, direction et partenaire.

#### Cockpit orienté décision

`DashboardPME` commence par maturité, passeport et opportunités. `DashboardDG` commence par KPI puis déroule pipeline, capital humain, secteurs, territoires et vigilance. Cette hiérarchie raconte une histoire et sera adaptée au parcours PNPE.

#### Agrégats explicites

`observatoire.mock.js` distingue KPI, séries temporelles, pipeline, capital humain, secteurs, régions et vigilance. Ce modèle est préférable à des calculs dispersés dans les composants.

#### Composants métier nommés

`KpiCard`, `StatusPipeline`, `TrustBadge`, `PasseportSummaryCard`, `AcademyProgressWidget`, `RadarMaturiteIA`, `OpportunityFeed` et `DocumentReviewCard` donnent un vocabulaire lisible à la démonstration.

#### Service IA résilient

`aiGateway.js` fournit un point d'entrée unique, normalise les réponses, gère timeout et retry, puis retombe sur un mock. Le futur `AIService` PNPE reprendra ce principe avec des réponses explicables.

#### Micro-interactions fonctionnelles

Les apparitions progressives, l'upload simulé, les toasts d'export et les panneaux IA servent une action identifiable. PNPEKIT gardera cette discipline et ajoutera les transitions liées aux jalons.

### 4.3 Limites à ne pas reproduire

- Le modèle PME/BSTP part d'une entreprise déjà constituée ; PNPE part du porteur et de l'idée.
- Les dashboards additionnent parfois des modules et donnent une surface fonctionnelle plus large que les flux effectivement reliés.
- Les chiffres fictifs doivent être signalés plus clairement dans PNPEKIT.
- `passeportStore` augmente le score par incrément arbitraire après upload ; PNPE doit relier chaque évolution à une preuve lisible.
- Le mock IA aléatoire convient aux tests mais pas au scénario institutionnel ; le mode démonstration sera déterministe.
- Une carte ne sera utilisée que si elle répond à une question de pilotage.
- L'esthétique SaaS indigo et très cartographique ne doit pas être simplement recolorée.

## 5. Décisions de conception

### 5.1 À conserver

- React + Vite + React Router ;
- layouts par rôle et routes protégées ;
- Tailwind avec tokens PNPE dédiés ;
- Framer Motion pour les transitions signifiantes ;
- Lucide React, Recharts et Sonner ;
- Zustand pour les états de démonstration transverses ;
- une gateway IA abstraite avec provider mock local.

### 5.2 À améliorer

- Faire du dashboard porteur une vue « prochaines actions + progression + preuves ».
- Relier chaque formation à un impact sur passeport et maturité.
- Faire de la Banque de projets une expérience de sourcing : filtres, justificatifs, matching compréhensible et mise en relation.
- Donner au conseiller une file priorisée avec problème, blocage, échéance et prochaine action.
- Prévoir les états loading, empty, error, pending, completed, blocked et verified.
- Transformer les tableaux en cartes utiles sur mobile et prévoir une bottom navigation porteur.
- Ajouter un marquage discret « Données de démonstration » dans les vues de pilotage.

### 5.3 À repenser totalement

- La marque et la palette : éviter la permutation du violet BSTP ; proposer une identité PNPE humaine, institutionnelle et africaine contemporaine.
- Le modèle métier : remplacer PME/contrats par bénéficiaire, projet, parcours, formation, certification, action d'accompagnement, opportunité, dossier de financement et impact.
- La navigation : organiser le produit autour de l'étape du parcours et du rôle.
- La maturité : en faire une proposition UX explicable et versionnée, jamais une norme officielle.
- Le scénario : conserver une histoire reproductible autour de Marie N. et AgroFresh Cameroun.

## 6. Architecture cible PNPE-Project

Le projet reste indépendant. Aucun import de StarterKITCM ou BSTP-Project ne sera utilisé en production et aucun de ces deux projets ne sera modifié.

```text
PNPE-Project/
├── docs/PNPE-specs.md
├── PNPE-ANALYSIS.md
├── PNPE-README.md
├── public/
├── src/
│   ├── app/              # App, routes, providers
│   ├── components/       # UI et composants métier réutilisables
│   ├── layouts/          # public, auth, porteur, conseiller, direction, partenaire
│   ├── pages/            # pages organisées par espace
│   ├── features/         # candidature, formation, incubation, sourcing, impact
│   ├── data/             # univers de démonstration et taxonomies
│   ├── mocks/            # adapters et fixtures déterministes
│   ├── services/         # contrats métier et implémentation mock/API future
│   ├── hooks/            # orchestration UI
│   ├── stores/           # état de scénario et session
│   ├── ai/               # AI Gateway et providers
│   ├── lib/              # formatters, routing, accessibilité
│   └── styles/           # tokens et CSS global
└── package.json
```

### Contrats de service prévus

```text
getBeneficiary(id)
getProject(id)
getJourney(id)
getCourses(filters)
getTrainingProgress(beneficiaryId)
getOpportunities(filters)
getAdvisorQueue()
getDashboardMetrics(period)
getImpactSnapshot(filters)
submitApplication(payload)
completeTraining(courseId)
advanceJourney(stageId)
requestMatch(criteria)
```

Chaque contrat retournera une forme normalisée `{ data, status, error, meta }`. L'adapter mock sera la source par défaut ; un adapter API pourra le remplacer sans modifier les pages.

## 7. Univers de démonstration cohérent

Le fil principal est **Marie N.**, porteuse du projet **AgroFresh Cameroun**, situé à Edéa dans le Littoral.

Valeurs de démonstration communes à tous les écrans :

- maturité globale : `78/100` ;
- étape du parcours : incubation / validation marché ;
- formation principale : Business Model Canvas, `82 %` ;
- formations terminées : `4` ; certificats : `3` ;
- besoin : financement et équipement ;
- montant recherché : `15 000 000 FCFA` ;
- emplois potentiels : `12` ;
- matching principal : `94 %`, avec justification ;
- statut proposé UX : « Prêt pour financement ».

Projets complémentaires : **EcoPack Cameroon**, packaging à Edéa, maturité `86/100`, et **Cameroun Solar Services**, énergie à Kribi, maturité `71/100`. Ils servent au catalogue et au matching, sans être présentés comme des organisations réelles.

## 8. Hypothèses et points à valider

Ces éléments sont des choix de prototype, non des faits institutionnels établis dans la spécification :

1. Les pondérations des axes de maturité et les seuils « mature » / « prêt pour financement ».
2. Les étapes exactes d'admission, les rôles du comité et les délais de traitement.
3. Les formations réellement gratuites ou payantes et les règles d'éligibilité.
4. Le niveau d'intégration technique possible avec Moodle et le mécanisme de retour de certification.
5. Les indicateurs d'impact officiellement suivis par la PNPE et leur définition.
6. Les règles de visibilité et de consentement pour le passeport partageable et la Banque de projets.
7. Les droits d'accès détaillés entre conseiller, direction et partenaire.

En l'absence de décision métier, le prototype affichera ces éléments comme **propositions UX de démonstration** et ne les formulera pas comme des procédures officielles.

## 9. Plan de construction et critères de sortie

1. Fondations, branding, routing, layouts et service layer.
2. Design system : Button, Card, Badge, KPI, progressions, timeline, modal, drawer, toast, skeleton et états.
3. Espace porteur : dashboard, parcours, passeport et actions.
4. Candidature et sélection : programme, stepper, documents, auto-évaluation et timeline.
5. Formation : catalogue, détail, apprentissage, certification et lien Moodle.
6. Incubation, rendez-vous, accompagnement, financement et opportunités.
7. Banque de projets, profil projet, filtres et matching partenaire.
8. Espace conseiller : file opérationnelle et dossier porteur.
9. Cockpit direction : KPI, pipeline, cohortes, secteurs, territoires et impact.
10. Polish, mode démonstration déterministe, responsive et QA.

À chaque étape : `npm run build`, contrôle des routes, vérification des états et contrôle mobile. Le prototype est considéré prêt quand le scénario Marie → formation → maturité → opportunité → catalogue → impact est réalisable sans explication technique et sans appel réseau obligatoire.
