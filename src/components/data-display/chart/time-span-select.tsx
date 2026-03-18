import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@components/ui'
import { DEFAULT_CHART_TIME_SPAN } from '@consts'

interface Props {
  onChange: (daySpan: number) => void
}

export const TimeSpanSelect = ({ onChange }: Props) => {
  const handleValueChange = (value: string) => {
    const daySpan = Number(value)
    onChange(daySpan)
  }

  const selectItems = [
    { label: 'Last 7', value: 7 },
    { label: 'Last 14', value: 14 },
    { label: 'Last 30', value: 30 },
    { label: 'All', value: -1 }
  ]

  return (
    <Select defaultValue={String(DEFAULT_CHART_TIME_SPAN)} onValueChange={handleValueChange}>
      <SelectTrigger className='w-48 bg-white/5 border border-white/20 text-white focus-visible:ring-0'>
        <SelectValue placeholder='Select time span' defaultValue={String(DEFAULT_CHART_TIME_SPAN)} />
      </SelectTrigger>
      <SelectContent
        position={'item-aligned'}
        className='bg-black/50 backdrop-blur-lg text-white border border-white/20'
      >
        <SelectGroup>
          <SelectLabel className='text-white/70'>Choose time span</SelectLabel>
          {selectItems.map(({ label, value }) => (
            <SelectItem key={value} value={String(value)}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
