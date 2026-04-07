import { Icon } from '@components'
import type { CustomField } from '@types'
import { useMemo, useState } from 'react'
import { useProjectsStore } from '@/store'
import { TextInput } from './text-input'

type Props = {
  index: number
  projectId: string
} & CustomField

export const EditableField = ({ index, id, projectId, color, name, type, value }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)
  const projects = useProjectsStore(s => s.projects)

  const editCustomField = (newData: Partial<CustomField>) => {
    const project = projects.find(p => p.id === projectId)
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
    }

    // TODO: Handle daily type
  }

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

      <button className='size-14 min-w-14 cursor-pointer rounded-full hover:bg-white/5 flex items-center justify-center button'>
        <Icon name='trash' />
      </button>
    </li>
  )
}
