import React, { useState, useCallback } from 'react';
import styles from './App.module.css';
import DifficultySelector from './components/DifficultySelector/DifficultySelector';
import GameBoard from './components/GameBoard/GameBoard';
import GameStats from './components/GameStats/GameStats';
import { useGameTimer } from './hooks/useGameTimer';

function App() {
    const [difficulty, setDifficulty] = useState('easy');
    const [gameStarted, setGameStarted] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [gameStats, setGameStats] = useState({
        attempts: 0,
        correctAttempts: 0
    });
    const { duration, resetTimer } = useGameTimer(gameStarted && !gameCompleted);

    const resetGame = useCallback(() => {
        setGameStarted(false);
        setGameCompleted(false);
        resetTimer();
        setGameStats({
            attempts: 0,
            correctAttempts: 0
        });
    }, [resetTimer]);

    const handleDifficultyChange = useCallback((newDifficulty) => {
        if (gameStarted && !window.confirm('Changing difficulty will reset your current game. Are you sure?')) {
            return;
        }
        setDifficulty(newDifficulty);
        resetGame();
    }, [gameStarted, resetGame]);

    const startGame = useCallback(() => {
        setGameStarted(true);
        setGameCompleted(false);
    }, []);

    const completeGame = useCallback((finalStats) => {
        setGameCompleted(true);
        setGameStats(finalStats);
    }, []);

    return (
        <div className={styles.app}>
            <h1 className={styles.title}>Memory Card Game</h1>

            <DifficultySelector
                currentDifficulty={difficulty}
                onChange={handleDifficultyChange}
            />

            {!gameStarted ? (
                <button className={styles.startButton} onClick={startGame}>
                    Start Game
                </button>
            ) : (
                <GameBoard
                    difficulty={difficulty}
                    onGameComplete={completeGame}
                />
            )}

            {gameCompleted && (
                <GameStats
                    stats={{
                        duration,
                        attempts: gameStats.attempts,
                        correctAttempts: gameStats.correctAttempts
                    }}
                    onPlayAgain={resetGame}
                />
            )}
        </div>
    );
}

export default App;