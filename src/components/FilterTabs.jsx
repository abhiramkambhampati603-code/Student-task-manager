const filters = ['All', 'Pending', 'Completed']

function FilterTabs({ activeFilter, counts, onChange }) {
  return (
    <div className="filter-tabs" role="group" aria-label="Filter tasks by status">
      {filters.map((filter) => (
        <button key={filter} className={`filter-tab${activeFilter === filter ? ' filter-tab--active' : ''}`} aria-pressed={activeFilter === filter} onClick={() => onChange(filter)}>
          {filter}<span className="filter-tab__count">{counts[filter]}</span>
        </button>
      ))}
    </div>
  )
}

export default FilterTabs
