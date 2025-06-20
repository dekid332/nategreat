import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import { useBasketball } from "../lib/stores/useBasketball";
import { useAudio } from "../lib/stores/useAudio";
import { checkBasketCollision, updateBallPhysics } from "../lib/basketball-physics";

export default function Basketball3D() {
  const { camera } = useThree();
  const courtTexture = useTexture("/textures/asphalt.png");
  
  // Game state
  const { 
    playerPosition, 
    setPlayerPosition, 
    ballPosition, 
    setBallPosition, 
    ballVelocity, 
    setBallVelocity, 
    score, 
    incrementScore, 
    timeLeft,
    gameState,
    setGameState
  } = useBasketball();
  
  const { playHit, playSuccess } = useAudio();
  
  // Refs for game objects
  const playerRef = useRef<THREE.Mesh>(null);
  const ballRef = useRef<THREE.Mesh>(null);
  const basketRef = useRef<THREE.Group>(null);
  
  // Keyboard controls
  const [subscribe, getKeys] = useKeyboardControls();

  // Initialize ball position
  useEffect(() => {
    setBallPosition([0, 2, 0]);
    setBallVelocity([0, 0, 0]);
  }, [setBallPosition, setBallVelocity]);

  // Game timer
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setInterval(() => {
        useBasketball.getState().decrementTime();
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft <= 0) {
      setGameState("ended");
    }
  }, [gameState, timeLeft, setGameState]);

  // Handle player movement and shooting
  useFrame((state, delta) => {
    const keys = getKeys();
    
    // Player movement
    const moveSpeed = 8;
    let newPlayerPos = [...playerPosition] as [number, number, number];
    
    if (keys.moveLeft) newPlayerPos[0] -= moveSpeed * delta;
    if (keys.moveRight) newPlayerPos[0] += moveSpeed * delta;
    if (keys.moveForward) newPlayerPos[2] -= moveSpeed * delta;
    if (keys.moveBackward) newPlayerPos[2] += moveSpeed * delta;
    
    // Clamp player position to court bounds
    newPlayerPos[0] = Math.max(-12, Math.min(12, newPlayerPos[0]));
    newPlayerPos[2] = Math.max(-8, Math.min(8, newPlayerPos[2]));
    
    setPlayerPosition(newPlayerPos);
    
    // Update player mesh position
    if (playerRef.current) {
      playerRef.current.position.set(newPlayerPos[0], newPlayerPos[1], newPlayerPos[2]);
    }

    // Handle shooting
    if (keys.shoot && ballPosition[1] <= 2.1) {
      const shootPower = 15;
      const basketDirection = new THREE.Vector3(0, 10, -12).sub(new THREE.Vector3(...ballPosition)).normalize();
      const shootVelocity: [number, number, number] = [
        basketDirection.x * shootPower,
        basketDirection.y * shootPower + 3,
        basketDirection.z * shootPower
      ];
      setBallVelocity(shootVelocity);
      playHit();
    }

    // Update ball physics
    const newBallPos = updateBallPhysics(ballPosition, ballVelocity, delta);
    setBallPosition(newBallPos.position);
    setBallVelocity(newBallPos.velocity);
    
    // Update ball mesh position
    if (ballRef.current) {
      ballRef.current.position.set(newBallPos.position[0], newBallPos.position[1], newBallPos.position[2]);
    }

    // Check basket collision
    if (checkBasketCollision(newBallPos.position, [0, 10, -12])) {
      incrementScore();
      playSuccess();
      // Reset ball to player
      setBallPosition([newPlayerPos[0], 2, newPlayerPos[2]]);
      setBallVelocity([0, 0, 0]);
    }

    // Reset ball if it goes too far
    if (newBallPos.position[1] < -5 || Math.abs(newBallPos.position[0]) > 20 || Math.abs(newBallPos.position[2]) > 20) {
      setBallPosition([newPlayerPos[0], 2, newPlayerPos[2]]);
      setBallVelocity([0, 0, 0]);
    }
  });

  return (
    <>
      {/* Court floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshLambertMaterial map={courtTexture} />
      </mesh>

      {/* Court boundaries */}
      <mesh position={[0, 1, -10]} castShadow>
        <boxGeometry args={[30, 2, 0.2]} />
        <meshLambertMaterial color="#333" />
      </mesh>
      <mesh position={[0, 1, 10]} castShadow>
        <boxGeometry args={[30, 2, 0.2]} />
        <meshLambertMaterial color="#333" />
      </mesh>
      <mesh position={[-15, 1, 0]} castShadow>
        <boxGeometry args={[0.2, 2, 20]} />
        <meshLambertMaterial color="#333" />
      </mesh>
      <mesh position={[15, 1, 0]} castShadow>
        <boxGeometry args={[0.2, 2, 20]} />
        <meshLambertMaterial color="#333" />
      </mesh>

      {/* Basketball hoop */}
      <group ref={basketRef} position={[0, 10, -12]}>
        {/* Backboard */}
        <mesh position={[0, 0, 0.5]} castShadow>
          <boxGeometry args={[4, 3, 0.2]} />
          <meshLambertMaterial color="#ffffff" />
        </mesh>
        
        {/* Rim */}
        <mesh position={[0, -1, 0]} castShadow>
          <torusGeometry args={[0.9, 0.05, 8, 20]} />
          <meshLambertMaterial color="#ff6600" />
        </mesh>
        
        {/* Net */}
        <mesh position={[0, -1.5, 0]}>
          <cylinderGeometry args={[0.8, 0.6, 1, 8, 1, true]} />
          <meshLambertMaterial color="#ffffff" wireframe />
        </mesh>

        {/* Support pole */}
        <mesh position={[0, -5, 0.5]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 10]} />
          <meshLambertMaterial color="#666666" />
        </mesh>
      </group>

      {/* Player (represented as a colored box) */}
      <mesh ref={playerRef} position={playerPosition} castShadow>
        <boxGeometry args={[0.8, 1.8, 0.6]} />
        <meshLambertMaterial color="#9945ff" />
      </mesh>

      {/* Basketball */}
      <mesh ref={ballRef} position={ballPosition} castShadow>
        <sphereGeometry args={[0.3]} />
        <meshLambertMaterial color="#ff6600" />
      </mesh>

      {/* Score display in 3D space */}
      <Text
        position={[0, 15, -12]}
        fontSize={2}
        color="#00d4ff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.json"
      >
        {score}
      </Text>
    </>
  );
}
