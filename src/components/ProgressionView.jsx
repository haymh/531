import React from 'react';
import { LIFTS } from '../utils/constants';
import LiftIcon from './LiftIcon';

const ProgressionView = ({ oneRepMaxes, cycles, startDates }) => {
    const calculateFutureMax = (currentMax, cyclesAhead, isLowerBody) => {
        const increment = isLowerBody ? 10 : 5;
        return currentMax + (cyclesAhead * increment);
    };

    const cyclesAhead = [1, 2, 3, 4, 5, 6];

    const formatDate = (dateString) => {
        if (!dateString) return 'Not started';
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
        return `${Math.floor(diffDays / 365)}y ago`;
    };

    return (
        <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Gradient accent */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'var(--gradient-aurora-2)',
                boxShadow: '0 0 20px rgba(240, 147, 251, 0.3)'
            }} />

            <h3 style={{ marginBottom: '0.75rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                Progression Forecast
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                Projected 1RM values based on standard 5/3/1 progression
            </p>

            <div style={{ overflowX: 'auto', marginLeft: '-1rem', marginRight: '-1rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    minWidth: '500px',
                    fontSize: '0.75rem'
                }}>
                    <thead>
                        <tr>
                            <th style={{
                                textAlign: 'left',
                                padding: '0.5rem 0.25rem',
                                borderBottom: '2px solid var(--color-border)',
                                fontWeight: 'bold',
                                fontSize: '0.75rem',
                                position: 'sticky',
                                left: 0,
                                backgroundColor: 'var(--color-surface)',
                                zIndex: 1
                            }}>
                                Lift
                            </th>
                            <th style={{
                                textAlign: 'center',
                                padding: '0.5rem 0.25rem',
                                borderBottom: '2px solid var(--glass-border)',
                                fontWeight: 'bold',
                                background: 'var(--gradient-primary)',
                                color: 'var(--color-text-dark)',
                                fontSize: '0.75rem'
                            }}>
                                Now
                            </th>
                            {cyclesAhead.map(cycles => (
                                <th key={cycles} style={{
                                    textAlign: 'center',
                                    padding: '0.5rem 0.25rem',
                                    borderBottom: '2px solid var(--color-border)',
                                    fontSize: '0.7rem',
                                    whiteSpace: 'nowrap'
                                }}>
                                    +{cycles}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {LIFTS.map(lift => {
                            const currentMax = oneRepMaxes[lift] || 0;
                            const currentCycle = cycles[lift] || 1;
                            const isLowerBody = lift === 'Squat' || lift === 'Deadlift';

                            return (
                                <tr key={lift}>
                                    <td style={{
                                        padding: '0.5rem 0.25rem',
                                        borderBottom: '1px solid var(--color-border)',
                                        fontWeight: '500',
                                        fontSize: '0.75rem',
                                        position: 'sticky',
                                        left: 0,
                                        backgroundColor: 'var(--color-surface)',
                                        zIndex: 1
                                    }}>
                                        <div style={{ whiteSpace: 'nowrap' }}>
                                            <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <span style={{ color: 'var(--color-primary)' }}><LiftIcon lift={lift} size={14} /></span>
                                                {lift.split(' ')[0]}
                                            </div>
                                            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: '0.125rem' }}>
                                                C{currentCycle} • {formatDate(startDates?.[lift])}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{
                                        textAlign: 'center',
                                        padding: '0.5rem 0.25rem',
                                        borderBottom: '1px solid var(--color-border)',
                                        backgroundColor: 'var(--color-surface-hover)',
                                        fontWeight: 'bold',
                                        fontSize: '0.75rem'
                                    }}>
                                        {currentMax}
                                    </td>
                                    {cyclesAhead.map(cycles => {
                                        const projectedMax = calculateFutureMax(currentMax, cycles, isLowerBody);
                                        const gain = projectedMax - currentMax;
                                        return (
                                            <td key={cycles} style={{
                                                textAlign: 'center',
                                                padding: '0.5rem 0.25rem',
                                                borderBottom: '1px solid var(--color-border)'
                                            }}>
                                                <div style={{ fontWeight: '500', fontSize: '0.75rem' }}>{projectedMax}</div>
                                                <div style={{ fontSize: '0.65rem', color: 'var(--color-success)' }}>
                                                    +{gain}
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                background: 'var(--glass-bg-light)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8125rem'
            }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 'var(--font-weight-bold)' }}>
                    💡 How It Works
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.5' }}>
                    <li>Complete all 4 weeks to progress</li>
                    <li>Lower body: +10 lbs per cycle</li>
                    <li>Upper body: +5 lbs per cycle</li>
                    <li>Adjust if you fail reps</li>
                </ul>
            </div>
        </div>
    );
};

export default ProgressionView;
