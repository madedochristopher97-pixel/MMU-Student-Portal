# Student Portal - React + TypeScript + Supabase

A modern, full-stack student portal built with React, TypeScript, and Supabase.

## 🚀 Features

### Frontend
- ⚛️ **React 18** with TypeScript for type safety
- 🎨 **Modern UI** matching design specifications exactly
- 📱 **Responsive Design** works on all devices
- ⚡ **Vite** for lightning-fast development
- 🎯 **Zustand** for state management
- 🛣️ **React Router** for navigation

### Backend
- 🔥 **Supabase** - PostgreSQL database with real-time capabilities
- 🔐 **Authentication** - Secure user authentication with Supabase Auth
- 🛡️ **Row Level Security** - Data protection at database level
- 📊 **RESTful API** - Auto-generated from database schema

### AI Chatbot
- 🤖 **Context-Aware** responses based on student data
- 💬 **Real-time** messaging interface
- 📝 **Chat History** persistence
- 🎯 **Smart Queries** for:
  - GPA and grades
  - Fees and payments
  - Deadlines and assignments
  - Courses and schedules
  - Events and announcements

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works great!)

## 🛠️ Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

Follow the detailed guide in `SUPABASE_SETUP.md`:

1. Create a Supabase project
2. Run the SQL schema (`supabase-setup.sql`)
3. Create a demo user
4. Insert demo data
5. Get your API keys

### 3. Configure Environment

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Login

Use the demo credentials:
- **Email:** `demo@student.edu`
- **Password:** `password123`

## 📁 Project Structure

```
student-portal-react/
├── src/
│   ├── components/          # React components
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   ├── AcademicCard.tsx
│   │   ├── FinancialCard.tsx
│   │   ├── CalendarCard.tsx
│   │   ├── Chatbot.tsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Login.tsx
│   │   └── Dashboard.tsx
│   ├── lib/                # Utilities
│   │   └── supabase.ts    # Supabase client & types
│   ├── store/              # State management
│   │   └── authStore.ts   # Auth state with Zustand
│   ├── styles/             # CSS files
│   │   ├── Dashboard.css
│   │   └── Login.css
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── supabase-setup.sql     # Database schema
├── SUPABASE_SETUP.md      # Setup guide
└── package.json
```

## 🎯 Key Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Supabase** - Backend as a Service
- **Zustand** - State management
- **React Router** - Routing

## 🔒 Security Features

- JWT-based authentication
- Row Level Security (RLS) policies
- Secure password hashing
- Protected routes
- Environment variable configuration

## 🤖 Chatbot Capabilities

The AI assistant can help with:

- **Academic Queries**
  - "What's my GPA?"
  - "Show me my grades"
  - "What courses am I taking?"

- **Financial Queries**
  - "How much do I owe?"
  - "What's my fee balance?"
  - "Show my payment history"

- **Deadline Queries**
  - "What are my upcoming deadlines?"
  - "When is my next assignment due?"
  - "Show my pending tasks"

- **General Help**
  - "Help" - Shows all capabilities
  - "Hello" - Greeting
  - Natural language understanding

## 📦 Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

Don't forget to set environment variables in your deployment platform!

## 🐛 Troubleshooting

### Can't connect to Supabase?
- Check your `.env` file has correct values
- Verify Supabase project is active
- Check browser console for errors

### Login not working?
- Make sure you created the auth user in Supabase
- Verify email and password match
- Check that user is confirmed

### No data showing?
- Ensure demo data was inserted with correct user UUID
- Check RLS policies are enabled
- Verify user is authenticated

## 📝 License

MIT License

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

## 📧 Support

For issues or questions, please open a GitHub issue.

---

Built with ❤️ using React, TypeScript, and Supabase
