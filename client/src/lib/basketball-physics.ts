// Basketball physics and collision detection

export interface BallState {
  position: [number, number, number];
  velocity: [number, number, number];
}

// Physics constants
const GRAVITY = -25;
const BOUNCE_DAMPING = 0.7;
const AIR_RESISTANCE = 0.99;
const GROUND_LEVEL = 0.3; // Ball radius

export function updateBallPhysics(
  position: [number, number, number],
  velocity: [number, number, number],
  deltaTime: number
): BallState {
  let [x, y, z] = position;
  let [vx, vy, vz] = velocity;

  // Apply gravity
  vy += GRAVITY * deltaTime;

  // Apply air resistance
  vx *= AIR_RESISTANCE;
  vy *= AIR_RESISTANCE;
  vz *= AIR_RESISTANCE;

  // Update position
  x += vx * deltaTime;
  y += vy * deltaTime;
  z += vz * deltaTime;

  // Ground collision
  if (y <= GROUND_LEVEL) {
    y = GROUND_LEVEL;
    vy = Math.abs(vy) * BOUNCE_DAMPING; // Bounce up with damping
    
    // Apply friction when bouncing
    vx *= 0.8;
    vz *= 0.8;
  }

  return {
    position: [x, y, z],
    velocity: [vx, vy, vz]
  };
}

export function checkBasketCollision(
  ballPosition: [number, number, number],
  basketPosition: [number, number, number],
  tolerance: number = 1.2
): boolean {
  const [bx, by, bz] = ballPosition;
  const [hx, hy, hz] = basketPosition;

  // Check if ball is near basket height (slightly below rim)
  if (by < hy - 2 || by > hy + 1) return false;

  // Check horizontal distance from basket center
  const distance = Math.sqrt((bx - hx) ** 2 + (bz - hz) ** 2);
  
  // Ball must be within basket radius and moving downward
  return distance <= tolerance && ballPosition[1] < basketPosition[1] - 0.5;
}

export function calculateShootDirection(
  fromPosition: [number, number, number],
  toPosition: [number, number, number],
  power: number = 1
): [number, number, number] {
  const [fx, fy, fz] = fromPosition;
  const [tx, ty, tz] = toPosition;

  // Calculate direction vector
  const dx = tx - fx;
  const dy = ty - fy;
  const dz = tz - fz;

  // Normalize direction
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const normalizedDirection: [number, number, number] = [
    dx / distance,
    dy / distance,
    dz / distance
  ];

  // Apply power and add some arc for realistic trajectory
  return [
    normalizedDirection[0] * power,
    normalizedDirection[1] * power + 2, // Add upward arc
    normalizedDirection[2] * power
  ];
}
