# How to Find Your Supabase Values

## Finding Your Project Reference
Your `[YOUR-PROJECT-REF]` is in your Supabase project URL:

**Example:**
- Project URL: `https://app.supabase.com/project/abcdefghijklmnop`
- Your PROJECT-REF: `abcdefghijklmnop`

## Getting Your Database Connection Details

### Method 1: From Dashboard
1. Go to your Supabase project
2. Settings → Database
3. Look for "Connection string" - it shows:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijklmnop.supabase.co:5432/postgres
   ```

### Method 2: From Project Settings
1. Settings → General
2. Your "Reference ID" is your PROJECT-REF

## Example Values
If your project reference is `abcdefghijklmnop` and password is `mypassword123`:

```bash
DATABASE_URL=postgresql://postgres:mypassword123@db.abcdefghijklmnop.supabase.co:5432/postgres
PGHOST=db.abcdefghijklmnop.supabase.co
PGPORT=5432
PGUSER=postgres
PGPASSWORD=mypassword123
PGDATABASE=postgres
```

## Quick Test
Once you have the values, test the connection:
```bash
npx drizzle-kit push
```

This will create the leaderboard table in your Supabase database.