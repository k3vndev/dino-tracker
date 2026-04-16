import { Icon } from '@components'
import {
  Select as SelectComponent,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@components/ui'
import type { IconName } from '@types'
import { cn } from '@utils'

export interface DropdownSelectItem {
  label: string
  icon?: IconName
  value?: string
  disabled?: boolean
  className?: string
}

interface Props<T extends DropdownSelectItem> {
  onValueChange: (value: string) => void
  onClick?: (e: React.MouseEvent) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  items: T[]
  indexAsValue?: boolean
  className?:
    | string
    | {
        trigger?: string
        content?: string
        item?: string
        label?: string
        group?: string
      }
  label?: string
  title?: string
  elementsRenderer?: (item: T, index: number) => React.ReactNode
}

export const DropdownSelect = <T extends DropdownSelectItem>({
  onValueChange,
  onClick,
  items,
  indexAsValue,
  className,
  label,
  title,
  open,
  onOpenChange,
  elementsRenderer
}: Props<T>) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e)
      return
    }
    e.stopPropagation()
  }

  // Handle classNames
  const [classNameObj, classNameStr] = typeof className === 'string' ? [{}, className] : [className, '']

  return (
    <SelectComponent {...{ onValueChange, open, onOpenChange }}>
      <SelectTrigger
        className={cn(
          'cursor-pointer absolute z-10 size-full max-h-full left-0 top-0 rounded-none opacity-0',
          classNameObj?.trigger
        )}
        onClick={handleClick}
        title={title}
      >
        <SelectValue className='hidden' />
      </SelectTrigger>
      <SelectContent position='popper' className={cn('popover-menu', classNameStr, classNameObj?.content)}>
        <SelectGroup className={cn(classNameObj?.group)}>
          {label && (
            <SelectLabel className={cn('text-white/50 text-xs', classNameObj?.label)}>{label}</SelectLabel>
          )}

          {items.map((item, index) => (
            <SelectItem
              key={index}
              value={indexAsValue ? String(index) : (item.value ?? item.label)}
              disabled={item.disabled}
              className={cn(
                "cursor-pointer group/select-item **:data-[slot='select-item-indicator']:hidden px-4 py-2",
                classNameObj?.item,
                item.className
              )}
            >
              {elementsRenderer?.(item, index) ?? (
                <>
                  {item.icon && (
                    <Icon
                      name={item.icon}
                      className='group-focus/select-item:invert focus:invert size-5 min-w-5'
                    />
                  )}
                  <span>{item.label}</span>
                </>
              )}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectComponent>
  )
}
