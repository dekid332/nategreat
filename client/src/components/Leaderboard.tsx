import { useLeaderboardData } from "../lib/stores/useLeaderboard";
import { useGame } from "../lib/stores/useGame";
import { useBasketball } from "../lib/stores/useBasketball";

export default function Leaderboard() {
  const { data: scores = [], isLoading, error } = useLeaderboardData();
  const { restart } = useGame();
  const { setGameState } = useBasketball();

  const handleBackToMenu = () => {
    setGameState("playing");
    restart();
  };

  const shortenWallet = (wallet: string) => {
    if (wallet.length <= 8) return wallet;
    return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            LEADERBOARD
          </h1>
          <p className="text-lg text-gray-300">TOP BASKETBALL LEGENDS</p>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-black bg-opacity-60 rounded-lg border border-purple-400 overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Loading global leaderboard...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-4 text-red-400">⚠️</div>
              <h3 className="text-xl font-bold text-red-400 mb-2">Connection Error</h3>
              <p className="text-gray-500">Unable to load leaderboard. Please try again later.</p>
            </div>
          ) : scores.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-4">🏀</div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">No Scores Yet</h3>
              <p className="text-gray-500">Be the first to make the global leaderboard!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-900 bg-opacity-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-purple-400">#</th>
                    <th className="px-4 py-3 text-left font-bold text-purple-400">PLAYER</th>
                    <th className="px-4 py-3 text-left font-bold text-purple-400">SCORE</th>
                    <th className="px-4 py-3 text-left font-bold text-purple-400">WALLET</th>
                    <th className="px-4 py-3 text-left font-bold text-purple-400">DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score, index) => (
                    <tr 
                      key={score.id} 
                      className={`border-b border-gray-700 hover:bg-purple-900 hover:bg-opacity-20 transition-colors ${
                        index < 3 ? 'bg-gradient-to-r from-yellow-900 from-opacity-20 to-transparent' : ''
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {index === 0 && <span className="text-yellow-400 text-xl mr-2">🥇</span>}
                          {index === 1 && <span className="text-gray-300 text-xl mr-2">🥈</span>}
                          {index === 2 && <span className="text-orange-400 text-xl mr-2">🥉</span>}
                          <span className="font-bold text-cyan-400">{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-white">{score.playerName}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-2xl font-black text-cyan-400">{score.score}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-mono text-sm text-purple-400">
                          {shortenWallet(score.wallet)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-400">
                          {new Date(score.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Back button */}
        <div className="text-center mt-8">
          <button
            onClick={handleBackToMenu}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border border-purple-400"
          >
            BACK TO MENU
          </button>
        </div>
      </div>
    </div>
  );
}
