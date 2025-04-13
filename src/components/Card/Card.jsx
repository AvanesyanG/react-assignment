import React from 'react';
import { useGameStore } from '../../store/store';
import styles from './Card.module.css';

function Card({ card, disabled }) {
    const { flippedCards, flipCard } = useGameStore();
    const isFlipped = flippedCards.includes(card.id) || card.isMatched;

    const handleClick = () => {
        if (!disabled && !isFlipped) {
            flipCard(card.id);
        }
    };

    return (
        <div
            className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
            onClick={handleClick}
        >
            <div className={styles.cardInner}>
                <div className={styles.cardFront}></div>
                <div className={styles.cardBack}>
                    <img
                        src={card.value}
                        alt="card"
                        className={styles.cardImage}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) {
                                e.target.nextSibling.textContent = '❓';
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Card;