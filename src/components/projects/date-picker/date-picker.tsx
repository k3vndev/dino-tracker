import { Icon } from '@components'
import type { DatePickerDates } from '@context'
import { DatePickerContext } from '@context'
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import { formatProjectDate } from '@utils'
import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { EditableTooltip } from '../editable-tooltip'
import { CustomCalendar } from './custom-calendar'
import { EditableDateDisplay } from './editable-date-display'

interface Props {
  startDate?: string
  endDate?: string
  setDates: (dates: DatePickerDates) => void
}

export const DatePicker = ({ startDate, endDate, setDates }: Props) => {
  const displayDate = useMemo(() => formatProjectDate(startDate, endDate), [startDate, endDate])
  const [isOpen, setIsOpen] = useState(false)

  const addDays = (date: Date, days: number) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  const [rawDate, setRawDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20)
  })

  const handleOpenChange = (open: boolean) => setIsOpen(open)
  const handleOpenPopover = () => setIsOpen(true)

  const contextValue = useMemo(
    () => ({
      startDate,
      endDate,
      displayDate,
      rawDate,
      setRawDate,
      isOpen,
      setIsOpen,
      setDates
    }),
    [startDate, endDate, displayDate, rawDate, isOpen, setDates]
  )

  return (
    <DatePickerContext.Provider value={contextValue}>
      <div className='relative group pr-2 cursor-pointer text-white/90'>
        <Popover onOpenChange={handleOpenChange} open={isOpen}>
          {/* Invisible trigger for the popover to open over the entire date display area */}
          <PopoverTrigger className='absolute left-1/2 top-0 size-0'></PopoverTrigger>

          {/* Date display area */}
          <div
            className='flex relative items-center gap-1 pr-2 cursor-pointer text-white/90'
            onClick={handleOpenPopover}
          >
            <Icon name='calendar' className='size-5' />
            <span className='text-lg text-nowrap'>{displayDate}</span>
            {!isOpen && <EditableTooltip />}
          </div>

          <PopoverContent
            className='w-auto p-0 bg-black/75 backdrop-blur-2xl border-white/10 shadow-element rounded-xl top-8'
            align='center'
          >
            <EditableDateDisplay />
            <CustomCalendar />
          </PopoverContent>
        </Popover>
      </div>
    </DatePickerContext.Provider>
  )
}
