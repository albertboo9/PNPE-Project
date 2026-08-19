export const demoBeneficiary = {
    id: 'beneficiary-marie', name: 'Marie N.', fullName: 'Marie Ndomo', initials: 'MN', city: 'Edéa', region: 'Littoral',
    projectId: 'project-agrofresh', project: 'AgroFresh Cameroun', sector: 'Agro-industrie', maturity: 78,
    maturityLabel: 'Validation marché', journeyStep: 5, completedCourses: 4, certificates: 3,
    need: 'Financement + équipement', fundingNeed: 15000000, potentialJobs: 12,
};

export const journeyStages = [
    { id: 'orientation', label: 'Orientation', short: 'Orientée' }, { id: 'application', label: 'Candidature', short: 'Candidature' },
    { id: 'profiling', label: 'Profilage', short: 'Profilage' }, { id: 'training', label: 'Formation', short: 'Formation' },
    { id: 'incubation', label: 'Incubation', short: 'Incubation' }, { id: 'maturity', label: 'Maturation', short: 'Maturation' },
    { id: 'opportunities', label: 'Opportunités', short: 'Opportunités' }, { id: 'impact', label: 'Impact', short: 'Impact' },
];

export const beneficiaryJourney = {
    progress: 62,
    currentStageId: 'incubation',
    nextUnlock: 'Accès aux financements et visibilité dans la Banque de projets',
    stages: journeyStages.map((stage, index) => ({
        ...stage,
        state: index < 4 ? 'completed' : index === 4 ? 'current' : 'upcoming',
        date: index < 4 ? ['20 mai', '02 juin', '18 juin', '08 août'][index] : null,
        description: [
            'Vos besoins ont été identifiés avec la PNPE.',
            'Votre dossier de référencement a été validé.',
            'Votre potentiel et vos priorités ont été clarifiés.',
            'Quatre formations et trois preuves renforcent votre dossier.',
            'Testez votre offre auprès de clients et documentez les résultats.',
            'Consolidez le modèle, l’équipe et les prévisions financières.',
            'Accédez aux financements, marchés et partenaires adaptés.',
            'Mesurez les emplois, ventes et effets durables du projet.',
        ][index],
    })),
    currentFocus: {
        title: 'Valider votre marché',
        objective: 'Prouver que des clients réels sont prêts à acheter les produits AgroFresh.',
        advisor: 'Aline Mballa',
        deadline: '28 août 2026',
        completedProofs: ['12 entretiens clients documentés', 'Prototype testé à Edéa', 'Business Model Canvas à 82 %'],
        missingProofs: ['Prévisions financières sur 12 mois', '3 lettres d’intention de distributeurs'],
        actions: [
            { id: 'financials', title: 'Finaliser les prévisions financières', detail: 'Document attendu par votre conseillère', status: 'Prioritaire', route: '/porteur/financement' },
            { id: 'interviews', title: 'Ajouter 3 retours clients', detail: '15 minutes · depuis votre téléphone', status: 'À compléter', route: '/porteur/actions' },
            { id: 'appointment', title: 'Préparer le rendez-vous avec Aline', detail: 'Jeudi 22 août · 10h30', status: 'Planifié', route: '/porteur/rendez-vous' },
        ],
    },
};

export const beneficiaryAdvisor = {
    name: 'Aline Mballa', role: 'Conseillère référente PNPE', initials: 'AM',
    message: 'Votre validation marché avance bien. Concentrons-nous maintenant sur les chiffres et les preuves clients.',
    nextMeeting: 'Jeudi 22 août · 10h30',
};

export const courses = [
    { id: 'canvas', title: 'Construire un Business Model viable', category: 'Entrepreneuriat', instructor: 'Nathalie Mballa', duration: '6 h', level: 'Intermédiaire', format: 'Hybride', price: 0, progress: 82, status: 'En cours', students: 184, rating: 4.9, color: 'forest', image: '/assets/formation-business-model.jpg', recommended: true, certificate: true, description: 'Transformez votre idée en modèle économique testable, rentable et adapté à votre marché.', outcomes: ['Clarifier votre proposition de valeur', 'Identifier vos clients et revenus', 'Construire un Canvas défendable'], modules: ['Comprendre son problème client', 'Dessiner la proposition de valeur', 'Tester revenus et coûts', 'Présenter son Business Model'] },
    { id: 'finance', title: 'Finance pour entrepreneurs', category: 'Finance', instructor: 'Armand Tchana', duration: '4 h 30', level: 'Fondamentaux', format: 'En ligne', price: 25000, progress: 45, status: 'En cours', students: 96, rating: 4.8, color: 'gold', image: '/assets/formation-finance.jpg', certificate: true, description: 'Pilotez votre trésorerie, vos marges et vos besoins de financement avec des outils simples.', outcomes: ['Lire ses flux de trésorerie', 'Calculer marge et seuil de rentabilité', 'Préparer un besoin de financement'], modules: ['Les chiffres essentiels', 'Prix, coûts et marge', 'Trésorerie prévisionnelle', 'Dossier de financement'] },
    { id: 'marketing', title: 'Marketing digital pour vendre local', category: 'Commercial', instructor: 'Sophie Essomba', duration: '5 h', level: 'Fondamentaux', format: 'En ligne', price: 0, progress: 100, status: 'Certifiée', students: 241, rating: 4.9, color: 'terracotta', image: '/assets/formation-marketing.jpg', certificate: true, description: 'Construisez une présence numérique utile et convertissez vos communautés locales en clients.', outcomes: ['Choisir les bons canaux', 'Créer un calendrier éditorial', 'Mesurer les premières ventes'], modules: ['Positionnement de marque', 'Contenus qui engagent', 'WhatsApp Business', 'Mesure et optimisation'] },
    { id: 'packaging', title: 'Packaging et qualité agroalimentaire', category: 'Qualité', instructor: 'Centre de formation PNPE', duration: '3 h', level: 'Avancé', format: 'Présentiel', price: 15000, progress: 0, status: 'Recommandée', students: 72, rating: 4.7, color: 'blue', image: '/assets/formation-qualite.jpg', recommended: true, certificate: true, description: 'Sécurisez vos produits et rendez-les prêts pour les circuits de distribution modernes.', outcomes: ['Choisir un emballage adapté', 'Appliquer les règles d’hygiène', 'Préparer un étiquetage conforme'], modules: ['Fonctions du packaging', 'Hygiène et conservation', 'Étiquetage', 'Contrôle qualité'] },
    { id: 'formalisation', title: 'Formaliser son entreprise au Cameroun', category: 'Formalités', instructor: 'Aline Ngono', duration: '2 h 30', level: 'Débutant', format: 'En ligne', price: 0, progress: 0, status: 'Disponible', students: 328, rating: 4.8, color: 'forest', image: '/assets/formation-formalites.jpg', certificate: true, description: 'Comprenez les choix juridiques, fiscaux et administratifs pour lancer une activité formelle.', outcomes: ['Choisir un statut adapté', 'Préparer les pièces requises', 'Planifier ses premières obligations'], modules: ['Choisir sa forme juridique', 'Constituer son dossier', 'Fiscalité de départ', 'Après la création'] },
    { id: 'vente', title: 'Vendre et négocier avec des acheteurs', category: 'Commercial', instructor: 'Christian Ewane', duration: '4 h', level: 'Intermédiaire', format: 'Hybride', price: 10000, progress: 0, status: 'Disponible', students: 135, rating: 4.6, color: 'terracotta', image: '/assets/formation-numerique.jpg', certificate: true, description: 'Préparez un argumentaire solide, conduisez un rendez-vous et sécurisez vos prochaines ventes.', outcomes: ['Structurer un argumentaire', 'Traiter les objections', 'Conclure et relancer'], modules: ['Comprendre l’acheteur', 'Pitch commercial', 'Négociation', 'Suivi de la relation'] },
    { id: 'production', title: 'Organiser une petite unité de production', category: 'Opérations', instructor: 'Jean-Paul Mbarga', duration: '5 h 30', level: 'Intermédiaire', format: 'Présentiel', price: 20000, progress: 0, status: 'Disponible', students: 81, rating: 4.7, color: 'blue', image: '/assets/formation-production.jpg', certificate: true, description: 'Gagnez en régularité, en qualité et en capacité grâce à une organisation de production simple.', outcomes: ['Cartographier le flux de production', 'Réduire pertes et retards', 'Mettre en place des contrôles'], modules: ['Flux et postes de travail', 'Planification', 'Qualité opérationnelle', 'Amélioration continue'] },
    { id: 'comptabilite', title: 'Comptabilité pratique pour TPE', category: 'Finance', instructor: 'Mireille Talla', duration: '6 h', level: 'Débutant', format: 'En ligne', price: 0, progress: 0, status: 'Disponible', students: 267, rating: 4.8, color: 'gold', image: '/assets/formation-comptabilite.jpg', certificate: true, description: 'Tenez vos données essentielles à jour et transformez-les en décisions de gestion.', outcomes: ['Classer recettes et dépenses', 'Suivre les créances', 'Produire un tableau mensuel'], modules: ['Documents de base', 'Journal recettes-dépenses', 'Suivi clients et fournisseurs', 'Tableau de bord mensuel'] },
];

export const projects = [
    { id: 'project-agrofresh', name: 'AgroFresh Cameroun', owner: 'Marie Ndomo', city: 'Edéa', region: 'Littoral', sector: 'Agro-industrie', maturity: 78, status: 'Prêt pour financement', need: 'Financement + équipement', amount: 15000000, jobs: 12, verified: true, description: 'Transformation de fruits locaux en purées et produits prêts à consommer pour les marchés urbains.' },
    { id: 'project-ecopack', name: 'EcoPack Cameroon', owner: 'Christian Mvondo', city: 'Edéa', region: 'Littoral', sector: 'Packaging', maturity: 86, status: 'Projet vérifié', need: 'Partenaire industriel', amount: 35000000, jobs: 24, verified: true, description: 'Emballages compostables à base de fibres végétales pour les transformateurs locaux.' },
    { id: 'project-solar', name: 'Cameroun Solar Services', owner: 'Aïcha Biyong', city: 'Kribi', region: 'Sud', sector: 'Énergie', maturity: 71, status: 'En incubation', need: 'Accompagnement technique', amount: 9000000, jobs: 8, verified: false, description: 'Solutions solaires modulaires pour les ateliers et petites unités de production.' },
    { id: 'project-cacao', name: 'Cacao Origine Edéa', owner: 'Pauline Etame', city: 'Pouma', region: 'Littoral', sector: 'Agro-industrie', maturity: 64, status: 'Accompagné', need: 'Structuration commerciale', amount: 12000000, jobs: 15, verified: true, description: 'Valorisation de fèves de cacao issues de petits producteurs en produits premium.' },
];

export const opportunities = [
    { id: 'opp-1', type: 'Financement', title: 'Programme d’équipement des unités agroalimentaires', organization: 'PNPE · Édition 2026', deadline: '30 sept. 2026', daysLeft: 42, amount: 'Jusqu’à 20 M FCFA', match: 94, sector: 'Agro-industrie', location: 'Littoral', image: '/assets/formation-production.jpg', effort: 'Dossier presque prêt', reason: 'Votre projet est en validation marché et recherche un équipement de production.', criteria: [{ label: 'Secteur', value: 'Agro-industrie', matched: true }, { label: 'Territoire', value: 'Littoral', matched: true }, { label: 'Maturité', value: '78 / 70 requis', matched: true }, { label: 'Prévisions', value: 'À finaliser', matched: false }] },
    { id: 'opp-2', type: 'Concours', title: 'Challenge innovation et emballage durable', organization: 'Programme régional Littoral', deadline: '12 oct. 2026', daysLeft: 54, amount: 'Prix + mentorat', match: 87, sector: 'Innovation', location: 'Littoral', image: '/assets/formation-qualite.jpg', effort: 'Pitch à préparer', reason: 'Votre besoin de packaging et votre implantation dans le Littoral correspondent.', criteria: [{ label: 'Territoire', value: 'Littoral', matched: true }, { label: 'Innovation', value: 'Transformation locale', matched: true }, { label: 'Pitch', value: 'À préparer', matched: false }] },
    { id: 'opp-3', type: 'Marché', title: 'Rencontre acheteurs · Produits locaux', organization: 'Réseau PNPE', deadline: '18 sept. 2026', daysLeft: 30, amount: 'Mise en relation', match: 81, sector: 'Commercial', location: 'Douala', image: '/assets/partenaire-reunion.jpg', effort: 'Profil prêt', reason: 'Votre projet est prêt à tester ses débouchés auprès de distributeurs.', criteria: [{ label: 'Offre', value: 'Produits locaux', matched: true }, { label: 'Prototype', value: 'Disponible', matched: true }, { label: 'Catalogue', value: 'À compléter', matched: false }] },
    { id: 'opp-4', type: 'Accompagnement', title: 'Bootcamp commercialisation agroalimentaire', organization: 'Centre de formation PNPE', deadline: '05 nov. 2026', daysLeft: 78, amount: 'Accompagnement gratuit', match: 76, sector: 'Agro-industrie', location: 'Edéa', image: '/assets/conseiller-equipe.jpg', effort: 'Éligible', reason: 'Cette préparation répond à votre prochain jalon de commercialisation.', criteria: [{ label: 'Cohorte', value: 'PNPE 2026', matched: true }, { label: 'Étape', value: 'Incubation', matched: true }] },
];

export const advisorQueue = [
    { id: 'case-1', name: 'Marie Ndomo', project: 'AgroFresh Cameroun', sector: 'Agro-industrie', city: 'Edéa', stage: 'Validation marché', issue: 'Préparer le dossier de financement', blocked: 0, next: 'Valider les prévisions financières', priority: 'Aujourd’hui', maturity: 78, avatar: 'MN', proof: 'Prévisions financières', appointment: '10h30', risk: 'medium' },
    { id: 'case-2', name: 'Christian Mvondo', project: 'EcoPack Cameroon', sector: 'Packaging', city: 'Edéa', stage: 'Financement', issue: 'Mise en relation industrielle', blocked: 3, next: 'Partager le dossier projet vérifié', priority: 'À traiter', maturity: 86, avatar: 'CM', proof: 'Lettre d’intention', appointment: '14h00', risk: 'low' },
    { id: 'case-3', name: 'Aïcha Biyong', project: 'Cameroun Solar Services', sector: 'Énergie', city: 'Kribi', stage: 'Prototype', issue: 'Prototypage technique', blocked: 12, next: 'Planifier une session avec l’expert', priority: 'À relancer', maturity: 71, avatar: 'AB', proof: 'Test technique', appointment: 'À planifier', risk: 'high' },
    { id: 'case-4', name: 'Pauline Etame', project: 'Cacao Origine Edéa', sector: 'Agro-industrie', city: 'Pouma', stage: 'Commercialisation', issue: 'Structurer les premiers canaux de vente', blocked: 7, next: 'Relire le plan commercial', priority: 'Cette semaine', maturity: 64, avatar: 'PE', proof: 'Catalogue produits', appointment: 'Vendredi', risk: 'medium' },
];

export const impact = {
    kpis: [
        { label: 'Porteurs accompagnés', value: '1 248', change: '+18,4 %', context: 'vs période précédente', icon: 'users', tone: 'forest' },
        { label: 'Projets en incubation', value: '186', change: '+12', context: 'ce trimestre', icon: 'rocket', tone: 'terracotta' },
        { label: 'Complétion formations', value: '92 %', change: '+6,2 pts', context: 'sur les cohortes actives', icon: 'book', tone: 'gold' },
        { label: 'Emplois potentiels', value: '1 460', change: '+21,8 %', context: 'déclarés par les projets', icon: 'briefcase', tone: 'blue' },
    ],
    stages: [{ label: 'Orientés', value: 1248 }, { label: 'Profilés', value: 964 }, { label: 'En formation', value: 612 }, { label: 'Incubés', value: 186 }, { label: 'Matures', value: 74 }],
    sectors: [{ name: 'Agro-industrie', value: 34 }, { name: 'Numérique', value: 22 }, { name: 'Artisanat', value: 18 }, { name: 'Énergie', value: 14 }, { name: 'Packaging', value: 12 }],
    territories: [{ name: 'Littoral', projects: 486, maturity: 74 }, { name: 'Centre', projects: 278, maturity: 69 }, { name: 'Sud', projects: 194, maturity: 71 }, { name: 'Ouest', projects: 168, maturity: 67 }, { name: 'Autres', projects: 122, maturity: 63 }],
    vigilance: [
        { label: 'Actions en retard', value: 37, context: 'dont 12 depuis plus de 10 jours', tone: 'danger' },
        { label: 'Projets sans activité', value: 18, context: 'aucune preuve depuis 30 jours', tone: 'gold' },
        { label: 'Dossiers incomplets', value: 52, context: 'principalement documents financiers', tone: 'blue' },
    ],
};

export const advisorApplications = [
    { id: 'app-101', name: 'Nadia Bell', project: 'Kmer Bio Savons', sector: 'Cosmétique', city: 'Edéa', completeness: 92, submitted: 'Aujourd’hui · 08h42', status: 'À examiner', missing: 'Aucune pièce critique' },
    { id: 'app-102', name: 'Jean Moukouri', project: 'Littoral Froid', sector: 'Logistique', city: 'Dizangué', completeness: 76, submitted: 'Hier · 16h20', status: 'Incomplet', missing: 'Pièce d’identité' },
    { id: 'app-103', name: 'Ruth Ngo', project: 'Mboa Textile', sector: 'Artisanat', city: 'Pouma', completeness: 84, submitted: '18 août · 11h05', status: 'À orienter', missing: 'Précision sur le besoin' },
    { id: 'app-104', name: 'Samuel Eboa', project: 'Cycle Vert Édéa', sector: 'Économie circulaire', city: 'Edéa', completeness: 100, submitted: '17 août · 14h10', status: 'Éligible', missing: 'Dossier complet' },
];

export const advisorActions = [
    { id: 'act-1', owner: 'Marie Ndomo', project: 'AgroFresh Cameroun', title: 'Valider les prévisions financières', due: 'Aujourd’hui', priority: 'Haute', category: 'Financement' },
    { id: 'act-2', owner: 'Aïcha Biyong', project: 'Cameroun Solar Services', title: 'Programmer la revue du prototype', due: '22 août', priority: 'Haute', category: 'Expertise' },
    { id: 'act-3', owner: 'Christian Mvondo', project: 'EcoPack Cameroon', title: 'Partager le dossier au partenaire industriel', due: '23 août', priority: 'Moyenne', category: 'Mise en relation' },
    { id: 'act-4', owner: 'Pauline Etame', project: 'Cacao Origine Edéa', title: 'Annoter le plan commercial', due: '25 août', priority: 'Normale', category: 'Commercial' },
];

export const advisorMeetings = [
    { id: 'meet-1', time: '10:30', date: 'Aujourd’hui', person: 'Marie Ndomo', project: 'AgroFresh Cameroun', type: 'Revue financement', mode: 'À l’agence PNPE', duration: '45 min' },
    { id: 'meet-2', time: '14:00', date: 'Aujourd’hui', person: 'Christian Mvondo', project: 'EcoPack Cameroon', type: 'Préparation partenaire', mode: 'Visioconférence', duration: '30 min' },
    { id: 'meet-3', time: '16:15', date: 'Aujourd’hui', person: 'Nadia Bell', project: 'Kmer Bio Savons', type: 'Entretien d’orientation', mode: 'Téléphone', duration: '25 min' },
    { id: 'meet-4', time: '09:00', date: 'Demain', person: 'Aïcha Biyong', project: 'Cameroun Solar Services', type: 'Point prototype', mode: 'Visioconférence', duration: '45 min' },
];

export const partnerOpportunities = [
    { id: 'partner-opp-1', title: 'Fonds équipements agroalimentaires', type: 'Financement', budget: '250 M FCFA', deadline: '30 sept. 2026', eligible: 12, published: true, color: 'green' },
    { id: 'partner-opp-2', title: 'Programme fournisseurs durables', type: 'Marché', budget: 'Contrats cadres', deadline: '15 oct. 2026', eligible: 8, published: true, color: 'blue' },
    { id: 'partner-opp-3', title: 'Prix innovation Littoral', type: 'Concours', budget: '30 M FCFA', deadline: '05 nov. 2026', eligible: 21, published: false, color: 'yellow' },
];

export const directionCohorts = [
    { name: 'Cohorte 2026 A', entrants: 386, active: 342, completion: 89, maturity: 72, jobs: 418 },
    { name: 'Cohorte 2025 B', entrants: 314, active: 268, completion: 92, maturity: 77, jobs: 386 },
    { name: 'Cohorte 2025 A', entrants: 298, active: 241, completion: 86, maturity: 74, jobs: 352 },
    { name: 'Alumni 2024', entrants: 250, active: 194, completion: 94, maturity: 81, jobs: 304 },
];

export const impactOutcomes = [
    { label: 'Entreprises formalisées', value: 318, target: 360, tone: 'green' },
    { label: 'Projets financés', value: 74, target: 90, tone: 'yellow' },
    { label: 'Emplois générés', value: 1460, target: 1700, tone: 'blue' },
    { label: 'Financements mobilisés', value: 1850, target: 2200, unit: 'M FCFA', tone: 'orange' },
];