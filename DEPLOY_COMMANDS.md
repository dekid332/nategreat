# Deploy Commands for Public Leaderboard Basketball Game

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

## Step 4: Deploy with Database
```bash
netlify deploy --prod --dir=dist/public
```

## Important: Environment Variables Required
Your game now uses a PostgreSQL database for the public leaderboard. Set these environment variables in Netlify:

**In Netlify Dashboard:**
1. Go to Site Settings → Environment Variables
2. Add these variables (use your database credentials):
   - `DATABASE_URL` = your PostgreSQL connection string
   - `PGHOST` = your database host
   - `PGPORT` = your database port
   - `PGUSER` = your database username
   - `PGPASSWORD` = your database password
   - `PGDATABASE` = your database name

## Alternative: Manual Netlify Deployment
1. Go to https://netlify.com
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the `dist/public` folder
4. Add environment variables in Site Settings
5. Your site will be live with global leaderboard

## Build Settings for Git Connection
- Build command: `npm run build`
- Publish directory: `dist/public`
- Node version: 18 or higher

## Database Options
- **Neon** (recommended): Free PostgreSQL hosting
- **Railway**: Easy database deployment
- **Supabase**: PostgreSQL with additional features

## Expected Result
- Game available at netlify.app URL
- Global leaderboard shared by all players
- Real-time score updates every 30 seconds
- Persistent scores across all sessions

## New Features
- Public leaderboard visible to everyone
- Real-time score synchronization
- Validated score submissions
- Global competition across all players