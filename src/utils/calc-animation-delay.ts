/**
 * Calculates the animation delay for a given index, with optional parameters for delay increment and base delay.
 * @returns a string representing the animation delay in milliseconds.
 */
export const calcAnimationDelay = (index: number, delayIncrement: number, baseDelay = 0): string => {
  const delay = baseDelay + index * delayIncrement
  return `${delay}ms`
}
