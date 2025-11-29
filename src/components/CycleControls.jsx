import React from 'react';
import { LIFTS } from '../utils/constants';
import LiftIcon from './LiftIcon';

const CycleControls = ({ cycleData, oneRepMaxes }) => {
    const { cycles, currentWeeks } = cycleData;

    return (
        <div className="card" style={{ padding: 'var(--spacing-md)' }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                Cycle Progress
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                Complete all 4 weeks to automatically progress
            </p>
            <div className="cycle-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
                {LIFTS.map(lift => (
                    <div key={lift} style={{
                        padding: '0.75rem',
                        backgroundColor: 'var(--color-background)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center'
                    }}>
                        <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center', color: 'var(--color-primary)' }}>
                            <LiftIcon lift={lift} size={24} />
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                            {lift}
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '0.125rem' }}>
                            C{cycles[lift] || 1}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                            W{currentWeeks[lift] || 1}/4
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '500' }}>
                            {oneRepMaxes[lift] || 0}lb
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CycleControls;
