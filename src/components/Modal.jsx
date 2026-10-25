import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'

function Modal({ title, onClose, children, size = 'normal' }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const dialog = dialogRef.current
    const focusable = () => [...dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])')]
    focusable()[0]?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const items = focusable()
        if (!items.length) return
        if (event.shiftKey && document.activeElement === items[0]) {
          event.preventDefault()
          items.at(-1).focus()
        } else if (!event.shiftKey && document.activeElement === items.at(-1)) {
          event.preventDefault()
          items[0].focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus?.()
    }
  }, [onClose])

  return (
    <div className="modal-backdrop">
      <section className={`modal modal--${size}`} role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={dialogRef}>
        <div className="modal__header">
          <h2 id="modal-title">{title}</h2>
          <button className="icon-button" aria-label="Close dialog" onClick={onClose}><Icon name="close" size={19} /></button>
        </div>
        {children}
      </section>
    </div>
  )
}

export default Modal
