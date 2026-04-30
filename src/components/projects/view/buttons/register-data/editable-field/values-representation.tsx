import { useEditableFieldContext } from '@context'
import { DateTime } from 'luxon'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const ValuesRepresentation = () => {
  const {
    field,
    startDate: projectStartDate,
    endDate: projectEndDate,
    selectedDate,
    setSelectedDate
  } = useEditableFieldContext()

  const inputRef = useRef<HTMLInputElement>(null)
  const [pointerIsDown, setPointerIsDown] = useState(false)

  const arrangedValues: ArrangedValue[] | null = useMemo(() => {
    if (!field || field.type !== 'daily') return null

    // Sort the values by date to ensure they are in the correct order for processing
    const valuesArray = field.value
    const sorted = [...valuesArray].sort(
      (a, b) => DateTime.fromISO(a.date).toMillis() - DateTime.fromISO(b.date).toMillis()
    )

    if (sorted.length === 0) return null

    // Determine the full date range to cover, considering both the values and the provided start/end dates
    const sortDates = (...dates: (string | undefined)[]) =>
      dates.filter(d => !!d).sort((a, b) => DateTime.fromISO(a!).toMillis() - DateTime.fromISO(b!).toMillis())

    const arrayFirstDate = sorted[0]?.date
    const arrayLastDate = sorted[sorted.length - 1]?.date

    const sortedStartDates = sortDates(arrayFirstDate, projectStartDate, selectedDate!)
    const sortedEndDates = sortDates(arrayLastDate, projectEndDate, selectedDate!)

    // Create a set of the dates that have values for O(1) lookup
    const valuesSet = new Set(valuesArray.map(v => v.date))
    const initialDate = DateTime.fromISO(sortedStartDates[0]!)
    const lastDate = DateTime.fromISO(sortedEndDates[sortedEndDates.length - 1]!)

    // Iterate through the full date range and create an array indicating whether each date has a value
    const arranged: ArrangedValue[] = []
    for (let dt = initialDate; dt <= lastDate; dt = dt.plus({ days: 1 })) {
      arranged.push({
        date: dt.toISODate()!,
        hasValue: valuesSet.has(dt.toISODate()!)
      })
    }

    return arranged
  }, [field, projectStartDate, projectEndDate, selectedDate])

  // Background gradient that visually represents the presence of values across the date range
  const backgroundGradient = useMemo(() => {
    if (!arrangedValues) return 'none'

    const { length } = arrangedValues
    if (length === 0) return 'none'

    const percentage = 100 / length
    let gradient = 'linear-gradient(to right'
    const [colorFilled, colorEmpty] = ['#ffffffaa', '#ffffff24']

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

    return (index / (arrangedValues.length - 1)) * 100
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
    if (pointerIsDown) return

    const newRangeValue = getRangeValue()
    setRangeValue(newRangeValue)
  }, [selectedDate, pointerIsDown])

  const inputHandlerLeft = useMemo(() => {
    if (!arrangedValues || arrangedValues.length === 0 || !inputRef.current) return undefined

    const { width } = inputRef.current.getBoundingClientRect()
    const percentage = (rangeValue / 100) * width
    return `${percentage}px`
  }, [rangeValue])

  // Handlers to track pointer state for smoother interaction and to prevent unwanted transitions while dragging
  const handleInputPointerDown = () => setPointerIsDown(true)
  const handleInputPointerUp = () => setPointerIsDown(false)

  // If there are no values or not enough values to create a meaningful representation, render a placeholder div
  if (!arrangedValues?.length || arrangedValues.length < 2 || Number.isNaN(rangeValue)) {
    return <div className='w-full h-1' />
  }

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
        onPointerDown={handleInputPointerDown}
        onPointerUp={handleInputPointerUp}
      />
      <div
        className='bg-white size-4 absolute top-1/2 -translate-1/2 rounded-full pointer-events-none'
        style={{
          left: inputHandlerLeft,
          transition: pointerIsDown ? 'none' : 'left 0.2s ease'
        }}
      />
    </div>
  )
}

interface ArrangedValue {
  date: string
  hasValue: boolean
}
