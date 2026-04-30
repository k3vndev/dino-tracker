import { EditableTooltip } from '@components'
import { useDataDisplayContext } from '@context'
import { useProjectsStore } from '@store'
import type { CustomField, PotentialFieldsToAdd } from '@types'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { AddFieldButton } from './add-field-button'
import { FieldTile } from './field-tile'

export const Fields = () => {
  const { fieldIds, projectId, type: projectType } = useDataDisplayContext()
  const projects = useProjectsStore(s => s.projects)
  const addModalIsOpenRef = useRef(false)
  const elementId = useId()

  // Tracks if the user is currently editing fields. Controlled by clicks inside/outside the component and the add field modal
  const [isEditing, setIsEditing] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      if (!target.closest(`#${elementId}`) && isEditing) {
        // Delay to allow click events within the add modal to be registered
        requestAnimationFrame(() => {
          // Only exit editing mode if the add modal is not open
          if (!addModalIsOpenRef.current) {
            setIsEditing(false)
          }
        })
      }
    }

    document.addEventListener('click', handleClickOutside, { passive: true })
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isEditing, elementId])

  const handleClick = () => {
    setModalIsOpen(false)
    setIsEditing(true)

    requestAnimationFrame(() => {
      if (!fieldIds?.length) {
        setModalIsOpen(true)
      }
    })
  }

  const onModalOpenChange = (isOpen: boolean) => {
    addModalIsOpenRef.current = isOpen
    setModalIsOpen(isOpen)

    if (!isOpen) {
      setIsEditing(false)
    }
  }

  const style = isEditing ? '' : 'cursor-pointer'

  const potentialFieldsToAdd: PotentialFieldsToAdd | null = useMemo(() => {
    const proj = projects.find(p => p.id === projectId)
    const { customFields } = proj || {}

    if (!customFields || !projectType) return null

    const idsSet = new Set(fieldIds)
    const dailyFields: CustomField[] = []
    const staticFields: CustomField[] = []

    for (const field of customFields) {
      // For static charts we want to show all the fields, for daily we want to show only the daily ones.
      const isInvalidDaily = projectType === 'daily' && field.type !== 'daily'
      const isAlreadyAdded = idsSet.has(field.id)

      if (isInvalidDaily || isAlreadyAdded) {
        continue
      }

      // Separate daily and static fields for better organization in the UI.
      if (field.type === 'daily') {
        dailyFields.push(field)
      } else {
        staticFields.push(field)
      }
    }

    return {
      daily: dailyFields,
      static: staticFields
    }
  }, [projects, projectId, projectType, fieldIds])

  const hasFieldsToAdd = !!potentialFieldsToAdd?.daily.length || !!potentialFieldsToAdd?.static.length

  const displayText = hasFieldsToAdd
    ? 'Click to add fields'
    : 'Create custom fields in Register Data to display here'

  return (
    <div id={elementId} className={`relative pr-2 w-fit group ${style}`} onClick={handleClick}>
      <ul className='flex flex-wrap gap-x-2 gap-y-2'>
        {fieldIds?.length ? (
          fieldIds.map(key => <FieldTile fieldId={key} isEditing={isEditing} key={key} />)
        ) : (
          <span className='font-plus text-white/60 select-none'>{displayText}</span>
        )}
        {isEditing && hasFieldsToAdd && (
          <AddFieldButton
            onOpenChange={onModalOpenChange}
            isOpen={modalIsOpen}
            potentialFieldsToAdd={potentialFieldsToAdd}
          />
        )}
      </ul>

      {!isEditing && hasFieldsToAdd && <EditableTooltip />}
    </div>
  )
}
