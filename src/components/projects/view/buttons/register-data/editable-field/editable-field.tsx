import { Icon } from '@components'
import { CUSTOM_FIELD_DEFAULT_NAME } from '@consts'
import { EditableFieldContext } from '@context'
import { useGlobalStateRefresh, useResponsiveness } from '@hooks'
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
  const [currentValue, setCurrentValue] = useState<string | null>(null)
  const { media } = useResponsiveness()

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

  // Initializes the current value. For daily fields, it continues to update the current value based on the selected date
  useEffect(() => {
    if (!field) return

    // Handle daily fields by finding the value for the selected date
    if (field.type === 'daily') {
      const dailyValue = field.value?.find(v => v.date === selectedDate)?.value?.toString() ?? ''
      setCurrentValue(dailyValue)
    }

    // Handle static fields by setting the current value to the field's value
    if (currentValue === null) {
      setCurrentValue(field.value?.toString() ?? '')
    }
  }, [selectedDate, field])

  // Ensures that whenever the field data changes, the project in the global store is updated accordingly
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

  // This function ensures that the input value is always a valid number, allowing for one optional dot for decimal values. It returns both the global numeric value and the local string representation to maintain the user's input format.
  // Negative numbers are not allowed
  const parseValue = (value: string) => {
    let dotCount = 0
    let validated = ''

    for (let i = 0; i < value.length; i++) {
      const char = value[i]
      // Handle dots
      if (char === '.' && ++dotCount <= 1) {
        validated += char
      }
      // Handle digits
      const numberValue = parseInt(char, 10)
      if (!Number.isNaN(numberValue)) {
        validated += char
      }
    }

    // Convert the validated string to a number for global state, while keeping the original format for local state to reflect the user's input accurately
    const global =
      validated === '' ? undefined : +(validated.endsWith('.') ? validated.slice(0, -1) : validated)

    return { global, local: validated }
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    // Handle static value change
    if (field?.type === 'static') {
      const { global, local } = parseValue(e.target.value)

      editField({ value: global })
      setCurrentValue(local)
      return
    }

    // Handle daily value change
    if (selectedDate) {
      const newValuesArray = [...(field?.value ?? [])]
      const selectedIndex = newValuesArray.findIndex(v => v.date === selectedDate)

      // Validate that the input value is a number before proceeding
      const { global, local } = parseValue(e.target.value)
      setCurrentValue(local)

      if (selectedIndex === -1 && global !== undefined && global !== null) {
        // A new entry is needed for the selected date
        newValuesArray.push({ date: selectedDate, value: global })
        // Ensure the array remains sorted by date after adding the new entry
        newValuesArray.sort(
          (a, b) => DateTime.fromISO(a.date).toMillis() - DateTime.fromISO(b.date).toMillis()
        )
      } else {
        // An existing entry for the selected date should be updated
        if (global !== undefined && global !== null) {
          const newValue = { date: selectedDate, value: global }
          newValuesArray[selectedIndex] = newValue
        } else {
          // If the input is cleared, we remove the entry for that date
          newValuesArray.splice(selectedIndex, 1)
        }
      }

      editField({ value: newValuesArray })
    }
  }

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
    : 'odd:bg-black/60 even:bg-black/10'

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
      <li className={`flex flex-col items-center gap-5 pr-5 pl-7 py-4 ${classNameStyle}`}>
        {/* Title and value inputs */}
        {!media.sm && (
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
        )}

        <div className='flex items-center gap-5 w-full justify-between'>
          <ColorSelector />

          {/* Title and value inputs */}
          {media.sm && (
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
          )}

          {/* Date selector */}
          {field?.type === 'daily' && project?.customFields && <DateSelector />}

          {/* Delete button */}
          <button
            className='size-14 min-w-14 cursor-pointer rounded-full hover:bg-white/5 flex items-center justify-center button group'
            onClick={toggleDelete}
          >
            <Icon className='opacity-75 group-hover:opacity-100 transition' {...icon} />
          </button>
        </div>
      </li>
    </EditableFieldContext.Provider>
  )
}
