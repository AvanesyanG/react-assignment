import React, { useEffect } from 'react';
import { useGameStore } from '../../store/store';
import Card from '../Card/Card';
import PlayerIndicator from '../PlayerIndicator/PlayerIndicator';
import styles from './GameBoard.module.css';
import { useGameImages } from '../../hooks/useGameImages';
import { getGridSize } from '../../utils/gameUtils';

const GameBoard = () => {
    const { difficulty, cards, flippedCards, initializeGame, gameStatus } = useGameStore();
    const { data: images, isLoading, error } = useGameImages(difficulty);
    const gridSize = getGridSize(difficulty);

    useEffect(() => {
        if (gameStatus === 'playing' && images?.length > 0) {
            const paired = [...images, ...images]
                .sort(() => Math.random() - 0.5)
                .map((url, index) => ({
                    id: `${index}-${url}`,
                    value: url,
                    isFlipped: false,
                    isMatched: false
                }));
            initializeGame(paired);
        }
    }, [images, initializeGame, gameStatus]);

    if (gameStatus !== 'playing') return null;

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <p>Loading game images...</p>
                <div className={styles.loader}></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error}>
                <p>Error loading images: {error.message}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    if (!cards.length) {
        return <div className={styles.error}>No cards available to start the game</div>;
    }

    return (
        <div className={styles.gameBoard}>
            <PlayerIndicator />
            <div
                className={styles.grid}
                style={{
                    gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`
                }}
            >
                {cards.map((card) => (
                    <div key={card.id} className={styles.gridItem}>
                        <Card
                            card={card}
                            disabled={flippedCards.length === 2}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameBoard;