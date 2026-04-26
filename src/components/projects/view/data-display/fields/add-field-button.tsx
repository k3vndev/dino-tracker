import { Icon } from '@components'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@components/ui'
import { useDataDisplayContext } from '@context'
import type { CustomField, PotentialFieldsToAdd } from '@types'
import { capitalizeFirst } from '@utils'
import { useMemo } from 'react'

interface Props {
  onOpenChange: (open: boolean) => void
  isOpen: boolean
  potentialFieldsToAdd?: PotentialFieldsToAdd | null
}

export const AddFieldButton = ({ onOpenChange, isOpen, potentialFieldsToAdd }: Props) => {
  const { updateField } = useDataDisplayContext()

  const toAddFieldsCount = useMemo(() => {
    if (!potentialFieldsToAdd) return 0
    return potentialFieldsToAdd.daily.length + potentialFieldsToAdd.static.length
  }, [potentialFieldsToAdd])

  const buttonStyle = toAddFieldsCount > 0 ? '' : 'opacity-40 pointer-events-none'

  const addField = (field: CustomField) => {
    updateField(field, 'add')
  }

  return (
    <DropdownMenu onOpenChange={onOpenChange} open={isOpen}>
      <DropdownMenuTrigger disabled={toAddFieldsCount === 0}>
        <div
          className={`border border-white/15 rounded-full px-2.5 py-0.5 flex items-center gap-0.5 bg-white/5 button ${buttonStyle}`}
          title='Create new field'
        >
          <Icon name='plus' className='size-4' />
        </div>
      </DropdownMenuTrigger>

      {potentialFieldsToAdd && (
        <DropdownMenuContent className='popover-menu'>
          {Object.entries(potentialFieldsToAdd).map(([fieldType, fields]) =>
            fields.length ? (
              <DropdownMenuGroup key={fieldType}>
                <DropdownMenuLabel className='text-white/50 text-xs'>
                  {capitalizeFirst(fieldType)}
                </DropdownMenuLabel>
                {(fields as CustomField[]).map(field => (
                  <DropdownMenuItem
                    key={field.id}
                    onSelect={() => addField(field)}
                    className='cursor-pointer'
                  >
                    <div
                      style={{ backgroundColor: field.color }}
                      className='size-3 min-w-3 aspect-square rounded-full'
                    />
                    <span>{field.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            ) : null
          )}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}
