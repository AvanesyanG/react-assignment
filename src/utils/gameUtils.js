export const getGridSize = (difficulty) => {
    switch (difficulty) {
        case 'easy':
            return { rows: 4, cols: 4 };
        case 'medium':
            return { rows: 6, cols: 6 };
        case 'hard':
            return { rows: 8, cols: 8 };
        default:
            return { rows: 4, cols: 4 };
    }
};