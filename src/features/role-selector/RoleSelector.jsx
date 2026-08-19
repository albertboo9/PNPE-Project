import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, CircleDollarSign, Compass, FileText, Sparkles, Users } from 'lucide-react';
import { Logo } from '../../components/ui';
import { useDemoSession } from '../../stores/DemoSessionStore';

const actors = [
    {
        id: 'porteur',
        title: 'Porteur de projet',
        mission: 'Je veux structurer mon idée',
        description: 'Un référencement guidé, puis un espace qui indique chaque prochaine étape.',
        image: '/assets/porteur-marie.jpg',
        icon: Compass,
        metric: '5 étapes guidées',
        route: '/porteur/referencement',
        tone: 'coral',
    },
    {
        id: 'conseiller',
        title: 'Conseiller PNPE',
        mission: "J'accompagne les porteurs au quotidien",
        description: 'Une file de travail priorisée pour intervenir au bon moment, avec le bon contexte.',
        image: '/assets/conseiller-equipe.jpg',
        icon: Users,
        metric: '42 porteurs suivis',
        route: '/conseiller',
        tone: 'lagoon',
    },
    {
        id: 'partenaire',
        title: 'Partenaire / financeur',
        mission: 'Je cherche des projets qualifiés',
        description: 'Des projets lisibles, filtrables et rapprochés de besoins concrets.',
        image: '/assets/partenaire-reunion.jpg',
        icon: CircleDollarSign,
        metric: '74 projets matures',
        route: '/partenaire',
        tone: 'sun',
    },
    {
        id: 'direction',
        title: 'Direction PNPE',
        mission: "Je pilote l'impact de la PNPE",
        description: 'Une lecture consolidée des parcours, territoires, cohortes et résultats.',
        image: '/assets/direction-pilotage.jpg',
        icon: Building2,
        metric: '1 248 porteurs',
        route: '/direction',
        tone: 'forest',
    },
];

export function RoleSelector() {
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();
    const { selectActor, session } = useDemoSession();
    const [selected, setSelected] = useState(null);

    const openActor = (actor) => {
        setSelected(actor.id);
        selectActor(actor.id);
        globalThis.setTimeout(() => navigate(actor.route), reduceMotion ? 0 : 280);
    };

    return <main className="role-selector">
        <header className="control-header">
            <Logo />
            <span className="prototype-badge"><span /> Prototype de démonstration</span>
        </header>

        <section className="control-intro">
            <div>
                <p className="eyebrow">PNPE Control Room · Édéa</p>
                <h1>Choisissez une perspective<br />pour explorer la plateforme.</h1>
            </div>
            <p>Un même parcours, quatre lectures complémentaires de la transformation d'une idée en entreprise créatrice de valeur.</p>
        </section>

        <div className="actor-grid">
            <AnimatePresence>
                {actors.map((actor, index) => {
                    const Icon = actor.icon;
                    return <motion.article
                        layoutId={`actor-${actor.id}`}
                        className={`actor-card ${actor.tone} ${selected === actor.id ? 'selected' : ''}`}
                        key={actor.id}
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                        animate={{ opacity: selected && selected !== actor.id ? .35 : 1, y: 0 }}
                        transition={{ delay: reduceMotion ? 0 : index * .06 }}
                    >
                        <div className="actor-image"><img src={actor.image} alt="" /><span><Icon size={18} /></span></div>
                        <div className="actor-content">
                            <div className="actor-meta"><span>{actor.metric}</span><span>0{index + 1}</span></div>
                            <h2>{actor.title}</h2>
                            <strong>{actor.mission}</strong>
                            <p>{actor.description}</p>
                            <button onClick={() => openActor(actor)} aria-label={`Explorer comme ${actor.title}`}>
                                Explorer cette perspective <ArrowRight size={17} />
                            </button>
                        </div>
                    </motion.article>;
                })}
            </AnimatePresence>
        </div>

        <footer className="control-footer">
            <button className="button primary" onClick={() => openActor(actors[0])}><Sparkles size={17} /> Lancer la visite guidée</button>
            {session.registrationCompleted && <button className="button outline" onClick={() => { selectActor('porteur'); navigate('/porteur'); }}>Revoir l’espace de Marie <ArrowRight size={16} /></button>}
            <a href="/docs/PNPE-REPRISE-CONTEXTE-IMPLEMENTATION.md" target="_blank" rel="noreferrer" className="control-doc"><FileText size={15} /> Documentation de démonstration</a>
        </footer>
    </main>;
}