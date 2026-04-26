import { Icon } from '@components'
import { useDataDisplayContext } from '@context'
import type { CustomField } from '@types'

interface Props {
  fieldId: string
  isEditing: boolean
}

export const FieldTile = ({ fieldId, isEditing }: Props) => {
  const { fieldsMap, getFieldColor, updateField } = useDataDisplayContext()

  if (!fieldsMap || !fieldsMap[fieldId]) {
    return null
  }

  const color = getFieldColor(fieldId)

  const deleteField = () => {
    const field = { ...fieldsMap[fieldId], id: fieldId } as CustomField
    updateField(field, 'delete')
  }

  const fieldName = fieldsMap[fieldId].name

  if (isEditing) {
    return (
      <li
        className='border rounded-full px-2.5 py-0.5 flex items-center gap-0.5 bg-white/5 button'
        style={{ borderColor: color }}
        onClick={deleteField}
        title={`Delete "${fieldName}" field`}
      >
        <Icon name='trash' className='size-4' />
        <span className='text-white/75 text-sm'>{fieldName}</span>
      </li>
    )
  }

  return (
    <li className='flex items-center gap-1 py-0.5 mr-1 border border-transparent'>
      <div style={{ backgroundColor: color }} className='w-3 h-3 rounded-full' />
      <span className='text-white/75 text-sm'>{fieldName}</span>
    </li>
  )
}
