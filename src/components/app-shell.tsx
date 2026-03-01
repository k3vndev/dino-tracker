import { AppSidebar } from '@components'
import { cn } from '@utils'

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export const AppShell = ({ children, className, ...props }: Props) => (
  <div id='app-shell' className='relative h-full'>
    <main
      className={cn(
        'ml-[calc(var(--app-sidebar-width)+var(--app-sidebar-margin))] flex flex-col gap-4',
        className
      )}
      {...props}
    >
      {children}
    </main>

    <AppSidebar />
  </div>
)
