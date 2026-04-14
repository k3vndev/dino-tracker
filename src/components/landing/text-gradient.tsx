import { cn } from '@utils'

interface Props {
  className?: string
  children: React.ReactNode
}

export const TextGradient = ({ className = '', children }: Props) => (
  <span className={cn('text-transparent bg-clip-text bg-linear-to-r from-[#53c5c0] to-[#6a6ceb]', className)}>
    {children}
  </span>
)
