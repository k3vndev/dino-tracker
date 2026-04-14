import {
  Select as SelectComponent,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@components/ui'
import { cn } from '@utils'

interface Props<T> {
  defaultValue: string
  onValueChange: (value: string) => void
  onClick?: (e: React.MouseEvent) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  items: T[]
  elementsRenderer: (item: T, index: number) => React.ReactNode
  valuesGetter: (item: T, index: number) => string
  className?: {
    trigger?: string
    content?: string
    item?: string
    label?: string
    group?: string
  }
  label?: string
  title?: string
}

export const DropDownSelect = <T extends object>({
  defaultValue,
  onValueChange,
  onClick,
  items,
  elementsRenderer,
  valuesGetter,
  className,
  label,
  title,
  open,
  onOpenChange
}: Props<T>) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e)
      return
    }
    e.stopPropagation()
  }

  return (
    <SelectComponent {...{ defaultValue, onValueChange, open, onOpenChange }}>
      <SelectTrigger
        className={cn(
          'cursor-pointer absolute z-10 size-full max-h-full left-0 top-0 rounded-none opacity-0',
          className?.trigger
        )}
        onClick={handleClick}
        title={title}
      >
        <SelectValue className='hidden' />
      </SelectTrigger>
      <SelectContent position='popper' className={cn('popover-menu', className?.content)}>
        <SelectGroup className={cn(className?.group)}>
          {label && (
            <SelectLabel className={cn('text-white/50 text-xs', className?.label)}>{label}</SelectLabel>
          )}

          {items.map((item, index) => (
            <SelectItem
              key={index}
              value={valuesGetter(item, index)}
              className={cn('cursor-pointer group/select-item', className?.item)}
            >
              {elementsRenderer(item, index)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectComponent>
  )
}
