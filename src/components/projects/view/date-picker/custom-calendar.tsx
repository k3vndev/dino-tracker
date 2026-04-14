import { useDatePickerContext } from '@context'
import { Calendar } from '@shadcn/calendar'
import type { ClassName } from '@types'
import { useEffect } from 'react'
import type { DateRange } from 'react-day-picker'

export const CustomCalendar = () => {
  const { rawDate, setRawDate, setDates, startDate, endDate } = useDatePickerContext()

  // Initialize rawDate with the current date range when the component mounts
  useEffect(() => {
    const parseDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

    const to = endDate ? parseDate(new Date(endDate)) : undefined
    const from = startDate ? parseDate(new Date(startDate)) : to ? undefined : parseDate(new Date())

    if (from && to) {
      setRawDate({ from, to })
    } else if (from) {
      setRawDate({ from, to: from })
    } else if (to) {
      setRawDate({ from: to, to })
    }
  }, [])

  const handleSelectRawDate = (selectedDate: DateRange | undefined) => {
    setRawDate(selectedDate)

    const { from, to } = selectedDate || {}
    if (!from || !to) return

    // Check if selected range is in the same day, if so, only set the start date.
    if (from.toDateString() === to.toDateString()) {
      setDates({ from: from.toISOString() })
      return
    }

    setDates({
      from: from.toISOString(),
      to: to.toISOString()
    })
  }

  const buttonNextPrevStyles: ClassName =
    'bg-white/15 border border-white/10 p-1 rounded-full button text-white'

  return (
    <Calendar
      mode='range'
      defaultMonth={rawDate?.from}
      selected={rawDate}
      onSelect={handleSelectRawDate}
      numberOfMonths={2}
      classNames={{
        month_caption: 'text-center text-white text-sm font-medium',
        button_next: buttonNextPrevStyles,
        button_previous: buttonNextPrevStyles,
        day: 'relative w-full h-full p-0 text-center last:data-selected:rounded-r-md aspect-square first:data-selected:rounded-l-md rounded-none bg-transparent text-white/70 data-today:text-white data-today:font-bold data-today:bg-white/5 data-today:rounded-md data-outside:text-white/30 data-selected:bg-white/10 overflow-clip',
        day_button:
          'cursor-pointer data-[range-middle=true]:bg-transparent data-[range-middle=true]:text-white data-[range-start=true]:bg-white/90 data-[range-end=true]:bg-white/90 data-[range-start=true]:text-black data-[range-end=true]:text-black hover:bg-white/15 data-[range-middle=true]:hover:bg-white/15 hover:text-white data-[range-middle=true]:rounded-md',
        weekdays: 'flex *:text-white/90'
      }}
    />
  )
}
