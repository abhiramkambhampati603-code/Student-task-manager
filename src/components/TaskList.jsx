import EmptyState from './EmptyState.jsx'
import TaskCard from './TaskCard.jsx'

function TaskList({ tasks, totalTasks, filter, search, onAdd, onEdit, onDelete, onToggle }) {
  if (!tasks.length) {
    let title = 'No tasks yet'
    let message = 'Start with one small thing you want to get done.'
    if (search.trim()) {
      title = 'No matching tasks'
      message = `Nothing matches “${search.trim()}”. Try another title.`
    } else if (totalTasks > 0) {
      title = `No ${filter.toLowerCase()} tasks`
      message = filter === 'Completed' ? 'Finished tasks will show up here.' : 'You are all caught up in this filter.'
    }
    return <EmptyState title={title} message={message} actionLabel={totalTasks ? undefined : 'Add your first task'} onAction={onAdd} />
  }

  return (
    <div className="task-list">
      {tasks.map((task) => <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />)}
    </div>
  )
}

export default TaskList
