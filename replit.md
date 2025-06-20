# Nate The Great - Basketball Game

## Overview

This is a 3D basketball game application built with React and Three.js, featuring a modern tech stack with TypeScript, Tailwind CSS, and a comprehensive UI component library. The application is designed as a single-page game with full-screen 3D graphics, leaderboard functionality, and sound effects.

## System Architecture

The application follows a monorepo structure with separate client and server directories, utilizing a full-stack TypeScript setup with shared schemas and modern web technologies.

### Directory Structure
- `/client` - React frontend with 3D game components
- `/server` - Express.js backend with minimal API structure
- `/shared` - Shared TypeScript schemas and types
- `/migrations` - Database migration files (Drizzle ORM)

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **3D Graphics**: React Three Fiber (@react-three/fiber) with Drei helpers
- **State Management**: Zustand for game state, audio, and leaderboard management
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Build Tool**: Vite with custom configuration for 3D assets

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Basic session handling structure
- **Development**: Hot reload with Vite integration

### Game Components
- **Basketball3D**: Main 3D game scene with physics simulation
- **GameMenu**: Landing screen with game options
- **GameUI**: In-game HUD showing score, timer, and controls
- **Leaderboard**: Score tracking and display system
- **ScoreSubmission**: Post-game score entry with wallet validation

## Data Flow

### Game State Management
The application uses multiple Zustand stores for different aspects:

1. **useGame**: Overall game phase management (ready/playing/ended)
2. **useBasketball**: Game-specific state (score, time, ball physics, player position)
3. **useAudio**: Sound management (background music, effects, mute state)
4. **useLeaderboard**: Persistent score storage with localStorage

### Physics System
- Custom basketball physics implementation in `/lib/basketball-physics.ts`
- Real-time ball movement with gravity, bounce, and air resistance
- Collision detection for ground and basket interactions

### 3D Rendering Pipeline
- Canvas setup with React Three Fiber
- Keyboard controls for player movement (WASD/Arrow keys + Space for shooting)
- Texture loading for court surfaces
- GLSL shader support for advanced visual effects

## External Dependencies

### Core Technologies
- **React Three Fiber**: 3D rendering and scene management
- **Drizzle ORM**: Type-safe database operations
- **Neon Database**: PostgreSQL hosting (configured but not actively used)
- **Radix UI**: Accessible component primitives
- **Zustand**: Lightweight state management

### Development Tools
- **Vite**: Fast build tool with HMR
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first styling
- **ESBuild**: Fast bundling for production

### Audio System
- HTML5 Audio API for sound effects
- Background music support with loop functionality
- Mute/unmute controls with state persistence

## Deployment Strategy

### Build Process
- **Development**: `npm run dev` - Runs both client and server with hot reload
- **Production Build**: `npm run build` - Vite build + ESBuild server bundling
- **Production Start**: `npm run start` - Serves built application

### Environment Configuration
- **Platform**: Replit with Node.js 20
- **Port Configuration**: 5000 (development), 80 (production)
- **Database**: PostgreSQL via DATABASE_URL environment variable
- **Asset Handling**: Support for 3D models (.gltf, .glb) and audio files

### Database Schema
Currently defines a basic user system with:
- Users table (id, username, password)
- Extensible schema structure for future game data

The application currently uses in-memory storage for development, with database infrastructure ready for production deployment.

## Changelog

```
Changelog:
- June 20, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```