import { cn } from '@utils'

interface Props {
  children: React.ReactNode
  className?: string
}

export const Label = ({ children, className }: Props) => (
  <label className={cn('text-lg font-plus text-white/80 flex flex-col gap-2', className)}>{children}</label>
)
