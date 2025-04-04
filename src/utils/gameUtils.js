const emojis = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
    '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦄',
    '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🦂',
    '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓',
    '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃',
    '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕',
    '🐩', '🦮', '🐕‍🦺', '🐈', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩',
    '🦝', '🦨', '🦡', '🦦', '🦥', '🐿', '🦔', '🌵', '🎄', '🌲',
    '🌳', '🌴', '🌱', '🌿', '☘️', '🍀', '🎍', '🎋', '🍃', '🍂',
    '🍁', '🍄', '🐚', '🌾', '💐', '🌷', '🌹', '🥀', '🌺', '🌸'
];


export const getCardValues = (difficulty) => {
    let pairs;
    switch (difficulty) {
        case 'easy':
            pairs = 8;
            break;
        case 'medium':
            pairs = 18;
            break;
        case 'hard':
            pairs = 32;
            break;
        default:
            pairs = 8;
    }

    const shuffled = [...emojis].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, pairs);

    const pairedValues = [...selected, ...selected];

    return pairedValues.sort(() => 0.5 - Math.random());
};

export const initializeCards = (difficulty) => {
    const values = getCardValues(difficulty);
    return values.map((value, index) => ({
        id: `${index}-${value}`,
        value,
        isFlipped: false,
        isMatched: false,
    }));
};

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