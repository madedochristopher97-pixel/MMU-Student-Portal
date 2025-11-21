# Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Project name: `student-portal`
   - Database password: (create a strong password)
   - Region: Choose closest to you
5. Click "Create new project"

## Step 2: Set Up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `supabase-setup.sql`
4. Click "Run" to execute the SQL

This will create all the necessary tables with proper relationships and security policies.

## Step 3: Create Demo User

1. Go to **Authentication** > **Users** in Supabase dashboard
2. Click "Add user" > "Create new user"
3. Fill in:
   - Email: `demo@student.edu`
   - Password: `password123`
   - Auto Confirm User: ✓ (check this)
4. Click "Create user"
5. Copy the UUID of the created user

## Step 4: Insert Demo Data

1. Go back to **SQL Editor**
2. Run this query (replace `USER_UUID_HERE` with the UUID you copied):

```sql
-- Insert user profile
INSERT INTO users (id, student_id, email, first_name, last_name, date_of_birth, id_number, phone)
VALUES ('USER_UUID_HERE', 'SST-261-155/2023', 'demo@student.edu', 'Christopher', 'Madedo', '2004-02-06', '42144740', '+254700000000');

-- Insert academic record
INSERT INTO academic_records (user_id, semester, gpa, percentile)
VALUES ('USER_UUID_HERE', 'Semester 2, 2025', 3.67, 92);

-- Insert courses
INSERT INTO courses (user_id, course_name, course_code, grade, credits, semester) VALUES
('USER_UUID_HERE', 'Software Engineering', 'CSE301', 'A', 4, 'Semester 2, 2025'),
('USER_UUID_HERE', 'Database Systems', 'CSE302', 'A-', 3, 'Semester 2, 2025'),
('USER_UUID_HERE', 'Web Development', 'CSE303', 'B+', 3, 'Semester 2, 2025'),
('USER_UUID_HERE', 'Data Structures', 'CSE304', 'A', 4, 'Semester 2, 2025'),
('USER_UUID_HERE', 'Computer Networks', 'CSE305', 'A-', 3, 'Semester 2, 2025');

-- Insert deadlines
INSERT INTO deadlines (user_id, title, course, due_date, type) VALUES
('USER_UUID_HERE', 'Project Phase 2', 'Software Engineering', '2025-10-25', 'project'),
('USER_UUID_HERE', 'Final Exam', 'Database Systems', '2025-10-28', 'exam'),
('USER_UUID_HERE', 'Portfolio Submission', 'Web Development', '2025-11-01', 'assignment');

-- Insert financial record
INSERT INTO financial_records (user_id, total_billed, total_paid, credit_balance, semester)
VALUES ('USER_UUID_HERE', 203600.00, 221960.00, 18360.00, 'Semester 2, 2025');

-- Insert announcements
INSERT INTO announcements (title, description, type, priority, date) VALUES
('Exam Schedule Published', 'Final examination timetable for Semester 2, 2025 is now available.', 'urgent', 'high', '2025-10-20'),
('Library Hours Extended', 'Main library will be open 24/7 during examination period.', 'info', 'medium', '2025-10-19');

-- Insert events
INSERT INTO events (user_id, title, description, event_date, event_type, color) VALUES
('USER_UUID_HERE', 'Project Phase 2 Due', 'Software Engineering project deadline', '2025-10-25', 'deadline', 'red'),
('USER_UUID_HERE', 'Database Final Exam', 'Final examination', '2025-10-28', 'exam', 'orange'),
('USER_UUID_HERE', 'Portfolio Submission', 'Web Development portfolio', '2025-11-01', 'assignment', 'blue');

-- Insert activity log
INSERT INTO activity_log (user_id, activity_type, title, description, date, icon) VALUES
('USER_UUID_HERE', 'exam', 'Exam Schedule Released', 'Database Systems Final - Oct 28, 2025', '2025-10-13', '📅'),
('USER_UUID_HERE', 'class', 'Class Rescheduled', 'Web Development Lab moved to Friday 2PM', '2025-10-13', '🕐'),
('USER_UUID_HERE', 'scholarship', 'Scholarship Applied', 'Government scholarship of Ksh. 100,000 credited', '2025-10-06', '💰'),
('USER_UUID_HERE', 'registration', 'Course Registration Complete', '5 courses registered for this semester', '2025-09-29', '🎓');
```

## Step 5: Get API Keys

1. Go to **Settings** > **API** in Supabase dashboard
2. Copy:
   - Project URL
   - `anon` `public` key

## Step 6: Configure Your App

1. Create a `.env` file in your project root:
```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

2. Replace the values with your actual Supabase URL and key

## Step 7: Run the Application

```bash
npm install
npm run dev
```

Open http://localhost:3000 and login with:
- Email: `demo@student.edu`
- Password: `password123`

## Features

✅ Full authentication with Supabase Auth
✅ Real-time database with PostgreSQL
✅ Row Level Security (RLS) for data protection
✅ AI Chatbot with context-aware responses
✅ Modern React + TypeScript frontend
✅ Beautiful UI matching design specifications

## Troubleshooting

### Can't login?
- Make sure you created the auth user in Supabase
- Check that the email matches exactly
- Verify the user is confirmed (Auto Confirm User was checked)

### No data showing?
- Make sure you replaced `USER_UUID_HERE` with your actual user UUID
- Check that all SQL queries ran successfully
- Verify RLS policies are enabled

### Connection errors?
- Double-check your `.env` file has correct values
- Make sure Supabase project is active
- Check browser console for specific errors
