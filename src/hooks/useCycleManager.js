import { useState, useEffect } from 'react';

const STORAGE_KEY_CYCLES = '531_cycles';
const STORAGE_KEY_CURRENT_WEEKS = '531_current_weeks';
const STORAGE_KEY_START_DATES = '531_cycle_start_dates';

export const useCycleManager = (oneRepMaxes, updateAllMaxes) => {
    const [cycles, setCycles] = useState({
        'Squat': 1,
        'Bench Press': 1,
        'Deadlift': 1,
        'Overhead Press': 1
    });

    const [currentWeeks, setCurrentWeeks] = useState({
        'Squat': 1,
        'Bench Press': 1,
        'Deadlift': 1,
        'Overhead Press': 1
    });

    const [startDates, setStartDates] = useState({
        'Squat': null,
        'Bench Press': null,
        'Deadlift': null,
        'Overhead Press': null
    });

    useEffect(() => {
        try {
            const storedCycles = localStorage.getItem(STORAGE_KEY_CYCLES);
            if (storedCycles) {
                setCycles(JSON.parse(storedCycles));
            }

            const storedWeeks = localStorage.getItem(STORAGE_KEY_CURRENT_WEEKS);
            if (storedWeeks) {
                setCurrentWeeks(JSON.parse(storedWeeks));
            }

            const storedStartDates = localStorage.getItem(STORAGE_KEY_START_DATES);
            if (storedStartDates) {
                setStartDates(JSON.parse(storedStartDates));
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    const advanceWeek = (lift) => {
        const newWeeks = {
            ...currentWeeks,
            [lift]: currentWeeks[lift] < 4 ? currentWeeks[lift] + 1 : 1
        };
        setCurrentWeeks(newWeeks);
        localStorage.setItem(STORAGE_KEY_CURRENT_WEEKS, JSON.stringify(newWeeks));
    };

    const incrementCycle = (lift) => {
        const newCycles = {
            ...cycles,
            [lift]: cycles[lift] + 1
        };
        setCycles(newCycles);
        localStorage.setItem(STORAGE_KEY_CYCLES, JSON.stringify(newCycles));

        // Reset to week 1 for this lift
        const newWeeks = {
            ...currentWeeks,
            [lift]: 1
        };
        setCurrentWeeks(newWeeks);
        localStorage.setItem(STORAGE_KEY_CURRENT_WEEKS, JSON.stringify(newWeeks));

        // Increment Max for this lift
        if (oneRepMaxes && updateAllMaxes) {
            const increment = (lift === 'Squat' || lift === 'Deadlift') ? 10 : 5;
            const newMaxes = {
                ...oneRepMaxes,
                [lift]: (parseFloat(oneRepMaxes[lift]) || 0) + increment
            };
            updateAllMaxes(newMaxes);
        }
    };

    const setStartDate = (lift) => {
        // Only set start date if it hasn't been set yet
        if (!startDates[lift]) {
            const now = new Date().toISOString();
            const newStartDates = {
                ...startDates,
                [lift]: now
            };
            setStartDates(newStartDates);
            localStorage.setItem(STORAGE_KEY_START_DATES, JSON.stringify(newStartDates));
        }
    };

    return { cycles, currentWeeks, advanceWeek, incrementCycle, startDates, setStartDate };
};
