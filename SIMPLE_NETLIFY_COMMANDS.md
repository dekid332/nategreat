# Simple Netlify Setup Commands

## Problem Fixed
Removed the complex vite.config.netlify.ts file that was causing plugin dependency issues.

## Netlify Dashboard Settings

**Build Command:**
```
npm install --include=dev && npx vite build
```

**Publish Directory:**
```
dist/public
```

**Environment Variables:**
- NODE_VERSION: `18`
- NODE_ENV: `production`

## Why This Works
- Installs all dependencies including devDependencies (where @vitejs/plugin-react is located)
- Uses the default vite.config.ts (which works in development)
- Builds to the correct output directory

## Backup Commands (if first one fails)
1. `npm ci && npx vite build`
2. `npm install && npx vite build` 
3. `npm run build`

## GitHub Push Commands
```bash
git add .
git commit -m "Simplify Netlify build: remove custom config, use standard Vite build"
git push origin main
```

This simplified approach avoids all plugin dependency issues by using your existing, working Vite configuration.