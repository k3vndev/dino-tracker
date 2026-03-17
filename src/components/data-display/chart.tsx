import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/chart'
import { useDataDisplayContext } from '@context'
import { useProjectsStore } from '@store'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ErrorCard } from './error-card'

export const Chart = () => {
  const { projectId, fields } = useDataDisplayContext()
  const projects = useProjectsStore(s => s.projects)
  const project = useMemo(() => projects.find(p => p.id === projectId), [projectId, projects])

  const data = useMemo(() => {
    if (!fields) return null

    const [{ value: firstFieldValues }] = fields

    const dataArray = (firstFieldValues as Array<{ date: string; value: number }>)
      .map(record => ({
        date: record.date,
        value: record.value
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return dataArray
  }, [fields])

  if (!project || !fields || !data) {
    return <ErrorCard />
  }

  const { color } = project

  return (
    <div className='w-full rounded-xl p-2 pl-0'>
      <ChartComponent color={color ?? '#5A9BF8'} data={data} />
    </div>
  )
}

interface ChartProps {
  color?: string
  data: Array<{
    date: string
    value: number
  }>
}

const ChartComponent = ({ color = '#5A9BF8', data }: ChartProps) => {
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

  const labelFormatter = (label: string) => {
    const date = DateTime.fromISO(label)
    return date.toLocaleString(DateTime.DATE_MED)
  }

  const chartConfig = {} satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className='max-h-56 min-h-32 w-full'>
      <BarChart data={data}>
        <CartesianGrid vertical={false} className='opacity-15' />
        <Bar
          dataKey='value'
          name='Value'
          fill={color}
          minPointSize={value => ((value ?? 0) > 0 ? 4 : 0)}
          radius={[4, 4, 0, 0]}
        />
        <ChartTooltip
          cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.05 }}
          content={
            <ChartTooltipContent
              className='bg-black/75 text-white border-card-border backdrop-blur-md'
              labelFormatter={label => <span>{labelFormatter(label)}</span>}
              formatter={(value, name) => (
                <>
                  <div className='size-3 rounded-sm' style={{ backgroundColor: color }} />
                  <span className='text-gray-200'>{name}</span>
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
        <YAxis tickLine={false} axisLine={false} tickMargin={16} dataKey='value' />
      </BarChart>
    </ChartContainer>
  )
}
