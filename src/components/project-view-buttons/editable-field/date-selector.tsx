import { Icon } from '@components'
import { cn } from '@utils'
import { DateTime } from 'luxon'
import { useEffect, useMemo } from 'react'

interface Props {
  dateRange?: {
    start?: string
    end?: string
  }
  selectedDate: string | null
  setSelectedDate?: (date: string) => void
}

export const DateSelector = ({ dateRange, selectedDate, setSelectedDate }: Props) => {
  const { start, end } = dateRange ?? {}

  const dateDisplay = useMemo(() => {
    const current = DateTime.fromISO(selectedDate ?? '')
    if (!current.isValid) return null

    const monthYear = current.toFormat('LLL yyyy')
    const day = current.toFormat('dd')
    return { monthYear, day }
  }, [selectedDate])

  useEffect(() => {
    if (selectedDate) return

    const newSelectedDate = dateRange?.start ?? dateRange?.end ?? DateTime.now().toISODate()!
    setSelectedDate?.(newSelectedDate)
  }, [dateRange, selectedDate])

  const changeDate = (days: number) => {
    if (!selectedDate || !setSelectedDate) return
    const next = DateTime.fromISO(selectedDate).plus({ days })
    if (!next.isValid) return

    setSelectedDate(next.toISODate()!)
  }

  const nextDay = () => changeDate(1)
  const prevDay = () => changeDate(-1)

  return (
    <div className='flex items-center justify-center gap-1 min-w-fit'>
      <ChangeDateButton className='rotate-180' onClick={prevDay} />
      {dateDisplay ? (
        <div className='text-white flex flex-col items-center text-nowrap gap-1.5'>
          <span className='font-plus text-sm opacity-50'>{dateDisplay.monthYear}</span>
          <span className='font-poppins font-bold text-4xl'>{dateDisplay.day}</span>
        </div>
      ) : (
        <span className='text-sm text-center text-yellow-300'>Invalid date</span>
      )}
      <ChangeDateButton onClick={nextDay} />
    </div>
  )
}

const ChangeDateButton = ({ className = '', onClick = () => {} }) => (
  <button className={cn('button', className)} onClick={onClick}>
    <Icon name='chevron' />
  </button>
)
