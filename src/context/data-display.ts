import { DEFAULT_CHART_TIME_SPAN } from '@consts'
import type { CustomField, DataDisplay } from '@types'
import { createContext, useContext } from 'react'

export type DataDisplayFieldsMap = Record<string, Omit<CustomField, 'id'>>

interface DataDisplayContextType extends Partial<DataDisplay> {
  fields: CustomField[] | null
  fieldsMap: DataDisplayFieldsMap | null
  getFieldColor: (id: string) => string
  projectId: string
  timeSpan: number
  setTimeSpan: (daySpan: number) => void
}

export const DataDisplayContext = createContext<DataDisplayContextType>({
  fields: null,
  fieldsMap: null,
  getFieldColor: () => '',
  projectId: '',
  timeSpan: DEFAULT_CHART_TIME_SPAN,
  setTimeSpan: () => {}
})

export const useDataDisplayContext = () => useContext(DataDisplayContext)
