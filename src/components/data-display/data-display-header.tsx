import { useDataDisplayContext } from '@context'
import type { SelectOption } from '@types'
import { Fields } from './fields'
import { Select } from './select'

interface Props {
  selectOptions: SelectOption[]
  onSelectChange: (value: number) => void
  selectInitialValue: number
}

export const DataDisplayHeader = ({ selectOptions, onSelectChange, selectInitialValue }: Props) => {
  const { title } = useDataDisplayContext()

  return (
    <header className='flex items-start justify-between'>
      <div className='flex flex-col gap-y-1.5'>
        {/* Note: replace with editable text component in the future */}
        <h3 className='font-poppins text-white font-semibold'>{title}</h3>
        <Fields />
      </div>

      <Select initialValue={selectInitialValue} options={selectOptions} onChange={onSelectChange} />
    </header>
  )
}
