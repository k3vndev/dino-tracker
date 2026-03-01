import { PROJECT_STATUSES } from '@consts'
import type { ProjectStatus } from '@types'
import { cn } from '@utils'

interface Props {
  status: ProjectStatus
  showBorder?: boolean
  className?: string
}

export const StatusChip = ({ status, showBorder = false, className }: Props) => {
  const mainColor = PROJECT_STATUSES[status]
  const bgColor = showBorder ? `${mainColor}32` : 'transparent' // Adding transparency to the main color
  const borderStyle = showBorder ? 'border' : ''

  return (
    <div
      className={cn('flex items-center gap-1 rounded-lg px-3 py-1', borderStyle, className)}
      style={{ borderColor: mainColor, background: bgColor }}
    >
      <div className={`size-3 min-w-3 rounded-full`} style={{ background: mainColor }} />
      <small className='text-nowrap text-xs font-poppins'>{status}</small>
    </div>
  )
}
