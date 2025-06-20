import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type BasketballGameState = "playing" | "paused" | "ended" | "leaderboard";

interface BasketballState {
  // Game state
  gameState: BasketballGameState;
  score: number;
  timeLeft: number;
  
  // Player state
  playerPosition: [number, number, number];
  
  // Ball state
  ballPosition: [number, number, number];
  ballVelocity: [number, number, number];
  
  // Actions
  setGameState: (state: BasketballGameState) => void;
  incrementScore: () => void;
  decrementTime: () => void;
  resetGame: () => void;
  showLeaderboard: () => void;
  
  // Player actions
  setPlayerPosition: (position: [number, number, number]) => void;
  
  // Ball actions
  setBallPosition: (position: [number, number, number]) => void;
  setBallVelocity: (velocity: [number, number, number]) => void;
}

const INITIAL_TIME = 60; // 60 seconds per game

export const useBasketball = create<BasketballState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    gameState: "playing",
    score: 0,
    timeLeft: INITIAL_TIME,
    
    // Player initial position
    playerPosition: [0, 1, 5],
    
    // Ball initial position (with player)
    ballPosition: [0, 2, 5],
    ballVelocity: [0, 0, 0],
    
    // Game actions
    setGameState: (gameState) => set({ gameState }),
    
    incrementScore: () => set((state) => ({ score: state.score + 1 })),
    
    decrementTime: () => set((state) => {
      const newTime = Math.max(0, state.timeLeft - 1);
      if (newTime === 0) {
        return { timeLeft: newTime, gameState: "ended" };
      }
      return { timeLeft: newTime };
    }),
    
    resetGame: () => set({
      gameState: "playing",
      score: 0,
      timeLeft: INITIAL_TIME,
      playerPosition: [0, 1, 5],
      ballPosition: [0, 2, 5],
      ballVelocity: [0, 0, 0]
    }),
    
    showLeaderboard: () => set({ gameState: "leaderboard" }),
    
    // Player actions
    setPlayerPosition: (playerPosition) => set({ playerPosition }),
    
    // Ball actions
    setBallPosition: (ballPosition) => set({ ballPosition }),
    setBallVelocity: (ballVelocity) => set({ ballVelocity })
  }))
);
