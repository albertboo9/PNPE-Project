import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Bookmark, CalendarDays, Check, CheckCircle2, ChevronRight, CircleAlert, Clock3, FileCheck2, MapPin, SlidersHorizontal, Sparkles, Target, WalletCards } from 'lucide-react';
import { toast } from 'sonner';
import { ErrorState, PageSkeleton } from '../../components/AsyncState';
import { PageHeader, Progress, Shell, Status } from '../../components/ui';
import { usePnpeResource } from '../../hooks/usePnpeResource';
import { pnpeService } from '../../services/mockService';
import { useDemoSession } from '../../stores/DemoSessionStore';

const filters = ['Toutes', 'Financement', 'Marché', 'Concours', 'Accompagnement'];

function MatchCriteria({ opportunity }) {
    return <div className="match-criteria">{opportunity.criteria.map(item => <div className={item.matched ? 'matched' : 'missing'} key={item.label}><span>{item.matched ? <Check size={13} /> : <CircleAlert size={13} />}{item.label}</span><strong>{item.value}</strong></div>)}</div>;
}

function OpportunitiesExperience({ opportunities }) {
    const [filter, setFilter] = useState('Toutes');
    const [openId, setOpenId] = useState(opportunities[0].id);
    const reduceMotion = useReducedMotion();
    const { session, toggleSavedOpportunity, startOpportunityApplication } = useDemoSession();
    const visible = useMemo(() => filter === 'Toutes' ? opportunities : opportunities.filter(item => item.type === filter), [filter, opportunities]);
    const featured = opportunities[0];
    const start = opportunity => { startOpportunityApplication(opportunity.id); toast.success('Candidature préparée', { description: 'Votre espace de préparation a été créé avec les pièces déjà disponibles.' }); };

    return <Shell>
        <PageHeader eyebrow="Radar d’opportunités · AgroFresh Cameroun" title="Des opportunités qui ont du sens pour votre projet." description="Chaque recommandation explique pourquoi elle vous correspond et ce qu’il reste à préparer." action={<button className="button outline"><SlidersHorizontal size={16} /> Affiner mon profil</button>} />

        <motion.section className="opportunity-radar-hero" initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="radar-copy"><span className="radar-live"><i /> Radar actualisé aujourd’hui</span><h2><strong>{opportunities.length}</strong> pistes concrètes<br />pour faire avancer AgroFresh.</h2><p>Votre maturité, votre secteur et vos besoins sont comparés aux conditions de chaque programme. Le score reste une proposition UX de démonstration.</p><div className="radar-stats"><span><Target size={18} /><b>94 %</b><small>meilleure correspondance</small></span><span><WalletCards size={18} /><b>20 M</b><small>FCFA mobilisables</small></span><span><Clock3 size={18} /><b>30 j</b><small>prochaine échéance</small></span></div></div>
            <div className="radar-visual" aria-hidden="true"><span className="radar-ring r1" /><span className="radar-ring r2" /><span className="radar-ring r3" /><span className="radar-sweep" /><i className="radar-point p1" /><i className="radar-point p2" /><i className="radar-point p3" /><div><Sparkles size={20} /><strong>AgroFresh</strong><small>78 / 100</small></div></div>
        </motion.section>

        <section className="featured-opportunity">
            <div className="featured-opportunity-image"><img src={featured.image} alt="Unité de production agroalimentaire" /><span><Sparkles size={14} /> Meilleure recommandation</span><div className="featured-match"><strong>{featured.match}<small>%</small></strong><span>compatible</span></div></div>
            <div className="featured-opportunity-content"><div className="featured-topline"><Status tone="gold">{featured.type}</Status><span><CalendarDays size={14} /> Clôture le {featured.deadline}</span></div><h2>{featured.title}</h2><p className="featured-org">{featured.organization}</p><p>{featured.reason}</p><MatchCriteria opportunity={featured} /><div className="featured-actions"><button className="button primary" onClick={() => start(featured)}>{session.startedApplications.includes(featured.id) ? 'Continuer ma candidature' : 'Préparer ma candidature'} <ArrowRight size={16} /></button><button className={`save-button ${session.savedOpportunities.includes(featured.id) ? 'saved' : ''}`} onClick={() => toggleSavedOpportunity(featured.id)} aria-label="Enregistrer cette opportunité"><Bookmark size={17} fill={session.savedOpportunities.includes(featured.id) ? 'currentColor' : 'none'} /></button></div></div>
        </section>

        <section className="opportunity-library"><div className="section-heading"><div><span className="eyebrow">Toutes vos pistes</span><h2>Explorez selon votre priorité</h2></div><span>{visible.length} résultat{visible.length > 1 ? 's' : ''}</span></div><div className="opportunity-filter-tabs">{filters.map(item => <button className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
            <motion.div className="opportunity-list" layout>{visible.map((opportunity, index) => {
                const isOpen = openId === opportunity.id; const saved = session.savedOpportunities.includes(opportunity.id); return <motion.article layout className={`opportunity-row-card ${isOpen ? 'open' : ''}`} key={opportunity.id} initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : index * .05 }}>
                    <button className="opportunity-row-main" onClick={() => setOpenId(isOpen ? null : opportunity.id)}><div className="opportunity-thumb"><img src={opportunity.image} alt="" /><span>{opportunity.match}%</span></div><div className="opportunity-row-copy"><div><Status tone={opportunity.type === 'Financement' ? 'gold' : opportunity.type === 'Marché' ? 'green' : opportunity.type === 'Concours' ? 'terracotta' : 'blue'}>{opportunity.type}</Status><span>{opportunity.organization}</span></div><h3>{opportunity.title}</h3><p>{opportunity.reason}</p><div className="opportunity-meta"><span><MapPin size={13} /> {opportunity.location}</span><span><CalendarDays size={13} /> {opportunity.deadline}</span><span><FileCheck2 size={13} /> {opportunity.effort}</span></div></div><div className="opportunity-row-end"><strong>{opportunity.amount}</strong><span>{opportunity.daysLeft} jours restants</span><ChevronRight size={19} /></div></button>
                    <AnimatePresence>{isOpen && <motion.div className="opportunity-row-details" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><MatchCriteria opportunity={opportunity} /><div><button className={`save-text ${saved ? 'saved' : ''}`} onClick={() => toggleSavedOpportunity(opportunity.id)}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Enregistrée' : 'Enregistrer'}</button><button className="button primary" onClick={() => start(opportunity)}>Préparer cette opportunité <ArrowRight size={15} /></button></div></motion.div>}</AnimatePresence>
                </motion.article>;
            })}</motion.div>
        </section>

        <section className="application-readiness"><div><span className="eyebrow">Votre préparation</span><h2>Votre dossier est prêt à 86 %</h2><p>Les pièces existantes de votre passeport sont réutilisées automatiquement. Il reste une seule action prioritaire.</p></div><div className="readiness-progress"><strong>86<small>%</small></strong><Progress value={86} tone="gold" /></div><div className="readiness-checks"><span><CheckCircle2 size={17} /> Profil et diagnostic</span><span><CheckCircle2 size={17} /> Certificats et preuves</span><span className="pending"><CircleAlert size={17} /> Prévisions financières</span></div><Link to="/porteur/parcours" className="text-button">Voir l’action dans mon parcours <ArrowRight size={15} /></Link></section>
    </Shell>;
}

export function BeneficiaryOpportunitiesPage() {
    const resource = usePnpeResource(pnpeService.getOpportunities, []);
    if (resource.status === 'loading') return <Shell><PageSkeleton label="Recherche des opportunités adaptées" /></Shell>;
    if (resource.status === 'error') return <Shell><ErrorState error={resource.error} onRetry={resource.reload} /></Shell>;
    return <OpportunitiesExperience opportunities={resource.data} />;
}