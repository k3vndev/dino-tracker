import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/chart'
import { useDataDisplayContext } from '@context'
import { useProjectsStore } from '@store'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { hueRotate } from '@/utils'
import { ErrorCard } from './error-card'

export const Chart = () => {
  const { projectId, fields } = useDataDisplayContext()
  const projects = useProjectsStore(s => s.projects)
  const project = useMemo(() => projects.find(p => p.id === projectId), [projectId, projects])

  const [chartData, chartKeys]: [ChartData, string[]] | [null, null] = useMemo(() => {
    if (!fields) return [null, null]

    // Parse all chart data into a map with date as the key and an object of field values as the value
    const mergedDataMap: Record<string, Record<string, number | string>> = {}
    const keys = new Set<string>()

    for (const field of fields) {
      if (field.type !== 'daily') break // This was already validated. All fields should be 'daily'

      const { key, value: fieldValues } = field
      keys.add(key)

      for (const { date, value } of fieldValues) {
        if (!mergedDataMap[date]) {
          mergedDataMap[date] = {
            [key]: value
          }
        } else {
          mergedDataMap[date] = {
            ...mergedDataMap[date],
            [key]: value
          }
        }
      }
    }

    const flattenedData = Object.entries(mergedDataMap)
      .map(([date, values]) => ({ date, ...values }))
      .sort((a, b) => DateTime.fromISO(a.date).toMillis() - DateTime.fromISO(b.date).toMillis())

    return [flattenedData, Array.from(keys)]
  }, [fields])

  if (!project || !fields || !chartData || !chartKeys) {
    return <ErrorCard />
  }

  const { color } = project

  return (
    <div className='w-full rounded-xl p-2 pl-0'>
      <ChartComponent color={color ?? '#5A9BF8'} data={chartData} keys={chartKeys} />
    </div>
  )
}

type ChartData = Record<string, number | string>[]

interface ChartProps {
  color?: string
  data: ChartData
  keys: string[]
}

const ChartComponent = ({ color = '#5A9BF8', data, keys }: ChartProps) => {
  const xAxisTickFormatter = (value: string) => {
    const date = DateTime.fromISO(value)
    return date.toFormat('MMM d')
  }

  const tooltipValueFormatter = (value: number | string) => {
    const numericValue = typeof value === 'number' ? value : Number(value)

    if (Number.isFinite(numericValue)) {
      return numericValue.toFixed(2)
    }
    return String(value)
  }

  const mainLabelFormatter = (label: string) => {
    const date = DateTime.fromISO(label)
    return date.toLocaleString(DateTime.DATE_MED)
  }

  const chartConfig = {} satisfies ChartConfig

  const keyColorsMap = useMemo(() => {
    const map: Record<string, string> = {}
    const keysLength = keys.length
    const hueAmount = 40

    keys.forEach((key, index) => {
      if (keysLength === 1) {
        map[key] = color
        return
      }

      const hueValue = (index - (keysLength - 1) / 2) * hueAmount
      map[key] = hueRotate(color, hueValue)
    })
    return map
  }, [keys, color])

  const xAxisDataKey = keys[0]

  return (
    <ChartContainer config={chartConfig} className='max-h-56 min-h-32 w-full'>
      <BarChart data={data}>
        <CartesianGrid vertical={false} className='opacity-15' />
        {keys.map(key => (
          <Bar
            key={key}
            dataKey={key}
            name={key}
            fill={keyColorsMap[key] ?? color}
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
              formatter={(value, label) => (
                <>
                  <div
                    className='size-3 rounded-sm'
                    style={{ backgroundColor: keyColorsMap[label] ?? color }}
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
