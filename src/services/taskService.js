import { sampleTasks } from '../data/sampleTasks.js'

// Keep this Promise-based contract when replacing localStorage with Spring Boot calls.
const STORAGE_KEY = 'student-task-manager.tasks.v1'
const SIMULATE_LOAD_ERROR = false

function readStoredTasks() {
  const storedValue = window.localStorage.getItem(STORAGE_KEY)
  if (storedValue === null) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTasks))
    return [...sampleTasks]
  }

  try {
    const tasks = JSON.parse(storedValue)
    if (!Array.isArray(tasks)) throw new Error('Saved task data is not a list.')
    return tasks.filter((task) => (
      task && typeof task.id === 'string' && typeof task.title === 'string' &&
      typeof task.dueDate === 'string' && ['Pending', 'Completed'].includes(task.status)
    ))
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTasks))
    return [...sampleTasks]
  }
}

function saveTasks(tasks) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    throw new Error('Your browser could not save changes. Check available storage and try again.')
  }
}

function createId() {
  return globalThis.crypto?.randomUUID?.() || `task-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export async function getTasks() {
  await new Promise((resolve) => window.setTimeout(resolve, 800))
  if (SIMULATE_LOAD_ERROR) throw new Error('Development test: task loading was intentionally interrupted.')
  try {
    return readStoredTasks()
  } catch {
    throw new Error('Browser storage is unavailable. Enable local storage and try again.')
  }
}

export async function createTask(task) {
  const currentTasks = readStoredTasks()
  const createdTask = { ...task, id: createId(), status: 'Pending' }
  saveTasks([...currentTasks, createdTask])
  return createdTask
}

export async function updateTask(id, updates) {
  const currentTasks = readStoredTasks()
  const taskIndex = currentTasks.findIndex((task) => task.id === id)
  if (taskIndex < 0) throw new Error('This task no longer exists. Refresh your task list and try again.')
  const updatedTask = { ...currentTasks[taskIndex], ...updates, id }
  const nextTasks = [...currentTasks]
  nextTasks[taskIndex] = updatedTask
  saveTasks(nextTasks)
  return updatedTask
}

export async function deleteTask(id) {
  const currentTasks = readStoredTasks()
  if (!currentTasks.some((task) => task.id === id)) {
    throw new Error('This task no longer exists. Refresh your task list and try again.')
  }
  saveTasks(currentTasks.filter((task) => task.id !== id))
}
