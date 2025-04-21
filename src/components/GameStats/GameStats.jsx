import styles from './GameStats.module.css';

function GameStats({ stats, onPlayAgain }) {
    const { duration, attempts, correctAttempts } = stats;

    const accuracy = attempts > 0
        ? Math.round((correctAttempts / attempts) * 100)
        : 0;

    return (
        <div className={styles.statsContainer}>
            <h2>Game Completed!</h2>
            <div className={styles.stats}>
                <p><strong>Time:</strong> {duration}</p>
                <p><strong>Attempts:</strong> {attempts}</p>
                <p><strong>Correct Matches:</strong> {correctAttempts}</p>
                <p><strong>Accuracy:</strong> {accuracy}%</p>
            </div>
            <button className={styles.playAgainButton} onClick={onPlayAgain}>
                Play Again
            </button>
        </div>
    );
}

export default GameStats;