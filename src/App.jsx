import React from 'react';
import { Navigate, Route, Routes, Link, useParams } from 'react-router-dom';
import { ArrowRight, Building2, Check, Sparkles, Users } from 'lucide-react';
import { BeneficiaryDashboard } from './features/beneficiary/BeneficiaryDashboard';
import { BeneficiaryJourneyPage } from './features/beneficiary/BeneficiaryJourney';
import { BeneficiaryOpportunitiesPage } from './features/beneficiary/BeneficiaryOpportunities';
import { RoleSelector } from './features/role-selector/RoleSelector';
import { RegistrationWizard } from './features/onboarding/RegistrationWizard';
import { PartnerDashboard } from './features/partner/PartnerDashboard';
import { DemoControls } from './components/DemoControls';
import { DemoSessionProvider } from './stores/DemoSessionStore';
import { CourseDetailPage, CoursesPage, PassportPage } from './features/training/TrainingExperience';
import { PageHeader, Panel, Progress, Shell, Status } from './components/ui';
import { journeyStages, projects } from './data/demoUniverse';
import { formatFcfa } from './services/mockService';
import { AdvisorCasePage, AdvisorDashboard } from './features/advisor/AdvisorExperience';
import { DirectionDashboard } from './features/direction/DirectionExperience';
import { AdvisorActionsPage, AdvisorAlertsPage, AdvisorApplicationsPage, AdvisorBeneficiariesPage, AdvisorMeetingsPage, AdvisorTrainingPage } from './features/advisor/AdvisorWorkspace';
import { PartnerConnectionsPage, PartnerMatchingPage, PartnerOpportunitiesPage, PartnerProjectActions, PartnerProjectsPage } from './features/partner/PartnerWorkspace';
import { DirectionCohortsPage, DirectionImpactPage, DirectionPipelinePage, DirectionSectorsPage, DirectionTerritoriesPage, DirectionVigilancePage } from './features/direction/DirectionWorkspace';
import { BeneficiaryProjectCockpit, BeneficiaryProjectsPage } from './features/projects/BeneficiaryProjects';

function JourneyPage() {
    return <Shell><PageHeader eyebrow="Mon parcours" title="Chaque étape compte." description="Votre feuille de route PNPE relie diagnostic, formation, accompagnement et opportunités." /><Panel title="AgroFresh Cameroun" subtitle="Parcours de démonstration"><div className="roadmap-list">{journeyStages.map((stage, index) => <div className={`roadmap-row ${index === 4 ? 'current' : ''}`} key={stage.id}><span className="roadmap-check">{index < 4 ? <Check size={14} /> : index + 1}</span><div><strong>{stage.label}</strong><p>{index < 4 ? 'Étape validée dans votre dossier' : index === 4 ? 'Validation marché · en cours' : 'À venir dans votre parcours'}</p></div><Status tone={index < 4 ? 'green' : index === 4 ? 'terracotta' : 'muted'}>{index < 4 ? 'Terminé' : index === 4 ? 'En cours' : 'À venir'}</Status></div>)}</div></Panel></Shell>;
}

function ProjectsPage() {
    return <Shell role="partenaire"><PageHeader eyebrow="Banque de projets PNPE" title="Des projets accompagnés, rendus visibles." description="Un portefeuille structuré pour faciliter le sourcing, les partenariats et l'accès aux opportunités." action={<Link className="button primary" to="/partenaire"><Sparkles size={16} /> Voir le matching</Link>} /><div className="project-grid">{projects.map(project => <Link to={`/partenaire/projets/${project.id}`} className="project-card" key={project.id}><div className="project-cover"><span>{project.sector}</span><span className="cover-pattern">{project.name.slice(0, 2).toUpperCase()}</span></div><div className="project-body"><div className="project-title"><h3>{project.name}</h3></div><p>{project.description}</p><div className="project-meta"><span>{project.city}, {project.region}</span><Status tone="green">{project.status}</Status></div><div className="project-foot"><span><strong>{project.maturity}</strong>/100 maturité</span><span>{formatFcfa(project.amount)}</span></div><Progress value={project.maturity} /></div></Link>)}</div></Shell>;
}

function ProjectDetail({ role = 'partenaire' }) {
    const { id } = useParams();
    const project = projects.find(item => item.id === id) || projects[0];
    const isBeneficiary = role === 'porteur';
    return <Shell role={role}><Link to={isBeneficiary ? '/porteur' : '/partenaire/projets'} className="back-link">← {isBeneficiary ? 'Retour à mon espace' : 'Retour à la banque de projets'}</Link><div className="detail-head"><div><Status tone="green">{project.status} · proposition UX</Status><h1>{project.name}</h1><p>{project.description}</p><div className="detail-meta"><span>{project.owner}</span><span>{project.city}, {project.region}</span><span>{project.sector}</span></div>{!isBeneficiary && <PartnerProjectActions project={project} />}</div></div><div className="detail-grid"><Panel title={isBeneficiary ? 'Mon projet' : 'Profil du projet'} subtitle="Informations structurantes"><div className="profile-facts"><div><span>Besoin principal</span><strong>{project.need}</strong></div><div><span>Montant recherché</span><strong>{formatFcfa(project.amount)}</strong></div><div><span>Emplois potentiels</span><strong>{project.jobs}</strong></div><div><span>Maturité proposée</span><strong>{project.maturity}/100</strong></div></div></Panel><Panel title="Preuves du parcours" subtitle={isBeneficiary ? 'Eléments ajoutés à votre passeport' : 'Eléments rendus visibles au partenaire'}><div className="proof-list"><span><Check size={15} /> Diagnostic réalisé</span><span><Check size={15} /> 4 formations complétées</span><span><Check size={15} /> 3 certificats associés</span></div></Panel></div></Shell>;
}

function SimpleRolePage({ role, title, description, icon: Icon }) {
    return <Shell role={role}><PageHeader eyebrow={`Espace ${role} · données de démonstration`} title={title} description={description} /><Panel title="Prochaine scène de démonstration" subtitle="Cette entrée est prête pour le prochain lot fonctionnel."><div className="empty-role-state"><div><Icon size={25} /><h2>Votre espace est identifié.</h2><p>Les données, filtres et actions métier seront raccordés ici au prochain lot. Le scénario reste entièrement local et rejouable.</p><Link to="/" className="button outline">Revenir au sélecteur <ArrowRight size={16} /></Link></div></div></Panel></Shell>;
}

function AppRoutes() {
    return <><Routes>
        <Route path="/" element={<RoleSelector />} />
        <Route path="/porteur/referencement" element={<RegistrationWizard />} />
        <Route path="/porteur" element={<BeneficiaryDashboard />} />
        <Route path="/porteur/projets" element={<BeneficiaryProjectsPage />} />
        <Route path="/porteur/projets/:id" element={<BeneficiaryProjectCockpit />} />
        <Route path="/porteur/parcours" element={<BeneficiaryJourneyPage />} />
        <Route path="/porteur/formations" element={<CoursesPage />} />
        <Route path="/porteur/formations/:id" element={<CourseDetailPage />} />
        <Route path="/porteur/passeport" element={<PassportPage />} />
        <Route path="/porteur/opportunites" element={<BeneficiaryOpportunitiesPage />} />
        <Route path="/porteur/*" element={<BeneficiaryDashboard />} />
        <Route path="/conseiller" element={<AdvisorDashboard />} />
        <Route path="/conseiller/porteurs" element={<AdvisorBeneficiariesPage />} />
        <Route path="/conseiller/porteurs/:id" element={<AdvisorCasePage />} />
        <Route path="/conseiller/candidatures" element={<AdvisorApplicationsPage />} />
        <Route path="/conseiller/actions" element={<AdvisorActionsPage />} />
        <Route path="/conseiller/rendez-vous" element={<AdvisorMeetingsPage />} />
        <Route path="/conseiller/formations" element={<AdvisorTrainingPage />} />
        <Route path="/conseiller/alertes" element={<AdvisorAlertsPage />} />
        <Route path="/conseiller/*" element={<Navigate to="/conseiller" replace />} />
        <Route path="/partenaire" element={<PartnerDashboard />} />
        <Route path="/partenaire/projets" element={<PartnerProjectsPage />} />
        <Route path="/partenaire/projets/:id" element={<ProjectDetail />} />
        <Route path="/partenaire/matching" element={<PartnerMatchingPage />} />
        <Route path="/partenaire/opportunites" element={<PartnerOpportunitiesPage />} />
        <Route path="/partenaire/mises-en-relation" element={<PartnerConnectionsPage />} />
        <Route path="/partenaire/*" element={<Navigate to="/partenaire" replace />} />
        <Route path="/direction" element={<DirectionDashboard />} />
        <Route path="/direction/pipeline" element={<DirectionPipelinePage />} />
        <Route path="/direction/cohortes" element={<DirectionCohortsPage />} />
        <Route path="/direction/secteurs" element={<DirectionSectorsPage />} />
        <Route path="/direction/territoires" element={<DirectionTerritoriesPage />} />
        <Route path="/direction/impact" element={<DirectionImpactPage />} />
        <Route path="/direction/vigilance" element={<DirectionVigilancePage />} />
        <Route path="/direction/*" element={<Navigate to="/direction" replace />} />
        <Route path="/projets" element={<ProjectsPage />} />
        <Route path="/projets/:id" element={<ProjectDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes><DemoControls /></>;
}

export default function App() {
    return <DemoSessionProvider><AppRoutes /></DemoSessionProvider>;
}