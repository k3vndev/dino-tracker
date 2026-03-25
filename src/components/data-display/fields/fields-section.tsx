import { EditableTooltip } from '@components/editable-tooltip'
import { useDataDisplayContext } from '@context'
import { useEffect, useId, useState } from 'react'
import { AddFieldButton } from './add-field-button'
import { FieldTile } from './field-tile'

export const Fields = () => {
  const { fieldsMap, fieldIds } = useDataDisplayContext()

  const [isEditing, setIsEditing] = useState(false)
  const elementId = useId()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      if (!target.closest(`#${elementId}`) && isEditing) {
        // setIsEditing(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isEditing, elementId])

  if (!fieldIds || !fieldsMap) {
    return null
  }

  const handleClick = () => {
    if (isEditing) return
    setIsEditing(true)
  }

  const style = isEditing ? '' : 'cursor-pointer'

  return (
    <div id={elementId} className={`relative pr-2 w-fit group ${style}`} onClick={handleClick}>
      <ul className='flex flex-wrap gap-x-2 gap-y-2'>
        {fieldIds.map(key => (
          <FieldTile dataKey={key} isEditing={isEditing} key={key} />
        ))}
        {isEditing && <AddFieldButton />}
      </ul>

      {!isEditing && <EditableTooltip />}
    </div>
  )
}
