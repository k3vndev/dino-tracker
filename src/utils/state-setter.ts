import type { StoreApi } from 'zustand'

export type ValueOrCallback<T> = ((prev: T) => T) | T

type ZustandSet<T extends object> = StoreApi<T>['setState']

/**
 * A utility class for setting state in a Zustand store with support for both direct values and callback functions.
 */
export class StateSetter<T extends object> {
  constructor(private readonly set: ZustandSet<T>) {}

  /**
   * Sets the state for a specific key in the store.
   * @param key The key of the state to update.
   * @param valueOrCallback The new value or a callback function that receives the previous value and returns the new value.
   * @param postProcess An optional function to process the value before setting it.
   * @returns void
   */
  setState = <K extends keyof T>(
    key: K,
    valueOrCallback: ValueOrCallback<T[K]>,
    postProcess: (value: T[K]) => T[K] = v => v
  ): void =>
    this.set(state => {
      const prevValue = state[key]

      const nextValue =
        typeof valueOrCallback === 'function'
          ? (valueOrCallback as (prev: T[K]) => T[K])(structuredClone(prevValue))
          : valueOrCallback

      return { ...state, [key]: postProcess(nextValue) }
    })
}
