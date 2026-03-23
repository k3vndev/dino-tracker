import { useDataDisplayContext } from '@context'
import type { SelectOption } from '@types'
import { DataDisplayHeader } from './data-display-header'
import { ErrorCard } from './error-card'

export const Static = () => {
  const { fields, title, getFieldColor, fieldsMap } = useDataDisplayContext()
  if (!fields || fields.length === 0) {
    return <ErrorCard />
  }

  const [staticField] = fields // This has been validated already
  const color = getFieldColor(staticField.id)
  const staticName = fieldsMap ? fieldsMap[staticField.id].name : title

  const selectOptions: SelectOption[] = [
    { label: 'Addition', value: 0 },
    { label: 'Comparation', value: 1 },
    { label: 'Average', value: 2 }
  ]

  return (
    <div className='text-white w-full '>
      <DataDisplayHeader selectOptions={selectOptions} onSelectChange={() => {}} selectInitialValue={0} />

      <div className='flex flex-col items-center justify-center gap-1.5 py-5'>
        <span className='text-6xl font-semibold'>{staticField.value as number}</span>

        <div className='flex items-center gap-2'>
          <div className='size-4 rounded-full' style={{ backgroundColor: color }} />
          <h3 className='text-xl font-poppins'>{staticName}</h3>
        </div>
      </div>
    </div>
  )
}
