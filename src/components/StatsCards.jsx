import Icon from './Icon.jsx'

const cards = [
  { key: 'total', label: 'Total tasks', icon: 'tasks', color: 'blue' },
  { key: 'pending', label: 'Pending', icon: 'calendar', color: 'amber' },
  { key: 'completed', label: 'Completed', icon: 'check', color: 'green' },
  { key: 'overdue', label: 'Overdue', icon: 'calendar', color: 'rose' },
]

function StatsCards({ stats }) {
  return (
    <section className="stats-grid" aria-label="Task statistics">
      {cards.map((card) => (
        <article className="stat-card" key={card.key}>
          <div className={`stat-card__icon stat-card__icon--${card.color}`}><Icon name={card.icon} size={18} /></div>
          <span className="stat-card__label">{card.label}</span>
          <strong className="stat-card__value">{stats[card.key]}</strong>
          {card.key === 'overdue' && stats.overdue > 0 && <span className="stat-card__note">Needs attention</span>}
        </article>
      ))}
    </section>
  )
}

export default StatsCards
