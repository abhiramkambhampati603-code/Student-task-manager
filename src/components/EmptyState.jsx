import Icon from './Icon.jsx'

function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon"><Icon name="tasks" size={23} /></div>
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && <button className="button button--primary" onClick={onAction}><Icon name="plus" size={16} />{actionLabel}</button>}
    </div>
  )
}

export default EmptyState
