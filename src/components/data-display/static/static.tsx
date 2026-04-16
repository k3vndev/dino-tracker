import { useDataDisplayContext } from '@context'
import { capitalizeFirst } from '@utils'
import { useMemo } from 'react'
import { EmptyChart } from '../empty-chart'
import { Header as DataDisplayHeader } from '../header'
import { PieChart } from './pie-chart'

export const Static = () => {
  const { fields, optionIndex, setOptionIndex } = useDataDisplayContext()

  const selectedOperation = useMemo(() => operations[optionIndex], [optionIndex])

  const staticValue: number | null = useMemo(() => {
    // Skip comparation or uncalculable operations
    if (selectedOperation === 'comparation' || !fields || fields.length === 0) {
      return null
    }

    // Calculate the sum of all field values
    let sum = 0
    for (const field of fields) {
      if (field.type === 'static') {
        sum += field.value

        // Sum the values of every day for daily fields
      } else if (field.type === 'daily') {
        sum += field.value.reduce((acc, record) => acc + record.value, 0)
      }
    }

    // Return the sum for 'addition' or the average for 'average'
    if (selectedOperation === 'average') {
      return sum / fields.length
    }
    return sum
  }, [fields, optionIndex])

  const displayWordMap: Record<StaticOperation, null | string> = {
    comparation: null,
    addition: 'Total',
    average: 'Average'
  }

  return (
    <div className='text-white w-full '>
      <DataDisplayHeader
        selectOptions={selectOptions}
        onSelectChange={setOptionIndex}
        selectInitialValue={optionIndex}
        selectLabel='Select operation'
      />

      {fields?.length ? (
        selectedOperation === 'comparation' || staticValue === null ? (
          <PieChart operation={selectedOperation} />
        ) : (
          <div className='flex flex-col items-center justify-center gap-0.5 py-5'>
            <h4 className='text-6xl font-semibold'>{staticValue}</h4>
            <span className='text-2xl text-white/65'>{displayWordMap[selectedOperation]} value</span>
          </div>
        )
      ) : (
        <EmptyChart icon='hash' />
      )}
    </div>
  )
}

const operations = ['comparation', 'addition', 'average'] as const
export type StaticOperation = (typeof operations)[number]
const selectOptions = operations.map(o => capitalizeFirst(o))
