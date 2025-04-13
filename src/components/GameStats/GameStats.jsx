import React from 'react';
import { useGameStore } from '../../store/store';
import styles from './GameStats.module.css';

function GameStats() {
    const { players, resetGame } = useGameStore();

    const totalAttempts = players.reduce((sum, player) => sum + player.attempts, 0);
    const correctAttempts = players.reduce((sum, player) => sum + player.matches, 0);
    const accuracy = totalAttempts > 0
        ? Math.round((correctAttempts / totalAttempts) * 100)
        : 0;

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const winner = players.reduce((leading, player) =>
            player.matches > leading.matches ? player : leading
        , players[0]);

    return (
        <div className={styles.statsContainer}>
            <h2>Game Completed!</h2>
            <div className={styles.winnerAnnouncement}>
                🏆 Winner: {winner.name} 🏆
            </div>
            <div className={styles.stats}>
                {players.map((player, index) => (
                    <div key={index} className={styles.playerStats}>
                        <h3>{player.name}</h3>
                        <p>Attempts: {player.attempts}</p>
                        <p>Matches: {player.matches}</p>
                        <p>Time: {formatTime(player.time)}</p>
                    </div>
                ))}
                <div className={styles.gameStats}>
                    <p><strong>Total Attempts:</strong> {totalAttempts}</p>
                    <p><strong>Accuracy:</strong> {accuracy}%</p>
                </div>
            </div>
            <button className={styles.playAgainButton} onClick={resetGame}>
                Play Again
            </button>
        </div>
    );
}

export default GameStats;