import React from 'react';
import { useGameStore } from './store/store';
import { useGameLogic } from './hooks/useGameLogic';
import styles from './App.module.css';
import DifficultySelector from './components/DifficultySelector/DifficultySelector';
import GameBoard from './components/GameBoard/GameBoard';
import GameStats from './components/GameStats/GameStats';
import StartScreen from './components/StartScreen/StartScreen';
import CoinFlip from './components/CoinFlip/CoinFlip';
import QuitButton from './components/QuitButton/QuitButton';

const App = () => {
    const { gameStatus, difficulty, setDifficulty } = useGameStore();
    useGameLogic();

    const showQuitButton = ['rolling', 'playing'].includes(gameStatus);

    return (
        <div className={styles.app}>
            <h1 className={styles.title}>Memory Card Game</h1>

            {showQuitButton && <QuitButton />}

            {gameStatus === 'setup' && (
                <DifficultySelector
                    currentDifficulty={difficulty}
                    onChange={(newDiff) => {
                        if (window.confirm('Changing difficulty will reset the game. Continue?')) {
                            useGameStore.getState().quitGame();
                            setDifficulty(newDiff);
                        }
                    }}
                />
            )}

            {(() => {
                switch (gameStatus) {
                    case 'setup': return <StartScreen />;
                    case 'rolling': return <CoinFlip />;
                    case 'playing': return <GameBoard />;
                    case 'finished': return <GameStats />;
                    default: return <StartScreen />;
                }
            })()}
        </div>
    );
};

export default App;