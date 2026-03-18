import { useDataDisplayContext } from '@context'
import { useProjectsStore } from '@store'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { ChartComponent, type ChartData, type FieldsMap } from './chart-component'
import { ErrorCard } from './error-card'

export const Chart = () => {
  const { projectId, fields } = useDataDisplayContext()
  const projects = useProjectsStore(s => s.projects)
  const project = useMemo(() => projects.find(p => p.id === projectId), [projectId, projects])

  const [chartData, fieldsMap]: [ChartData[], FieldsMap] | [null, null] = useMemo(() => {
    if (!fields) return [null, null]

    // Parse all chart data into a map with date as the key and an object of field values as the value
    const mergedDataMap: Record<string, Record<string, number | string>> = {}
    const mappedFields: FieldsMap = {}

    for (const field of fields) {
      if (field.type !== 'daily') break // This was already validated. All fields should be 'daily'

      const { id, ...noIdValues } = field
      mappedFields[id] = { ...noIdValues }

      for (const { date, value } of field.value) {
        if (!mergedDataMap[date]) {
          mergedDataMap[date] = {
            [id]: value
          }
        } else {
          mergedDataMap[date] = {
            ...mergedDataMap[date],
            [id]: value
          }
        }
      }
    }

    // Convert the merged data map into an array format suitable for the chart, sorted by date
    const flattenedChartData = Object.entries(mergedDataMap)
      .map(([date, values]) => ({ date, ...values }))
      .sort((a, b) => DateTime.fromISO(a.date).toMillis() - DateTime.fromISO(b.date).toMillis())

    return [flattenedChartData, mappedFields]
  }, [fields])

  if (!project || !fields || !chartData || !fieldsMap) {
    return <ErrorCard />
  }

  const { color } = project

  return (
    <div className='w-full rounded-xl p-2 pl-0'>
      <ChartComponent defaultColor={color} {...{ chartData, fieldsMap }} />
    </div>
  )
}
