import { useDataDisplayContext } from '@context'
import { DataDisplayHeader } from '../data-display-header'
import { EmptyChart } from '../empty-chart'
import { BarChart } from './bar-chart'

export const Daily = () => {
  const { optionIndex, setOptionIndex, fields } = useDataDisplayContext()

  return (
    <div className='w-full rounded-xl p-2 pl-0 pt-0 flex flex-col gap-6'>
      <DataDisplayHeader
        selectOptions={displaySelectOptions}
        onSelectChange={setOptionIndex}
        selectInitialValue={optionIndex}
        selectLabel='Select time span'
      />

      {fields?.length ? <BarChart timeSpan={rawSelectOptions[optionIndex]} /> : <EmptyChart icon='chart' />}
    </div>
  )
}

const rawSelectOptions = [7, 14, 30, -1]
const displaySelectOptions = rawSelectOptions.map(value => (value === -1 ? 'All time' : `${value} days`))
