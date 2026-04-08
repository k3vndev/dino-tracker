import type { IconName } from '@types'
import { Icon } from './icon'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'

interface Props {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  icon: IconName
  ariaDescription?: string
}

export const DialogWrapper = ({ children, onOpenChange, open, title, icon, ariaDescription }: Props) => (
  <Dialog {...{ open, onOpenChange }}>
    <DialogTrigger className='hidden'></DialogTrigger>
    <DialogContent
      className='bg-[#111]/90 backdrop-blur-md border-white/15 **:data-[slot=dialog-close]:text-white **:data-[slot=dialog-close]:hover:bg-white/10 **:data-[slot=dialog-close]:size-8 **:data-[slot=dialog-close]:items-center **:data-[slot=dialog-close]:flex **:data-[slot=dialog-close]:justify-center **:data-[slot=dialog-close]:rounded-full lg:min-w-2xl'
      aria-describedby={ariaDescription}
    >
      <DialogTitle className='flex items-center gap-3 text-white justify-center'>
        <Icon name={icon} />
        <span>{title}</span>
      </DialogTitle>

      {children}
    </DialogContent>
  </Dialog>
)
