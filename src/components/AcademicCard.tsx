import { AcademicRecord, Deadline } from '../lib/supabase'

interface Props {
  academic: AcademicRecord | null
  deadlines: Deadline[]
}

export default function AcademicCard({ academic, deadlines }: Props) {
  const calculateDaysLeft = (dueDate: string) => {
    const due = new Date(dueDate)
    const today = new Date()
    return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="card">
      <div className="card-header">
        <span className="icon-circle orange">🎓</span>
        <div>
          <h3>Academic Performance</h3>
          <p className="card-subtitle">Current semester overview</p>
        </div>
        <button className="external-link-btn">↗</button>
      </div>
      
      <div className="gpa-section">
        <div className="gpa-header">
          <span>Current GPA</span>
          <span className="trend-icon">📈</span>
        </div>
        <div className="gpa-value">
          <span className="gpa-number">{academic?.gpa.toFixed(2) || '0.00'}</span>
          <span className="gpa-max">/ 4.00</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((academic?.gpa || 0) / 4.0) * 100}%` }}></div>
        </div>
        <p className="percentile-text">{academic?.percentile || 0}th percentile in your cohort</p>
      </div>
      
      <div className="deadlines-section">
        <h4>📅 Upcoming Deadlines</h4>
        {deadlines.slice(0, 3).map((deadline) => {
          const daysLeft = calculateDaysLeft(deadline.due_date)
          return (
            <div key={deadline.id} className="deadline-item">
              <div>
                <strong>{deadline.title}</strong>
                <p className="deadline-course">{deadline.course}</p>
              </div>
              <span className={`deadline-badge ${daysLeft <= 5 ? 'urgent' : ''}`}>
                {daysLeft}d
              </span>
            </div>
          )
        })}
      </div>
      
      <div className="card-footer-tabs">
        <button className="tab-btn active">View Grades</button>
        <button className="tab-btn">Course Materials</button>
      </div>
    </div>
  )
}
