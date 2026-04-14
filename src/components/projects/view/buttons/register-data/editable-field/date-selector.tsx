import { Icon } from '@components'
import { useEditableFieldContext } from '@context'
import { cn } from '@utils'
import { DateTime } from 'luxon'
import { useEffect, useMemo } from 'react'
import { ValuesRepresentation } from './values-representation'

export const DateSelector = () => {
  const { selectedDate, setSelectedDate, startDate, endDate, isBeingDeleted } = useEditableFieldContext()

  const dateDisplay = useMemo(() => {
    const current = DateTime.fromISO(selectedDate ?? '')
    if (!current.isValid) return null

    const monthYear = current.toFormat('LLL yyyy')
    const day = current.toFormat('dd')
    return { monthYear, day }
  }, [selectedDate])

  useEffect(() => {
    if (selectedDate) return

    const newSelectedDate = startDate ?? endDate ?? DateTime.now().toISODate()!
    setSelectedDate?.(newSelectedDate)
  }, [startDate, endDate, selectedDate])

  const changeDate = (days: number) => {
    if (!selectedDate || !setSelectedDate) return
    const next = DateTime.fromISO(selectedDate).plus({ days })
    if (!next.isValid) return

    setSelectedDate(next.toISODate()!)
  }

  const nextDay = () => changeDate(1)
  const prevDay = () => changeDate(-1)

  const disabledStyle = isBeingDeleted ? 'opacity-50 pointer-events-none' : ''

  return (
    <div className={`flex flex-col min-w-fit items-center gap-1 ${disabledStyle}`}>
      <div className='flex items-center justify-center gap-1'>
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

      <ValuesRepresentation />
    </div>
  )
}

const ChangeDateButton = ({ className = '', onClick = () => {} }) => (
  <button className={cn('button', className)} onClick={onClick}>
    <Icon name='chevron' />
  </button>
)
