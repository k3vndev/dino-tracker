import { Icon } from '@components'
import type { IconName } from '@types'
import { cn } from '@utils'
import Link from 'next/link'

// --- Button ---

type ButtonProps = React.HtmlHTMLAttributes<HTMLElement> & ButtonBase

export const Button = ({ primary, icon, className, children, ...props }: ButtonProps) => (
  <button className={getButtonClassName(className, primary)} {...props}>
    <Internal icon={icon}>{children}</Internal>
  </button>
)

// --- Link Button ---

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonBase

export const LinkButton = ({ primary, icon, className, children, href = '', ...props }: LinkButtonProps) => (
  <Link href={href} className={getButtonClassName(className, primary)} {...props}>
    <Internal icon={icon}>{children}</Internal>
  </Link>
)

// --- Internals ---

interface ButtonBase {
  primary?: boolean
  icon?: IconName
  children?: React.ReactNode
}

const getButtonClassName = (propsClassName?: string, primary?: boolean) => {
  const styleClassName = primary
    ? 'bg-white/90 not-active:hover:[box-shadow:4px_4px_1px_#666] text-black [&>img]:invert border-transparent'
    : 'bg-black/80 not-active:hover:[box-shadow:4px_4px_1px_#1f1f1f] text-white border-white/15'

  return cn(
    'flex items-center gap-2 border button rounded-lg lg:px-6 px-3 lg:py-2 py-1.5 w-fit active:translate-y-1 active:translate-x-1.5 active:scale-97 active:brightness-75',
    styleClassName,
    propsClassName
  )
}

interface InternalProps {
  icon?: IconName
  children?: React.ReactNode
}

const Internal = ({ icon, children }: InternalProps) => (
  <>
    {icon && <Icon name={icon} className='lg:size-6 size-5' />}
    <span className='font-plus font-semibold text-nowrap not-lg:text-sm'>{children}</span>
  </>
)
