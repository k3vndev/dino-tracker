import { DEFAULT_CHART_TIME_SPAN } from '@consts'
import { useDataDisplayContext } from '@context'
import type { SelectOption } from '@types'
import { useMemo } from 'react'
import { DataDisplayHeader } from '../data-display-header'
import { ErrorCard } from '../error-card'
import { ChartComponent } from './chart-component'

export const Daily = () => {
  const { fields, fieldsMap, setTimeSpan } = useDataDisplayContext()

  const fieldKeys = useMemo(() => (fieldsMap ? Object.keys(fieldsMap) : null), [fieldsMap])

  if (!fields || !fieldsMap || !fieldKeys) {
    return <ErrorCard />
  }

  const selectOptions: SelectOption[] = [
    { label: 'Last 7', value: 7 },
    { label: 'Last 14', value: 14 },
    { label: 'Last 30', value: 30 },
    { label: 'All', value: -1 }
  ]

  return (
    <div className='w-full rounded-xl p-2 pl-0 pt-0 flex flex-col gap-6'>
      <DataDisplayHeader
        selectOptions={selectOptions}
        onSelectChange={setTimeSpan}
        selectInitialValue={DEFAULT_CHART_TIME_SPAN}
        selectLabel='Select time span'
      />

      <ChartComponent />
    </div>
  )
}
