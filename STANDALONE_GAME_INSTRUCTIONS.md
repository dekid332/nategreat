# Standalone Game Instructions

## Quick Solution
I've created `start-game-locally.html` - a version that works when opened directly in your browser without needing a server.

## How to Use
1. Open `start-game-locally.html` in any browser
2. Click "Start Game"
3. Click and drag to shoot the basketball into the hoop
4. Score points by getting the ball through the hoop

## What's Different
- Uses CDN for Phaser.js (no local file dependencies)
- Generates game graphics programmatically (no image files needed)
- Works offline once loaded
- Simplified basketball shooting mechanics

## Why the Original Doesn't Work
The original `index.html` fails because:
- Browsers block local file access for security
- Game assets (images/sounds) can't load from `file://` URLs
- Needs a web server to serve assets properly

## For Development/Full Version
To run the complete version with all assets:
```bash
# Install a simple server
npm install -g http-server

# Navigate to your project
cd dist/public

# Start server
http-server

# Open the provided URL (usually http://localhost:8080)
```

The standalone version gives you immediate playability while the full version requires proper hosting.