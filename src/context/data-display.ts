import type { CustomField, DataDisplay } from '@types'
import { createContext, useContext } from 'react'

export type DataDisplayFieldsMap = Record<string, Omit<CustomField, 'id'>>

interface DataDisplayContextType extends Partial<DataDisplay> {
  fields: CustomField[] | null
  fieldsMap: DataDisplayFieldsMap | null
  getFieldColor: (keyOrId: string) => string
  projectId: string
}

export const DataDisplayContext = createContext<DataDisplayContextType>({
  fields: null,
  fieldsMap: null,
  getFieldColor: () => '',
  projectId: ''
})

export const useDataDisplayContext = () => useContext(DataDisplayContext)
