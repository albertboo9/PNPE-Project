import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export function PageSkeleton({ label = 'Chargement de votre espace' }) {
    return <div className="page-skeleton" role="status" aria-live="polite">
        <span>{label}…</span>
        <div className="skeleton-line wide" /><div className="skeleton-grid"><i /><i /><i /></div>
    </div>;
}

export function ErrorState({ error, onRetry }) {
    return <div className="error-state" role="alert">
        <AlertTriangle size={24} /><div><strong>Nous n’avons pas pu charger ces informations.</strong><p>{error?.message || 'Une erreur inattendue est survenue.'}</p></div>
        <button className="button outline" onClick={onRetry}><RefreshCw size={15} /> Réessayer</button>
    </div>;
}