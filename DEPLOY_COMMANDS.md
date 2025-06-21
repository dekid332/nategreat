# Deploy Commands for Netlify

## Step 1: Build the Project
```bash
npm run build
```

## Step 2: Install Netlify CLI
```bash
npm install -g netlify-cli
```

## Step 3: Login to Netlify
```bash
netlify login
```
This will open your browser to authenticate with Netlify.

## Step 4: Deploy
```bash
netlify deploy --prod --dir=dist/public
```

## Alternative: Manual Netlify Deployment
If the CLI doesn't work:

1. Go to https://netlify.com
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the `dist/public` folder
4. Your site will be live instantly

## Build Settings for Manual Setup
If you prefer connecting to Git:
- Build command: `npm run build`
- Publish directory: `dist/public`
- Node version: 18 or higher

## Environment Variables (if needed)
None required for this basketball game.

## Expected Result
Your game will be available at a netlify.app URL and should work properly with all assets loading correctly.