import { useEditableFieldContext } from '@context'
import { DateTime } from 'luxon'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const ValuesRepresentation = () => {
  const { field, startDate, endDate, selectedDate, setSelectedDate } = useEditableFieldContext()
  const inputRef = useRef<HTMLInputElement>(null)

  const arrangedValues: ArrangedValue[] | null = useMemo(() => {
    if (!field || field.type !== 'daily') return null

    // Sort the values by date to ensure they are in the correct order for processing
    const valuesArray = field.value
    const sorted = [...valuesArray].sort(
      (a, b) => DateTime.fromISO(a.date).toMillis() - DateTime.fromISO(b.date).toMillis()
    )

    // Determine the full date range to cover, considering both the values and the provided start/end dates
    let firstDate = sorted[0].date
    if (startDate && DateTime.fromISO(startDate) < DateTime.fromISO(firstDate)) {
      firstDate = startDate
    }
    let lastDate = sorted[sorted.length - 1].date
    if (endDate && DateTime.fromISO(endDate) > DateTime.fromISO(lastDate)) {
      lastDate = endDate
    }

    // Also consider the selected date if it exists, to ensure it's included in the range
    if (selectedDate && DateTime.fromISO(selectedDate) < DateTime.fromISO(firstDate)) {
      firstDate = selectedDate
    }
    if (selectedDate && DateTime.fromISO(selectedDate) > DateTime.fromISO(lastDate)) {
      lastDate = selectedDate
    }

    // Create a set of the dates that have values for O(1) lookup
    const valuesSet = new Set(valuesArray.map(v => v.date))
    const initialDate = DateTime.fromISO(firstDate)

    // Iterate through the full date range and create an array indicating whether each date has a value
    const arranged: ArrangedValue[] = []
    for (let dt = initialDate; dt <= DateTime.fromISO(lastDate); dt = dt.plus({ days: 1 })) {
      arranged.push({
        date: dt.toISODate()!,
        hasValue: valuesSet.has(dt.toISODate()!)
      })
    }

    return arranged
  }, [field, startDate, endDate, selectedDate])

  // Background gradient that visually represents the presence of values across the date range
  const backgroundGradient = useMemo(() => {
    if (!arrangedValues) return 'none'

    const { length } = arrangedValues
    if (length === 0) return 'none'

    const percentage = 100 / length
    let gradient = 'linear-gradient(to right'
    const [colorFilled, colorEmpty] = ['#ffffff66', '#ffffff32']

    for (let i = 0; i < length; i++) {
      const startPercent = (i * percentage).toFixed(2)
      const endPercent = ((i + 1) * percentage - 0.1).toFixed(2) // Subtract a small amount to prevent overlap

      const colorToUse = arrangedValues[i].hasValue ? colorFilled : colorEmpty
      gradient += `, ${colorToUse} ${startPercent}%, ${colorToUse} ${endPercent}%`
    }

    return `${gradient})`
  }, [arrangedValues])

  const getRangeValue = useCallback(() => {
    if (!selectedDate || !arrangedValues) return 0
    const index = arrangedValues.findIndex(v => v.date === selectedDate)
    if (index === -1) return 0

    return index / (arrangedValues.length - 1)
  }, [selectedDate, arrangedValues])

  const [rangeValue, setRangeValue] = useState(getRangeValue())

  const handleInputRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = Number(e.target.value)
    setRangeValue(numericValue)

    if (!arrangedValues) return

    const index = Math.round((numericValue / 100) * (arrangedValues.length - 1))
    const clampedIndex = Math.max(0, Math.min(index, arrangedValues.length - 1))
    const newSelectedDate = arrangedValues[clampedIndex].date
    setSelectedDate(newSelectedDate)
  }

  useEffect(() => {
    setRangeValue(getRangeValue())
  }, [selectedDate])

  const inputHandlerLeft = useMemo(() => {
    if (!arrangedValues || arrangedValues.length === 0 || !inputRef.current) return undefined

    const { width } = inputRef.current.getBoundingClientRect()
    const percentage = (rangeValue / 100) * width
    return `${percentage}px`
  }, [rangeValue])

  return (
    <div
      className='w-full h-1 mt-1 rounded-full text-white relative'
      style={{ background: backgroundGradient }}
    >
      <input
        ref={inputRef}
        type='range'
        value={rangeValue}
        onChange={handleInputRangeChange}
        className='absolute w-full h-4 top-1/2 -translate-y-1/2 opacity-0 cursor-pointer'
        draggable={false}
      />
      <div
        className='bg-white size-4 absolute top-1/2 -translate-1/2 rounded-full pointer-events-none'
        style={{ left: inputHandlerLeft }}
      />
    </div>
  )
}

interface ArrangedValue {
  date: string
  hasValue: boolean
}
