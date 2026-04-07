import { Icon } from '@components'
import { CUSTOM_FIELD_DEFAULT_NAME } from '@consts'
import { useGlobalStateRefresh } from '@hooks'
import { useProjectsStore } from '@store'
import type { CustomField } from '@types'
import { useEffect, useMemo, useState } from 'react'
import { DateSelector } from './date-selector'
import { TextInput } from './text-input'

type Props = {
  index: number
  projectId: string
  fieldId: string
}

export const EditableField = ({ fieldId, projectId }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Global store
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)
  const projects = useProjectsStore(s => s.projects)
  const project = useMemo(() => projects.find(p => p.id === projectId), [projectId, projects])

  // We need to keep the field in local state to ensure that we have the most up-to-date data, especially when the project data changes
  const [field, setField] = useState<CustomField | null>(null)
  useEffect(() => {
    if (!field && project?.customFields) {
      const foundField = project.customFields.find(f => f.id === fieldId)
      foundField && setField(foundField)
    }
  }, [project, field])

  useGlobalStateRefresh(latest => {
    if (!project?.customFields) return

    const newCustomFields = [...project.customFields]
    const fieldIndex = newCustomFields.findIndex(f => f.id === fieldId)
    if (fieldIndex === -1 || !latest) return

    newCustomFields[fieldIndex] = latest
    setProjectAttributes(projectId, { customFields: newCustomFields })
  }, field)

  // Edits the custom field with the new data and updates the project in the store
  const editCustomField = (newData: Partial<CustomField>) => {
    setField(prev => {
      if (!prev) return prev
      return { ...prev, ...newData } as CustomField
    })
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const { value } = e.target
    const trimmedValue = value.trim()
    editCustomField({ name: trimmedValue })
  }

  const handleNameInputBlur = () => {
    if (!field?.name.trim()) {
      editCustomField({ name: CUSTOM_FIELD_DEFAULT_NAME })
    }
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    // Handle static value change
    if (field?.type === 'static') {
      editCustomField({ value: e.target.value as any })
      return
    }

    // Handle daily value change
    if (selectedDate) {
      const newValuesArray = [...(field?.value ?? [])]
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
    if (field?.type === 'static') {
      return field?.value
    }
    const foundValue = field?.value?.find(v => v.date === selectedDate)?.value
    return foundValue ?? null
  }, [field, selectedDate])

  return (
    <li className='flex items-center gap-5 pr-5 pl-7 py-4 odd:bg-black/50 even:bg-black/10'>
      <div style={{ background: field?.color }} className='size-8 min-w-8 rounded-full' />

      <div className='flex flex-col gap-1.5 w-full'>
        <TextInput
          className='text-xl'
          value={field?.name ?? ''}
          onChange={handleNameChange}
          placeholder='Name'
          onBlur={handleNameInputBlur}
        />
        <TextInput value={currentValue ?? ''} onChange={handleValueChange} placeholder='Value' />
      </div>

      {field?.type === 'daily' && (
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
