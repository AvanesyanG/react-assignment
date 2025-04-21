import styles from './Card.module.css';

function Card({ card, onClick, disabled }) {
    const handleClick = () => {
        if (!disabled && !card.isFlipped && !card.isMatched) {
            onClick(card);
        }
    };

    return (
        <div
            className={`${styles.card} ${card.isFlipped ? styles.flipped : ''} ${card.isMatched ? styles.matched : ''}`}
            onClick={handleClick}
        >
            <div className={styles.cardInner}>
                <div className={styles.cardFront}></div>
                <div className={styles.cardBack}>{card.value}</div>
            </div>
        </div>
    );
}

export default Card;