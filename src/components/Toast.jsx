import { useEffect } from 'react'
import Icon from './Icon.jsx'

function Toast({ message, tone, onDismiss }) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 3200)
    return () => window.clearTimeout(timer)
  }, [onDismiss])

  return (
    <div className={`toast toast--${tone}`} role={tone === 'error' ? 'alert' : 'status'} aria-live={tone === 'error' ? 'assertive' : 'polite'}>
      <span className="toast__icon"><Icon name={tone === 'error' ? 'close' : 'check'} size={16} /></span>
      <span>{message}</span>
      <button className="toast__dismiss" aria-label="Dismiss notification" onClick={onDismiss}><Icon name="close" size={15} /></button>
    </div>
  )
}

export default Toast
