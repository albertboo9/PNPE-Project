import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, BriefcaseBusiness, Building2, CheckCircle2, CircleDollarSign, Download, GraduationCap, MapPin, Rocket, ShieldAlert, TrendingUp, Users } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader, Panel, Progress, Shell, Status } from '../../components/ui';
import { directionCohorts, impact, impactOutcomes } from '../../data/demoUniverse';

const colors = ['#10b981', '#06b6d4', '#facc15', '#f97316', '#8b5cf6'];

export function DirectionPipelinePage() {
    const max = impact.stages[0].value;
    return <Shell role="direction"><PageHeader eyebrow="Chaîne de transformation" title="Le pipeline PNPE, étape par étape." description="Mesurez les volumes, les conversions et les points de fuite du référencement jusqu’à la maturité." action={<ExportButton />} />
        <div className="pipeline-hero">{impact.stages.map((stage, index) => { const conversion = index ? Math.round(stage.value / impact.stages[index - 1].value * 100) : 100; return <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * .08 }} key={stage.label} style={{ '--stage-width': `${45 + stage.value / max * 55}%`, '--stage-color': colors[index] }}><span>0{index + 1}</span><h3>{stage.label}</h3><strong>{stage.value.toLocaleString('fr-FR')}</strong><small>{conversion}% de conversion</small>{index < impact.stages.length - 1 && <ArrowRight />}</motion.div>; })}</div>
        <div className="direction-grid"><Panel title="Conversions critiques" subtitle="Écarts prioritaires sur la période"><div className="conversion-list">{impact.stages.slice(1).map((stage, index) => { const rate = Math.round(stage.value / impact.stages[index].value * 100); return <div key={stage.label}><span>{impact.stages[index].label} → {stage.label}</span><strong>{rate}%</strong><Progress value={rate} tone={rate < 40 ? 'gold' : 'forest'} /></div>; })}</div></Panel><Panel title="Décision recommandée" subtitle="Proposition UX de démonstration"><div className="decision-callout"><TrendingUp /><h3>Renforcer le passage Formation → Incubation</h3><p>Le décrochage concerne 426 porteurs. Une cohorte de remobilisation ciblée pourrait réduire cette rupture.</p><button className="button primary" onClick={() => toast.success('Note de décision ajoutée au comité')}>Inscrire au comité</button></div></Panel></div>
    </Shell>;
}

export function DirectionCohortsPage() {
    return <Shell role="direction"><PageHeader eyebrow="Performance des cohortes" title="Comparer les promotions, comprendre les écarts." description="Suivez l’engagement, la maturité et les emplois déclarés pour chaque cohorte PNPE." action={<ExportButton />} /><Panel title="Vue comparative" subtitle="Données consolidées de démonstration"><div className="cohort-table"><div className="cohort-row head"><span>Cohorte</span><span>Entrants</span><span>Actifs</span><span>Complétion</span><span>Maturité</span><span>Emplois</span></div>{directionCohorts.map((cohort, index) => <motion.div className="cohort-row" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .05 }} key={cohort.name}><span><strong>{cohort.name}</strong><small>{index === 0 ? 'Cohorte active' : 'Suivi longitudinal'}</small></span><span>{cohort.entrants}</span><span>{cohort.active}</span><span><strong>{cohort.completion}%</strong><Progress value={cohort.completion} /></span><span><Status tone={cohort.maturity >= 77 ? 'green' : 'blue'}>{cohort.maturity}/100</Status></span><span><strong>{cohort.jobs}</strong></span></motion.div>)}</div></Panel></Shell>;
}

export function DirectionSectorsPage() {
    const [selected, setSelected] = useState(impact.sectors[0]);
    return <Shell role="direction"><PageHeader eyebrow="Lecture sectorielle" title="Où grandissent les projets accompagnés ?" description="Une vue de portefeuille pour arbitrer l’offre de formation, l’expertise et les partenariats." />
        <div className="sector-dashboard"><Panel title="Répartition du portefeuille" subtitle="Cliquez sur un secteur pour explorer"><div className="sector-bars">{impact.sectors.map((sector, index) => <button key={sector.name} onClick={() => setSelected(sector)} className={selected.name === sector.name ? 'selected' : ''}><span><i style={{ background: colors[index] }} />{sector.name}</span><strong>{sector.value}%</strong><div><motion.i initial={{ width: 0 }} animate={{ width: `${sector.value * 2.7}%` }} style={{ background: colors[index] }} /></div></button>)}</div></Panel><div className="sector-focus"><span className="eyebrow">Secteur sélectionné</span><BriefcaseBusiness /><h2>{selected.name}</h2><strong>{Math.round(1248 * selected.value / 100)}</strong><p>porteurs actifs · {selected.value}% du portefeuille</p><div><span>Maturité moyenne <b>{selected.name === 'Agro-industrie' ? 76 : 69}/100</b></span><span>Projets financés <b>{Math.max(8, Math.round(selected.value / 2))}</b></span><span>Emplois potentiels <b>{selected.value * 13}</b></span></div></div></div>
    </Shell>;
}

export function DirectionTerritoriesPage() {
    return <Shell role="direction"><PageHeader eyebrow="Empreinte territoriale" title="L’action PNPE, territoire par territoire." description="Repérez les bassins actifs et les zones qui nécessitent plus de proximité opérationnelle." action={<Status tone="green">5 zones observées</Status>} />
        <div className="territory-dashboard"><div className="territory-map"><div className="map-grid" />{impact.territories.map((territory, index) => <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * .1, type: 'spring' }} key={territory.name} className={`map-pin pin-${index}`}><MapPin /><strong>{territory.projects}</strong><span>{territory.name}</span></motion.button>)}<div className="map-caption">Cartographie illustrative · données de démonstration</div></div><Panel title="Performance territoriale" subtitle="Volume et maturité moyenne"><div className="territory-ranking">{impact.territories.map((item, index) => <div key={item.name}><strong>0{index + 1}</strong><span>{item.name}<small>{item.projects} projets actifs</small></span><Progress value={item.maturity} /><b>{item.maturity}/100</b></div>)}</div></Panel></div>
    </Shell>;
}

export function DirectionImpactPage() {
    return <Shell role="direction"><PageHeader eyebrow="Résultats socio-économiques" title="Transformer l’accompagnement en impact lisible." description="Les résultats de démonstration sont rapprochés de cibles annuelles pour soutenir la décision." action={<ExportButton />} />
        <div className="outcome-grid">{impactOutcomes.map((item, index) => { const rate = Math.round(item.value / item.target * 100); const Icon = [Building2, CircleDollarSign, Users, TrendingUp][index]; return <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }} className={item.tone} key={item.label}><Icon /><span>{item.label}</span><strong>{item.value.toLocaleString('fr-FR')} <small>{item.unit}</small></strong><div><Progress value={rate} /><b>{rate}%</b></div><small>Cible annuelle · {item.target.toLocaleString('fr-FR')} {item.unit}</small></motion.article>; })}</div>
        <div className="impact-story"><div><span className="eyebrow">Chaîne de valeur PNPE</span><h2>1 porteur accompagné devient un projet structuré, puis une activité qui crée de la valeur.</h2></div><div className="impact-chain"><span><GraduationCap /><b>92%</b><small>complètent leur formation</small></span><i /><span><Rocket /><b>186</b><small>entrent en incubation</small></span><i /><span><CircleDollarSign /><b>74</b><small>accèdent au financement</small></span><i /><span><Users /><b>1 460</b><small>emplois générés</small></span></div></div>
    </Shell>;
}

export function DirectionVigilancePage() {
    return <Shell role="direction"><PageHeader eyebrow="Vigilance institutionnelle" title="Décider à partir des signaux faibles." description="Chaque alerte relie un volume, une cause probable et une réponse opérationnelle." action={<Status tone="terracotta"><ShieldAlert size={13} /> 3 alertes ouvertes</Status>} />
        <div className="vigilance-command">{impact.vigilance.map((item, index) => <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }} className={item.tone} key={item.label}><div><AlertTriangle /><Status tone={item.tone === 'danger' ? 'terracotta' : item.tone}>{index === 0 ? 'Critique' : 'À surveiller'}</Status></div><strong>{item.value}</strong><h2>{item.label}</h2><p>{item.context}</p><div className="vigilance-action"><span>Réponse proposée</span><b>{index === 0 ? 'Cellule de relance sous 48 h' : index === 1 ? 'Campagne de remobilisation' : 'Atelier documents financiers'}</b></div><button className="button outline full" onClick={() => toast.success('Responsable assigné et suivi activé')}>Assigner un responsable <ArrowRight size={15} /></button></motion.article>)}</div>
    </Shell>;
}

function ExportButton() { return <button className="button outline" onClick={() => toast.success('Rapport de démonstration préparé')}><Download size={16} /> Exporter le rapport</button>; }