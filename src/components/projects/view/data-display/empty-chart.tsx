import { Icon } from '@components'
import { useDataDisplayContext } from '@context'
import type { IconName } from '@types'

interface Props {
  icon: IconName
}

export const EmptyChart = ({ icon }: Props) => {
  const { fieldsHaveData } = useDataDisplayContext()
  const displayLabel = fieldsHaveData
    ? 'No data available. Fields need data to be displayed!'
    : 'Add fields to display your chart!'

  return (
    <div className='flex flex-col items-center justify-center gap-2 py-4'>
      <Icon name={icon} className='size-16' />
      <span className='font-poppins text-white/40'>{displayLabel}</span>
    </div>
  )
}
