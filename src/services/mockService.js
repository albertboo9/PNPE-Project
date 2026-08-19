import { advisorQueue, courses, demoBeneficiary, impact, journeyStages, opportunities, projects } from '../data/demoUniverse';

const wait = (value, delay = 180) => new Promise(resolve => globalThis.setTimeout(() => resolve(value), delay));
const response = (data) => ({ data, status: 'success', error: null, meta: { demo: true, generatedAt: new Date().toISOString() } });
const success = async (data, delay) => wait(response(data), delay);
const notFound = (entity, id) => Promise.reject(new Error(`${entity} introuvable : ${id}`));

export const mockService = {
    getBeneficiary: (id = demoBeneficiary.id) => id === demoBeneficiary.id ? success(demoBeneficiary) : notFound('Porteur', id),
    getCourses: (filters = {}) => success(courses.filter(course => {
        if (filters.category && filters.category !== 'Toutes' && course.category !== filters.category) return false;
        if (filters.level && filters.level !== 'Tous niveaux' && course.level !== filters.level) return false;
        if (filters.format && filters.format !== 'Tous formats' && course.format !== filters.format) return false;
        if (filters.query) {
            const query = filters.query.toLocaleLowerCase('fr');
            return `${course.title} ${course.category} ${course.instructor}`.toLocaleLowerCase('fr').includes(query);
        }
        return true;
    })),
    getCourse: (id) => courses.find(course => course.id === id) ? success(courses.find(course => course.id === id)) : notFound('Formation', id),
    getProjects: () => success(projects),
    getProject: (id) => projects.find(project => project.id === id) ? success(projects.find(project => project.id === id)) : notFound('Projet', id),
    getOpportunities: () => success(opportunities),
    getAdvisorQueue: () => success(advisorQueue),
    getDashboardMetrics: () => success(impact),
    getJourney: () => success({ stages: journeyStages, current: demoBeneficiary.journeyStep }),
    getBeneficiaryWorkspace: () => success({
        beneficiary: demoBeneficiary,
        journey: { stages: journeyStages, current: demoBeneficiary.journeyStep },
        courses,
        opportunities,
        project: projects.find(project => project.id === demoBeneficiary.projectId),
    }),
    completeTraining: (courseId) => courses.some(course => course.id === courseId)
        ? success({ courseId, completed: true, maturityDelta: 3 }, 350)
        : notFound('Formation', courseId),
};

// Point de remplacement unique : demain, cette exportation pourra référencer apiService.
export const pnpeService = mockService;

export const formatFcfa = (amount) => new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';