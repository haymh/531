import React from 'react';
import { LIFTS } from '../utils/constants';

const CalendarView = ({ workoutProgressData }) => {
    const { isComplete } = workoutProgressData;
    const weeks = [1, 2, 3, 4];

    return (
        <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>📅 Weekly Progress</h3>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '300px' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>Lift</th>
                            {weeks.map(w => <th key={w} style={{ padding: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>W{w}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {LIFTS.map(lift => (
                            <tr key={lift}>
                                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>{lift}</td>
                                {weeks.map(w => (
                                    <td key={w} style={{ textAlign: 'center', padding: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                                        {isComplete(lift, w) ? (
                                            <span style={{ color: 'var(--color-success)', fontSize: '1.25rem' }}>●</span>
                                        ) : (
                                            <span style={{ color: 'var(--color-surface-hover)', fontSize: '1.25rem' }}>○</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CalendarView;
