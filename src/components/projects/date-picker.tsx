import { Icon } from '@components'
import { Calendar } from '@shadcn/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import type { ClassName } from '@types'
import { formatProjectDate } from '@utils'
import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { EditableTooltip } from './editable-tooltip'

interface Props {
  startDate?: string
  endDate?: string
}

export const DatePicker = ({ startDate, endDate }: Props) => {
  const displayDate = useMemo(() => formatProjectDate(startDate, endDate), [startDate, endDate])
  const [isOpen, setIsOpen] = useState(false)

  const addDays = (date: Date, days: number) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20)
  })

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  const buttonNextPrevStyles: ClassName =
    'bg-white/15 border border-white/10 p-1 rounded-full button text-white'

  const dayStyles: ClassName =
    'relative w-full h-full p-0 text-center last:data-selected:rounded-r-md aspect-square first:data-selected:rounded-l-md  rounded-none bg-transparent text-white/70 data-today:text-white data-today:font-bold data-today:bg-white/5 data-outside:text-white/30 data-selected:bg-white/10 overflow-clip'

  return (
    <div className='relative group pr-2 cursor-pointer text-white/90'>
      <Popover onOpenChange={handleOpenChange}>
        <PopoverTrigger className='flex items-center gap-1'>
          <Icon name='calendar' className='size-5' />
          <span className='text-lg text-nowrap'>{displayDate}</span>

          {!isOpen && <EditableTooltip />}
        </PopoverTrigger>

        <PopoverContent
          className='w-auto p-0 bg-black/75 backdrop-blur-2xl border-white/10 shadow-element rounded-xl'
          align='center'
        >
          <Calendar
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            classNames={{
              month_caption: 'text-center text-white text-sm font-medium',
              button_next: buttonNextPrevStyles,
              button_previous: buttonNextPrevStyles,
              day: dayStyles,
              day_button:
                'cursor-pointer data-[range-middle=true]:bg-transparent data-[range-middle=true]:text-white data-[range-start=true]:bg-white/90 data-[range-end=true]:bg-white/90 data-[range-start=true]:text-black data-[range-end=true]:text-black hover:bg-white/15 data-[range-middle=true]:hover:bg-white/15 hover:text-white data-[range-middle=true]:rounded-md',
              weekdays: 'flex *:text-white/90'
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
