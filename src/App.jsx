import { useCallback, useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import StatsCards from './components/StatsCards.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import FilterTabs from './components/FilterTabs.jsx'
import TaskList from './components/TaskList.jsx'
import TaskForm from './components/TaskForm.jsx'
import ConfirmDialog from './components/ConfirmDialog.jsx'
import Toast from './components/Toast.jsx'
import ErrorState from './components/ErrorState.jsx'
import Loader from './components/Loader.jsx'
import Icon from './components/Icon.jsx'
import { useTasks } from './hooks/useTasks.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { getLocalDateString } from './utils/dateHelpers.js'
import './styles/app.css'

function App() {
  const { tasks, loading, error, retry, createTask, updateTask, deleteTask } = useTasks()
  const [theme, setTheme] = useLocalStorage('student-task-manager.theme', 'light')
  const [page, setPage] = useState('dashboard')
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('dueDate')
  const [sortDirection, setSortDirection] = useState('asc')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [deletingTask, setDeletingTask] = useState(null)
  const [toast, setToast] = useState(null)
  const [toastId, setToastId] = useState(0)

  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])

  const counts = useMemo(() => ({
    All: tasks.length,
    Pending: tasks.filter((task) => task.status === 'Pending').length,
    Completed: tasks.filter((task) => task.status === 'Completed').length,
  }), [tasks])

  const stats = useMemo(() => {
    const completed = counts.Completed
    return {
      total: tasks.length,
      pending: counts.Pending,
      completed,
      overdue: tasks.filter((task) => (
        task.status === 'Pending' && task.dueDate < getLocalDateString()
      )).length,
      percentage: tasks.length ? Math.round((completed / tasks.length) * 100) : 0,
    }
  }, [counts, tasks])

  const visibleTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    return tasks
      .filter((task) => filter === 'All' || task.status === filter)
      .filter((task) => task.title.toLowerCase().includes(normalizedSearch))
      .sort((first, second) => {
        const priorityRank = { High: 0, Medium: 1, Low: 2 }
        const firstValue = sortBy === 'priority' ? priorityRank[first.priority] : first.dueDate
        const secondValue = sortBy === 'priority' ? priorityRank[second.priority] : second.dueDate
        const comparison = firstValue < secondValue ? -1 : firstValue > secondValue ? 1 : 0
        return sortDirection === 'asc' ? comparison : -comparison
      })
  }, [filter, search, sortBy, sortDirection, tasks])

  function showToast(message, tone = 'success') {
    setToastId((current) => current + 1)
    setToast({ message, tone })
  }

  const dismissToast = useCallback(() => setToast(null), [])

  function openCreateForm() {
    setEditingTask(null)
    setFormOpen(true)
  }

  function openEditForm(task) {
    setEditingTask(task)
    setFormOpen(true)
  }

  async function saveTask(values) {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, values)
        showToast('Task updated')
      } else {
        await createTask(values)
        showToast('Task added')
      }
      setFormOpen(false)
      setEditingTask(null)
    } catch (saveError) {
      showToast(saveError.message || 'Could not save this task', 'error')
    }
  }

  async function changeTaskStatus(task) {
    const status = task.status === 'Completed' ? 'Pending' : 'Completed'
    try {
      await updateTask(task.id, { status })
      showToast(status === 'Completed' ? 'Task completed' : 'Task reopened')
    } catch (updateError) {
      showToast(updateError.message || 'Could not update this task', 'error')
    }
  }

  async function confirmDelete() {
    if (!deletingTask) return
    try {
      await deleteTask(deletingTask.id)
      showToast('Task deleted')
      setDeletingTask(null)
    } catch (deleteError) {
      showToast(deleteError.message || 'Could not delete this task', 'error')
    }
  }

  function navigate(nextPage) {
    setPage(nextPage)
    setMobileMenuOpen(false)
  }

  if (loading) return <Loader />
  if (error) return <ErrorState message={error} onRetry={retry} />

  const title = page === 'dashboard' ? 'Your study space' : page === 'tasks' ? 'All tasks' : 'Calendar'

  return (
    <div className="app-shell">
      <Sidebar
        activePage={page}
        onNavigate={navigate}
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      {mobileMenuOpen && (
        <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileMenuOpen(false)} />
      )}
      <div className="workspace">
        <Header
          title={title}
          theme={theme}
          onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          search={search}
          onSearch={setSearch}
          onMenu={() => setMobileMenuOpen(true)}
        />

        <main className="page-content">
          {page === 'calendar' ? (
            <section className="calendar-placeholder" aria-labelledby="calendar-title">
              <div className="calendar-placeholder__icon"><Icon name="calendar" size={30} /></div>
              <p className="eyebrow">COMING SOON</p>
              <h1 id="calendar-title">Calendar view</h1>
              <p>Your deadlines will have a calendar home here.</p>
              <button className="button button--secondary" onClick={() => navigate('tasks')}>Go to tasks</button>
            </section>
          ) : (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">{page === 'dashboard' ? 'YOUR STUDY SPACE' : 'YOUR WORKLOAD'}</p>
                  <h1>{page === 'dashboard' ? 'A little progress adds up.' : 'Keep your tasks moving.'}</h1>
                  <p className="page-heading__sub">{page === 'dashboard' ? 'Here is what is happening with your coursework.' : 'Everything you need to stay on top of class.'}</p>
                </div>
                <button className="button button--primary" onClick={openCreateForm}>
                  <Icon name="plus" size={17} /> <span>New task</span>
                </button>
              </div>

              {page === 'dashboard' && (
                <>
                  <StatsCards stats={stats} />
                  <ProgressBar completed={stats.completed} total={stats.total} percentage={stats.percentage} />
                  <section className="task-section dashboard-tasks" aria-labelledby="upcoming-title">
                    <div className="section-heading">
                      <div>
                        <p className="eyebrow">STAY IN THE FLOW</p>
                        <h2 id="upcoming-title">Your tasks</h2>
                      </div>
                      <button className="text-button" onClick={() => navigate('tasks')}>View all <span aria-hidden="true">-&gt;</span></button>
                    </div>
                    <TaskList
                      tasks={visibleTasks.slice(0, 4)}
                      totalTasks={tasks.length}
                      filter={filter}
                      search={search}
                      onAdd={openCreateForm}
                      onEdit={openEditForm}
                      onDelete={setDeletingTask}
                      onToggle={changeTaskStatus}
                    />
                  </section>
                </>
              )}

              {page === 'tasks' && (
                <section className="task-section task-page" aria-labelledby="task-list-title">
                  <div className="task-controls">
                    <FilterTabs activeFilter={filter} counts={counts} onChange={setFilter} />
                    <div className="sort-control">
                      <label htmlFor="task-sort">Sort by</label>
                      <select id="task-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                        <option value="dueDate">Due date</option>
                        <option value="priority">Priority</option>
                      </select>
                      <button
                        className="icon-button sort-direction"
                        aria-label={`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
                        title={`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
                        onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                      >
                        <Icon name="sort" size={17} />
                      </button>
                    </div>
                  </div>
                  <div className="section-heading section-heading--compact">
                    <div><h2 id="task-list-title">{filter} tasks <span className="heading-count">{visibleTasks.length}</span></h2></div>
                  </div>
                  <TaskList
                    tasks={visibleTasks}
                    totalTasks={tasks.length}
                    filter={filter}
                    search={search}
                    onAdd={openCreateForm}
                    onEdit={openEditForm}
                    onDelete={setDeletingTask}
                    onToggle={changeTaskStatus}
                  />
                </section>
              )}
            </>
          )}
        </main>
      </div>

      {formOpen && (
        <TaskForm
          key={editingTask?.id || 'new-task'}
          task={editingTask}
          onSave={saveTask}
          onClose={() => { setFormOpen(false); setEditingTask(null) }}
        />
      )}
      {deletingTask && (
        <ConfirmDialog
          title="Delete this task?"
          message={`“${deletingTask.title}” will be removed from your task list.`}
          confirmLabel="Delete task"
          onCancel={() => setDeletingTask(null)}
          onConfirm={confirmDelete}
        />
      )}
      {toast && <Toast key={toastId} message={toast.message} tone={toast.tone} onDismiss={dismissToast} />}
    </div>
  )
}

export default App
