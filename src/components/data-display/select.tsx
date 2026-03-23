import {
  Select as SelectComponent,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@components/ui'
import type { SelectOption } from '@types'

interface Props {
  onChange: (daySpan: number) => void
  options: SelectOption[]
  initialValue: number
}

export const Select = ({ onChange, options, initialValue }: Props) => {
  const handleValueChange = (value: string) => {
    onChange(Number(value))
  }

  return (
    <SelectComponent defaultValue={String(initialValue)} onValueChange={handleValueChange}>
      <SelectTrigger className='w-48 bg-white/5 border border-white/20 text-white focus-visible:ring-0'>
        <SelectValue placeholder='Select time span' defaultValue={String(initialValue)} />
      </SelectTrigger>
      <SelectContent
        position={'item-aligned'}
        className='bg-black/50 backdrop-blur-lg text-white border border-white/20'
      >
        <SelectGroup>
          <SelectLabel className='text-white/70'>Choose time span</SelectLabel>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={String(value)}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectComponent>
  )
}
