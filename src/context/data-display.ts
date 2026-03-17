import type { CustomField, DataDisplay } from '@types'
import { createContext, useContext } from 'react'

interface DataDisplayContextType extends Partial<DataDisplay> {
  fields: CustomField[] | null
  projectId: string
}

export const DataDisplayContext = createContext<DataDisplayContextType>({
  fields: null,
  projectId: ''
})

export const useDataDisplayContext = () => useContext(DataDisplayContext)
