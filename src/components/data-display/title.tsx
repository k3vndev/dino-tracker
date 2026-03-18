import { cn } from '@utils'

interface Props {
  children: React.ReactNode
  className?: string
}

export const Title = ({ children, className }: Props) => (
  <h3 className={cn('font-poppins text-white font-semibold', className)}>{children}</h3>
)
