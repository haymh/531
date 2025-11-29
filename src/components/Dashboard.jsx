import React, { useState, useEffect } from 'react';
import InputForm from './InputForm';
import WorkoutCard from './WorkoutCard';
import CalendarView from './CalendarView';
import CycleControls from './CycleControls';
import ProgressionView from './ProgressionView';
import { LIFTS } from '../utils/constants';
import LiftIcon from './LiftIcon';

const Dashboard = ({ oneRepMaxData, workoutProgressData, cycleData }) => {
    const [selectedLift, setSelectedLift] = useState(LIFTS[0]);
    const [activeTab, setActiveTab] = useState('workout');
    const { currentWeeks, cycles, startDates } = cycleData;
    const { oneRepMaxes } = oneRepMaxData;

    // Check if any maxes are set
    const hasMaxes = Object.values(oneRepMaxes).some(max => max > 0);
    const [showInputForm, setShowInputForm] = useState(true);

    // Update showInputForm only when hasMaxes changes from false to true
    useEffect(() => {
        if (hasMaxes && showInputForm) {
            // User has entered maxes, we can hide the form
            // But don't do it immediately - let them finish entering all values
            return;
        }
        if (!hasMaxes && !showInputForm) {
            // No maxes and form is hidden, show it
            setShowInputForm(true);
        }
    }, [hasMaxes]); // Only depend on hasMaxes, not oneRepMaxes

    return (
        <div style={{ display: 'grid', gap: '1rem', paddingBottom: '1rem' }}>
            <CycleControls cycleData={cycleData} oneRepMaxes={oneRepMaxes} />

            {showInputForm ? (
                <div>
                    <InputForm oneRepMaxData={oneRepMaxData} />
                    {hasMaxes && (
                        <button
                            className="btn"
                            style={{ marginTop: '1rem', width: '100%' }}
                            onClick={() => setShowInputForm(false)}
                        >
                            ✓ Done
                        </button>
                    )}
                </div>
            ) : (
                <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 5v14" /><path d="M18 5v14" /><path d="M2 12h20" /></svg>
                            One Rep Maxes
                        </h4>
                        <div style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {LIFTS.map(lift => (
                                <div key={lift} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <span style={{ color: 'var(--color-primary)' }}><LiftIcon lift={lift} size={16} /></span>
                                    <span>{lift}: {oneRepMaxes[lift] || 0}lb</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowInputForm(true)}
                    >
                        ✏️ Edit
                    </button>
                </div>
            )}

            {/* Tab Navigation */}
            <div className="card" style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <button
                    className={activeTab === 'workout' ? 'btn btn-primary' : 'btn'}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    onClick={() => setActiveTab('workout')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11" /><path d="M6.5 17.5h11" /><path d="M6 20v-2a6 6 0 1 1 12 0v2" /><path d="M6 4v2a6 6 0 0 1 12 0V4" /></svg>
                    Today's Workout
                </button>
                <button
                    className={activeTab === 'progression' ? 'btn btn-primary' : 'btn'}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    onClick={() => setActiveTab('progression')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                    Progression
                </button>
            </div>

            {activeTab === 'workout' ? (
                <>
                    <div className="card">
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11" /><path d="M6.5 17.5h11" /><path d="M6 20v-2a6 6 0 1 1 12 0v2" /><path d="M6 4v2a6 6 0 0 1 12 0V4" /></svg>
                            Select Lift
                        </h3>
                        <select
                            value={selectedLift}
                            onChange={(e) => setSelectedLift(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-background)', color: 'var(--color-text)', border: '1px solid var(--color-border)', fontSize: '1rem' }}
                        >
                            {LIFTS.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                    </div>

                    <WorkoutCard
                        lift={selectedLift}
                        week={currentWeeks[selectedLift]}
                        oneRepMaxData={oneRepMaxData}
                        workoutProgressData={workoutProgressData}
                    />

                    <CalendarView workoutProgressData={workoutProgressData} />
                </>
            ) : (
                <ProgressionView oneRepMaxes={oneRepMaxes} cycles={cycles} startDates={startDates} />
            )}
        </div>
    );
};

export default Dashboard;
