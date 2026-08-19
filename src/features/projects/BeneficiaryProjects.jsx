import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, BriefcaseBusiness, Check, FileText, Plus, Sparkles, Target, Users } from 'lucide-react';
import { PageHeader, Panel, Progress, Shell, Status } from '../../components/ui';
import { useDemoSession } from '../../stores/DemoSessionStore';

const formatFcfa = value => new Intl.NumberFormat('fr-FR').format(Number(value || 0)) + ' FCFA';

export function BeneficiaryProjectsPage() {
    const { session } = useDemoSession();
    return <Shell><PageHeader eyebrow="Portefeuille entrepreneur" title="Mes projets" description="Retrouvez vos projets référencés, leur niveau de préparation et la prochaine action proposée." action={<Link className="button primary" to="/porteur/referencement"><Plus size={16} /> Référencer un nouveau projet</Link>} />
        <div className="project-grid">{session.projects.map(project => <Link to={`/porteur/projets/${project.id}`} className="project-card" key={project.id}><div className="project-cover"><span>{project.sector}</span><span className="cover-pattern">{project.name.slice(0, 2).toUpperCase()}</span></div><div className="project-body"><div className="project-title"><h3>{project.name}</h3><Status tone={project.status === 'Soumis' ? 'terracotta' : 'green'}>{project.status}</Status></div><p>{project.description}</p><div className="project-meta"><span>{project.city}, {project.region}</span><span>{project.need}</span></div><div className="project-foot"><span><strong>{project.maturity}</strong>/100 maturité proposée</span><span>{formatFcfa(project.fundingNeed)}</span></div><Progress value={project.maturity} /></div></Link>)}</div>
    </Shell>;
}

export function BeneficiaryProjectCockpit() {
    const { id } = useParams();
    const { session } = useDemoSession();
    const project = session.projects.find(item => item.id === id) || session.projects[0];
    if (!project) return <Shell><Panel title="Projet introuvable"><Link to="/porteur/projets" className="button outline">Retour à mes projets</Link></Panel></Shell>;
    const recent = project.status === 'Soumis';
    return <Shell><Link to="/porteur/projets" className="back-link">← Retour à mes projets</Link><PageHeader eyebrow="Cockpit projet · proposition UX" title={project.name} description={`${project.sector} · ${project.city}, ${project.region}`} action={<Status tone={recent ? 'terracotta' : 'green'}>{project.status}</Status>} />
        <section className="project-cockpit-hero"><div><span className="eyebrow">Prochaine action recommandée</span><h2>{recent ? 'Planifier votre diagnostic initial avec la PNPE' : 'Consolider votre validation marché'}</h2><p>{recent ? 'Votre dossier a bien été reçu. Un conseiller doit maintenant confirmer votre niveau de maturité et les preuves prioritaires.' : 'Ajoutez trois entretiens clients et finalisez les hypothèses du Business Model Canvas.'}</p><Link className="button primary" to="/porteur/parcours">Voir mon plan d’action <ArrowRight size={16} /></Link></div><div className="score-ring" style={{ '--score': `${project.maturity * 3.6}deg` }}><div><strong>{project.maturity}</strong><span>/100</span></div></div></section>
        <div className="detail-grid"><Panel title="Vue d’ensemble" subtitle="Informations issues du référencement"><div className="profile-facts"><div><span>Besoin principal</span><strong>{project.need}</strong></div><div><span>Financement recherché</span><strong>{formatFcfa(project.fundingNeed)}</strong></div><div><span>Emplois actuels / potentiels</span><strong>{project.jobs || 'À qualifier'}</strong></div><div><span>Maturité proposée</span><strong>{project.maturity}/100</strong></div></div></Panel><Panel title="Préparation du dossier" subtitle="Preuves à consolider"><div className="proof-list"><span><Check size={15} /> Référencement transmis</span><span><FileText size={15} /> Diagnostic initial à confirmer</span><span><Target size={15} /> Marché et modèle économique à préciser</span></div></Panel></div>
        <div className="project-cockpit-modules"><Panel title="Parcours" subtitle="De l’idée à l’entreprise"><Progress value={recent ? 24 : 62} /><p>{recent ? 'Référencement terminé · diagnostic à venir' : 'Validation marché en cours'}</p></Panel><Panel title="Compétences" subtitle="Capital humain du projet"><div className="empty-role-state"><Users size={22} /><strong>{project.details?.teamMode || 'Équipe à qualifier'}</strong><p>La PNPE vous aide à identifier les compétences manquantes.</p></div></Panel><Panel title="Opportunités" subtitle="Matching explicable"><div className="empty-role-state"><Sparkles size={22} /><strong>{recent ? 'En attente de qualification' : '3 opportunités compatibles'}</strong><p>Les suggestions apparaissent après validation du diagnostic.</p></div></Panel><Panel title="Financement" subtitle="Préparation progressive"><div className="empty-role-state"><BriefcaseBusiness size={22} /><strong>{formatFcfa(project.fundingNeed)}</strong><p>Montant déclaré, à confirmer avec le conseiller PNPE.</p></div></Panel></div>
    </Shell>;
}