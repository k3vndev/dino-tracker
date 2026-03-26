import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/chart'
import { useDataDisplayContext } from '@context'
import type { CustomField } from '@types'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ErrorCard } from '../error-card'

export type FieldsMap = Record<string, Omit<CustomField, 'id'>>
export type ChartData = Record<string, number | string>

interface Props {
  timeSpan: number
}

export const ChartComponent = ({ timeSpan }: Props) => {
  const { fields, fieldsMap, getFieldColor } = useDataDisplayContext()

  const chartData: ChartData[] | null = useMemo(() => {
    if (!fields) return null

    // Parse all chart data into a map with date as the key and an object of field values as the value.
    const mergedDataMap: Record<string, Record<string, number | string>> = {}

    for (const field of fields) {
      if (field.type !== 'daily') break // This was already validated. All fields should be 'daily'

      for (const { date, value } of field.value) {
        if (!mergedDataMap[date]) {
          mergedDataMap[date] = {
            [field.id]: value
          }
          continue
        }

        mergedDataMap[date] = {
          ...mergedDataMap[date],
          [field.id]: value
        }
      }
    }

    // Convert the map into an array format suitable for the chart, sorted by date and sliced to the selected time span.
    return Object.entries(mergedDataMap)
      .map(([date, values]) => ({ date, ...values }))
      .sort((a, b) => DateTime.fromISO(a.date).toMillis() - DateTime.fromISO(b.date).toMillis())
      .slice(timeSpan < 0 ? undefined : -timeSpan)
  }, [fields, timeSpan])

  const fieldKeys = useMemo(() => (fieldsMap ? Object.keys(fieldsMap) : null), [fieldsMap])

  if (!fields || !fieldsMap || !chartData || !fieldKeys) {
    return <ErrorCard />
  }

  const xAxisTickFormatter = (value: string) => {
    const date = DateTime.fromISO(value)
    return date.toFormat('MMM d')
  }

  const tooltipValueFormatter = (value: number | string) => {
    const numericValue = typeof value === 'number' ? value : Number(value)
    return numericValue.toFixed(2)
  }

  const mainLabelFormatter = (label: string) => {
    const date = DateTime.fromISO(label)
    return date.toLocaleString(DateTime.DATE_MED)
  }

  const CHART_CONFIG = {} satisfies ChartConfig

  const xAxisDataKey = fieldKeys[0] ?? undefined

  return (
    <ChartContainer config={CHART_CONFIG} className='max-h-56 min-h-32 w-full'>
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} className='opacity-15' />
        {fieldKeys.map(key => (
          <Bar
            key={key}
            dataKey={key}
            name={fieldsMap[key].name}
            fill={getFieldColor(key)}
            minPointSize={value => ((value ?? 0) > 0 ? 4 : 0)}
            radius={[4, 4, 0, 0]}
          />
        ))}
        <ChartTooltip
          cursor={{ fill: 'white', fillOpacity: 0.05 }}
          content={
            <ChartTooltipContent
              className='bg-black/75 border border-white/20 backdrop-blur-md'
              labelFormatter={mainLabel => (
                <span className='text-white'>{mainLabelFormatter(mainLabel)}</span>
              )}
              formatter={(value, label, { dataKey }) => (
                <>
                  <div
                    className='size-3 rounded-sm'
                    style={{
                      backgroundColor: getFieldColor(dataKey as string)
                    }}
                  />
                  <span className='text-gray-200'>{label}</span>
                  <span className='font-mono font-medium tabular-nums text-gray-100'>
                    {tooltipValueFormatter(value as number | string)}
                  </span>
                </>
              )}
            />
          }
        />
        <XAxis
          dataKey='date'
          tickLine={false}
          axisLine={false}
          tickMargin={12}
          minTickGap={32}
          tickFormatter={xAxisTickFormatter}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={16} dataKey={xAxisDataKey} />
      </BarChart>
    </ChartContainer>
  )
}
