import { useDataDisplayContext } from '@context'
import { useMemo } from 'react'
import { ChartComponent } from './chart-component'
import { ErrorCard } from './error-card'
import { Title } from './title'

export const Chart = () => {
  const { fields, fieldsMap, title, getFieldColor } = useDataDisplayContext()

  const fieldKeys = useMemo(() => (fieldsMap ? Object.keys(fieldsMap) : null), [fieldsMap])

  if (!fields || !fieldsMap || !fieldKeys) {
    return <ErrorCard />
  }

  return (
    <div className='w-full rounded-xl p-2 pl-0 pt-0 flex flex-col gap-6'>
      <div className='flex flex-wrap gap-x-8 gap-y-1.5 justify-between'>
        <Title>{title}</Title>

        <ul className='flex flex-wrap gap-x-4 gap-y-2'>
          {fieldKeys.map(key => (
            <li key={key} className='flex items-center gap-1'>
              <div style={{ backgroundColor: getFieldColor(key) }} className='w-3 h-3 rounded-full'></div>
              <span className='text-white/75 text-sm'>{fieldsMap[key].name}</span>
            </li>
          ))}
        </ul>
      </div>
      <ChartComponent />
    </div>
  )
}
