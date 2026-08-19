import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'pnpe-demo-session-v1';

const demoProject = {
    id: 'project-agrofresh',
    name: 'AgroFresh Cameroun',
    sector: 'Agro-industrie',
    city: 'Edéa',
    region: 'Littoral',
    status: 'En accompagnement',
    maturity: 78,
    need: 'Financement + équipement',
    fundingNeed: 15000000,
    jobs: 12,
    description: 'Transformation de fruits locaux en purées et produits prêts à consommer pour les marchés urbains.',
    registrationStatus: 'submitted',
};

const emptyRegistration = {
    firstName: '', lastName: '', birthDate: '', gender: '', nationality: 'Camerounaise',
    idType: '', idNumber: '', phone: '', email: '', region: '', department: '', city: '', commune: '', address: '',
    professionalSituation: '', education: '', educationDomain: '', graduationYear: '', entrepreneurialExperience: '',
    projectName: '', sector: '', subSector: '', projectType: '', stage: '', startDate: '', projectLocation: '',
    description: '', problem: '', solution: '', objectives: '',
    targetClients: '', marketArea: '', marketSegment: '', marketSize: '', identifiedNeeds: '', competitors: '',
    competitiveAdvantage: '', differentiation: '', distributionChannel: '', acquisitionChannels: '', commercialStrategy: '',
    businessModel: '', whyChoose: '', teamSize: '', teamMode: '', availableProfiles: '', keySkills: [], recruitmentNeeds: '',
    premises: '', equipment: '', technologies: '', existingPartners: '', skills: [], customSkill: '', needs: [],
    fundingAmount: '', currency: 'FCFA', fundingType: '', personalContribution: '', existingFunding: '', fundUse: '',
    documents: [], currentStep: 1, submitted: false,
};

const initialSession = {
    actor: null,
    scene: 1,
    registrationCompleted: false,
    showRegistrationSuccess: false,
    enrolledCourses: ['canvas', 'finance', 'marketing'],
    completedCourses: ['marketing'],
    certificates: [{ courseId: 'marketing', id: 'PNPE-CERT-2026-0317', issuedAt: '12 août 2026' }],
    savedOpportunities: ['opp-2'],
    startedApplications: [],
    advisorCompletedActions: [],
    advisorValidatedApplications: [],
    partnerShortlist: ['project-agrofresh'],
    connectionRequests: [],
    registration: {
        ...emptyRegistration,
        firstName: 'Marie', lastName: 'Ndomo', phone: '6 99 00 00 00', city: 'Edéa', region: 'Littoral',
        projectName: 'AgroFresh Cameroun', sector: 'Agro-industrie', problem: 'Réduire les pertes de fruits locaux et proposer des produits transformés accessibles.',
        stage: 'Premières ventes', needs: ['Formation', 'Équipement', 'Financement'], currentStep: 1,
    },
    beneficiary: { id: 'beneficiary-marie', firstName: 'Marie', lastName: 'Ndomo', city: 'Edéa', region: 'Littoral', profileCompletion: 86 },
    projects: [demoProject],
    projectRegistrations: [],
};

const DemoSessionContext = createContext(null);

function readSession() {
    try {
        const stored = globalThis.localStorage?.getItem(STORAGE_KEY);
        return stored ? { ...initialSession, ...JSON.parse(stored) } : initialSession;
    } catch {
        return initialSession;
    }
}

export function DemoSessionProvider({ children }) {
    const [session, setSession] = useState(readSession);

    useEffect(() => {
        globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(session));
    }, [session]);

    const value = useMemo(() => ({
        session,
        selectActor: (actor) => setSession(current => ({ ...current, actor })),
        updateRegistration: (patch) => setSession(current => ({
            ...current,
            registration: { ...current.registration, ...patch },
        })),
        saveRegistrationStep: (currentStep) => setSession(current => ({ ...current, registration: { ...current.registration, currentStep } })),
        completeRegistration: () => setSession(current => ({
            ...current,
            actor: 'porteur',
            scene: 4,
            registrationCompleted: true,
            showRegistrationSuccess: true,
        })),
        submitRegistration: () => setSession(current => {
            const form = current.registration;
            const project = {
                id: `project-${Date.now()}`,
                name: form.projectName || 'Nouveau projet', sector: form.sector || 'À qualifier', city: form.projectLocation || form.city || 'À préciser',
                region: form.region || 'À préciser', status: 'Soumis', maturity: 35, need: (form.needs || []).join(' + ') || 'À qualifier',
                fundingNeed: Number(form.fundingAmount) || 0, jobs: Number(form.teamSize) || 0, description: form.description || form.problem || 'Description à compléter.',
                registrationStatus: 'submitted', details: form,
            };
            return { ...current, actor: 'porteur', scene: 4, registrationCompleted: true, showRegistrationSuccess: true, projects: [...current.projects, project], registration: { ...form, submitted: true } };
        }),
        dismissRegistrationSuccess: () => setSession(current => ({ ...current, showRegistrationSuccess: false })),
        enrollCourse: (courseId) => setSession(current => ({
            ...current,
            enrolledCourses: current.enrolledCourses.includes(courseId)
                ? current.enrolledCourses
                : [...current.enrolledCourses, courseId],
        })),
        completeCourse: (courseId) => setSession(current => {
            const alreadyCompleted = current.completedCourses.includes(courseId);
            return {
                ...current,
                enrolledCourses: current.enrolledCourses.includes(courseId) ? current.enrolledCourses : [...current.enrolledCourses, courseId],
                completedCourses: alreadyCompleted ? current.completedCourses : [...current.completedCourses, courseId],
                certificates: alreadyCompleted ? current.certificates : [...current.certificates, {
                    courseId,
                    id: `PNPE-CERT-2026-${String(current.certificates.length + 318).padStart(4, '0')}`,
                    issuedAt: '19 août 2026',
                }],
                scene: Math.max(current.scene, 6),
            };
        }),
        toggleSavedOpportunity: (opportunityId) => setSession(current => ({
            ...current,
            savedOpportunities: current.savedOpportunities.includes(opportunityId)
                ? current.savedOpportunities.filter(id => id !== opportunityId)
                : [...current.savedOpportunities, opportunityId],
        })),
        startOpportunityApplication: (opportunityId) => setSession(current => ({
            ...current,
            startedApplications: current.startedApplications.includes(opportunityId)
                ? current.startedApplications
                : [...current.startedApplications, opportunityId],
            scene: Math.max(current.scene, 7),
        })),
        toggleAdvisorAction: (actionId) => setSession(current => ({
            ...current,
            advisorCompletedActions: current.advisorCompletedActions.includes(actionId)
                ? current.advisorCompletedActions.filter(id => id !== actionId)
                : [...current.advisorCompletedActions, actionId],
        })),
        validateAdvisorApplication: (applicationId) => setSession(current => ({
            ...current,
            advisorValidatedApplications: current.advisorValidatedApplications.includes(applicationId)
                ? current.advisorValidatedApplications
                : [...current.advisorValidatedApplications, applicationId],
        })),
        togglePartnerShortlist: (projectId) => setSession(current => ({
            ...current,
            partnerShortlist: current.partnerShortlist.includes(projectId)
                ? current.partnerShortlist.filter(id => id !== projectId)
                : [...current.partnerShortlist, projectId],
        })),
        requestConnection: (projectId) => setSession(current => ({
            ...current,
            connectionRequests: current.connectionRequests.includes(projectId)
                ? current.connectionRequests
                : [...current.connectionRequests, projectId],
            scene: Math.max(current.scene, 10),
        })),
        setScene: (scene) => setSession(current => ({ ...current, scene })),
        resetSession: () => setSession({ ...initialSession, registration: { ...initialSession.registration }, projects: [demoProject] }),
    }), [session]);

    return <DemoSessionContext.Provider value={value}>{children}</DemoSessionContext.Provider>;
}

export function useDemoSession() {
    const context = useContext(DemoSessionContext);
    if (!context) throw new Error('useDemoSession doit être utilisé dans DemoSessionProvider');
    return context;
}