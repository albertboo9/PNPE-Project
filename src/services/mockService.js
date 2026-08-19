import { advisorQueue, courses, demoBeneficiary, impact, opportunities, projects } from '../data/demoUniverse';

const ok = (data) => Promise.resolve({ data, status: 'success', error: null, meta: { demo: true } });
export const mockService = {
    getBeneficiary: () => ok(demoBeneficiary), getCourses: () => ok(courses), getProjects: () => ok(projects),
    getOpportunities: () => ok(opportunities), getAdvisorQueue: () => ok(advisorQueue), getDashboardMetrics: () => ok(impact),
    getJourney: () => ok({ stages: 8, current: demoBeneficiary.journeyStep }),
    completeTraining: (courseId) => ok({ courseId, completed: true, maturityDelta: 3 }),
};

export const formatFcfa = (amount) => new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';