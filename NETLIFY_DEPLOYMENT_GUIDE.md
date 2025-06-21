# Netlify Deployment Fix Guide

## Issue Analysis
Your Netlify build is failing because it's trying to build a full-stack Express + React application, but Netlify only needs the client-side React app.

## Root Cause
The build command was trying to compile both server and client code, but Netlify deployments should only build the static React frontend.

## Solution Applied

### 1. Updated netlify.toml Configuration
```toml
[build]
  command = "npm ci && npm install sharp && npx vite build"
  publish = "dist/public"

[build.environment]
  NODE_VERSION = "18"
```

### 2. Added Sharp Package
The `sharp` package was added to dependencies as required by Netlify for image processing.

### 2. Alternative Fix (if above fails)
If the build still fails, replace the build command in netlify.toml with:
```toml
[build]
  command = "npm install --production=false && npx vite build"
  publish = "dist/public"
```

## Troubleshooting Steps

### If Build Still Fails:
1. **Check Build Logs**: Look for the specific missing package name in Netlify's build logs
2. **Manual Package Installation**: Add this to your build command:
   ```
   npm install [missing-package-name] && npx vite build
   ```
3. **Clear Build Cache**: In Netlify dashboard, go to Site Settings > Build & Deploy > Build Settings and click "Clear cache and deploy site"

### Common Missing Packages:
- `@vitejs/plugin-react`
- `vite`
- `typescript`
- `tailwindcss`
- `postcss`
- `autoprefixer`

### Alternative Build Commands to Try:
```bash
# Option 1: Explicit dependency installation
npm install vite @vitejs/plugin-react typescript tailwindcss postcss autoprefixer && npx vite build

# Option 2: Use yarn instead of npm
yarn install && yarn build

# Option 3: Force install all dependencies
npm install --force && npx vite build
```

## Project Structure Note
Your project has:
- **Client app**: React + Three.js basketball game (in `client/` folder)
- **Server app**: Express.js backend (not needed for Netlify)

Netlify only deploys the client app as static files.

## Next Steps
1. Push these changes to GitHub
2. Trigger a new Netlify deployment
3. If it still fails, check the build logs for the specific missing package
4. Add that package to the build command as shown above

## Environment Variables (if needed)
If your app uses environment variables, add them in Netlify dashboard:
Site Settings > Environment Variables