import { useDataDisplayContext } from '@/context'
import { ErrorCard } from './error-card'

export const Static = () => {
  const { fields, title } = useDataDisplayContext()
  if (!fields || fields.length === 0) {
    return <ErrorCard />
  }

  const [staticField] = fields // This has been validated already

  return (
    <div className='text-white w-full flex flex-col items-center justify-center gap-1.5 py-5'>
      <span className='text-5xl font-semibold'>{staticField.value as number}</span>
      <h3 className='text-xl font-poppins'>{title}</h3>
    </div>
  )
}
