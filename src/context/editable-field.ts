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
  isBeingDeleted: boolean
}

export const EditableFieldContext = createContext<EditableFieldContextType>({
  selectedDate: null,
  setSelectedDate: () => {},
  customFields: [],
  fieldId: '',
  field: null,
  setField: () => {},
  isBeingDeleted: false
})

export const useEditableFieldContext = () => useContext(EditableFieldContext)
