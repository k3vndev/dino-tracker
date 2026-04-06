import type { CustomField } from '@types'
import { useEffect, useMemo, useState } from 'react'
import { TextInput } from './text-input'

type Props = {
  index: number
} & CustomField

export const EditableField = ({ index, id, color, name, type, value }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string | null>('2026-01-06')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {}
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {}

  const currentValue = useMemo(() => {
    if (type === 'static') {
      return value
    }
    return value.find(v => v.date === selectedDate)?.value ?? null
  }, [type, value, selectedDate])

  return (
    <li className='flex items-center gap-5 px-5 py-4 odd:bg-black/65 even:bg-black/10'>
      <div style={{ background: color }} className='size-8 min-w-8 rounded-full' />

      <div className='flex flex-col gap-1.5 w-full'>
        <TextInput value={name} onChange={handleNameChange} />
        <TextInput value={currentValue ?? ''} onChange={handleValueChange} />
      </div>
    </li>
  )
}
