import { useEffect, useRef, useState } from 'react'
import { useFreshRefs } from './use-fresh-refs'

/**
 * Debounce hook
 * @param value Value to debounce
 * @param wait Debounce time in milliseconds
 * @param refresh If true (default), the debounce timer will not reset if the value changes while the timer is active
 * @returns Debounced value
 */
export const useDebounce = <T>(value: T, wait: number, refresh = true) => {
  const isFirstTrigger = useRef(true)
  const [debouncedValue, setDebouncedValue] = useState(value)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const isOnTimeout = useRef(false)
  const latestValueRef = useFreshRefs(value)

  useEffect(() => {
    if (isFirstTrigger.current || wait <= 0) {
      isFirstTrigger.current = false
      return
    }

    if (refresh && isOnTimeout.current) {
      return
    }

    stopTimeout()
    isOnTimeout.current = true

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(latestValueRef.current)
      stopTimeout()
      isOnTimeout.current = false
    }, wait)
  }, [value])

  const stopTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  return wait <= 0 ? value : debouncedValue
}
