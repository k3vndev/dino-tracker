import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/chart'
import type { CustomField } from '@types'
import { hueRotate } from '@utils'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

interface Props {
  defaultColor?: string
  chartData: ChartData[]
  fieldsMap: FieldsMap
}

export type FieldsMap = Record<string, Omit<CustomField, 'id'>>
export type ChartData = Record<string, number | string>

export const ChartComponent = ({ defaultColor = '#5A9BF8', chartData, fieldsMap }: Props) => {
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

  const keys = useMemo(() => Object.keys(fieldsMap), [fieldsMap])
  const xAxisDataKey = keys[0] ?? undefined

  const getKeyColor = (key: string, index: number) => {
    const { color } = fieldsMap[key]
    if (color) return color

    if (keys.length === 1) return defaultColor

    const hueAmount = 30
    const hueValue = (index - (keys.length - 1) / 2) * hueAmount
    return hueRotate(defaultColor, hueValue)
  }

  return (
    <ChartContainer config={CHART_CONFIG} className='max-h-56 min-h-32 w-full'>
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} className='opacity-15' />
        {keys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            name={fieldsMap[key].name}
            fill={getKeyColor(key, index)}
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
                      backgroundColor: getKeyColor(dataKey as string, keys.indexOf(dataKey as string))
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
