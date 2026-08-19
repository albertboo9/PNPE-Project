import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BriefcaseBusiness, Check, Search, Sparkles } from 'lucide-react';
import { PageHeader, Panel, Shell, Status } from '../../components/ui';
import { projects } from '../../data/demoUniverse';
import { formatFcfa } from '../../services/mockService';

export function PartnerDashboard() {
    const project = projects[0];
    return <Shell role="partenaire">
        <PageHeader eyebrow="Espace partenaire · données de démonstration" title="Trouvez des projets structurés, avec leurs preuves." description="Recherchez par territoire, maturité et besoin, puis comprenez pourquoi un projet correspond à vos critères." action={<Link className="button primary" to="/partenaire/projets"><Search size={16} /> Explorer les projets</Link>} />
        <div className="partner-intro"><div><span className="eyebrow">Sourcing PNPE</span><h2>Un portefeuille qualifié, pas une simple liste.</h2><p>Les statuts et scores affichés sont des propositions UX de démonstration à confirmer par la PNPE.</p></div><div className="partner-stat"><strong>74</strong><span>projets matures</span></div><div className="partner-stat"><strong>18</strong><span>besoins de financement</span></div></div>
        <Panel title="Correspondance recommandée" subtitle="Agro-industrie · Littoral · maturité supérieure à 70" action={<Status tone="gold">94% de correspondance</Status>}>
            <div className="partner-project"><div className="partner-project-mark"><BriefcaseBusiness size={24} /></div><div><Status tone="green">Prêt pour financement · proposition UX</Status><h3>{project.name}</h3><p>{project.description}</p><div className="partner-proofs"><span><Check size={14} /> Maturité {project.maturity}/100</span><span><Check size={14} /> 3 certificats</span><span><Check size={14} /> {project.jobs} emplois potentiels</span><span><Check size={14} /> Besoin {formatFcfa(project.amount)}</span></div></div><Link className="round-arrow" to={`/partenaire/projets/${project.id}`} aria-label="Ouvrir AgroFresh"><ArrowRight size={18} /></Link></div>
        </Panel>
        <div className="partner-note"><Sparkles size={17} /> Le matching est déterministe et expliqué par des critères visibles. Aucun appel IA externe n'est utilisé.</div>
    </Shell>;
}