# Netlify Manual Setup Guide

## Step 1: Netlify Dashboard Configuration

### Build Settings (in Netlify Dashboard):
- **Build command**: `npx vite build --config vite.config.netlify.ts`
- **Publish directory**: `dist/public`
- **Base directory**: (leave empty)

### Environment Variables (in Netlify Dashboard):
- **NODE_VERSION**: `18`
- **NODE_ENV**: `production`

## Step 2: Deploy Settings

### Branch to Deploy:
- **Production branch**: `main` (or your default branch)

### Build Settings Location:
1. Go to your Netlify site dashboard
2. Click "Site settings"
3. Click "Build & deploy" in the left sidebar
4. Scroll to "Build settings" section
5. Click "Edit settings"

### Enter These Values:
```
Build command: npx vite build --config vite.config.netlify.ts
Publish directory: dist/public
```

### Environment Variables Setup:
1. In "Build & deploy" section
2. Scroll to "Environment variables"
3. Click "Edit variables"
4. Add these variables:
   - Key: `NODE_VERSION`, Value: `18`
   - Key: `NODE_ENV`, Value: `production`

## Step 3: Deploy Hooks (Optional)
If you want automatic deploys when you push to GitHub:
1. Connect your GitHub repository in Netlify
2. Set branch to `main`
3. Netlify will auto-deploy on every push

## Step 4: Manual Deploy
If you prefer manual deploys:
1. Build locally: `npm run build`
2. Drag and drop the `dist/public` folder to Netlify
3. Or use Netlify CLI: `netlify deploy --prod --dir=dist/public`

## Alternative Build Commands (if main one fails):
1. `npm ci && npx vite build --config vite.config.netlify.ts`
2. `npm install && npx vite build --config vite.config.netlify.ts`
3. `yarn install && yarn build`

## Troubleshooting:
- If build fails, check the exact error in Netlify build logs
- Try clearing build cache in Netlify dashboard
- Ensure all files are committed to GitHub
- Use Node.js version 18 or higher