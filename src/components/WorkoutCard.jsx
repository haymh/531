import React, { useState } from 'react';
import { calculateTrainingMax, generateWorkout, roundToNearest } from '../utils/calculator';
import { calculatePlates, formatPlates } from '../utils/plateCalculator';
import LiftIcon from './LiftIcon';
import PlateStacking from './PlateStacking';

const WorkoutCard = ({ lift, week, oneRepMaxData, workoutProgressData }) => {
    const [showStacking, setShowStacking] = useState(false);

    if (!oneRepMaxData || !workoutProgressData) {
        console.error('WorkoutCard: Missing props', { oneRepMaxData, workoutProgressData });
        return <div>Loading data...</div>;
    }
    const { oneRepMaxes } = oneRepMaxData;
    const { markComplete, isComplete } = workoutProgressData;

    if (!oneRepMaxes) {
        console.error('WorkoutCard: oneRepMaxes is undefined');
        return <div>Loading maxes...</div>;
    }

    const tm = (oneRepMaxes[lift] || 0) * 0.9;
    const workout = generateWorkout(lift, tm, week);
    const completed = isComplete(lift, week);

    const handleComplete = () => {
        setShowStacking(true);
        markComplete(lift, week);
    };

    const renderSetGroup = (sets, title, showPercentage = false, showPlates = false) => (
        <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'var(--font-weight-bold)' }}>
                {title}
            </h4>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
                {sets.map((set, index) => {
                    const plateInfo = showPlates ? calculatePlates(set.weight) : null;
                    return (
                        <div key={index} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '0.875rem',
                            background: 'var(--glass-bg-light)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 'var(--radius-sm)',
                            transition: 'all var(--transition-fast)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {showPercentage && set.percentage && (
                                    <span style={{
                                        color: 'var(--color-primary)',
                                        fontSize: '0.875rem',
                                        fontWeight: 'var(--font-weight-semibold)',
                                        background: 'var(--glass-bg)',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: 'var(--radius-pill)',
                                        border: '1px solid var(--glass-border)'
                                    }}>
                                        {Math.round(set.percentage * 100)}%
                                    </span>
                                )}
                                <strong style={{ fontSize: '1.25rem', marginLeft: showPercentage ? '0' : 'auto', fontWeight: 'var(--font-weight-bold)' }}>
                                    {set.weight} × {set.reps}
                                </strong>
                            </div>
                            {showPlates && plateInfo && plateInfo.plates.length > 0 && (
                                <div style={{
                                    marginTop: '0.5rem',
                                    fontSize: '0.75rem',
                                    color: 'var(--color-text-muted)',
                                    paddingTop: '0.5rem',
                                    borderTop: '1px solid var(--glass-border)'
                                }}>
                                    <span style={{ fontWeight: '500', color: 'var(--color-text)' }}>Per side:</span> {formatPlates(plateInfo.plates)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <>
            {showStacking && (
                <PlateStacking
                    onComplete={() => setShowStacking(false)}
                />
            )}
            <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Gradient accent bar */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'var(--gradient-primary)',
                    boxShadow: 'var(--shadow-glow)'
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', marginTop: '0.5rem' }}>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{
                            color: 'var(--color-primary)',
                            background: 'var(--glass-bg)',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            border: '1px solid var(--glass-border)'
                        }}>
                            <LiftIcon lift={lift} size={28} />
                        </span>
                        <div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 'var(--font-weight-bold)' }}>{lift}</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 'var(--font-weight-normal)' }}>Week {week}</div>
                        </div>
                    </h3>
                    {completed && (
                        <span style={{
                            color: 'var(--color-success)',
                            fontSize: '0.875rem',
                            fontWeight: 'bold',
                            background: 'rgba(74, 222, 128, 0.1)',
                            padding: '0.5rem 0.75rem',
                            borderRadius: 'var(--radius-pill)',
                            border: '1px solid rgba(74, 222, 128, 0.3)'
                        }}>
                            ✓ Completed
                        </span>
                    )}
                </div>

                {renderSetGroup(workout.warmupSets, '🔥 Warm-up Sets', false, true)}
                {renderSetGroup(workout.sets, '💯 Working Sets', true, true)}
                {renderSetGroup(workout.bbbSets, '🏋️ BBB (Boring But Big) - 5x10', false, true)}

                <button
                    className="btn btn-primary"
                    style={{ marginTop: '1rem', width: '100%', opacity: completed ? 0.6 : 1, cursor: completed ? 'not-allowed' : 'pointer' }}
                    onClick={handleComplete}
                    disabled={completed}
                >
                    {completed ? '✅ Workout Completed' : '✓ Mark Complete'}
                </button>
            </div>
        </>
    );
};

export default WorkoutCard;
