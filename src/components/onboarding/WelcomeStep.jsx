import React from 'react';

const WelcomeStep = ({ onNext }) => {
    return (
        <div className="fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem 1rem',
            minHeight: '400px',
            justifyContent: 'center'
        }}>
            {/* Hero Icon */}
            <div style={{
                width: '80px',
                height: '80px',
                background: 'var(--gradient-primary)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: 'var(--shadow-glow)'
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6.5 6.5h11" />
                    <path d="M6.5 17.5h11" />
                    <path d="M6 20v-2a6 6 0 1 1 12 0v2" />
                    <path d="M6 4v2a6 6 0 0 1 12 0V4" />
                </svg>
            </div>

            {/* Welcome Message */}
            <h1 style={{
                fontSize: '2.5rem',
                marginBottom: '1rem',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
            }}>
                Welcome to 5/3/1
            </h1>

            <p style={{
                fontSize: '1.125rem',
                color: 'var(--color-text-muted)',
                marginBottom: '2rem',
                maxWidth: '400px',
                lineHeight: '1.6'
            }}>
                The proven strength training program that helps you build muscle and increase your lifts progressively.
            </p>

            {/* Key Benefits */}
            <div style={{
                display: 'grid',
                gap: '1rem',
                marginBottom: '2rem',
                width: '100%',
                maxWidth: '400px'
            }}>
                {[
                    { icon: '📈', title: 'Progressive Overload', desc: 'Systematic strength gains' },
                    { icon: '🎯', title: 'Simple & Effective', desc: 'Easy to follow program' },
                    { icon: '💪', title: 'Proven Results', desc: 'Used by thousands worldwide' }
                ].map((benefit, index) => (
                    <div key={index} style={{
                        padding: '1rem',
                        background: 'var(--glass-bg-light)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        textAlign: 'left',
                        transition: 'all var(--transition-fast)'
                    }}>
                        <span style={{ fontSize: '2rem' }}>{benefit.icon}</span>
                        <div>
                            <div style={{ fontWeight: 'var(--font-weight-semibold)', marginBottom: '0.25rem' }}>
                                {benefit.title}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                {benefit.desc}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Button */}
            <button
                className="btn btn-primary"
                onClick={onNext}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '1rem 2rem',
                    fontSize: '1.125rem'
                }}
            >
                Get Started →
            </button>
        </div>
    );
};

export default WelcomeStep;
