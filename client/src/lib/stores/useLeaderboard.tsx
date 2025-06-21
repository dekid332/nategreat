import { create } from "zustand";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface LeaderboardEntry {
  id: number;
  playerName: string;
  score: number;
  wallet: string;
  createdAt: string;
}

interface LeaderboardState {
  isSubmitting: boolean;
  setSubmitting: (submitting: boolean) => void;
}

export const useLeaderboard = create<LeaderboardState>((set) => ({
  isSubmitting: false,
  setSubmitting: (submitting) => set({ isSubmitting: submitting }),
}));

// API functions
const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const response = await fetch('/api/leaderboard');
  if (!response.ok) {
    throw new Error('Failed to fetch leaderboard');
  }
  return response.json();
};

const submitScore = async (entry: { playerName: string; score: number; wallet: string }): Promise<LeaderboardEntry> => {
  const response = await fetch('/api/leaderboard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit score');
  }
  
  return response.json();
};

// React Query hooks
export const useLeaderboardData = () => {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard,
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 15000, // Consider data stale after 15 seconds
  });
};

export const useSubmitScore = () => {
  const queryClient = useQueryClient();
  const { setSubmitting } = useLeaderboard();
  
  return useMutation({
    mutationFn: submitScore,
    onMutate: () => {
      setSubmitting(true);
    },
    onSuccess: () => {
      // Invalidate and refetch leaderboard
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      setSubmitting(false);
    },
    onError: (error) => {
      console.error('Error submitting score:', error);
      setSubmitting(false);
    },
  });
};
