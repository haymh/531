import { WORKOUT_WEEKS } from './constants.js';

export const roundToNearest = (value, step = 2.5) => {
    return Math.round(value / step) * step;
};

export const calculateTrainingMax = (oneRepMax) => {
    return oneRepMax * 0.9;
};

export const generateWarmupSets = (trainingMax) => {
    return [
        { weight: roundToNearest(trainingMax * 0.40), reps: 5, label: 'Warm-up' },
        { weight: roundToNearest(trainingMax * 0.50), reps: 5, label: 'Warm-up' },
        { weight: roundToNearest(trainingMax * 0.60), reps: 3, label: 'Warm-up' }
    ];
};

export const generateBBBSets = (trainingMax) => {
    const weight = roundToNearest(trainingMax * 0.50); // 50% of TM for BBB
    return Array(5).fill({ weight, reps: 10, label: 'BBB' });
};

export const generateWorkout = (lift, trainingMax, weekNum) => {
    const week = WORKOUT_WEEKS[weekNum];
    const warmupSets = generateWarmupSets(trainingMax);
    const workingSets = week.sets.map((set) => ({
        weight: roundToNearest(trainingMax * set.percentage),
        reps: set.reps,
        percentage: set.percentage,
        label: 'Working'
    }));
    const bbbSets = generateBBBSets(trainingMax);

    return {
        lift,
        week: weekNum,
        warmupSets,
        sets: workingSets,
        bbbSets
    };
};

export const generateCycle = (oneRepMaxes) => {
    // oneRepMaxes: { Squat: 100, Bench: 80, ... }
    const cycle = {};
    Object.entries(oneRepMaxes).forEach(([lift, max]) => {
        const tm = calculateTrainingMax(max);
        cycle[lift] = {
            trainingMax: tm,
            weeks: [1, 2, 3, 4].map(week => generateWorkout(lift, tm, week))
        };
    });
    return cycle;
};
