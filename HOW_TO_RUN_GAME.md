# How to Run the Basketball Game

## The Problem
Opening `index.html` directly in your browser shows a black screen because:
1. Browsers block local file access to assets (CORS security)
2. The game needs to be served through a web server to load properly

## Solution: 3 Ways to Run the Game

### Option 1: Development Server (Recommended)
The game is already running at: http://localhost:5000
- Open your browser
- Go to http://localhost:5000
- Click "Start Game" - it should work properly

### Option 2: Built Version
1. The built game is in `dist/public/index.html`
2. Serve it with a simple HTTP server:
   ```bash
   # Install a simple server
   npm install -g http-server
   
   # Serve the built game
   cd dist/public
   http-server
   ```
3. Open the URL it provides (usually http://localhost:8080)

### Option 3: Python Server (if you have Python)
```bash
# Navigate to the built game
cd dist/public

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open http://localhost:8000

## Why the Game Screen Goes Black
When you click "Start Game" and see black:
- Assets are failing to load due to CORS restrictions
- The Phaser game engine can't access image and audio files
- You need a proper web server to serve the files

## Current Status
- Development server is running on port 5000
- Built version is ready in `dist/public`
- All game assets exist in the correct locations
- The game should work properly when served correctly