import { calculateTrainingMax, generateWorkout, roundToNearest } from './src/utils/calculator.js';

const test1RM = 100;
const tm = calculateTrainingMax(test1RM);
console.log(`1RM: ${test1RM}, TM: ${tm}`);

const week1 = generateWorkout('Test', tm, 1);
console.log('Week 1 Weights:', week1.sets.map(s => s.weight));

const week2 = generateWorkout('Test', tm, 2);
console.log('Week 2 Weights:', week2.sets.map(s => s.weight));

const week3 = generateWorkout('Test', tm, 3);
console.log('Week 3 Weights:', week3.sets.map(s => s.weight));

// Check rounding
console.log('Rounding 58.5 (Target 57.5 or 60):', roundToNearest(58.5));
console.log('Rounding 59 (Target 60):', roundToNearest(59));
