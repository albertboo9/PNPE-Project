import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Award, Check, Clock3, ExternalLink, FileCheck2, Filter, GraduationCap, LayoutGrid, PlayCircle, Search, ShieldCheck, Star, Users } from 'lucide-react';
import { ErrorState, PageSkeleton } from '../../components/AsyncState';
import { PageHeader, Panel, Progress, Shell, Status } from '../../components/ui';
import { usePnpeResource } from '../../hooks/usePnpeResource';
import { pnpeService } from '../../services/mockService';
import { useDemoSession } from '../../stores/DemoSessionStore';
import { courses, demoBeneficiary } from '../../data/demoUniverse';

const categories = ['Toutes', 'Entrepreneuriat', 'Finance', 'Commercial', 'Qualité', 'Formalités', 'Opérations'];

function courseState(course, session) {
    if (session.completedCourses.includes(course.id)) return { label: 'Certifiée', tone: 'gold', progress: 100 };
    if (session.enrolledCourses.includes(course.id)) return { label: course.progress ? 'En cours' : 'Inscrite', tone: 'green', progress: course.progress };
    return { label: course.recommended ? 'Recommandée' : 'Disponible', tone: course.recommended ? 'blue' : 'muted', progress: 0 };
}

function CourseCard({ course, index }) {
    const { session } = useDemoSession();
    const state = courseState(course, session);
    return <motion.article className="training-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .035 }}>
        <Link to={`/porteur/formations/${course.id}`} className="training-cover" aria-label={`Voir ${course.title}`}>
            <img src={course.image} alt="" />
            <span className="training-category">{course.category}</span>
            {course.recommended && <span className="training-recommended"><Star size={12} fill="currentColor" /> Pour votre projet</span>}
        </Link>
        <div className="training-body">
            <div className="training-status"><Status tone={state.tone}>{state.label}</Status><span>{course.price === 0 ? 'Gratuit' : `${course.price.toLocaleString('fr-FR')} FCFA`}</span></div>
            <Link to={`/porteur/formations/${course.id}`}><h3>{course.title}</h3></Link>
            <p>{course.description}</p>
            <div className="training-meta"><span><Clock3 size={13} /> {course.duration}</span><span><LayoutGrid size={13} /> {course.format}</span><span><Star size={13} /> {course.rating}</span></div>
            {state.progress > 0 && <div className="training-progress"><div><span>Progression</span><strong>{state.progress}%</strong></div><Progress value={state.progress} tone={course.color === 'gold' ? 'gold' : 'forest'} /></div>}
            <Link className={`button ${session.enrolledCourses.includes(course.id) ? 'outline' : 'primary'} full`} to={`/porteur/formations/${course.id}`}>
                {session.completedCourses.includes(course.id) ? 'Voir le certificat' : session.enrolledCourses.includes(course.id) ? 'Reprendre la formation' : 'Voir la formation'} <ArrowRight size={15} />
            </Link>
        </div>
    </motion.article>;
}

export function CoursesPage() {
    const [category, setCategory] = useState('Toutes');
    const [query, setQuery] = useState('');
    const [level, setLevel] = useState('Tous niveaux');
    const [format, setFormat] = useState('Tous formats');
    const resource = usePnpeResource(pnpeService.getCourses, []);
    const { session } = useDemoSession();
    const visible = useMemo(() => (resource.data || []).filter(course => {
        if (category !== 'Toutes' && course.category !== category) return false;
        if (level !== 'Tous niveaux' && course.level !== level) return false;
        if (format !== 'Tous formats' && course.format !== format) return false;
        return `${course.title} ${course.instructor} ${course.category}`.toLocaleLowerCase('fr').includes(query.toLocaleLowerCase('fr'));
    }), [resource.data, category, query, level, format]);

    if (resource.status === 'loading') return <Shell><PageSkeleton label="Chargement du catalogue de formations" /></Shell>;
    if (resource.status === 'error') return <Shell><ErrorState error={resource.error} onRetry={resource.reload} /></Shell>;

    const active = resource.data.filter(course => session.enrolledCourses.includes(course.id) && !session.completedCourses.includes(course.id));
    return <Shell><PageHeader eyebrow="Académie PNPE" title="Développez les compétences qui font avancer votre projet." description="Un catalogue orienté action : choisissez une compétence, apprenez sur le campus et ajoutez la preuve à votre Passeport Entrepreneur." action={<a href="https://campus.studieslearning.com" target="_blank" rel="noreferrer" className="button outline"><GraduationCap size={16} /> Ouvrir le campus <ExternalLink size={14} /></a>} />
        <section className="academy-overview">
            <div><span className="eyebrow">Votre apprentissage</span><h2>{active.length} formation{active.length > 1 ? 's' : ''} en cours</h2><p>Votre prochaine compétence recommandée concerne la qualité et le packaging agroalimentaire.</p></div>
            <div className="academy-metric"><strong>68%</strong><Progress value={68} /><span>Score de formation</span></div>
            <div className="academy-metric"><strong>{session.certificates.length}</strong><span>Certificat{session.certificates.length > 1 ? 's' : ''} dans le passeport</span></div>
        </section>
        {active.length > 0 && <section className="continue-learning"><div className="section-heading"><div><span className="eyebrow">Continuer</span><h2>Reprenez là où vous vous êtes arrêtée</h2></div></div><div className="continue-grid">{active.map(course => <Link key={course.id} to={`/porteur/formations/${course.id}`} className="continue-card"><img src={course.image} alt="" /><div><Status tone="green">En cours</Status><h3>{course.title}</h3><div className="training-progress"><div><span>Progression</span><strong>{course.progress}%</strong></div><Progress value={course.progress} /></div></div><PlayCircle size={28} /></Link>)}</div></section>}
        <section className="academy-library">
            <div className="section-heading"><div><span className="eyebrow">Médiathèque de compétences</span><h2>Explorer toutes les formations</h2></div><span>{visible.length} résultat{visible.length > 1 ? 's' : ''}</span></div>
            <div className="academy-tools"><label className="search-input"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Rechercher une compétence, un formateur..." /></label><select aria-label="Niveau" value={level} onChange={event => setLevel(event.target.value)}><option>Tous niveaux</option><option>Débutant</option><option>Fondamentaux</option><option>Intermédiaire</option><option>Avancé</option></select><select aria-label="Format" value={format} onChange={event => setFormat(event.target.value)}><option>Tous formats</option><option>En ligne</option><option>Hybride</option><option>Présentiel</option></select></div>
            <div className="category-tabs" role="tablist" aria-label="Catégories de formations">{categories.map(item => <button role="tab" aria-selected={category === item} key={item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
            {visible.length ? <div className="training-grid">{visible.map((course, index) => <CourseCard key={course.id} course={course} index={index} />)}</div> : <div className="academy-empty"><Filter size={24} /><h3>Aucune formation ne correspond à ces filtres.</h3><button className="button outline" onClick={() => { setCategory('Toutes'); setLevel('Tous niveaux'); setFormat('Tous formats'); setQuery(''); }}>Réinitialiser les filtres</button></div>}
        </section>
        <Panel title="Du catalogue au passeport" subtitle="Chaîne de démonstration PNPEKIT → campus e-learning → preuve métier"><div className="moodle-chain">{['Découverte', 'Inscription', 'Campus Moodle', 'Évaluation', 'Certificat', 'Passeport'].map((item, index) => <div key={item}><span>{index + 1}</span>{item}{index < 5 && <ArrowRight size={14} />}</div>)}</div></Panel>
    </Shell>;
}

export function CourseDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { session, enrollCourse, completeCourse } = useDemoSession();
    const resource = usePnpeResource(() => pnpeService.getCourse(id), [id]);
    const [busy, setBusy] = useState(false);
    if (resource.status === 'loading') return <Shell><PageSkeleton label="Chargement de la formation" /></Shell>;
    if (resource.status === 'error') return <Shell><ErrorState error={resource.error} onRetry={resource.reload} /></Shell>;
    const course = resource.data;
    const state = courseState(course, session);
    const enrolled = session.enrolledCourses.includes(course.id);
    const completed = session.completedCourses.includes(course.id);
    const certificate = session.certificates.find(item => item.courseId === course.id);

    const enroll = () => { enrollCourse(course.id); };
    const finish = async () => {
        setBusy(true);
        await pnpeService.completeTraining(course.id);
        completeCourse(course.id);
        setBusy(false);
    };
    return <Shell><button className="back-button" onClick={() => navigate('/porteur/formations')}><ArrowLeft size={15} /> Retour aux formations</button>
        <section className="course-detail-hero"><img src={course.image} alt="" /><div className="course-detail-overlay"><Status tone={state.tone}>{state.label}</Status><span className="eyebrow">{course.category}</span><h1>{course.title}</h1><p>{course.description}</p><div className="course-detail-meta"><span><Clock3 size={15} /> {course.duration}</span><span><LayoutGrid size={15} /> {course.format}</span><span><Users size={15} /> {course.students} apprenants</span><span><Star size={15} fill="currentColor" /> {course.rating}</span></div></div></section>
        <div className="course-detail-grid"><div className="course-main"><Panel title="Ce que vous saurez faire" subtitle="Compétences ajoutées à votre parcours"><div className="outcome-list">{course.outcomes.map(item => <span key={item}><Check size={16} /> {item}</span>)}</div></Panel><Panel title="Programme" subtitle={`${course.modules.length} modules · évaluation incluse`}><div className="module-list">{course.modules.map((module, index) => <div key={module}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{module}</strong><small>{index === course.modules.length - 1 ? 'Quiz final et mise en pratique' : 'Cours, exemple camerounais et exercice'}</small></div>{completed || state.progress > (index + 1) * 20 ? <Check size={17} /> : <PlayCircle size={17} />}</div>)}</div></Panel></div>
            <aside className="course-enrollment"><div><span className="eyebrow">Accès à la formation</span><strong>{course.price === 0 ? 'Gratuit' : `${course.price.toLocaleString('fr-FR')} FCFA`}</strong><p>{course.instructor}<br />{course.level} · certificat PNPE</p></div>{state.progress > 0 && <div className="training-progress"><div><span>Votre progression</span><strong>{state.progress}%</strong></div><Progress value={state.progress} /></div>}
                {!enrolled && <button className="button primary full" onClick={enroll}>S'inscrire à la formation <ArrowRight size={16} /></button>}
                {enrolled && !completed && <><a className="button primary full" href="https://campus.studieslearning.com" target="_blank" rel="noreferrer">Ouvrir le campus <ExternalLink size={15} /></a><button className="button outline full" onClick={finish} disabled={busy}>{busy ? 'Validation...' : 'Simuler la fin de formation'} <Award size={15} /></button></>}
                {completed && <div className="certificate-card"><Award size={27} /><span>Certificat obtenu</span><strong>{certificate?.id}</strong><small>Délivré le {certificate?.issuedAt}</small><Link to="/porteur/passeport" className="button outline full">Voir dans mon passeport <ArrowRight size={15} /></Link></div>}
                <small className="ux-proposal">Paiement, éligibilité et certificat : proposition UX de démonstration.</small>
            </aside></div>
    </Shell>;
}

export function PassportPage() {
    const { session } = useDemoSession();
    const proofs = session.certificates.map(certificate => ({ ...certificate, course: courses.find(course => course.id === certificate.courseId) })).filter(item => item.course);
    return <Shell><PageHeader eyebrow="Passeport Entrepreneur" title="Les preuves qui rendent votre projet crédible." description="Identité, maturité, compétences et certificats sont réunis dans un dossier partageable avec les conseillers et partenaires PNPE." action={<button className="button outline"><FileCheck2 size={16} /> Exporter le passeport</button>} />
        <section className="passport-banner"><div className="passport-identity"><div className="passport-avatar">MN</div><div><span className="eyebrow">Passeport vérifié · démonstration</span><h2>{demoBeneficiary.fullName}</h2><p>{demoBeneficiary.project} · {demoBeneficiary.city}, {demoBeneficiary.region}</p></div></div><div className="passport-score"><strong>{demoBeneficiary.maturity}</strong><span>/100 maturité proposée</span></div><ShieldCheck size={42} /></section>
        <div className="passport-grid"><Panel title="Profil du projet" subtitle="Informations structurantes"><div className="profile-facts"><div><span>Secteur</span><strong>{demoBeneficiary.sector}</strong></div><div><span>Étape actuelle</span><strong>{demoBeneficiary.maturityLabel}</strong></div><div><span>Besoin principal</span><strong>{demoBeneficiary.need}</strong></div><div><span>Emplois potentiels</span><strong>{demoBeneficiary.potentialJobs}</strong></div></div></Panel><Panel title="Preuves validées" subtitle={`${proofs.length} certificat${proofs.length > 1 ? 's' : ''} issu${proofs.length > 1 ? 's' : ''} du parcours de formation`}><div className="passport-certificates">{proofs.map(item => <Link to={`/porteur/formations/${item.courseId}`} className="passport-certificate" key={item.id}><img src={item.course.image} alt="" /><Award size={21} /><div><strong>{item.course.title}</strong><span>{item.id}</span><small>Délivré le {item.issuedAt}</small></div><ArrowRight size={16} /></Link>)}</div></Panel></div>
        <Panel title="Historique des preuves" subtitle="Les événements qui renforcent le dossier"><div className="proof-timeline"><div><Check size={15} /><span><strong>Diagnostic initial complété</strong><small>Profil et besoins confirmés avec la PNPE</small></span></div>{proofs.map(item => <div key={item.id}><Award size={15} /><span><strong>Certificat ajouté · {item.course.title}</strong><small>{item.issuedAt} · preuve de démonstration</small></span></div>)}</div></Panel>
    </Shell>;
}