import { Icon } from '@components'
import type { IconName } from '@types'

interface Props {
  icon: IconName
  label?: string
}

export const EmptyChart = ({ icon, label = 'Add fields to display your chart!' }: Props) => (
  <div className='flex flex-col items-center justify-center gap-2 py-4'>
    <Icon name={icon} className='size-16' />
    <span className='font-poppins text-white/40'>{label}</span>
  </div>
)
