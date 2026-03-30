import { useDataDisplayContext } from '@context'
import { capitalizeFirst } from '@utils'
import { useMemo } from 'react'
import { DataDisplayHeader } from '../data-display-header'
import { ErrorCard } from '../error-card'
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

  if (!fields || fields.length === 0) {
    return <ErrorCard />
  }

  return (
    <div className='text-white w-full '>
      <DataDisplayHeader
        selectOptions={selectOptions}
        onSelectChange={setOptionIndex}
        selectInitialValue={optionIndex}
        selectLabel='Select operation'
      />

      {selectedOperation === 'comparation' || staticValue === null ? (
        <PieChart operation={selectedOperation} />
      ) : (
        <div className='flex flex-col items-center justify-center gap-1.5 py-5'>
          <span className='text-6xl font-semibold'>{staticValue}</span>
        </div>
      )}
    </div>
  )
}

const operations = ['comparation', 'addition', 'average'] as const
export type StaticOperation = (typeof operations)[number]
const selectOptions = operations.map(o => capitalizeFirst(o))
