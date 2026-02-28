/**
 * Format a date string into a more readable format (e.g., "Jan 1")
 * @param dateStr - The date string to format
 * @returns A formatted date string or "N/D" if the input is invalid
 */
export const formatProjectDate = (dateStr?: string) => {
  if (!dateStr) return 'N/D'

  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
