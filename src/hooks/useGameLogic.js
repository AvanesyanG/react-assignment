import { initializeCards, getGridSize } from '../utils/gameUtils';
import {useState} from "react";

export const useGameLogic = (difficulty) => {
    const [cards, setCards] = useState(() => initializeCards(difficulty));
    const [flippedCards, setFlippedCards] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [stats, setStats] = useState({
        attempts: 0,
        correctAttempts: 0
    });

    const gridSize = getGridSize(difficulty);

    const handleCardClick = (clickedCard) => {
        if (disabled || clickedCard.isFlipped || clickedCard.isMatched) return;

        const newCards = cards.map(card =>
            card.id === clickedCard.id ? { ...card, isFlipped: true } : card
        );
        setCards(newCards);

        if (flippedCards.length === 0) {
            setFlippedCards([clickedCard.id]);
        } else {
            setDisabled(true);
            setStats(prev => ({ ...prev, attempts: prev.attempts + 1 }));

            const firstCard = cards.find(card => card.id === flippedCards[0]);
            const isMatch = firstCard.value === clickedCard.value;

            if (isMatch) {
                setStats(prev => ({ ...prev, correctAttempts: prev.correctAttempts + 1 }));
            }

            setTimeout(() => {
                setCards(cards => cards.map(card => {
                    if (isMatch && (card.id === firstCard.id || card.id === clickedCard.id)) {
                        return { ...card, isMatched: true };
                    }
                    return !isMatch && (card.id === firstCard.id || card.id === clickedCard.id)
                        ? { ...card, isFlipped: false }
                        : card;
                }));

                setFlippedCards([]);
                setDisabled(false);
                if (isMatch) setMatchedPairs(prev => prev + 1);
            }, 500);
        }
    };

    return {
        cards,
        gridSize,
        handleCardClick,
        disabled,
        flippedCards,
        matchedPairs,
        stats
    };
};
