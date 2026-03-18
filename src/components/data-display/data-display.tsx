import { DEFAULT_CHART_TIME_SPAN, DEFAULT_COLOR } from '@consts'
import { DataDisplayContext } from '@context'
import { useProjectsStore } from '@store'
import type { CustomField, DataDisplay as DataDisplayType } from '@types'
import { hueRotate } from '@utils'
import { useCallback, useMemo, useState } from 'react'
import { Chart } from './chart/chart'
import { Static } from './static'

interface Props extends DataDisplayType {
  projectId: string
}

export const DataDisplay = ({ fieldIds, id, projectId, displayTotal, title }: Props) => {
  const projects = useProjectsStore(s => s.projects)
  const project = useMemo(() => projects.find(p => p.id === projectId), [projectId, projects])
  const [timeSpan, setTimeSpan] = useState(DEFAULT_CHART_TIME_SPAN)

  // Validate the provided fieldIds against the project's custom fields and ensure they are all of the same type.
  const validatedFields = useMemo((): CustomField[] | null => {
    if (!project) {
      console.warn(`Project with id ${projectId} not found.`)
      return null
    }

    const idsSet = new Set(fieldIds)
    const data = project.customFields?.filter(field => idsSet.has(field.id))
    const dataArray = data && !Array.isArray(data) ? [data] : data

    // If no data is found for the provided ids, return null to avoid rendering an empty component.
    if (!dataArray || dataArray.length === 0) {
      console.warn(`No custom data found for ids: ${fieldIds.join(', ')} in project with id ${projectId}.`)
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
  }, [fieldIds, project, projectId])

  // Create a map of field id to field data (excluding the id) for easy access when rendering the chart and legend.
  const fieldsMap = useMemo(() => {
    if (!validatedFields) return null

    const mappedFields: Record<string, Omit<CustomField, 'id'>> = {}

    for (const field of validatedFields) {
      const { id: fieldId, ...fieldWithoutId } = field
      mappedFields[fieldId] = fieldWithoutId
    }
    return mappedFields
  }, [validatedFields])

  // Extract the keys of the fields map for use in rendering the chart and legend, and for generating colors.
  const fieldKeys = useMemo(() => (fieldsMap ? Object.keys(fieldsMap) : null), [fieldsMap])

  // Generate a color for each field key, using the field's specified color if available
  const getFieldColor = useCallback(
    (key: string) => {
      if (!fieldsMap || !fieldKeys) return DEFAULT_COLOR

      const field = fieldsMap[key]
      if (!field) return DEFAULT_COLOR

      if (field.color) return field.color

      const defaultColor = project?.color || DEFAULT_COLOR
      if (fieldKeys.length === 1) return defaultColor

      const HUE_AMOUNT = 30
      const index = fieldKeys.indexOf(key)
      if (index < 0) return defaultColor

      const hueValue = (index - (fieldKeys.length - 1) / 2) * HUE_AMOUNT
      return hueRotate(defaultColor, hueValue)
    },
    [fieldKeys, fieldsMap, project?.color]
  )

  const isStatic = useMemo(() => validatedFields && validatedFields[0].type === 'static', [validatedFields])

  return (
    <DataDisplayContext.Provider
      value={{
        fieldIds,
        id,
        projectId,
        displayTotal,
        title,
        fields: validatedFields,
        fieldsMap,
        getFieldColor,
        timeSpan,
        setTimeSpan
      }}
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
