function dateFromToday(offset) {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const sampleTasks = [
  {
    id: 'sample-essay-outline',
    title: 'Draft the research essay outline',
    description: 'Turn the source notes into a clear thesis and three supporting sections.',
    subject: 'World History', dueDate: dateFromToday(1), priority: 'High', status: 'Pending',
  },
  {
    id: 'sample-calculus-set',
    title: 'Finish problem set 6',
    description: 'Complete questions 2 through 12 and check the integration steps.',
    subject: 'Calculus II', dueDate: dateFromToday(3), priority: 'Medium', status: 'Pending',
  },
  {
    id: 'sample-chemistry-lab',
    title: 'Submit lab results and discussion',
    description: 'Add the final graph and compare results with the expected reaction rate.',
    subject: 'Chemistry', dueDate: dateFromToday(-2), priority: 'High', status: 'Pending',
  },
  {
    id: 'sample-reading-notes',
    title: 'Review chapter 8 reading notes',
    description: 'Pull out key terms before the seminar discussion.',
    subject: 'Psychology', dueDate: dateFromToday(0), priority: 'Low', status: 'Pending',
  },
  {
    id: 'sample-presentation',
    title: 'Polish presentation slides',
    description: 'Check image credits and rehearse the opening section.',
    subject: 'Environmental Science', dueDate: dateFromToday(7), priority: 'Medium', status: 'Completed',
  },
  {
    id: 'sample-flashcards',
    title: 'Review biology flashcards',
    description: 'Focus on cell signaling and the vocabulary from lecture 4.',
    subject: 'Biology', dueDate: dateFromToday(-1), priority: 'Low', status: 'Completed',
  },
  {
    id: 'sample-group-outline',
    title: 'Share the group project outline',
    description: 'Post the section plan in the class workspace for feedback.',
    subject: 'Communications', dueDate: dateFromToday(5), priority: 'Medium', status: 'Pending',
  },
]
