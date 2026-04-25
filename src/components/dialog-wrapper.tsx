import { Icon } from '@components'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@components/ui'
import type { IconName } from '@types'
import { cn } from '@utils'

interface Props {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  icon: IconName
  ariaDescription?: string
  className?: {
    trigger?: string
    content?: string
    title?: string
  }
}

export const DialogWrapper = ({
  children,
  onOpenChange,
  open,
  title,
  icon,
  ariaDescription,
  className
}: Props) => (
  <Dialog {...{ open, onOpenChange }}>
    <DialogTrigger className={cn('hidden', className?.trigger)}></DialogTrigger>
    <DialogContent
      className={cn(
        'bg-[#111]/90 backdrop-blur-md border-white/15 **:data-[slot=dialog-close]:text-white **:data-[slot=dialog-close]:hover:bg-white/10 **:data-[slot=dialog-close]:size-8 **:data-[slot=dialog-close]:items-center **:data-[slot=dialog-close]:flex **:data-[slot=dialog-close]:justify-center **:data-[slot=dialog-close]:rounded-full sm:min-w-2xl',
        className?.content
      )}
      aria-describedby={ariaDescription}
    >
      <DialogTitle className={cn('flex items-center gap-3 text-white justify-center', className?.title)}>
        <Icon name={icon} />
        <span>{title}</span>
      </DialogTitle>

      {children}
    </DialogContent>
  </Dialog>
)
