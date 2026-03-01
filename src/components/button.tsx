import { Icon } from '@components'
import type { IconName } from '@types'
import { cn } from '@/utils'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
  icon?: IconName
}

export const Button = ({ primary, className, icon, children, ...props }: Props) => {
  const style = primary
    ? 'bg-white/90 not-active:hover:[box-shadow:4px_4px_1px_#666] text-black [&>img]:invert border-transparent'
    : 'bg-black/80 not-active:hover:[box-shadow:4px_4px_1px_#1f1f1f] text-white border-white/15'

  return (
    <button
      className={cn(
        'flex items-center gap-2 border button rounded-lg px-6 py-2 w-fit active:translate-y-1 active:translate-x-1.5 active:scale-97 active:brightness-75',
        style,
        className
      )}
      {...props}
    >
      {icon && <Icon name={icon} className='size-6' />}
      <span className='font-plus font-semibold text-nowrap'>{children}</span>
    </button>
  )
}
