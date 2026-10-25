import Modal from './Modal.jsx'

function ConfirmDialog({ title, message, confirmLabel, onCancel, onConfirm }) {
  return (
    <Modal title={title} onClose={onCancel} size="small">
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="form-actions">
          <button className="button button--secondary" onClick={onCancel}>Cancel</button>
          <button className="button button--danger" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
