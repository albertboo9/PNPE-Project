import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'pnpe-demo-session-v1';

const initialSession = {
    actor: null,
    scene: 1,
    registrationCompleted: false,
    showRegistrationSuccess: false,
    enrolledCourses: ['canvas', 'finance', 'marketing'],
    completedCourses: ['marketing'],
    certificates: [{ courseId: 'marketing', id: 'PNPE-CERT-2026-0317', issuedAt: '12 août 2026' }],
    registration: {
        firstName: 'Marie',
        lastName: 'Ndomo',
        phone: '6 99 00 00 00',
        city: 'Edéa',
        projectName: 'AgroFresh Cameroun',
        sector: 'Agro-industrie',
        problem: 'Réduire les pertes de fruits locaux et proposer des produits transformés accessibles.',
        stage: 'Premières ventes',
        needs: ['Formation', 'Équipement', 'Financement'],
    },
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
        completeRegistration: () => setSession(current => ({
            ...current,
            actor: 'porteur',
            scene: 4,
            registrationCompleted: true,
            showRegistrationSuccess: true,
        })),
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
        setScene: (scene) => setSession(current => ({ ...current, scene })),
        resetSession: () => setSession({ ...initialSession, registration: { ...initialSession.registration } }),
    }), [session]);

    return <DemoSessionContext.Provider value={value}>{children}</DemoSessionContext.Provider>;
}

export function useDemoSession() {
    const context = useContext(DemoSessionContext);
    if (!context) throw new Error('useDemoSession doit être utilisé dans DemoSessionProvider');
    return context;
}