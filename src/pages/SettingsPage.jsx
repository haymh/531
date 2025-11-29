import React, { useState, useEffect } from 'react';
import InputForm from '../components/InputForm';
import { LIFTS } from '../utils/constants';
import LiftIcon from '../components/LiftIcon';

const SettingsPage = ({ oneRepMaxData }) => {
    const { oneRepMaxes } = oneRepMaxData;
    const hasMaxes = Object.values(oneRepMaxes).some(max => max > 0);
    const [showInputForm, setShowInputForm] = useState(true);

    useEffect(() => {
        if (hasMaxes && showInputForm) {
            return;
        }
        if (!hasMaxes && !showInputForm) {
            setShowInputForm(true);
        }
    }, [hasMaxes]);

    return (
        <div style={{ display: 'grid', gap: '1rem', paddingBottom: '5rem' }}>

            {showInputForm ? (
                <div>
                    <InputForm oneRepMaxData={oneRepMaxData} />
                    {hasMaxes && (
                        <button
                            className="btn"
                            style={{ marginTop: '1rem', width: '100%' }}
                            onClick={() => setShowInputForm(false)}
                        >
                            ✓ Done
                        </button>
                    )}
                </div>
            ) : (
                <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 5v14" /><path d="M18 5v14" /><path d="M2 12h20" /></svg>
                            One Rep Maxes
                        </h4>
                        <div style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {LIFTS.map(lift => (
                                <div key={lift} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <span style={{ color: 'var(--color-primary)' }}><LiftIcon lift={lift} size={16} /></span>
                                    <span>{lift}: {oneRepMaxes[lift] || 0}lb</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowInputForm(true)}
                    >
                        ✏️ Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
