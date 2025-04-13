import { useEffect } from 'react';
import { useGameStore } from '../store/store';

export const useGameLogic = () => {
    const { flippedCards, processTurn, matchedPairs, difficulty, setGameStatus } = useGameStore();

    useEffect(() => {
        if (flippedCards.length === 2) {
            processTurn();
        }
    }, [flippedCards, processTurn]);

    useEffect(() => {
        const totalPairs = { easy: 8, medium: 18, hard: 32 }[difficulty];
        if (matchedPairs === totalPairs) {
            const state = useGameStore.getState();
            const now = Date.now();
            const updatedPlayers = state.players.map((player, idx) => {
                if (idx === state.currentPlayer) {
                    return {
                        ...player,
                        time: player.time + (now - state.currentTurnStart)
                    };
                }
                return player;
            });

            useGameStore.setState({
                players: updatedPlayers,
                currentTurnStart: null
            });

            setTimeout(() => {
                setGameStatus('finished');
            }, 600);
        }
    }, [matchedPairs, difficulty, setGameStatus]);
};