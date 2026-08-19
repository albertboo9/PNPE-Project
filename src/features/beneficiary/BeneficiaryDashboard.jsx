import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowRight, BookOpen, CalendarDays, ClipboardCheck, Plus, ShieldCheck, Users } from 'lucide-react';
import { ErrorState, PageSkeleton } from '../../components/AsyncState';
import { Journey, Maturity, PageHeader, Panel, Progress, Shell, Status } from '../../components/ui';
import { usePnpeResource } from '../../hooks/usePnpeResource';
import { pnpeService } from '../../services/mockService';
import { useDemoSession } from '../../stores/DemoSessionStore';
import { motion, useReducedMotion } from 'framer-motion';

function BeneficiaryDashboardContent({ workspace }) {
    const { beneficiary, courses, opportunities } = workspace;
    const opportunity = opportunities[0];
    const reduceMotion = useReducedMotion();
    const { session, dismissRegistrationSuccess } = useDemoSession();

    return <Shell>
        {session.showRegistrationSuccess && <motion.section className="space-welcome" initial={{ opacity: 0, y: reduceMotion ? 0 : -12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="welcome-icon"><ShieldCheck size={23} /></div>
            <div><span>Votre parcours PNPE est prêt</span><strong>Bienvenue Marie. Votre premier diagnostic vous oriente vers la validation marché.</strong><p>Cette orientation et ce score sont des propositions UX de démonstration à confirmer avec votre conseiller.</p></div>
            <button className="button light" onClick={dismissRegistrationSuccess}>Découvrir mon espace <ArrowRight size={16} /></button>
        </motion.section>}
        <PageHeader
            eyebrow={`Espace porteur · ${beneficiary.project}`}
            title={`Bonjour ${beneficiary.fullName.split(' ')[0]}, votre projet avance.`}
            description="Une vue simple pour savoir où vous en êtes et quelle action fera progresser votre projet."
            action={<button className="button primary" onClick={() => toast.success('Dossier de financement ouvert')}>Voir ma prochaine action <ArrowRight size={16} /></button>}
        />
        <div className="hero-dashboard">
            <div className="hero-copy">
                <div className="hero-topline"><span className="live-dot" /> Parcours PNPE · Cohorte Édéa 2026</div>
                <h2>Transformer des fruits locaux<br /><em>en opportunités durables.</em></h2>
                <p>Votre projet est à l'étape de validation marché. Le prochain jalon est à portée de main.</p>
                <div className="hero-actions">
                    <Link to="/porteur/parcours" className="button light">Voir mon parcours <ArrowRight size={16} /></Link>
                    <Link to="/porteur/passeport" className="hero-link">Ouvrir mon passeport <ShieldCheck size={15} /></Link>
                </div>
            </div>
            <Maturity beneficiary={beneficiary} />
        </div>

        <div className="section-label"><span>Votre progression</span><span>Étape {beneficiary.journeyStep} sur 8</span></div>
        <Panel title="Le parcours de votre projet" subtitle="Chaque étape validée renforce votre passeport entrepreneur.">
            <Journey current={beneficiary.journeyStep} />
        </Panel>

        <div className="dashboard-grid">
            <Panel title="À faire maintenant" subtitle="L'action qui débloque la prochaine étape" action={<Status tone="terracotta">Prioritaire</Status>}>
                <div className="next-action">
                    <div className="action-icon"><ClipboardCheck size={22} /></div>
                    <div>
                        <h3>Finaliser les prévisions financières</h3>
                        <p>Votre conseiller Aline Mballa attend ce document pour préparer le dossier de financement.</p>
                        <div className="action-details"><span><CalendarDays size={14} /> Échéance · 28 août 2026</span><span><Users size={14} /> Avec Aline Mballa</span></div>
                    </div>
                    <button className="round-arrow" aria-label="Ouvrir le dossier financier" onClick={() => toast.info('Ouverture du dossier financier')}><ArrowRight size={18} /></button>
                </div>
            </Panel>
            <Panel title="Recommandé pour vous" subtitle="Sélectionné à partir de votre diagnostic" action={<Link className="text-button" to="/porteur/formations">Tout voir <ArrowRight size={14} /></Link>}>
                <div className="mini-course">
                    <div className="mini-course-icon"><BookOpen size={19} /></div>
                    <div><Status tone="blue">Prochaine compétence</Status><h3>Packaging et qualité agroalimentaire</h3><p>3 h · Certificat PNPE</p></div>
                    <button className="round-arrow" aria-label="Ajouter la formation au parcours" onClick={() => toast.success('Formation ajoutée à votre parcours')}><Plus size={18} /></button>
                </div>
            </Panel>
        </div>

        <div className="dashboard-grid">
            <Panel title="Votre apprentissage" subtitle="Le campus Moodle intégré à votre parcours PNPE" action={<Link className="text-button" to="/porteur/formations">Mon apprentissage <ArrowRight size={14} /></Link>}>
                <div className="learning-list">{courses.slice(0, 3).map(course => <div className="learning-row" key={course.id}>
                    <div className={`learning-icon ${course.color}`}><BookOpen size={16} /></div>
                    <div><strong>{course.title}</strong><Progress value={course.progress} tone={course.color === 'gold' ? 'gold' : 'forest'} /></div>
                    <b>{course.progress}%</b>
                </div>)}</div>
            </Panel>
            <Panel title="Opportunité détectée" subtitle="Une correspondance expliquée, pas une recommandation opaque">
                <div className="match-card">
                    <div className="match-score">{opportunity.match}<small>%</small></div>
                    <div><Status tone="gold">Correspondance forte</Status><h3>{opportunity.title}</h3><p>{opportunity.reason}</p></div>
                    <Link to="/porteur/opportunites" className="round-arrow" aria-label="Voir les opportunités"><ArrowRight size={18} /></Link>
                </div>
            </Panel>
        </div>
    </Shell>;
}

export function BeneficiaryDashboard() {
    const resource = usePnpeResource(pnpeService.getBeneficiaryWorkspace, []);
    if (resource.status === 'loading') return <Shell><PageSkeleton label="Préparation de l’espace de Marie" /></Shell>;
    if (resource.status === 'error') return <Shell><ErrorState error={resource.error} onRetry={resource.reload} /></Shell>;
    return <BeneficiaryDashboardContent workspace={resource.data} />;
}