import Icon from './Icon.jsx'

function ErrorState({ message, onRetry }) {
  return (
    <main className="status-screen">
      <div className="status-screen__icon status-screen__icon--error"><Icon name="close" size={24} /></div>
      <h1>We could not load your tasks</h1>
      <p>{message}</p>
      <button className="button button--primary" onClick={onRetry}>Try again</button>
    </main>
  )
}

export default ErrorState
