# Fix Supabase Connection

## The Issue
Connection timeout means either:
1. Wrong database URL format
2. IPv6 connection issue (common on Windows)
3. Firewall blocking the connection

## Quick Fix Options

### Option 1: Use Connection Pooler
Instead of direct connection, use Supabase's connection pooler:

In your `.env` file, use this format:
```
DATABASE_URL=postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-us-west-1.pooler.supabase.com:5432/postgres
```

### Option 2: Get the correct URL from Supabase
1. Go to Settings → Database
2. Look for "Connection pooler" section (not direct connection)
3. Copy the "Connection string" from there
4. It should look like: `postgresql://postgres.abcd:password@aws-0-region.pooler.supabase.com:5432/postgres`

### Option 3: Use Transaction Mode
Add `?pgbouncer=true` to your URL:
```
DATABASE_URL=postgresql://postgres:password@db.project.supabase.co:5432/postgres?pgbouncer=true
```

## Test Connection
After updating your `.env`, try:
```bash
npx drizzle-kit push
```

If it still fails, the issue is likely with the URL format. Please share what your connection string looks like (hide the password) so I can help fix it.