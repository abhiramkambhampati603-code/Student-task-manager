import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key)
      return storedValue === null ? initialValue : JSON.parse(storedValue)
    } catch {
      return initialValue
    }
  })

  function updateValue(nextValue) {
    setValue((currentValue) => {
      const resolvedValue = typeof nextValue === 'function' ? nextValue(currentValue) : nextValue
      try {
        window.localStorage.setItem(key, JSON.stringify(resolvedValue))
      } catch {
        // The interface remains usable when browser storage is unavailable.
      }
      return resolvedValue
    })
  }

  return [value, updateValue]
}
