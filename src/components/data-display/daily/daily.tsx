import { useDataDisplayContext } from '@context'
import { useMemo } from 'react'
import { DataDisplayHeader } from '../data-display-header'
import { ErrorCard } from '../error-card'
import { BarChart } from './bar-chart'

export const Daily = () => {
  const { fields, optionIndex, setOptionIndex } = useDataDisplayContext()

  // Ensures all fields are of type 'daily' as the Daily component is specifically designed for daily fields
  const fieldsAreValid = useMemo(() => !!fields?.every(f => f.type === 'daily'), [fields])

  if (!fieldsAreValid) {
    return <ErrorCard />
  }

  return (
    <div className='w-full rounded-xl p-2 pl-0 pt-0 flex flex-col gap-6'>
      <DataDisplayHeader
        selectOptions={displaySelectOptions}
        onSelectChange={setOptionIndex}
        selectInitialValue={optionIndex}
        selectLabel='Select time span'
      />

      <BarChart timeSpan={rawSelectOptions[optionIndex]} />
    </div>
  )
}

const rawSelectOptions = [7, 14, 30, -1]
const displaySelectOptions = rawSelectOptions.map(value => (value === -1 ? 'All time' : `${value} days`))
