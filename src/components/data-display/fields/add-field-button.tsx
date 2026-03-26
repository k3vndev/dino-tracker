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
import { useProjectsStore } from '@store'
import type { CustomField } from '@types'
import { capitalizeFirst } from '@utils'
import { useMemo } from 'react'

export const AddFieldButton = () => {
  const { projectId, type: projectType, fieldIds, getFieldColor, updateField } = useDataDisplayContext()

  const projects = useProjectsStore(s => s.projects)

  const potentialFieldsToAdd: PotentialFieldsToAdd | null = useMemo(() => {
    const proj = projects.find(p => p.id === projectId)
    const { customFields } = proj || {}

    if (!customFields || !projectType) return null

    const idsSet = new Set(fieldIds)
    const dailyFields: CustomField[] = []
    const staticFields: CustomField[] = []

    for (const field of customFields) {
      // For static charts we want to show all the fields, for daily we want to show only the daily ones.
      const isInvalidDaily = projectType === 'daily' && field.type !== 'daily'
      const isAlreadyAdded = idsSet.has(field.id)

      if (isInvalidDaily || isAlreadyAdded) {
        continue
      }

      // Separate daily and static fields for better organization in the UI.
      if (field.type === 'daily') {
        dailyFields.push(field)
      } else {
        staticFields.push(field)
      }
    }

    return {
      daily: dailyFields,
      static: staticFields
    }
  }, [projects, projectId, projectType, fieldIds])

  const toAddFieldsCount = useMemo(() => {
    if (!potentialFieldsToAdd) return 0
    return potentialFieldsToAdd.daily.length + potentialFieldsToAdd.static.length
  }, [potentialFieldsToAdd])

  const buttonStyle = toAddFieldsCount > 0 ? '' : 'opacity-40 pointer-events-none'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={toAddFieldsCount === 0}>
        <div
          className={`border border-white/15 rounded-full px-2.5 py-0.5 flex items-center gap-0.5 bg-white/5 button ${buttonStyle}`}
          title='Create new field'
        >
          <Icon name='plus' className='size-4' />
        </div>
      </DropdownMenuTrigger>

      {potentialFieldsToAdd && (
        <DropdownMenuContent>
          {Object.entries(potentialFieldsToAdd).map(([fieldType, fields]) => {
            const capitalizedType = capitalizeFirst(fieldType)

            if (!fields.length) return null

            return (
              <DropdownMenuGroup key={fieldType}>
                <DropdownMenuLabel>{capitalizedType}</DropdownMenuLabel>
                {(fields as CustomField[]).map(field => {
                  const color = getFieldColor(field.id)

                  return (
                    <DropdownMenuItem key={field.id} onSelect={() => updateField(field, 'add')}>
                      <div
                        style={{ backgroundColor: color }}
                        className='size-3 min-w-3 aspect-square rounded-full'
                      />
                      <span>{field.name}</span>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuGroup>
            )
          })}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}

interface PotentialFieldsToAdd {
  daily: CustomField[]
  static: CustomField[]
}
