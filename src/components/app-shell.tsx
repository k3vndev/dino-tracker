import { AppSidebar } from '@components'
import { cn } from '@utils'

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export const AppShell = ({ children, className, ...props }: Props) => (
  <div
    id='app-shell'
    className='relative h-full flex flex-col 2xl:px-40 xl:px-32 lg:px-24 px-8 py-(--app-margin-y)'
  >
    <main
      className={cn(
        'ml-[calc(var(--app-sidebar-width)+var(--app-sidebar-margin))] gap-4 flex flex-col',
        className
      )}
      {...props}
    >
      {children}
    </main>

    <AppSidebar />
  </div>
)
