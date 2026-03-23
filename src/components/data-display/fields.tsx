import { useDataDisplayContext } from '@context'
import { useMemo } from 'react'

export const Fields = () => {
  const { fieldsMap, getFieldColor } = useDataDisplayContext()

  const fieldsKeys = useMemo(() => (fieldsMap ? Object.keys(fieldsMap) : null), [fieldsMap])

  if (!fieldsKeys || !fieldsMap) {
    return null
  }

  return (
    <ul className='flex flex-wrap gap-x-4 gap-y-2'>
      {fieldsKeys.map(key => (
        <li key={key} className='flex items-center gap-1'>
          <div style={{ backgroundColor: getFieldColor(key) }} className='w-3 h-3 rounded-full'></div>
          <span className='text-white/75 text-sm'>{fieldsMap[key].name}</span>
        </li>
      ))}
    </ul>
  )
}
