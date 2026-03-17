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
    const data = project.customFields?.filter(d => keysSet.has(d.key))
    const dataArray = data && !Array.isArray(data) ? [data] : data

    // If no data is found for the provided keys, return null to avoid rendering an empty component.
    if (!dataArray || dataArray.length === 0) {
      console.warn(`No custom data found for keys: ${fieldKeys.join(', ')} in project with id ${projectId}.`)
      return null
    }

    if (dataArray.length > 1 && dataArray.some(record => record.type === 'static')) {
      console.warn(
        'Static records must be the only record when multiple records are provided. Please provide either a single static record or use multiple charts.'
      )
      return null
    }

    return dataArray
  }, [fieldKeys, projectId])

  const isStatic = validatedFields && validatedFields[0].type === 'static'

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
