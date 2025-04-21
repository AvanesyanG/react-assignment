import styles from './DifficultySelector.module.css';
import { DIFFICULTIES } from '../../constants/gameConstants';

function DifficultySelector({ currentDifficulty, onChange }) {
    const difficulties = Object.values(DIFFICULTIES);

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Select Difficulty:</h3>
            <div className={styles.buttons}>
                {difficulties.map((difficulty) => (
                    <button
                        key={difficulty.id}
                        className={`${styles.button} ${currentDifficulty === difficulty.id ? styles.active : ''}`}
                        onClick={() => onChange(difficulty.id)}
                    >
                        {difficulty.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DifficultySelector;
