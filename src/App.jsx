import React from 'react';
import { Navigate, Route, Routes, Link } from 'react-router-dom';
import { ArrowRight, Building2, Check, Sparkles, Users } from 'lucide-react';
import { BeneficiaryDashboard } from './features/beneficiary/BeneficiaryDashboard';
import { RoleSelector } from './features/role-selector/RoleSelector';
import { RegistrationWizard } from './features/onboarding/RegistrationWizard';
import { PartnerDashboard } from './features/partner/PartnerDashboard';
import { DemoControls } from './components/DemoControls';
import { DemoSessionProvider } from './stores/DemoSessionStore';
import { CourseDetailPage, CoursesPage, PassportPage } from './features/training/TrainingExperience';
import { PageHeader, Panel, Progress, Shell, Status } from './components/ui';
import { journeyStages, projects } from './data/demoUniverse';
import { formatFcfa } from './services/mockService';

function JourneyPage() {
    return <Shell><PageHeader eyebrow="Mon parcours" title="Chaque étape compte." description="Votre feuille de route PNPE relie diagnostic, formation, accompagnement et opportunités." /><Panel title="AgroFresh Cameroun" subtitle="Parcours de démonstration"><div className="roadmap-list">{journeyStages.map((stage, index) => <div className={`roadmap-row ${index === 4 ? 'current' : ''}`} key={stage.id}><span className="roadmap-check">{index < 4 ? <Check size={14} /> : index + 1}</span><div><strong>{stage.label}</strong><p>{index < 4 ? 'Étape validée dans votre dossier' : index === 4 ? 'Validation marché · en cours' : 'À venir dans votre parcours'}</p></div><Status tone={index < 4 ? 'green' : index === 4 ? 'terracotta' : 'muted'}>{index < 4 ? 'Terminé' : index === 4 ? 'En cours' : 'À venir'}</Status></div>)}</div></Panel></Shell>;
}

function ProjectsPage() {
    return <Shell role="partenaire"><PageHeader eyebrow="Banque de projets PNPE" title="Des projets accompagnés, rendus visibles." description="Un portefeuille structuré pour faciliter le sourcing, les partenariats et l'accès aux opportunités." action={<Link className="button primary" to="/partenaire"><Sparkles size={16} /> Voir le matching</Link>} /><div className="project-grid">{projects.map(project => <Link to={`/partenaire/projets/${project.id}`} className="project-card" key={project.id}><div className="project-cover"><span>{project.sector}</span><span className="cover-pattern">{project.name.slice(0, 2).toUpperCase()}</span></div><div className="project-body"><div className="project-title"><h3>{project.name}</h3></div><p>{project.description}</p><div className="project-meta"><span>{project.city}, {project.region}</span><Status tone="green">{project.status}</Status></div><div className="project-foot"><span><strong>{project.maturity}</strong>/100 maturité</span><span>{formatFcfa(project.amount)}</span></div><Progress value={project.maturity} /></div></Link>)}</div></Shell>;
}

function ProjectDetail({ role = 'partenaire' }) {
    const project = projects[0];
    const isBeneficiary = role === 'porteur';
    return <Shell role={role}><Link to={isBeneficiary ? '/porteur' : '/partenaire/projets'} className="back-link">← {isBeneficiary ? 'Retour au cockpit' : 'Retour à la banque de projets'}</Link><div className="detail-head"><div><Status tone="green">{project.status} · proposition UX</Status><h1>{project.name}</h1><p>{project.description}</p><div className="detail-meta"><span>{project.owner}</span><span>{project.city}, {project.region}</span><span>{project.sector}</span></div></div></div><div className="detail-grid"><Panel title={isBeneficiary ? 'Mon projet' : 'Profil du projet'} subtitle="Informations structurantes"><div className="profile-facts"><div><span>Besoin principal</span><strong>{project.need}</strong></div><div><span>Montant recherché</span><strong>{formatFcfa(project.amount)}</strong></div><div><span>Emplois potentiels</span><strong>{project.jobs}</strong></div><div><span>Maturité proposée</span><strong>{project.maturity}/100</strong></div></div></Panel><Panel title="Preuves du parcours" subtitle={isBeneficiary ? 'Eléments ajoutés à votre passeport' : 'Eléments rendus visibles au partenaire'}><div className="proof-list"><span><Check size={15} /> Diagnostic réalisé</span><span><Check size={15} /> 4 formations complétées</span><span><Check size={15} /> 3 certificats associés</span></div>{!isBeneficiary && <button className="button primary full">Demander une mise en relation <ArrowRight size={16} /></button>}</Panel></div></Shell>;
}

function SimpleRolePage({ role, title, description, icon: Icon }) {
    return <Shell role={role}><PageHeader eyebrow={`Espace ${role} · données de démonstration`} title={title} description={description} /><Panel title="Prochaine scène de démonstration" subtitle="Cette entrée est prête pour le prochain lot fonctionnel."><div className="empty-role-state"><div><Icon size={25} /><h2>Votre espace est identifié.</h2><p>Les données, filtres et actions métier seront raccordés ici au prochain lot. Le scénario reste entièrement local et rejouable.</p><Link to="/" className="button outline">Revenir au sélecteur <ArrowRight size={16} /></Link></div></div></Panel></Shell>;
}

function AppRoutes() {
    return <><Routes>
        <Route path="/" element={<RoleSelector />} />
        <Route path="/porteur/referencement" element={<RegistrationWizard />} />
        <Route path="/porteur" element={<BeneficiaryDashboard />} />
        <Route path="/porteur/parcours" element={<JourneyPage />} />
        <Route path="/porteur/formations" element={<CoursesPage />} />
        <Route path="/porteur/formations/:id" element={<CourseDetailPage />} />
        <Route path="/porteur/passeport" element={<PassportPage />} />
        <Route path="/porteur/opportunites" element={<BeneficiaryDashboard />} />
        <Route path="/porteur/*" element={<BeneficiaryDashboard />} />
        <Route path="/conseiller" element={<SimpleRolePage role="conseiller" title="Votre file de travail." description="Priorisez les porteurs qui nécessitent une intervention aujourd'hui." icon={Users} />} />
        <Route path="/conseiller/*" element={<SimpleRolePage role="conseiller" title="Porteurs accompagnés" description="Retrouvez les dossiers et les prochaines actions de votre portefeuille." icon={Users} />} />
        <Route path="/partenaire" element={<PartnerDashboard />} />
        <Route path="/partenaire/projets" element={<ProjectsPage />} />
        <Route path="/partenaire/projets/:id" element={<ProjectDetail />} />
        <Route path="/partenaire/*" element={<PartnerDashboard />} />
        <Route path="/direction" element={<SimpleRolePage role="direction" title="L'impact de la PNPE, en un regard." description="Une lecture consolidée des parcours, territoires et résultats de démonstration." icon={Building2} />} />
        <Route path="/direction/*" element={<SimpleRolePage role="direction" title="Cockpit d'impact PNPE" description="Pilotez le pipeline et les cohortes depuis une même vue." icon={Building2} />} />
        <Route path="/projets" element={<ProjectsPage />} />
        <Route path="/projets/:id" element={<ProjectDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes><DemoControls /></>;
}

export default function App() {
    return <DemoSessionProvider><AppRoutes /></DemoSessionProvider>;
}