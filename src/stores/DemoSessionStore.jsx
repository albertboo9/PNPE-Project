import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'pnpe-demo-session-v1';

const initialSession = {
    actor: null,
    scene: 1,
    registrationCompleted: false,
    showRegistrationSuccess: false,
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