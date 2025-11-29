// Calculate plates needed for a given weight
// Assumes standard barbell (45 lbs) and plates on each side
export const calculatePlates = (totalWeight) => {
    const barWeight = 45;
    const weightPerSide = (totalWeight - barWeight) / 2;

    if (weightPerSide <= 0) {
        return { plates: [], perSide: 0 };
    }

    // Available plate sizes in descending order
    const availablePlates = [45, 35, 25, 10, 5, 2.5];
    const plates = [];
    let remaining = weightPerSide;

    for (const plate of availablePlates) {
        while (remaining >= plate) {
            plates.push(plate);
            remaining -= plate;
        }
    }

    // Round remaining to nearest 2.5
    if (remaining > 0) {
        const rounded = Math.round(remaining / 2.5) * 2.5;
        if (rounded > 0) {
            plates.push(rounded);
        }
    }

    return {
        plates,
        perSide: weightPerSide
    };
};

// Format plates for display
export const formatPlates = (plates) => {
    if (plates.length === 0) {
        return 'Bar only';
    }

    // Count occurrences of each plate
    const plateCounts = {};
    plates.forEach(plate => {
        plateCounts[plate] = (plateCounts[plate] || 0) + 1;
    });

    // Format as "2×45, 1×25, etc."
    return Object.entries(plateCounts)
        .sort(([a], [b]) => parseFloat(b) - parseFloat(a))
        .map(([plate, count]) => `${count}×${plate}`)
        .join(', ');
};
