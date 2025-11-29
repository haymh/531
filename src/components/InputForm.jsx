import React from 'react';
import { LIFTS } from '../utils/constants';

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
        <div className="card">
            <h2 style={{ marginBottom: '1rem' }}>One Rep Maxes</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {LIFTS.map(lift => (
                    <div key={lift} style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor={lift} style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
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
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)',
                                backgroundColor: 'var(--color-background)',
                                color: 'var(--color-text)',
                                fontSize: '1rem',
                                width: '100%'
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InputForm;
