import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleHelp, Clock3, FileText, LoaderCircle, Save, Sparkles, Upload, UserRound } from 'lucide-react';
import { Logo, Progress } from '../../components/ui';
import { useDemoSession } from '../../stores/DemoSessionStore';

const stages = ['Idée', 'Concept', 'Prototype', 'Premières ventes', 'Activité lancée'];
const sectors = ['Agro-industrie', 'Numérique', 'Artisanat', 'Énergie', 'Commerce', 'Services', 'Je ne sais pas encore'];
const needs = ['Formation', 'Accompagnement', 'Équipement', 'Financement', 'Formalités', 'Réseau'];
const steps = [
    { label: 'Identité', guidance: 'Ces informations permettent à la PNPE de garder le contact et de vous orienter vers le bon interlocuteur.' },
    { label: 'Projet', guidance: 'Décrivez votre idée avec des mots simples. Aucun business plan n’est nécessaire à ce stade.' },
    { label: 'Marché', guidance: 'Une première intuition sur vos clients et votre marché suffit. Votre conseiller vous aidera à la préciser.' },
    { label: 'Ressources', guidance: 'Cette étape rend visibles vos forces actuelles et les ressources à mobiliser pour avancer.' },
    { label: 'Besoins', guidance: 'Sélectionnez vos priorités. Les montants et statuts affichés sont des propositions UX de démonstration.' },
    { label: 'Documents', guidance: 'Déposez ce que vous avez déjà. Un document manquant ne doit pas empêcher votre référencement.' },
    { label: 'Validation', guidance: 'Relisez votre dossier avant de le transmettre. Les informations resteront modifiables avec votre conseiller.' },
];

function Field({ label, value, onChange, ...props }) { return <label>{label}<input value={value || ''} onChange={event => onChange(event.target.value)} {...props} /></label>; }
function Choice({ selected, children, onClick }) { return <button type="button" className={`choice-tile ${selected ? 'selected' : ''}`} onClick={onClick}><span className="choice-check">{selected && <Check size={14} />}</span>{children}</button>; }

export function RegistrationWizard() {
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();
    const { session, updateRegistration, saveRegistrationStep, submitRegistration, selectActor } = useDemoSession();
    const form = session.registration;
    const [step, setStep] = useState(form.currentStep || 1);
    const [saved, setSaved] = useState(true);
    const [busy, setBusy] = useState(false);
    const [why, setWhy] = useState(false);
    const [fileState, setFileState] = useState('idle');

    useEffect(() => { saveRegistrationStep(step); }, [step]);
    const update = patch => { setSaved(false); updateRegistration(patch); window.setTimeout(() => setSaved(true), 350); };
    const toggle = (key, value) => update({ [key]: (form[key] || []).includes(value) ? form[key].filter(item => item !== value) : [...(form[key] || []), value] });
    const errors = useMemo(() => {
        const required = { 1: [['firstName', 'Prénom'], ['lastName', 'Nom'], ['phone', 'Téléphone'], ['city', 'Ville ou commune']], 2: [['projectName', 'Nom du projet'], ['sector', 'Secteur'], ['description', 'Description du projet']], 3: [['targetClients', 'Clients ciblés']], 4: [['stage', 'Niveau d’avancement'], ['teamMode', 'Organisation de l’équipe']], 5: [['needs', 'Besoin prioritaire']] }[step] || [];
        return required.filter(([key]) => !form[key] || (Array.isArray(form[key]) && form[key].length === 0));
    }, [form, step]);
    const next = () => {
        if (errors.length) return;
        if (step < 7) { setBusy(true); window.setTimeout(() => { setStep(value => value + 1); setBusy(false); }, reduceMotion ? 0 : 180); return; }
        submitRegistration(); setBusy(true); window.setTimeout(() => navigate('/porteur/projets'), reduceMotion ? 0 : 700);
    };
    const upload = event => { const file = event.target.files?.[0]; if (!file) return; setFileState('analysing'); window.setTimeout(() => { setFileState('received'); update({ documents: [{ name: file.name, status: 'Reçu · démonstration' }] }); }, reduceMotion ? 0 : 900); };

    return <div className="registration-shell">
        <header className="registration-header"><Logo /><div className="registration-meta"><span><Clock3 size={14} /> 8 min estimées</span><span className={saved ? 'saved' : ''}><Save size={14} /> {saved ? 'Sauvegardé' : 'Sauvegarde...'}</span></div><button className="button outline" onClick={() => { selectActor('porteur'); navigate('/porteur'); }}>Quitter et reprendre plus tard <ArrowRight size={15} /></button></header>
        <div className="registration-progress"><Progress value={step * 100 / 7} tone="forest" /></div>
        <main className="registration-main"><section className="wizard-panel">
            <div className="wizard-top"><span>Étape {step} sur 7</span><span>{Math.round(step * 100 / 7)}% complété</span></div>
            <div className="wizard-timeline" aria-label="Progression du référencement">{steps.map((item, index) => <div key={item.label} className={`wizard-timeline-step ${index + 1 === step ? 'active' : ''} ${index + 1 < step ? 'done' : ''}`}><span>{index + 1 < step ? <Check size={15} /> : <UserRound size={15} />}</span><small>{item.label}</small>{index < steps.length - 1 && <i />}</div>)}</div>
            <AnimatePresence mode="wait"><motion.div key={step} className="wizard-step" initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }} transition={{ duration: .2 }}>
                {step === 1 && <><p className="eyebrow">Bienvenue dans votre parcours PNPE</p><h1>Faisons connaissance.</h1><p className="wizard-lead">Ces quelques informations ouvrent votre dossier de référencement.</p><div className="field-grid"><Field label="Prénom *" value={form.firstName} onChange={value => update({ firstName: value })} autoFocus /><Field label="Nom *" value={form.lastName} onChange={value => update({ lastName: value })} /><Field label="Téléphone *" type="tel" value={form.phone} onChange={value => update({ phone: value })} /><Field label="Ville ou commune *" value={form.city} onChange={value => update({ city: value })} /><Field label="Région" value={form.region} onChange={value => update({ region: value })} /></div></>}
                {step === 2 && <><p className="eyebrow">Votre idée ou activité</p><h1>Quel projet voulez-vous faire grandir ?</h1><p className="wizard-lead">Une première description suffit. Vous pourrez enrichir votre dossier plus tard.</p><div className="field-grid"><Field label="Nom du projet *" value={form.projectName} onChange={value => update({ projectName: value })} autoFocus /><label>Secteur d’activité *<select value={form.sector} onChange={event => update({ sector: event.target.value })}><option value="">Choisir un secteur</option>{sectors.map(item => <option key={item}>{item}</option>)}</select></label></div><label>Description du projet *<textarea rows="4" value={form.description} onChange={event => update({ description: event.target.value })} placeholder="Que proposez-vous ? Pour qui ?" /></label></>}
                {step === 3 && <><p className="eyebrow">Votre marché</p><h1>Qui voulez-vous aider ou servir ?</h1><p className="wizard-lead">Même une estimation simple nous aide à préparer votre diagnostic.</p><label>Clients ou bénéficiaires ciblés *<textarea rows="3" value={form.targetClients} onChange={event => update({ targetClients: event.target.value })} autoFocus placeholder="Ex. familles d’Edéa, restaurants, revendeurs..." /></label><div className="field-grid"><Field label="Zone de marché" value={form.marketArea} onChange={value => update({ marketArea: value })} /><Field label="Vos concurrents ou alternatives" value={form.competitors} onChange={value => update({ competitors: value })} /></div></>}
                {step === 4 && <><p className="eyebrow">Votre niveau d’avancement</p><h1>Où en êtes-vous aujourd’hui ?</h1><p className="wizard-lead">Il n’y a pas de mauvaise réponse. Votre parcours s’adaptera à votre réalité.</p><div className="choice-grid single">{stages.map(item => <Choice key={item} selected={form.stage === item} onClick={() => update({ stage: item })}><strong>{item}</strong><small>Je me reconnais dans cette situation</small></Choice>)}</div><label>Comment votre équipe est-elle organisée ? *<select value={form.teamMode} onChange={event => update({ teamMode: event.target.value })}><option value="">Choisir une réponse</option><option>Je porte le projet seul(e)</option><option>Une petite équipe est déjà mobilisée</option><option>Une équipe existe et doit être renforcée</option></select></label></>}
                {step === 5 && <><p className="eyebrow">Vos besoins immédiats</p><h1>Qu’est-ce qui vous aiderait maintenant ?</h1><p className="wizard-lead">Choisissez une ou plusieurs priorités à partager avec votre conseiller.</p><div className="choice-grid">{needs.map(item => <Choice key={item} selected={(form.needs || []).includes(item)} onClick={() => toggle('needs', item)}><strong>{item}</strong><small>À confirmer avec la PNPE</small></Choice>)}</div><div className="field-grid"><Field label="Montant recherché" type="number" value={form.fundingAmount} onChange={value => update({ fundingAmount: value })} placeholder="Ex. 15000000" /><Field label="Utilisation principale" value={form.fundUse} onChange={value => update({ fundUse: value })} /></div></>}
                {step === 6 && <><p className="eyebrow">Pièces et preuves</p><h1>Ajoutez ce que vous avez déjà.</h1><p className="wizard-lead">Le référencement reste possible sans document. Les statuts affichés sont des propositions UX de démonstration.</p><label className="upload-zone"><Upload size={23} /><strong>{fileState === 'analysing' ? 'Analyse documentaire...' : fileState === 'received' ? 'Document reçu' : 'Déposer un Business Plan ou un document'}</strong><small>{fileState === 'received' ? form.documents?.[0]?.name : 'PDF, Word ou image · optionnel'}</small><input type="file" onChange={upload} /></label><div className="registration-summary"><div><FileText size={18} /><span>Pièce d’identité</span><small>À compléter avec votre conseiller</small></div><div><FileText size={18} /><span>Business Plan</span><small>{fileState === 'received' ? 'Reçu · démonstration' : 'Optionnel à cette étape'}</small></div></div></>}
                {step === 7 && <><p className="eyebrow">Dernière vérification</p><h1>Votre référencement est prêt.</h1><p className="wizard-lead">Relisez les éléments essentiels avant de créer votre dossier projet.</p><div className="registration-summary"><div><span>Porteur</span><strong>{form.firstName} {form.lastName}</strong><small>{form.city} · {form.phone}</small></div><div><span>Projet</span><strong>{form.projectName || 'À compléter'}</strong><small>{form.sector || 'Secteur à qualifier'} · {form.stage || 'Stade à préciser'}</small></div><div><span>Besoins</span><strong>{form.needs?.join(' · ') || 'À préciser'}</strong><small>Lecture initiale à confirmer avec un conseiller</small></div></div><div className="orientation-proposal"><Sparkles size={22} /><div><span>Proposition UX de démonstration</span><strong>Votre prochaine étape : diagnostic et structuration du modèle économique.</strong><p>La soumission crée un projet local et vous ouvre son cockpit.</p></div></div></>}
            </motion.div></AnimatePresence>
            {errors.length > 0 && <div className="form-error" role="alert">Il manque : {errors.map(([, label]) => label).join(', ')}.</div>}
            <div className="wizard-guidance"><div className="guidance-icon"><Sparkles size={16} /></div><div><strong>Le conseil de la PNPE</strong><p>{steps[step - 1].guidance}</p></div><button type="button" className="why-button" onClick={() => setWhy(value => !value)}><CircleHelp size={15} /> Pourquoi ?</button>{why && <p className="guidance-why">Aide de démonstration, sans décision automatique ni analyse IA réelle.</p>}</div>
            <div className="wizard-actions"><button className="button outline" disabled={step === 1 || busy} onClick={() => setStep(value => Math.max(1, value - 1))}><ArrowLeft size={16} /> Précédente</button><button className="button primary" disabled={busy} onClick={next}>{busy ? <><LoaderCircle className="spin" size={17} /> Traitement...</> : step === 7 ? <><CheckCircle2 size={17} /> Soumettre mon référencement</> : <>Continuer <ArrowRight size={16} /></>}</button></div>
        </section></main>
    </div>;
}