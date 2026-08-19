import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
    ArrowRight, Bell, BookOpen, BriefcaseBusiness, Check, ChevronDown, CircleHelp,
    GraduationCap, LayoutDashboard, Menu, PanelLeftClose, PanelLeftOpen, Rocket,
    ShieldCheck, Target, Users, X,
} from 'lucide-react';
import { demoBeneficiary, journeyStages } from '../data/demoUniverse';

const roleLinks = {
    porteur: [
        { to: '/porteur', label: 'Mon cockpit', icon: LayoutDashboard },
        { to: '/porteur/parcours', label: 'Mon parcours', icon: Rocket },
        { to: '/porteur/formations', label: 'Formations', icon: GraduationCap },
        { to: '/porteur/opportunites', label: 'Opportunités', icon: BriefcaseBusiness },
        { to: '/porteur/passeport', label: 'Passeport entrepreneur', icon: ShieldCheck },
    ],
    conseiller: [
        { to: '/conseiller', label: 'File de travail', icon: LayoutDashboard },
        { to: '/conseiller/porteurs', label: 'Porteurs accompagnés', icon: Users },
        { to: '/conseiller/porteurs', label: 'Projets accompagnés', icon: BriefcaseBusiness },
        { to: '/conseiller/formations', label: 'Formations', icon: GraduationCap },
    ],
    direction: [
        { to: '/direction', label: "Cockpit d'impact", icon: LayoutDashboard },
        { to: '/direction/pipeline', label: 'Pipeline PNPE', icon: Target },
        { to: '/direction/territoires', label: 'Territoires & secteurs', icon: Target },
        { to: '/direction/pipeline', label: 'Portefeuille projets', icon: BriefcaseBusiness },
    ],
    partenaire: [
        { to: '/partenaire', label: 'Cockpit sourcing', icon: LayoutDashboard },
        { to: '/partenaire/projets', label: 'Banque de projets', icon: BriefcaseBusiness },
        { to: '/partenaire/matching', label: 'Matching expliqué', icon: Target },
        { to: '/partenaire/opportunites', label: 'Opportunités', icon: Rocket },
    ],
};

export function Logo() {
    return <Link to="/" className="brand"><span className="brand-mark">P</span><span><strong>PNPE</strong><small>De l'idée à l'entreprise</small></span></Link>;
}

export function Shell({ role = 'porteur', children }) {
    const [open, setOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(() => globalThis.localStorage?.getItem('pnpe-sidebar-collapsed') === 'true');
    const [roleMenu, setRoleMenu] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();
    const links = roleLinks[role];
    const roleLabel = role === 'porteur' ? 'Espace porteur' : role === 'conseiller' ? 'Espace conseiller' : role === 'partenaire' ? 'Espace partenaire' : 'Direction PNPE';
    const switchRole = (nextRole) => {
        setRoleMenu(false);
        setOpen(false);
        navigate(nextRole === 'porteur' ? '/porteur' : `/${nextRole}`);
    };
    const toggleCollapsed = () => setCollapsed(value => {
        const next = !value;
        globalThis.localStorage?.setItem('pnpe-sidebar-collapsed', String(next));
        return next;
    });
    return <div className={`app-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <aside className={`sidebar ${open ? 'is-open' : ''}`}>
            <div className="sidebar-top"><Logo /><button className="icon-btn mobile-only" aria-label="Fermer le menu" onClick={() => setOpen(false)}><X size={19} /></button><button className="icon-btn desktop-only" aria-label={collapsed ? 'Déployer la barre latérale' : 'Réduire la barre latérale'} onClick={toggleCollapsed}>{collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}</button></div>
            <div className="sidebar-space-label"><span className={`role-dot ${role}`} /><span>{roleLabel}</span></div>
            <nav className="side-nav" aria-label="Navigation principale">{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}><Icon size={18} /><span>{label}</span></NavLink>)}</nav>
            <div className="side-help"><CircleHelp size={18} /><div><strong>Besoin d'aide ?</strong><span>Parler à un conseiller</span></div></div>
            <div className="side-user-switcher"><button className="side-user" onClick={() => setRoleMenu(value => !value)} aria-expanded={roleMenu} aria-label="Changer de rôle"><div className={`avatar ${role}`}>{role === 'porteur' ? 'MN' : role === 'conseiller' ? 'AM' : role === 'partenaire' ? 'PF' : 'DG'}</div><div><strong>{role === 'porteur' ? 'Marie Ndomo' : role === 'conseiller' ? 'Aline Mballa' : role === 'partenaire' ? 'Partenaire PNPE' : 'Direction PNPE'}</strong><span>{roleLabel} · Changer</span></div><ChevronDown size={16} /></button><AnimatePresence initial={false}>{roleMenu && <motion.div className="profile-role-menu" initial={{ opacity: 0, y: 8, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: .98 }} transition={{ duration: reduceMotion ? 0 : .16 }}><div className="profile-role-menu-head"><strong>Changer de perspective</strong><small>Navigation instantanée</small></div>{Object.entries({ porteur: 'Porteur de projet', conseiller: 'Conseiller PNPE', partenaire: 'Partenaire / financeur', direction: 'Direction PNPE' }).map(([id, label]) => <button key={id} className={id === role ? 'current' : ''} onClick={() => switchRole(id)}><span className={`role-avatar-mini ${id}`}>{id === 'porteur' ? 'MN' : id === 'conseiller' ? 'AM' : id === 'partenaire' ? 'PF' : 'DG'}</span><span><strong>{label}</strong><small>{id === role ? 'Perspective actuelle' : `Ouvrir l’espace ${id}`}</small></span>{id === role && <Check size={14} />}</button>)}</motion.div>}</AnimatePresence></div>
        </aside>
        <div className="main-area">
            <header className="topbar"><button className="icon-btn mobile-only" aria-label="Ouvrir le menu" onClick={() => setOpen(true)}><Menu size={21} /></button><div className="crumb">PNPEKIT <span>/</span> {location.pathname === '/' ? 'Accueil' : roleLabel}</div><div className="top-actions"><span className="demo-label">Données de démonstration</span><div className="notification-wrap"><button className="icon-btn" aria-label="Afficher les notifications" aria-expanded={notifications} onClick={() => setNotifications(value => !value)}><Bell size={19} /><i /></button><AnimatePresence>{notifications && <motion.div className="notification-panel" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><strong>Notifications</strong><button onClick={() => setNotifications(false)}><span className="notification-dot blue" />Votre conseiller a ajouté une action au dossier.<small>Il y a 12 min</small></button><button onClick={() => setNotifications(false)}><span className="notification-dot gold" />Une formation correspond à votre projet.<small>Aujourd'hui</small></button></motion.div>}</AnimatePresence></div><button className="top-avatar" aria-label="Profil">{role === 'porteur' ? 'MN' : role === 'conseiller' ? 'AM' : role === 'partenaire' ? 'PF' : 'DG'}</button></div></header>
            <main className="page-content">{children}</main>
        </div>
        {open && <button className="scrim" aria-label="Fermer le menu" onClick={() => setOpen(false)} />}
    </div>;
}

export function PublicLayout({ children }) { return <div className="public-layout"><header className="public-nav"><Logo /><nav><a href="#mission">La plateforme</a><Link to="/porteur/formations">Formations</Link><Link to="/projets">Projets accompagnés</Link></nav><div className="public-actions"><Link className="button ghost" to="/porteur">Se connecter</Link><Link className="button primary" to="/candidater">Candidater <ArrowRight size={16} /></Link></div></header>{children}</div>; }
export function PageHeader({ eyebrow, title, description, action }) { return <div className="page-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{description && <p className="page-description">{description}</p>}</div>{action}</div>; }
export function Panel({ title, subtitle, action, children, className = '' }) { return <section className={`panel ${className}`}><div className="panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>{children}</section>; }
export function Status({ children, tone = 'green' }) { return <span className={`status ${tone}`}>{children}</span>; }
export function Progress({ value, tone = 'forest' }) { return <div className={`progress ${tone}`} role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${value}%` }} /></div>; }
export function Kpi({ item, index = 0 }) { const icons = { users: Users, rocket: Rocket, book: BookOpen, briefcase: BriefcaseBusiness }; const Icon = icons[item.icon] || Target; return <motion.div className="kpi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .05 }}><div className={`kpi-icon ${item.tone}`}><Icon size={19} /></div><div><span>{item.label}</span><strong>{item.value}</strong><small><b>{item.change}</b> {item.context}</small></div></motion.div>; }
export function Journey({ current = demoBeneficiary.journeyStep }) { return <div className="journey" aria-label="Progression du parcours">{journeyStages.map((stage, index) => { const done = index < current - 1; const active = index === current - 1; return <div className={`journey-step ${done ? 'done' : ''} ${active ? 'active' : ''}`} key={stage.id}><div className="journey-node">{done ? <Check size={14} /> : index + 1}</div><span>{stage.short}</span>{index < journeyStages.length - 1 && <i />}</div>; })}</div>; }
export function Maturity({ compact = false, beneficiary = demoBeneficiary }) { return <div className={`maturity ${compact ? 'compact' : ''}`}><div className="score-ring" style={{ '--score': `${beneficiary.maturity * 3.6}deg` }}><div><strong>{beneficiary.maturity}</strong><span>/100</span></div></div><div><span className="eyebrow">Maturité proposée</span><h3>{beneficiary.maturityLabel}</h3><p>+6 points depuis le dernier diagnostic</p></div></div>; }