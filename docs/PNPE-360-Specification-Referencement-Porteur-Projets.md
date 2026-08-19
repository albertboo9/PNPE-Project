# PNPE 360 — Spécification UX/UI & fonctionnelle
## Processus d’enrôlement d’un porteur de projet & Référencement des projets

**Document destiné à l’implémentation Front-End du prototype PNPE 360**
**Version : 1.0**  
**Périmètre : Espace Porteur de projet**  
**Nature : Prototype démontrable, sans dépendance à un back-end réel**

---

# 1. Objectif du module

Le module **Référencement** constitue le point d’entrée structurant du parcours d’un porteur de projet dans PNPE 360.

Il ne doit pas être conçu comme un simple formulaire administratif.

Il doit être perçu comme un **parcours d’enrôlement intelligent**, permettant progressivement à la PNPE de :

- connaître le porteur ;
- comprendre son projet ;
- qualifier son niveau d’avancement ;
- identifier ses besoins ;
- apprécier ses capacités et compétences ;
- collecter les justificatifs réellement nécessaires ;
- préparer son accompagnement ;
- orienter le porteur vers les formations pertinentes ;
- préparer son référencement dans la banque de projets ;
- rendre ses projets exploitables pour les dispositifs futurs de financement, d’accompagnement et de mise en relation.

Côté utilisateur, le message doit être :

> **« Je ne remplis pas simplement un formulaire : je construis progressivement mon profil entrepreneurial avec la PNPE. »**

Le parcours doit donc être **progressif, rassurant, lisible, sauvegardable et visuellement valorisant**.

---

# 2. Principes UX fondamentaux

## 2.1. Ne jamais présenter un formulaire administratif géant

Le formulaire est découpé en étapes cohérentes.

Une seule problématique métier doit être traitée à la fois.

Le porteur doit toujours savoir :

1. où il se trouve ;
2. pourquoi l’information est demandée ;
3. ce qu’il doit fournir ;
4. ce qui est obligatoire ;
5. ce qui sera fait de ses données ;
6. combien d’étapes restent à parcourir.

---

## 2.2. Progression persistante

Le wizard doit afficher une timeline horizontale sur desktop et une version compacte sur mobile.

### Parcours cible

1. **Informations personnelles**
2. **Présentation du projet**
3. **Marché & stratégie**
4. **Ressources & compétences**
5. **Besoins & financement**
6. **Documents & justificatifs**
7. **Validation & envoi**

Chaque étape possède :

- un numéro ;
- un libellé court ;
- un état ;
- éventuellement une icône ;
- un indicateur de complétion.

### États

- `locked` — non accessible ;
- `current` — étape actuelle ;
- `completed` — étape terminée ;
- `warning` — étape terminée mais nécessitant une correction ;
- `optional` — étape facultative.

---

# 3. Structure générale de l’écran

Le wizard doit utiliser intelligemment la largeur disponible.

## Desktop

Structure recommandée :

```text
┌───────────────────────────────────────────────────────────────┐
│ PNPE 360                                 Notifications / User │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ← Retour au cockpit                                          │
│                                                               │
│  RÉFÉRENCEMENT                                                │
│  Référencer mon projet                                        │
│  Construisons ensemble votre profil entrepreneurial.          │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                    TIMELINE DU PARCOURS                 │  │
│  │  ●──────○──────○──────○──────○──────○──────○          │  │
│  │  Infos   Projet  Marché  Ressources  Besoins  Docs ... │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌────────────────────┐  ┌────────────────────────────────┐  │
│  │                    │  │                                │  │
│  │  PANNEAU GUIDANCE  │  │        FORMULAIRE              │  │
│  │                    │  │                                │  │
│  │  Illustration       │  │        Champs                  │  │
│  │  Conseil            │  │        Selects                 │  │
│  │  Progression        │  │        Upload                  │  │
│  │                    │  │        Validation               │  │
│  │                    │  │                                │  │
│  └────────────────────┘  └────────────────────────────────┘  │
│                                                               │
│  Enregistrer et quitter             ← Précédente  Suivante → │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

# 4. Panneau de guidance

Le panneau gauche ne doit pas être décoratif uniquement.

Il doit servir à **accompagner psychologiquement et pédagogiquement le porteur**.

Il peut contenir :

- une illustration ;
- une phrase contextualisée ;
- une explication courte ;
- un conseil PNPE ;
- une indication de confidentialité ;
- un CTA vers un conseiller lorsque pertinent.

Exemple :

> **Bienvenue Marie 👋**
>
> Ces informations permettent à la PNPE de mieux comprendre votre parcours et de vous orienter vers les dispositifs les plus adaptés à votre situation.

Bloc secondaire :

> **Conseil PNPE**
>
> Prenez votre temps. Vous pouvez enregistrer votre progression et reprendre votre référencement plus tard.

---

# 5. Règles de sauvegarde

Même dans le prototype, le comportement doit simuler une véritable plateforme.

Le formulaire doit proposer :

> **Enregistrer et quitter**

Le prototype doit conserver l'état dans le navigateur via :

- Zustand ;
- localStorage ;
- ou le mécanisme de persistance déjà utilisé dans le projet.

Au retour :

> **Votre référencement est à 35 %**
>
> Reprendre là où vous vous êtes arrêté.

---

# 6. ÉTAPE 1 — Informations personnelles

## Objectif métier

Identifier correctement le porteur et établir son profil de base.

## Champs

### Identité

- Nom
- Prénom(s)
- Date de naissance
- Genre
- Nationalité
- Type de pièce d'identité
- Numéro de pièce

### Coordonnées

- Téléphone
- Email
- Région
- Département
- Ville
- Commune / arrondissement
- Adresse de résidence

### Situation professionnelle

- Situation actuelle
- Niveau d'études
- Domaine de formation
- Année d'obtention du dernier diplôme
- Années d’expérience entrepreneuriale

### Règles UX

Ne pas afficher tous les champs dans une colonne unique.

Utiliser une grille :

```text
Nom                    Prénom
Date de naissance      Genre
Nationalité            Pièce d'identité
Numéro de pièce        Téléphone
Email                  Adresse
```

Les champs obligatoires doivent être marqués clairement.

---

# 7. ÉTAPE 2 — Présentation du projet

## Objectif métier

Comprendre précisément le projet porté.

## Champs

- Nom du projet
- Secteur d'activité
- Sous-secteur
- Type de projet
- Stade du projet
- Date de démarrage prévue
- Localisation du projet
- Description synthétique
- Problème auquel le projet répond
- Solution proposée
- Objectifs principaux

### Stade du projet

Exemples :

- Idée
- Étude
- Prototype
- Pré-lancement
- Activité démarrée
- Croissance
- Expansion

### Interaction recommandée

Le champ « Stade du projet » doit être présenté sous forme de cartes.

```text
[ 💡 Idée ]
[ 🔎 Étude ]
[ 🛠 Prototype ]
[ 🚀 Pré-lancement ]
[ 🏢 Activité ]
[ 📈 Croissance ]
```

La sélection doit produire une micro-animation.

---

# 8. ÉTAPE 3 — Marché & stratégie

## Objectif métier

Déterminer si le porteur comprend son marché et son positionnement.

## Champs

### Marché cible

- Clients cibles
- Zone géographique
- Segment de marché
- Taille approximative du marché
- Principaux besoins identifiés

### Concurrence

- Principaux concurrents
- Avantage concurrentiel
- Différenciation

### Commercialisation

- Canal de distribution
- Canaux d'acquisition
- Stratégie commerciale
- Prix / modèle économique

### Question qualitative

> **Pourquoi un client choisirait-il votre solution plutôt qu’une autre ?**

Utiliser un textarea avec compteur de caractères.

---

# 9. ÉTAPE 4 — Ressources & compétences

## Objectif métier

Évaluer la capacité opérationnelle du projet.

## Équipe

- Nombre de personnes impliquées
- Fondateur seul / équipe
- Profils disponibles
- Compétences clés
- Besoins en recrutement

### Ressources

- Locaux
- Matériel
- Équipements
- Technologies
- Partenaires existants

### Compétences

Utiliser des tags sélectionnables :

```text
Gestion
Marketing
Finance
Production
Numérique
Commercial
Juridique
RH
Logistique
Technique
```

Le porteur peut ajouter une compétence personnalisée.

---

# 10. ÉTAPE 5 — Besoins & financement

Cette étape doit être particulièrement importante pour la future exploitation du portefeuille PNPE.

## Besoins

Catégories :

- Formation
- Accompagnement
- Financement
- Équipement
- Local
- Ressources humaines
- Expertise technique
- Conseil juridique
- Marketing
- Mise en relation
- Partenariat

Le porteur peut sélectionner plusieurs besoins.

---

## Financement

Champs :

- Montant recherché
- Devise
- Type de financement recherché
- Apport personnel
- Financements déjà obtenus
- Utilisation prévue des fonds

### Types

- Subvention
- Prêt
- Investissement
- Crédit
- Partenariat
- Autre

---

# 11. ÉTAPE 6 — Documents & justificatifs

## Principe essentiel

**Ne pas demander des documents inutilement.**

Le prototype doit démontrer une logique de collecte documentaire intelligente.

Les documents dépendent du profil et du stade du projet.

---

## Exemple

Pour un porteur au stade « Idée » :

```text
Documents recommandés

○ Pièce d'identité
○ Note conceptuelle
○ Business Model Canvas
```

Pour un projet déjà en activité :

```text
Documents requis / recommandés

✓ Pièce d'identité
✓ RCCM
✓ NIU
○ Attestation fiscale
○ Business plan
○ États financiers
```

---

## Upload UX

Utiliser une zone moderne :

```text
┌─────────────────────────────────────┐
│                                     │
│            ↑                        │
│      Déposez votre fichier          │
│                                     │
│   ou cliquez pour sélectionner      │
│                                     │
│   PDF, JPG, PNG · Max 10 Mo         │
│                                     │
└─────────────────────────────────────┘
```

Après upload :

```text
┌─────────────────────────────────────┐
│ 📄 Business-plan.pdf                │
│ 2.4 MB                              │
│                                     │
│ ███████████████░░░  Analyse...      │
└─────────────────────────────────────┘
```

Puis :

```text
✓ Document reçu

Analyse documentaire simulée
Document exploitable pour le dossier
```

Le prototype peut simuler l'OCR/IA.

**Aucune fausse promesse ne doit être présentée comme une validation juridique réelle.**

---

# 12. ÉTAPE 7 — Validation & envoi

Cette étape est une synthèse complète.

Afficher :

### Identité

> Marie Ndomo  
> Édéa · Littoral · Cameroun

### Projet

> AgroFresh Cameroun

### Stade

> Activité démarrée

### Besoin

> Financement · 15 000 000 FCFA

### Documents

> 4 / 5 documents fournis

### Profil

> Complétion : 86 %

---

## Checklist finale

```text
✓ Informations personnelles
✓ Présentation du projet
✓ Marché & stratégie
✓ Ressources
✓ Besoins
⚠ 1 document recommandé manquant
```

CTA principal :

> **Soumettre mon référencement**

CTA secondaire :

> Modifier mon dossier

---

# 13. Écran de confirmation

Après soumission :

```text
             ✓

      Référencement envoyé

Votre dossier a bien été transmis
à la PNPE.

Prochaine étape :
Analyse de votre dossier

┌───────────────────────────────┐
│ ✓ Dossier reçu                │
│ ○ Analyse administrative      │
│ ○ Diagnostic                  │
│ ○ Accompagnement              │
│ ○ Référencement               │
└───────────────────────────────┘
```

CTA :

> **Voir mon parcours**

---

# 14. Page « Mes projets »

Une fois le porteur enrôlé, il doit disposer d'un espace permettant de gérer **plusieurs projets**.

Il ne faut donc pas confondre :

- le **profil du porteur** ;
- le **projet** ;
- le **dossier d'accompagnement**.

Un porteur peut avoir plusieurs projets.

---

# 15. Architecture de la page

Route recommandée :

```text
/porteur/projets
```

Titre :

> **Mes projets**

Sous-titre :

> Retrouvez vos projets accompagnés, en préparation ou soumis à la PNPE.

CTA :

> **+ Référencer un nouveau projet**

---

# 16. Header de la page

```text
Mes projets                              [+ Référencer un projet]

Gérez votre portefeuille de projets
et suivez leur évolution avec la PNPE.
```

Afficher quatre KPI :

```text
03
Projets référencés

01
En accompagnement

01
Opportunité active

01
Projet terminé
```

---

# 17. Filtres

Utiliser des filtres simples :

```text
[ Tous ] [ En préparation ] [ En accompagnement ]
[ En recherche de financement ] [ Opportunités ] [ Terminés ]
```

Ajouter :

- recherche ;
- secteur ;
- localisation ;
- statut.

---

# 18. Cartes projet

Chaque projet est présenté sous forme de carte premium.

Exemple :

```text
┌─────────────────────────────────────────────────┐
│ AGROFRESH CAMEROUN              ● En accompagnement
│                                                 │
│ Agro-industrie · Édéa                          │
│                                                 │
│ Transformation et valorisation de produits     │
│ agricoles locaux.                              │
│                                                 │
│ Maturité              Référencement             │
│ ████████████░ 78/100   ✓ Référencé             │
│                                                 │
│ Financement recherché                           │
│ 15 000 000 FCFA                                 │
│                                                 │
│ [Voir le projet →]                              │
└─────────────────────────────────────────────────┘
```

---

# 19. Statuts projet

Utiliser une sémantique cohérente.

### Brouillon

Gris

> Le projet n'est pas encore soumis.

### Soumis

Bleu

> Le projet est en cours d'analyse.

### En accompagnement

Vert

> Un parcours PNPE est actif.

### Financement recherché

Jaune / orange

> Le projet recherche des ressources financières.

### Opportunité

Vert + accent

> Une opportunité de mise en relation est disponible.

### Terminé

Vert profond

> Le cycle d'accompagnement est terminé.

### À compléter

Orange

> Une action du porteur est nécessaire.

---

# 20. Vue détaillée d'un projet

Route :

```text
/porteur/projets/:projectId
```

La page doit présenter un véritable **Project Cockpit**.

## Header

```text
← Mes projets

AGROFRESH CAMEROUN
Agro-industrie · Édéa

● En accompagnement

[Modifier] [Partager]
```

---

# 21. Timeline du projet

Afficher :

```text
Référencement
      ↓
Diagnostic
      ↓
Formation
      ↓
Accompagnement
      ↓
Financement
      ↓
Mise en relation
      ↓
Suivi
```

Chaque étape possède :

- statut ;
- date ;
- description ;
- action.

---

# 22. Score du projet

Afficher :

```text
Maturité du projet

78 / 100

████████████████░░░░

+12 depuis le dernier diagnostic
```

Ajouter un radar de maturité :

- stratégie ;
- marché ;
- gestion ;
- finance ;
- ressources ;
- formalisation.

---

# 23. Formations recommandées

Le projet doit être capable d'afficher :

> **Formations recommandées pour votre projet**

Exemple :

```text
[Formation]
Construire son business plan

Pertinence
92 %

[Commencer]
```

Autres :

- Gestion financière ;
- Marketing ;
- Formalisation ;
- Gestion opérationnelle ;
- Accès au financement.

Cette section doit créer une connexion visuelle entre **diagnostic → formation → progression**.

---

# 24. Opportunités

Afficher :

> **Opportunités compatibles**

Exemple :

```text
Programme de financement PME
Pertinence : 94 %

15 M FCFA maximum
Date limite : 30 septembre

[Voir l'opportunité]
```

---

# 25. Documents du projet

Afficher les documents associés au projet séparément du profil personnel.

```text
Documents du projet

✓ Business Plan
✓ Présentation projet
✓ Étude de marché
○ Prévisionnel financier
```

---

# 26. Actions principales

Selon le statut :

### Projet brouillon

> Continuer le référencement

### Projet soumis

> Voir l'état du dossier

### Projet accompagné

> Voir mon parcours

### Projet incomplet

> Compléter mon dossier

### Projet mature

> Découvrir les opportunités

---

# 27. Architecture de données simulée

Le prototype doit séparer conceptuellement :

```js
beneficiary
```

et :

```js
projects[]
```

Exemple :

```js
const beneficiary = {
  id: "BEN-001",
  firstName: "Marie",
  lastName: "Ndomo",
  city: "Edéa",
  profileCompletion: 86
};
```

Puis :

```js
const projects = [
  {
    id: "PROJ-001",
    name: "AgroFresh Cameroun",
    sector: "Agro-industrie",
    location: "Edéa",
    status: "accompagnement",
    maturity: 78,
    fundingNeed: 15000000
  }
];
```

Cette séparation est importante pour permettre au prototype d'évoluer ultérieurement vers un véritable système métier.

---

# 28. Micro-interactions obligatoires

Le wizard doit être vivant mais professionnel.

## Transition d'étape

Utiliser Framer Motion :

- fade ;
- légère translation horizontale ;
- durée courte ;
- aucun effet excessif.

## Validation

Lorsqu'une étape est complétée :

```text
✓ Étape terminée
```

Animation du node dans le stepper.

## Upload

Animation :

```text
Upload
↓
Analyse
↓
Validation
```

## Score

Le score doit s'animer lors d'une modification.

Exemple :

```text
62 → 78
```

avec compteur animé.

---

# 29. Responsive

## Desktop

- sidebar persistante ;
- stepper horizontal ;
- panneau guidance ;
- formulaire central.

## Tablet

- sidebar compacte ;
- stepper simplifié ;
- panneau guidance réduit.

## Mobile

Le wizard devient :

```text
Étape 3 sur 7

Étude de marché & stratégie
```

avec :

```text
━━━━━━━━━━━━━━░░░░
43 %
```

Le panneau guidance passe au-dessus du formulaire sous forme de bloc compact.

Navigation :

```text
← Précédente          Suivante →
```

Les actions doivent rester facilement accessibles au pouce.

---

# 30. Design system

Le module doit respecter le design system PNPE déjà établi.

## Couleur primaire

```text
#10B981
```

## Vert profond

```text
#065F46
```

## Bleu information

```text
#2563EB
```

## Jaune opportunité

```text
#FACC15
```

## Orange attention

```text
#F97316
```

## Rouge risque

```text
#EF4444
```

## Background

```text
#F8FAFC
```

## Cards

```text
#FFFFFF
```

## Texte principal

```text
#0F172A
```

---

# 31. Composants à privilégier

Réutiliser les composants existants du projet lorsque possible.

Créer ou factoriser :

```text
Wizard
WizardStep
WizardProgress
FormField
SelectField
TextareaField
ChoiceCard
TagSelector
DocumentUpload
DocumentCard
DocumentStatus
GuidancePanel
SaveProgressButton
ProjectCard
ProjectStatus
ProjectTimeline
MaturityCard
OpportunityCard
FormationRecommendation
```

---

# 32. Bibliothèques

Utiliser intelligemment l'écosystème React existant.

### Formulaires

- React Hook Form
- Zod

### Animation

- Framer Motion

### Icônes

- Lucide React

### Graphiques

- Recharts

### Notifications

- Sonner

### État

- Zustand

### Upload

Utiliser une solution React adaptée au drag & drop si elle est déjà présente dans le projet ; sinon privilégier une implémentation légère plutôt que d'ajouter inutilement une dépendance.

---

# 33. Validation

Chaque étape doit être validée avant passage à l'étape suivante lorsque les champs obligatoires sont incomplets.

Exemple :

```text
Impossible de continuer.

Il manque 2 informations obligatoires :
• Numéro de téléphone
• Ville de résidence
```

Le message doit être explicite et directement actionnable.

---

# 34. Accessibilité

Le prototype doit respecter :

- labels explicites ;
- navigation clavier ;
- focus visible ;
- `aria-label` lorsque nécessaire ;
- contraste suffisant ;
- messages d'erreur lisibles ;
- zones d'upload accessibles au clavier ;
- boutons avec intitulés explicites.

La couleur ne doit jamais être l'unique signal d'un état.

---

# 35. Ce que le prototype doit raconter aux dirigeants PNPE

Le démonstrateur doit permettre de comprendre immédiatement la logique suivante :

```text
PORTEUR
   │
   ▼
ENRÔLEMENT
   │
   ▼
QUALIFICATION
   │
   ▼
DIAGNOSTIC
   │
   ▼
FORMATION
   │
   ▼
ACCOMPAGNEMENT
   │
   ▼
PROJET RÉFÉRENCÉ
   │
   ▼
OPPORTUNITÉS
   │
   ▼
FINANCEMENT / PARTENARIAT
   │
   ▼
SUIVI & IMPACT
```

Le wizard n'est donc que **la première étape d'une chaîne numérique complète**.

---

# 36. Scénario de démonstration recommandé

Pour une présentation devant les dirigeants :

### 1. Connexion

Entrer dans l'espace porteur.

### 2. Cockpit

Montrer :

> Profil complété à 35 %

Puis :

> **Référencer un nouveau projet**

### 3. Wizard

Parcourir rapidement :

- identité ;
- projet ;
- marché ;
- ressources ;
- financement ;
- documents.

### 4. Upload

Déposer un Business Plan.

Afficher :

> Analyse documentaire...

Puis :

> ✓ Document reçu

### 5. Validation

Afficher le récapitulatif.

Cliquer :

> **Soumettre mon référencement**

### 6. Projet créé

Arrivée automatique sur :

> **Mes projets**

Le nouveau projet apparaît avec :

- statut ;
- maturité ;
- besoins ;
- prochaines étapes.

### 7. Cockpit projet

Montrer :

- parcours ;
- formations recommandées ;
- opportunités ;
- documents ;
- score.

Le message final doit être évident :

> **La PNPE ne se contente plus d'enregistrer un porteur : elle transforme progressivement son projet en actif entrepreneurial qualifié, accompagné et exploitable par l'écosystème.**

---

# 37. Contraintes d'implémentation

Le prototype doit rester démontrable sans back-end.

Toutes les données peuvent être simulées localement.

Cependant, l'architecture Front-End doit être pensée comme si elle devait être connectée ultérieurement à une API réelle.

Éviter :

```text
fetch() directement dans les composants
```

Préférer une architecture :

```text
UI
 ↓
Hooks
 ↓
Services
 ↓
Mock API / Future API
```

Ainsi le prototype pourra évoluer sans réécriture complète.

---

# 38. Critères d'acceptation

Le module sera considéré comme réussi si :

- le parcours comporte les 7 étapes ;
- la progression est visible ;
- les données sont persistées localement ;
- l'utilisateur peut revenir à une étape précédente ;
- les validations fonctionnent ;
- les documents peuvent être déposés ;
- le traitement documentaire est simulé ;
- le récapitulatif final est complet ;
- la soumission crée un projet simulé ;
- le projet apparaît dans « Mes projets » ;
- plusieurs projets peuvent être affichés ;
- chaque projet possède un statut ;
- la page projet présente son parcours ;
- les formations recommandées sont visibles ;
- les opportunités sont visibles ;
- le responsive est correctement traité ;
- les animations restent fluides ;
- aucune donnée réelle ou promesse d'analyse IA réelle n'est présentée comme garantie.

---

# 39. Directive finale pour l'implémentation

**Ne pas coder ce module comme un simple formulaire CRUD.**

Il doit être conçu comme une **expérience d'enrôlement entrepreneurial premium**, capable de démontrer visuellement et fonctionnellement la vision PNPE.

Chaque écran doit répondre à une question métier :

> **Qui est le porteur ?**

> **Quel est son projet ?**

> **Où en est-il ?**

> **De quoi dispose-t-il ?**

> **De quoi a-t-il besoin ?**

> **Quel accompagnement lui faut-il ?**

> **Quelles formations peuvent le faire progresser ?**

> **Quelles opportunités sont pertinentes pour lui ?**

> **Comment la PNPE peut-elle suivre son évolution ?**

La qualité attendue n'est donc pas uniquement esthétique.

Le prototype doit donner l'impression d'un **véritable produit numérique métier déjà pensé pour une future industrialisation**, tout en restant suffisamment simple, fluide et spectaculaire pour une démonstration.

**Priorité absolue : compréhension métier → fluidité UX → qualité visuelle → micro-interactions → architecture évolutive.**
