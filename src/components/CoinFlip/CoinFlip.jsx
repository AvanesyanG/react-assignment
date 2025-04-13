import React, { useState } from 'react';
import { useGameStore } from '../../store/store';
import styles from './CoinFlip.module.css';

const CoinFlip = () => {
    const [isFlipping, setIsFlipping] = useState(false);
    const { setGameStatus, setCurrentPlayer, players } = useGameStore();

    const handleFlip = () => {
        setIsFlipping(true);
        setTimeout(() => {
            const starter = Math.round(Math.random());
            setCurrentPlayer(starter);
            setGameStatus('playing');
            setIsFlipping(false);
        }, 2000);
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.coin} ${isFlipping ? styles.flip : ''}`}>
                <div
                    className={styles.front}
                    style={{ backgroundColor: players[0].color }}
                ></div>
                <div
                    className={styles.back}
                    style={{ backgroundColor: players[1].color }}
                ></div>
            </div>
            <button
                className={styles.flipButton}
                onClick={handleFlip}
                disabled={isFlipping}
            >
                {isFlipping ? 'Flipping...' : 'Roll to Start'}
            </button>
        </div>
    );
};

export default CoinFlip;