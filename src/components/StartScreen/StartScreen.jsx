import React from 'react';
import { useGameStore } from '../../store/store';
import styles from './StartScreen.module.css';

const StartScreen = () => {
    const { players, setPlayers, setDifficulty, setGameStatus } = useGameStore();

    const handleStart = () => {
        setGameStatus('rolling');
    };

    return (
        <div className={styles.container}>
            <h2>Player Setup</h2>
            <div className={styles.playersSetup}>
                {players.map((player, index) => (
                    <div key={index} className={styles.playerInput}>
                        <input
                            type="text"
                            value={player.name}
                            onChange={(e) => {
                                const newPlayers = [...players];
                                newPlayers[index].name = e.target.value;
                                setPlayers(newPlayers);
                            }}
                        />
                        <input
                            type="color"
                            value={player.color}
                            onChange={(e) => {
                                const newPlayers = [...players];
                                newPlayers[index].color = e.target.value;
                                setPlayers(newPlayers);
                            }}
                        />
                    </div>
                ))}
            </div>
            <button className={styles.startButton} onClick={handleStart}>
                Start Game
            </button>
        </div>
    );
};

export default StartScreen;