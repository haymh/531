import React from 'react';
import { LIFTS } from '../utils/constants';
import LiftIcon from './LiftIcon';

const InputForm = ({ oneRepMaxData }) => {
    const { oneRepMaxes, updateMax } = oneRepMaxData;

    const handleChange = (lift, value) => {
        // Allow empty string or valid numbers
        if (value === '' || value === '-') {
            updateMax(lift, '');
            return;
        }

        // Parse as number and validate
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            updateMax(lift, value);
        }
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
                background: 'var(--gradient-primary)',
                boxShadow: 'var(--shadow-glow)'
            }} />

            <h2 style={{ marginBottom: '1rem', marginTop: '0.5rem' }}>One Rep Maxes</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {LIFTS.map(lift => (
                    <div key={lift} style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor={lift} style={{
                            marginBottom: '0.5rem',
                            fontSize: '0.875rem',
                            color: 'var(--color-text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: 'var(--font-weight-semibold)'
                        }}>
                            <span style={{ color: 'var(--color-primary)' }}>
                                <LiftIcon lift={lift} size={16} />
                            </span>
                            {lift}
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            id={lift}
                            value={oneRepMaxes[lift] === 0 ? '' : (oneRepMaxes[lift] || '')}
                            onChange={(e) => handleChange(lift, e.target.value)}
                            placeholder="0"
                            style={{
                                padding: '0.875rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--glass-border)',
                                background: 'var(--glass-bg)',
                                backdropFilter: 'blur(var(--glass-blur))',
                                WebkitBackdropFilter: 'blur(var(--glass-blur))',
                                color: 'var(--color-text)',
                                fontSize: '1rem',
                                width: '100%',
                                transition: 'all var(--transition-fast)'
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InputForm;
