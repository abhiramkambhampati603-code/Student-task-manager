import Icon from './Icon.jsx'

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'tasks', label: 'Tasks', icon: 'tasks' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
]

function Sidebar({ activePage, onNavigate, open, onClose }) {
  return (
    <aside className={`sidebar${open ? ' sidebar--open' : ''}`} aria-label="Main navigation">
      <div className="sidebar__brand">
        <span className="brand-mark" aria-hidden="true">s</span>
        <span>studyboard<span className="brand-period">.</span></span>
        <button className="icon-button sidebar__close" aria-label="Close navigation" onClick={onClose}><Icon name="close" /></button>
      </div>
      <p className="sidebar__label">WORKSPACE</p>
      <nav className="sidebar__nav">
        {navigation.map((item) => (
          <button
            className={`nav-item${activePage === item.id ? ' nav-item--active' : ''}`}
            key={item.id}
            aria-current={activePage === item.id ? 'page' : undefined}
            onClick={() => onNavigate(item.id)}
          >
            <Icon name={item.icon} size={19} />
            <span>{item.label}</span>
            {item.id === 'calendar' && <span className="nav-soon">Soon</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar__footer">
        <div className="avatar" aria-hidden="true">S</div>
        <div><strong>Student</strong><span>Personal workspace</span></div>
        <span className="online-dot" aria-label="Online" />
      </div>
    </aside>
  )
}

export default Sidebar
