import { useDataDisplayContext } from '@/context'

export const Static = () => {
  const { fields, title } = useDataDisplayContext()
  if (!fields || fields.length === 0) {
    return <span>No data available</span>
  }

  const [staticField] = fields // This has been validated already

  return (
    <div className='text-white w-full flex flex-col items-center justify-center gap-1.5 py-5'>
      <span className='text-5xl font-semibold'>{staticField.value as number}</span>
      <h3 className='text-xl font-poppins'>{title}</h3>
    </div>
  )
}
