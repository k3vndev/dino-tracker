import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui'
import { useDataDisplayContext } from '@context'
import { useMemo } from 'react'
import { Pie, PieChart as PieChartComponent } from 'recharts'
import type { StaticOperation } from './static'

interface Props {
  operation: StaticOperation
}

export const PieChart = ({ operation }: Props) => {
  const { fields, getFieldColor, fieldsMap } = useDataDisplayContext()

  const chartData = useMemo(() => {
    if (!fields) return []

    // For comparation, we want to show the sum of each field as a slice of the pie
    return fields.map(field => {
      // If the field is static, we can directly use its value, otherwise, we need to sum up all the records' values
      const value =
        field.type === 'static' ? field.value : field.value.reduce((acc, record) => acc + record.value, 0)
      const fill = getFieldColor(field.id)

      // Ensure that the value is a number, if not, set it to 0
      let numericValue = Number.parseFloat(String(value))
      if (Number.isNaN(numericValue)) {
        numericValue = 0
      }

      return {
        name: field.id,
        value: numericValue,
        fill
      }
    })
  }, [fields, operation])

  return (
    <ChartContainer
      config={{}}
      className='mx-auto aspect-square max-h-62.5 pb-0 [&_.recharts-pie-label-text]:fill-white'
    >
      <PieChartComponent>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              className='popover-menu'
              formatter={(value, id, { payload }) => (
                <div className='flex items-center justify-between w-full gap-4'>
                  <div className='flex items-center gap-1.5'>
                    <div
                      className='min-w-3 size-3 aspect-square rounded-full'
                      style={{ backgroundColor: payload.fill }}
                    />
                    <span className='text-white/75'>{fieldsMap?.[id].name}</span>
                  </div>

                  <span className='font-mono'>{value}</span>
                </div>
              )}
            />
          }
        />
        <Pie data={chartData} dataKey='value' label nameKey='name' />
      </PieChartComponent>
    </ChartContainer>
  )
}
