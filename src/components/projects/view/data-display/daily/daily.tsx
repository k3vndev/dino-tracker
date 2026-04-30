import { useDataDisplayContext } from '@context'
import { useMemo } from 'react'
import { EmptyChart } from '../empty-chart'
import { Header as DataDisplayHeader } from '../header'
import { BarChart } from './bar-chart'

export const Daily = () => {
  const { optionIndex, setOptionIndex, fields } = useDataDisplayContext()

  const hasFields = useMemo(() => !!fields?.length, [fields])
  const fieldsHaveData = useMemo(
    () => hasFields && fields?.some(field => field.type === 'daily' && field.value.length > 0),
    [fields, hasFields]
  )

  return (
    <div className='w-full rounded-xl p-2 pl-0 pt-0 flex flex-col gap-6'>
      <DataDisplayHeader
        selectOptions={displaySelectOptions}
        onSelectChange={setOptionIndex}
        selectInitialValue={optionIndex}
        selectLabel='Select time span'
      />

      {hasFields && fieldsHaveData ? (
        <BarChart timeSpan={rawSelectOptions[optionIndex]} />
      ) : (
        <EmptyChart
          icon='chart'
          label={!fieldsHaveData ? 'No data available. Fields need data to be displayed!' : undefined}
        />
      )}
    </div>
  )
}

const rawSelectOptions = [7, 14, 30, -1]
const displaySelectOptions = rawSelectOptions.map(value => (value === -1 ? 'All time' : `${value} days`))
