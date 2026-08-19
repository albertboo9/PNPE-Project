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

export const courses = [
    { id: 'canvas', title: 'Construire un Business Model viable', category: 'Entrepreneuriat', instructor: 'Nathalie Mballa', duration: '6 h', level: 'Intermédiaire', price: 0, progress: 82, status: 'En cours', students: 184, color: 'forest' },
    { id: 'finance', title: 'Finance pour entrepreneurs', category: 'Finance', instructor: 'Armand Tchana', duration: '4 h 30', level: 'Fondamentaux', price: 25000, progress: 45, status: 'En cours', students: 96, color: 'gold' },
    { id: 'marketing', title: 'Marketing digital pour vendre local', category: 'Commercial', instructor: 'Sophie Essomba', duration: '5 h', level: 'Fondamentaux', price: 0, progress: 100, status: 'Certifiée', students: 241, color: 'terracotta' },
    { id: 'packaging', title: 'Packaging et qualité agroalimentaire', category: 'Qualité', instructor: 'Centre de formation PNPE', duration: '3 h', level: 'Avancé', price: 15000, progress: 0, status: 'Recommandée', students: 72, color: 'blue' },
];

export const projects = [
    { id: 'project-agrofresh', name: 'AgroFresh Cameroun', owner: 'Marie Ndomo', city: 'Edéa', region: 'Littoral', sector: 'Agro-industrie', maturity: 78, status: 'Prêt pour financement', need: 'Financement + équipement', amount: 15000000, jobs: 12, verified: true, description: 'Transformation de fruits locaux en purées et produits prêts à consommer pour les marchés urbains.' },
    { id: 'project-ecopack', name: 'EcoPack Cameroon', owner: 'Christian Mvondo', city: 'Edéa', region: 'Littoral', sector: 'Packaging', maturity: 86, status: 'Projet vérifié', need: 'Partenaire industriel', amount: 35000000, jobs: 24, verified: true, description: 'Emballages compostables à base de fibres végétales pour les transformateurs locaux.' },
    { id: 'project-solar', name: 'Cameroun Solar Services', owner: 'Aïcha Biyong', city: 'Kribi', region: 'Sud', sector: 'Énergie', maturity: 71, status: 'En incubation', need: 'Accompagnement technique', amount: 9000000, jobs: 8, verified: false, description: 'Solutions solaires modulaires pour les ateliers et petites unités de production.' },
    { id: 'project-cacao', name: 'Cacao Origine Edéa', owner: 'Pauline Etame', city: 'Pouma', region: 'Littoral', sector: 'Agro-industrie', maturity: 64, status: 'Accompagné', need: 'Structuration commerciale', amount: 12000000, jobs: 15, verified: true, description: 'Valorisation de fèves de cacao issues de petits producteurs en produits premium.' },
];

export const opportunities = [
    { id: 'opp-1', title: 'Programme d’équipement des unités agroalimentaires', organization: 'PNPE · Édition 2026', deadline: '30 sept. 2026', amount: 'Jusqu’à 20 M FCFA', match: 94, sector: 'Agro-industrie', reason: 'Votre projet est en validation marché et recherche un équipement de production.' },
    { id: 'opp-2', title: 'Challenge innovation et emballage durable', organization: 'Programme régional Littoral', deadline: '12 oct. 2026', amount: 'Prix + mentorat', match: 87, sector: 'Innovation', reason: 'Votre besoin de packaging et votre implantation dans le Littoral correspondent.' },
    { id: 'opp-3', title: 'Rencontre acheteurs · Produits locaux', organization: 'Réseau PNPE', deadline: '18 sept. 2026', amount: 'Mise en relation', match: 81, sector: 'Commercial', reason: 'Votre projet est prêt à tester ses débouchés auprès de distributeurs.' },
];

export const advisorQueue = [
    { id: 'case-1', name: 'Marie Ndomo', project: 'AgroFresh Cameroun', issue: 'Préparer le dossier de financement', blocked: 0, next: 'Valider les prévisions financières', priority: 'Aujourd’hui', maturity: 78, avatar: 'MN' },
    { id: 'case-2', name: 'Christian Mvondo', project: 'EcoPack Cameroon', issue: 'Mise en relation industrielle', blocked: 3, next: 'Partager le dossier projet vérifié', priority: 'À traiter', maturity: 86, avatar: 'CM' },
    { id: 'case-3', name: 'Aïcha Biyong', project: 'Cameroun Solar Services', issue: 'Prototypage technique', blocked: 12, next: 'Planifier une session avec l’expert', priority: 'À relancer', maturity: 71, avatar: 'AB' },
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
};