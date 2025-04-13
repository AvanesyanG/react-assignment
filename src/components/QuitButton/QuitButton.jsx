import { useGameStore } from '../../store/store';
import styles from './QuitButton.module.css';

const QuitButton = () => {
    const quitGame = useGameStore(state => state.quitGame);

    const handleQuit = () => {
        if (window.confirm('Are you sure you want to quit current game?')) {
            quitGame();
        }
    };

    return (
        <button className={styles.quitButton} onClick={handleQuit}>
            Quit Game
        </button>
    );
};

export default QuitButton;