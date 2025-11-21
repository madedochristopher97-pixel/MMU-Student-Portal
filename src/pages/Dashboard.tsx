import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { supabase, AcademicRecord, Deadline, FinancialRecord, Announcement, Event, Activity } from '../lib/supabase'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import AcademicCard from '../components/AcademicCard'
import FinancialCard from '../components/FinancialCard'
import CalendarCard from '../components/CalendarCard'
import AnnouncementsCard from '../components/AnnouncementsCard'
import ActivityStream from '../components/ActivityStream'
import QuickActions from '../components/QuickActions'
import ProfileCard from '../components/ProfileCard'
import Chatbot from '../components/Chatbot'
import '../styles/Dashboard.css'

export default function Dashboard() {
  const { user } = useAuthStore()
  const [academic, setAcademic] = useState<AcademicRecord | null>(null)
  const [deadlines, setDeadlines] = useState<Deadline[]>([])
  const [financial, setFinancial] = useState<FinancialRecord | null>(null)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    if (!user) return

    // Load academic record
    const { data: academicData } = await supabase
      .from('academic_records')
      .select('*')
      .eq('user_id', user.id)
      .order('id', { ascending: false })
      .limit(1)
      .single()
    setAcademic(academicData)

    // Load deadlines
    const { data: deadlinesData } = await supabase
      .from('deadlines')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'pending')
      .order('due_date', { ascending: true })
    setDeadlines(deadlinesData || [])

    // Load financial record
    const { data: financialData } = await supabase
      .from('financial_records')
      .select('*')
      .eq('user_id', user.id)
      .order('id', { ascending: false })
      .limit(1)
      .single()
    setFinancial(financialData)

    // Load announcements
    const { data: announcementsData } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
    setAnnouncements(announcementsData || [])

    // Load events
    const { data: eventsData } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', user.id)
      .order('event_date', { ascending: true })
    setEvents(eventsData || [])

    // Load activities
    const { data: activitiesData } = await supabase
      .from('activity_log')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(10)
    setActivities(activitiesData || [])
  }

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <TopBar />
        
        <section className="welcome-section">
          <h2>Welcome back, {user?.first_name}</h2>
          <p className="subtitle">Here's what's happening with your academic journey</p>
        </section>

        <AnnouncementsCard announcements={announcements} />

        <div className="dashboard-grid">
          <AcademicCard academic={academic} deadlines={deadlines} />
          <FinancialCard financial={financial} />
          <CalendarCard events={events} />
        </div>

        <ActivityStream activities={activities} />

        <aside className="right-sidebar">
          <QuickActions />
          <ProfileCard user={user} />
        </aside>
      </main>
      
      <Chatbot />
    </div>
  )
}
