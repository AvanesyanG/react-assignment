import React, { useState } from 'react';
import { useGameStore } from '../../store/store';
import { useGameImages } from '../../hooks/useGameImages';
import styles from './GameStats.module.css';

function GameStats() {
    const { players, resetGame, gameResult, difficulty } = useGameStore();
    const [refreshCount, setRefreshCount] = useState(0);
    const { data: images } = useGameImages(difficulty, refreshCount);

    const calculateAccuracy = (matches, attempts) => {
        if (attempts === 0) return 0;
        const accuracy = (matches / attempts) * 100;
        return Math.min(100, Math.round(accuracy));
    };

    const calculateTotalAccuracy = () => {
        const totalMatches = players.reduce((sum, p) => sum + p.matches, 0);
        const totalAttempts = players.reduce((sum, p) => sum + p.attempts, 0);
        return totalAttempts ? Math.round((totalMatches / totalAttempts) * 100) : 0;
    };

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayAgain = () => {
        setRefreshCount(prev => prev + 1);

        if (images?.length > 0) {
            const newCards = [...images, ...images]
                .sort(() => Math.random() - 0.5)
                .map((url, index) => ({
                    id: `${index}-${url}-${Date.now()}`,
                    value: url,
                    isFlipped: false,
                    isMatched: false
                }));
            resetGame(newCards);
        }
    };

    const totalAccuracy = calculateTotalAccuracy();
    const player1 = players[0];
    const player2 = players[1];

    return (
        <div className={styles.statsContainer}>
            <h2>Game Completed!</h2>
            <div className={styles.winnerAnnouncement}>
                {gameResult?.isDraw ? (
                    "🤝 It's a Draw! 🤝"
                ) : (
                    `🏆 Winner: ${players[gameResult?.winner]?.name} 🏆`
                )}
            </div>

            <div className={styles.stats}>
                <div className={styles.playerStats}>
                    <h3>{player1.name}</h3>
                    <p>Correct Matches: {player1.matches}</p>
                    <p>Total Attempts: {player1.attempts}</p>
                    <p>Accuracy: {calculateAccuracy(player1.matches, player1.attempts)}%</p>
                    <p>Time: {formatTime(player1.time)}</p>
                </div>

                <div className={styles.playerStats}>
                    <h3>{player2.name}</h3>
                    <p>Correct Matches: {player2.matches}</p>
                    <p>Total Attempts: {player2.attempts}</p>
                    {player2.attempts > 0 ? (
                        <p>Accuracy: {calculateAccuracy(player2.matches, player2.attempts)}%</p>
                    ) : (
                        <p>Did not attempt any matches</p>
                    )}
                    <p>Time: {formatTime(player2.time)}</p>
                </div>

                <div className={styles.totalAccuracy}>
                    <h3>Game Summary</h3>
                    <p>Total Accuracy: {totalAccuracy}% (combined for all players)</p>
                </div>
            </div>

            <button className={styles.playAgainButton} onClick={handlePlayAgain}>
                Play Again
            </button>
        </div>
    );
}

export default GameStats;