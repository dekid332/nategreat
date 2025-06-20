import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  wallet: string;
  date: string;
}

interface LeaderboardState {
  scores: LeaderboardEntry[];
  addScore: (entry: Omit<LeaderboardEntry, "id">) => void;
  clearScores: () => void;
  getTopScores: (limit?: number) => LeaderboardEntry[];
}

export const useLeaderboard = create<LeaderboardState>()(
  persist(
    (set, get) => ({
      scores: [],
      
      addScore: (entry) => {
        const newEntry: LeaderboardEntry = {
          ...entry,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
        };
        
        set((state) => {
          const updatedScores = [...state.scores, newEntry]
            .sort((a, b) => b.score - a.score) // Sort by score descending
            .slice(0, 100); // Keep only top 100 scores
          
          return { scores: updatedScores };
        });
      },
      
      clearScores: () => set({ scores: [] }),
      
      getTopScores: (limit = 10) => {
        const { scores } = get();
        return scores.slice(0, limit);
      }
    }),
    {
      name: "nate-the-great-leaderboard", // localStorage key
      version: 1
    }
  )
);
