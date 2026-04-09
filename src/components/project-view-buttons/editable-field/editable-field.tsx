import { Icon } from '@components'
import { CUSTOM_FIELD_DEFAULT_NAME } from '@consts'
import { EditableFieldContext } from '@context'
import { useGlobalStateRefresh } from '@hooks'
import { useProjectsStore } from '@store'
import type { CustomField, IconName, Project } from '@types'
import { DateTime } from 'luxon'
import { useEffect, useMemo, useState } from 'react'
import { ColorSelector } from './color-selector'
import { DateSelector } from './date-selector'
import { TextInput } from './text-input'

type Props = {
  index: number
  fieldId: string
  project?: Project
  deletingFieldsIds: string[]
  setDeletingFieldsIds: React.Dispatch<React.SetStateAction<string[]>>
}

export const EditableField = ({ fieldId, project, deletingFieldsIds, setDeletingFieldsIds }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Global store
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)

  // We need to keep the field in local state to ensure that we have the most up-to-date data, especially when the project data changes
  const [field, setField] = useState<CustomField | null>(null)
  useEffect(() => {
    if (field === null && project?.customFields) {
      const foundField = project.customFields.find(f => f.id === fieldId)
      foundField && setField(foundField)
    }
  }, [project, field])

  useGlobalStateRefresh(
    latest => {
      if (!project?.customFields) return

      const newCustomFields = [...project.customFields]
      const fieldIndex = newCustomFields.findIndex(f => f.id === fieldId)
      if (fieldIndex === -1 || !latest) return

      newCustomFields[fieldIndex] = latest
      setProjectAttributes(project.id, { customFields: newCustomFields })
    },
    field,
    250
  )

  // Edits the custom field with the new data and updates the project in the store
  const editField = (newData: Partial<CustomField>) => {
    setField(prev => {
      if (!prev) return prev
      return { ...prev, ...newData } as CustomField
    })
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const { value } = e.target
    const trimmedValue = value.trim()
    editField({ name: trimmedValue })
  }

  const handleNameInputBlur = () => {
    if (!field?.name.trim()) {
      editField({ name: CUSTOM_FIELD_DEFAULT_NAME })
    }
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    // Handle static value change
    if (field?.type === 'static') {
      editField({ value: e.target.value as any })
      return
    }

    // Handle daily value change
    if (selectedDate) {
      const newValuesArray = [...(field?.value ?? [])]
      const selectedIndex = newValuesArray.findIndex(v => v.date === selectedDate)

      // Validate that the input value is a number before proceeding
      const numericalValue = parseFloat(e.target.value)
      if (Number.isNaN(numericalValue)) return

      if (selectedIndex === -1) {
        // A new entry is needed for the selected date
        newValuesArray.push({ date: selectedDate, value: numericalValue })
        // Ensure the array remains sorted by date after adding the new entry
        newValuesArray.sort(
          (a, b) => DateTime.fromISO(a.date).toMillis() - DateTime.fromISO(b.date).toMillis()
        )
      } else {
        // An existing entry for the selected date should be updated
        const newValue = { date: selectedDate, value: numericalValue }
        newValuesArray[selectedIndex] = newValue
      }

      editField({ value: newValuesArray })
    }
  }

  const currentValue = useMemo(() => {
    if (field?.type === 'static') {
      return field?.value
    }
    const foundValue = field?.value?.find(v => v.date === selectedDate)?.value
    return foundValue ?? null
  }, [field, selectedDate])

  const toggleDelete = () => {
    if (!project) return

    const idsSet = new Set(deletingFieldsIds)
    if (idsSet.has(fieldId)) {
      idsSet.delete(fieldId)
    } else {
      idsSet.add(fieldId)
    }

    setDeletingFieldsIds(Array.from(idsSet))
  }

  const isBeingDeleted = useMemo(() => deletingFieldsIds.includes(fieldId), [deletingFieldsIds, fieldId])
  const classNameStyle = isBeingDeleted
    ? 'odd:bg-red-500/10 even:bg-red-500/4 ring odd:ring-red-400/20 even:ring-red-400/40'
    : 'odd:bg-black/50 even:bg-black/10'

  const icon: { name: IconName; title: string } = isBeingDeleted
    ? {
        name: 'cancel',
        title: 'Cancel deletion'
      }
    : {
        name: 'trash',
        title: 'Delete field'
      }

  // If the project or its custom fields are not available, we can't render the editable field
  if (!project?.customFields || !field) return null

  return (
    <EditableFieldContext.Provider
      value={{
        customFields: project.customFields,
        selectedDate,
        setSelectedDate,
        startDate: project.startDate,
        endDate: project.endDate,
        fieldId,
        field,
        setField,
        isBeingDeleted
      }}
    >
      <li className={`flex items-center gap-5 pr-5 pl-7 py-4 ${classNameStyle}`}>
        <ColorSelector />

        <div className='flex flex-col gap-1.5 w-full'>
          <TextInput
            className='text-xl'
            value={field?.name}
            onChange={handleNameChange}
            placeholder='Name'
            onBlur={handleNameInputBlur}
          />
          <TextInput value={currentValue ?? ''} onChange={handleValueChange} placeholder='Value' />
        </div>

        {field?.type === 'daily' && project?.customFields && <DateSelector />}

        <button
          className='size-14 min-w-14 cursor-pointer rounded-full hover:bg-white/5 flex items-center justify-center button group'
          onClick={toggleDelete}
        >
          <Icon className='opacity-75 group-hover:opacity-100 transition' {...icon} />
        </button>
      </li>
    </EditableFieldContext.Provider>
  )
}
