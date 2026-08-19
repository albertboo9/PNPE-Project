import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, CalendarDays, Check, Clock3, FileCheck2, Filter, Search, Users } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader, Panel, Progress, Shell, Status } from '../../components/ui';
import { advisorQueue } from '../../data/demoUniverse';

const tone = { 'Aujourd’hui': 'terracotta', 'À traiter': 'gold', 'À relancer': 'red', 'Cette semaine': 'blue' };

function QueueCard({ item, index }) {
    return <motion.article className={`advisor-case risk-${item.risk}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .05 }}>
        <div className="case-person"><span className="case-avatar">{item.avatar}</span><div><strong>{item.name}</strong><span>{item.project} · {item.city}</span></div></div>
        <div className="case-stage"><span>Étape actuelle</span><strong>{item.stage}</strong><Progress value={item.maturity} tone={item.risk === 'high' ? 'gold' : 'forest'} /></div>
        <div className="case-issue"><span>Intervention attendue</span><strong>{item.issue}</strong><small><Clock3 size={13} /> {item.blocked ? `Bloqué depuis ${item.blocked} jours` : 'À débloquer aujourd’hui'}</small></div>
        <Status tone={tone[item.priority]}>{item.priority}</Status>
        <Link to={`/conseiller/porteurs/${item.id}`} className="round-arrow" aria-label={`Ouvrir le dossier de ${item.name}`}><ArrowRight size={18} /></Link>
    </motion.article>;
}

export function AdvisorDashboard() {
    const [query, setQuery] = useState('');
    const cases = advisorQueue.filter(item => `${item.name} ${item.project} ${item.issue}`.toLowerCase().includes(query.toLowerCase()));
    return <Shell role="conseiller"><div className="role-hero advisor-hero"><div><p className="eyebrow">Centre d’accompagnement · 19 août 2026</p><h1>Bonjour Aline.<br /><em>4 interventions méritent votre attention.</em></h1><p>La file relie chaque alerte au blocage, à la preuve manquante et à l’action qui fera avancer le porteur.</p></div><div className="hero-agenda"><CalendarDays size={20} /><span>Votre journée</span><strong>3 rendez-vous</strong><small>Prochain · Marie à 10h30</small></div></div>
        <div className="operational-kpis"><div><Users /><span>Portefeuille</span><strong>42</strong><small>porteurs actifs</small></div><div><FileCheck2 /><span>À examiner</span><strong>12</strong><small>dossiers reçus</small></div><div><Clock3 /><span>En retard</span><strong>5</strong><small>actions prioritaires</small></div><div><AlertTriangle /><span>À risque</span><strong>3</strong><small>sans progrès récent</small></div></div>
        <div className="section-heading"><div><p className="eyebrow">File de travail priorisée</p><h2>Qui accompagner maintenant — et pourquoi</h2></div><div className="queue-tools"><label className="search-input"><Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher un porteur…" /></label><button className="button outline"><Filter size={15} /> Filtrer</button></div></div>
        <div className="advisor-queue">{cases.map((item, index) => <QueueCard key={item.id} item={item} index={index} />)}</div>
    </Shell>;
}

export function AdvisorCasePage() {
    const { id } = useParams(); const item = advisorQueue.find(entry => entry.id === id) || advisorQueue[0];
    return <Shell role="conseiller"><Link className="back-link" to="/conseiller">← Retour à la file de travail</Link><PageHeader eyebrow={`Dossier porteur · ${item.stage}`} title={item.project} description={`${item.name} · ${item.sector} · ${item.city}`} action={<button className="button primary" onClick={() => toast.success('Action enregistrée dans le dossier')}><Check size={16} /> Valider la prochaine action</button>} />
        <div className="case-detail-hero"><div className="case-score"><span>Maturité proposée</span><strong>{item.maturity}<small>/100</small></strong><Progress value={item.maturity} /></div><div><span>Problème à résoudre</span><h2>{item.issue}</h2><p>{item.blocked ? `Le parcours est bloqué depuis ${item.blocked} jours.` : 'Ce point doit être traité aujourd’hui pour tenir le calendrier de financement.'}</p></div><div><span>Prochaine décision</span><h3>{item.next}</h3><button className="text-button" onClick={() => toast.info('Rendez-vous ajouté au suivi')}><CalendarDays size={14} /> Planifier un échange</button></div></div>
        <div className="detail-grid"><Panel title="Preuve attendue" subtitle="Ce qui manque pour franchir l’étape"><div className="missing-proof"><FileCheck2 /><div><strong>{item.proof}</strong><p>Document proposé dans le cadre de la démonstration. À vérifier avec le porteur.</p></div><Status tone="terracotta">À valider</Status></div></Panel><Panel title="Historique récent" subtitle="Une lecture rapide avant l’entretien"><div className="activity-mini"><span><i />Aujourd’hui<strong>Dossier consulté par Aline</strong></span><span><i />Il y a 2 jours<strong>Formation Business Model mise à jour</strong></span><span><i />08 août<strong>Diagnostic de maturité réalisé</strong></span></div></Panel></div>
    </Shell>;
}