import { useEffect, useRef } from 'react'

/**
 * A custom hook to refresh global state when a local state changes with a debounce.
 *
 * @param refresher A function that takes the latest local state and updates the global state accordingly.
 * @param local The local state that we want to watch for changes and use to refresh the global state.
 * @param debounceTime The debounce time in milliseconds to prevent excessive updates to the global state. Default is 300ms.
 */
export const useGlobalStateRefresh = <T>(refresher: (latest: T) => void, local: T, debounceTime = 300) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      refresher(local)
    }, debounceTime)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [local, refresher, debounceTime])
}
