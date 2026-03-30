import { EditableTooltip } from '@components'
import { useDataDisplayContext } from '@context'
import { useEffect, useId, useRef, useState } from 'react'
import { AddFieldButton } from './add-field-button'
import { FieldTile } from './field-tile'

export const Fields = () => {
  const { fieldsMap, fieldIds } = useDataDisplayContext()
  const addModalIsOpenRef = useRef(false)
  const elementId = useId()

  // Tracks if the user is currently editing fields. Controlled by clicks inside/outside the component and the add field modal
  const [isEditing, setIsEditing] = useState(false)

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

  if (!fieldIds || !fieldsMap) {
    return null
  }

  const handleClick = () => {
    if (isEditing) return
    setIsEditing(true)
  }

  const setAddModalIsOpen = (isOpen: boolean) => {
    addModalIsOpenRef.current = isOpen
    if (!isOpen) {
      setIsEditing(false)
    }
  }

  const style = isEditing ? '' : 'cursor-pointer'

  return (
    <div id={elementId} className={`relative pr-2 w-fit group ${style}`} onClick={handleClick}>
      <ul className='flex flex-wrap gap-x-2 gap-y-2'>
        {fieldIds.map(key => (
          <FieldTile fieldId={key} isEditing={isEditing} key={key} />
        ))}
        {isEditing && <AddFieldButton onOpenChange={setAddModalIsOpen} />}
      </ul>

      {!isEditing && <EditableTooltip />}
    </div>
  )
}
