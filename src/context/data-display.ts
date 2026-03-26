import { DEFAULT_CHART_TIME_SPAN } from '@consts'
import type { CustomField, DataDisplay } from '@types'
import { createContext, useContext } from 'react'

export type DataDisplayFieldsMap = Record<string, Omit<CustomField, 'id'>>
export type UpdateField = (field: CustomField, action: 'add' | 'delete') => void

interface DataDisplayContextType extends Partial<DataDisplay> {
  fields: CustomField[] | null
  fieldsMap: DataDisplayFieldsMap | null
  getFieldColor: (id: string) => string
  projectId: string
  timeSpan: number
  setTimeSpan: (daySpan: number) => void
  updateField: UpdateField
}

export const DataDisplayContext = createContext<DataDisplayContextType>({
  fields: null,
  fieldsMap: null,
  getFieldColor: () => '',
  projectId: '',
  timeSpan: DEFAULT_CHART_TIME_SPAN,
  setTimeSpan: () => {},
  updateField: () => {}
})

export const useDataDisplayContext = () => useContext(DataDisplayContext)
