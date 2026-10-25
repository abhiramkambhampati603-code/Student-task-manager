import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'

function Header({ title, theme, onToggleTheme, search, onSearch, onMenu }) {
  const searchInput = useRef(null)

  useEffect(() => {
    function focusSearch(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchInput.current?.focus()
      }
    }
    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={onMenu}><Icon name="menu" /></button>
      <div className="topbar__context"><span>Welcome back</span><span className="breadcrumb-slash">/</span><strong>{title}</strong></div>
      <div className="topbar__actions">
        <label className="search-box">
          <Icon name="search" size={18} />
          <span className="sr-only">Search tasks by title</span>
          <input ref={searchInput} type="search" placeholder="Search tasks..." value={search} onChange={(event) => onSearch(event.target.value)} />
          <kbd>Ctrl K</kbd>
        </label>
        <button className="icon-button theme-toggle" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} onClick={onToggleTheme}>
          <Icon name={theme === 'light' ? 'moon' : 'sun'} size={19} />
        </button>
      </div>
    </header>
  )
}

export default Header
