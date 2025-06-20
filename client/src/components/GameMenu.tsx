import { useGame } from "../lib/stores/useGame";
import { useBasketball } from "../lib/stores/useBasketball";

export default function GameMenu() {
  const { start } = useGame();
  const { showLeaderboard } = useBasketball();

  const handleStartGame = () => {
    start();
  };

  const handleShowLeaderboard = () => {
    showLeaderboard();
    start();
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-cyan-400 rounded-full opacity-20 animate-ping"></div>
      </div>

      <div className="relative z-10 text-center px-8">
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 animate-pulse">
          NATE
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          THE GREAT
        </h2>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light tracking-wider">
          BLOCKCHAIN BASKETBALL
        </p>

        {/* Menu Buttons */}
        <div className="flex flex-col space-y-6 items-center">
          <button
            onClick={handleStartGame}
            className="px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold text-xl rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border border-purple-400 hover:border-blue-400 min-w-64"
          >
            START GAME
          </button>
          
          <button
            onClick={handleShowLeaderboard}
            className="px-12 py-4 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-bold text-xl rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border border-gray-500 hover:border-gray-400 min-w-64"
          >
            LEADERBOARD
          </button>
        </div>

        {/* Controls Info */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-bold text-purple-400 mb-4">CONTROLS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>WASD / Arrow Keys - Move</div>
            <div>SPACE - Shoot</div>
            <div>E - Aim Mode</div>
            <div>Mobile - Touch Controls</div>
          </div>
        </div>
      </div>
    </div>
  );
}
