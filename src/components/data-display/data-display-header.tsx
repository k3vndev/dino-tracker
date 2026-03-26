import { useDataDisplayContext } from '@context'
import { Fields } from './fields/fields-section'
import { Select } from './select'

interface Props {
  selectOptions: string[]
  onSelectChange: (value: number) => void
  selectInitialValue?: number
  selectLabel: string
}

export const DataDisplayHeader = ({
  selectOptions,
  onSelectChange,
  selectInitialValue,
  selectLabel
}: Props) => {
  const { title } = useDataDisplayContext()

  return (
    <header className='flex items-start justify-between'>
      <div className='flex flex-col gap-y-1.5'>
        {/* Note: replace with editable text component in the future */}
        <h3 className='font-poppins text-white font-semibold'>{title}</h3>
        <Fields />
      </div>

      <Select
        initialValue={selectInitialValue}
        options={selectOptions}
        onChange={onSelectChange}
        label={selectLabel}
      />
    </header>
  )
}
