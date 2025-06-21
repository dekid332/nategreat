# Supabase Setup for Public Leaderboard

## Step 1: Get Your Supabase Database URL
1. Go to your Supabase project dashboard
2. Click "Settings" → "Database"
3. Copy the "Connection string" (it looks like this):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   ```

## Step 2: Create Environment File
Create a `.env` file in your project root with:

```bash
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
PGHOST=db.[YOUR-PROJECT-REF].supabase.co
PGPORT=5432
PGUSER=postgres
PGPASSWORD=[YOUR-PASSWORD]
PGDATABASE=postgres
```

Replace `[YOUR-PASSWORD]` and `[YOUR-PROJECT-REF]` with your actual values.

## Step 3: Test Locally
```bash
# This will create the leaderboard table in your Supabase database
npx drizzle-kit push

# Start the server to test
npm run dev
```

## Step 4: Deploy to Netlify
When deploying, add these same environment variables in:
- Netlify Dashboard → Site Settings → Environment Variables

## Your Database is Ready
The leaderboard table will be automatically created and all players will share the same global scoreboard.