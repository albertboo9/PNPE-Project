import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CalendarDays, Check, CheckCircle2, Clock3, FileCheck2, LockKeyhole, MessageCircle, Rocket, Sparkles, Target, Unlock } from 'lucide-react';
import { ErrorState, PageSkeleton } from '../../components/AsyncState';
import { PageHeader, Progress, Shell, Status } from '../../components/ui';
import { usePnpeResource } from '../../hooks/usePnpeResource';
import { pnpeService } from '../../services/mockService';

const stageIcons = [Target, FileCheck2, Sparkles, CheckCircle2, Rocket, Target, Unlock, Sparkles];

function JourneyExperience({ journey }) {
    const [selectedId, setSelectedId] = useState(journey.currentStageId);
    const reduceMotion = useReducedMotion();
    const selected = journey.stages.find(stage => stage.id === selectedId);
    return <Shell>
        <PageHeader eyebrow="Mon parcours · AgroFresh Cameroun" title="Votre transformation, étape par étape." description="Comprenez ce qui est acquis, ce qui manque et ce que votre prochaine preuve va débloquer." action={<Link to="/porteur/actions" className="button primary">Voir mes actions <ArrowRight size={16} /></Link>} />

        <motion.section className="journey-story-hero" initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }} animate={{ opacity: 1, y: 0 }}>
            <div className="journey-story-copy"><span className="journey-kicker"><i /> Étape active · Incubation</span><h2>Vous ne partez plus seulement d’une idée.<br /><em>Vous construisez des preuves.</em></h2><p>AgroFresh teste aujourd’hui son marché. Les retours clients et les prévisions financières ouvriront la prochaine porte : la préparation au financement.</p><div className="journey-hero-progress"><div><span>Parcours réalisé</span><strong>{journey.progress}%</strong></div><Progress value={journey.progress} tone="gold" /></div></div>
            <div className="journey-story-image"><img src="/assets/porteur-marie.jpg" alt="Marie, porteuse du projet AgroFresh Cameroun" /><div className="journey-image-note"><Sparkles size={17} /><span><strong>Prochain déblocage</strong>{journey.nextUnlock}</span></div></div>
        </motion.section>

        <section className="journey-map-section">
            <div className="section-heading"><div><span className="eyebrow">La carte de votre progression</span><h2>8 étapes, une seule trajectoire</h2></div><span>Sélectionnez une étape pour comprendre son rôle</span></div>
            <div className="journey-map" role="list">{journey.stages.map((stage, index) => {
                const Icon = stageIcons[index]; return <button role="listitem" key={stage.id} className={`journey-map-step ${stage.state} ${selectedId === stage.id ? 'selected' : ''}`} onClick={() => setSelectedId(stage.id)}>
                    <span className="journey-map-index">{stage.state === 'completed' ? <Check size={16} /> : stage.state === 'upcoming' ? <LockKeyhole size={14} /> : <Icon size={17} />}</span>
                    <span><small>{stage.date || `Étape ${index + 1}`}</small><strong>{stage.label}</strong></span>{index < journey.stages.length - 1 && <i className="journey-map-line" />}
                </button>;
            })}</div>
            <AnimatePresence mode="wait"><motion.div className={`journey-stage-explainer ${selected.state}`} key={selected.id} initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div><Status tone={selected.state === 'completed' ? 'green' : selected.state === 'current' ? 'terracotta' : 'muted'}>{selected.state === 'completed' ? 'Étape validée' : selected.state === 'current' ? 'Vous êtes ici' : 'Étape à venir'}</Status><h3>{selected.label}</h3><p>{selected.description}</p></div>
                <span className="stage-position">{String(journey.stages.findIndex(item => item.id === selected.id) + 1).padStart(2, '0')}<small>/ 08</small></span>
            </motion.div></AnimatePresence>
        </section>

        <section className="journey-focus-grid">
            <div className="journey-focus-main">
                <div className="focus-heading"><div className="focus-icon"><Target size={22} /></div><div><span className="eyebrow">Votre priorité maintenant</span><h2>{journey.currentFocus.title}</h2><p>{journey.currentFocus.objective}</p></div></div>
                <div className="proof-columns"><div><h3><CheckCircle2 size={17} /> Déjà acquis</h3>{journey.currentFocus.completedProofs.map(proof => <span className="proof-item done" key={proof}><Check size={13} /> {proof}</span>)}</div><div><h3><Clock3 size={17} /> Encore nécessaire</h3>{journey.currentFocus.missingProofs.map(proof => <span className="proof-item missing" key={proof}><i /> {proof}</span>)}</div></div>
            </div>
            <aside className="journey-advisor-card"><div className="advisor-mini-head"><span>AM</span><div><strong>{journey.currentFocus.advisor}</strong><small>Conseillère référente PNPE</small></div></div><p>« Vos preuves clients sont solides. Finalisons les chiffres pour présenter un dossier cohérent. »</p><div className="advisor-date"><CalendarDays size={16} /><span><small>Échéance conseillée</small>{journey.currentFocus.deadline}</span></div><button className="button light full"><MessageCircle size={16} /> Écrire à Aline</button></aside>
        </section>

        <section className="journey-actions-section"><div className="section-heading"><div><span className="eyebrow">Pour franchir cette étape</span><h2>Trois actions concrètes</h2></div><span>Dans l’ordre recommandé par votre conseillère</span></div><div className="journey-action-grid">{journey.currentFocus.actions.map((action, index) => <motion.div className="journey-action-card" key={action.id} whileHover={reduceMotion ? {} : { y: -4 }}><span className="action-order">0{index + 1}</span><Status tone={index === 0 ? 'terracotta' : index === 1 ? 'gold' : 'blue'}>{action.status}</Status><h3>{action.title}</h3><p>{action.detail}</p><Link to={action.route}>Commencer <ArrowRight size={15} /></Link></motion.div>)}</div></section>

        <section className="journey-unlock"><div className="unlock-icon"><Unlock size={24} /></div><div><span className="eyebrow">Après la validation marché</span><h2>Votre projet devient préparé pour le financement.</h2><p>La PNPE pourra qualifier le dossier, le rendre visible aux partenaires et vous proposer des opportunités adaptées.</p></div><Link to="/porteur/opportunites" className="button light">Voir ce qui vous attend <ArrowRight size={16} /></Link></section>
    </Shell>;
}

export function BeneficiaryJourneyPage() {
    const resource = usePnpeResource(pnpeService.getJourney, []);
    if (resource.status === 'loading') return <Shell><PageSkeleton label="Construction de votre carte de parcours" /></Shell>;
    if (resource.status === 'error') return <Shell><ErrorState error={resource.error} onRetry={resource.reload} /></Shell>;
    return <JourneyExperience journey={resource.data} />;
}