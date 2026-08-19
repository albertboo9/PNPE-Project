import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronUp, Home, RotateCcw, X } from 'lucide-react';
import { useDemoSession } from '../stores/DemoSessionStore';

const actorLabels = { porteur: 'Porteur', conseiller: 'Conseiller', partenaire: 'Partenaire', direction: 'Direction' };

export function DemoControls() {
    const navigate = useNavigate();
    const { session, resetSession } = useDemoSession();
    const [open, setOpen] = useState(false);
    if (!session.actor) return null;

    return <div className={`demo-controls ${open ? 'open' : ''}`}>
        {open && <div className="demo-controls-panel"><div><span>Mode démonstration</span><button onClick={() => setOpen(false)} aria-label="Fermer"><X size={15} /></button></div><strong>Scène {session.scene} · {actorLabels[session.actor]}</strong><Link to="/"><Home size={14} /> Choisir un autre acteur</Link><button onClick={() => { resetSession(); navigate('/'); }}><RotateCcw size={14} /> Réinitialiser la session</button></div>}
        <button className="demo-controls-trigger" onClick={() => setOpen(value => !value)}><span /> Mode démo <ChevronUp size={14} /></button>
    </div>;
}