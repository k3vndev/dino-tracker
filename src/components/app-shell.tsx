import { cn } from '@utils'

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export const AppShell = ({ children, className, ...props }: Props) => (
  <div id='app-shell' className='relative h-full flex flex-col px-(--app-margin-x) py-(--app-margin-y)'>
    <main
      className={cn(
        'lg:ml-[calc(var(--app-sidebar-width)+var(--app-sidebar-margin))] gap-4 flex flex-col',
        className
      )}
      {...props}
    >
      {children}
    </main>
  </div>
)
