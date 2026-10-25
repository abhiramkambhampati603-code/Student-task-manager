function ProgressBar({ completed, total, percentage }) {
  return (
    <section className="progress-panel" aria-labelledby="progress-title">
      <div className="progress-panel__copy">
        <div className="progress-panel__heading">
          <span className="progress-panel__symbol" aria-hidden="true">+</span>
          <div><p className="eyebrow">YOUR MOMENTUM</p><h2 id="progress-title">Nice work, keep it going</h2></div>
        </div>
        <p className="progress-panel__count"><strong>{completed} of {total}</strong> tasks completed</p>
      </div>
      <div className="progress-panel__meter">
        <div className="progress-panel__percent">{percentage}<span>%</span></div>
        <div className="progress-track" role="progressbar" aria-label="Task completion" aria-valuemin="0" aria-valuemax="100" aria-valuenow={percentage}>
          <div className="progress-track__fill" style={{ width: `${percentage}%` }} />
        </div>
        <span className="progress-panel__hint">Overall completion</span>
      </div>
    </section>
  )
}

export default ProgressBar
