function StatCard({ title, value, description, icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value" style={{ color: color }}>
        {value}
      </div>
      <div className="stat-description">{description}</div>
      {icon && (
        <div className="stat-icon" style={{ color: color }}>
          {icon}
        </div>
      )}
    </div>
  )
}

export default StatCard
