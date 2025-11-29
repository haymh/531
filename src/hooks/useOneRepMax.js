import { useState, useEffect } from 'react';

const STORAGE_KEY_1RM = '531_1rm';

export const useOneRepMax = () => {
    const [oneRepMaxes, setOneRepMaxes] = useState({
        Squat: 0,
        'Bench Press': 0,
        Deadlift: 0,
        'Overhead Press': 0
    });

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_1RM);
            if (stored) {
                setOneRepMaxes(JSON.parse(stored));
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    const updateMax = (lift, weight) => {
        const newMaxes = { ...oneRepMaxes, [lift]: parseFloat(weight) || 0 };
        setOneRepMaxes(newMaxes);
        localStorage.setItem(STORAGE_KEY_1RM, JSON.stringify(newMaxes));
    };

    const updateAllMaxes = (newMaxes) => {
        setOneRepMaxes(newMaxes);
        localStorage.setItem(STORAGE_KEY_1RM, JSON.stringify(newMaxes));
    };

    return { oneRepMaxes, updateMax, updateAllMaxes };
};
