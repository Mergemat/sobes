import { useCallback, useEffect, useRef, useState } from 'react'

export function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    timeout.current = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeout.current)
  }, [delay, value])

  const flush = useCallback((nextValue: T) => {
    clearTimeout(timeout.current)
    setDebouncedValue(nextValue)
  }, [])

  return {
    value: debouncedValue,
    isPending: !Object.is(value, debouncedValue),
    flush,
  }
}
