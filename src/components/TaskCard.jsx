import Icon from './Icon.jsx'
import { formatDueDate, getDueStatus } from '../utils/dateHelpers.js'

function TaskCard({ task, onEdit, onDelete, onToggle }) {
  const dueStatus = getDueStatus(task)

  return (
    <article className={`task-card${task.status === 'Completed' ? ' task-card--completed' : ''}`}>
      <label className="task-check">
        <input type="checkbox" checked={task.status === 'Completed'} onChange={() => onToggle(task)} aria-label={`${task.status === 'Completed' ? 'Reopen' : 'Complete'} ${task.title}`} />
        <span className="task-check__visual"><Icon name="check" size={14} /></span>
      </label>
      <div className="task-card__main">
        <div className="task-card__title-row">
          <h3 className="task-card__title">{task.title}</h3>
          {task.subject && <span className="subject-tag">{task.subject}</span>}
        </div>
        {task.description && <p className="task-card__description">{task.description}</p>}
        <div className="task-card__meta">
          <span className={`priority-badge priority-badge--${task.priority.toLowerCase()}`}><span />{task.priority}</span>
          <span className={`due-date${dueStatus ? ` due-date--${dueStatus.kind}` : ''}`}>
            {dueStatus && <span className="due-date__status">{dueStatus.label}</span>}{formatDueDate(task.dueDate)}
          </span>
        </div>
      </div>
      <div className="task-card__actions">
        <button className="icon-button" aria-label={`Edit ${task.title}`} title="Edit task" onClick={() => onEdit(task)}><Icon name="edit" size={17} /></button>
        <button className="icon-button icon-button--danger" aria-label={`Delete ${task.title}`} title="Delete task" onClick={() => onDelete(task)}><Icon name="trash" size={17} /></button>
      </div>
    </article>
  )
}

export default TaskCard
