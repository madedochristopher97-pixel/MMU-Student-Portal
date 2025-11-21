export default function QuickActions() {
  const actions = [
    { icon: '⬇', color: 'orange', label: 'Download Transcript' },
    { icon: '⬆', color: 'green', label: 'Submit Assignment' },
    { icon: '📄', color: 'purple', label: 'View Statement' },
    { icon: '💬', color: 'orange', label: 'Contact Support' },
    { icon: '⚙', color: 'gray', label: 'Account Settings' }
  ]

  return (
    <div className="card">
      <h3>⚡ Quick Actions</h3>
      <p className="card-subtitle">Frequent tasks</p>
      <div className="quick-actions">
        {actions.map((action, index) => (
          <button key={index} className="quick-action-btn">
            <span className={`action-icon ${action.color}`}>{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
