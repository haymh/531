import React, { useState } from 'react';

const ProgramExplanation = ({ onNext, onPrevious }) => {
    const [expandedSection, setExpandedSection] = useState(null);

    const sections = [
        {
            id: 'what',
            title: 'What is 5/3/1?',
            icon: '📚',
            content: [
                'Created by Jim Wendler, a renowned strength coach',
                'Progressive strength training program focused on main lifts',
                'Built around Squat, Bench Press, Deadlift, and Overhead Press',
                'Combines heavy training with smart progression'
            ]
        },
        {
            id: 'how',
            title: 'How It Works',
            icon: '⚙️',
            content: [
                '4-week cycles with increasing intensity',
                'Week 1: 3 sets at 65%, 75%, 85% of training max',
                'Week 2: 3 sets at 70%, 80%, 90% of training max',
                'Week 3: 3 sets at 75%, 85%, 95% of training max',
                'Week 4: Deload week for recovery',
                'Final set is AMRAP (As Many Reps As Possible)',
                'BBB (Boring But Big): 5×10 accessory work at 50%'
            ]
        },
        {
            id: 'progression',
            title: 'Progression System',
            icon: '📊',
            content: [
                'Complete all 4 weeks to progress to next cycle',
                'Upper body lifts (Bench, OHP): Add 5 lbs per cycle',
                'Lower body lifts (Squat, Deadlift): Add 10 lbs per cycle',
                'If you fail to hit minimum reps, reduce training max by 10%',
                'Training max = 90% of your 1 rep max'
            ]
        }
    ];

    const toggleSection = (id) => {
        setExpandedSection(expandedSection === id ? null : id);
    };

    return (
        <div className="fade-in" style={{
            padding: '1.5rem 1rem',
            maxWidth: '500px',
            margin: '0 auto'
        }}>
            <h2 style={{
                marginBottom: '0.5rem',
                textAlign: 'center'
            }}>
                Understanding 5/3/1
            </h2>
            <p style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
                marginBottom: '1.5rem',
                textAlign: 'center'
            }}>
                Learn the fundamentals of the program
            </p>

            {/* Expandable Sections */}
            <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                {sections.map((section) => {
                    const isExpanded = expandedSection === section.id;
                    return (
                        <div
                            key={section.id}
                            style={{
                                background: 'var(--glass-bg-light)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                border: `1px solid ${isExpanded ? 'var(--glass-border-strong)' : 'var(--glass-border)'}`,
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                                transition: 'all var(--transition-fast)'
                            }}
                        >
                            {/* Section Header */}
                            <button
                                onClick={() => toggleSection(section.id)}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--color-text)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '0.75rem',
                                    textAlign: 'left'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{section.icon}</span>
                                    <span style={{ fontWeight: 'var(--font-weight-semibold)', fontSize: '1rem' }}>
                                        {section.title}
                                    </span>
                                </div>
                                <span style={{
                                    fontSize: '1.25rem',
                                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform var(--transition-fast)'
                                }}>
                                    ▼
                                </span>
                            </button>

                            {/* Section Content */}
                            {isExpanded && (
                                <div style={{
                                    padding: '0 1rem 1rem 1rem',
                                    borderTop: '1px solid var(--glass-border)'
                                }}>
                                    <ul style={{
                                        margin: '0.75rem 0 0 0',
                                        paddingLeft: '1.5rem',
                                        fontSize: '0.875rem',
                                        lineHeight: '1.8',
                                        color: 'var(--color-text-muted)'
                                    }}>
                                        {section.content.map((item, index) => (
                                            <li key={index} style={{ marginBottom: '0.5rem' }}>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                    className="btn btn-secondary"
                    onClick={onPrevious}
                    style={{ flex: 1 }}
                >
                    ← Back
                </button>
                <button
                    className="btn btn-primary"
                    onClick={onNext}
                    style={{ flex: 2 }}
                >
                    Continue →
                </button>
            </div>
        </div>
    );
};

export default ProgramExplanation;
