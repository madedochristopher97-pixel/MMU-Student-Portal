# Quick Start Guide

## 🚀 Get Started in 5 Minutes!

### Step 1: Install Dependencies (1 min)

Double-click `install-react.bat` or run:
```bash
npm install
```

### Step 2: Set Up Supabase (2 mins)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to SQL Editor and run the contents of `supabase-setup.sql`
4. Go to Authentication > Users and create a user:
   - Email: `demo@student.edu`
   - Password: `password123`
   - ✓ Auto Confirm User
5. Copy the user's UUID
6. In SQL Editor, run the demo data insert queries from `SUPABASE_SETUP.md` (replace USER_UUID_HERE with your UUID)

### Step 3: Configure Environment (30 seconds)

1. Go to Settings > API in Supabase
2. Copy your Project URL and anon key
3. Create a `.env` file:
```
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here
```

### Step 4: Run the App! (30 seconds)

Double-click `start-react.bat` or run:
```bash
npm run dev
```

### Step 5: Login

Open http://localhost:3000 and login with:
- Email: `demo@student.edu`
- Password: `password123`

## 🎉 That's it!

You now have a fully functional student portal with:
- ✅ React + TypeScript frontend
- ✅ Supabase backend
- ✅ Real database
- ✅ Authentication
- ✅ AI Chatbot
- ✅ Beautiful UI

## 💬 Try the Chatbot!

Click the AI Assistant button and ask:
- "What's my GPA?"
- "Show my deadlines"
- "How much do I owe?"
- "Help"

## 📚 Need More Help?

- Detailed setup: `SUPABASE_SETUP.md`
- Full documentation: `README-REACT.md`
- Database schema: `supabase-setup.sql`
