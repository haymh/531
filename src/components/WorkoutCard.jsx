import React from 'react';
import { calculateTrainingMax, generateWorkout, roundToNearest } from '../utils/calculator';
import { calculatePlates, formatPlates } from '../utils/plateCalculator';
import LiftIcon from './LiftIcon';

const WorkoutCard = ({ lift, week, oneRepMaxData, workoutProgressData }) => {
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

    const renderSetGroup = (sets, title, showPercentage = false, showPlates = false) => (
        <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {title}
            </h4>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
                {sets.map((set, index) => {
                    const plateInfo = showPlates ? calculatePlates(set.weight) : null;
                    return (
                        <div key={index} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '0.75rem',
                            backgroundColor: 'var(--color-background)',
                            borderRadius: 'var(--radius-sm)',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {showPercentage && set.percentage && (
                                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                                        {Math.round(set.percentage * 100)}%
                                    </span>
                                )}
                                <strong style={{ fontSize: '1.125rem', marginLeft: showPercentage ? '0' : 'auto' }}>
                                    {set.weight} x {set.reps}
                                </strong>
                            </div>
                            {showPlates && plateInfo && plateInfo.plates.length > 0 && (
                                <div style={{
                                    marginTop: '0.5rem',
                                    fontSize: '0.75rem',
                                    color: 'var(--color-text-muted)',
                                    paddingTop: '0.5rem',
                                    borderTop: '1px solid var(--color-border)'
                                }}>
                                    <span style={{ fontWeight: '500' }}>Per side:</span> {formatPlates(plateInfo.plates)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--color-primary)' }}>
                        <LiftIcon lift={lift} size={28} />
                    </span>
                    {lift} - Week {week}
                </h3>
                {completed && <span style={{ color: 'var(--color-success)', fontSize: '0.875rem', fontWeight: 'bold' }}>✓ Completed</span>}
            </div>

            {renderSetGroup(workout.warmupSets, '🔥 Warm-up Sets', false, true)}
            {renderSetGroup(workout.sets, '💯 Working Sets', true, true)}
            {renderSetGroup(workout.bbbSets, '🏋️ BBB (Boring But Big) - 5x10', false, true)}

            <button
                className="btn btn-primary"
                style={{ marginTop: '1rem', width: '100%', opacity: completed ? 0.5 : 1 }}
                onClick={() => markComplete(lift, week)}
                disabled={completed}
            >
                {completed ? '✅ Workout Completed' : '✓ Mark Complete'}
            </button>
        </div>
    );
};

export default WorkoutCard;
