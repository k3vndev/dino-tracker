import { useEffect, useRef } from 'react'

/**
 * Hook to get a ref that always has the latest value
 * @param value The value to keep in the ref
 * @returns A ref object that always has the latest value
 */
export const useFreshRefs = <T>(value: T) => {
  const ref = useRef<T>(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}
