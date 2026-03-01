import { Icon } from '@components'
import { cn } from '@utils'

interface Props {
  className?: string
  displayLeft?: boolean
}
export const EditableTooltip = ({ displayLeft = false, className, ...props }: Props) => {
  const positionClass = displayLeft
    ? 'left-0 -translate-x-full justify-end'
    : 'right-0 translate-x-full justify-start'

  return (
    <div
      className={cn(
        'absolute top-1/2 -translate-y-1/2 group-hover:opacity-100 opacity-0 transition-opacity aspect-square h-full flex items-center',
        positionClass,
        className
      )}
      {...props}
    >
      <Icon name='edit' className='animate-pulse size-6' />
    </div>
  )
}
