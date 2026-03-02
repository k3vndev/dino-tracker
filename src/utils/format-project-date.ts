/**
 * Format a date string into a more readable format (e.g., "Jan 1")
 * @param dateStr - The date string to format
 * @returns A formatted date string or "N/D" if the input is invalid
 */
export const formatProjectDate = (startDateStr?: string, endDateStr?: string) => {
  if (!startDateStr && !endDateStr) return 'No date provided'

  const parseDate = (dateStr?: string) => {
    if (!dateStr) return null

    return new Date(dateStr).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric'
    })
  }

  const formattedStartDate = parseDate(startDateStr)
  const formattedEndDate = parseDate(endDateStr)

  if (formattedStartDate && formattedEndDate) {
    return `${formattedStartDate} - ${formattedEndDate}`
  }

  if (formattedStartDate) return `From ${formattedStartDate}`
  return `To ${formattedEndDate}`
}
