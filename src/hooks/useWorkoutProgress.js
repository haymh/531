import { useState, useEffect } from 'react';

const STORAGE_KEY = '531_progress';

export function useWorkoutProgress(onCycleComplete, onWeekAdvance, onSetStartDate) {
    const [completedWorkouts, setCompletedWorkouts] = useState({});

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setCompletedWorkouts(JSON.parse(stored));
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    const markComplete = (lift, week) => {
        const date = new Date().toISOString();
        const key = `${lift}-${week}`;
        const newProgress = { ...completedWorkouts, [key]: date };
        setCompletedWorkouts(newProgress);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));

        // Set start date on first workout completion
        if (onSetStartDate) {
            onSetStartDate(lift);
        }

        // Advance to next week for this lift
        if (onWeekAdvance) {
            onWeekAdvance(lift);
        }

        // Check if all 4 weeks are now complete for this lift
        if (week === 4) {
            const allWeeksComplete = [1, 2, 3, 4].every(w =>
                newProgress[`${lift}-${w}`]
            );

            if (allWeeksComplete && onCycleComplete) {
                // Clear the 4 weeks for this lift and trigger cycle increment
                const clearedProgress = { ...newProgress };
                [1, 2, 3, 4].forEach(w => {
                    delete clearedProgress[`${lift}-${w}`];
                });
                setCompletedWorkouts(clearedProgress);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(clearedProgress));

                // Trigger cycle completion callback
                onCycleComplete(lift);
            }
        }
    };

    const isComplete = (lift, week) => {
        return !!completedWorkouts[`${lift}-${week}`];
    };

    return { completedWorkouts, markComplete, isComplete };
}
