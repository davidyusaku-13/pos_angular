# POS System Setup Instructions

## 1. Database Setup

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized

### Step 2: Run Database Schema
1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy and paste the entire contents of `database-schema.sql`
4. Click **Run** to execute the schema

### Step 3: Seed Initial Data
```bash
# Set your service role key (get from Supabase Dashboard > Settings > API)
export SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Run the seed script
bun run seed
```

## 2. Environment Configuration

### Step 1: Create .env file
```bash
cp .env.example .env
```

### Step 2: Fill in your Supabase credentials
Edit `.env` with your actual values:
```bash
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

## 3. First Admin User Setup

### Method 1: Through the App (Recommended)
1. Start the development server:
   ```bash
   bun run start
   ```
2. Open http://localhost:4200
3. Click on "Don't have an account? Sign up"
4. Create your first admin account
5. This user will automatically get admin role

### Method 2: Through Supabase Auth
1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add user"
3. Enter email and password
4. After creation, manually update the user role in the `users` table

## 4. Verify Setup

### Test the Application
```bash
bun run start
```

### Test Database Connection
1. Open the app in browser
2. Try logging in with your admin account
3. Navigate to Products page - you should see seeded products
4. Try creating a new product to test write permissions

## Troubleshooting

### Common Issues:

1. **"Table doesn't exist" error**
   - Make sure you ran the `database-schema.sql` in Supabase SQL Editor
   - Check that all tables were created successfully

2. **Authentication errors**
   - Verify your Supabase URL and keys in `.env`
   - Make sure you're using the correct project URL

3. **Permission errors**
   - Check that Row Level Security policies are correctly applied
   - Verify your user has the correct role

### Useful Supabase Dashboard Links:
- **SQL Editor**: Run custom queries and check table data
- **Table Editor**: View and edit data directly
- **Authentication**: Manage users and auth settings
- **API Docs**: Check available endpoints

## Next Steps

Once setup is complete:
1. ✅ Database is ready with initial data
2. ✅ Admin user is created
3. ✅ Application is running

You can now:
- Add more products and categories
- Configure payment gateways
- Set up additional user roles
- Customize the UI and branding
- Deploy to production

## Security Notes

- Never commit `.env` files to version control
- Use strong passwords for admin accounts
- Regularly rotate your service role keys
- Enable 2FA for admin accounts
- Monitor your Supabase usage and costs