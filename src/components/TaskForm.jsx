import { useState } from 'react'
import Modal from './Modal.jsx'

function TaskForm({ task, onSave, onClose }) {
  const [values, setValues] = useState({
    title: task?.title || '', description: task?.description || '', subject: task?.subject || '',
    dueDate: task?.dueDate || '', priority: task?.priority || 'Medium',
  })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  function updateField(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!values.title.trim()) nextErrors.title = 'Enter a task title.'
    if (!values.dueDate) nextErrors.dueDate = 'Choose a due date.'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setSaving(true)
    await onSave({ ...values, title: values.title.trim(), description: values.description.trim(), subject: values.subject.trim() })
    setSaving(false)
  }

  return (
    <Modal title={task ? 'Edit task' : 'Create a task'} onClose={onClose}>
      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <label className="form-field" htmlFor="task-title">
          <span>Task title <span className="required-mark">*</span></span>
          <input id="task-title" name="title" value={values.title} onChange={updateField} aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'title-error' : undefined} autoComplete="off" />
          {errors.title && <span className="field-error" id="title-error">{errors.title}</span>}
        </label>
        <label className="form-field" htmlFor="task-description">
          <span>Description <span className="field-optional">(optional)</span></span>
          <textarea id="task-description" name="description" rows="3" value={values.description} onChange={updateField} />
        </label>
        <label className="form-field" htmlFor="task-subject">
          <span>Subject or course <span className="field-optional">(optional)</span></span>
          <input id="task-subject" name="subject" value={values.subject} onChange={updateField} placeholder="e.g. Biology 101" />
        </label>
        <div className="form-row">
          <label className="form-field" htmlFor="task-due-date">
            <span>Due date <span className="required-mark">*</span></span>
            <input id="task-due-date" type="date" name="dueDate" value={values.dueDate} onChange={updateField} aria-invalid={Boolean(errors.dueDate)} aria-describedby={errors.dueDate ? 'date-error' : undefined} />
            {errors.dueDate && <span className="field-error" id="date-error">{errors.dueDate}</span>}
          </label>
          <label className="form-field" htmlFor="task-priority">
            <span>Priority</span>
            <select id="task-priority" name="priority" value={values.priority} onChange={updateField}>
              <option>Low</option><option>Medium</option><option>High</option>
            </select>
          </label>
        </div>
        <div className="form-actions">
          <button className="button button--secondary" type="button" onClick={onClose}>Cancel</button>
          <button className="button button--primary" type="submit" disabled={saving}>{saving ? 'Saving...' : task ? 'Save changes' : 'Create task'}</button>
        </div>
      </form>
    </Modal>
  )
}

export default TaskForm
