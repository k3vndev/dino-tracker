import { DataDisplayContext } from '@context'
import { useProjectsStore } from '@store'
import type { CustomField, DataDisplay as DataDisplayType } from '@types'
import { useMemo } from 'react'
import { Chart } from './chart'
import { Static } from './static'

interface Props extends DataDisplayType {
  projectId: string
}

export const DataDisplay = ({ fieldKeys, id, projectId, displayTotal, title }: Props) => {
  const projects = useProjectsStore(s => s.projects)

  const validatedFields = useMemo((): CustomField[] | null => {
    const project = projects.find(p => p.id === projectId)
    if (!project) {
      console.warn(`Project with id ${projectId} not found.`)
      return null
    }

    const keysSet = new Set(fieldKeys)
    const data = project.customFields?.filter(field => keysSet.has(field.key))
    const dataArray = data && !Array.isArray(data) ? [data] : data

    // If no data is found for the provided keys, return null to avoid rendering an empty component.
    if (!dataArray || dataArray.length === 0) {
      console.warn(`No custom data found for keys: ${fieldKeys.join(', ')} in project with id ${projectId}.`)
      return null
    }

    let dataType: string | null = null
    for (const field of dataArray) {
      if (dataType && field.type !== dataType) {
        console.warn(
          `Can't mix different types of data in the same chart. Found types: ${dataType} and ${field.type}. Consider splitting them into separate charts.`
        )
        return null
      }
      dataType = field.type
    }

    return dataArray
  }, [fieldKeys, projectId])

  const isStatic = useMemo(() => validatedFields && validatedFields[0].type === 'static', [validatedFields])

  return (
    <DataDisplayContext.Provider
      value={{ fieldKeys, id, projectId, displayTotal, title, fields: validatedFields }}
    >
      <article className='w-full bg-linear-to-t from-black/90 to-black border border-white/15 rounded-xl px-5 py-4'>
        {!validatedFields ? (
          <span>No data available due to invalid configuration.</span>
        ) : isStatic ? (
          <Static />
        ) : (
          <Chart />
        )}
      </article>
    </DataDisplayContext.Provider>
  )
}
