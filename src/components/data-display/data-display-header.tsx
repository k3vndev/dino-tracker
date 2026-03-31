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
  selectInitialValue = 0,
  selectLabel
}: Props) => {
  const { title } = useDataDisplayContext()

  return (
    <header className='flex flex-col items-start justify-between'>
      <div className='flex w-full justify-between gap-4'>
        {/* Note: replace with editable text component in the future */}
        <h3 className='font-poppins text-lg text-white font-semibold'>{title}</h3>

        <Select
          initialValue={selectInitialValue}
          options={selectOptions}
          onChange={onSelectChange}
          label={selectLabel}
        />
      </div>

      <Fields />
    </header>
  )
}
