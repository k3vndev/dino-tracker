import {
  Select as SelectComponent,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@components/ui'

interface Props {
  onChange: (index: number) => void
  options: string[]
  initialValue: number
  label: string
}

export const Select = ({ onChange, options, initialValue, label }: Props) => {
  const handleChange = (index: number | string) => {
    onChange(Number(index))
  }

  return (
    <SelectComponent defaultValue={String(initialValue)} onValueChange={handleChange}>
      <SelectTrigger className='w-48 cursor-pointer bg-white/5 border border-white/20 text-white focus-visible:ring-0'>
        <SelectValue placeholder={label} defaultValue={String(initialValue)} />
      </SelectTrigger>
      <SelectContent position={'item-aligned'} className='popover-menu'>
        <SelectGroup>
          <SelectLabel className='text-white/50 text-xs'>{label}</SelectLabel>
          {options.map((option, index) => (
            <SelectItem key={index} value={String(index)} className='cursor-pointer'>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectComponent>
  )
}
