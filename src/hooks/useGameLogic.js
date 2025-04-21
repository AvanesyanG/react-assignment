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

            const [player1, player2] = updatedPlayers;
            let winner = null;

            if (player1.matches !== player2.matches) {
                winner = player1.matches > player2.matches ? 0 : 1;
            } else if (player1.attempts !== player2.attempts) {
                winner = player1.attempts < player2.attempts ? 0 : 1;
            } else if (player1.time !== player2.time) {
                winner = player1.time < player2.time ? 0 : 1;
            }

            useGameStore.setState({
                players: updatedPlayers,
                currentTurnStart: null,
                gameResult: {
                    winner,
                    isDraw: winner === null
                }
            });

            setTimeout(() => {
                setGameStatus('finished');
            }, 600);
        }
    }, [matchedPairs, difficulty, setGameStatus]);
};