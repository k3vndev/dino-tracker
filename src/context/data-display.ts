import type { CustomField, DataDisplay } from '@types'
import { createContext, useContext } from 'react'

export type DataDisplayFieldsMap = Record<string, Omit<CustomField, 'id'>>
export type UpdateField = (field: CustomField, action: 'add' | 'delete') => void

interface DataDisplayContextType extends Partial<DataDisplay> {
  fields: CustomField[] | null
  fieldsMap: DataDisplayFieldsMap | null
  getFieldColor: (id: string) => string
  projectId: string
  optionIndex: number
  setOptionIndex: (index: number) => void
  updateField: UpdateField
  projectIndex: number
  dataDisplayIndex: number
}

export const DataDisplayContext = createContext<DataDisplayContextType>({
  fields: null,
  fieldsMap: null,
  getFieldColor: () => '',
  projectId: '',
  optionIndex: 0,
  setOptionIndex: () => {},
  updateField: () => {},
  projectIndex: -1,
  dataDisplayIndex: -1
})

export const useDataDisplayContext = () => useContext(DataDisplayContext)
