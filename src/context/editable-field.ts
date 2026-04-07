import type { CustomField } from '@types'
import { createContext, useContext } from 'react'

interface EditableFieldContextType {
  selectedDate: string | null
  setSelectedDate: (date: string) => void
  startDate?: string
  endDate?: string
  customFields: CustomField[]
  fieldId: string
  field: CustomField | null
  setField: (field: CustomField) => void
}

export const EditableFieldContext = createContext<EditableFieldContextType>({
  selectedDate: null,
  setSelectedDate: () => {},
  customFields: [],
  fieldId: '',
  field: null,
  setField: () => {}
})

export const useEditableFieldContext = () => useContext(EditableFieldContext)
