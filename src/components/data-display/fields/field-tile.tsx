import { Icon } from '@components'
import { useDataDisplayContext } from '@context'

interface Props {
  dataKey: string
  isEditing: boolean
}

export const FieldTile = ({ dataKey: key, isEditing }: Props) => {
  const { fieldsMap, getFieldColor } = useDataDisplayContext()

  if (!fieldsMap || !fieldsMap[key]) {
    return null
  }

  const color = getFieldColor(key)

  const deleteField = () => {
    console.log('Deleted field', key)
  }

  const fieldName = fieldsMap[key].name

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
