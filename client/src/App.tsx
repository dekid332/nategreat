import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { KeyboardControls } from "@react-three/drei";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAudio } from "./lib/stores/useAudio";
import { useGame } from "./lib/stores/useGame";
import { useBasketball } from "./lib/stores/useBasketball";
import "@fontsource/inter";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

// Import game components
import GameMenu from "./components/GameMenu";
import Basketball3D from "./components/Basketball3D";
import GameUI from "./components/GameUI";
import Leaderboard from "./components/Leaderboard";
import ScoreSubmission from "./components/ScoreSubmission";

// Define control keys for the basketball game
const controls = [
  { name: "moveLeft", keys: ["KeyA", "ArrowLeft"] },
  { name: "moveRight", keys: ["KeyD", "ArrowRight"] },
  { name: "moveForward", keys: ["KeyW", "ArrowUp"] },
  { name: "moveBackward", keys: ["KeyS", "ArrowDown"] },
  { name: "shoot", keys: ["Space"] },
  { name: "aim", keys: ["KeyE"] },
];

// Main App component
function App() {
  const { phase } = useGame();
  const { gameState } = useBasketball();
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  // Initialize audio
  useEffect(() => {
    const backgroundMusic = new Audio("/sounds/background.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;
    setBackgroundMusic(backgroundMusic);

    const hitSound = new Audio("/sounds/hit.mp3");
    hitSound.volume = 0.5;
    setHitSound(hitSound);

    const successSound = new Audio("/sounds/success.mp3");
    successSound.volume = 0.7;
    setSuccessSound(successSound);
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        <KeyboardControls map={controls}>
          {phase === "ready" && <GameMenu />}
          
          {phase === "playing" && (
            <>
              <Canvas
                shadows
                camera={{
                  position: [0, 8, 12],
                  fov: 60,
                  near: 0.1,
                  far: 1000
                }}
                gl={{
                  antialias: true,
                  powerPreference: "high-performance"
                }}
              >
                <color attach="background" args={["#0f0f0f"]} />
                
                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight
                  position={[10, 10, 5]}
                  intensity={1}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                
                <Suspense fallback={null}>
                  <Basketball3D />
                </Suspense>
              </Canvas>
              <GameUI />
            </>
          )}

          {phase === "ended" && gameState === "playing" && <ScoreSubmission />}
          {phase === "ended" && gameState === "leaderboard" && <Leaderboard />}
        </KeyboardControls>
      </div>
    </QueryClientProvider>
  );
}

export default App;
