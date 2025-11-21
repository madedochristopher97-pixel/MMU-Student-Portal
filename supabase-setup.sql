-- Student Portal Database Schema for Supabase

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  id_number TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Academic records
CREATE TABLE academic_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  semester TEXT NOT NULL,
  gpa DECIMAL(3,2) NOT NULL,
  percentile INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_name TEXT NOT NULL,
  course_code TEXT NOT NULL,
  grade TEXT,
  credits INTEGER,
  semester TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deadlines
CREATE TABLE deadlines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  course TEXT NOT NULL,
  due_date DATE NOT NULL,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financial records
CREATE TABLE financial_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  total_billed DECIMAL(10,2) NOT NULL,
  total_paid DECIMAL(10,2) NOT NULL,
  credit_balance DECIMAL(10,2) DEFAULT 0,
  semester TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  priority TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_type TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity log
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat history
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'bot')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only access their own data)
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can view own academic records" ON academic_records FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view own courses" ON courses FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view own deadlines" ON deadlines FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view own financial records" ON financial_records FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view own events" ON events FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view own activity" ON activity_log FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can view own chat history" ON chat_history FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own chat messages" ON chat_history FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Everyone can view announcements
CREATE POLICY "Anyone can view announcements" ON announcements FOR SELECT USING (true);

-- Insert demo data
-- Note: You'll need to create a user in Supabase Auth first, then use their UUID here
-- Replace 'USER_UUID_HERE' with the actual UUID from Supabase Auth

-- Demo user data (insert after creating auth user)
-- INSERT INTO users (id, student_id, email, first_name, last_name, date_of_birth, id_number, phone)
-- VALUES ('USER_UUID_HERE', 'SST-261-155/2023', 'demo@student.edu', 'Christopher', 'Madedo', '2004-02-06', '42144740', '+254700000000');
