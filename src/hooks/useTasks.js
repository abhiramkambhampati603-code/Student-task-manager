import { useCallback, useEffect, useState } from 'react'
import * as taskService from '../services/taskService.js'

// The hook keeps screen state independent from the service's storage choice.
export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const retry = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setTasks(await taskService.getTasks())
    } catch (loadError) {
      setError(loadError.message || 'Please check browser storage and try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true
    taskService.getTasks()
      .then((loadedTasks) => { if (active) setTasks(loadedTasks) })
      .catch((loadError) => { if (active) setError(loadError.message || 'Please check browser storage and try again.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  async function createTask(task) {
    const createdTask = await taskService.createTask(task)
    setTasks((current) => [...current, createdTask])
    return createdTask
  }

  async function updateTask(id, updates) {
    const updatedTask = await taskService.updateTask(id, updates)
    setTasks((current) => current.map((task) => task.id === id ? updatedTask : task))
    return updatedTask
  }

  async function deleteTask(id) {
    await taskService.deleteTask(id)
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  return { tasks, loading, error, retry, createTask, updateTask, deleteTask }
}
