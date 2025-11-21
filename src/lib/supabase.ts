import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  student_id: string
  email: string
  first_name: string
  last_name: string
  date_of_birth?: string
  id_number?: string
  phone?: string
  created_at: string
}

export interface AcademicRecord {
  id: string
  user_id: string
  semester: string
  gpa: number
  percentile: number
}

export interface Course {
  id: string
  user_id: string
  course_name: string
  course_code: string
  grade?: string
  credits: number
  semester: string
}

export interface Deadline {
  id: string
  user_id: string
  title: string
  course: string
  due_date: string
  type: string
  status: string
}

export interface FinancialRecord {
  id: string
  user_id: string
  total_billed: number
  total_paid: number
  credit_balance: number
  semester: string
}

export interface Announcement {
  id: string
  title: string
  description: string
  type: string
  priority: string
  date: string
  created_at: string
}

export interface Event {
  id: string
  user_id: string
  title: string
  description?: string
  event_date: string
  event_type?: string
  color?: string
}

export interface Activity {
  id: string
  user_id: string
  activity_type: string
  title: string
  description?: string
  date: string
  icon?: string
}

export interface ChatMessage {
  id: string
  user_id: string
  message: string
  sender: 'user' | 'bot'
  timestamp: string
}
