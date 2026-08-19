import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BriefcaseBusiness, Check, Filter, Search, Sparkles, SlidersHorizontal } from 'lucide-react';
import { PageHeader, Panel, Shell, Status } from '../../components/ui';
import { projects } from '../../data/demoUniverse';
import { formatFcfa } from '../../services/mockService';

export function PartnerDashboard() {
    const [filters, setFilters] = useState({ query: '', sector: 'Tous', region: 'Toutes', maturity: '70' });
    const results = useMemo(() => projects.filter(project => {
        const haystack = `${project.name} ${project.description} ${project.need}`.toLowerCase();
        return (!filters.query || haystack.includes(filters.query.toLowerCase())) && (filters.sector === 'Tous' || project.sector === filters.sector) && (filters.region === 'Toutes' || project.region === filters.region) && project.maturity >= Number(filters.maturity);
    }), [filters]);
    const update = (key, value) => setFilters(current => ({ ...current, [key]: value }));
    return <Shell role="partenaire">
        <PageHeader eyebrow="Espace partenaire · données de démonstration" title="Trouvez des projets structurés, avec leurs preuves." description="Recherchez par territoire, maturité et besoin, puis comprenez pourquoi un projet correspond à vos critères." action={<Link className="button primary" to="/partenaire/projets"><Search size={16} /> Explorer les projets</Link>} />
        <div className="partner-intro"><div><span className="eyebrow">Sourcing PNPE</span><h2>Un portefeuille qualifié, pas une simple liste.</h2><p>Les statuts et scores affichés sont des propositions UX de démonstration à confirmer par la PNPE.</p></div><div className="partner-stat"><strong>74</strong><span>projets matures</span></div><div className="partner-stat"><strong>18</strong><span>besoins de financement</span></div></div>
        <Panel title="Sourcing de projets" subtitle="Les résultats sont classés par proximité avec vos critères." action={<Status tone="gold">{results.length} correspondances</Status>}>
            <div className="sourcing-filters"><label className="search-input"><Search size={16} /><input value={filters.query} onChange={event => update('query', event.target.value)} placeholder="Projet, besoin, secteur…" /></label><select value={filters.sector} onChange={event => update('sector', event.target.value)} aria-label="Filtrer par secteur"><option>Tous</option><option>Agro-industrie</option><option>Packaging</option><option>Énergie</option></select><select value={filters.region} onChange={event => update('region', event.target.value)} aria-label="Filtrer par territoire"><option>Toutes</option><option>Littoral</option><option>Sud</option></select><select value={filters.maturity} onChange={event => update('maturity', event.target.value)} aria-label="Filtrer par maturité"><option value="60">Maturité 60+</option><option value="70">Maturité 70+</option><option value="80">Maturité 80+</option></select><button className="icon-btn" onClick={() => setFilters({ query: '', sector: 'Tous', region: 'Toutes', maturity: '70' })} aria-label="Réinitialiser les filtres"><SlidersHorizontal size={17} /></button></div>
            <div className="matching-summary"><Filter size={15} /><span><strong>{results.length} projets</strong> correspondent à votre recherche</span><small>Matching déterministe · critères visibles</small></div>
            <div className="partner-project-list">{results.map((item, index) => <div className="partner-project" key={item.id}><div className="partner-project-mark"><BriefcaseBusiness size={24} /></div><div><div className="partner-result-top"><Status tone={item.verified ? 'green' : 'blue'}>{item.status} · proposition UX</Status><strong className="match-percent">{Math.max(78, 96 - index * 5)}%</strong></div><h3>{item.name}</h3><p>{item.description}</p><div className="partner-proofs"><span><Check size={14} /> Maturité {item.maturity}/100</span><span><Check size={14} /> {item.jobs} emplois</span><span><Check size={14} /> {formatFcfa(item.amount)}</span><span><Check size={14} /> {item.city}, {item.region}</span></div></div><Link className="round-arrow" to={`/partenaire/projets/${item.id}`} aria-label={`Ouvrir ${item.name}`}><ArrowRight size={18} /></Link></div>)}</div>
        </Panel>
        <div className="partner-note"><Sparkles size={17} /> Le matching est déterministe et expliqué par des critères visibles. Aucun appel IA externe n'est utilisé.</div>
    </Shell>;
}