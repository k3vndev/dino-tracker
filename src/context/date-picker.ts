import type { Dispatch, SetStateAction } from 'react'
import { createContext, useContext } from 'react'
import type { DateRange } from 'react-day-picker'

export interface DatePickerDates {
  from?: string
  to?: string
}

interface DatePickerContextType {
  startDate?: string
  endDate?: string
  displayDate: string
  rawDate: DateRange | undefined
  setRawDate: Dispatch<SetStateAction<DateRange | undefined>>
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  setDates: (dates: DatePickerDates) => void
}

export const DatePickerContext = createContext<DatePickerContextType>({
  displayDate: 'No date provided',
  rawDate: undefined,
  setRawDate: () => {},
  isOpen: false,
  setIsOpen: () => {},
  setDates: () => {}
})

export const useDatePickerContext = () => useContext(DatePickerContext)
