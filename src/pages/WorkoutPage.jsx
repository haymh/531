import React, { useState } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import CycleControls from '../components/CycleControls';
import { LIFTS } from '../utils/constants';

const WorkoutPage = ({ oneRepMaxData, workoutProgressData, cycleData }) => {
    const [selectedLift, setSelectedLift] = useState(LIFTS[0]);
    const { currentWeeks } = cycleData;
    const { oneRepMaxes } = oneRepMaxData;

    return (
        <div style={{ display: 'grid', gap: '1rem', paddingBottom: '5rem' }}>
            <CycleControls cycleData={cycleData} oneRepMaxes={oneRepMaxes} />

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
        </div>
    );
};

export default WorkoutPage;
