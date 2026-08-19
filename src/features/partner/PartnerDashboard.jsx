import React from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, BarChart3, Bookmark, BriefcaseBusiness, Clock3,
    Search, Sparkles, Target, Users,
} from 'lucide-react';
import { PageHeader, Panel, Shell } from '../../components/ui';
import { projects } from '../../data/demoUniverse';

export function PartnerDashboard() {
    return <Shell role="partenaire">
        <PageHeader
            eyebrow="Cockpit sourcing · données de démonstration"
            title="Décidez où concentrer votre sourcing."
            description="Votre espace de pilotage réunit les projets à regarder, les mandats actifs et les relations en cours."
            action={<Link className="button primary" to="/partenaire/projets"><Search size={16} /> Explorer la banque</Link>}
        />
        <div className="partner-intro cockpit-intro">
            <div>
                <span className="eyebrow">Mandat actif</span>
                <h2>Agro-industrie · Littoral · maturité 70+</h2>
                <p>Un point de départ enregistré pour la démonstration. Les critères peuvent être modifiés dans le matching expliqué.</p>
                <div className="chip-row">
                    <span className="filter-chip selected"><Target size={14} /> Agro-industrie</span>
                    <span className="filter-chip selected"><Target size={14} /> Littoral</span>
                    <span className="filter-chip selected"><Target size={14} /> 70+ maturité</span>
                </div>
            </div>
            <div className="partner-stat"><BarChart3 size={20} /><strong>4</strong><span>projets analysés</span></div>
            <div className="partner-stat"><Users size={20} /><strong>2</strong><span>relations à suivre</span></div>
        </div>
        <div className="partner-cockpit-grid">
            <Panel title="À traiter maintenant" subtitle="Les décisions qui ont le plus de valeur aujourd'hui.">
                <div className="worklist">
                    <Link to="/partenaire/matching" className="worklist-row"><span className="worklist-icon blue"><Target size={17} /></span><span><strong>Revoir votre shortlist expliquée</strong><small>AgroFresh et EcoPack dépassent votre seuil</small></span><ArrowRight size={16} /></Link>
                    <Link to="/partenaire/opportunites" className="worklist-row"><span className="worklist-icon gold"><BriefcaseBusiness size={17} /></span><span><strong>12 candidatures à examiner</strong><small>Fonds équipements agroalimentaires</small></span><ArrowRight size={16} /></Link>
                    <Link to="/partenaire/mises-en-relation" className="worklist-row"><span className="worklist-icon green"><Clock3 size={17} /></span><span><strong>1 rendez-vous cette semaine</strong><small>EcoPack Cameroon · jeudi 27 août</small></span><ArrowRight size={16} /></Link>
                </div>
            </Panel>
            <Panel title="Recommandations PNPE" subtitle="Projets visibles avec preuves de parcours.">
                <div className="recommendation-list">
                    {projects.slice(0, 2).map(project => <Link to={`/partenaire/projets/${project.id}`} className="recommendation-row" key={project.id}><span className="partner-project-mark"><BriefcaseBusiness size={20} /></span><span><strong>{project.name}</strong><small>{project.sector} · {project.city} · maturité {project.maturity}/100</small></span><Bookmark size={16} /></Link>)}
                </div>
                <Link className="text-button" to="/partenaire/projets">Voir les 4 projets qualifiés <ArrowRight size={14} /></Link>
            </Panel>
        </div>
        <div className="partner-note"><Sparkles size={17} /> Les scores et statuts sont des propositions UX de démonstration. Aucun appel IA externe n'est utilisé.</div>
    </Shell>;
}
