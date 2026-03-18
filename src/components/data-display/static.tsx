import { useDataDisplayContext } from '@/context'
import { ErrorCard } from './error-card'
import { Title } from './title'

export const Static = () => {
  const { fields, title, getFieldColor, fieldsMap } = useDataDisplayContext()
  if (!fields || fields.length === 0) {
    return <ErrorCard />
  }

  const [staticField] = fields // This has been validated already
  const color = getFieldColor(staticField.id)
  const staticName = fieldsMap ? fieldsMap[staticField.id].name : title

  return (
    <div className='text-white w-full '>
      <Title>{title}</Title>

      <div className='flex flex-col items-center justify-center gap-1.5 py-5'>
        <span className='text-5xl font-semibold'>{staticField.value as number}</span>

        <div className='flex items-center gap-2'>
          <div className='size-4 rounded-full' style={{ backgroundColor: color }} />
          <h3 className='text-xl font-poppins'>{staticName}</h3>
        </div>
      </div>
    </div>
  )
}
