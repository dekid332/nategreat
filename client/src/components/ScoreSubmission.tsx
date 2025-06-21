import { useState } from "react";
import { useBasketball } from "../lib/stores/useBasketball";
import { useSubmitScore } from "../lib/stores/useLeaderboard";
import { useGame } from "../lib/stores/useGame";

export default function ScoreSubmission() {
  const { score, resetGame } = useBasketball();
  const submitScore = useSubmitScore();
  const { restart } = useGame();
  
  const [playerName, setPlayerName] = useState("");
  const [wallet, setWallet] = useState("");
  const [errors, setErrors] = useState<{playerName?: string; wallet?: string}>({});

  const validateWallet = (address: string) => {
    // Basic Solana wallet address validation (44 characters, base58)
    const solanaPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return solanaPattern.test(address);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: {playerName?: string; wallet?: string} = {};
    
    if (!playerName.trim()) {
      newErrors.playerName = "Player name is required";
    } else if (playerName.length > 20) {
      newErrors.playerName = "Player name must be 20 characters or less";
    }
    
    if (!wallet.trim()) {
      newErrors.wallet = "Wallet address is required";
    } else if (!validateWallet(wallet)) {
      newErrors.wallet = "Invalid Solana wallet address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Submit score to public leaderboard
      await submitScore.mutateAsync({
        playerName: playerName.trim(),
        score,
        wallet: wallet.trim(),
      });

      // Reset game and go back to menu
      resetGame();
      restart();
    } catch (error) {
      console.error("Error submitting score:", error);
      setErrors({ playerName: "Failed to submit score. Please try again." });
    }
  };

  const handleSkip = () => {
    resetGame();
    restart();
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4">
      <div className="w-full max-w-md">
        {/* Game Over Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400">
            GAME OVER
          </h1>
          <div className="text-3xl font-bold text-cyan-400 mb-2">FINAL SCORE</div>
          <div className="text-6xl font-black text-white">{score}</div>
        </div>

        {/* Score Submission Form */}
        <div className="bg-black bg-opacity-60 rounded-lg border border-purple-400 p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-400">
            SAVE TO GLOBAL LEADERBOARD
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Player Name */}
            <div>
              <label className="block text-sm font-bold text-purple-400 mb-2">
                PLAYER NAME
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white font-mono focus:border-purple-400 focus:outline-none transition-colors"
                placeholder="Enter your name"
                maxLength={20}
                disabled={submitScore.isPending}
              />
              {errors.playerName && (
                <p className="text-red-400 text-sm mt-1">{errors.playerName}</p>
              )}
            </div>

            {/* Wallet Address */}
            <div>
              <label className="block text-sm font-bold text-purple-400 mb-2">
                SOLANA WALLET ADDRESS
              </label>
              <input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white font-mono text-sm focus:border-purple-400 focus:outline-none transition-colors"
                placeholder="9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
                disabled={submitScore.isPending}
              />
              {errors.wallet && (
                <p className="text-red-400 text-sm mt-1">{errors.wallet}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Your Solana wallet address - visible on the global leaderboard
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitScore.isPending}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold text-lg rounded-lg shadow-lg transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200 border border-purple-400"
            >
              {submitScore.isPending ? "SAVING TO GLOBAL LEADERBOARD..." : "SAVE TO GLOBAL LEADERBOARD"}
            </button>
          </form>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            disabled={submitScore.isPending}
            className="w-full mt-4 px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white font-bold text-lg rounded-lg transition-colors"
          >
            SKIP & CONTINUE
          </button>
        </div>

        {/* Crypto Theme Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Powered by <span className="text-purple-400 font-bold">Solana</span> Blockchain
          </p>
        </div>
      </div>
    </div>
  );
}
