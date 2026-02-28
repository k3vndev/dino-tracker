import { cn } from '@utils'

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export const MainWrapper = ({ children, className, ...props }: Props) => (
  <main
    className={cn(
      'ml-[calc(var(--app-sidebar-width)+var(--app-sidebar-margin))] flex flex-col gap-4',
      className
    )}
    {...props}
  >
    {children}
  </main>
)
