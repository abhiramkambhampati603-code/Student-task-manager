# Studyboard: Student Task Manager

Studyboard is a frontend-only task manager for keeping coursework and deadlines organized. It is built with React and Vite and stores tasks and the selected theme in the browser's local storage. There is no backend, database, authentication, or API server in this version.

## Features

- Dashboard with total, pending, completed, and overdue task counts and a calculated completion bar.
- Create, view, edit, complete, reopen, and confirm deletion of tasks.
- Search by title, filter by status, and sort by due date or priority.
- Priority, course labels, local due dates, and overdue or due-today indicators.
- Responsive sidebar, mobile navigation, keyboard-friendly task form, and light/dark themes.
- Seven sample tasks on first launch, loading and error states, and accessible notifications.

## Technologies

- React functional components and hooks
- Vite development server and production build
- JavaScript and plain CSS with CSS variables
- Browser localStorage; no UI framework or runtime library beyond React

## Project structure

```text
src/
  components/   Reusable dashboard, navigation, task, form, and state UI
  data/         First-launch sample task data
  hooks/        Task state and localStorage preference hooks
  services/     Async task persistence boundary
  styles/       Theme variables and responsive application styles
  utils/        Local-date helpers
  App.jsx       Page state, filtering, sorting, and component composition
  main.jsx      React entry point
```

## Prerequisites

- Node.js 20.19+ or 22.12+ (Vite 8 requirement)
- npm

## Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173/`.

## Production build

```bash
npm run build
npm run preview
```

The production assets are written to `dist/`.

## Local storage

The task service stores the task list under `student-task-manager.tasks.v1`. On the first visit it saves the sample tasks; later visits load saved tasks instead. The theme preference is stored separately under `student-task-manager.theme`. Clearing site data in the browser removes both. If task JSON is malformed, the service restores the starter tasks because the malformed values cannot be safely interpreted.

To exercise the loading-error screen during development, set `SIMULATE_LOAD_ERROR` to `true` near the top of `src/services/taskService.js`, then reload. Restore it to `false` afterward.

## Current limitations

- Data is local to this browser and is not shared across devices or users.
- The calendar is a clearly marked placeholder.
- The app has no authentication, backend, database, or server-side validation.
- The display font is loaded from Google Fonts when network access is available; system fallbacks are included.

## Next steps: connect Java backend

The UI and hook call the asynchronous functions in `src/services/taskService.js`, rather than accessing storage directly. Later, those functions can use `fetch()` to call Spring Boot endpoints such as `GET /api/tasks`, `POST /api/tasks`, `PUT /api/tasks/{id}`, and `DELETE /api/tasks/{id}`. Keep the returned task shape consistent (`id`, `title`, `description`, `subject`, `dueDate`, `priority`, and `status`) so the components and hook need little or no change. The Java service and database are not included in this project.
