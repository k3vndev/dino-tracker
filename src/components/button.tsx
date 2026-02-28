import { Icon } from '@components'
import type { IconName } from '@types'
import { cn } from '@/utils'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
  icon?: IconName
}

export const Button = ({ primary, className, icon, children, ...props }: Props) => {
  const style = primary
    ? 'bg-white/90 text-black [&>img]:invert'
    : 'bg-black/80 text-white border border-white/10'

  return (
    <button
      className={cn(
        'flex items-center gap-2 button font-plus font-semibold rounded-md px-6 py-1.5 w-fit',
        style,
        className
      )}
      {...props}
    >
      {icon && <Icon name={icon} className='size-8 z-20' />}
      <span className='z-20'>{children}</span>
    </button>
  )
}
