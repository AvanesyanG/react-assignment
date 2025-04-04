import React from 'react';
import { useGameLogic } from '../../hooks/useGameLogic';
import Card from '../Card/Card';
import styles from './GameBoard.module.css';

function GameBoard({ difficulty, onGameComplete }) {
    const {
        cards,
        gridSize,
        handleCardClick,
        disabled,
        flippedCards,
        matchedPairs,
        stats
    } = useGameLogic(difficulty);

    React.useEffect(() => {
        const totalPairs = {
            easy: 8,
            medium: 18,
            hard: 32,
        }[difficulty];

        if (matchedPairs === totalPairs) {
            onGameComplete(stats);
        }
    }, [matchedPairs, difficulty, onGameComplete, stats]);

    return (
        <div className={styles.gameBoard}>
            <div
                className={styles.grid}
                style={{
                    gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
                    gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
                }}
            >
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        onClick={handleCardClick}
                        disabled={disabled || flippedCards.includes(card.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default GameBoard;