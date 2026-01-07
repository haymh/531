import React, { useState } from 'react';
import { LIFTS } from '../../utils/constants';
import LiftIcon from '../LiftIcon';

const TrainingMaxSetup = ({ oneRepMaxData, onNext, onPrevious }) => {
    const { oneRepMaxes, updateMax } = oneRepMaxData;
    const [currentLiftIndex, setCurrentLiftIndex] = useState(0);
    const [errors, setErrors] = useState({});

    const currentLift = LIFTS[currentLiftIndex];
    const currentValue = oneRepMaxes[currentLift] || '';

    const handleChange = (value) => {
        // Clear error for this lift
        setErrors(prev => ({ ...prev, [currentLift]: null }));

        // Allow empty string or valid numbers
        if (value === '' || value === '-') {
            updateMax(currentLift, '');
            return;
        }

        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            updateMax(currentLift, value);
        }
    };

    const validateCurrent = () => {
        const value = parseFloat(currentValue);

        if (!currentValue || currentValue === '') {
            setErrors(prev => ({ ...prev, [currentLift]: 'Please enter your 1 rep max' }));
            return false;
        }

        if (isNaN(value) || value <= 0) {
            setErrors(prev => ({ ...prev, [currentLift]: 'Please enter a valid positive number' }));
            return false;
        }

        if (value < 50 || value > 1000) {
            setErrors(prev => ({ ...prev, [currentLift]: 'Please enter a realistic weight (50-1000 lbs)' }));
            return false;
        }

        return true;
    };

    const handleNext = () => {
        if (!validateCurrent()) return;

        if (currentLiftIndex < LIFTS.length - 1) {
            setCurrentLiftIndex(currentLiftIndex + 1);
        } else {
            // All lifts completed, proceed to next step
            onNext();
        }
    };

    const handlePrevious = () => {
        if (currentLiftIndex > 0) {
            setCurrentLiftIndex(currentLiftIndex - 1);
        } else {
            onPrevious();
        }
    };

    const trainingMax = currentValue ? Math.round(parseFloat(currentValue) * 0.9) : 0;
    const firstWorkoutWeight = trainingMax ? Math.round(trainingMax * 0.65) : 0;

    const liftTips = {
        'Squat': 'Your best back squat to parallel or below',
        'Bench Press': 'Your best competition-style bench press',
        'Deadlift': 'Your best conventional or sumo deadlift',
        'Overhead Press': 'Your best strict standing overhead press'
    };

    return (
        <div className="fade-in" style={{
            padding: '1.5rem 1rem',
            maxWidth: '450px',
            margin: '0 auto'
        }}>
            <h2 style={{
                marginBottom: '0.5rem',
                textAlign: 'center'
            }}>
                Set Your Training Maxes
            </h2>
            <p style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
                marginBottom: '1.5rem',
                textAlign: 'center'
            }}>
                Enter your 1 rep max for each lift
            </p>

            {/* Progress Indicator */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '2rem'
            }}>
                {LIFTS.map((lift, index) => (
                    <div
                        key={lift}
                        style={{
                            width: '40px',
                            height: '4px',
                            background: index <= currentLiftIndex ? 'var(--gradient-primary)' : 'var(--glass-border)',
                            borderRadius: 'var(--radius-pill)',
                            transition: 'all var(--transition-normal)'
                        }}
                    />
                ))}
            </div>

            {/* Current Lift Card */}
            <div style={{
                background: 'var(--glass-bg-light)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                marginBottom: '1.5rem'
            }}>
                {/* Lift Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'var(--gradient-primary)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <LiftIcon lift={currentLift} size={28} color="var(--color-text-dark)" />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{currentLift}</h3>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                            Lift {currentLiftIndex + 1} of {LIFTS.length}
                        </p>
                    </div>
                </div>

                {/* Tip */}
                <div style={{
                    padding: '0.75rem',
                    background: 'rgba(212, 255, 0, 0.1)',
                    border: '1px solid rgba(212, 255, 0, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)'
                }}>
                    💡 {liftTips[currentLift]}
                </div>

                {/* Input */}
                <div style={{ marginBottom: '1rem' }}>
                    <label
                        htmlFor="max-input"
                        style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--color-text-muted)'
                        }}
                    >
                        Your 1 Rep Max (lbs)
                    </label>
                    <input
                        id="max-input"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={currentValue}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder="Enter weight"
                        autoFocus
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1.25rem',
                            fontWeight: 'var(--font-weight-bold)',
                            textAlign: 'center',
                            border: errors[currentLift] ? '2px solid var(--color-danger)' : '1px solid var(--glass-border)',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--color-background)',
                            color: 'var(--color-text)'
                        }}
                    />
                    {errors[currentLift] && (
                        <p style={{
                            margin: '0.5rem 0 0 0',
                            fontSize: '0.875rem',
                            color: 'var(--color-danger)'
                        }}>
                            {errors[currentLift]}
                        </p>
                    )}
                </div>

                {/* Preview */}
                {currentValue && !errors[currentLift] && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.75rem',
                        marginTop: '1rem'
                    }}>
                        <div style={{
                            padding: '0.75rem',
                            background: 'var(--color-background)',
                            borderRadius: 'var(--radius-md)',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                Training Max (90%)
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
                                {trainingMax} lbs
                            </div>
                        </div>
                        <div style={{
                            padding: '0.75rem',
                            background: 'var(--color-background)',
                            borderRadius: 'var(--radius-md)',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                First Workout
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
                                {firstWorkoutWeight} lbs
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                    className="btn btn-secondary"
                    onClick={handlePrevious}
                    style={{ flex: 1 }}
                >
                    ← Back
                </button>
                <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    style={{ flex: 2 }}
                >
                    {currentLiftIndex < LIFTS.length - 1 ? 'Next Lift →' : 'Complete Setup →'}
                </button>
            </div>
        </div>
    );
};

export default TrainingMaxSetup;
