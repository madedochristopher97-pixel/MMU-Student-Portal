import { useState } from 'react'
import { Event } from '../lib/supabase'

interface Props {
  events: Event[]
}

export default function CalendarCard({ events }: Props) {
  const [currentMonth, setCurrentMonth] = useState(9) // October
  const [currentYear, setCurrentYear] = useState(2025)

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const navigateMonth = (direction: number) => {
    let newMonth = currentMonth + direction
    let newYear = currentYear

    if (newMonth < 0) {
      newMonth = 11
      newYear--
    } else if (newMonth > 11) {
      newMonth = 0
      newYear++
    }

    setCurrentMonth(newMonth)
    setCurrentYear(newYear)
  }

  return (
    <div className="card">
      <div className="card-header">
        <span className="icon">📅</span>
        <div>
          <h3>Calendar</h3>
          <p className="card-subtitle">Upcoming events & deadlines</p>
        </div>
      </div>
      
      <div className="calendar">
        <div className="calendar-header">
          <button className="calendar-nav" onClick={() => navigateMonth(-1)}>‹</button>
          <span className="calendar-month">{months[currentMonth]} {currentYear}</span>
          <button className="calendar-nav" onClick={() => navigateMonth(1)}>›</button>
        </div>
        <div className="calendar-grid">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}
          {Array.from({ length: 35 }, (_, i) => (
            <div key={i} className={`calendar-day ${i === 19 ? 'today' : ''}`}>
              {i < 31 ? i + 1 : ''}
            </div>
          ))}
        </div>
      </div>
      
      <div className="upcoming-events">
        <h4>Upcoming Events</h4>
        {events.slice(0, 3).map((event) => (
          <div key={event.id} className="event-item">
            <span className={`event-dot ${event.color || 'blue'}`}></span>
            <div>
              <strong>{event.title}</strong>
              <p className="event-date">{new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
