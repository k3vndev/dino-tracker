import { cn } from '@utils'

interface Props {
  label: string
  children: React.ReactNode
  className?: string
}

export const FieldWrapper = ({ label, children, className }: Props) => (
  <div className={cn('text-lg font-plus text-white/80 flex flex-col gap-2', className)}>
    <label>{label}</label>
    {children}
  </div>
)
