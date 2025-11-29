import React from 'react';
import ProgressionView from '../components/ProgressionView';
import CalendarView from '../components/CalendarView';

const ProgressionPage = ({ oneRepMaxes, cycles, startDates, workoutProgressData }) => {
    return (
        <div style={{ paddingBottom: '5rem' }}>
            <ProgressionView oneRepMaxes={oneRepMaxes} cycles={cycles} startDates={startDates} />
            <div style={{ height: '2rem' }}></div>
            <CalendarView workoutProgressData={workoutProgressData} />
        </div>
    );
};

export default ProgressionPage;
