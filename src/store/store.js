import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGameStore = create(persist(
    (set, get) => ({
        difficulty: 'easy',
        gameStatus: 'setup',
        currentPlayer: 0,
        players: [
            {
                name: 'Player 1',
                attempts: 0,
                matches: 0,
                time: 0,
                color: '#FF6B6B'
            },
            {
                name: 'Player 2',
                attempts: 0,
                matches: 0,
                time: 0,
                color: '#4ECDC4'
            }
        ],
        cards: [],
        flippedCards: [],
        matchedPairs: 0,
        currentTurnStart: null,
        gameResult: null,

        setDifficulty: (difficulty) => set({ difficulty }),
        setPlayers: (players) => set({ players }),

        setCurrentPlayer: (index) => {
            const state = get();
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

            set({
                currentPlayer: index,
                players: updatedPlayers,
                currentTurnStart: now
            });
        },

        initializeGame: (cards) => set({
            cards,
            flippedCards: [],
            matchedPairs: 0,
            players: get().players.map(p => ({
                ...p,
                attempts: 0,
                matches: 0,
                time: 0
            })),
            currentTurnStart: Date.now(),
            gameResult: null,
            gameStatus: 'playing'
        }),

        flipCard: (cardId) => set(state => {
            if (
                state.flippedCards.length >= 2 ||
                state.cards.find(c => c.id === cardId)?.isMatched
            ) {
                return state;
            }

            return {
                cards: state.cards.map(card =>
                    card.id === cardId ? { ...card, isFlipped: true } : card
                ),
                flippedCards: [...state.flippedCards, cardId]
            };
        }),

        processTurn: async () => {
            const state = get();
            if (state.flippedCards.length !== 2) return;

            const [id1, id2] = state.flippedCards;
            const card1 = state.cards.find(c => c.id === id1);
            const card2 = state.cards.find(c => c.id === id2);
            const isMatch = card1.value === card2.value;

            const updatedPlayers = state.players.map((p, idx) => {
                if (idx === state.currentPlayer) {
                    return {
                        ...p,
                        attempts: p.attempts + 1,
                        matches: isMatch ? p.matches + 1 : p.matches
                    };
                }
                return p;
            });

            if (!isMatch) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            set({
                players: updatedPlayers,
                matchedPairs: isMatch ? state.matchedPairs + 1 : state.matchedPairs,
                cards: state.cards.map(card => {
                    if ([id1, id2].includes(card.id)) {
                        return isMatch
                            ? { ...card, isMatched: true }
                            : { ...card, isFlipped: false };
                    }
                    return card;
                }),
                flippedCards: []
            });

            if (!isMatch) {
                state.setCurrentPlayer((state.currentPlayer + 1) % 2);
            }
        },

        resetGame: (newCards) => {
            set({
                gameStatus: 'playing',
                currentPlayer: 0,
                flippedCards: [],
                matchedPairs: 0,
                players: get().players.map(p => ({
                    ...p,
                    attempts: 0,
                    matches: 0,
                    time: 0
                })),
                cards: newCards,
                currentTurnStart: Date.now(),
                gameResult: null
            });
        },

        quitGame: () => set({
            gameStatus: 'setup',
            cards: [],
            flippedCards: [],
            matchedPairs: 0,
            currentTurnStart: null,
            gameResult: null
        }),

        setGameStatus: (status) => set({ gameStatus: status })
    }),
    {
        name: 'memory-game-storage',
        partialize: (state) => ({
            players: state.players.map(p => ({
                name: p.name,
                color: p.color
            })),
            difficulty: state.difficulty
        })
    }
));