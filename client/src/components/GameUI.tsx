import { useBasketball } from "../lib/stores/useBasketball";
import { useGame } from "../lib/stores/useGame";
import { useAudio } from "../lib/stores/useAudio";

export default function GameUI() {
  const { score, timeLeft, gameState } = useBasketball();
  const { restart } = useGame();
  const { isMuted, toggleMute } = useAudio();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto">
        {/* Score */}
        <div className="bg-black bg-opacity-70 text-white p-4 rounded-lg border border-purple-400">
          <div className="text-sm font-bold text-purple-400">SCORE</div>
          <div className="text-3xl font-black text-cyan-400">{score}</div>
        </div>

        {/* Timer */}
        <div className="bg-black bg-opacity-70 text-white p-4 rounded-lg border border-purple-400">
          <div className="text-sm font-bold text-purple-400">TIME</div>
          <div className={`text-3xl font-black ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-black bg-opacity-70 text-white p-2 rounded-lg border border-purple-400">
          <button
            onClick={toggleMute}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm font-bold transition-colors"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>

      {/* Mobile touch controls */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end md:hidden pointer-events-auto">
        {/* Movement pad */}
        <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-purple-400">
          <div className="grid grid-cols-3 gap-2 w-24 h-24">
            <div></div>
            <button className="bg-purple-600 rounded text-white font-bold">↑</button>
            <div></div>
            <button className="bg-purple-600 rounded text-white font-bold">←</button>
            <div></div>
            <button className="bg-purple-600 rounded text-white font-bold">→</button>
            <div></div>
            <button className="bg-purple-600 rounded text-white font-bold">↓</button>
            <div></div>
          </div>
        </div>

        {/* Shoot button */}
        <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-purple-400">
          <button className="w-16 h-16 bg-cyan-600 hover:bg-cyan-700 rounded-full text-white font-bold text-xl">
            🏀
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white p-4 rounded-lg border border-purple-400 hidden md:block pointer-events-auto">
        <div className="text-center text-sm">
          <div className="font-bold text-purple-400 mb-2">CONTROLS</div>
          <div className="space-y-1 text-gray-300">
            <div>WASD / Arrows - Move</div>
            <div>SPACE - Shoot</div>
          </div>
        </div>
      </div>

      {/* Game over warning */}
      {timeLeft <= 10 && timeLeft > 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-6xl font-black text-red-400 animate-pulse">
            {timeLeft}
          </div>
        </div>
      )}

      {/* Pause menu */}
      {gameState === "paused" && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center pointer-events-auto">
          <div className="bg-gray-900 p-8 rounded-lg border border-purple-400 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">PAUSED</h2>
            <button
              onClick={restart}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
            >
              BACK TO MENU
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
