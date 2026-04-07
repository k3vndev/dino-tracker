import { Icon } from '@components'
import type { CustomField } from '@types'
import { useMemo, useState } from 'react'
import { useProjectsStore } from '@/store'
import { DateSelector } from './date-selector'
import { TextInput } from './text-input'

type Props = {
  index: number
  projectId: string
} & CustomField

export const EditableField = ({ id, projectId, color, name, type, value }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)
  const projects = useProjectsStore(s => s.projects)

  const project = useMemo(() => projects.find(p => p.id === projectId), [projectId, projects])

  const editCustomField = (newData: Partial<CustomField>) => {
    if (!project?.customFields) return

    const newCustomFields = [...project.customFields]
    const fieldIndex = newCustomFields.findIndex(f => f.id === id)
    if (fieldIndex === -1) return

    const prevField = newCustomFields[fieldIndex]
    newCustomFields[fieldIndex] = { ...prevField, ...newData } as CustomField
    setProjectAttributes(projectId, { customFields: newCustomFields })
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    editCustomField({ name: e.target.value })
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    if (type === 'static') {
      editCustomField({ value: e.target.value as any })
    } else if (selectedDate) {
      const newValuesArray = [...value]
      const selectedIndex = newValuesArray.findIndex(v => v.date === selectedDate)
      if (selectedIndex === -1) return

      const numericalValue = parseFloat(e.target.value)
      if (Number.isNaN(numericalValue)) return

      const newValue = { date: selectedDate, value: numericalValue }
      newValuesArray[selectedIndex] = newValue

      editCustomField({ value: newValuesArray })
    }
  }

  const currentValue = useMemo(() => {
    if (type === 'static') {
      return value
    }
    const foundValue = value.find(v => v.date === selectedDate)?.value
    return foundValue ?? null
  }, [type, value, selectedDate])

  return (
    <li className='flex items-center gap-5 pr-5 pl-7 py-4 odd:bg-black/65 even:bg-black/10'>
      <div style={{ background: color }} className='size-8 min-w-8 rounded-full' />

      <div className='flex flex-col gap-1.5 w-full'>
        <TextInput className='text-xl' value={name} onChange={handleNameChange} />
        <TextInput value={currentValue ?? ''} onChange={handleValueChange} />
      </div>

      {type === 'daily' && (
        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          dateRange={{
            start: project?.startDate,
            end: project?.endDate
          }}
        />
      )}

      <button className='size-14 min-w-14 cursor-pointer rounded-full hover:bg-white/5 flex items-center justify-center button'>
        <Icon name='trash' />
      </button>
    </li>
  )
}
