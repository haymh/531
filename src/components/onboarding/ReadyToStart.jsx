import React from 'react';
import { LIFTS } from '../../utils/constants';
import LiftIcon from '../LiftIcon';

const ReadyToStart = ({ oneRepMaxes, onComplete }) => {
    return (
        <div className="fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem 1rem',
            maxWidth: '500px',
            margin: '0 auto'
        }}>
            {/* Success Animation */}
            <div style={{
                width: '80px',
                height: '80px',
                background: 'var(--gradient-primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: 'var(--shadow-glow)',
                animation: 'fadeIn 0.5s ease-out'
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-dark)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>

            <h1 style={{
                fontSize: '2rem',
                marginBottom: '0.5rem'
            }}>
                You're All Set!
            </h1>

            <p style={{
                fontSize: '1rem',
                color: 'var(--color-text-muted)',
                marginBottom: '2rem',
                lineHeight: '1.6'
            }}>
                Your training maxes are configured. You're ready to start building strength with the 5/3/1 program.
            </p>

            {/* Training Max Summary */}
            <div style={{
                width: '100%',
                marginBottom: '2rem'
            }}>
                <h3 style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '1rem',
                    fontWeight: 'var(--font-weight-bold)'
                }}>
                    Your Training Maxes
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {LIFTS.map(lift => {
                        const oneRepMax = oneRepMaxes[lift] || 0;
                        const trainingMax = Math.round(oneRepMax * 0.9);
                        return (
                            <div
                                key={lift}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '1rem',
                                    background: 'var(--glass-bg-light)',
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: 'var(--radius-md)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ color: 'var(--color-primary)' }}>
                                        <LiftIcon lift={lift} size={24} />
                                    </span>
                                    <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                                        {lift}
                                    </span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1.125rem', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
                                        {trainingMax} lbs
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                        TM (90% of {oneRepMax})
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Quick Tips */}
            <div style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(102, 126, 234, 0.1)',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '2rem',
                textAlign: 'left'
            }}>
                <h4 style={{
                    margin: '0 0 0.75rem 0',
                    fontSize: '0.875rem',
                    fontWeight: 'var(--font-weight-bold)'
                }}>
                    💡 Quick Tips for Your First Workout
                </h4>
                <ul style={{
                    margin: 0,
                    paddingLeft: '1.25rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    color: 'var(--color-text-muted)'
                }}>
                    <li>Focus on form over weight</li>
                    <li>Push hard on your AMRAP (final) set</li>
                    <li>Complete all BBB accessory work</li>
                    <li>Track your reps for progression</li>
                </ul>
            </div>

            {/* CTA Button */}
            <button
                className="btn btn-primary"
                onClick={onComplete}
                style={{
                    width: '100%',
                    padding: '1rem 2rem',
                    fontSize: '1.125rem'
                }}
            >
                Start Training →
            </button>
        </div>
    );
};

export default ReadyToStart;
