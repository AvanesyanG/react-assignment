import React from 'react';
import { useGameStore } from '../../store/store';
import styles from './PlayerIndicator.module.css';

const PlayerIndicator = () => {
    const { currentPlayer, players } = useGameStore();

    return (
        <div className={styles.container}>
            {players.map((player, index) => (
                <div
                    key={index}
                    className={`${styles.player} ${index === currentPlayer ? styles.active : ''}`}
                    style={{
                        borderColor: player.color,
                        backgroundColor: index === currentPlayer ? `${player.color}15` : 'transparent'
                    }}
                >
                    <div className={styles.avatar} style={{ backgroundColor: player.color }} />
                    <div className={styles.stats}>
                        <span className={styles.name}>{player.name}</span>
                        <div className={styles.numbers}>
                            <div className={styles.stat}>
                                <span className={styles.label}>Matches:</span>
                                <span className={styles.value}>{player.matches}</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.label}>Attempts:</span>
                                <span className={styles.value}>{player.attempts}</span>
                            </div>
                        </div>
                    </div>
                    {index === currentPlayer && (
                        <div className={styles.turnBadge} style={{ backgroundColor: player.color }}>
                            Current Turn
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PlayerIndicator;