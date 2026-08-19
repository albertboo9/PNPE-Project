# PNPEKIT

## Architecture de données du prototype

Les écrans ne doivent pas importer directement les données de démonstration. Le flux cible est :

```text
Feature React
  -> usePnpeResource
  -> pnpeService
  -> mockService aujourd'hui / apiService demain
  -> demoUniverse
```

`pnpeService` est le point de remplacement unique. Les réponses utilisent une enveloppe stable :

```js
{ data, status: 'success', error: null, meta: { demo: true, generatedAt } }
```

Contrats actuellement exposés :

- `getBeneficiary(id)` et `getBeneficiaryWorkspace()`
- `getCourses()` et `getCourse(id)`
- `getProjects()` et `getProject(id)`
- `getOpportunities()` et `getJourney()`
- `getAdvisorQueue()` et `getDashboardMetrics()`
- `completeTraining(courseId)`

Les espaces porteur, formation, projets, conseiller et direction consomment cette couche et affichent des états de chargement et d'erreur. Le cockpit porteur est isolé dans `src/features/beneficiary/` ; les autres vues doivent suivre progressivement cette même organisation.

Prototype de présentation stratégique de la plateforme numérique de la Pépinière Nationale Pilote d'Entreprises d'Edéa.

> **De l'idée à l'entreprise, la PNPE accompagne, structure, forme, finance et fait grandir.**

Les données, scores, statuts et indicateurs visibles dans cette version sont des données de démonstration. Ils ne constituent pas des chiffres officiels ni des procédures validées par la PNPE.

## Vision

PNPEKIT matérialise un parcours entrepreneurial continu :

```text
Idée -> Candidature -> Profilage -> Formation -> Incubation
-> Maturation -> Opportunités -> Financement -> Impact
```

Le prototype montre comment un même système peut relier le porteur, les équipes d'accompagnement, le campus Moodle, les partenaires et la Direction.

## Fonctionnalités démontrées

### Lot 1 · entrée multi-acteurs et référencement

- sélecteur initial des quatre perspectives : porteur, conseiller, partenaire/financeur et direction ;
- session de démonstration locale persistée dans `localStorage`, avec réinitialisation et scène courante ;
- référencement guidé du porteur en cinq étapes, sauvegarde simulée et orientation initiale explicitement marquée comme proposition UX ;
- transition de confirmation vers le cockpit guidé de Marie Ndomo et AgroFresh Cameroun ;
- assets locaux dédiés aux acteurs et au référencement, sans dépendance à une image distante obligatoire ;
- navigation responsive et prise en compte de `prefers-reduced-motion`.

- accueil public et découverte de la promesse PNPE ;
- candidature scénarisée au Programme Accélération PNPE ;
- cockpit de Marie Ndomo et du projet AgroFresh Cameroun ;
- progression du parcours, prochaine action et score de maturité explicable ;
- catalogue de formations gratuites et payantes ;
- progression d'apprentissage, certificats et chaîne PNPE vers Moodle ;
- Banque de projets avec recherche, filtre sectoriel et fiches structurées ;
- demande de mise en relation avec un partenaire ;
- file de travail conseiller avec problèmes, blocages et prochaines actions ;
- cockpit Direction avec KPI, funnel de parcours, secteurs et indicateurs d'impact ;
- notifications/toasts et actions simulées pour soutenir la démonstration.

## Routes principales

| Route | Espace | Rôle dans la démonstration |
| --- | --- | --- |
| `/` | Control Room | Choisir une perspective de démonstration |
| `/porteur/referencement` | Porteur | Réaliser le référencement guidé en cinq étapes |
| `/porteur` | Porteur | Voir l'état du projet et la prochaine action |
| `/porteur/parcours` | Porteur | Lire la feuille de route complète |
| `/porteur/formations` | Porteur | Explorer les formations et le lien Moodle |
| `/projets` | Catalogue | Sourcer des projets accompagnés |
| `/partenaire` | Partenaire | Lire le matching déterministe et expliqué |
| `/partenaire/projets/:id` | Partenaire | Consulter le dossier AgroFresh |
| `/conseiller` | Conseiller | Prioriser les interventions |
| `/direction` | Direction | Lire l'impact consolidé |

## Architecture

Le projet est indépendant de `starterKITCM/` et `BSTP-Project/`. Aucun de ces projets n'est importé ou modifié par l'application PNPE.

```text
PNPE-Project/
├── docs/
│   ├── PNPE-specs.md
│   └── PNPE-ANALYSIS.md
├── src/
│   ├── App.jsx                 # routes, layouts et écrans de démonstration
│   ├── main.jsx                # bootstrap React, Router et Toaster
│   ├── data/demoUniverse.js    # univers de données cohérent
│   ├── services/mockService.js # adapter local et contrats de lecture
│   └── styles/index.css        # tokens, composants et responsive
└── package.json
```

La couche mock retourne une forme normalisée `{ data, status, error, meta }`. Les composants consomment les mêmes entités dans toutes les vues : Marie, AgroFresh, ses formations, ses opportunités et ses indicateurs. Un futur adapter API peut remplacer `mockService` sans déplacer les données dans les composants.

## Technologies

- React 18 et Vite ;
- React Router 6 ;
- Framer Motion pour les apparitions de KPI ;
- Lucide React pour les icônes ;
- Sonner pour les retours d'action ;
- CSS local avec tokens PNPE et media queries dédiées ;
- Recharts est disponible pour les prochaines visualisations plus riches, sans surcharge du premier scénario.

Chaque dépendance a un rôle ciblé. Le prototype n'exige ni backend, ni base de données, ni disponibilité de Moodle, ni clé API IA pour être présenté.

## Lancement

```bash
cd PNPE-Project
npm install
npm run dev
```

Puis ouvrir l'URL indiquée par Vite, habituellement `http://localhost:5173`.

Validation de production :

```bash
npm run build
npm run preview
```

## Scénario de démonstration

1. Depuis `/`, choisir « Porteur de projet » ou cliquer sur `Lancer la visite guidée`.
2. Parcourir le référencement en cinq étapes, puis valider `Créer mon cockpit`.
3. Depuis la confirmation, ouvrir le cockpit de Marie et montrer la prochaine action, la maturité `78/100` et l'étape de validation marché.
4. Ouvrir `/porteur/formations` ou `/porteur/parcours` pour montrer la continuité du parcours.
5. Revenir à `/`, choisir « Partenaire / financeur », puis ouvrir la correspondance AgroFresh et ses preuves.
6. Choisir « Conseiller PNPE » ou « Direction PNPE » pour présenter les espaces réservés à leurs flux opérationnels des prochains lots.
7. Utiliser le contrôle `Mode démo` pour revenir à l'accueil ou réinitialiser la session.

## Résilience et limites

- Toutes les actions sont simulées localement ; aucune candidature, inscription, mise en relation ou export n'est persistant.
- Le lien Moodle est une porte de démonstration vers `campus.studieslearning.com` ; aucune synchronisation réelle n'est implémentée.
- Le score de maturité, les statuts « vérifié » et « prêt pour financement » sont des propositions UX à valider par le métier.
- Le matching affiche une justification fixe issue des données de démonstration ; il ne s'agit pas d'une IA active.
- Les espaces conseiller et direction sont des vues de présentation, sans contrôle d'accès backend.
- La typographie peut utiliser le fallback système si la connexion réseau empêche le chargement de Google Fonts.

## Préparation du futur backend

Les contrats à conserver lors de l'intégration sont notamment :

```text
getBeneficiary(id)
getProject(id)
getJourney(id)
getCourses(filters)
getTrainingProgress(beneficiaryId)
getOpportunities(filters)
getAdvisorQueue()
getDashboardMetrics(period)
requestMatch(criteria)
completeTraining(courseId)
```

La prochaine étape technique sera de remplacer progressivement l'adapter mock par un adapter API, puis de brancher une passerelle Moodle et un `AIService` à provider interchangeable avec fallback local.

## Références de conception

L'audit détaillé, les patterns conservés, les limites identifiées et les hypothèses métier figurent dans [`docs/PNPE-ANALYSIS.md`](docs/PNPE-ANALYSIS.md).
