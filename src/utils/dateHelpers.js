// Use local calendar fields so a UTC conversion cannot shift a due date by one day.
export function getLocalDateString(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatDueDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
}

export function getDueStatus(task) {
  if (task.status === 'Completed') return null
  const today = getLocalDateString()
  if (task.dueDate < today) return { kind: 'overdue', label: 'Overdue' }
  if (task.dueDate === today) return { kind: 'today', label: 'Due today' }
  return null
}
