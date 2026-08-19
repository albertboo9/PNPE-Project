import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, BookOpen, CalendarDays, Check, CheckCircle2, Clock3, FileCheck2, GraduationCap, Mail, MapPin, Search, ShieldAlert, Sparkles, Users } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader, Panel, Progress, Shell, Status } from '../../components/ui';
import { advisorActions, advisorApplications, advisorMeetings, advisorQueue, courses } from '../../data/demoUniverse';
import { useDemoSession } from '../../stores/DemoSessionStore';

const reveal = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

export function AdvisorBeneficiariesPage() {
    const [query, setQuery] = useState('');
    const filtered = useMemo(() => advisorQueue.filter(item => `${item.name} ${item.project} ${item.city} ${item.sector}`.toLowerCase().includes(query.toLowerCase())), [query]);
    return <Shell role="conseiller"><PageHeader eyebrow="Portefeuille actif" title="Les porteurs, au bon niveau de détail." description="Retrouvez chaque personne, son projet, son blocage et la décision qui fera avancer son parcours." action={<label className="search-input page-search"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Nom, projet, territoire…" /></label>} />
        <div className="workspace-kpis"><div><Users /><strong>42</strong><span>Porteurs actifs</span></div><div><CheckCircle2 /><strong>31</strong><span>En progression</span></div><div><Clock3 /><strong>8</strong><span>À relancer</span></div><div><ShieldAlert /><strong>3</strong><span>À risque</span></div></div>
        <div className="entity-grid">{filtered.map((item, index) => <motion.article {...reveal} transition={{ delay: index * .05 }} className="entity-card" key={item.id}><div className="entity-card-top"><span className="case-avatar">{item.avatar}</span><Status tone={item.risk === 'high' ? 'terracotta' : item.risk === 'low' ? 'green' : 'gold'}>{item.priority}</Status></div><h2>{item.name}</h2><p>{item.project}</p><div className="entity-meta"><span><MapPin size={14} /> {item.city}</span><span>{item.sector}</span></div><div className="entity-score"><span>Maturité proposée</span><strong>{item.maturity}/100</strong></div><Progress value={item.maturity} /><div className="entity-next"><small>Prochaine décision</small><strong>{item.next}</strong></div><Link to={`/conseiller/porteurs/${item.id}`} className="button outline full">Ouvrir le dossier <ArrowRight size={16} /></Link></motion.article>)}</div>
    </Shell>;
}

export function AdvisorApplicationsPage() {
    const { session, validateAdvisorApplication } = useDemoSession();
    return <Shell role="conseiller"><PageHeader eyebrow="Candidatures entrantes" title="Qualifier vite, orienter justement." description="Chaque candidature expose son niveau de complétude et la pièce qui empêche une décision." action={<button className="button primary" onClick={() => toast.success('Nouvelle candidature de démonstration importée')}><FileCheck2 size={16} /> Importer un dossier</button>} />
        <Panel title="Dossiers à examiner" subtitle="Statuts proposés pour la démonstration · validation humaine requise"><div className="data-table advisor-applications"><div className="data-row data-head"><span>Porteur et projet</span><span>Réception</span><span>Complétude</span><span>Point d’attention</span><span>Décision</span></div>{advisorApplications.map(item => { const validated = session.advisorValidatedApplications.includes(item.id); return <div className="data-row" key={item.id}><span><strong>{item.name}</strong><small>{item.project} · {item.city}</small></span><span>{item.submitted}</span><span><strong>{item.completeness}%</strong><Progress value={item.completeness} tone={item.completeness < 80 ? 'gold' : 'forest'} /></span><span><Status tone={item.completeness < 80 ? 'terracotta' : 'blue'}>{item.missing}</Status></span><span><button className={`button ${validated ? 'success' : 'outline'} compact`} disabled={validated} onClick={() => { validateAdvisorApplication(item.id); toast.success(`${item.project} orienté vers le diagnostic`); }}>{validated ? <Check size={15} /> : <ArrowRight size={15} />}{validated ? 'Orienté' : 'Examiner'}</button></span></div>; })}</div></Panel>
    </Shell>;
}

export function AdvisorActionsPage() {
    const { session, toggleAdvisorAction } = useDemoSession();
    const done = session.advisorCompletedActions.length;
    return <Shell role="conseiller"><PageHeader eyebrow="Pilotage quotidien" title="Un plan d’actions qui se ferme vraiment." description="Priorisez, terminez et conservez une trace des interventions réalisées auprès des porteurs." action={<Status tone="green">{done}/{advisorActions.length} terminées</Status>} />
        <div className="action-board"><section><div className="board-title"><span>À faire</span><strong>{advisorActions.length - done}</strong></div>{advisorActions.filter(item => !session.advisorCompletedActions.includes(item.id)).map(item => <motion.article layout className="task-card" key={item.id}><button className="task-check" aria-label={`Terminer ${item.title}`} onClick={() => { toggleAdvisorAction(item.id); toast.success('Action marquée comme terminée'); }}><Check size={15} /></button><div><Status tone={item.priority === 'Haute' ? 'terracotta' : 'blue'}>{item.category}</Status><h3>{item.title}</h3><p>{item.owner} · {item.project}</p><small><CalendarDays size={13} /> Échéance {item.due}</small></div></motion.article>)}</section><section><div className="board-title completed"><span>Terminées</span><strong>{done}</strong></div>{advisorActions.filter(item => session.advisorCompletedActions.includes(item.id)).map(item => <motion.article layout className="task-card is-done" key={item.id}><button className="task-check" aria-label={`Rouvrir ${item.title}`} onClick={() => toggleAdvisorAction(item.id)}><Check size={15} /></button><div><Status tone="green">Réalisée</Status><h3>{item.title}</h3><p>{item.owner} · {item.project}</p><small>Trace conservée dans le dossier</small></div></motion.article>)}{done === 0 && <div className="board-empty"><CheckCircle2 /><strong>Aucune action terminée</strong><span>Les actions validées apparaîtront ici.</span></div>}</section></div>
    </Shell>;
}

export function AdvisorMeetingsPage() {
    return <Shell role="conseiller"><PageHeader eyebrow="Agenda d’accompagnement" title="Chaque rendez-vous prépare une décision." description="Une journée structurée par objectif, format et dossier porteur." action={<button className="button primary" onClick={() => toast.success('Créneau de démonstration ajouté')}><CalendarDays size={16} /> Nouveau rendez-vous</button>} />
        <div className="agenda-layout"><aside className="agenda-day"><span>Août 2026</span><strong>19</strong><small>Mercredi</small><div><b>3</b> rendez-vous aujourd’hui</div></aside><div className="agenda-timeline">{advisorMeetings.map((item, index) => <motion.article {...reveal} transition={{ delay: index * .05 }} key={item.id}><div className="agenda-time"><strong>{item.time}</strong><span>{item.date}</span></div><i /><div className="agenda-event"><div><Status tone={index === 0 ? 'green' : 'blue'}>{item.type}</Status><h3>{item.person}</h3><p>{item.project}</p></div><div className="agenda-event-meta"><span>{item.mode}</span><small>{item.duration}</small><button className="icon-btn" aria-label="Envoyer un rappel" onClick={() => toast.success(`Rappel envoyé à ${item.person}`)}><Mail size={16} /></button></div></div></motion.article>)}</div></div>
    </Shell>;
}

export function AdvisorTrainingPage() {
    return <Shell role="conseiller"><PageHeader eyebrow="Suivi pédagogique" title="La formation comme levier de progression." description="Repérez les parcours en retard et recommandez le bon module au bon moment." />
        <div className="workspace-kpis"><div><GraduationCap /><strong>92%</strong><span>Complétion moyenne</span></div><div><BookOpen /><strong>184</strong><span>Apprenants actifs</span></div><div><CheckCircle2 /><strong>76</strong><span>Certificats ce mois</span></div><div><AlertTriangle /><strong>12</strong><span>Progressions faibles</span></div></div>
        <div className="training-monitor">{courses.slice(0, 5).map((course, index) => <motion.article {...reveal} transition={{ delay: index * .04 }} key={course.id}><img src={course.image} alt="" /><div><Status tone={course.recommended ? 'gold' : 'blue'}>{course.category}</Status><h3>{course.title}</h3><p>{course.students} apprenants · {course.format}</p><Progress value={Math.max(54, 91 - index * 8)} /></div><div className="training-rate"><strong>{Math.max(54, 91 - index * 8)}%</strong><span>complétion</span><button className="button ghost compact" onClick={() => toast.success('Formation recommandée au portefeuille ciblé')}><Sparkles size={14} /> Recommander</button></div></motion.article>)}</div>
    </Shell>;
}

export function AdvisorAlertsPage() {
    const alerts = advisorQueue.filter(item => item.blocked || item.risk === 'high');
    return <Shell role="conseiller"><PageHeader eyebrow="Centre de vigilance" title="Voir les ruptures avant qu’elles ne durent." description="Des alertes explicables, reliées à une personne, une durée et une action corrective." action={<Status tone="terracotta">{alerts.length + 2} signaux actifs</Status>} />
        <div className="alert-command"><ShieldAlert /><div><strong>Priorité de la semaine</strong><h2>Réduire les dossiers bloqués depuis plus de 7 jours.</h2><p>3 porteurs nécessitent une relance ou une expertise. Les seuils sont des propositions UX de démonstration.</p></div><button className="button light" onClick={() => toast.success('Plan de relance créé')}>Créer le plan de relance <ArrowRight size={16} /></button></div>
        <div className="alert-list">{alerts.map(item => <article key={item.id}><div className={`alert-icon ${item.risk}`}><AlertTriangle size={19} /></div><div><Status tone={item.risk === 'high' ? 'terracotta' : 'gold'}>{item.blocked} jours sans progrès</Status><h3>{item.project}</h3><p>{item.name} · {item.issue}</p></div><div><small>Action recommandée</small><strong>{item.next}</strong></div><Link className="round-arrow" to={`/conseiller/porteurs/${item.id}`}><ArrowRight size={17} /></Link></article>)}</div>
    </Shell>;
}