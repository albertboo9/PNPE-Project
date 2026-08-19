import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Building2, Check, CheckCircle2, ChevronDown, CircleHelp, Clock3, Compass, Handshake, Lightbulb, LoaderCircle, Save, Sparkles, Target, UserRound, Users, WalletCards } from 'lucide-react';
import { Logo, Progress } from '../../components/ui';
import { useDemoSession } from '../../stores/DemoSessionStore';

const stages = [
    { value: 'Idée', label: 'Une idée à clarifier' },
    { value: 'Concept', label: 'Un concept déjà défini' },
    { value: 'Prototype', label: 'Un prototype à tester' },
    { value: 'Premières ventes', label: 'Mes premières ventes' },
    { value: 'Activité lancée', label: 'Une activité déjà lancée' },
];
const needs = ['Formation', 'Accompagnement', 'Équipement', 'Financement', 'Formalités', 'Réseau'];
const stepMeta = [
    { icon: UserRound, label: 'Vous' },
    { icon: Lightbulb, label: 'Votre idée' },
    { icon: Compass, label: 'Avancement' },
    { icon: Target, label: 'Vos besoins' },
    { icon: WalletCards, label: 'Orientation' },
];
const guidance = [
    'Nous allons commencer par vous. Ces informations restent modifiables.',
    'Pas besoin de business plan : une phrase simple suffit pour commencer.',
    'Il n’y a pas de mauvaise réponse. Votre parcours s’adaptera à votre réalité.',
    'Sélectionnez ce qui vous aiderait le plus dans les prochaines semaines.',
    'Cette orientation est une proposition UX de démonstration à confirmer avec la PNPE.',
];
const roleOptions = [
    { id: 'porteur', label: 'Porteur de projet', icon: UserRound, to: '/porteur' },
    { id: 'conseiller', label: 'Conseiller PNPE', icon: Users, to: '/conseiller' },
    { id: 'partenaire', label: 'Partenaire / financeur', icon: Handshake, to: '/partenaire' },
    { id: 'direction', label: 'Direction PNPE', icon: Building2, to: '/direction' },
];

function Choice({ selected, children, onClick }) {
    return <button type="button" className={`choice-tile ${selected ? 'selected' : ''}`} onClick={onClick}>
        <span className="choice-check">{selected && <Check size={14} />}</span>{children}
    </button>;
}

export function RegistrationWizard() {
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();
    const { session, updateRegistration, completeRegistration, selectActor } = useDemoSession();
    const [step, setStep] = useState(1);
    const [saved, setSaved] = useState(true);
    const [showWhy, setShowWhy] = useState(false);
    const [roleMenu, setRoleMenu] = useState(false);
    const [advancing, setAdvancing] = useState(false);
    const form = session.registration;

    const update = (patch) => {
        setSaved(false);
        updateRegistration(patch);
        globalThis.setTimeout(() => setSaved(true), 350);
    };
    const toggleNeed = (need) => update({ needs: form.needs.includes(need) ? form.needs.filter(item => item !== need) : [...form.needs, need] });
    const next = () => {
        setAdvancing(true);
        globalThis.setTimeout(() => {
            if (step < 5) setStep(current => current + 1);
            else finish();
            setAdvancing(false);
        }, reduceMotion ? 0 : 280);
    };
    const finish = () => {
        completeRegistration();
        globalThis.setTimeout(() => navigate('/porteur'), reduceMotion ? 0 : 900);
    };
    const skip = () => {
        selectActor('porteur');
        navigate('/porteur');
    };
    const switchRole = (role) => {
        selectActor(role.id);
        setRoleMenu(false);
        navigate(role.to);
    };

    return <div className="registration-shell">
        <header className="registration-header">
            <Logo />
            <div className="registration-meta"><span><Clock3 size={14} /> 4 min restantes</span><span className={saved ? 'saved' : ''}><Save size={14} /> {saved ? 'Sauvegardé' : 'Sauvegarde...'}</span></div>
            <div className="registration-header-actions"><div className="registration-role-switcher"><button className="button ghost registration-role-link" onClick={() => setRoleMenu(value => !value)} aria-expanded={roleMenu}><UserRound size={15} /> Porteur <ChevronDown size={14} /></button><AnimatePresence>{roleMenu && <motion.div className="registration-role-menu" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>{roleOptions.map(role => { const Icon = role.icon; return <button key={role.id} className={role.id === 'porteur' ? 'current' : ''} onClick={() => switchRole(role)}><Icon size={15} /><span>{role.label}</span></button>; })}</motion.div>}</AnimatePresence></div><button className="button outline" onClick={skip}>Passer à mon espace <ArrowRight size={15} /></button></div>
        </header>

        <div className="registration-progress"><Progress value={step * 20} tone="forest" /></div>
        <main className="registration-main">
            <section className="wizard-panel">
                <div className="wizard-top"><span>Étape {step} sur 5</span><span>{step * 20}% complété</span></div>
                <div className="wizard-timeline" aria-label="Progression du référencement">{stepMeta.map(({ icon: Icon, label }, index) => <div key={label} className={`wizard-timeline-step ${index + 1 === step ? 'active' : ''} ${index + 1 < step ? 'done' : ''}`}><span><Icon size={15} /></span><small>{label}</small>{index < stepMeta.length - 1 && <i />}</div>)}</div>
                <AnimatePresence mode="wait">
                    <motion.div key={step} className="wizard-step" initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }} transition={{ duration: .24 }}>
                        {step === 1 && <><p className="eyebrow">Faisons connaissance</p><h1>Comment devons-nous vous appeler ?</h1><p className="wizard-lead">Commençons par les informations utiles pour garder le contact.</p><div className="field-grid"><label>Prénom<input value={form.firstName} onChange={event => update({ firstName: event.target.value })} /></label><label>Nom<input value={form.lastName} onChange={event => update({ lastName: event.target.value })} /></label><label>Téléphone<input type="tel" value={form.phone} onChange={event => update({ phone: event.target.value })} /></label><label>Ville ou commune<input value={form.city} onChange={event => update({ city: event.target.value })} /></label></div></>}
                        {step === 2 && <><p className="eyebrow">Votre idée ou activité</p><h1>Quel projet souhaitez-vous faire grandir ?</h1><p className="wizard-lead">Décrivez-le avec vos mots. Il n'est pas nécessaire d'avoir déjà un business plan.</p><div className="field-grid"><label>Nom du projet<input value={form.projectName} onChange={event => update({ projectName: event.target.value })} /></label><label>Secteur d'activité<select value={form.sector} onChange={event => update({ sector: event.target.value })}><option>Agro-industrie</option><option>Numérique</option><option>Artisanat</option><option>Énergie</option><option>Je ne sais pas encore</option></select></label></div><label>Quel problème votre projet cherche-t-il à résoudre ?<textarea rows="3" value={form.problem} onChange={event => update({ problem: event.target.value })} /></label></>}
                        {step === 3 && <><p className="eyebrow">Niveau d'avancement</p><h1>Où en êtes-vous aujourd'hui ?</h1><p className="wizard-lead">Choisissez la situation la plus proche de la vôtre. Cette réponse sert uniquement à personnaliser le parcours.</p><div className="choice-grid single">{stages.map(item => <Choice key={item.value} selected={form.stage === item.value} onClick={() => update({ stage: item.value })}><strong>{item.label}</strong><small>{item.value}</small></Choice>)}</div><Choice selected={form.stage === 'Je ne sais pas encore'} onClick={() => update({ stage: 'Je ne sais pas encore' })}><strong>Je ne sais pas encore</strong><small>La PNPE m'aidera à situer mon projet</small></Choice></>}
                        {step === 4 && <><p className="eyebrow">Besoins immédiats</p><h1>Qu'est-ce qui vous aiderait maintenant ?</h1><p className="wizard-lead">Choisissez une ou plusieurs priorités. Votre conseiller affinera ensuite cette première lecture.</p><div className="choice-grid">{needs.map(need => <Choice key={need} selected={form.needs.includes(need)} onClick={() => toggleNeed(need)}><strong>{need}</strong><small>{need === 'Financement' ? 'Préparer et rechercher des solutions' : `Être orienté sur le besoin ${need.toLowerCase()}`}</small></Choice>)}</div></>}
                        {step === 5 && <><p className="eyebrow">Résumé et orientation</p><h1>Votre premier profil PNPE est prêt.</h1><p className="wizard-lead">Relisez ces informations avant de créer votre espace personnalisé.</p><div className="registration-summary"><div><span>Promotrice</span><strong>{form.firstName} {form.lastName}</strong><small>{form.city} · {form.phone}</small></div><div><span>Projet</span><strong>{form.projectName}</strong><small>{form.sector} · {form.stage}</small></div><div><span>Besoins exprimés</span><strong>{form.needs.join(' · ')}</strong><small>À confirmer avec un conseiller PNPE</small></div></div><div className="orientation-proposal"><Sparkles size={22} /><div><span>Proposition UX de démonstration</span><strong>Orientation initiale : structuration et validation marché</strong><p>Commencez par consolider le modèle économique, puis préparez les preuves nécessaires à la recherche de financement.</p></div></div></>}
                    </motion.div>
                </AnimatePresence>

                <div className="wizard-guidance"><div className="guidance-icon"><Sparkles size={16} /></div><div><strong>Le conseil de la PNPE</strong><p>{guidance[step - 1]}</p></div><button type="button" className="why-button" onClick={() => setShowWhy(value => !value)}><CircleHelp size={15} /> Pourquoi ?</button>{showWhy && <p className="guidance-why">Il s'agit d'une aide de démonstration, pas d'une décision officielle de la PNPE.</p>}</div>
                <div className="wizard-actions"><button className="button outline" disabled={step === 1 || advancing} onClick={() => setStep(current => current - 1)}><ArrowLeft size={16} /> Précédent</button><button className="button primary" disabled={advancing} onClick={next}>{advancing ? <><LoaderCircle className="spin" size={17} /> {step === 5 ? 'Création de votre espace...' : 'Analyse de vos réponses...'}</> : step === 5 ? <><CheckCircle2 size={17} /> Créer mon espace</> : <>Continuer <ArrowRight size={16} /></>}</button></div>
            </section>
        </main>
    </div>;
}